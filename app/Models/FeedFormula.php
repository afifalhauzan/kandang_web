<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;

class FeedFormula extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'target_protein',
        'total_cost',
        'result_json',
    ];

    protected function casts(): array
    {
        return [
            'target_protein' => 'decimal:2',
            'total_cost' => 'decimal:2',
            'result_json' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
