<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;


class AttendanceController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    public function dashboard()
    {
        /*
        |--------------------------------------------------------------------------
        | RECENT ATTENDANCE
        |--------------------------------------------------------------------------
        */

        $attendance = Attendance::with('user')
            ->latest()
            ->take(5)
            ->get();

        /*
        |--------------------------------------------------------------------------
        | STATISTICS
        |--------------------------------------------------------------------------
        */

        $totalEmployees = User::count();

        $presentToday = Attendance::whereDate(
            'date',
            now()->toDateString()
        )->count();

        $lateToday = Attendance::where(
            'status',
            'late'
        )->whereDate(
            'date',
            now()->toDateString()
        )->count();

        $leaveToday = Attendance::where(
            'status',
            'leave'
        )->whereDate(
            'date',
            now()->toDateString()
        )->count();

        /*
        |--------------------------------------------------------------------------
        | WEEKLY CHART
        |--------------------------------------------------------------------------
        */

        $weeklyChart = [];

        for ($i = 6; $i >= 0; $i--) {

            $date = now()->copy()->subDays($i);

            $count = Attendance::whereDate(
                'date',
                $date->toDateString()
            )->count();

            $weeklyChart[] = [

                'day' => $date->format('D'),

                'attendance' => $count,

            ];
        }

        /*
        |--------------------------------------------------------------------------
        | PIE CHART
        |--------------------------------------------------------------------------
        */

        $presentCount = Attendance::where(
            'status',
            'present'
        )->count();

        $lateCount = Attendance::where(
            'status',
            'late'
        )->count();

        /*
        |--------------------------------------------------------------------------
        | RETURN
        |--------------------------------------------------------------------------
        */

        return Inertia::render(
            'Admin/Dashboard',
            [

                'attendance' => $attendance,

                'stats' => [

                    'employees' => $totalEmployees,

                    'present' => $presentToday,

                    'late' => $lateToday,

                    'leave' => $leaveToday,

                ],

                'weeklyChart' => $weeklyChart,

                'pieChart' => [

                    [
                        'name' => 'Present',
                        'value' => $presentCount,
                    ],

                    [
                        'name' => 'Late',
                        'value' => $lateCount,
                    ],

                ],

            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK IN
    |--------------------------------------------------------------------------
    */

    public function checkIn(Request $request)
    {
        $request->validate([
            'latitude' => 'required',
            'longitude' => 'required',
        ]);

        $geofence = \App\Models\Geofence::first();

        if (!$geofence) {
            return back()->with(
                'error',
                'Geofence belum dibuat'
            );
        }

        $distance = $this->calculateDistance(
            $request->latitude,
            $request->longitude,
            $geofence->latitude,
            $geofence->longitude
        );

        if ($distance > $geofence->radius) {
            return back()->with(
                'error',
                'Anda berada di luar area kantor'
            );
        }

        \App\Models\Attendance::create([
            'user_id' => auth()->id(),
            'check_in' => now(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'status' => 'present',
        ]);

        return back()->with(
            'success',
            'Check-in berhasil'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK OUT
    |--------------------------------------------------------------------------
    */

    public function checkOut()
    {
        $attendance = Attendance::where(
            'user_id',
            auth()->id()
        )
        ->whereDate(
            'date',
            now()->toDateString()
        )
        ->first();

        if ($attendance) {

            $attendance->update([

                'check_out' => now()->format('H:i:s'),

            ]);

        }

        return back()->with(
            'success',
            'Check out success'
        );
    }

    public function history()
        {
            $attendances = Attendance::with('user')
                ->latest()
                ->get();

            return Inertia::render(
                'Admin/Attendance/Index',
                [
                    'attendances' => $attendances
                ]
            );
        }
        public function scanner()
        {
            return Inertia::render('Admin/QRCode/Scanner');
        }

        private function calculateDistance(
        $lat1,
        $lon1,
        $lat2,
        $lon2
    ) {
        $earthRadius = 6371000;

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a =
            sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($lat1)) *
            cos(deg2rad($lat2)) *
            sin($dLon / 2) *
            sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}