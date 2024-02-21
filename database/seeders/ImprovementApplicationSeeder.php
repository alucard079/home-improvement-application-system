<?php

namespace Database\Seeders;

use App\Models\ImprovementApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImprovementApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ImprovementApplication::factory()
            ->count(50)
            ->create();
    }
}
