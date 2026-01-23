import React, { useEffect, useState } from "react";
import edit from "../../assets/edit_icon.png";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import add from "../../assets/add.png";
import { Trash2 } from "lucide-react";
import {
  deleteWorkInstruction,
  workInstructionList,
} from "../Work_Instrcution.tsx/https/workInstructionApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  deleteScheduleOrder,
  scheduleStockOrderListApi,
} from "./https/schedulingApis";
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

const StockOrderScheduleList: React.FC = () => {
  const [workData, setWorkData] = useState<any[]>([]); // Use any[] for now for simplicity
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedType, setSelectedType] = useState("all"); // Filter state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 10;
  const debouncedSearchVal = useDebounce(searchVal, 500);

  // Custom Debounce Hook (your implementation is fine)
  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
  }

  // Fetcher function
  const fetchScheduleList = async (page = 1, type = "all", searchTerm = "") => {
    setIsLoading(true); // 2. API call shuru hone par loading true
    try {
      // Pass all parameters to the API call
      const response = await scheduleStockOrderListApi(
        page,
        rowsPerPage,
        type,
        searchTerm,
      );
      setWorkData(response.data.data || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setIsLoading(false); // 3. API call khatam hone par loading false
    } catch (error) {
      console.error("Failed to fetch schedule list:", error);
    }
  };

  // Effect to fetch data when page, filter, or debounced search changes
  useEffect(() => {
    fetchScheduleList(currentPage, selectedType, debouncedSearchVal);
  }, [currentPage, selectedType, debouncedSearchVal]);

  // Handlers for UI changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new filter
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleDelete = async (id: string, orderId: string) => {
    if (!id || !orderId) return;

    try {
      await deleteScheduleOrder(id, { orderId });
      fetchScheduleList(currentPage, selectedType, debouncedSearchVal);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-GB"); // DD/MM/YYYY
    } catch (error) {
      return "Invalid Date";
    }
  };
  console.log("workData", workData);
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-5">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
          All Schedule Orders
        </h1>

        <div className="flex relative">
          {/* <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/add-work-instruction">
              <span className="">New Work Instruction</span>
            </NavLink>
          </button> */}
          <div className="absolute top-3 left-2">
            <img src={add} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center text-sm text-gray-500">
        <NavLink to="/dashboardDetailes">Dashboard</NavLink>
        <FaCircle className="text-[6px]" />
        <span>Order Schedule</span>
        <FaCircle className="text-[6px]" />
        <span>Schedule Order List</span>
      </div>

      <div className="bg-white p-4 mt-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <select
            id="work-instruction-filter"
            className="border w-full md:w-1/3 px-3 py-2 rounded-md"
            value={selectedType}
            onChange={handleSelectChange}
          >
            <option value="all">All Order Types</option>
            <option value="StockOrder">Stock Order</option>
            <option value="CustomOrder">Custom Order</option>
          </select>
          <input
            type="text"
            placeholder="Search by Order , Part or Status..."
            className="border w-full md:w-2/3 px-3 py-2 rounded-md"
            value={searchVal}
            onChange={handleSearchChange}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">order number</th>
                <th className="px-4 py-3">Product Number</th>
                <th className="px-4 py-3">Part Number</th>
                <th className="px-4 py-3">Process</th>
                {/* <th className="px-4 py-3">Process </th> */}
                <th className="px-4 py-3">OrderDate</th>
                <th className="px-4 py-3">Delivery Date</th>
                <th className="px-4 py-3">Completed Date</th>
                <th className="px-4 py-3">Completed By</th>
                <th className="px-4 py-3">Employee Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={11} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-6 h-6 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : workData.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    No Schedule Orders Found.
                  </td>
                </tr>
              ) : (
                workData
                  // 1. Agar backend se hi parts alag-alag aa rahe hain (jo ki aa rahe hain),
                  // toh aapko manually flatMap karne ki zaroorat nahi hai.
                  // Lekin agar aapko tree expansion chahiye hi, toh filter ko ID par lagayein, part_id par nahi.
                  .filter(
                    (value, index, self) =>
                      index === self.findIndex((t) => t.id === value.id), // 🔥 Fix: ID par filter karein, part_id par nahi
                  )
                  .map((rowItem) => (
                    <tr key={rowItem.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {/* Aapke JSON mein order_id hai, direct order object shayad missing hai */}
                        {rowItem.order?.orderNumber ||
                          rowItem.order_id?.slice(0, 8) ||
                          "N/A"}
                      </td>

                      {/* Product Number */}
                      <td className="px-4 py-3">
                        {rowItem.order?.productNumber || "product-1"}
                      </td>

                      {/* Part Number (340543 wala part yahan dikhega) */}

                      <td className="px-4 py-3">
                        {rowItem.part?.partNumber || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {rowItem.part?.process?.processName || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(rowItem.order_date)}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(rowItem.delivery_date)}
                      </td>
                      <td className="px-4 py-3">
                        {formatDate(rowItem.completed_date)}
                      </td>
                      <td className="px-4 py-3">
                        {rowItem.completed_by || "Not Available"}
                      </td>
                      <td className="px-4 py-3">
                        {/* JSON: completedByEmployee.firstName */}
                        {rowItem?.completedByEmployee
                          ? `${rowItem.completedByEmployee.firstName} ${rowItem.completedByEmployee.lastName}`
                          : "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {/* Status logic */}
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            rowItem.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {rowItem?.status || "new"}
                        </span>
                      </td>
                      <td className="px-2 py-3 md:px-3 md:py-4">
                        <FaTrash
                          className="text-red-500 cursor-pointer h-5 w-5"
                          onClick={() => setSelectedId(rowItem.id)}
                        />
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

export default StockOrderScheduleList;
