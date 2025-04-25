import { useState } from "react";

import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import more from "../../assets/more.png";
import edit from "../../assets/edit_icon.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import data from "../../components/Data/processListData";

const ProcessList = () => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = data.slice(startIndex, startIndex + rowsPerPage);



 

  return (
    <div className="p-7">
      <div>
        <div className="flex  justify-between ">
          <div>
            {" "}
            <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Process
            </h1>
          </div>

        
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-2 items-center ">
            <p
              className={`text-[16px] text-black`}
              onClick={() => ("dashboardDetailes")}
            >
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-[16px] hover:cursor-pointer">Process</span>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-[16px] hover:cursor-pointer">Process List</span>
          </div>
        </div>
        <div className="rounded-md ">
          <div className="flex flex-col justify-between mt-6  bg-white rounded-t  ">
            

          
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-[#F4F6F8]">
                 
                  <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Process Name
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Machine Name
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Cycle Time
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  RatePerHour
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Process Order
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dashed border-gray-200"
                  >
                   
                   
                    <td className="px-3 py-4 text-sm sm:text-base font-medium ">
                      {item.name}
                    </td>
                    <td className="px-3 py-4 text-sm sm:text-base font-medium ">
                      {item.process_name}
                    </td>
                    <td className="px-3 py-4 text-sm sm:text-base font-medium ">
                      {item.cycle_time}
                    </td>
                    <td className="px-3 py-4 text-sm sm:text-base font-medium ">
                      {item.RatePerHour}
                    </td>
                    <td className="px-3 py-4 text-sm sm:text-base font-medium ">
                      {item.process_order}
                    </td>
                  
                    <td className="px-3 py-4 flex gap-4">
                      <button className="text-blue-600 hover:underline py-4">
                        <img src={edit} alt="Edit" />
                      </button>
                      <button className="text-blue-600 hover:underline py-4">
                        <img src={more} alt="More" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex  justify-end items-center  bg-white py-2">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>

              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded ${
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <img src={back} alt="" />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-2  rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300"
                }`}
              >
                <img src={next} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessList;
