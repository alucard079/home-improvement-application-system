<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreImprovementApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [];
        $rules['unit_id'] = 'required|unique:improvement_applications,unit_id';
        $rules['improvement_type'] = ['required', Rule::in(['INTERIOR', 'EXTERIOR'])];
        $rules['bond_receipt_number'] = 'required|numeric';
        $rules['additional_structure'] = 'required_if:improvement_type,EXTERIOR|array';
        $rules['building_permit_number'] = ['nullable'];
        $rules['fencing_permit_number'] = ['nullable'];
        if($this->improvement_type === 'EXTERIOR') {
            if(in_array("Balcony", $this->additional_structure) || in_array("Second Floor Room Extension", $this->additional_structure)) {
                $rules['building_permit_number'] = ['required','string'];
            } 
            if(!in_array("Balcony", $this->additional_structure) && !in_array("Second Floor Room Extension", $this->additional_structure)) {
                $rules['fencing_permit_number'] = ['required', 'numeric'];
            }
        }
        return $rules;
    }
}
