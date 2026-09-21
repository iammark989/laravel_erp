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
            'product_id' => [
                'required',
                'exists:products,id',
            ],

            'sku' => [
                'required',
                'string',
                'max:255',
                'unique:products_variants,sku',
            ],

            'barcode' => [
                'nullable',
                'string',
                'max:255',
                'unique:products_variants,barcode',
            ],

            'variant_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('products_variants', 'variant_name')
                    ->where('product_id', $this->input('product_id')),
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