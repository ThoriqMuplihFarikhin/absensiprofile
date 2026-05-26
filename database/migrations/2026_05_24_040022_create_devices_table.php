<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->string('device_code');
            $table->string('name');
            $table->string('location');
            $table->enum('status', [
                'online',
                'offline'
            ])->default('offline');
            $table->timestamp('last_heartbeat')
                ->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};