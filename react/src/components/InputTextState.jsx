import React from 'react'

const InputTextState = ({value, label, placeholder, type, onChange, className}) => {
  return (
    <>
        <label className="block mb-2 text-sm font-medium text-gray-900 light:text-dark">{label}</label>
        <input type={type} value={value} placeholder={placeholder} onChange={onChange} className={`border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-teal-500 focus:border-teal-500 p-2.5 ${className}`}/>
    </>
  )
}

export default InputTextState