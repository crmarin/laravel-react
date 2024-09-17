<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return response()->json(Transaction::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'required|string|max:255',
            'type' => 'required|in:income,expense,transfer'
        ]);

        $transaction = Transaction::create($request->all());

        return response()->json($transaction, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $transaction = Transaction::findOrFail($id);
        return response()->json($transaction);
    }
    
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $request->validate([
            'amount' => 'numeric',
            'description' => 'string|max:255',
            'type' => 'in:income,expense,transfer'
        ]);
    
        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->all());
    
        return response()->json($transaction);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return response()->json(null, 204);
    }
}
