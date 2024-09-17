<?php

namespace Database\Seeders;

use App\Models\Transaction;
use Illuminate\Database\Seeder;

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
                'amount' => $faker->randomFloat(0, 1, 1000),
                'type' => $faker->randomElement(['debit', 'credit']),
                'description' => $faker->sentence(4),
            ]);
        }
    }
}
