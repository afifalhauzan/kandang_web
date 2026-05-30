<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedIngredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'protein',
        'energy',
        'price_per_kg',
    ];

    protected function casts(): array
    {
        return [
            'protein' => 'decimal:2',
            'energy' => 'decimal:2',
            'price_per_kg' => 'decimal:2',
        ];
    }
}
