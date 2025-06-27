import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
// import ItemSelector from "./ItemSelector";
import more from "../../../assets/more.png";

const TimeSheet = () => {
  const data = [
    {
      id: 1,
      date: "2025-03-20",
      loginTime: "08:00 AM",
      lunchStart: "12:00 PM",
      lunchEnd: "12:30 PM",
      logout: "05:00 PM",
      exceptionStart: "03:00 PM",
      exceptionEnd: "03:15 PM",
      vacation: "No",
    },
    {
      id: 2,
      date: "2025-03-21",
      loginTime: "08:15 AM",
      lunchStart: "12:10 PM",
      lunchEnd: "12:40 PM",
      logout: "05:10 PM",
      exceptionStart: "02:45 PM",
      exceptionEnd: "03:00 PM",
      vacation: "No",
    },
    {
      id: 3,
      date: "2025-03-20",
      loginTime: "08:00 AM",
      lunchStart: "12:00 PM",
      lunchEnd: "12:30 PM",
      logout: "05:00 PM",
      exceptionStart: "03:00 PM",
      exceptionEnd: "03:15 PM",
      vacation: "No",
    },
    {
      id: 4,
      date: "2025-03-21",
      loginTime: "08:15 AM",
      lunchStart: "12:10 PM",
      lunchEnd: "12:40 PM",
      logout: "05:10 PM",
      exceptionStart: "02:45 PM",
      exceptionEnd: "03:00 PM",
      vacation: "No",
    },
    {
      id: 5,
      date: "2025-03-20",
      loginTime: "08:00 AM",
      lunchStart: "12:00 PM",
      lunchEnd: "12:30 PM",
      logout: "05:00 PM",
      exceptionStart: "03:00 PM",
      exceptionEnd: "03:15 PM",
      vacation: "No",
    },
    {
      id: 6,
      date: "2025-03-21",
      loginTime: "08:15 AM",
      lunchStart: "12:10 PM",
      lunchEnd: "12:40 PM",
      logout: "05:10 PM",
      exceptionStart: "02:45 PM",
      exceptionEnd: "03:00 PM",
      vacation: "No",
    },
    {
      id: 7,
      date: "2025-03-20",
      loginTime: "08:00 AM",
      lunchStart: "12:00 PM",
      lunchEnd: "12:30 PM",
      logout: "05:00 PM",
      exceptionStart: "03:00 PM",
      exceptionEnd: "03:15 PM",
      vacation: "No",
    },
    {
      id: 8,
      date: "2025-03-21",
      loginTime: "08:15 AM",
      lunchStart: "12:10 PM",
      lunchEnd: "12:40 PM",
      logout: "05:10 PM",
      exceptionStart: "02:45 PM",
      exceptionEnd: "03:00 PM",
      vacation: "No",
    },
    {
      id: 9,
      date: "2025-03-20",
      loginTime: "08:00 AM",
      lunchStart: "12:00 PM",
      lunchEnd: "12:30 PM",
      logout: "05:00 PM",
      exceptionStart: "03:00 PM",
      exceptionEnd: "03:15 PM",
      vacation: "No",
    },
    {
      id: 10,
      date: "2025-03-21",
      loginTime: "08:15 AM",
      lunchStart: "12:10 PM",
      lunchEnd: "12:40 PM",
      logout: "05:10 PM",
      exceptionStart: "02:45 PM",
      exceptionEnd: "03:00 PM",
      vacation: "No",
    },
  ];
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const update = () => {
    navigate("/update");
  };
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-4"></div>
        <div>
          {" "}
          <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
            Time List
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
              timeO'clock
            </span>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-[14px] hover:cursor-pointer">
              {" "}
              time Sheet
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white  p-4 mt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium">filter</label>
              <select className="border w-full px-3 py-2 rounded-md">
                <option>This Week</option>
                <option>This Month </option>
              </select>
            </div>
            <div className="flex items-center">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border w-full px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <img src={more} alt="" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white overflow-x-auto  ">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Login Time</th>
                <th className="py-2 px-4 text-left">Lunch Start</th>
                <th className="py-2 px-4 text-left">Lunch End</th>
                <th className="py-2 px-4 text-left">Logout</th>
                <th className="py-2 px-4 text-left">Exception Start</th>
                <th className="py-2 px-4 text-left">Exception End</th>
                <th className="py-2 px-4 text-left">Vacation</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 whitespace-nowrap"
                >
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.date}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.loginTime}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.lunchStart}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.lunchEnd}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.logout}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.exceptionStart}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.exceptionEnd}
                  </td>
                  <td className="py-3 px-4 text-[#061D22] text-sm">
                    {row.vacation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4 p-2">
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
          </div>
        </div>

        <div className="flex justify-end">
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

export default TimeSheet;
