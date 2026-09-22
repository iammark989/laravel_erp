<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'supplier_code' => [
                'required',
                'string',
                'max:50',
                'unique:suppliers,supplier_code',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'unique:suppliers,name',
            ],
            'contact_person' => [
                'nullable',
                'string',
                'max:255',
            ],
            'contact_number' => [
                'nullable',
                'string',
                'max:50',
            ],
            'email' => [
                'nullable',
                'email',
                'max:255',
            ],
            'address' => [
                'nullable',
                'string',
            ],
            'tin_number' => [
                'nullable',
                'string',
                'max:50',
            ],
            'is_active' => [
                'boolean',
            ],
            'remarks' => [
                'nullable',
                'string',
            ],
        ];
    }
}