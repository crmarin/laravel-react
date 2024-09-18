<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TransactionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Let's truncate our existing records to start from scratch.
        Transaction::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few articles in our database:
        for ($i = 0; $i < 500; $i++) {
            Transaction::create([
                'amount' => $faker->randomFloat(2, 10, 1000), // Monto entre 10 y 1000 con 2 decimales
                'type' => $faker->randomElement(['debit', 'credit']),
                'accountNumberFrom' => $faker->bankAccountNumber,
                'accountNumberTypeFrom' => $faker->randomElement(['Checking', 'Savings']),
                'accountNumberTo' => $faker->bankAccountNumber,
                'accountNumberTypeTo' => $faker->randomElement(['Checking', 'Savings']),
                'traceNumber' => Str::random(20), // Generar un valor alfanumérico único
                'reference' => $faker->sentence(3),
                'description' => $faker->sentence(4),
                'creationDate' => $faker->dateTimeThisYear(),
            ]);
        }
    }
}
