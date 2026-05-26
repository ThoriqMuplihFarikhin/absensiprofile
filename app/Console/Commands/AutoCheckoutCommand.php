<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use App\Models\Attendance;

class AutoCheckoutCommand extends Command
{
    protected $signature = 'attendance:auto-checkout';
    protected $description =
        'Auto checkout employee attendance';
    public function handle()
    {
        /*
        |--------------------------------------------------------------------------
        | AUTO CHECKOUT AFTER 5 PM
        |--------------------------------------------------------------------------
        */
        $attendance = Attendance::whereDate(
                'date',
                now()->toDateString()
            )
            ->whereNull('check_out')
            ->get();
        foreach ($attendance as $item) {
            $item->update([
                'check_out' => now()->format('H:i:s'),
                'auto_checkout' => true,
            ]);
        }
        $this->info(
            'Auto checkout completed'
        );
    }
}