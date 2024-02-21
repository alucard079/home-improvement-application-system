import React from 'react'
import { Link } from "react-router-dom";

export default function CustomLink({to, className, value}) {
  return (
    <>
        <Link to={to} className={`p-2.5 text-white bg-teal-600 hover:bg-teal-700 disabled:bg-teal-500 focus:ring-2 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}>
            {value}
        </Link>
    </>
  )
}
