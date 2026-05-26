<?php
namespace App\Console\Commands;

use App\Models\Attendance;
use App\Models\Scheduler;
use Illuminate\Console\Command;

class AutoCheckoutCommand extends Command
{
    protected $signature = 'attendance:auto-checkout';
    protected $description = 'Auto checkout employee attendance based on scheduler';

    public function handle()
    {
        // Cek scheduler aktif
        $scheduler = Scheduler::where('enabled', true)->first();

        if (!$scheduler) {
            $this->info('Scheduler disabled.');
            return;
        }

        $now = now()->format('H:i');
        $checkoutTime = substr($scheduler->auto_checkout_time, 0, 5);

        $this->info("Now: {$now} | Checkout time: {$checkoutTime}");

        if ($now < $checkoutTime) {
            $this->info("Not yet checkout time.");
            return;
        }

        // Auto checkout semua yang belum checkout hari ini
        $attendances = Attendance::whereDate('date', today())
            ->whereNull('check_out')
            ->get();

        if ($attendances->isEmpty()) {
            $this->info("No employees need auto checkout.");
            return;
        }

        foreach ($attendances as $attendance) {
            $attendance->update([
                'check_out'     => now()->format('H:i:s'),
                'auto_checkout' => true,
            ]);
            $this->info("✓ Auto checkout: User ID {$attendance->user_id}");
        }

        $this->info("Done! Auto checkout for {$attendances->count()} employees.");
    }
}