import React from 'react'
import RiseLoader from "react-spinners/RiseLoader";

export default function ({loading, color}) {
  return (
    <div>
        <RiseLoader
            loading={loading}
            color={color}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  )
}
