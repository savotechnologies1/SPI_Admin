import React, { useEffect, useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaTrash, FaSpinner } from "react-icons/fa";
import edit from "../../assets/edit_icon.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import add from "../../assets/add.png";
import { deleteProcess, processList } from "./https/processApi";

interface ProcessItem {
  id: string;
  processName: string;
  machineName: string;
  partFamily: string;
  processDesc: string;
  cycleTime: string;
  ratePerHour: number;
  isProcessReq: boolean;
}

interface ProcessListResponse {
  data: ProcessItem[];
  pagination?: {
    totalPages: number;
    currentPage: number;
  };
}

const ProcessList: React.FC = () => {
  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState<string>("");
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rowsPerPage = 10;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const editProcess = (id: string) => {
    navigate(`/edit-process/${id}`);
  };

  const fetchProcessList = async (page = 1) => {
    setIsLoading(true);
    try {
      // Cast the response to our interface
      const response = (await processList(
        page,
        rowsPerPage,
        searchVal,
      )) as unknown as ProcessListResponse;

      setProcessData(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching process list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchVal]);

  // Debounced/Delayed fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProcessList(currentPage);
    }, 150);

    return () => clearTimeout(timer);
  }, [currentPage, searchVal]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleConfirmDelete = async () => {
    if (selectedDeleteId) {
      const idToRemove = selectedDeleteId;
      try {
        await deleteProcess(idToRemove);
        setShowConfirm(false);
        setSelectedDeleteId(null);

        const updatedList = processData.filter(
          (item) => item.id !== idToRemove,
        );
        setProcessData(updatedList);

        if (updatedList.length === 0 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        } else {
          fetchProcessList(currentPage);
        }
      } catch (error) {
        console.error("Delete failed", error);
        fetchProcessList(currentPage);
      }
    }
  };

  return (
    <div className="p-7">
      <div className="flex justify-between mt-8">
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Process
        </h1>
        <div className="flex relative">
          <NavLink
            to="/add-process"
            className="py-2 pl-10 pr-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer"
          >
            <img src={add} alt="" className="absolute left-4 w-4 h-4" />
            <span>New Process</span>
          </NavLink>
        </div>
      </div>

      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-2 items-center text-sm md:text-base">
          <NavLink to="/dashboardDetailes" className="text-black">
            Dashboard
          </NavLink>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="cursor-default">Process</span>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-gray-400">Process List</span>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <input
          type="text"
          placeholder="Search by process name..."
          className="border w-full md:w-1/3 px-3 py-2 rounded-md outline-none focus:ring-1 focus:ring-brand"
          value={searchVal}
          onChange={handleChange}
        />
      </div>

      <div className="overflow-x-auto mt-6 bg-white rounded shadow-sm">
        <table className="w-full bg-white">
          <thead className="bg-[#F4F6F8]">
            <tr>
              {[
                "Process Name",
                "Machine Name",
                "Part Family",
                "Description",
                "Cycle Time",
                "Rate/Hr",
                "Order Req",
                "Action",
              ].map((head) => (
                <th
                  key={head}
                  className="px-3 py-3 text-left text-gray-400 font-medium text-xs md:text-sm uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-20">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FaSpinner className="animate-spin text-brand text-3xl" />
                    <span className="text-gray-500">Loading processes...</span>
                  </div>
                </td>
              </tr>
            ) : processData.length > 0 ? (
              processData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-dashed border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-4 text-sm font-medium">
                    {item.processName}
                  </td>
                  <td className="px-3 py-4 text-sm">{item.machineName}</td>
                  <td className="px-3 py-4 text-sm">{item.partFamily}</td>
                  <td className="px-3 py-4 text-sm max-w-[200px] truncate">
                    {item.processDesc}
                  </td>
                  <td className="px-3 py-4 text-sm">{item.cycleTime} min</td>
                  <td className="px-3 py-4 text-sm">{item.ratePerHour}</td>
                  <td className="px-3 py-4 text-sm">
                    {item.isProcessReq ? "Yes" : "No"}
                  </td>
                  <td className="px-3 py-4 flex gap-3">
                    <button onClick={() => editProcess(item.id)} title="Edit">
                      <img src={edit} alt="Edit" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDeleteId(item.id);
                        setShowConfirm(true);
                      }}
                      title="Delete"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-20 text-gray-500">
                  No processes found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
              <h2 className="text-lg font-bold mb-2">Are you sure?</h2>
              <p className="text-gray-600 mb-6 text-sm">
                Do you really want to delete this process? This action cannot be
                undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => {
                    setShowConfirm(false);
                    setSelectedDeleteId(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center py-4 px-4 bg-white border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
              className="disabled:opacity-30 p-1"
            >
              <img src={back} alt="Previous" className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
              className="disabled:opacity-30 p-1"
            >
              <img src={next} alt="Next" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessList;
