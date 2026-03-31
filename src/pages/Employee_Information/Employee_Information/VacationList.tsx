// import { useEffect, useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { FaCircle, FaTrash } from "react-icons/fa";
// import search_2 from "../../../assets/search_2.png";
// import more from "../../../assets/more.png";
// import edit from "../../../assets/edit_icon.png";
// import back from "../../../assets/back.png";
// import next from "../../../assets/next.png";
// import data from "../../../components/Data/vacationListData";
// import add from "../../../assets/add.png";
// import { Mail } from "lucide-react";
// import {
//   deleteEmployee,
//   sendEmailToTheEmployeeApi,
//   vacationList,
//   vacationReqStatus,
// } from "../https/EmployeeApis";
// import VacationReqModel from "./VacationReqModel";
// const VacationList = () => {
//   const [activeTab, setActiveTab] = useState("All ");
//   const rowsPerPage = 5;
//   const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [employeeId, setEmployeeId] = useState("");
//   const [status, setStatus] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("desc");
//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleTabs = (value: string) => {
//     setActiveTab(value);
//   };

//   const navigate = useNavigate();

//   const handleEdit = (id) => {
//     navigate(`/edit-vaction-request/${id}`);
//   };

//   const fetchEmployeeList = async (page = 1) => {
//     try {
//       const response = await vacationList(
//         page,
//         rowsPerPage,
//         sortBy,
//         searchTerm,
//       );
//       setCustomerData(response.data);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (error) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchEmployeeList(currentPage);
//   }, [currentPage, sortBy, searchTerm]);

//   const normalizedTab = activeTab?.trim().toLowerCase();
//   const statusCounts = customerData.reduce(
//     (acc, item) => {
//       const status = item.status?.toLowerCase().trim();
//       acc[status] = (acc[status] || 0) + 1;
//       acc["all"] += 1;
//       return acc;
//     },
//     { all: 0 },
//   );
//   const categorys = [
//     { tab: "All", text: statusCounts["all"] || 0 },
//     { tab: "Approved", text: statusCounts["approved"] || 0 },
//     { tab: "Pending", text: statusCounts["pending"] || 0 },
//     { tab: "Rejected", text: statusCounts["rejected"] || 0 },
//   ];
//   const handleDelete = async (id: string) => {
//     try {
//       const response = await deleteEmployee(id);
//       if (response?.status == 200) {
//         await fetchEmployeeList(currentPage);
//         navigate("/employees");
//       }
//     } catch (error: unknown) {
//       throw error;
//     }
//   };
//   const handleMailClick = (id, status) => {
//     setEmployeeId(id);
//     setShowModal(true);
//     setStatus(status);
//   };
//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();
//     return `${month}-${day}-${year}`;
//   };
//   const handleStatusChange = async (id: string, newStatus: string) => {
//     try {
//       setCustomerData((prevData) =>
//         prevData.map((item) =>
//           item.id === id ? { ...item, status: newStatus } : item,
//         ),
//       );

//       const data = {
//         id: id,
//         status: newStatus,
//       };
//       await vacationReqStatus(data);
//     } catch (error) {
//       throw error;
//     }
//   };

//   const getColorClass = (status: string) => {
//     switch (status?.toUpperCase()) {
//       case "APPROVED":
//         return "bg-green-200 text-green-700";
//       case "PENDING":
//         return "bg-yellow-200 text-yellow-800";
//       case "REJECTED":
//         return "bg-red-200 text-red-700";
//       default:
//         return "bg-gray-200 text-gray-600";
//     }
//   };

//   return (
//     <div className="p-4 mt-5  md:p-7">
//       <div>
//         <div className="flex flex-col sm:flex-row justify-between gap-4">
//           <div>
//             <h1 className="font-bold text-xl md:text-2xl text-black">
//               Vacation List for approval
//             </h1>
//           </div>

//           <div className="flex relative">
//             <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
//               <NavLink to="/add-employee">
//                 <span className="">New Employee</span>
//               </NavLink>
//             </button>
//             <div className="absolute top-3 left-2">
//               <img src={add} alt="" className="w-4 h-4" />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
//           <p
//             className={`text-sm md:text-base text-black`}
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//           </span>
//           <span className="text-sm md:text-base hover:cursor-pointer">
//             Employees
//           </span>
//           <span>
//             <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//           </span>
//           <span className="text-sm md:text-base hover:cursor-pointer">
//             List
//           </span>
//         </div>

//         <div className="rounded-md mt-4">
//           <div className="rounded-md mt-4">
//             <div className="flex flex-col bg-white rounded-t">
//               {/* Tabs */}
//               <div className="flex gap-4 font-semibold px-2 py-4 items-center hover:cursor-pointer border-b overflow-x-auto whitespace-nowrap">
//                 {categorys.map((category) => (
//                   <div
//                     key={category.tab}
//                     className={`${
//                       activeTab === category.tab
//                         ? "border-b-2 border-brand px-2 py-3"
//                         : "text-[#637381]"
//                     }`}
//                     onClick={() => handleTabs(category.tab)}
//                   >
//                     <div className="flex gap-1 md:gap-2 items-center">
//                       <p className="text-sm md:text-base">{category.tab}</p>
//                       <p
//                         className={`px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-medium ${
//                           category.tab.trim() === "All"
//                             ? "text-white bg-brand"
//                             : category.tab.trim() === "ACTIVE"
//                               ? "text-green-800 bg-green-100"
//                               : category.tab.trim() === "Pending"
//                                 ? "text-[#B76E00] bg-[#FFAB0029]"
//                                 : category.tab.trim() === "Banned"
//                                   ? "text-red-800 bg-red-100"
//                                   : category.tab.trim() === "Rejected"
//                                     ? "text-gray-800 bg-gray-100"
//                                     : "text-gray-800 bg-gray-100"
//                         }`}
//                       >
//                         {category.text}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="p-2 md:p-4">
//                 <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="rounded border px-2 py-1 text-sm"
//                   >
//                     <option value="desc">Newest</option>
//                     <option value="asc">Oldest</option>
//                   </select>

//                   <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
//                     <input
//                       type="text"
//                       placeholder="Search..."
//                       value={searchTerm}
//                       onChange={(e) => setSearchTerm(e.target.value)}
//                       className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm outline-none"
//                     />

//                     <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
//                       <img
//                         src={search_2}
//                         alt=""
//                         className="w-3 h-3 md:w-4 md:h-4"
//                       />
//                     </div>
//                   </div>

//                   <div className="hidden sm:block">
//                     <img src={more} alt="" className="w-5 h-5" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full bg-white">
//                 <thead>
//                   <tr className="bg-[#F4F6F8]">
//                     <th className="px-4 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
//                       Name
//                     </th>

//                     <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
//                       Start Date
//                     </th>
//                     <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
//                       End Date
//                     </th>
//                     <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
//                       Hours
//                     </th>
//                     <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
//                       Note
//                     </th>
//                     <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
//                       Status
//                     </th>
//                     <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {customerData
//                     .filter((item) => {
//                       if (normalizedTab === "all") return true;
//                       return item.status.toLowerCase() === normalizedTab;
//                     })
//                     .map((item, index) => (
//                       <tr
//                         key={index}
//                         className="border-b border-dashed border-gray-200"
//                       >
//                         <td className="px-2 py-3 md:px-3 md:py-4">
//                           <div className="flex items-center">
//                             <div>
//                               <p className="text-xs md:text-sm lg:text-base font-medium">
//                                 {item.employee.firstName} {item.lastName}
//                               </p>
//                               <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
//                                 {item.employee.email}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
//                           {formatDate(item.startDate)}
//                         </td>
//                         <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
//                           {formatDate(item.endDate)}
//                         </td>
//                         <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
//                           {item.hours}
//                         </td>
//                         <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
//                           {item.notes}
//                         </td>
//                         <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
//                           <select
//                             value={item.status}
//                             onChange={(e) =>
//                               handleStatusChange(item.id, e.target.value)
//                             }
//                             className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer ${getColorClass(
//                               item.status,
//                             )}`}
//                             onClick={(e) => e.stopPropagation()}
//                           >
//                             <option value="PENDING">Pending</option>
//                             <option value="APPROVED">APPROVED</option>
//                             <option value="REJECTED">REJECTED</option>
//                           </select>
//                         </td>

//                         <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
//                           <Mail
//                             onClick={() =>
//                               handleMailClick(item.id, item.status)
//                             }
//                             className="text-brand"
//                           />

//                           <button
//                             onClick={() => {
//                               handleEdit(item.id);
//                             }}
//                             className="text-brand hover:underline"
//                           >
//                             <img
//                               src={edit}
//                               alt="Edit"
//                               className="w-4 h-4 md:w-5 md:h-5"
//                             />
//                           </button>
//                           <button className="text-brand hover:underline">
//                             <FaTrash
//                               className="text-red-500 cursor-pointer h-7"
//                               onClick={() => setShowConfirm(true)}
//                             />
//                             {showConfirm && (
//                               <div
//                                 className="fixed inset-0 bg-opacity-50 backdrop-blur-sm
//                                     flex items-center justify-center z-50"
//                               >
//                                 <div className="bg-white p-6 rounded-xl shadow-lg">
//                                   <h2 className="text-lg font-semibold mb-4">
//                                     Are you sure?
//                                   </h2>
//                                   <p className="mb-4">
//                                     Do you really want to delete this employee?
//                                   </p>
//                                   <div className="flex justify-end space-x-3">
//                                     <button
//                                       className="px-4 py-2 bg-gray-300 rounded"
//                                       onClick={() => setShowConfirm(false)}
//                                     >
//                                       Cancel
//                                     </button>
//                                     <button
//                                       className="px-4 py-2 bg-red-500 text-white rounded"
//                                       onClick={() => {
//                                         handleDelete(item.id);
//                                         setShowConfirm(false);
//                                       }}
//                                     >
//                                       Delete
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>

//               {showModal && (
//                 <VacationReqModel
//                   employeeId={employeeId}
//                   status={status}
//                   isOpen={showModal}
//                   onClose={() => setShowModal(false)}
//                 />
//               )}
//               <div className="flex flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2 ">
//                 <p className="text-xs md:text-sm text-gray-600">
//                   Page {currentPage} of {totalPages}
//                 </p>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={handlePreviousPage}
//                     disabled={currentPage === 1}
//                     className={`p-1 md:p-2 rounded ${
//                       currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                   >
//                     <img src={back} alt="" className="w-4 h-4 md:w-5 md:h-5" />
//                   </button>

//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className={`p-1 md:p-2 rounded ${
//                       currentPage === totalPages
//                         ? "opacity-50 cursor-not-allowed"
//                         : "hover:bg-gray-300"
//                     }`}
//                   >
//                     <img src={next} alt="" className="w-4 h-4 md:w-5 md:h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VacationList;
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaTrash } from "react-icons/fa";
import search_2 from "../../../assets/search_2.png";
import more from "../../../assets/more.png";
import edit from "../../../assets/edit_icon.png";
import back from "../../../assets/back.png";
import next from "../../../assets/next.png";
import add from "../../../assets/add.png";
import { Mail } from "lucide-react";
import {
  deleteEmployee,
  vacationList,
  vacationReqStatus,
} from "../https/EmployeeApis";
import VacationReqModel from "./VacationReqModel";

// 1. Define Interfaces
interface EmployeeSummary {
  firstName: string;
  email: string;
}

interface CustomerItem {
  id: string;
  employee: EmployeeSummary;
  lastName: string; // Noted: firstName is in employee, lastName is root
  startDate: string;
  endDate: string;
  hours: number;
  notes: string;
  status: string;
}

interface VacationResponse {
  data: CustomerItem[];
  pagination?: {
    totalPages: number;
  };
}

const VacationList: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const rowsPerPage = 5;
  const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("desc");

  const navigate = useNavigate();

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleTabs = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-vaction-request/${id}`);
  };

  const fetchEmployeeList = async (page = 1) => {
    try {
      const response = (await vacationList(
        page,
        rowsPerPage,
        sortBy,
        searchTerm,
      )) as VacationResponse;
      setCustomerData(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployeeList(currentPage);
  }, [currentPage, sortBy, searchTerm]);

  const normalizedTab = activeTab.trim().toLowerCase();

  // 2. Fix Accumulator type error
  const statusCounts: Record<string, number> = customerData.reduce(
    (acc: Record<string, number>, item) => {
      const s = item.status?.toLowerCase().trim() || "unknown";
      acc[s] = (acc[s] || 0) + 1;
      acc["all"] = (acc["all"] || 0) + 1;
      return acc;
    },
    { all: 0 },
  );

  const categories = [
    { tab: "All", text: statusCounts["all"] || 0 },
    { tab: "Approved", text: statusCounts["approved"] || 0 },
    { tab: "Pending", text: statusCounts["pending"] || 0 },
    { tab: "Rejected", text: statusCounts["rejected"] || 0 },
  ];

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteEmployee(id);
      if (response?.status === 200) {
        await fetchEmployeeList(currentPage);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handleMailClick = (id: string, status: string) => {
    setEmployeeId(id);
    setShowModal(true);
    setStatus(status);
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    if (isNaN(date.getTime())) return "N/A";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setCustomerData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
      await vacationReqStatus({ id, status: newStatus });
    } catch (error) {
      console.error(error);
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
    <div className="p-4 mt-5 md:p-7">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="font-bold text-xl md:text-2xl text-black">
          Vacation List for approval
        </h1>
        {/* <NavLink
          to="/add-employee"
          className="py-2 px-7 rounded-lg bg-brand text-white flex gap-2 items-center h-fit"
        >
          <img src={add} alt="" className="w-4 h-4" />
          <span>New Employee</span>
        </NavLink> */}
      </div>

      <div className="flex flex-wrap items-center mt-2 gap-2 text-sm md:text-base">
        <NavLink to="/dashboardDetailes" className="text-black">
          Dashboard
        </NavLink>
        <FaCircle className="text-[4px] text-gray-500" />
        <span className="cursor-pointer">Vacation List</span>
        <FaCircle className="text-[4px] text-gray-500" />
        <span className="text-gray-400">List</span>
      </div>

      <div className="rounded-md mt-4 bg-white shadow">
        <div className="flex gap-4 font-semibold px-4 py-4 border-b overflow-x-auto whitespace-nowrap">
          {categories.map((category) => (
            <div
              key={category.tab}
              className={`cursor-pointer pb-2 ${
                activeTab === category.tab
                  ? "border-b-2 border-brand"
                  : "text-[#637381]"
              }`}
              onClick={() => handleTabs(category.tab)}
            >
              <div className="flex gap-2 items-center">
                <span>{category.tab}</span>
                <span
                  className={`px-2 py-0.5 rounded text-xs ${
                    category.tab === "All"
                      ? "bg-brand text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {category.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 flex flex-col sm:flex-row items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border p-2 rounded text-sm outline-none"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>

          <div className="flex-1 relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border p-2 pl-8 rounded text-sm outline-none"
            />
            <img
              src={search_2}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
              alt=""
            />
          </div>
          <img src={more} className="w-5 h-5 hidden sm:block" alt="" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F4F6F8]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase hidden lg:table-cell">
                  Start Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase hidden lg:table-cell">
                  End Date
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase hidden lg:table-cell">
                  Hours
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase">
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
                .map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-dashed border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium">
                        {item.employee.firstName} {item.lastName}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.employee.email}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-sm hidden lg:table-cell">
                      {formatDate(item.startDate)}
                    </td>
                    <td className="px-3 py-4 text-sm hidden lg:table-cell">
                      {formatDate(item.endDate)}
                    </td>
                    <td className="px-3 py-4 text-sm hidden lg:table-cell">
                      {item.hours}
                    </td>
                    <td className="px-3 py-4">
                      <select
                        value={item.status.toUpperCase()}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        className={`px-2 py-1 rounded text-xs font-bold outline-none cursor-pointer ${getColorClass(item.status)}`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td className="px-3 py-4 flex gap-4">
                      <Mail
                        onClick={() => handleMailClick(item.id, item.status)}
                        className="text-brand cursor-pointer w-5 h-5"
                      />
                      {/* <button onClick={() => handleEdit(item.id)}>
                        <img src={edit} alt="Edit" className="w-5 h-5" />
                      </button> */}
                      <div className="relative">
                        <FaTrash
                          className="text-red-500 cursor-pointer w-5 h-5"
                          onClick={() => {
                            setEmployeeId(item.id);
                            setShowConfirm(true);
                          }}
                        />
                        {showConfirm && employeeId === item.id && (
                          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm">
                              <h2 className="text-lg font-bold mb-2">
                                Delete Request
                              </h2>
                              <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this vacation
                                request?
                              </p>
                              <div className="flex justify-end gap-3">
                                <button
                                  className="px-4 py-2 text-gray-600"
                                  onClick={() => setShowConfirm(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-500 text-white rounded"
                                  onClick={() => handleDelete(item.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center p-4 border-t">
          <p className="text-xs text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-4">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="disabled:opacity-30"
            >
              <img src={back} alt="" className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="disabled:opacity-30"
            >
              <img src={next} alt="" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <VacationReqModel
          employeeId={employeeId}
          status={status}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default VacationList;
