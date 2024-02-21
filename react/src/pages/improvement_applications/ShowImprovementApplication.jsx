import React from 'react'
import { Modal } from "flowbite-react"
import { useState, useEffect, useRef } from 'react'
import Button from '../../components/Button'
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import Badge from '../../components/Badge';

export default function ShowImprovementApplication({improvementApplication, onShow, onClose}) {
  const [parseData, setParseData] = useState({})
  const componentToPrint = useRef();

  useEffect(() => {
    setParseData(JSON.parse(improvementApplication));
  }, [improvementApplication])

  console.log(parseData);
  return (
   <>
    <Modal
        show={onShow}
        onClose={onClose}
    >
        <div ref={componentToPrint}>
            <Modal.Header>
                Improvement Application: {parseData ? parseData.unit_id : ''}
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div className="flex flex-col pb-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Unit ID</dt>
                            <dd className="text-lg font-semibold">
                                {parseData ? parseData.unit_id : ''}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Improvement Type</dt>
                            <dd className="text-lg font-semibold">
                                {parseData ? parseData.improvement_type : ''}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Bond Receipt Number</dt>
                            <dd className="text-lg font-semibold">
                                {parseData ? parseData.bond_receipt_number : ''}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Additional Structure</dt>
                            <dd className="text-lg font-semibold flex flex-row">
                                {
                                    (parseData.additional_structure && parseData.additional_structure.length > 0 ) ? parseData.additional_structure.map((ads, index) => (
                                        <Badge key={index} value={ads} className="mr-2"/>
                                    )) : (
                                        <Badge value=""/>
                                    )
                                }
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Building Permit Number</dt>
                            <dd className="text-lg font-semibold">
                                {(parseData && parseData.building_permit_number) ? parseData.building_permit_number  : (<Badge value=""/>)}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Fencing Permit Number</dt>
                            <dd className="text-lg font-semibold">
                                {(parseData && parseData.fencing_permit_number) ? parseData.fencing_permit_number  : (<Badge value=""/>)}
                            </dd>
                        </div>
                        <div className="flex flex-col py-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Building Permit Date Application</dt>
                            <dd className="text-lg font-semibold">
                                {(parseData && parseData.building_permit_date_application) ? moment(parseData.building_permit_date_application).format("LL")  : (<Badge value=""/>)}
                            </dd>
                        </div>
                        <div className="flex flex-col pt-3">
                            <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Fencing Permit Date Application</dt>
                            <dd className="text-lg font-semibold">
                                {(parseData && parseData.fencing_permit_date_application) ? moment(parseData.fencing_permit_date_application).format("LL")  : (<Badge value=""/>)}
                            </dd>
                        </div>
                    </dl>
                </div>
            </Modal.Body>
        </div>
        <Modal.Footer>
            <ReactToPrint
                trigger={() => <Button color="teal" value="Print"/>}
                content={() => componentToPrint.current}
                documentTitle={`${parseData ? parseData.unit_id : ''} - ${moment().format('LL')}`}
            />
            <Button
                color="red"
                onClick={onClose}
                value="Decline"
            />
        </Modal.Footer>
    </Modal>
   </>
  )
}
