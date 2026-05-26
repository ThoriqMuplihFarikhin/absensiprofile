<?php

namespace App\Http\Controllers;

use App\Models\Geofence;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeofenceController extends Controller
{
    public function index()
    {
        $geofence = Geofence::first();

        if (!$geofence) {
            $geofence = Geofence::create([
                'name' => 'Kantor Pusat',
                'latitude' => -6.2088,
                'longitude' => 106.8456,
                'radius' => 100,
            ]);
        }

        return Inertia::render('Admin/Geofencing/Index', [
            'geofence' => $geofence
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'radius' => 'required',
        ]);

        $geofence = Geofence::first();

        $geofence->update([
            'name' => $request->name,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'radius' => $request->radius,
        ]);

        return back();
    }

}