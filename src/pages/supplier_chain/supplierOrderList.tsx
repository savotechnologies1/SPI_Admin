import React, { useEffect, useState } from "react";
import edit from "../../assets/edit_icon.png";
import { FaCircle, FaSpinner, FaTrash } from "react-icons/fa";
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

const SupplierOrderList: React.FC = () => {
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const rowsPerPage = 5;
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableRowId, setEditableRowId] = useState<string | null>(null);
  const [editedRowData, setEditedRowData] = useState<any>({});
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const { id } = useParams();

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
  const navigateToEditPage = (id: string) => {
    navigate(`/edit-work-instruction/${id}`);
  };

  const [workData, setWorkData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [showConfirmId, setShowConfirmId] = useState(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("all");
  const debouncedSearchVal = useDebounce(query, 500);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true); // Start loading
    try {
      const response = await supplierOrderListApi(
        page,
        rowsPerPage,
        searchTerm,
      );
      const dataWithStatus = response.data.map((item: any) => ({
        ...item,
        status: item.status || "Pending",
      }));
      setWorkData(dataWithStatus);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch work instructions:", error);
    } finally {
      setIsLoading(false); // End loading
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
    newStatus: string,
  ) => {
    console.log(
      `Status change for Order ID: ${orderId}, New Status: ${newStatus}`,
    );

    try {
      await updateSupplierOrderStatus(orderId, quantity, part_id, newStatus);
      setWorkData((currentData) =>
        currentData.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        ),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className=" bg-gray-100 min-h-screen p-8 my-6">
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
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            {/* <tbody>
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
                  <td className="px-4 py-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(
                          item.id,
                          item.quantity,
                          item.part_id,
                          e.target.value,
                        )
                      }
                      className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer ${getColorClass(
                        item.status,
                      )}`}
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
            </tbody> */}
            <tbody>
              {isLoading ? (
                // --- LOADER ROW ---
                <tr>
                  <td colSpan={7} className="px-4 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      {/* animate-spin class se spinner move karega */}
                      <FaSpinner className="animate-spin text-brand text-3xl" />
                      <span className="text-gray-500 font-medium">
                        Loading orders...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : workData.length === 0 ? (
                // --- NO DATA ROW ---
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-20 text-center text-gray-500 italic"
                  >
                    No supplier orders found.
                  </td>
                </tr>
              ) : (
                // --- DATA ROWS ---
                workData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      {editableRowId === item.id ? (
                        <input
                          name="order_number"
                          value={editedRowData.order_number}
                          onChange={handleEditChange}
                          disabled
                          className="border px-2 py-1 rounded bg-gray-50 w-full"
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
                          className="border px-2 py-1 rounded w-full"
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
                          className="border px-2 py-1 rounded bg-gray-50 w-full"
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
                          className="border px-2 py-1 rounded w-full"
                        />
                      ) : (
                        <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-600">
                          {new Date(item.need_date).toLocaleDateString()}
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(
                            item.id,
                            item.quantity,
                            item.part_id,
                            e.target.value,
                          )
                        }
                        className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer ${getColorClass(
                          item.status,
                        )}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-2 py-3 md:px-3 md:py-4 flex justify-center gap-2 md:gap-4">
                      {editableRowId === item.id ? (
                        <>
                          <button
                            onClick={handleEditSave}
                            className="text-green-600 text-sm font-semibold hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="text-gray-600 text-sm hover:underline"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <Send
                            className="text-brand cursor-pointer w-5 h-5"
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
                            className="text-red-500 cursor-pointer w-5 h-5"
                            onClick={() => setSelectedId(item.id)}
                          />

                          {selectedId === item.id && (
                            <div className="fixed inset-0 bg-black/40 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                              <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                                <h2 className="text-lg font-semibold mb-2">
                                  Are you sure?
                                </h2>
                                <p className="mb-6 text-gray-600 text-sm">
                                  Do you really want to delete this supplier
                                  order. This action cannot be undone.
                                </p>
                                <div className="flex justify-end space-x-3">
                                  <button
                                    className="px-4 py-2 bg-gray-200 rounded-lg text-sm"
                                    onClick={() => setSelectedId(null)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
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
                ))
              )}
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

// Import your assets and API functions here
// import { supplierOrderListApi, editSupplierOrder, deleteSupplierOrder, sendSupplierEmailApi, updateSupplierOrderStatus } from "./api";
// import edit from "./assets/edit.svg";
// import add from "./assets/add.svg";

// const SupplierOrderList: React.FC = () => {
//   const [rowsPerPage = 5] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [editableRowId, setEditableRowId] = useState<string | null>(null);
//   const [editedRowData, setEditedRowData] = useState<any>({});
//   const [query, setQuery] = useState("");
//   const [workData, setWorkData] = useState<any[]>([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedId, setSelectedId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // Loader State

//   const navigate = useNavigate();

//   function useDebounce(value: string, delay: number) {
//     const [debouncedValue, setDebouncedValue] = useState(value);
//     useEffect(() => {
//       const handler = setTimeout(() => setDebouncedValue(value), delay);
//       return () => clearTimeout(handler);
//     }, [value, delay]);
//     return debouncedValue;
//   }

//   const debouncedSearchVal = useDebounce(query, 500);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setQuery(e.target.value);
//   };

//   const getColorClass = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "delivered":
//         return "bg-green-200 text-green-700";
//       case "pending":
//         return "bg-yellow-200 text-yellow-800";
//       case "shipped":
//         return "bg-blue-200 text-blue-700";
//       case "cancelled":
//         return "bg-red-200 text-red-700";
//       default:
//         return "bg-gray-200 text-gray-600";
//     }
//   };

//   const fetchWorkInstructionList = async (page = 1, searchTerm = "") => {
//     setIsLoading(true); // Start Loading
//     try {
//       const response = await supplierOrderListApi(
//         page,
//         rowsPerPage,
//         searchTerm,
//       );
//       const dataWithStatus = response.data.map((item: any) => ({
//         ...item,
//         status: item.status || "Pending",
//       }));
//       setWorkData(dataWithStatus);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (error) {
//       console.error("Failed to fetch work instructions:", error);
//     } finally {
//       setIsLoading(false); // Stop Loading
//     }
//   };

//   useEffect(() => {
//     fetchWorkInstructionList(currentPage, debouncedSearchVal);
//   }, [currentPage, debouncedSearchVal]);

//   const editWorkInstruction = (rowData: any) => {
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

//   const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedRowData((prev: any) => ({ ...prev, [name]: value }));
//   };

//   const handleDelete = async (id: string | null) => {
//     if (!id) return;

//     // Optimistic Update: List se turant remove karein
//     setWorkData((prev) => prev.filter((item) => item.id !== id));

//     try {
//       const response = await deleteSupplierOrder(id);
//       if (response?.status === 200) {
//         // Pagination sync karne ke liye refresh karein
//         fetchWorkInstructionList(currentPage, debouncedSearchVal);
//       }
//     } catch (error) {
//       console.error(error);
//       // Agar error aaye to wapas fetch karein (Rollback)
//       fetchWorkInstructionList(currentPage, debouncedSearchVal);
//     }
//   };

//   const handleStatusChange = async (
//     orderId: string,
//     quantity: string,
//     part_id: string,
//     newStatus: string,
//   ) => {
//     try {
//       await updateSupplierOrderStatus(orderId, quantity, part_id, newStatus);
//       setWorkData((currentData) =>
//         currentData.map((order) =>
//           order.id === orderId ? { ...order, status: newStatus } : order,
//         ),
//       );
//     } catch (error) {
//       console.error("Failed to update status:", error);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-8 my-6">
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
//             <div className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500">
//               <svg
//                 className="w-5 h-5"
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
//           </div>
//           <NavLink
//             to="/supplier-order"
//             className="py-2 px-7 rounded-lg bg-brand text-white flex gap-2 items-center hover:opacity-90 transition-all"
//           >
//             <span>Supplier Order</span>
//           </NavLink>
//         </div>
//       </div>

//       <div className="bg-white p-4 mt-6 rounded-lg shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-4 py-3">Order Number</th>
//                 <th className="px-4 py-3">Order Date</th>
//                 <th className="px-4 py-3">Supplier Name</th>
//                 <th className="px-4 py-3">Part Name</th>
//                 <th className="px-4 py-3">Order Needed</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 // --- LOADER ---
//                 <tr>
//                   <td colSpan={7} className="px-4 py-20 text-center">
//                     <div className="flex flex-col items-center justify-center gap-2">
//                       <FaSpinner className="animate-spin text-brand text-2xl" />
//                       <span className="text-gray-500">Loading orders...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : workData.length === 0 ? (
//                 // --- NO DATA ---
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-4 py-10 text-center text-gray-500 italic"
//                   >
//                     No supplier orders found.
//                   </td>
//                 </tr>
//               ) : (
//                 // --- TABLE ROWS ---
//                 workData.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-b hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-4 py-3 font-medium">
//                       {editableRowId === item.id ? (
//                         <input
//                           name="order_number"
//                           value={editedRowData.order_number}
//                           disabled
//                           className="border px-2 py-1 rounded bg-gray-50 w-full"
//                         />
//                       ) : (
//                         item.order_number
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       {editableRowId === item.id ? (
//                         <input
//                           type="date"
//                           name="order_date"
//                           value={editedRowData.order_date}
//                           onChange={handleEditChange}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : (
//                         item.order_date
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item?.supplier
//                         ? `${item.supplier.firstName} ${item.supplier.lastName}`
//                         : "N/A"}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item?.part?.partNumber || "N/A"}
//                     </td>
//                     <td className="px-4 py-3">
//                       {editableRowId === item.id ? (
//                         <input
//                           type="date"
//                           name="need_date"
//                           value={editedRowData.need_date}
//                           onChange={handleEditChange}
//                           className="border px-2 py-1 rounded w-full"
//                         />
//                       ) : (
//                         <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-600">
//                           {new Date(item.need_date).toLocaleDateString()}
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       <select
//                         value={item.status}
//                         onChange={(e) =>
//                           handleStatusChange(
//                             item.id,
//                             item.quantity,
//                             item.part_id,
//                             e.target.value,
//                           )
//                         }
//                         className={`px-2 py-1 rounded text-xs font-semibold border-none outline-none cursor-pointer ${getColorClass(item.status)}`}
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Shipped">Shipped</option>
//                         <option value="Delivered">Delivered</option>
//                         <option value="Cancelled">Cancelled</option>
//                       </select>
//                     </td>
//                     <td className="px-2 py-3 flex justify-center gap-4">
//                       {editableRowId === item.id ? (
//                         <div className="flex gap-2">
//                           <button
//                             onClick={handleEditSave}
//                             className="text-green-600 font-semibold hover:underline"
//                           >
//                             Save
//                           </button>
//                           <button
//                             onClick={handleEditCancel}
//                             className="text-gray-500 hover:underline"
//                           >
//                             Cancel
//                           </button>
//                         </div>
//                       ) : (
//                         <>
//                           <Send
//                             className="text-brand cursor-pointer w-5 h-5"
//                             onClick={() => sendSupplierEmailApi(item.id)}
//                           />
//                           <button onClick={() => editWorkInstruction(item)}>
//                             <span className="text-brand font-bold">Edit</span>
//                           </button>
//                           <FaTrash
//                             className="text-red-500 cursor-pointer w-5 h-5"
//                             onClick={() => setSelectedId(item.id)}
//                           />
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* --- PAGINATION --- */}
//         {!isLoading && workData.length > 0 && (
//           <div className="flex flex-row justify-between items-center bg-white py-4 px-2 md:px-4 border-t">
//             <p className="text-xs md:text-sm text-gray-600">
//               Page <span className="font-bold">{currentPage}</span> of{" "}
//               <span className="font-bold">{totalPages}</span>
//             </p>
//             <div className="flex gap-2">
//               <button
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className={`p-2 rounded-lg border ${currentPage === 1 ? "opacity-50" : "text-brand border-brand"}`}
//               >
//                 <FontAwesomeIcon icon={faArrowLeft} />
//               </button>
//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className={`p-2 rounded-lg border ${currentPage === totalPages ? "opacity-50" : "text-brand border-brand"}`}
//               >
//                 <FontAwesomeIcon icon={faArrowRight} />
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- DELETE MODAL --- */}
//       {selectedId && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
//             <h2 className="text-xl font-bold mb-2">Confirm Delete</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete this supplier order?
//             </p>
//             <div className="flex justify-end space-x-3">
//               <button
//                 className="px-4 py-2 bg-gray-200 rounded-lg"
//                 onClick={() => setSelectedId(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                 onClick={() => {
//                   handleDelete(selectedId);
//                   setSelectedId(null);
//                 }}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// export default SupplierOrderList;
