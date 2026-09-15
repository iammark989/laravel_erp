<?php

namespace App\Models;

use App\Models\InventoryAdjustmentItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InventoryAdjustment extends Model
{
    protected $fillable = [
        'adjustment_number',
        'warehouse_id',
        'adjustment_date',
        'reason',
        'status',
        'remarks',
        'created_by',
        'posted_at',
    ];

    /**
     * Get the warehouse.
     */
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the user who created this adjustment.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get adjustment items.
     */
    public function items(): HasMany
    {
        return $this->hasMany(InventoryAdjustmentItem::class);
    }

    protected function casts(): array
    {
        return [
            'adjustment_date' => 'date',
            'posted_at' => 'datetime',
        ];
    }
}
