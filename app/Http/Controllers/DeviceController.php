<?php

namespace App\Http\Controllers;

use App\Models\Device;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        $devices = Device::latest()->get();
        return Inertia::render(
            'Admin/Devices/Index',
            [
                'devices' => $devices
            ]
        );
    }
    public function store(Request $request)
    {
        $request->validate([
            'device_code' => 'required',
            'name' => 'required',
            'location' => 'required',
        ]);
        Device::create([
            'device_code' => $request->device_code,
            'name' => $request->name,
            'location' => $request->location,
            'status' => 'online',
            'last_heartbeat' => now(),
        ]);
        return back()->with(
            'success',
            'Device created successfully'
        );
    }
    public function destroy(Device $device)
    {
        $device->delete();
        return back()->with(
            'success',
            'Device deleted'
        );
    }
}