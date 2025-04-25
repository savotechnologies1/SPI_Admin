import data from "../../components/Data/topSuppliesData";

const TopSuppliers = () => {
  return (
    <div className=" py-6">
      <h1 className="text-xl font-semibold px-4 ">Top Suppliers</h1>

      <div className="overflow-x-auto py-6">
        <table className="w-full  bg-white">
          <thead>
            <tr className="bg-[#F4F6F8]">
              <th className="px-4 py-3 text-left text-gray-400 font-medium">
                Suppliers
              </th>
              <th className="px-4 py-3 text-left text-gray-400 font-medium">
                Product
              </th>
              <th className="px-4 py-3 text-left text-gray-400 font-medium">
                Country
              </th>
              <th className="px-4 py-3 text-left text-gray-400 font-medium">
                Total
              </th>
              <th className="px-4 py-3 text-left text-gray-400 font-medium">
                Rank
              </th>
            
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-dashed  border-gray-200"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 mr-4">
                      <img src={item.avatar} alt="" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-[#052C89]">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm sm:text-base font-medium text-[#052C89]">
                  {item.product}
                </td>
                <td className="px-4 py-4 text-sm sm:text-base font-medium text-[#052C89]">
                  <img src={item.country} alt="" />
                </td>
                <td className="px-4 py-4 text-sm sm:text-base font-medium text-[#052C89]">
                  {item.total}
                </td>
                <td className="px-2 py-4">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      item.rank === "Top 1"
                        ? "text-green-800 bg-green-100"
                        : item.rank === "Top 2"
                        ? "text-[#5119B7] bg-[#8E33FF29]"
                        : item.rank === "Top 3"
                        ? "text-[#006C9C] bg-[#00B8D929]"
                        : item.rank === "Top 4"
                        ? "text-[#B76E00] bg-[#FFAB0029]"
                        : "text-gray-800 bg-gray-100"
                    }`}
                  >
                    {item.rank}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSuppliers;
