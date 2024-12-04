<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'product_name' => $this->faker->unique()->word(),
            'category' => $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->numberBetween(100, 1000),
            'barcode' => $this->faker->unique()->ean13(),
        ];
    }
}
