<?php

namespace App\Models;

use App\Models\InventoryTransactionItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InventoryTransaction extends Model
{
    protected $fillable = [
        'transaction_type',
        'reason',
        'status',
        'reference_type',
        'invoice_no',
        'reference_number',
        'warehouse_id',
        'remarks',
        'created_by',
        'posted_at',
    ];

    /**
     * Get the warehouse associated with this transaction.
     */
    public function warehouse(): BelongsTo
    {
        return $this->belongsTo(Warehouse::class);
    }

    /**
     * Get the user who created this transaction.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the transaction items.
     */
    public function items(): HasMany
    {
        return $this->hasMany(InventoryTransactionItem::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'posted_at' => 'datetime',
        ];
    }
}
