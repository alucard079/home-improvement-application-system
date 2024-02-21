<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ImprovementApplication;
use App\Http\Requests\IndexImprovementApplicationRequest;
use App\Http\Requests\StoreImprovementApplicationRequest;
use App\Http\Requests\UpdateImprovementApplicationRequest;
use App\Http\Resources\ImprovementApplicationResource;

class ImprovementApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(IndexImprovementApplicationRequest $request)
    {   
        return ImprovementApplicationResource::collection(
            ImprovementApplication::query()
            ->when($request->search, function($query, $search) {
                $query->where('unit_id', 'LIKE', '%'.$search.'%');
            })
            ->orderBy('id', 'desc')
            ->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreImprovementApplicationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreImprovementApplicationRequest $request)
    {
        $data = $request->validated();
        if($data['improvement_type'] === 'EXTERIOR') {
            if($data['building_permit_number']) {
                $data['building_permit_date_application'] = date("Y-m-d");
            } 
            if($data['fencing_permit_number']) {
                $data['fencing_permit_date_application'] = date("Y-m-d");
            } 
        } 
        $improvement_application = ImprovementApplication::create($data);
        return new ImprovementApplicationResource($improvement_application, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ImprovementApplication  $improvementApplication
     * @return \Illuminate\Http\Response
     */
    public function show(ImprovementApplication $improvementApplication)
    {
        return new ImprovementApplicationResource($improvementApplication);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateImprovementApplicationRequest  $request
     * @param  \App\Models\ImprovementApplication  $improvementApplication
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateImprovementApplicationRequest $request, ImprovementApplication $improvementApplication)
    {
        $data = $request->validated();

        $data['building_permit_date_application'] = date('Y-m-d');
        if($improvementApplication->improvement_type === 'EXTERIOR') {
            if($data['building_permit_number'] !== null) {
                $data['building_permit_date_application'] = 
                $improvementApplication->building_permit_date_application === null ?
                date('Y-m-d') : $improvementApplication->building_permit_date_application;
            }
            if($data['fencing_permit_number']) {
                $data['fencing_permit_date_application'] = 
                $improvementApplication->fencing_permit_date_application === null ?
                date('Y-m-d') : $improvementApplication->fencing_permit_date_application;
            }
            $improvementApplication->update($data);
        }
        $improvementApplication->update($data);
        return new ImprovementApplicationResource($improvementApplication);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ImprovementApplication  $improvementApplication
     * @return \Illuminate\Http\Response
     */
    public function destroy(ImprovementApplication $improvementApplication)
    {
        $improvementApplication->delete();
        return response("", 204);
    }
}
