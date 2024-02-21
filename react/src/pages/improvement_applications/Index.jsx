import { useState, useEffect } from 'react'
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';
import Loader from "../../components/Loader";
import InputTextState from '../../components/InputTextState';
import Button from '../../components/Button';
import CustomLink from '../../components/CustomLink';
import Title from '../../components/Title';
import ShowImprovementApplication from './ShowImprovementApplication';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import MagnifyingGlassIcon from '../../components/icons/MagnifyingGlassIcon';
import XMarkIcon from '../../components/icons/XMarkIcon';
import EyeIcon from '../../components/icons/EyeIcon';
import { useNavigate } from 'react-router-dom';
import PencilIcon from '../../components/icons/PencilIcon';
import { TrashIcon } from '../../components/icons/TrashIcon';
import Badge from '../../components/Badge';
import TableHeader from '../../components/TableHeader';

export default function ImprovementApplications() {
  const [improvementApplications, setImprovementApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [improvementApplication, setImprovementApplication] = useState(null);
  const [showImprovementApplication, setShowImprovementApplication] = useState(false);
  const navigate = useNavigate();

  const getImprovementApplications = () => {
    setLoading(true);
    axiosClient.get('/improvement-applications')
    .then(({data}) => {
      setLoading(false);
      setImprovementApplications(data);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  const onDelete = (id) => {
    axiosClient.delete('/improvement-applications/' + id)
    .then((response) => {
        if(response.status === 204) {
          toast.success("🦄 Wow so easy to delete!")
          getImprovementApplications();
        }
    })
    .catch((error) => {
      toast.error("Can't delete, something went wrong!")
      console.log(error);
    });
  }

  const onEdit = (id) => {
    if (id) navigate(`/improvement-applications/${id}/edit`);
  }

  const onSearch = (searchValue) => {
    setLoading(true);
    axiosClient.get('/improvement-applications', {
      params: {
        search: searchValue
      }
    })
    .then(({data}) => {
      setLoading(false);
      setImprovementApplications(data);
    })
    .catch((error) => {
      setLoading(false);
      console.log(error);
    });
  }

  const onClear = (ev) => {
    ev.preventDefault();
    if(search) {
      setSearch('')
      getImprovementApplications();
    }
  }

  const onPaginate = (page) => {
    setLoading(true);
    axiosClient.get('/improvement-applications', {
      params: {
        page: page
      }
    })
    .then(({data}) => {
      console.log(data);
      setLoading(false);
      setImprovementApplications(data);
    })
    .catch((error) => {
      setLoading(false);
    });
  }

  const onShowImprovementApplication = (ip) => {
    if(ip) {
      let stringData = JSON.stringify(ip);
      setImprovementApplication(stringData);
    }
    setShowImprovementApplication(true);
  }

  const onClearImprovementApplication = () => {
    setImprovementApplication(null);
    setShowImprovementApplication(false);
  }

  useEffect(() => {
    getImprovementApplications();
  }, [])
  
  return (
    <div>
      <div className='flex items-center justify-between mb-4'>
        <Title value="Improvement Applications"/>
        <CustomLink to="/improvement-applications/create" value="Add Improvement Application"/>
      </div>
     
      <div className='card animated fadeInDown'>
        {loading ? (
          <div className='flex align-items-center'>
            <span className='mr-2'>
              Loading...
            </span>
            <Loader
                loading={loading}
                color="#0D9488"
            />
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className='flex align-items-center m-4'> 
                <InputTextState type="text" value={search} onChange={ev => setSearch(ev.target.value)} placeholder="Search Unit ID" className="mr-2"/>
                <Button type="button" onClick={e => onSearch(search)} color="teal" value={<MagnifyingGlassIcon width="20" height="20"/>} disabled={search === '' ? true : false} className="mr-2"/>
                <Button type="button" onClick={e => onClear(e)} color="red" value={<XMarkIcon width="20" height="20"/>} disabled={search ? false : true}/>
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                          <TableHeader value={"Unit ID"}/>
                          <TableHeader value={"Improvement Type"}/>
                          <TableHeader value={"Bond Receipt Number"}/>
                          <TableHeader value={"Additional Structure"}/>
                          <TableHeader value={"Building Permit Number"}/>
                          <TableHeader value={"Fencing Permit Number"}/>
                          <TableHeader value={"Building Permit Date Application"}/>
                          <TableHeader value={"Fencing Permit Date Application"}/>
                          <TableHeader value={"Actions"}/>
                      </tr>
                  </thead>
                  <tbody>
                    {improvementApplications.data &&  improvementApplications.data.length > 0 ? improvementApplications.data.map(ip => (
                      <tr key={ip.id} className="bg-white border-b  hover:bg-gray-50">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                          {ip.unit_id}
                        </th>
                        <td className="px-6 py-4">{ip.improvement_type}</td>
                        <td className="px-6 py-4">{ip.bond_receipt_number}</td>
                        <td className="px-6 py-4">
                          <div className='flex flex-col'>
                          {
                            ip.additional_structure.length > 0 ? ip.additional_structure.map((ads, index) => (
                              <Badge key={index} value={ads} className="mb-2"/>
                            )) : (
                              <Badge value=""/>
                            )
                          }
                          </div>
                        </td>
                        <td className="px-6 py-4">{ip.building_permit_number ? ip.building_permit_number : <span className='text-red-700'>No Building Permit</span>}</td>
                        <td className="px-6 py-4">{ip.fencing_permit_number ? ip.fencing_permit_number : <span className='text-red-700'>No Fencing Permit</span>}</td>
                        <td className="px-6 py-4">
                          {
                            ip.building_permit_date_application ? moment(ip.building_permit_date_application).format("LL") : (<span className='text-red-700'>No Date Application Yet</span>)
                          }
                        </td>
                        <td className="px-6 py-4">
                          {
                            ip.fencing_permit_date_application ? moment(ip.fencing_permit_date_application).format("LL") : (<span className='text-red-700'>No Date Application Yet</span>)
                          }
                        </td>
                        <td className="px-6 py-4">
                          <Button type="button" color="blue" value={<EyeIcon width="15" height="15"/>} onClick={e => onShowImprovementApplication(ip)}/>
                          &nbsp;
                          <Button type="button" onClick={e => onEdit(ip.id)} color="teal" value={<PencilIcon width="15" height="15"/>}/>
                          &nbsp;
                          <Button type="button" onClick={e => onDelete(ip.id)} color="red" value={<TrashIcon width="15" height="15"/>}/>
                        </td>
                      </tr>
                    )) : (
                      <tr className="bg-white border-b  hover:bg-gray-50">
                        <td className="px-6 py-4 text-red-700 text-center" colSpan="9">
                          <Badge value=""/>
                        </td>
                      </tr>
                    )}
                  </tbody>
              </table>
              <div className='flex justify-end m-5'>
                <Pagination 
                  paginations={improvementApplications.meta ? improvementApplications.meta.links : []}
                  onPaginate={onPaginate}
                />
              </div>
          </div>
        )}
      </div>  

      {improvementApplication && (
        <ShowImprovementApplication improvementApplication={improvementApplication} onShow={showImprovementApplication} onClose={onClearImprovementApplication}/>
      )}
    </div>
  )
}
