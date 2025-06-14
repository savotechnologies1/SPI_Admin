import { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import more from "../../assets/more.png";
import edit from "../../assets/edit_icon.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import add from "../../assets/add.png";

// import data from "../../components/Data/processListData";
import { deleteProcess, processList } from "./https/processApi";
interface ProcessItem {
  id: string;
  processName: string;
  machineName: string;
  cycleTime: number;
  ratePerHour: number;
}

const ProcessList = () => {
  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);

  const toggleOptions = (index: number) => {
    setOpenOptionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const rowsPerPage = 8;
  const editProcess = (id: string) => {
    navigate(`/edit-process/${id}`);
  };

  const fetchProcessList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await processList(page, rowsPerPage);
      setProcessData(response.processData);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProcessList(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handleDelete = (id: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      deleteProcess(id).then();
      fetchProcessList();
    } catch (error: unknown) {
      throw error;
    }
  };
  return (
    <div className="p-7">
      <div>
        <div className="flex justify-between">
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Process
          </h1>
          
          <div className="flex relative">
            <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/add-process">
                <span className="">New Process</span>
              </NavLink>
            </button>
            <div className="absolute top-3 left-2">
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
                  Cycle Time
                </th>
                <th className="px-3 py-3 text-left text-gray-400 font-medium">
                  RatePerHour
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
              {processData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-dashed border-gray-200"
                >
                  <td className="px-3 py-4">{item.processName}</td>
                  <td className="px-3 py-4">{item.machineName}</td>
                  <td className="px-3 py-4">{item.cycleTime}</td>
                  <td className="px-3 py-4">{item.ratePerHour}</td>
                  <td className="px-3 py-4">200</td>
                  <td className="px-3 py-4 flex gap-4">
                    <div className="relative inline-block text-left">
                      <button>
                        <img
                          src={edit}
                          alt="Edit"
                          onClick={() => editProcess(item.id)}
                        />
                      </button>
                      <button
                        onClick={() => toggleOptions(index)}
                        className="p-2"
                      >
                        <img src={more} alt="More" />
                      </button>

                      {openOptionsIndex === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
                          <button
                            onClick={() => navigate(`/edit-process/${item.id}`)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-end items-center py-2 bg-white">
            <p className="text-sm text-gray-600 mr-4">
              Page {currentPage} of {totalPages}
            </p>

            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img src={back} alt="Previous" />
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-300"
              }`}
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
