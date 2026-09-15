<?php

namespace App\Models;

use App\Models\ProductVariant;
use App\Models\PurchaseOrderItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Uom extends Model
{
    protected $fillable = [
        'code',
        'description',
        'is_active',
    ];

     /**
     * Get the base unit of measure.
     */
    public function baseUoms(): HasMany
    {
        return $this->hasMany(ProductVariant::class, 'base_uom_id');
    }

    /**
     * Get the selling unit of measure.
     */
    public function sellingUoms(): HasMany
    {
        return $this->hasMany(ProductVariant::class, 'selling_uom_id');
    }

    /**
     * Get the purchasing unit of measure.
     */
    public function purchasingUoms(): HasMany
    {
        return $this->hasMany(ProductVariant::class, 'purchasing_uom_id');
    }

    /**
     * Get purchase order items.
     */  
    public function purchaseOrderItems(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
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
