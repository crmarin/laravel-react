<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('transactionID');
            $table->decimal('amount', 10, 2);
            $table->enum('type', ['credit', 'debit']);
            $table->string('accountNumberFrom');
            $table->string('accountNumberTypeFrom');
            $table->string('accountNumberTo');
            $table->string('accountNumberTypeTo');
            $table->string('traceNumber')->unique(); // Unique alphanumeric value
            $table->string('reference')->nullable();
            $table->string('description');            
            $table->date('creationDate');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
