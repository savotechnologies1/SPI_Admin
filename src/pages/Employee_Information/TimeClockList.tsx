import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import search_2 from "../../assets/search_2.png";
import more from "../../assets/more.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import data from "../../components/Data/TimeClockData";
import { selectProcessApi } from "../Work_Instrcution.tsx/https/workInstructionApi";
import { allTimeClock } from "./https/EmployeeApis";
import { Loader } from "lucide-react";

// Define interfaces for better type checking (if using TypeScript)
interface CustomerItem {
  id: string;
  name: string;
  email: string;
  process: string;
  hours: string;
  vacationDate: string;
  vacationHours?: string; // vacationHours can be optional based on your backend mapping
}

interface ProcessOption {
  id: string;
  name: string;
  partFamily: string;
  processDesc: string;
}

const TimeClockList = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const rowsPerPage = 5; // Consider making this dynamic or a constant
  const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [processList, setProcessList] = useState<ProcessOption[]>([]); // State for process dropdown
  const [selectedProcess, setSelectedProcess] = useState(""); // State for selected process/role filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Processes for the dropdown
  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        const data = await selectProcessApi();
        setProcessList(data);
      } catch (err) {
        console.error("Failed to fetch processes:", err);
        setError("Failed to load process options.");
      }
    };
    fetchProcesses();
  }, []);

  // Fetch Time Clock List data
  const fetchEmployeeList = useCallback(
    async (page = 1) => {
      setLoading(true);
      setError(null);
      try {
        const response = await allTimeClock(
          page,
          rowsPerPage,
          selectedProcess,
          searchVal
        );
        setCustomerData(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      } catch (err) {
        console.error("Error fetching time clock data:", err);
        setError("Failed to load time clock entries.");
      } finally {
        setLoading(false);
      }
    },
    [rowsPerPage, selectedProcess, searchVal] // Depend on searchVal and selectedProcess
  );

  console.log("searchValsearchVal", searchVal);

  useEffect(() => {
    fetchEmployeeList(currentPage);
  }, [currentPage, fetchEmployeeList]); // Depend on currentPage and the memoized fetchEmployeeList

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleProcessChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProcess(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new filter
  };

  const handleRowClicked = (id: string) => {
    navigate(`/time-sheet/${id}`); // Navigate to specific time sheet using ID
  };

  if (loading && customerData.length === 0) {
    // Show loading only if no data has been loaded yet
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">
          <Loader />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-4  mt-5 md:p-7">
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
              Time Clock List
            </h1>
          </div>
          <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
            <p className="text-sm md:text-base text-black">
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
            <span className="text-sm md:text-base">Employees</span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
            <span className="text-sm md:text-base">Time Clock</span>
          </div>

          {/* Table Section */}
          <div className="rounded-md mt-4 bg-white">
            <div className="p-2 md:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
                {/* Dropdown for Role (now Process) */}
                <div className="flex flex-col ">
                  <div className="flex flex-col w-full sm:w-auto border rounded-md p-1">
                    <select
                      id="role"
                      className="mt-1 block w-full sm:w-40 md:w-52 rounded-md border-gray-300 text-xs md:text-sm outline-none"
                      value={selectedProcess}
                      onChange={handleProcessChange}
                    >
                      <option value="">Select Process</option>
                      {processList.map((process) => (
                        <option key={process.id} value={process.name}>
                          {process.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Field */}
                <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
                  <input
                    type="text"
                    placeholder="Search by Name, Email ..."
                    className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm outline-none"
                    value={searchVal}
                    onChange={handleSearchChange}
                  />
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img
                      src={search_2}
                      alt=""
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-[#F4F6F8]">
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Name
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden sm:table-cell">
                      Process
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Duration
                    </th>
                    <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden md:table-cell">
                      Vacation Date
                    </th>
                    {/* <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                      Vacation Hours
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {customerData.length === 0 && !loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-4 text-gray-500"
                      >
                        No time clock entries found.
                      </td>
                    </tr>
                  ) : (
                    customerData.map((item) => (
                      <tr
                        key={item.id}
                        className={`border-b border-dashed border-gray-200 cursor-pointer hover:bg-gray-100`}
                        onClick={() => handleRowClicked(item.id)}
                      >
                        <td className="px-2 py-3">
                          <div className="flex items-center">
                            {/* You might want to add an avatar placeholder here if available */}
                            <div>
                              <p className="text-xs md:text-sm font-medium">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium hidden sm:table-cell">
                          {item.process}
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium">
                          {item.hours}
                        </td>
                        <td className="px-2 py-3 text-xs md:text-sm font-medium hidden md:table-cell">
                          {item.createDate}
                        </td>
                        {/* <td className="px-2 py-3 text-xs md:text-sm font-medium hidden lg:table-cell">
                          {item.vacationHours || "N/A"}
                        </td> */}
                      </tr>
                    ))
                  )}
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
                  // Add approval logic here
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
