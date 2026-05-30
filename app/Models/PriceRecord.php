<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PriceRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'commodity_name',
        'category',
        'price',
        'record_date',
        'source',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'record_date' => 'date',
        ];
    }
}
