import React from 'react'

const InputText = ({value, label, placeholder, type, onChange, className}) => {
  return (
    <>
        <label className="block mb-2 text-sm font-medium text-gray-900 light:text-dark">{label}</label>
        <input type={type} ref={value} placeholder={placeholder} onChange={onChange} className={`border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 ${className}`}/>
    </>
  )
}

export default InputText