import React from 'react'

export default function Card({children}) {
  return (
    <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 light:bg-white-800 light:border-gray-700'>
        {children}
    </div>
  )
}
