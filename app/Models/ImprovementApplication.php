<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImprovementApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_id',
        'improvement_type',
        'bond_receipt_number',
        'additional_structure',
        'building_permit_number',
        'fencing_permit_number',
        'building_permit_date_application',
        'fencing_permit_date_application',
    ];

    /**
     * Get the improvement application's additional structures.
     *
     * @param  string  $value
     * @return string
     */
    public function getAdditionalStructureAttribute($values)
    {
        if($values) {
            return json_decode($values, true);
        } else {
            return [];
        }
    }

    /**
     * Get the improvement application's additional structures.
     *
     * @param  string  $value
     * @return string
     */
    public function setAdditionalStructureAttribute($value)
    {
        $this->attributes['additional_structure'] = json_encode($value);
    }
}
