<?php

namespace App\Http\Requests;

use App\Models\GoodsReceipt;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGoodsReceiptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var GoodsReceipt $goodsReceipt */
        $goodsReceipt = $this->route('goodsReceipt');

        return [
            'gr_number' => [
                'required',
                'string',
                'max:255',
                Rule::unique('goods_receipts', 'gr_number')
                    ->ignore($goodsReceipt),
            ],

            'purchase_order_id' => [
                'required',
                'exists:purchase_orders,id',
            ],

            'supplier_id' => [
                'required',
                'exists:suppliers,id',
            ],

            'warehouse_id' => [
                'required',
                'exists:warehouses,id',
            ],

            'received_date' => [
                'required',
                'date',
            ],

            'reference_number' => [
                'nullable',
                'string',
                'max:255',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],

            'status' => [
                'required',
                'in:draft,posted,cancelled',
            ],

            'items' => [
                'required',
                'array',
                'min:1',
            ],

            'items.*.purchase_order_item_id' => [
                'required',
                'exists:purchase_order_items,id',
            ],

            'items.*.product_variant_id' => [
                'required',
                'exists:product_variants,id',
            ],

            'items.*.received_qty' => [
                'required',
                'numeric',
                'min:0.001',
            ],

            'items.*.cost_price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'items.*.remarks' => [
                'nullable',
                'string',
            ],
        ];
    }
}