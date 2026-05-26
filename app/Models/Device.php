<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [

        'device_code',
        'name',
        'location',
        'status',
        'last_heartbeat',

    ];
}