<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scheduler extends Model
{
    protected $fillable = [
        'auto_checkout_time',
        'enabled',
    ];

    protected $casts = [
        'enabled' => 'boolean',
    ];
}