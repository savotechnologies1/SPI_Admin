const Productivity = ({ productivity }) => {
  console.log("productivityproductivity", productivity);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:w-[100%] overflow-x-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">Producitivity</h2>
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
              <th className="py-2 px-4 text-left">Process Name</th>
              <th className="py-2 px-4 text-left">Employee Name</th>
              <th className="py-2 px-4 text-left">Cycle Time</th>
              <th className="py-2 px-4 text-left">Qty</th>
              <th className="py-2 px-4 text-left">Scrap</th>
              <th className="py-2 px-4 text-left">Producitvity</th>
              <th className="py-2 px-4 text-left">Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {productivity?.length > 0 ? (
              productivity?.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{item.process} ({item.machineName})</td>
                  <td className="py-2 px-4">{item.employee}</td>
                  <td className="py-2 px-4">{item.cycleTime}</td>
                  <td className="py-2 px-4">{item.totalQty}</td>
                  <td className="py-2 px-4">{item.scrap}</td>
                  <td className="py-2 px-4">{item.productivity}</td>
                  <td className="py-2 px-4">{item.efficiency}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productivity;
