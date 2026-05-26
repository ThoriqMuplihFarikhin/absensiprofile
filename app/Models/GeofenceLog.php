<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeofenceLog extends Model
{
    protected $fillable = [

        'user_id',
        'latitude',
        'longitude',
        'distance',
        'accuracy',
        'inside_area',

    ];
}