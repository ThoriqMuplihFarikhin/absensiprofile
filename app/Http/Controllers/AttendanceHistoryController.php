<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Exports\AttendanceExport;
use Illuminate\Http\Request;

use Maatwebsite\Excel\Facades\Excel;
use Inertia\Inertia;

class AttendanceHistoryController extends Controller
{
    public function index(Request $request)
    {
        $attendance = Attendance::with('user')
            /*
            |--------------------------------------------------------------------------
            | SEARCH EMPLOYEE
            |--------------------------------------------------------------------------
            */
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('user', function ($q) use ($request) {
                    $q->where(
                        'name',
                        'like',
                        '%' . $request->search . '%'
                    );
                });
            })
            /*
            |--------------------------------------------------------------------------
            | FILTER DATE FROM
            |--------------------------------------------------------------------------
            */
            ->when($request->from, function ($query) use ($request) {
                $query->whereDate(
                    'date',
                    '>=',
                    $request->from
                );
            })
            /*
            |--------------------------------------------------------------------------
            | FILTER DATE TO
            |--------------------------------------------------------------------------
            */
            ->when($request->to, function ($query) use ($request) {
                $query->whereDate(
                    'date',
                    '<=',
                    $request->to
                );
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();
        return Inertia::render(
            'Admin/AttendanceHistory/Index',
            [
                'attendance' => $attendance,
                'filters' => $request->only([
                    'search',
                    'from',
                    'to',
                ]),
            ]
        );
    }
    public function export()
    {
        return Excel::download(
            new AttendanceExport,
            'attendance.xlsx'
        );
    }
}