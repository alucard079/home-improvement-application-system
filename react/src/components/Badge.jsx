export default function Badge({value, className, ...props}) {
  return (
    <>
        {value ? (
            <span className={`bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded ${className}`} {...props}>
                {value}
            </span>
        ) : (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded" {...props}>
                No data found
            </span>
        )}
    </>
  )
}
