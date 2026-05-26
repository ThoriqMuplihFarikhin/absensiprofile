<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AttendanceHistoryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeDashboardController;
use App\Http\Controllers\GeofenceController;
use App\Http\Controllers\DeviceController;
use App\Http\Controllers\QrAttendanceController;
use App\Http\Controllers\SchedulerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('LandingPage');
})->name('home');

Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        if (auth()->user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('employee.dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AttendanceController::class, 'dashboard'])->name('dashboard');
        Route::post('/check-in', [AttendanceController::class, 'checkIn'])->name('check-in');
        Route::post('/check-out', [AttendanceController::class, 'checkOut'])->name('check-out');
        Route::get('/attendance', [AttendanceController::class, 'history'])->name('attendance');
        Route::get('/attendance-history', [AttendanceHistoryController::class, 'index'])->name('attendance-history');
        Route::get('/attendance-export', [AttendanceHistoryController::class, 'export'])->name('attendance-export');
        Route::get('/employees', [EmployeeController::class, 'index'])->name('employees');
        Route::post('/employees', [EmployeeController::class, 'store'])->name('employees.store');
        Route::put('/employees/{employee}', [EmployeeController::class, 'update'])->name('employees.update');
        Route::delete('/employees/{employee}', [EmployeeController::class, 'destroy'])->name('employees.destroy');
        Route::get('/geofencing', [GeofenceController::class, 'index'])->name('geofencing');
        Route::get('/devices', [DeviceController::class, 'index'])->name('devices');
        Route::post('/devices', [DeviceController::class, 'store'])->name('devices.store');
        Route::delete('/devices/{device}', [DeviceController::class, 'destroy'])->name('devices.destroy');
        Route::get('/qr-code', [QrAttendanceController::class, 'index'])->name('qr-code');
        Route::post('/qr-code/generate', [QrAttendanceController::class, 'generate'])->name('qr-code.generate');
        Route::post('/qr-code/scan', [QrAttendanceController::class, 'scan'])->name('qr-code.scan');
        Route::get('/qr-code/scanner', [QrAttendanceController::class, 'scanner'])->name('qr-code.scanner');
        Route::get('/settings', [SchedulerController::class, 'index'])->name('settings');
        Route::put('/settings', [SchedulerController::class, 'update'])->name('settings.update');
        Route::get('/gps-tracking', function () {return Inertia::render('Admin/GpsTracking'); })->name('gps.tracking');
        Route::put('/geofencing/update',[GeofenceController::class, 'update'])->name('geofencing.update');
        Route::get('/gps-tracking', function () { return Inertia::render('Admin/GpsTracking');})->name('gps.tracking');
        
    });

    Route::prefix('employee')->name('employee.')->group(function () {
        Route::get('/dashboard', [EmployeeDashboardController::class, 'index'])->name('dashboard');
        Route::post('/check-in', [AttendanceController::class, 'checkIn'])->name('check-in');
        Route::post('/check-out', [AttendanceController::class, 'checkOut'])->name('check-out');
        Route::get('/history', [EmployeeDashboardController::class, 'history'])->name('history');
        Route::get('/profile', function () {
            return Inertia::render('Employee/Profile');
        })->name('profile');
        Route::get('/qr-scan', function () {
            return Inertia::render('Employee/QrScan');
        })->name('qr-scan');
    });

    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';