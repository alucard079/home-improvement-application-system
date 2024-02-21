export default function TableHeader({value, ...props}) {
  return (
    <>
        <th scope="col" className="px-6 py-3 text-white font-semibold bg-teal-600" {...props}>
            {value}
        </th>
    </>
  )
}
