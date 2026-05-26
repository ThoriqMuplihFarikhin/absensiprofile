<?php
namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AttendanceExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Attendance::with('user')
            ->latest()
            ->get()
            ->map(fn($a) => [
                'Employee'   => $a->user?->name,
                'Date'       => $a->date,
                'Check In'   => $a->check_in ?? '-',
                'Check Out'  => $a->check_out ?? '-',
                'Status'     => $a->status,
                'Auto Checkout' => $a->auto_checkout ? 'Yes' : 'No',
            ]);
    }

    public function headings(): array
    {
        return [
            'Employee', 'Date', 'Check In',
            'Check Out', 'Status', 'Auto Checkout',
        ];
    }
}