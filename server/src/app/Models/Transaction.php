<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    // Fields that can be mass-assigned
    protected $fillable = [
        'accountNumberFrom',
        'accountNumberTypeFrom',
        'accountNumberTo',
        'accountNumberTypeTo',
        'traceNumber',
        'amount',
        'type',
        'description',
        'creationDate',
        'reference',
    ];

    // Optionally, you can set a primary key if it's not 'id'
    protected $primaryKey = 'transactionID';
    
    // Automatically generate a unique trace number when creating a transaction
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            $transaction->traceNumber = bin2hex(random_bytes(10)); // Generates a unique alphanumeric trace number
        });
    }
}
