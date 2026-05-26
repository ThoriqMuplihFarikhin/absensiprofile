<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\AttendanceQr;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class QrAttendanceController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | QR PAGE
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $qr = AttendanceQr::latest()->first();

        return Inertia::render(
            'Admin/QRCode/Index',
            [
                'qr' => $qr
            ]
        );
    }

    /*
    |--------------------------------------------------------------------------
    | GENERATE QR
    |--------------------------------------------------------------------------
    */

    public function generate()
    {
        AttendanceQr::query()->update([
            'is_active' => false
        ]);

        $qr = AttendanceQr::create([
            'token' => Str::random(40),
            'date' => now()->toDateString(),
            'is_active' => true,
        ]);

        return back()->with(
            'success',
            'QR Generated'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | SCAN QR
    |--------------------------------------------------------------------------
    */

    public function scan(Request $request)
    {
        $qr = AttendanceQr::where(
            'token',
            $request->token
        )
        ->where('is_active', true)
        ->first();

        if (!$qr) {

            return back()->with(
                'error',
                'QR Invalid'
            );

        }

        $already = Attendance::where(
            'user_id',
            auth()->id()
        )
        ->whereDate('date', now())
        ->first();

        if ($already) {

            return back()->with(
                'error',
                'Already checked in'
            );

        }

        Attendance::create([
            'user_id' => auth()->id(),
            'date' => now()->toDateString(),
            'check_in' => now()->format('H:i:s'),
            'status' => 'present',
        ]);

        return back()->with(
            'success',
            'Attendance success'
        );
    }
}