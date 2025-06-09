import data from "../../components/Data/customerReturnData";
import client_icon from "../../assets/client.png";
import date_icon from "../../assets/date.png";

import pin from "../../assets/pin.png";
import copy from "../../assets/copy.png";
import filter from "../../assets/byte_filter.png";
import fullscren from "../../assets/fullscreen.png";
import more from "../../assets/more.png";

const CustomerReturn = () => {
  return (
    <div className=" py-6 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          {" "}
          <h1 className="text-xl font-semibold px-4  ">Customer Return</h1>
        </div>
        <div className="flex flex-col sm:flex-row  gap-2 items-center px-4">
          <div className=" p-2  flex items-center gap-2">
            <img src={pin} alt="" />
            <img src={copy} alt="" />
            <img src={filter} alt="" />
            <img src={fullscren} alt="" />
            <img className="rotate-90" src={more} alt="" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto py-6">
        <table className="w-full  bg-white">
          <thead>
            <tr className="border-b text-sm ">
              <th className="px-4 py-3 text-left font-medium ">
                <div className="flex gap-4 items-center">
                  <p>
                    <img src={date_icon} alt="" />
                  </p>
                  <p> Date</p>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium ">
                <div className="flex gap-4 items-center">
                  <p>
                    <img className="" src={client_icon} alt="" />
                  </p>
                  <p> Customer Name</p>
                </div>
              </th>

              <th className="px-4 py-3 text-left font-medium">
                <p>Part </p>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p>Is Scrap</p>
              </th>

              <th className="px-4 py-3 text-left font-medium">
                <p> Defect</p>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <p>Qty </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="">
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.date}
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  <p className="font-medium font-sm"> {item.name}</p>
                </td>

                <td className="px-4 py-4 ">{item.part}</td>
                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.scrap}
                </td>

                <td className="px-4 py-4 text-sm sm:text-base  ">
                  {item.defect}
                </td>
                <td className="px-4 py-4 text-sm sm:text-base  ">{item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerReturn;
