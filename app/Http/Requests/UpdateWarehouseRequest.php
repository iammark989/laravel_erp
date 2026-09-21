<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWarehouseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $warehouse = $this->route('warehouse');

        return [
            'warehouse_code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('warehouses', 'warehouse_code')
                    ->ignore($warehouse),
            ],

            'name' => [
                'required',
                'string',
                'max:100',
                Rule::unique('warehouses', 'name')
                    ->ignore($warehouse),
            ],

            'contact_person' => [
                'nullable',
                'string',
                'max:255',
            ],

            'contact_number' => [
                'nullable',
                'string',
                'max:255',
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