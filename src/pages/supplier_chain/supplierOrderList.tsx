import React, { useEffect, useState } from "react";
import edit from "../../assets/edit_icon.png";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import add from "../../assets/add.png";
import { Trash2 } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  deleteSupplierOrder,
  editSupplierOrder,
  supplierOrderListApi,
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

const SupplierOrderList: React.FC = ({ query }) => {
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const rowsPerPage = 5;
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editableRowId, setEditableRowId] = useState<string | null>(null);
  const [editedRowData, setEditedRowData] = useState({});

  const toggleOptions = (index: number) => {
    setOpenOptionsIndex((prev) => (prev === index ? null : index));
  };

  console.log("queryquery", query);

  const { id } = useParams();

  const getColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-200 text-green-700";
      case "yellow":
        return "bg-yellow-200 text-yellow-800";
      case "red":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const navigate = useNavigate();
  const handleEdit = (id: string) => {
    navigate(`/edit-work-instruction/${id}`);
  };
  const [workData, setWorkData] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [showConfirmId, setShowConfirmId] = useState(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("all");
  const debouncedSearchVal = useDebounce(query, 500);
  function useDebounce(value, delay) {
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
  const handleChange = (e) => {
    try {
      setSearchVal(e.target.value);
    } catch (error) {
      throw error;
    }
  };

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);

    console.log("A new option was selected:", newValue);
  };
  console.log("searchValsearchVal", searchVal);

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
        (searchTerm = query)
      );
      setWorkData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch work instructions:", error);
    }
  };

  useEffect(() => {
    fetchWorkInstructionList(currentPage, debouncedSearchVal);
  }, [currentPage, debouncedSearchVal]);

  //   const handleDelete = async (id: string | null, type: string) => {
  //     if (!id) return;
  //     try {
  //       const response = await deleteWorkInstruction(id, type);
  //       if (response?.status === 200) {
  //         await fetchWorkInstructionList(currentPage);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const editWorkInstruction = (rowData) => {
    console.log("rowDatarowData", rowData);

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
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedRowData((prev) => ({ ...prev, [name]: value }));
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
  return (
    <div className=" bg-gray-100 min-h-screen">
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
                                    handleDelete(selectedId, item.type); // use selectedId here
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
