<?php

namespace App\Models;

use App\Models\InventoryTransaction;
use App\Models\PurchaseOrder;
use App\Models\User;
use App\Models\VariantInventory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Warehouse extends Model
{
    protected $fillable = [
        'warehouse_code',
        'name',
        'contact_person',
        'contact_number',
        'email',
        'address',
        'remarks',
        'is_active',
        'created_by',
        'updated_by',
    ];

    /**
     * Get the user who created this warehouse.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this warehouse.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get variant inventories.
     */
    public function inventories(): HasMany
    {
        return $this->hasMany(VariantInventory::class);
    }

    /**
     * Get inventory transactions.
     */
    public function inventoryTransactions(): HasMany
    {
        return $this->hasMany(InventoryTransaction::class);
    }

    /**
     * Get purchase orders.
     */
    public function purchaseOrders(): HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
