<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUomRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $uom = $this->route('uom');

        return [
            'code' => [
                'required',
                'string',
                'max:10',
                Rule::unique('uoms', 'code')->ignore($uom),
            ],
            'description' => [
                'nullable',
                'string',
            ],
            'is_active' => [
                'boolean',
            ],
        ];
    }
}