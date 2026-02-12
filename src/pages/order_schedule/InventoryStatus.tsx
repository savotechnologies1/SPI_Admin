import { useCallback, useState } from "react";
import { FaCheck, FaCircle, FaEdit, FaSearch, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import more from "../../assets/more.png";
import edit from "../../assets/edit.png";

// const InventoryStatus = () => {
//   const data = [
//     {
//       id: 1,
//       partNumber: "10001",
//       desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
//       qty: 2560,
//       stock: 2001,
//       cost: 14.92,
//     },
//     {
//       id: 2,
//       partNumber: "10002",
//       desc: "18'x72' Polycarbonate, clear smooth",
//       qty: 1280,
//       stock: 950,
//       cost: 9.45,
//     },
//     {
//       id: 3,
//       partNumber: "10003",
//       desc: "30'x60' Acrylic, frosted matte",
//       qty: 3200,
//       stock: 2400,
//       cost: 19.55,
//     },
//     {
//       id: 4,
//       partNumber: "10004",
//       desc: "20'x48' Polyethylene, white smooth",
//       qty: 1500,
//       stock: 1200,
//       cost: 8.75,
//     },
//     {
//       id: 3,
//       partNumber: "10003",
//       desc: "30'x60' Acrylic, frosted matte",
//       qty: 3200,
//       stock: 2400,
//       cost: 19.55,
//     },
//     {
//       id: 4,
//       partNumber: "10004",
//       desc: "20'x48' Polyethylene, white smooth",
//       qty: 1500,
//       stock: 1200,
//       cost: 8.75,
//     },
//   ];

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;
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

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-5">
//       {/* Breadcrumb */}
//       <div className="flex items-center text-sm text-gray-500 mb-4"></div>
//       <div>
//         {" "}
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//           Inventory status
//         </h1>
//       </div>
//       <div className="flex justify-between  items-center">
//         <div className="flex gap-2 items-center ">
//           <p
//             className={`text-[14px] text-black`}
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             daily schedule & capacity
//           </span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             {" "}
//             Inventory status
//           </span>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white  p-4 mt-6">
//         <div className="flex flex-col md:flex-row justify- gap-4 items-end">
//           <div className="w-full ">
//             <label className="block text-sm font-semibold">Part Family</label>
//             <select className="border w-full px-3 py-2 rounded-md">
//               <option>Cut trim</option>
//               <option>Sending</option>
//             </select>
//           </div>

//           {/* <div className="flex items-center w-full">
//             <div className="w-full">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="border w-full px-3 py-2 rounded-md"
//               />
//             </div>
//             <div>
//               <img src={more} alt="" />
//             </div>
//           </div> */}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white overflow-x-auto  ">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
//               <th className="py-2 px-4 text-left ">Part Number</th>
//               <th className="py-2 px-4 text-left ">Part Description</th>
//               <th className="py-2 px-4 text-left ">Qty Avail</th>
//               <th className="py-2 px-4 text-left ">Safety Stock</th>
//               <th className="py-2 px-4 text-left ">Current Cost</th>
//               {/* <th className="py-2 px-4 text-left "></th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((row) => (
//               <tr key={row.id} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
//                   {row.partNumber}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
//                   {row.desc}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">{row.qty}</td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">
//                   {row.stock}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">
//                   ${row.cost.toFixed(2)}
//                 </td>
//                 {/* <td className="py-3 px-4 text-[#061D22] text-sm  flex space-x-3 items-center">
//                   <img src={edit} alt="" />
//                   <img src={more} alt="" />
//                 </td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4 p-2">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className={`px-2 py-2 rounded-md ${
//               currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
//             }`}
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-md ${
//               currentPage === totalPages ? "bg-gray-300" : "bg-brand text-white"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryStatus;

import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

// const InventoryStatus = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     const fetchInventory = async () => {
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/admin/schedule-inventory`,
//         ); // change to your API
//         setData(response.data.data); // assuming your API returns { data: [...] }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, []);

//   const totalPages = Math.ceil(data.length / rowsPerPage);
//   const currentRows = data.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage,
//   );

//   const goToPreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   if (loading) return <p className="p-6">Loading inventory...</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-5">
//       {/* Breadcrumb */}
//       <div className="flex items-center text-sm text-gray-500 mb-4"></div>
//       <div>
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//           Inventory Status
//         </h1>
//       </div>
//       <div className="flex justify-between items-center">
//         <div className="flex gap-2 items-center ">
//           <p className="text-[14px] text-black">
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             Daily Schedule & Capacity
//           </span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             Inventory Status
//           </span>
//         </div>
//       </div>

//       {/* Filters */}
//       {/* <div className="bg-white p-4 mt-6">
//         <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
//           <div className="w-full">
//             <label className="block text-sm font-semibold">Part Family</label>
//             <select className="border w-full px-3 py-2 rounded-md">
//               <option>Cut trim</option>
//               <option>Sending</option>
//             </select>
//           </div>
//         </div>
//       </div> */}

//       {/* Table */}
//       <div className="bg-white overflow-x-auto mt-8">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
//               <th className="py-2 px-4 text-left">Part Number</th>
//               <th className="py-2 px-4 text-left">Part Description</th>
//               <th className="py-2 px-4 text-left">Qty Avail</th>
//               <th className="py-2 px-4 text-left">Safety Stock</th>
//               <th className="py-2 px-4 text-left">Current Cost</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentRows.map((row, index) => (
//               <tr key={index} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
//                   {row.partNumber}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
//                   {row.partDescription}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">
//                   {row.qtyAvailable}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">
//                   {row.safetyStock}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">
//                   ${row.unitCost}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4 p-2">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className={`px-2 py-2 rounded-md ${
//               currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
//             }`}
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-md ${
//               currentPage === totalPages ? "bg-gray-300" : "bg-brand text-white"
//             }`}ub
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InventoryStatus;

// const InventoryStatus = () => {
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState(""); // Naya state search ke liye
//   const rowsPerPage = 10;
//   const BASE_URL = import.meta.env.VITE_SERVER_URL; // Ensure BASE_URL is defined

//   // API Fetching function
//   const fetchInventory = useCallback(
//     async (searchQuery: string) => {
//       try {
//         setLoading(true);
//         // Backend API ko search query pass kar rahe hain
//         const response = await axios.get(
//           `${BASE_URL}/api/admin/schedule-inventory?search=${searchQuery}`,
//         );
//         setData(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching inventory:", error);
//         setLoading(false);
//       }
//     },
//     [BASE_URL],
//   );

//   // Debounced Search Effect
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       setCurrentPage(1); // Search badalne par page 1 par reset karein
//       fetchInventory(searchTerm);
//     }, 500); // 500ms ka delay (jab user type karna stop kare tab call ho)

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm, fetchInventory]);

//   // Pagination Logic
//   const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
//   const currentRows = data.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage,
//   );

//   const goToPreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   return (
//     <div className="p-4 md:p-6 bg-gray-100 min-h-screen mt-5">
//       {/* Header */}
//       <div>
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//           Inventory Status
//         </h1>
//       </div>

//       {/* Breadcrumbs & Search Row */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
//         <div className="flex gap-2 items-center flex-wrap">
//           <p className="text-[14px] text-black">
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px]">Daily Schedule & Capacity</span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] font-bold">Inventory Status</span>
//         </div>

//         {/* Search Input Field */}
//         <div className="relative w-full md:w-72">
//           <span className="absolute inset-y-0 left-0 flex items-center pl-3">
//             <FaSearch className="text-gray-400 text-sm" />
//           </span>
//           <input
//             type="text"
//             placeholder="Search Part Number..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
//           />
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="bg-white overflow-x-auto mt-6 shadow-sm rounded-lg">
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-xs font-bold uppercase tracking-wider">
//               <th className="py-3 px-4 text-left">Part Number</th>
//               <th className="py-3 px-4 text-left">Part Description</th>
//               <th className="py-3 px-4 text-center">Qty Avail</th>
//               <th className="py-3 px-4 text-center">Safety Stock</th>
//               <th className="py-3 px-4 text-right">Unit Cost</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-10">
//                   Fetching data...
//                 </td>
//               </tr>
//             ) : currentRows.length > 0 ? (
//               currentRows.map((row, index) => (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 text-sm">{row.partNumber}</td>
//                   <td className="py-3 px-4 text-sm text-center ">
//                     {row.partDescription}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-center">
//                     {row.qtyAvailable}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-center ">
//                     {row.safetyStock}
//                   </td>
//                   <td className="py-3 px-4 text-sm text-right  ">
//                     ${row.unitCost}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-10 text-gray-400">
//                   No matching parts found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>

//         {/* Pagination Section */}
//         <div className="flex justify-between items-center p-4 bg-white border-t">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1 || loading}
//             className={`px-4 py-2 text-sm rounded-md transition-all ${
//               currentPage === 1
//                 ? "bg-gray-200 text-gray-400"
//                 : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
//             }`}
//           >
//             Previous
//           </button>

//           <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages || loading}
//             className={`px-4 py-2 text-sm rounded-md transition-all ${
//               currentPage === totalPages
//                 ? "bg-gray-200 text-gray-400"
//                 : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const InventoryStatus = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  const rowsPerPage = 10;
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchInventory = useCallback(
    async (searchQuery: string) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/admin/schedule-inventory?search=${searchQuery}`,
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setLoading(false);
      }
    },
    [BASE_URL],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchInventory(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, fetchInventory]);

  // Handle Edit Click
  const handleEditClick = (row: any) => {
    setEditRowId(row.partNumber);
    setEditFormData({ ...row });
  };

  // Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  // Handle Save (API Call)
  // Handle Save (API Call)
  const handleSave = async () => {
    try {
      // 1. API Call
      await axios.put(`${BASE_URL}/api/admin/update-inventory`, {
        partNumber: editFormData.partNumber,
        qtyAvailable: Number(editFormData.qtyAvailable),
        safetyStock: Number(editFormData.safetyStock),
        unitCost: Number(editFormData.unitCost),
      });

      toast.success("Inventory updated successfully!");

      setData((prevData) =>
        prevData.map((item) =>
          item.partNumber === editRowId ? { ...item, ...editFormData } : item,
        ),
      );

      setEditRowId(null);
    } catch (error) {
      toast.error("Update failed. Please try again.");
      console.error("Update Error:", error);
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(data.length / rowsPerPage) || 1;
  const currentRows = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen mt-5">
      {/* Header & Search (Same as your code) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
        <h1 className="font-semibold text-[24px]">Inventory Status</h1>
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white overflow-x-auto mt-6 shadow-sm rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-xs font-bold uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Part Number</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-center">Qty Avail</th>
              <th className="py-3 px-4 text-center">Safety Stock</th>
              <th className="py-3 px-4 text-right">Unit Cost</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentRows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 text-sm">
                <td className="py-3 px-4">{row.partNumber}</td>
                <td className="py-3 px-4">{row.partDescription}</td>

                {/* Editable Cells */}
                <td className="py-3 px-4 text-center">
                  {editRowId === row.partNumber ? (
                    <input
                      type="number"
                      name="qtyAvailable"
                      value={editFormData.qtyAvailable}
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()} // Enter dabane par save
                      className="w-16 border rounded p-1 text-center"
                    />
                  ) : (
                    row.qtyAvailable
                  )}
                </td>

                <td className="py-3 px-4 text-center">
                  {editRowId === row.partNumber ? (
                    <input
                      type="number"
                      name="safetyStock"
                      value={editFormData.safetyStock}
                      onChange={handleInputChange}
                      className="w-16 border rounded p-1 text-center"
                    />
                  ) : (
                    row.safetyStock
                  )}
                </td>

                <td className="py-3 px-4 text-right">
                  {editRowId === row.partNumber ? (
                    <input
                      type="number"
                      name="unitCost"
                      value={editFormData.unitCost}
                      onChange={handleInputChange}
                      className="w-20 border rounded p-1 text-right"
                    />
                  ) : (
                    `$${row.unitCost}`
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-center">
                  {editRowId === row.partNumber ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={handleSave}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setEditRowId(null)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEditClick(row)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination (Same as your code) */}
      </div>
    </div>
  );
};

export default InventoryStatus;
