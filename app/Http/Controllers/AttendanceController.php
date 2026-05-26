<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    public function dashboard()
    {
        $attendance = Attendance::with('user')->latest()->take(5)->get();
        $geofence   = \App\Models\Geofence::first();

        $totalEmployees = User::count();
        $presentToday   = Attendance::whereDate('date', today())->count();
        $lateToday      = Attendance::where('status', 'late')->whereDate('date', today())->count();
        $leaveToday     = Attendance::where('status', 'leave')->whereDate('date', today())->count();

        $weeklyChart = [];
        for ($i = 6; $i >= 0; $i--) {
            $date          = now()->subDays($i);
            $weeklyChart[] = [
                'day'        => $date->format('D'),
                'attendance' => Attendance::whereDate('date', $date->toDateString())->count(),
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'attendance'  => $attendance,
            'geofence'    => $geofence,
            'stats'       => [
                'employees' => $totalEmployees,
                'present'   => $presentToday,
                'late'      => $lateToday,
                'leave'     => $leaveToday,
            ],
            'weeklyChart' => $weeklyChart,
        ]);
    }

    public function checkIn(Request $request)
    {
        $today  = today()->toDateString();
        $userId = auth()->id();

        $existing = Attendance::where('user_id', $userId)
            ->whereDate('date', $today)
            ->first();

        if ($existing) {
            return back()->with('error', 'Kamu sudah check-in hari ini!');
        }

        $jamMasuk = Carbon::parse('10:00:00');
        $status   = now()->greaterThan($jamMasuk) ? 'late' : 'present';

        if ($request->latitude && $request->longitude) {
            $geofence = \App\Models\Geofence::first();
            if ($geofence) {
                $distance = $this->calculateDistance(
                    $request->latitude, $request->longitude,
                    $geofence->latitude, $geofence->longitude
                );
                if ($distance > $geofence->radius) {
                    return back()->with('error', 'Kamu berada di luar area kantor!');
                }
            }
        }

        Attendance::create([
            'user_id'   => $userId,
            'date'      => $today,
            'check_in'  => now()->format('H:i:s'),
            'status'    => $status,
            'latitude'  => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return back()->with('success', 'Check-in berhasil! Status: ' . ucfirst($status));
    }

    public function checkOut()
    {
        $attendance = Attendance::where('user_id', auth()->id())
            ->whereDate('date', today())
            ->first();

        if (!$attendance) {
            return back()->with('error', 'Kamu belum check-in hari ini!');
        }

        if ($attendance->check_out) {
            return back()->with('error', 'Kamu sudah check-out hari ini!');
        }

        $attendance->update([
            'check_out' => now()->format('H:i:s'),
        ]);

        return back()->with('success', 'Check-out berhasil!');
    }

    public function history(Request $request)
    {
        $query = Attendance::with('user')->latest();

        if ($request->search) {
            $query->whereHas('user', fn($q) =>
                $q->where('name', 'like', '%' . $request->search . '%')
            );
        }

        if ($request->from) $query->whereDate('date', '>=', $request->from);
        if ($request->to)   $query->whereDate('date', '<=', $request->to);

        $attendance = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Attendance/Index', [
            'attendance' => $attendance,
            'filters'    => $request->only(['search', 'from', 'to']),
        ]);
    }

    private function calculateDistance($lat1, $lon1, $lat2, $lon2)
    {
        $earthRadius = 6371000;
        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);
        $a    = sin($dLat / 2) ** 2 +
                cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) ** 2;
        return $earthRadius * 2 * atan2(sqrt($a), sqrt(1 - $a));
    }
}