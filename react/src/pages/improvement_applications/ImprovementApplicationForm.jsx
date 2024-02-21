import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom"
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';
import InputTextState from '../../components/InputTextState';
import Loader from "../../components/Loader";
import CustomLink from "../../components/CustomLink";
import Button from "../../components/Button";
import Title from "../../components/Title";

export default function ImprovementApplicationForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [improveApplication, setImproveApplication] = useState({
    id: null,
    unit_id: '',
    improvement_type: 'INTERIOR',
    bond_receipt_number: '',
    additional_structure: [],
    building_permit_number: '',
    fencing_permit_number: '',
    building_permit_date_application: '',
    fencing_permit_date_application: '',
  });
  const listOfAdditionalStructure = [
    'Fence and Gate',
    'Garage Roofing',
    'Ground Floor Room Extension',
    'Balcony',
    'Second Floor Room Extension'
  ];

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const getImprovementApplication = () => {
    setLoading(true);
    axiosClient.get(`/improvement-applications/${id}`)
    .then(({data}) => {
      setLoading(false);
      setImproveApplication(data);
      console.log(data);
    })
    .catch((error) => {
      console.log(error)
      setLoading(false);
    });
  }

  const handleAdditionalStructure = (ads) => {
    const clonedlistOfAdditionalStructure = Array.from(improveApplication.additional_structure);
    const clickedAds = clonedlistOfAdditionalStructure.indexOf(ads);
    
    if(clickedAds > -1) {
      clonedlistOfAdditionalStructure.splice(clickedAds, 1)
    } else {
      clonedlistOfAdditionalStructure.push(ads);
    }

    setImproveApplication({...improveApplication, additional_structure: clonedlistOfAdditionalStructure})
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    setSubmitLoading(true);
    if(improveApplication.id) {
      axiosClient.put(`/improvement-applications/${improveApplication.id}`, improveApplication)
      .then(() => {
        setSubmitLoading(false);
        toast.success('Data successfully updated!')
        navigate('/improvement-applications');
      })
      .catch(err => {
        setSubmitLoading(false);
        const response = err.response;
        if(response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors)
          }
        }
      })
    } else {
      axiosClient.post(`/improvement-applications`, improveApplication)
      .then(() => {
        setSubmitLoading(false);
        toast.success('Data successfully added!')
        navigate('/improvement-applications');
      })
      .catch(err => {
        setSubmitLoading(false);
        const response = err.response;
        if(response && response.status === 422) {
          if(response.data.errors) {
            setErrors(response.data.errors)
          }
        }
      })
    }
  }

  if(id != null) {
    useEffect(() => {
      getImprovementApplication();
    }, [])
  }
  
  return (
    <>
      <div className="flex align-items-center justify-content-between">
        {!id && (
          <Title value="Create Improve Application"/>
        )}
        {(id && !loading) && (
          <Title value={`Update Improve Application: ${improveApplication.unit_id}`}/>
        )}
      </div>
      <div className="card animated fadeInDown">
        {loading ? (
          <div className='flex align-items-center'>
            <div className='margin-right'>
              Loading...
            </div>
            <Loader loading={loading} color="#0D9488"/>
          </div>
        ) : (
          <div>
            <CustomLink to="/improvement-applications" value="Back"/>
            <form className="margin-top" onSubmit={onSubmit}>
              <div className="mb-4">
                <InputTextState type="text" value={improveApplication.unit_id} onChange={ev => setImproveApplication({...improveApplication, unit_id: ev.target.value})} placeholder="Unit ID" label="Unit ID" className="w-3/12 h-14 mb-2"/>
                {errors && errors.unit_id ? <div className="text-red-600">{errors['unit_id'][0]}</div> : ""}
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900">Select an option</label>
                <select value={improveApplication.improvement_type} onChange={ev => setImproveApplication({...improveApplication, improvement_type: ev.target.value})} className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 block w-3/12 p-2.5 mb-2 h-14">
                  <option value="INTERIOR">INTERIOR</option>
                  <option value="EXTERIOR">EXTERIOR</option>
                </select>
                {errors && errors.improvement_type ? <div className="text-red-600">{errors['improvement_type'][0]}</div> : ""}
              </div>
              <div className="mb-4">
                <InputTextState type="number" value={improveApplication.bond_receipt_number} onChange={ev => setImproveApplication({...improveApplication, bond_receipt_number: ev.target.value})} placeholder="Bond Receipt Number" label="Bond Receipt Number" className="w-3/12 mb-2 h-14"/>
                {errors && errors.bond_receipt_number ? <div className="text-red-600">{errors['bond_receipt_number'][0]}</div> : ""}
              </div>
              {improveApplication.improvement_type === 'EXTERIOR' && (
                <div className="mb-4">
                  <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Additional Structures</h3>
                  <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                      {listOfAdditionalStructure && listOfAdditionalStructure.map((ads, index) => (
                        <li key={index} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                            <div className="flex items-center pl-3">
                                <input type="checkbox" value={ads} checked={improveApplication.additional_structure.includes(ads)} onChange={e => handleAdditionalStructure(ads)} className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"/>
                                <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ads}</label>
                            </div>
                        </li>
                      ))}
                  </ul>
                  {errors && errors.additional_structure ? <div className="text-red-600">{errors['additional_structure'][0]}</div> : ""}
                </div>
              )}
              {(improveApplication.improvement_type === 'EXTERIOR' && improveApplication.additional_structure.length > 0) && (
                  <div>
                    {(improveApplication.additional_structure.includes('Balcony') || improveApplication.additional_structure.includes('Second Floor Room Extension')) ? (
                      <div className="mb-4">
                        <InputTextState type="text" value={improveApplication.building_permit_number} onChange={ev => setImproveApplication({...improveApplication, building_permit_number: ev.target.value})} placeholder="Building Permit Number" label="Building Permit Number" className="w-3/12 h-14"/>
                          {errors && errors.building_permit_number ? <div className="text-red-600">{errors['building_permit_number'][0]}</div> : ""}
                        </div>
                    ) : (
                      <div className="mb-4">
                        <InputTextState type="number" value={improveApplication.fencing_permit_number} onChange={ev => setImproveApplication({...improveApplication, fencing_permit_number: ev.target.value})} placeholder="Fencing Permit Number" label="Fencing Permit Number" className="w-3/12 h-14"/>
                        {errors && errors.fencing_permit_number ? <div className="text-red-600">{errors['fencing_permit_number'][0]}</div> : ""}
                      </div>
                    )}
                  </div>
              )} 
              <Button type="submit" color="teal" loading={submitLoading} value="Save Improve Application" className="block h-14"/>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
