<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('improvement_applications', function (Blueprint $table) {
            $table->id();
            $table->string('unit_id')->unique();
            $table->enum('improvement_type', ['INTERIOR', 'EXTERIOR']);
            $table->integer('bond_receipt_number');
            $table->json('additional_structure')->nullable();
            $table->string('building_permit_number')->nullable();
            $table->integer('fencing_permit_number')->nullable();
            $table->date('building_permit_date_application')->nullable();
            $table->date('fencing_permit_date_application')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('improvement_applications');
    }
};
