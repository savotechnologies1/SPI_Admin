import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaTrash } from "react-icons/fa";
import search_2 from "../../../assets/search_2.png";
import more from "../../../assets/more.png";
import edit from "../../../assets/edit_icon.png";
import back from "../../../assets/back.png";
import next from "../../../assets/next.png";
import data from "../../../components/Data/vacationListData";
import add from "../../../assets/add.png";
import { Mail } from "lucide-react";

import {
  deleteEmployee,
  employeeList,
  sendEmailToTheEmployeeApi,
  vacationList,
  vacationReqStatus,
} from "../https/EmployeeApis";
import EmailPasswordModal from "./EmailPasswordModal";
import VacationReqModel from "./VacationReqModel";
// const VacationList = () => {
//   const navigate = useNavigate();
//   const categorys = [
//     { tab: "All ", text: "80" },
//     { tab: "Active ", text: "18" },
//     { tab: "Pending ", text: "22" },
//     { tab: "Rejected ", text: "32" },
//   ];
//   const [activeTab, setActiveTab] = useState("All ");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const rowsPerPage = 5;

//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const visibleRows = data.slice(startIndex, startIndex + rowsPerPage);

//   const handleTabs = (value: string) => {
//     setActiveTab(value);
//   };

//   const handleEdit = async () => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       navigate("/vaction-request");
//     } catch (error) {
//       throw error;
//     }
//   };
//   return (
//     <div className="p-4 md:p-7">
//       <div>
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
//               Vacation List for approval 55
//             </h1>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
//           <p
//             className="text-sm md:text-base text-black"
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//           <span className="text-sm md:text-base hover:cursor-pointer">
//             Employee
//           </span>
//           <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//           <span className="text-sm md:text-base hover:cursor-pointer">
//             vacation list
//           </span>
//         </div>

//         <div className="rounded-md mt-4">
//           <div className="flex flex-col bg-white rounded-t">
//             <div className="flex gap-2 md:gap-4 font-semibold px-2 items-center hover:cursor-pointer border-b overflow-x-auto whitespace-nowrap">
//               {categorys.map((category) => (
//                 <div
//                   key={category.tab}
//                   className={`${
//                     activeTab === category.tab
//                       ? "border-b-2 border-brand px-1 md:px-2 py-2 md:py-3"
//                       : "text-[#637381]"
//                   }`}
//                   onClick={() => handleTabs(category.tab)}
//                 >
//                   <div className="flex gap-1 md:gap-2 items-center">
//                     <p className="text-xs md:text-sm">{category.tab}</p>
//                     <p
//                       className={`px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-medium ${
//                         category.tab.trim() === "All"
//                           ? "text-white bg-brand"
//                           : category.tab.trim() === "Active"
//                           ? "text-green-800 bg-green-100"
//                           : category.tab.trim() === "Pending"
//                           ? "text-[#B76E00] bg-[#FFAB0029]"
//                           : category.tab.trim() === "Rejected"
//                           ? "text-gray-800 bg-gray-100"
//                           : "text-gray-800 bg-gray-100"
//                       }`}
//                     >
//                       {category.text}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="p-2 md:p-4">
//               <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
//                 <div className="flex flex-col w-full sm:w-auto">
//                   <label
//                     htmlFor="role"
//                     className="text-xs md:text-sm font-medium text-gray-500"
//                   >
//                     Role
//                   </label>
//                   <select
//                     id="role"
//                     className="mt-1 block w-full sm:w-40 md:w-52 rounded-md border-gray-300 text-xs md:text-sm"
//                     defaultValue="Project Coordinator"
//                   >
//                     <option>Newly added</option>
//                     <option>Developer</option>
//                     <option>Designer</option>
//                   </select>
//                 </div>

//                 <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
//                   <input
//                     type="text"
//                     placeholder="Search..."
//                     className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm outline-none"
//                   />
//                   <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
//                     <img
//                       src={search_2}
//                       alt=""
//                       className="w-3 h-3 md:w-4 md:h-4"
//                     />
//                   </div>
//                 </div>

//                 <div className="hidden sm:block">
//                   <img src={more} alt="" className="w-5 h-5" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full bg-white">
//               <thead>
//                 <tr className="bg-[#F4F6F8]">
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
//                     <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
//                     Name
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden sm:table-cell">
//                     Start Date
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden md:table-cell">
//                     End Date
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
//                     Hours
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden xl:table-cell">
//                     Notes
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
//                     Status
//                   </th>
//                   <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {visibleRows.map((item, index) => (
//                   <tr
//                     key={index}
//                     className="border-b border-dashed border-gray-200 cursor-pointer"
//                   >
//                     <td className="px-2 py-2">
//                       <input
//                         type="checkbox"
//                         className="w-3 h-3 md:w-4 md:h-4"
//                       />
//                     </td>
//                     <td className="px-2 py-3">
//                       <div className="flex items-center">
//                         <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-300 mr-2 md:mr-4 overflow-hidden">
//                           <img
//                             src={item.avatar}
//                             alt=""
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <p className="text-xs md:text-sm font-medium">
//                             {item.name}
//                           </p>
//                           <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
//                             {item.email}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-2 py-3 text-xs md:text-sm font-medium hidden sm:table-cell">
//                       {item.start_date}
//                     </td>
//                     <td className="px-2 py-3 text-xs md:text-sm font-medium hidden md:table-cell">
//                       {item.end_date}
//                     </td>
//                     <td className="px-2 py-3 text-xs md:text-sm font-medium hidden lg:table-cell">
//                       {item.hours}
//                     </td>
//                     <td className="px-2 py-3 text-xs md:text-sm font-medium hidden xl:table-cell">
//                       {item.notes}
//                     </td>
//                     <td className="px-2 py-3">
//                       <span
//                         className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
//                           item.status === "Active"
//                             ? "text-green-800 bg-green-100"
//                             : item.status === "Pending"
//                             ? "text-[#B76E00] bg-yellow-100"
//                             : item.status === "Rejected"
//                             ? "text-[#637381] bg-gray-100"
//                             : "text-gray-800 bg-gray-100"
//                         }`}
//                       >
//                         {item.status}
//                       </span>
//                     </td>
//                     <td className="px-2 py-3 flex gap-2 md:gap-4">
//                       <button className="text-brand hover:underline">
//                         <img
//                           src={edit}
//                           alt="Edit"
//                           className="w-4 h-4 md:w-5 md:h-5"
//                           onClick={() => handleEdit()}
//                         />
//                       </button>
//                       <button className="text-brand hover:underline">
//                         {" "}
//                         <FaTrash
//                           className="text-red-500 cursor-pointer"
//                           onClick={() => setShowConfirm(true)}
//                         />
//                         {showConfirm && (
//                           <div
//                             className="fixed inset-0 bg-opacity-50 backdrop-blur-sm
//                                                                                 flex items-center justify-center z-50"
//                           >
//                             <div className="bg-white p-6 rounded-xl shadow-lg">
//                               <h2 className="text-lg font-semibold mb-4">
//                                 Are you sure?
//                               </h2>
//                               <p className="mb-4">
//                                 Do you really want to delete this vacation
//                                 request?
//                               </p>
//                               <div className="flex justify-end space-x-3">
//                                 <button
//                                   className="px-4 py-2 bg-gray-300 rounded"
//                                   onClick={() => setShowConfirm(false)}
//                                 >
//                                   Cancel
//                                 </button>
//                                 <button
//                                   className="px-4 py-2 bg-red-500 text-white rounded"
//                                   onClick={() => {
//                                     // handleDelete(item.id);
//                                     setShowConfirm(false);
//                                   }}
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex flex-col sm:flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2">
//               <p className="text-xs md:text-sm text-gray-600">
//                 Page {currentPage} of {totalPages}
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={handlePreviousPage}
//                   disabled={currentPage === 1}
//                   className={`p-1 md:p-2 rounded ${
//                     currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   <img src={back} alt="" className="w-4 h-4 md:w-5 md:h-5" />
//                 </button>

//                 <button
//                   onClick={handleNextPage}
//                   disabled={currentPage === totalPages}
//                   className={`p-1 md:p-2 rounded ${
//                     currentPage === totalPages
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-gray-300"
//                   }`}
//                 >
//                   <img src={next} alt="" className="w-4 h-4 md:w-5 md:h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VacationList;

const VacationList = () => {
  const [activeTab, setActiveTab] = useState("All ");
  // const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  // const rowsPerPage = 5;
  // const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchVal(e.target.value);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = data.slice(startIndex, startIndex + rowsPerPage);

  const handleTabs = (value: string) => {
    setActiveTab(value);
  };

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-vaction-request/${id}`);
  };
  const sendEmailToTheEmployee = async (id) => {
    try {
      const response = await sendEmailToTheEmployeeApi(id);
    } catch (error) {}
    console.log("heree iss the edididid", id);
  };

  const fetchEmployeeList = async (page = 1) => {
    try {
      const response = await vacationList(
        page,
        rowsPerPage,
        selectedValue,
        searchVal
      );
      setCustomerData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchEmployeeList(currentPage);
  }, [currentPage, selectedValue, searchVal]);

  const normalizedTab = activeTab?.trim().toLowerCase();
  const statusCounts = customerData.reduce(
    (acc, item) => {
      const status = item.status?.toLowerCase().trim();
      acc[status] = (acc[status] || 0) + 1;
      acc["all"] += 1;
      return acc;
    },
    { all: 0 }
  );
  const categorys = [
    { tab: "All", text: statusCounts["all"] || 0 },
    { tab: "Active", text: statusCounts["active"] || 0 },
    { tab: "Pending", text: statusCounts["pending"] || 0 },
    { tab: "Banned", text: statusCounts["banned"] || 0 },
    { tab: "Rejected", text: statusCounts["rejected"] || 0 },
  ];
  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEmployee(id);
      if (response?.status == 200) {
        await fetchEmployeeList(currentPage);
        navigate("/employees");
      }
    } catch (error: unknown) {
      console.log("errorerror", error);
    }
  };

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    console.log("A new option was selected:", newValue);
  };
  const handleMailClick = (id, status) => {
    setEmployeeId(id);
    setShowModal(true);
    setStatus(status);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      console.log("newStatusnewStatusnewStatus", newStatus);
      setCustomerData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      const data = {
        id: id,
        status: newStatus,
      };
      await vacationReqStatus(data);
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getColorClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "bg-green-200 text-green-700";
      case "PENDING":
        return "bg-yellow-200 text-yellow-800";
      case "REJECTED":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="p-4 md:p-7">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-black">
              Vacation List for approval
            </h1>
          </div>

          <div className="flex relative">
            <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/add-employee">
                <span className="">New Employee</span>
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
            Employees
          </span>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base hover:cursor-pointer">
            List
          </span>
        </div>

        <div className="rounded-md mt-4">
          <div className="rounded-md mt-4">
            <div className="flex flex-col bg-white rounded-t">
              {/* Tabs */}
              <div className="flex gap-4 font-semibold px-2 py-4 items-center hover:cursor-pointer border-b overflow-x-auto whitespace-nowrap">
                {categorys.map((category) => (
                  <div
                    key={category.tab}
                    className={`${
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
                          category.tab.trim() === "All"
                            ? "text-white bg-brand"
                            : category.tab.trim() === "ACTIVE"
                            ? "text-green-800 bg-green-100"
                            : category.tab.trim() === "Pending"
                            ? "text-[#B76E00] bg-[#FFAB0029]"
                            : category.tab.trim() === "Banned"
                            ? "text-red-800 bg-red-100"
                            : category.tab.trim() === "Rejected"
                            ? "text-gray-800 bg-gray-100"
                            : "text-gray-800 bg-gray-100"
                        }`}
                      >
                        {category.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="p-2 md:p-4">
                <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
                  <select
                    id="work-instruction-filter"
                    className="border w-full md:w-1/4 px-3 py-2 rounded-md"
                    value={selectedValue}
                    onChange={handleSelectChange}
                  >
                    <option value="all">All</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>

                  <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={handleChange}
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

                  <div className="hidden sm:block">
                    <img src={more} alt="" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-[#F4F6F8]">
                    <th className="px-4 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Name
                    </th>

                    <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                      Start Date
                    </th>
                    <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                      End Date
                    </th>
                    <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                      Hours
                    </th>
                    <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                      Note
                    </th>
                    <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Status
                    </th>
                    <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {customerData
                    .filter((item) => {
                      if (normalizedTab === "all") return true;
                      return item.status.toLowerCase() === normalizedTab;
                    })
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-dashed border-gray-200"
                      >
                        <td className="px-2 py-3 md:px-3 md:py-4">
                          <div className="flex items-center">
                            <div>
                              <p className="text-xs md:text-sm lg:text-base font-medium">
                                {item.employee.firstName} {item.lastName}
                              </p>
                              <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
                                {item.employee.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                          {formatDate(item.startDate)}
                        </td>
                        <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                          {formatDate(item.endDate)}
                        </td>
                        <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                          {item.hours}
                        </td>
                        <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                          {item.notes} {item.status}
                        </td>
                        <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                          {/* <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className="px-2 py-1 rounded-full text-xs md:text-sm font-medium border border-gray-300 bg-white"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="ACTIVE">Active</option>
                            <option value="BANNED">Banned</option>
                            <option value="REJECTED">Rejected</option>
                          </select> */}

                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer ${getColorClass(
                              item.status
                            )}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">APPROVED</option>
                            <option value="REJECTED">REJECTED</option>
                          </select>
                        </td>

                        {/* 
                        <td className="px-2 py-3 md:px-3 md:py-4">
                          <span
                            className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
                              item.status === "active"
                                ? "text-green-800 bg-green-100"
                                : item.status === "pending"
                                ? "text-[#B76E00] bg-yellow-100"
                                : item.status === "banned"
                                ? "text-[#B71D18] bg-[#FF563029]"
                                : item.status === "rejected"
                                ? "text-[#637381] bg-gray-100"
                                : "text-gray-800 bg-gray-100"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td> */}
                        <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
                          <Mail
                            onClick={() =>
                              handleMailClick(item.id, item.status)
                            }
                            className="text-brand"
                          />

                          <button
                            onClick={() => {
                              handleEdit(item.id);
                            }}
                            className="text-brand hover:underline"
                          >
                            <img
                              src={edit}
                              alt="Edit"
                              className="w-4 h-4 md:w-5 md:h-5"
                            />
                          </button>
                          <button className="text-brand hover:underline">
                            <FaTrash
                              className="text-red-500 cursor-pointer h-7"
                              onClick={() => setShowConfirm(true)}
                            />
                            {showConfirm && (
                              <div
                                className="fixed inset-0 bg-opacity-50 backdrop-blur-sm
                                    flex items-center justify-center z-50"
                              >
                                <div className="bg-white p-6 rounded-xl shadow-lg">
                                  <h2 className="text-lg font-semibold mb-4">
                                    Are you sure?
                                  </h2>
                                  <p className="mb-4">
                                    Do you really want to delete this employee?
                                  </p>
                                  <div className="flex justify-end space-x-3">
                                    <button
                                      className="px-4 py-2 bg-gray-300 rounded"
                                      onClick={() => setShowConfirm(false)}
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="px-4 py-2 bg-red-500 text-white rounded"
                                      onClick={() => {
                                        handleDelete(item.id);
                                        setShowConfirm(false);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {showModal && (
                <VacationReqModel
                  employeeId={employeeId}
                  status={status}
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
              )}
              {/* Pagination */}
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
    </div>
  );
};

export default VacationList;
