<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseOrderItem extends Model
{
    protected $fillable = [
        'purchase_order_id',
        'product_variant_id',
        'purchase_uom_id',
        'quantity',
        'cost_price',
        'amount',
        'conversion_qty',
        'received_qty',
        'tax_type',
        'remarks',
    ];

    /**
     * Get the purchase order.
     */
    public function purchaseOrder(): BelongsTo
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    /**
     * Get the product variant.
     */
    public function productVariant(): BelongsTo
    {
        return $this->belongsTo(ProductVariant::class);
    }

    /**
     * Get the purchase UOM.
     */
    public function purchaseUom(): BelongsTo
    {
        return $this->belongsTo(Uom::class, 'purchase_uom_id');
    }

    protected function casts(): array
    {
        return [
            'quantity' => 'decimal:3',
            'cost_price' => 'decimal:2',
            'amount' => 'decimal:2',
            'conversion_qty' => 'decimal:3',
            'received_qty' => 'decimal:3',
        ];
    }
}
