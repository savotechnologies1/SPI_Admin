import { useContext, useEffect, useState } from "react";
import { PartContext } from "../../components/Context/PartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaSpinner, FaTrash } from "react-icons/fa";
import edit from "../../assets/edit_icon.png";
import add from "../../assets/add.png";
import { bomList, deletePartNumber } from "./https/partProductApis";
import { toast } from "react-toastify";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PartData {
  part_id: string;
  partNumber: string;
  partFamily: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty: number;
  minStock: number;
  availStock: number;
  type: string;
}

export default function PartTable() {
  const partContext = useContext(PartContext);
  if (!partContext) {
    throw new Error(
      "PartContext is undefined. Ensure it is properly provided.",
    );
  }
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState<PartData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const rowsPerPage = 10;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const fetchCustomerList = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await bomList(
        page,
        rowsPerPage,
        searchVal,
        selectedValue,
      );
      setCustomerData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const response = (await deletePartNumber(id)) as {
        status: number;
        data: { message: string };
      };

      if (response && response.status === 200) {
        toast.success(response.data.message);
        await new Promise((r) => setTimeout(r, 500));
        await fetchCustomerList(currentPage);
      }
    } catch (error: unknown) {
      toast.error("Failed to delete part. Please try again.");
    }
  };

  useEffect(() => {
    fetchCustomerList(currentPage);
  }, [currentPage, searchVal, selectedValue]);

  const handleClick = (id: string, type: string) => {
    if (type === "part") {
      navigate(`/edit-part/${id}`);
    } else {
      navigate(`/edit-product/${id}`);
    }
  };

  return (
    <div className="p-4 mt-5">
      <div className="flex justify-between mt-8">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Browse BOM
        </h1>
        <div className="relative">
          <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/partform">
              <span>New Part Number</span>
            </NavLink>
          </button>
          <div className="absolute top-3 left-2">
            <img src={add} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <NavLink to="/dashboardDetailes" className="text-[14px] text-black">
            Dashboard
          </NavLink>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            Product and BOM
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">Browse BOM</span>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by part number..."
            className="border w-full md:w-3/3 px-3 py-2 rounded-md"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
      </div>
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-300">
            <thead className="bg-gray-200">
              <tr className="whitespace-nowrap">
                <th className="border p-2 font-semibold text-gray-600">
                  Part Number
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Part Family
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Part Description
                </th>
                <th className="border p-2 font-semibold text-gray-600">Cost</th>
                <th className="border p-2 font-semibold text-gray-600">
                  LeadTimeDays
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Order Qty.
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Minimum Qty
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Available Qty
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="p-10 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <FaSpinner className="animate-spin text-brand text-2xl" />
                      <span className="text-gray-500 font-medium">
                        Loading parts...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : customerData.length > 0 ? (
                customerData.map((part) => (
                  <tr
                    key={part.part_id}
                    className="hover:bg-gray-100 text-center break-words"
                  >
                    <td className="border-b border-dashed p-2 max-w-[120px] truncate">
                      {part.partNumber}
                    </td>

                    <td className="border-b border-dashed p-2 max-w-[150px] truncate">
                      {part.partFamily}
                    </td>

                    <td className="border-b border-dashed p-2 max-w-[200px] break-words">
                      {part.partDescription || "—"}
                    </td>

                    <td className="border-b border-dashed p-2">${part.cost}</td>

                    <td className="border-b border-dashed p-2">
                      {part.leadTime
                        ? `${part.leadTime} ${part.leadTime > 1 ? "days" : "day"}`
                        : "Not Available"}
                    </td>

                    <td className="border-b border-dashed p-2">
                      {part.supplierOrderQty}
                    </td>

                    <td className="border-b border-dashed p-2">
                      {part.minStock}
                    </td>

                    <td className="border-b border-dashed p-2">
                      {part.availStock}
                    </td>

                    <td className="border-b border-dashed p-2 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <img
                          src={edit}
                          alt="Edit"
                          onClick={() => handleClick(part.part_id, part.type)}
                          className="w-5 h-5 cursor-pointer"
                        />
                        <FaTrash
                          className="text-red-500 w-5 h-5 cursor-pointer"
                          onClick={() => setDeleteTargetId(part.part_id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="p-10 text-center text-gray-500  font-medium"
                  >
                    No parts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteTargetId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this part?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteTargetId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={async () => {
                  await handleDelete(deleteTargetId);
                  setDeleteTargetId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

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
            <MdKeyboardArrowLeft />
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
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
