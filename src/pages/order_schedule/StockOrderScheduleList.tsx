import React, { useEffect, useState, useCallback } from "react";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import add from "../../assets/add.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  deleteScheduleOrder,
  scheduleStockOrderListApi,
} from "./https/schedulingApis";

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const StockOrderScheduleList: React.FC = () => {
  const [workData, setWorkData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 10;
  const debouncedSearchVal = useDebounce(searchVal, 500);

  const fetchScheduleList = async (page = 1, type = "all", searchTerm = "") => {
    setIsLoading(true);
    try {
      const response: any = await scheduleStockOrderListApi(
        page,
        rowsPerPage,
        type,
        searchTerm,
      );
      if (Array.isArray(response)) {
        setWorkData([]);
      } else {
        setWorkData(response.data.data || []);
        setTotalPages(response.data.pagination?.totalPages || 1);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch schedule list:", error);
    }
  };

  useEffect(() => {
    fetchScheduleList(currentPage, selectedType, debouncedSearchVal);
  }, [currentPage, selectedType, debouncedSearchVal]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value);
    setCurrentPage(1);
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
      await deleteScheduleOrder(id, orderId as any);
      fetchScheduleList(currentPage, selectedType, debouncedSearchVal);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    try {
      return new Intl.DateTimeFormat("en-US").format(new Date(dateString));
    } catch (error) {
      return "Invalid Date";
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-5">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
          All Schedule Orders
        </h1>

        <div className="flex relative">
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
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">Product Name/No.</th>
                <th className="px-4 py-3">Part Number</th>
                <th className="px-4 py-3">Process</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Delivery Date</th>
                <th className="px-4 py-3">Completed By</th>
                <th className="px-4 py-3">Employee Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="text-center py-10">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-6 h-6 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : workData.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="text-center py-10 text-gray-500 font-medium"
                  >
                    No Schedule Orders Found.
                  </td>
                </tr>
              ) : (
                workData.map((rowItem) => (
                  <tr key={rowItem.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {rowItem.order?.orderNumber || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {rowItem.order_type === "Stock Order"
                        ? rowItem.order?.productNumber || "N/A"
                        : rowItem.order?.product?.partNumber ||
                          rowItem.order?.productNumber}
                    </td>
                    <td className="px-4 py-3">
                      {rowItem.partDetails?.partNumber || "N/A"}
                    </td>
                    <td className="px-4 py-3">
  {rowItem.partDetails?.processName || "N/A"} 
  {" "}
  <span className="text-gray-400 text-xs">
    ({rowItem.partDetails?.machineName || "N/A"})
  </span>
</td>
                    <td className="px-4 py-3">
                      {formatDate(rowItem.order_date)}
                    </td>
                    <td className="px-4 py-3">
                      {formatDate(rowItem.delivery_date)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {rowItem.status === "completed" ? (
                        <span className="font-medium">
                          {!rowItem.completedByEmployee
                            ? "Admin"
                            : `${rowItem?.completedByEmployee?.firstName} ${rowItem?.completedByEmployee?.lastName}`}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Pending</span>
                      )}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-700">
                      {rowItem.completedByEmployee ? (
                        <div className="flex flex-col">
                          <span>{`${rowItem.completedByEmployee.firstName} ${rowItem.completedByEmployee.lastName || ""}`}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic text-xs">
                          No Station Worker
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          rowItem.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {rowItem.status || "new"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <FaTrash
                        className="text-red-500 cursor-pointer hover:text-red-700 h-5 w-5"
                        onClick={() =>
                          handleDelete(rowItem.id, rowItem.order_id)
                        }
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
