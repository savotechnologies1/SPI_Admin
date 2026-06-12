
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaSpinner, FaTrash } from "react-icons/fa";
import search_2 from "../../../assets/search_2.png";
import edit from "../../../assets/edit_icon.png";
import add from "../../../assets/add.png";
import back from "../../../assets/back.png";
import next from "../../../assets/next.png";
import { deleteEmployee, employeeList } from "../https/EmployeeApis";
import { Mail } from "lucide-react";
import EmailPasswordModal from "./EmailPasswordModal";

interface EmployeeData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  hourlyRate: string;
  employeeId: string;
  shift: string;
  startDate: string;
  pin: string;
  processLogin: boolean; 
  status: string;
}

interface EmployeeListResponse {
  data: EmployeeData[];
  pagination?: {
    totalPages: number;
  };
}

const Employees: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const rowsPerPage = 5;
  const [customerData, setCustomerData] = useState<EmployeeData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleTabs = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1); 
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-employee/${id}`);
  };

  const fetchEmployeeList = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await employeeList(
        page,
        rowsPerPage,
        selectedValue,
        searchVal,
        activeTab.trim().toLowerCase() === "all"
          ? ""
          : activeTab.trim().toLowerCase(),
      );

      setCustomerData(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeList(currentPage);
  }, [currentPage, selectedValue, searchVal, activeTab]);

  const statusCounts: Record<string, number> = customerData.reduce(
    (acc: Record<string, number>, item) => {
      const status = item.status?.toLowerCase().trim() || "unknown";
      acc[status] = (acc[status] || 0) + 1;
      acc["all"] = (acc["all"] || 0) + 1;
      return acc;
    },
    { all: 0 },
  );

  const categories = [
    { tab: "All", text: statusCounts["all"] || 0 },
    { tab: "Active", text: statusCounts["active"] || 0 },
    { tab: "Pending", text: statusCounts["pending"] || 0 },
    { tab: "Banned", text: statusCounts["banned"] || 0 },
    { tab: "Rejected", text: statusCounts["rejected"] || 0 },
  ];

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEmployee(id);
      if (response?.status === 200) {
        setDeleteId(null);
        await fetchEmployeeList(currentPage);
      }
    } catch (error: unknown) {
      console.error("Delete error", error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleMailClick = (id: string) => {
    setEmployeeId(id);
    setShowModal(true);
  };

  return (
    <div className="p-4 mt-5 md:p-7 ">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="font-bold text-xl md:text-2xl text-black">
            Employee's
          </h1>
          <div className="flex relative">
            <NavLink
              to="/add-employee"
              className="py-2 pl-10 pr-7 rounded-lg bg-brand text-white flex items-center h-fit hover:cursor-pointer"
            >
              <img src={add} alt="" className="absolute left-4 w-4 h-4" />
              <span>New Employee</span>
            </NavLink>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <NavLink
            to="/dashboardDetailes"
            className="text-sm md:text-base text-black"
          >
            Dashboard
          </NavLink>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base">Employees</span>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base text-gray-400">List</span>
        </div>

        <div className="rounded-md mt-4">
          <div className="flex flex-col bg-white rounded-t">
            <div className="flex gap-4 font-semibold px-2 py-4 items-center border-b overflow-x-auto whitespace-nowrap">
              {categories.map((category) => (
                <div
                  key={category.tab}
                  className={`cursor-pointer ${
                    activeTab === category.tab
                      ? "border-b-2 border-brand px-2 py-3"
                      : "text-[#637381]"
                  }`}
                  onClick={() => handleTabs(category.tab)}
                >
                  <div className="flex gap-1 md:gap-2 items-center">
                    <p className="text-sm md:text-base">{category.tab}</p>
                    <p
                      className={`px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-medium ${
                        category.tab === "All"
                          ? "text-white bg-brand"
                          : "text-gray-800 bg-gray-100"
                      }`}
                    >
                      {category.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <select
                  className="border w-full md:w-1/4 px-3 py-2 rounded-md"
                  value={selectedValue}
                  onChange={handleSelectChange}
                >
                  <option value="all">All Login Access</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>

                <div className="flex-1 w-full relative border p-2 rounded-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                    className="w-full pl-8 text-sm outline-none"
                  />
                  <img
                    src={search_2}
                    alt=""
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-[#F4F6F8]">
                  <th className="px-4 py-3 text-left text-gray-400 text-xs font-medium uppercase">
                    Name
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 text-xs font-medium uppercase hidden sm:table-cell">
                    Hourly Rate
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 text-xs font-medium uppercase hidden md:table-cell">
                    Employee ID
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 text-xs font-medium uppercase hidden lg:table-cell">
                    Shift
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 text-xs font-medium uppercase hidden lg:table-cell">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-gray-400 text-xs font-medium uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="py-20 text-center">
                      <FaSpinner className="animate-spin text-brand text-3xl mx-auto mb-2" />
                      <p>Loading...</p>
                    </td>
                  </tr>
                ) : customerData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-20 text-center text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                ) : (
                  customerData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-dashed border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium">
                          {item.firstName} {item.lastName}
                        </p>
                        <p className="text-xs text-gray-400">{item.email}</p>
                      </td>
                      <td className="px-3 py-4 text-sm hidden sm:table-cell">
                        ${item.hourlyRate}
                      </td>
                      <td className="px-3 py-4 text-sm hidden md:table-cell">
                        {item.employeeId}
                      </td>
                      <td className="px-3 py-4 text-sm hidden lg:table-cell">
                        {item.shift}
                      </td>
                      <td className="px-3 py-4 hidden lg:table-cell">
                        <span className="px-2 py-1 rounded-full text-xs capitalize bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-4 flex gap-3">
                        <Mail
                          onClick={() => handleMailClick(item.id)}
                          className="text-brand cursor-pointer w-5 h-5"
                        />
                        <button onClick={() => handleEdit(item.id)}>
                          <img src={edit} alt="Edit" className="w-5 h-5" />
                        </button>
                        <FaTrash
                          className="text-red-500 cursor-pointer w-5 h-5"
                          onClick={() => setDeleteId(item.id)}
                        />

                        {deleteId === item.id && (
                          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
                              <h2 className="text-lg font-bold mb-2">
                                Delete Employee
                              </h2>
                              <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this record?
                                This action cannot be undone.
                              </p>
                              <div className="flex justify-end space-x-3">
                                <button
                                  className="px-4 py-2 text-gray-600"
                                  onClick={() => setDeleteId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {showModal && (
              <EmailPasswordModal
                employeeId={employeeId}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
              />
            )}

            <div className="flex justify-between items-center bg-white py-4 px-4 border-t">
              <p className="text-xs text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="disabled:opacity-30 p-1"
                >
                  <img src={back} alt="Previous" className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="disabled:opacity-30 p-1"
                >
                  <img src={next} alt="Next" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
