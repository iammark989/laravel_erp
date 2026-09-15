<?php

namespace App\Models;

use App\Models\VariantPrice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PriceList extends Model
{
    protected $fillable = [
        'code',
        'description',
        'is_active',
    ];

    /**
     * Get variant prices.
     */
    public function variantPrices(): HasMany
    {
        return $this->hasMany(VariantPrice::class);
    }

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
