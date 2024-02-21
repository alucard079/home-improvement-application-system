import React from 'react'

export default function Pagination({paginations, onPaginate}) {

  const onChangePage = (url) => {
    const result = url.charAt(url.length-1);
    if(result) {
        onPaginate(result);
    }
  }

  const onAddClass = (label) => {
    if(label === '&laquo; Previous') {
        return 'rounded-l-lg';
    }
    else if(label === 'Next &raquo;') {
        return 'rounded-r-lg'
    }
  }

  return (
    <div>
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
                {paginations && paginations.map((pg, index) => (
                    pg.url && (
                        <li key={index}>
                            <a 
                                onClick={e => onChangePage(pg.url)} 
                                aria-current={pg.active && 'page'} 
                                className={`
                                    ${
                                        pg.active ?
                                        'px-3 py-2 text-white border border-gray-300 bg-teal-600 hover:bg-teal-500' :
                                        'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-teal-100 hover:text-teal-700 ' 
                                    }
                                    ${onAddClass(pg.label)}
                                `}>
                                {pg.label === '&laquo; Previous' ? 'Previous' : pg.label === 'Next &raquo;' ? 'Next' : pg.label}
                            </a>
                        </li>
                    )
                ))}
            </ul>
        </nav>
    </div>
  )
}
