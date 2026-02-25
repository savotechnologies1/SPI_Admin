import { useEffect, useState, ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaTrash, FaSpinner } from "react-icons/fa";
import edit from "../../assets/edit_icon.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import add from "../../assets/add.png";
import { deleteProcess, processList } from "./https/processApi";

interface ProcessItem {
  processDesc: string;
  id: string;
  processName: string;
  machineName: string;
  cycleTime: string;
  ratePerHour: number;
  partFamily: string;
  isProcessReq: boolean;
}

interface ProcessListResponse {
  data: ProcessItem[];
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

const ProcessList = () => {
  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const rowsPerPage = 10;
  const editProcess = (id: string) => {
    navigate(`/edit-process/${id}`);
  };

  const fetchProcessList = async (page = 1) => {
    setIsLoading(true);
    try {
      const response: ProcessListResponse = await processList(
        page,
        rowsPerPage,
        searchVal,
      );
      setProcessData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching process list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchVal]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProcessList(currentPage);
    }, 100);

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
        fetchProcessList(currentPage);
      }
    }
  };
  return (
    <div className="p-7">
      <div>
        <div className="flex justify-between mt-8">
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Process
          </h1>
          <div className="flex relative">
            <NavLink
              to="/add-process"
              className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer"
            >
              <span>New Process</span>
            </NavLink>
            <div className="absolute top-3 left-2 pointer-events-none">
              <img src={add} alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-2 items-center">
            <p className="text-[16px] text-black">
              <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
            </p>
            <FaCircle className="text-[6px] text-gray-500" />
            <span className="text-[16px] hover:cursor-pointer">Process</span>
            <FaCircle className="text-[6px] text-gray-500" />
            <span className="text-[16px] hover:cursor-pointer">
              Process List
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <input
            type="text"
            placeholder="Search by process name..."
            className="border w-full md:w-1/3 px-3 py-2 rounded-md flex justify-end"
            value={searchVal}
            onChange={handleChange}
          />
        </div>
        <div className="overflow-x-auto mt-6 bg-white rounded">
          <table className="w-full bg-white">
            <thead className="bg-[#F4F6F8]">
              <tr>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Process Name
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Machine Name
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Part Family
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Process Description
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Cycle Time
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Rate Per Hour
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Process Order
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  Action
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                // 4. Added Loader Row
                <tr>
                  <td colSpan={9} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FaSpinner className="animate-spin text-brand text-2xl" />
                      <span className="text-gray-500">
                        Loading processes...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : processData.length > 0 ? (
                processData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-dashed border-gray-200"
                  >
                    <td className="px-3 py-4 max-w-[150px] whitespace-normal break-words">
                      {item.processName}
                    </td>
                    <td className="px-3 py-4 max-w-[150px] whitespace-normal break-words">
                      {item.machineName}
                    </td>
                    <td className="px-3 py-4 max-w-[150px] whitespace-normal break-words">
                      {item.partFamily}
                    </td>
                    <td className="px-3 py-4 max-w-[150px] whitespace-normal break-words">
                      {item.processDesc}
                    </td>
                    <td className="px-3 py-4 max-w-[150px] whitespace-normal break-words">
                      {item.cycleTime} min
                    </td>
                    <td className="px-3 py-4 max-w-[150px] whitespace-normal break-words">
                      {item.ratePerHour}
                    </td>
                    <td className="px-3 py-4">
                      {item.isProcessReq ? "Yes" : "No"}
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
                      <button
                        className="text-brand hover:underline"
                        onClick={() => editProcess(item.id)}
                      >
                        <img
                          src={edit}
                          alt="Edit"
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                      </button>
                      <button
                        className="text-brand hover:underline"
                        onClick={() => {
                          setSelectedDeleteId(item.id);
                          setShowConfirm(true);
                        }}
                      >
                        <FaTrash className="text-red-500 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No process found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {showConfirm && selectedDeleteId && (
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
                <p className="mb-4">
                  Do you really want to delete this process?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded"
                    onClick={() => {
                      setShowConfirm(false);
                      setSelectedDeleteId(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end items-center py-2 bg-white">
            <p className="text-sm text-gray-600 mr-4">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1 || isLoading}
              className={`px-3 py-2 rounded ${currentPage === 1 || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <img src={back} alt="Previous" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages || isLoading}
              className={`px-3 py-2 rounded ${currentPage === totalPages || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"}`}
            >
              <img src={next} alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessList;
