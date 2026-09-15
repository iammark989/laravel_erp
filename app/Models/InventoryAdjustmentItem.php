<?php

namespace App\Models;

use App\Models\InventoryAdjustment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryAdjustmentItem extends Model
{
    protected $fillable = [
        'inventory_adjustment_id',
        'product_variant_id',
        'current_stock',
        'adjustment_quantity',
        'new_stock',
        'remarks',
    ];

    /**
     * Get the inventory adjustment.
     */
    public function inventoryAdjustment(): BelongsTo
    {
        return $this->belongsTo(InventoryAdjustment::class);
    }

    /**
     * Get the product variant.
     */
    public function productVariant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }

    protected function casts(): array
    {
        return [
            'current_stock' => 'decimal:3',
            'adjustment_quantity' => 'decimal:3',
            'new_stock' => 'decimal:3',
        ];
    }
}
