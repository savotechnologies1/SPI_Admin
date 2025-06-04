import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import search_2 from "../../assets/search_2.png";
import more from "../../assets/more.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import data from "../../components/Data/TimeClockData";

const TimeClockList = () => {
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = data.slice(startIndex, startIndex + rowsPerPage);

  const handleRowClick = (index: number) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const update = () => {
    navigate('/update');
  };

  return (
    <>
      <div className="p-4 md:p-7">
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
              Time Clock List
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
            <p className="text-sm md:text-base text-black" onClick={() => ("dashboardDetailes")}>
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
            <span className="text-sm md:text-base hover:cursor-pointer">Employees</span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
            <span className="text-sm md:text-base hover:cursor-pointer">Approval</span>
          </div>

          {/* Table Section */}
          <div className="rounded-md mt-4 bg-white">
            <div className="p-2 md:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
                {/* Dropdown for Role */}
                <div className="flex flex-col w-full sm:w-auto border  rounded-md p-1">
                  <label htmlFor="role" className="text-xs md:text-sm font-medium text-gray-500">
                    Role
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full sm:w-40 md:w-52 rounded-md border-gray-300 text-xs md:text-sm outline-none"
                    defaultValue="Project Coordinator"
                  >
                    <option>Newly added</option>
                    <option>Developer</option>
                    <option>Designer</option>
                  </select>
                </div>

                {/* Search Field */}
                <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm outline-none"
                  />
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img src={search_2} alt="" className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>

                <div className="hidden sm:block">
                  <img src={more} alt="" className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-[#F4F6F8]">
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                      <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Name
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden sm:table-cell">
                      Process
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Hours
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden md:table-cell">
                      Vacation
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                      Hour
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((item, index) => (
                    <React.Fragment key={item.id }>
                      <tr
                        className={`border-b border-dashed border-gray-200 cursor-pointer ${
                          selectedRow === index ? "bg-gray-100" : ""
                        }`}
                        onClick={() => handleRowClick(index)}
                      >
                        <td className="px-2 py-2">
                          <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
                        </td>
                        <td className="px-2 py-3">
                          <div className="flex items-center">
                            <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-300 mr-2 md:mr-4 overflow-hidden">
                              <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-xs md:text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium hidden sm:table-cell">
                          {item.Process}
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium">
                          {item.Hours}
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium hidden md:table-cell">
                          {item.Vacation}
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium hidden lg:table-cell">
                          {item.Hour}
                        </td>
                      </tr>

                      {selectedRow === index && (
                        <tr>
                          <td colSpan={6} className="px-2 py-3 text-end">
                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                              <button
                                onClick={openModal}
                                className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-b from-[#22C55E] to-[#118D57] text-white rounded-md text-xs md:text-sm"
                              >
                                Approve
                              </button>
                              <button
                                onClick={update}
                                className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-b from-[#FFAC82] to-[#FF5630] text-white rounded-md text-xs md:text-sm"
                              >
                                Send to Edit
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2">
                <p className="text-xs md:text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`p-1 md:p-2 rounded ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <img src={back} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-1 md:p-2 rounded ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    <img src={next} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-4 md:p-6 rounded-lg w-3/4 sm:w-full max-w-md">
            <h2 className="text-lg md:text-xl font-semibold text-center">
              Confirm Your Approval Request
            </h2>

            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => {
                  setIsOpen(false); 
                  console.log("Request Approved");
                }}
                className="px-4 py-2 bg-brand text-white rounded-md text-sm md:text-base"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsOpen(false)} 
                className="px-4 py-2 text-red-600 rounded-md text-sm md:text-base border border-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeClockList;