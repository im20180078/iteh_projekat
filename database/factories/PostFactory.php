<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'post_title' => $this->faker->sentence(5),
            'post_time' => $this->faker->datetime,
            'post_content' => $this->faker->regexify('[A-Za-z0-9]{20}'),
            'post_autor' => 1,
            'visible' => 1,
        ];
    }
}
