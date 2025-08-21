import React, { useEffect, useState } from "react";
import edit from "../../assets/edit_icon.png";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import add from "../../assets/add.png";
import { Send, Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  deleteSupplierOrder,
  editSupplierOrder,
  sendSupplierEmailApi,
  supplierOrderListApi,
  updateSupplierOrderStatus,
} from "./https/suppliersApi";
interface WorkInstructionItem {
  id: string;
  imageUrl: string;
  name: string;
  partDesc: string;
  stepNumber: string;
  description: string;
  submitDate: string;
  statusColor: string;
}

const mockData: WorkInstructionItem[] = [
  {
    id: "1",
    imageUrl: "/avatar1.jpg",
    name: "John Smith",
    partDesc: "Cut Trim",
    stepNumber: "Step 1",
    description: "Remove burn and sharp edges",
    submitDate: "18/09/2016",
    statusColor: "green",
  },
  {
    id: "2",
    imageUrl: "/avatar2.jpg",
    name: "Emily Johnson",
    partDesc: "Cut Trim",
    stepNumber: "Step 2",
    description: "Remove burn and sharp edges",
    submitDate: "12/06/2020",
    statusColor: "yellow",
  },
  {
    id: "3",
    imageUrl: "/avatar3.jpg",
    name: "Michael Brown",
    partDesc: "Cut Trim",
    stepNumber: "Step 3",
    description: "Remove burn and sharp edges",
    submitDate: "15/08/2017",
    statusColor: "red",
  },
  {
    id: "4",
    imageUrl: "/avatar4.jpg",
    name: "Sarah Wilson",
    partDesc: "Cut Trim",
    stepNumber: "Step 4",
    description: "Remove burn and sharp edges",
    submitDate: "07/05/2016",
    statusColor: "gray",
  },
  {
    id: "5",
    imageUrl: "/avatar5.jpg",
    name: "David Lee",
    partDesc: "Cut Trim",
    stepNumber: "Step 5",
    description: "Remove burn and sharp edges",
    submitDate: "28/10/2012",
    statusColor: "green",
  },
];

// const SupplierOrderList: React.FC = () => {
//   const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
//   const rowsPerPage = 5;
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editableRowId, setEditableRowId] = useState<string | null>(null);
//   const [editedRowData, setEditedRowData] = useState({});
//   const [query, setQuery] = useState("");
//   const [filteredOrders, setFilteredOrders] = useState<string[]>([]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     setQuery(value);
//   };
//   const toggleOptions = (index: number) => {
//     setOpenOptionsIndex((prev) => (prev === index ? null : index));
//   };

//   console.log("queryquery", query);

//   const { id } = useParams();

//   const getColorClass = (color: string) => {
//     switch (color) {
//       case "green":
//         return "bg-green-200 text-green-700";
//       case "yellow":
//         return "bg-yellow-200 text-yellow-800";
//       case "red":
//         return "bg-red-200 text-red-700";
//       default:
//         return "bg-gray-200 text-gray-600";
//     }
//   };

//   const navigate = useNavigate();
//   const handleEdit = (id: string) => {
//     navigate(`/edit-work-instruction/${id}`);
//   };
//   const [workData, setWorkData] = useState<[]>([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [searchVal, setSearchVal] = useState("");
//   const [showConfirmId, setShowConfirmId] = useState(null);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [selectedValue, setSelectedValue] = useState("all");
//   const debouncedSearchVal = useDebounce(query, 500);
//   function useDebounce(value, delay) {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//       const handler = setTimeout(() => {
//         setDebouncedValue(value);
//       }, delay);

//       return () => {
//         clearTimeout(handler);
//       };
//     }, [value, delay]);

//     return debouncedValue;
//   }

//   const handleSelectChange = (event) => {
//     const newValue = event.target.value;
//     setSelectedValue(newValue);

//     console.log("A new option was selected:", newValue);
//   };
//   console.log("searchValsearchVal", searchVal);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };
//   const fetchWorkInstructionList = async (page = 1, searchTerm = "") => {
//     try {
//       const response = await supplierOrderListApi(
//         page,
//         rowsPerPage,
//         (searchTerm = query)
//       );
//       setWorkData(response.data);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (error) {
//       console.error("Failed to fetch work instructions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchWorkInstructionList(currentPage, debouncedSearchVal);
//   }, [currentPage, debouncedSearchVal]);

//   //   const handleDelete = async (id: string | null, type: string) => {
//   //     if (!id) return;
//   //     try {
//   //       const response = await deleteWorkInstruction(id, type);
//   //       if (response?.status === 200) {
//   //         await fetchWorkInstructionList(currentPage);
//   //       }
//   //     } catch (error) {
//   //       console.error(error);
//   //     }
//   //   };

//   const editWorkInstruction = (rowData) => {
//     console.log("rowDatarowData", rowData);
//     navigate(`/edit-supplier-order/${rowData.id}`);
//     setEditableRowId(rowData.id);
//     setEditedRowData({ ...rowData });
//   };
//   const handleEditSave = async () => {
//     try {
//       await editSupplierOrder(editedRowData.id, editedRowData);
//       setEditableRowId(null);
//       fetchWorkInstructionList(currentPage, debouncedSearchVal);
//     } catch (error) {
//       console.error("Failed to update", error);
//     }
//   };

//   const handleEditCancel = () => {
//     setEditableRowId(null);
//     setEditedRowData({});
//   };
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedRowData((prev) => ({ ...prev, [name]: value }));
//   };
//   const handleDelete = async (id: string | null) => {
//     if (!id) return;
//     try {
//       const response = await deleteSupplierOrder(id);
//       if (response?.status === 200) {
//         await fetchWorkInstructionList(currentPage);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const sendSupplierEmail = async (item) => {
//     await sendSupplierEmailApi(item.id);
//   };
//   return (
//     <div className=" bg-gray-100 min-h-screen p-8">
//       <div className="flex justify-between">
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
//           All Supplier Orders
//         </h1>

//         <div className="flex justify-between">
//           <div className="relative w-[400px] mr-4">
//             <input
//               type="text"
//               placeholder="Search order number..."
//               value={query}
//               onChange={handleChange}
//               className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg outline-none focus:ring-0 focus:border-gray-400"
//             />
//             <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
//               <svg
//                 className="w-5 h-5 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
//                 />
//               </svg>
//             </div>

//             {filteredOrders.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-auto shadow-md">
//                 {filteredOrders.map((order, index) => (
//                   <li
//                     key={index}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       setQuery(order);
//                       setFilteredOrders([]);
//                     }}
//                   >
//                     {order}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <div className="flex relative ">
//             <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
//               <NavLink to="/add-work-instruction">
//                 <span className="">New Work Instruction</span>
//               </NavLink>
//             </button>
//             <div className="absolute top-3 left-2">
//               <img src={add} alt="" className="w-4 h-4" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bg-white p-4 mt-6 rounded-lg">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3">Order Number</th>
//                 <th className="px-4 py-3">Order Date</th>
//                 <th className="px-4 py-3">Supplier Name</th>
//                 <th className="px-4 py-3">Part Name</th>
//                 <th className="px-4 py-3">Order Needed</th>
//                 <th className="px-4 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {workData.map((item, index) => (
//                 <tr key={item.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     {editableRowId === item.id ? (
//                       <input
//                         name="order_number"
//                         value={editedRowData.order_number}
//                         onChange={handleEditChange}
//                         disabled
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       item.order_number
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     {editableRowId === item.id ? (
//                       <input
//                         type="date"
//                         name="order_date"
//                         value={editedRowData.order_date}
//                         onChange={handleEditChange}
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       item.order_date
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     {item?.supplier === null
//                       ? "not available"
//                       : `${item?.supplier?.firstName} ${item?.supplier?.lastName}`}
//                   </td>

//                   <td className="px-4 py-3">
//                     {item?.part === null ? (
//                       "not available"
//                     ) : editableRowId === item.id ? (
//                       <input
//                         name="partNumber"
//                         value={editedRowData.part?.partNumber || ""}
//                         onChange={handleEditChange}
//                         className="border px-2 py-1 rounded"
//                         disabled
//                       />
//                     ) : (
//                       item?.part?.partNumber
//                     )}
//                   </td>

//                   <td className="px-4 py-3">
//                     {editableRowId === item.id ? (
//                       <input
//                         type="date"
//                         name="need_date"
//                         value={editedRowData.need_date}
//                         onChange={handleEditChange}
//                         className="border px-2 py-1 rounded"
//                       />
//                     ) : (
//                       <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-600">
//                         {new Date(item.need_date).toLocaleDateString()}
//                       </span>
//                     )}
//                   </td>

//                   <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
//                     {editableRowId === item.id ? (
//                       <>
//                         <button
//                           onClick={handleEditSave}
//                           className="text-green-600 text-sm font-semibold"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={handleEditCancel}
//                           className="text-gray-600 text-sm"
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <Send
//                           className="text-brand cursor-pointer"
//                           onClick={() => sendSupplierEmail(item)}
//                         />
//                         {/* <button
//                           onClick={() => sendSupplierEmail(item)}
//                           className="bg-brand text-white px-5 py-3 rounded-lg"
//                         >
//                           Send Order
//                         </button> */}
//                         <button
//                           className="text-brand"
//                           onClick={() => editWorkInstruction(item)}
//                         >
//                           <img
//                             src={edit}
//                             alt="Edit"
//                             className="w-4 h-4 md:w-5 md:h-5"
//                           />
//                         </button>

//                         <FaTrash
//                           className="text-red-500 cursor-pointer h-7"
//                           onClick={() => setSelectedId(item.id)}
//                         />

//                         {selectedId === item.id && (
//                           <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
//                             <div className="bg-white p-6 rounded-xl shadow-lg">
//                               <h2 className="text-lg font-semibold mb-4">
//                                 Are you sure?
//                               </h2>
//                               <p className="mb-4">
//                                 Do you really want to delete this supplier
//                                 order.
//                               </p>
//                               <div className="flex justify-end space-x-3">
//                                 <button
//                                   className="px-4 py-2 bg-gray-300 rounded"
//                                   onClick={() => setSelectedId(null)}
//                                 >
//                                   Cancel
//                                 </button>
//                                 <button
//                                   className="px-4 py-2 bg-red-500 text-white rounded"
//                                   onClick={() => {
//                                     handleDelete(selectedId, item.type); // use selectedId here
//                                     setSelectedId(null);
//                                   }}
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2 ">
//           <p className="text-xs md:text-sm text-gray-600">
//             Page {currentPage} of {totalPages}
//           </p>

//           <div className="flex gap-2">
//             <button
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//               className={`p-1 md:p-2 rounded ${
//                 currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//               }`}
//             >
//               <FontAwesomeIcon icon={faArrowLeft} />
//             </button>

//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`p-1 md:p-2 rounded ${
//                 currentPage === totalPages
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-gray-300"
//               }`}
//             >
//               <FontAwesomeIcon icon={faArrowRight} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupplierOrderList;

// --- MOCK API for status update ---
// In a real app, this would be in your API service file.
const updateSupplierOrderStatusApi = async (id: string, newStatus: string) => {
  console.log(`API CALL: Updating order ${id} to status ${newStatus}`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Simulate a successful response
  return { status: 200, data: { id, status: newStatus } };
};
// --- END MOCK ---

const SupplierOrderList: React.FC = () => {
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const rowsPerPage = 5;
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableRowId, setEditableRowId] = useState<string | null>(null);
  const [editedRowData, setEditedRowData] = useState<any>({});
  const [query, setQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };
  const toggleOptions = (index: number) => {
    setOpenOptionsIndex((prev) => (prev === index ? null : index));
  };

  const { id } = useParams();

  // NEW: Updated getColorClass to handle more statuses
  const getColorClass = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-200 text-green-700";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "shipped":
        return "bg-blue-200 text-blue-700";
      case "cancelled":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const navigate = useNavigate();
  // Renamed handleEdit to avoid confusion with the inline edit function
  const navigateToEditPage = (id: string) => {
    navigate(`/edit-work-instruction/${id}`);
  };

  const [workData, setWorkData] = useState<any[]>([]); // Using any for flexibility with new status field
  const [totalPages, setTotalPages] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [showConfirmId, setShowConfirmId] = useState(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("all");
  const debouncedSearchVal = useDebounce(query, 500);

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchWorkInstructionList = async (page = 1, searchTerm = "") => {
    try {
      const response = await supplierOrderListApi(
        page,
        rowsPerPage,
        searchTerm
      );
      // NEW: Adding a mock 'status' to the data if it doesn't exist, for demonstration
      const dataWithStatus = response.data.map((item: any) => ({
        ...item,
        status: item.status || "Pending", // Default to 'Pending'
      }));
      setWorkData(dataWithStatus);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch work instructions:", error);
    }
  };

  useEffect(() => {
    fetchWorkInstructionList(currentPage, debouncedSearchVal);
  }, [currentPage, debouncedSearchVal]);

  const editWorkInstruction = (rowData: any) => {
    navigate(`/edit-supplier-order/${rowData.id}`);
    setEditableRowId(rowData.id);
    setEditedRowData({ ...rowData });
  };

  const handleEditSave = async () => {
    try {
      await editSupplierOrder(editedRowData.id, editedRowData);
      setEditableRowId(null);
      fetchWorkInstructionList(currentPage, debouncedSearchVal);
    } catch (error) {
      console.error("Failed to update", error);
    }
  };

  const handleEditCancel = () => {
    setEditableRowId(null);
    setEditedRowData({});
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedRowData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    try {
      const response = await deleteSupplierOrder(id);
      if (response?.status === 200) {
        await fetchWorkInstructionList(currentPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sendSupplierEmail = async (item: any) => {
    await sendSupplierEmailApi(item.id);
  };

  const handleStatusChange = async (
    orderId: string,
    quantity: string,
    part_id: string,
    newStatus: string
  ) => {
    console.log(
      `Status change for Order ID: ${orderId}, New Status: ${newStatus}`
    );

    try {
      // Call the API to update the status in the backend
      await updateSupplierOrderStatus(orderId, quantity, part_id, newStatus);

      // Update the state locally for an immediate UI change
      setWorkData((currentData) =>
        currentData.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      // Optionally, show a success notification here
    } catch (error) {
      console.error("Failed to update status:", error);
      // Optionally, show an error notification here
    }
  };

  return (
    <div className=" bg-gray-100 min-h-screen p-8">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
          All Supplier Orders
        </h1>
        <div className="flex justify-between">
          <div className="relative w-[400px] mr-4">
            <input
              type="text"
              placeholder="Search order number..."
              value={query}
              onChange={handleChange}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg outline-none focus:ring-0 focus:border-gray-400"
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
                />
              </svg>
            </div>
          </div>
          <div className="flex relative ">
            <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/supplier-order">
                <span className="">Supplier Order</span>
              </NavLink>
            </button>
            <div className="absolute top-3 left-2">
              <img src={add} alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 mt-6 rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Part Name</th>
                <th className="px-4 py-3">Order Needed</th>
                {/* NEW: Added Status column header */}
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workData.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {editableRowId === item.id ? (
                      <input
                        name="order_number"
                        value={editedRowData.order_number}
                        onChange={handleEditChange}
                        disabled
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      item.order_number
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editableRowId === item.id ? (
                      <input
                        type="date"
                        name="order_date"
                        value={editedRowData.order_date}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      item.order_date
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {item?.supplier === null
                      ? "not available"
                      : `${item?.supplier?.firstName} ${item?.supplier?.lastName}`}
                  </td>

                  <td className="px-4 py-3">
                    {item?.part === null ? (
                      "not available"
                    ) : editableRowId === item.id ? (
                      <input
                        name="partNumber"
                        value={editedRowData.part?.partNumber || ""}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                        disabled
                      />
                    ) : (
                      item?.part?.partNumber
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {editableRowId === item.id ? (
                      <input
                        type="date"
                        name="need_date"
                        value={editedRowData.need_date}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-600">
                        {new Date(item.need_date).toLocaleDateString()}
                      </span>
                    )}
                  </td>

                  {/* NEW: Status dropdown cell */}
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          item.quantity,
                          item.part_id,
                          e.target.value
                        )
                      }
                      className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer ${getColorClass(
                        item.status
                      )}`}
                      // Prevent click from propagating to the row if needed
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
                    {editableRowId === item.id ? (
                      <>
                        <button
                          onClick={handleEditSave}
                          className="text-green-600 text-sm font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="text-gray-600 text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <Send
                          className="text-brand cursor-pointer"
                          onClick={() => sendSupplierEmail(item)}
                        />
                        <button
                          className="text-brand"
                          onClick={() => editWorkInstruction(item)}
                        >
                          <img
                            src={edit}
                            alt="Edit"
                            className="w-4 h-4 md:w-5 md:h-5"
                          />
                        </button>

                        <FaTrash
                          className="text-red-500 cursor-pointer h-7"
                          onClick={() => setSelectedId(item.id)}
                        />

                        {selectedId === item.id && (
                          <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                              <h2 className="text-lg font-semibold mb-4">
                                Are you sure?
                              </h2>
                              <p className="mb-4">
                                Do you really want to delete this supplier
                                order.
                              </p>
                              <div className="flex justify-end space-x-3">
                                <button
                                  className="px-4 py-2 bg-gray-300 rounded"
                                  onClick={() => setSelectedId(null)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 bg-red-500 text-white rounded"
                                  onClick={() => {
                                    handleDelete(selectedId);
                                    setSelectedId(null);
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
  );
};

export default SupplierOrderList;
