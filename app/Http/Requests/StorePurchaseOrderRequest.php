<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePurchaseOrderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'po_number' => [
                'required',
                'string',
                'max:255',
                'unique:purchase_orders,po_number',
            ],

            'supplier_id' => [
                'required',
                'exists:suppliers,id',
            ],

            'warehouse_id' => [
                'required',
                'exists:warehouses,id',
            ],

            'order_date' => [
                'required',
                'date',
            ],

            'expected_delivery' => [
                'nullable',
                'date',
                'after_or_equal:order_date',
            ],

            'payment_terms' => [
                'required',
                'in:cash,cod,net15,net30',
            ],

            'supplier_quotation_no' => [
                'nullable',
                'string',
                'max:255',
            ],

            'reference_number' => [
                'nullable',
                'string',
                'max:255',
            ],

            'discount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'tax' => [
                'required',
                'numeric',
                'min:0',
            ],

            'remarks' => [
                'nullable',
                'string',
            ],

            'status' => [
                'required',
                'in:draft,submitted,completed,cancelled,partially_received',
            ],
            'items' => [
                'required',
                'array',
                'min:1',
            ],

            'items.*.product_variant_id' => [
                'required',
                'exists:product_variants,id',
            ],

            'items.*.purchase_uom_id' => [
                'required',
                'exists:uoms,id',
            ],

            'items.*.quantity' => [
                'required',
                'numeric',
                'min:0.001',
            ],

            'items.*.cost_price' => [
                'required',
                'numeric',
                'min:0',
            ],

            'items.*.amount' => [
                'required',
                'numeric',
                'min:0',
            ],

            'items.*.conversion_qty' => [
                'required',
                'numeric',
                'min:0',
            ],

            'items.*.tax_type' => [
                'required',
                'in:vatable,vat_exempt,zero_rated',
            ],

            'items.*.remarks' => [
                'nullable',
                'string',
            ],
        ];
    }
}