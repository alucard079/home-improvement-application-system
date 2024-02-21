import React from 'react'

export default function Title({value}) {
  return (
    <>
        <h1 className='text-3xl font-semibold leading-relaxed text-gray-900'>
            {value}
        </h1>
    </>
  )
}
