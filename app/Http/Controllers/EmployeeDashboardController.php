<?php
namespace App\Http\Controllers;

use App\Models\Attendance;
use Inertia\Inertia;

class EmployeeDashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $attendance = Attendance::where('user_id', $user->id)->latest()->take(10)->get();
        $present = Attendance::where('user_id', $user->id)->where('status', 'present')->count();
        $late = Attendance::where('user_id', $user->id)->where('status', 'late')->count();
        $total = Attendance::where('user_id', $user->id)->count();

        return Inertia::render('Employee/Dashboard', [
            'attendance' => $attendance,
            'stats' => ['present' => $present, 'late' => $late, 'total' => $total],
        ]);
    }

    public function history()
    {
        $user = auth()->user();
        $attendance = Attendance::where('user_id', $user->id)->latest()->get();

        return Inertia::render('Employee/History', [
            'attendance' => $attendance,
        ]);
    }
}