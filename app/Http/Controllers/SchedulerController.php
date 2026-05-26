<?php
namespace App\Http\Controllers;

use App\Models\Scheduler; // ← tambahkan ini
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchedulerController extends Controller
{
    public function index()
    {
        $scheduler = Scheduler::first();
        return Inertia::render('Admin/Settings/Index', [
            'scheduler' => $scheduler,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'auto_checkout_time' => 'required',
            'enabled'            => 'required|boolean',
        ]);

        $scheduler = Scheduler::first();

        if ($scheduler) {
            $scheduler->update([
                'auto_checkout_time' => $request->auto_checkout_time,
                'enabled'            => $request->enabled,
            ]);
        } else {
            Scheduler::create([
                'auto_checkout_time' => $request->auto_checkout_time,
                'enabled'            => $request->enabled,
            ]);
        }

        return back()->with('success', 'Scheduler updated!');
    }
}