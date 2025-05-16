import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import search_2 from "../../assets/search_2.png";
import more from "../../assets/more.png";
import edit from "../../assets/edit_icon.png";
import add from "../../assets/add.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { deleteWorkInstruction, workInstructionList } from "./https/workInstructionApi";
import { BASE_URL } from "../../utils/axiosInstance";

interface CustomerItem {
  id: string;
  process: string;
  part: string;
  stepNumber: number;
  workInstruction: string;
  workInstructionImg:string;
  createdAt: string;
}

const WorkInstructionList = () => {
  const [workInstructionData, setWorkInstructionData] = useState<
    CustomerItem[]
  >([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const navigate = useNavigate();
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchCustomerList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await workInstructionList(page, rowsPerPage);
      setWorkInstructionData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCustomerList(currentPage);
  }, [currentPage]);

  const editCustomer = (id: string) => {
    navigate(`/edit-work-instruction/${id}`);
  };
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const toggleOptions = (index: number) => {
    setOpenOptionsIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleDelete = (id: string) => {
      // eslint-disable-next-line no-useless-catch
      try {
        deleteWorkInstruction(id).then();
        fetchCustomerList();
      } catch (error: unknown) {
        throw error;
      }
    };

  return (
    <div className="p-4 md:p-7">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-black">
              Work Instructions
            </h1>
          </div>

          <div className="flex relative">
            <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/work-instruction">
                <span className="">Add Work</span>
              </NavLink>
            </button>
            <div className="absolute top-3 left-2">
              <img src={add} alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <p
            className={`text-sm md:text-base text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base hover:cursor-pointer">
            Work Instructions List
          </span>
        </div>

        <div className="rounded-md mt-4">
          <div className="flex flex-col bg-white rounded-t">
            <div className="p-2 md:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
                <div className="flex flex-col w-full sm:w-auto">
                  <label
                    htmlFor="role"
                    className="text-xs md:text-sm font-medium text-gray-500"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full sm:w-40 md:w-52 rounded-md border-gray-300 text-sm md:text-base"
                    defaultValue="Project Coordinator"
                  >
                    <option>Newly added</option>
                    <option>Developer</option>
                    <option>Designer</option>
                  </select>
                </div>

                <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm lg:text-base outline-none"
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-[#F4F6F8]">
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Work Image
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden sm:table-cell">
                    Process Name
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden md:table-cell">
                    Part
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                    Steps Numbers
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Work Instruction Description
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Submit Date
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {workInstructionData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dashed border-gray-200"
                  >
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        className="w-3 h-3 md:w-4 md:h-4"
                      />
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-md bg-gray-300 mr-2 md:mr-4 overflow-hidden">
                          <img
                            src={`${BASE_URL}/uploads/workInstructionImg/${item.workInstructionImg}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />

                          <FaCircle />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm lg:text-base font-medium">
                            {/* {item.firstName} {item.lastName} */}
                          </p>
                          {/* <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
                            {item.process}
                          </p> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden sm:table-cell">
                      {item.process}
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden sm:table-cell">
                      {item.part}
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden md:table-cell">
                      {item.stepNumber}
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden md:table-cell">
                      {item.workInstruction}
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                      <span
                        className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-mediumtext-green-800 bg-green-100`}
                      >
                        {" "}
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* <td className="px-2 py-3 md:px-3 md:py-4">
                      <span
                        className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
                          item.status === "Active"
                            ? "text-green-800 bg-green-100"
                            : item.status === "Pending"
                            ? "text-[#B76E00] bg-yellow-100"
                            : item.status === "Banned"
                            ? "text-[#B71D18] bg-[#FF563029]"
                            : item.status === "Rejected"
                            ? "text-[#637381] bg-gray-100"
                            : "text-gray-800 bg-gray-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td> */}
                    <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
                      <button
                        className="text-brand hover:underline"
                        onClick={() => editCustomer(item.id)}
                      >
                        <img
                          src={edit}
                          alt="Edit"
                          className="w-4 h-4 md:w-5 md:h-5"
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
                            onClick={() =>
                              navigate(`/edit-work-instruction/${item.id}`)
                            }
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2 ">
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
                  <FontAwesomeIcon icon={faArrowLeft} />
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
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkInstructionList;
