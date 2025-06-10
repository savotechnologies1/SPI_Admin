import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import CapacityBarChart from "./CapacityBarChart";
import CapacityRadialChart from "./CapacityRadialChart";

const CapacityStatus = () => {
  const data = [
    {
      id: 1,
      process: "Sanding",
      product:
        "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
      load: 0.0,
      quantity: 10,
      openDate: "11 Feb 2022",
      time: "9:00PM",
    },
    {
      id: 2,
      process: "Inspection",
      product:
        "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
      load: 0.0,
      quantity: 10,
      openDate: "11 Feb 2022",
      time: "9:00PM",
    },
    {
      id: 3,
      process: "CutTrim",
      product:
        "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
      load: 0.0,
      quantity: 10,
      openDate: "11 Feb 2022",
      time: "9:00PM",
    },
    {
      id: 4,
      process: "Termoforming",
      product:
        "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
      load: 0.0,
      quantity: 10,
      openDate: "11 Feb 2022",
      time: "9:00PM",
    },
    {
      id: 5,
      process: "Technology",
      product:
        "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
      load: 0.0,
      quantity: 10,
      openDate: "11 Feb 2022",
      time: "9:00PM",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4"></div>
      <div>
        {" "}
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Capacity Status
        </h1>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            daily schedule & capacity
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            capacity status
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="  mt-6 flex  flex-col md:flex-row  justify-between gap-4">
        <div className="   md:w-[60%]  ">
          <CapacityBarChart />
        </div>
        <div className="md:w-[40%] ">
          <CapacityRadialChart />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white   rounded-lg mt-4 overflow-auto">
        <h1 className="p-4 text-lg font-semibold">Process Status</h1>
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-2 px-4 text-left ">Process</th>
              <th className="py-2 px-4 text-left ">Product</th>
              <th className="py-2 px-4 text-left ">Load</th>
              <th className="py-2 px-4 text-left ">Quality</th>
              <th className="py-2 px-4 text-left ">Open Date</th>
              {/* <th className="py-2 px-4 text-left "></th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
                  {row.process}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
                  {row.product}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">{row.load}</td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  {row.quantity}
                </td>

                <td className="py-3 px-4 text-[#061D22] text-sm  flex flex-col space-x-3 items-start whitespace-nowrap">
                  <p>{row.openDate}</p>
                  <p className="text-xs text-gray-400 ">{row.time}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {/* <div className="flex justify-between items-center mt-4 p-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-2 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-brand text-white"
            }`}
          >
            Next
          </button>
        </div> */}

        <div>
          <p className="text-sm p-4 text-right font-semibold">View All </p>
        </div>
      </div>
    </div>
  );
};

export default CapacityStatus;
