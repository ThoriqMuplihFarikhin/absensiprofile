<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceQr extends Model
{
    protected $fillable = [
        'token',
        'date',
        'is_active',
    ];
}