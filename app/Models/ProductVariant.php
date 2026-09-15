<?php

namespace App\Models;

use App\Models\GoodsReceiptItem;
use App\Models\InventoryTransactionItem;
use App\Models\Product;
use App\Models\PurchaseOrderItem;
use App\Models\Uom;
use App\Models\User;
use App\Models\VariantImage;
use App\Models\VariantInventory;
use App\Models\VariantPrice;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'sku',
        'barcode',
        'variant_name',
        'cost_price',
        'tax_type',
        'base_uom_id',
        'selling_uom_id',
        'selling_qty',
        'purchasing_uom_id',
        'purchasing_qty',
        'remarks',
        'created_by',
        'updated_by',
        'is_active',
    ];

    /**
     * Get the product this variant belongs to.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the base unit of measure.
     */
    public function baseUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'base_uom_id');
    }

    /**
     * Get the selling unit of measure.
     */
    public function sellingUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'selling_uom_id');
    }

    /**
     * Get the purchasing unit of measure.
     */
    public function purchasingUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'purchasing_uom_id');
    }

    /**
     * Get the user who created this variant.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who last updated this variant.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get variant image.
     */    
    public function images(): HasMany
    {
        return $this->hasMany(VariantImage::class)
            ->orderBy('sort_order');
    }

     /**
     * Get purchase order items.
     */  
    public function purchaseOrderItems(): HasMany
    {
        return $this->hasMany(PurchaseOrderItem::class);
    }

    /**
     * Get inventory transaction items.
     */    
    public function inventoryTransactionItems(): HasMany
    {
        return $this->hasMany(InventoryTransactionItem::class);
    }

    /**
     * Get goods receipt items.
     */
    public function goodsReceiptItems(): HasMany
    {
        return $this->hasMany(GoodsReceiptItem::class);
    }

    /**
     * Get variant Inventories.
     */  
    public function inventories(): HasMany
    {
        return $this->hasMany(VariantInventory::class);
    }

    /**
     * Get variant price.
     */ 
    public function prices(): HasMany
    {
        return $this->hasMany(VariantPrice::class);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'cost_price' => 'decimal:2',
            'selling_qty' => 'decimal:3',
            'purchasing_qty' => 'decimal:3',
            'is_active' => 'boolean',
        ];
    }
}
