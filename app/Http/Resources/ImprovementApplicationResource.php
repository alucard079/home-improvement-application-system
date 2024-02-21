<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImprovementApplicationResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'unit_id' => $this->unit_id,
            'improvement_type' => $this->improvement_type,
            'bond_receipt_number' => $this->bond_receipt_number,
            'additional_structure' => $this->additional_structure,
            'building_permit_number' => $this->building_permit_number ? $this->building_permit_number : '',
            'fencing_permit_number' => $this->fencing_permit_number ? $this->fencing_permit_number : '',
            'building_permit_date_application' => $this->building_permit_date_application,
            'fencing_permit_date_application' => $this->fencing_permit_date_application,
        ];
    }
}
