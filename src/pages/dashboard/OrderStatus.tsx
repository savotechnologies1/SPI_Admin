import data from "../../components/Data/orderStatusData";
import client_icon from "../../assets/client.png";
import date_icon from "../../assets/date.png";
import calender from "../../assets/Calendar.png";
import bin from "../../assets/Bin.png";
import pencil from "../../assets/Pencil Icon.png";

const OrderStatus = () => {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className=" py-6 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          {" "}
          <h1 className="text-xl font-semibold px-4  ">Orders Status</h1>
        </div>
        <div className="flex sm:flex-row  gap-2 items-center px-4">
          <div className="border p-2 rounded-md border-black flex items-center gap-2">
            <img src={calender} alt="" />
            <select className="outline-none">
              <option value="">Jan 2024</option>
              <option value="">feb 2025</option>
            </select>
          </div>
        
        </div>
      </div>

      <div className="overflow-x-auto py-6">
        <table className="w-full  bg-white">
          <thead>
            <tr className="border-b whitespace-nowrap">
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex gap-4 items-center">
                  <p>
                    <input type="checkbox" />
                  </p>
                  <p> Process</p>
                </div>
              </th>

              <th className="px-4 py-3 text-left font-medium">
                <div className="flex gap-4 items-center">
                  <p>
                    <img className="" src={client_icon} alt="" />
                  </p>
                  <p> Employee</p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex gap-4 items-center">
                  <p>
                    <img src={date_icon} alt="" />
                  </p>
                  <p> Date</p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex gap-4 items-center">
                  <p>
                    <img src="" alt="" />
                  </p>
                  <p>Status </p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex gap-4 items-center">
                  <p>
                    <img src="" alt="" />
                  </p>
                  <p>Country </p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p> Total</p>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p> </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className=" ">
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className=" mr-4">
                      <input type="checkbox" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font- ">
                        {item.orderId}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-4 text-sm sm:text-base  whitespace-nowrap">
                  <p className="font-medium font-sm"> {item.name}</p>
                  <p className="text-gray-600 text-[14px]"> {item.email}</p>
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.date}
                </td>
                <td className="px-4 py-4">
                  {" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.country}
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.total}
                </td>

                <td className="px-4 py-6 flex gap-2 items-center ">
                  <button className="  rounded-full hover:bg-gray-100 transition">
                    <img src={pencil} alt="Edit" className="" />
                  </button>
                  <button className="  rounded-full hover:bg-gray-100 transition">
                    <img src={bin} alt="Delete" className="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatus;
