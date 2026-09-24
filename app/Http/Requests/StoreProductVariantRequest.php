<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductVariantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sku' => [
                'required',
                'string',
                'max:255',
                'unique:product_variants,sku',
            ],

            'barcode' => [
                'nullable',
                'string',
                'max:255',
                'unique:product_variants,barcode',
            ],

            'variant_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('product_variants', 'variant_name')
                ->where('product_id', $this->route('product')->id),
            ],

            'cost_price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'tax_type' => [
                'required',
                'in:vatable,vat_exempt,zero_rated',
            ],

            'base_uom_id' => [
                'required',
                'exists:uoms,id',
            ],

            'selling_uom_id' => [
                'required',
                'exists:uoms,id',
            ],

            'selling_qty' => [
                'required',
                'numeric',
                'min:0.001',
            ],

            'purchasing_uom_id' => [
                'required',
                'exists:uoms,id',
            ],

            'purchasing_qty' => [
                'required',
                'numeric',
                'min:0.001',
            ],

            // Initial Price
            'prices' => [
                'required',
                'array',
                'min:1',
            ],

            'prices.*.price_list_id' => [
                'required',
                'exists:price_lists,id',
            ],

            'prices.*.price' => [
                'required',
                'numeric',
                'min:0',
            ],

            // Initial Inventory
            'inventories' => [
                'required',
                'array',
                'min:1',
            ],

            'inventories.*.warehouse_id' => [
                'required',
                'exists:warehouses,id',
            ],

            'inventories.*.quantity_on_hand' => [
                'required',
                'numeric',
                'min:0',
            ],

            'inventories.*.reorder_level' => [
                'required',
                'numeric',
                'min:0',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],

            'is_active' => [
                'boolean',
            ],
        ];
    }
}