
const data = [
  {
    EMP_ID:
      "Quick Brackets for inner Rockers -199992006 Silverado/Sierra Extended Cab",
    process: "Sanding ",
    is_scrap: "10",
  },
  {
    EMP_ID:
      "Quick Brackets for inner Rockers -199992006 Silverado/Sierra Extended Cab",
    process: "Sanding ",
    is_scrap: "10",
  },
  {
    EMP_ID:
      "Quick Brackets for inner Rockers -199992006 Silverado/Sierra Extended Cab",
    process: "Sanding ",
    is_scrap: "10",
  },
  {
    EMP_ID:
      "Quick Brackets for inner Rockers -199992006 Silverado/Sierra Extended Cab",
    process: "Sanding ",
    is_scrap: "10",
  },
  {
    EMP_ID:
      "Quick Brackets for inner Rockers -199992006 Silverado/Sierra Extended Cab",

    process: "Sanding ",

    is_scrap: "10",
  },
];

const PartTable = () => {
  
  return (
    <div>
      <h1 className='font-semibold p-2'>Part Completed</h1>
       <div className="overflow-x-auto">

              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="border-b bg-[#F4F6F8] text-left text-[#637381] whitespace-nowrap">
                    {[
                      "Process",
                      "Employee ID",
                      "Is Scrap ",
                  
                    ].map((header, index) => (
                      <th key={index} className="px-3 py-2 text-sm font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="border-b text-sm whitespace-nowrap">
                      <td className="px-3 py-2">
                        <p>{item.process}</p>
                      </td>
                      <td className="px-3 py-2">{item.EMP_ID}</td>

                      <td className="px-3 py-2 flex flex-col">
                        {item.is_scrap}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default PartTable
