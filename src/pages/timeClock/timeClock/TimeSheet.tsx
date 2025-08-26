// import { useState } from "react";
// import { FaCircle } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// // import ItemSelector from "./ItemSelector";
// import more from "../../../assets/more.png";

// const TimeSheet = () => {
//   const data = [
//     {
//       id: 1,
//       date: "2025-03-20",
//       loginTime: "08:00 AM",
//       lunchStart: "12:00 PM",
//       lunchEnd: "12:30 PM",
//       logout: "05:00 PM",
//       exceptionStart: "03:00 PM",
//       exceptionEnd: "03:15 PM",
//       vacation: "No",
//     },
//     {
//       id: 2,
//       date: "2025-03-21",
//       loginTime: "08:15 AM",
//       lunchStart: "12:10 PM",
//       lunchEnd: "12:40 PM",
//       logout: "05:10 PM",
//       exceptionStart: "02:45 PM",
//       exceptionEnd: "03:00 PM",
//       vacation: "No",
//     },
//     {
//       id: 3,
//       date: "2025-03-20",
//       loginTime: "08:00 AM",
//       lunchStart: "12:00 PM",
//       lunchEnd: "12:30 PM",
//       logout: "05:00 PM",
//       exceptionStart: "03:00 PM",
//       exceptionEnd: "03:15 PM",
//       vacation: "No",
//     },
//     {
//       id: 4,
//       date: "2025-03-21",
//       loginTime: "08:15 AM",
//       lunchStart: "12:10 PM",
//       lunchEnd: "12:40 PM",
//       logout: "05:10 PM",
//       exceptionStart: "02:45 PM",
//       exceptionEnd: "03:00 PM",
//       vacation: "No",
//     },
//     {
//       id: 5,
//       date: "2025-03-20",
//       loginTime: "08:00 AM",
//       lunchStart: "12:00 PM",
//       lunchEnd: "12:30 PM",
//       logout: "05:00 PM",
//       exceptionStart: "03:00 PM",
//       exceptionEnd: "03:15 PM",
//       vacation: "No",
//     },
//     {
//       id: 6,
//       date: "2025-03-21",
//       loginTime: "08:15 AM",
//       lunchStart: "12:10 PM",
//       lunchEnd: "12:40 PM",
//       logout: "05:10 PM",
//       exceptionStart: "02:45 PM",
//       exceptionEnd: "03:00 PM",
//       vacation: "No",
//     },
//     {
//       id: 7,
//       date: "2025-03-20",
//       loginTime: "08:00 AM",
//       lunchStart: "12:00 PM",
//       lunchEnd: "12:30 PM",
//       logout: "05:00 PM",
//       exceptionStart: "03:00 PM",
//       exceptionEnd: "03:15 PM",
//       vacation: "No",
//     },
//     {
//       id: 8,
//       date: "2025-03-21",
//       loginTime: "08:15 AM",
//       lunchStart: "12:10 PM",
//       lunchEnd: "12:40 PM",
//       logout: "05:10 PM",
//       exceptionStart: "02:45 PM",
//       exceptionEnd: "03:00 PM",
//       vacation: "No",
//     },
//     {
//       id: 9,
//       date: "2025-03-20",
//       loginTime: "08:00 AM",
//       lunchStart: "12:00 PM",
//       lunchEnd: "12:30 PM",
//       logout: "05:00 PM",
//       exceptionStart: "03:00 PM",
//       exceptionEnd: "03:15 PM",
//       vacation: "No",
//     },
//     {
//       id: 10,
//       date: "2025-03-21",
//       loginTime: "08:15 AM",
//       lunchStart: "12:10 PM",
//       lunchEnd: "12:40 PM",
//       logout: "05:10 PM",
//       exceptionStart: "02:45 PM",
//       exceptionEnd: "03:00 PM",
//       vacation: "No",
//     },
//   ];
//   const navigate = useNavigate();

//   const [isOpen, setIsOpen] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 8;
//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const currentRows = data.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   const goToPreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const update = () => {
//     navigate("/update");
//   };
//   return (
//     <>
//       <div className="p-6 bg-gray-100 min-h-screen">
//         {/* Breadcrumb */}
//         <div className="flex items-center text-sm text-gray-500 mb-4"></div>
//         <div>
//           {" "}
//           <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//             Time List
//           </h1>
//         </div>
//         <div className="flex justify-between  items-center">
//           <div className="flex gap-2 items-center ">
//             <p
//               className={`text-[14px] text-black`}
//               onClick={() => "dashboardDetailes"}
//             >
//               <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//             </p>
//             <span>
//               <FaCircle className="text-[6px] text-gray-500" />
//             </span>
//             <span className="text-[14px] hover:cursor-pointer">
//               timeO'clock
//             </span>
//             <span>
//               <FaCircle className="text-[6px] text-gray-500" />
//             </span>
//             <span className="text-[14px] hover:cursor-pointer">
//               {" "}
//               time Sheet
//             </span>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="bg-white  p-4 mt-6">
//           <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
//             <div className="w-full md:w-1/2">
//               <label className="block text-sm font-medium">filter</label>
//               <select className="border w-full px-3 py-2 rounded-md">
//                 <option>This Week</option>
//                 <option>This Month </option>
//               </select>
//             </div>
//             <div className="flex items-center">
//               <div className="w-full">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="border w-full px-3 py-2 rounded-md"
//                 />
//               </div>
//               <div>
//                 <img src={more} alt="" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white overflow-x-auto  ">
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
//                 <th className="py-2 px-4 text-left">Date</th>
//                 <th className="py-2 px-4 text-left">Login Time</th>
//                 <th className="py-2 px-4 text-left">Lunch Start</th>
//                 <th className="py-2 px-4 text-left">Lunch End</th>
//                 <th className="py-2 px-4 text-left">Logout</th>
//                 <th className="py-2 px-4 text-left">Exception Start</th>
//                 <th className="py-2 px-4 text-left">Exception End</th>
//                 <th className="py-2 px-4 text-left">Vacation</th>
//                 <th className="py-2 px-4 text-left"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className="border-b hover:bg-gray-50 whitespace-nowrap"
//                 >
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.date}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.loginTime}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.lunchStart}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.lunchEnd}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.logout}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.exceptionStart}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.exceptionEnd}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.vacation}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-4 p-2">
//             <button
//               onClick={goToPreviousPage}
//               disabled={currentPage === 1}
//               className={`px-2 py-2 rounded-md ${
//                 currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
//               }`}
//             >
//               Previous
//             </button>
//             <span>
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={goToNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-md ${
//                 currentPage === totalPages
//                   ? "bg-gray-300"
//                   : "bg-brand text-white"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <td colSpan={6} className="px-2 py-3 text-end">
//             <div className="flex flex-col sm:flex-row justify-end gap-2">
//               <button
//                 onClick={openModal}
//                 className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-b from-[#22C55E] to-[#118D57] text-white rounded-md text-xs md:text-sm"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={update}
//                 className="px-3 py-1 md:px-4 md:py-2 bg-gradient-to-b from-[#FFAC82] to-[#FF5630] text-white rounded-md text-xs md:text-sm"
//               >
//                 Send to Edit
//               </button>
//             </div>
//           </td>
//         </div>
//       </div>
//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white p-4 md:p-6 rounded-lg w-3/4 sm:w-full max-w-md">
//             <h2 className="text-lg md:text-xl font-semibold text-center">
//               Confirm Your Approval Request
//             </h2>

//             <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-center gap-3">
//               <button
//                 onClick={() => {
//                   setIsOpen(false);
//                 }}
//                 className="px-4 py-2 bg-brand text-white rounded-md text-sm md:text-base"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="px-4 py-2 text-red-600 rounded-md text-sm md:text-base border border-gray-300"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TimeSheet;

import { FC, useEffect, useState } from "react";
import { employeeAllTimeLine } from "./https/timeClock";

interface TimeSheetEntry {
  date: string;
  loginTime: string | null;
  lunchStart: string | null;
  lunchEnd: string | null;
  logout: string | null;
  exceptionStart: string | null;
  exceptionEnd: string | null;
  vacation: string;
}

interface PaginationInfo {
  page: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// *** NEW ***: Define the shape of the entire API response payload for clarity
interface ApiResponse {
  data: TimeSheetEntry[];
  pagination: PaginationInfo;
  message?: string;
  totalCounts?: number;
}

// --- COMPONENT DEFINITION ---
const TimeSheet: FC = () => {
  // --- STATE HOOKS WITH EXPLICIT TYPES ---
  const [timeSheetData, setTimeSheetData] = useState<TimeSheetEntry[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // --- DATA FETCHING LOGIC ---
  const fetchTimeSheet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await employeeAllTimeLine();
      const apiData: ApiResponse = response.data;
      setTimeSheetData(apiData.data);
      setPagination(apiData.pagination);
    } catch (err: any) {
      setError(
        err.message || "An unknown error occurred while fetching the timesheet."
      );
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeSheet();
  }, [currentPage]);

  // --- EVENT HANDLERS (No changes needed) ---
  const handleNextPage = () => {
    if (pagination?.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagination?.hasPrevious) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const tableHeaders = [
    "Date",
    "Login Time",
    "Lunch Start",
    "Lunch End",
    "Logout",
    "Exception Start",
    "Exception End",
    "Vacation",
  ];

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Time List</h1>
        <p className="text-sm text-gray-500 mt-1">
          Dashboard • timeO'clock • time Sheet
        </p>
      </div>

      {/* Main Content Card */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4 sm:p-6">
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <label
              htmlFor="filter"
              className="text-sm font-medium text-gray-700"
            >
              Filter
            </label>
            <select
              id="filter"
              className="mt-1 block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              defaultValue="This Week"
            >
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {/* If you add an icon, you can use Heroicons or another library here */}
          </div>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map((header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="text-center py-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="text-center py-4 text-red-500"
                  >
                    {error}
                  </td>
                </tr>
              ) : timeSheetData.length > 0 ? (
                timeSheetData.map((entry) => (
                  <tr key={entry.date}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {entry.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.loginTime || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.lunchStart || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.lunchEnd || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.logout || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.exceptionStart || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.exceptionEnd || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.vacation}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length}
                    className="text-center py-4 text-gray-500"
                  >
                    No data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination and Actions */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={!pagination?.hasPrevious || isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {pagination?.page || 1} of {pagination?.totalPages || 1}
            </span>
            <button
              onClick={handleNextPage}
              disabled={!pagination?.hasNext || isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700">
              Approve
            </button>
            <button className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
              Send to Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
