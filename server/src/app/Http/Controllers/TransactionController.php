<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Transaction::query();
        if ($request->has('amount')) {
            $query->where('amount', $request->input('amount'));
        }
        if ($request->has('description')) {
            $query->where('description', $request->input('description'));
        }
        if ($request->has('startDate') && $request->input('startDate') !== null && $request->has('endDate') && $request->input('endDate') !== null) {
            $query->whereBetween('creationDate', [$request->input('startDate'), $request->input('endDate')]);
        }

        $perPage = $request->input('per_page', 10);

        return response()->json($query->paginate($perPage));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {

            DB::beginTransaction();

            $faker = \Faker\Factory::create();
            $request->validate([
                'amount' => 'required|numeric',
                'description' => 'required|string|max:255',
                'type' => 'required|in:credit,debit'
            ]);

            $transactionData = array_merge($request->all(), [
                'accountNumberFrom' => $faker->bankAccountNumber,
                'accountNumberTypeFrom' => $faker->randomElement(['Checking', 'Savings']),
                'accountNumberTo' => $faker->bankAccountNumber,
                'accountNumberTypeTo' => $faker->randomElement(['Checking', 'Savings']),
                'traceNumber' => Str::random(20),
                'reference' => $faker->sentence(3),
                'description' => $request->input('description', $faker->sentence(4)),
                'creationDate' => now(),
            ]);

            $transaction = Transaction::create($transactionData);

            DB::commit();

            return response()->json([
                'message' => 'Transaction created ok!',
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'An error occurred while creating the transaction',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        return response()->json($transaction);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'amount' => 'numeric',
            'description' => 'string|max:255',
            'type' => 'in:credit,debit'
        ]);

        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->all());

        return response()->json([
            'message' => 'Transaction updated ok!',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return response()->json([
            'message' => 'Transaction delete ok!',
        ], 200);
    }
    
    public function loadCSV(Request $request)
    {
        try {
            $csvFullPath = storage_path('transactions.csv');

            DB::statement('CALL LoadCSVToTransactions(?)', [$csvFullPath]);

            return response()->json([
                'message' => 'CSV file loaded successfully into transactions table.'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error loading CSV file.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

