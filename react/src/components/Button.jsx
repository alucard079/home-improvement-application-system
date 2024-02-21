import React from 'react'
import Loader from './Loader'

export default function ({type, value, loading, className, color, ...props}) {
  let classType = "";
  if(color === "teal") {
    classType = "bg-teal-600 hover:bg-teal-700 disabled:bg-teal-500 focus:ring-2 focus:outline-none focus:ring-teal-300"
  } else if(color === "red") {
    classType = "bg-red-600 hover:bg-red-700 disabled:bg-red-500 focus:ring-2 focus:outline-none focus:ring-red-300"
  } else if(color === "blue") {
    classType = "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-300"
  }
  return (
    <>
        <button type={type} {...props} className={`p-2.5 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ${classType} ${className}`}>
            {loading ? (
                <Loader color="#FFFFFF" loading={loading}/>
            ) : (
                <span>{value}</span>
            )}
        </button>
    </>
  )
}
