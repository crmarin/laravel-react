<?php 

use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

// Automatically create routes for all CRUD operations
Route::apiResource('transactions', TransactionController::class);

Route::post('/transactions/load-csv', [TransactionController::class, 'loadCSV']);