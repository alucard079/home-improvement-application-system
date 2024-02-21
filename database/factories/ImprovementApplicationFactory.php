<?php

namespace Database\Factories;

use App\Models\ImprovementApplication;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ImprovementApplication>
 */
class ImprovementApplicationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ImprovementApplication::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'unit_id' => fake()->unique()->text(10),
            'improvement_type' => fake()->randomElement(['INTERIOR','EXTERIOR']),
            'bond_receipt_number' => fake()->unique()->numberBetween(10000, 99999),
            'building_permit_number' => fake()->unique()->text(10),
            'fencing_permit_number' => fake()->unique()->numberBetween(10000, 99999),
            'building_permit_date_application' => fake()->date('Y-m-d'),
            'fencing_permit_date_application' => fake()->date('Y-m-d'),
        ];
    }
}
