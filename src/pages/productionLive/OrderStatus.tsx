import data from "../../components/Data/orderStatus2";
import client_icon from "../../assets/client.png";
import date_icon from "../../assets/date.png";

import { FaCalendar } from "react-icons/fa";

const OrderStatus = () => {
  return (
    <div className=" py-6 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          {" "}
          <h1 className="text-xl font-semibold px-4  ">Orders Status</h1>
        </div>
        <div className="flex sm:flex-row  gap-2 items-center md:px-4">
          <div className="border p-2 rounded-md border-black flex items-center gap-2">
            <FaCalendar />
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
                    <img src={date_icon} alt="" />
                  </p>
                  <p> Date</p>
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
                  <p></p>
                  <p>CT </p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <div className="flex gap-4 items-center">
                  <p>Qty </p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p> Scrap</p>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p>Efficiency </p>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p>Production </p>
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
                      <p className="text-sm sm:text-base whitespace-nowrap ">
                        {item.process}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  whitespace-nowrap">
                  {item.date}
                </td>

                <td className="px-4 py-4 text-sm sm:text-base whitespace-nowrap  ">
                  <p className="font-medium font-sm"> {item.name}</p>
                </td>
                <td className="px-4 py-4 text-sm sm:text-base whitespace-nowrap ">
                  {item.CT}
                </td>
                <td className="px-4 py-4">{item.qty}</td>

                <td className="px-4 py-4 text-sm sm:text-base whitespace-nowrap ">
                  {item.scrp}
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.efficiency}
                </td>

                <td className="px-4 py-4 text-sm sm:text-base  ">
                  <div className="flex gap-2 items-center cursor-pointer">
                    {item.production}
                  </div>
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
