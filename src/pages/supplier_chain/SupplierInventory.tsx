import React, { useState, useEffect, ChangeEvent } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaTrash, FaSpinner, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
interface InventoryItem {
  id: string;
  partNumber: string;
  partDescription: string;
  qtyAvail: number;
  safetyStock: number;
  currentCost: number;
  type: string;
}

interface OrderDetails {
  quantity: string;
  needDate: string;
}

interface ApiResponse {
  data: {
    part_id: string;
    partNumber?: string;
    partDescription?: string;
    availStock?: number;
    minStock?: number;
    cost?: number;
    type?: string;
  }[];
  pagination: {
    totalPages: number;
    currentPage: number;
  };
}

const SupplierInventory: React.FC = () => {
  const [data, setData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailLoading, setEmailLoading] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<InventoryItem | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    quantity: "",
    needDate: "",
  });

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("newest");

  const rowsPerPage = 5;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get<ApiResponse>(`/supplier-inventory`, {
        params: { page, pageSize: rowsPerPage, search, sort },
      });

      const mappedData: InventoryItem[] = res.data.data.map((item) => ({
        id: item.part_id,
        partNumber: item.partNumber || "",
        partDescription: item.partDescription || "-",
        qtyAvail: item.availStock ?? 0,
        safetyStock: item.minStock ?? 0,
        currentCost: item.cost || 0,
        type: item.type || "-",
      }));

      setData(mappedData);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, search, sort]);

  const handleOpenOrderModal = (item: InventoryItem) => {
    setSelectedPart(item);
    setShowOrderModal(true);
  };

  const handleSendOrderEmail = async () => {
    if (!selectedPart) return;
    if (!orderDetails.quantity || !orderDetails.needDate) {
      return toast.error("Please fill quantity and date");
    }

    setEmailLoading(true);
    try {
      const response = await axiosInstance.post(`/send-order-to-supplier`, {
        part_id: selectedPart.id,
        quantity: orderDetails.quantity,
        need_date: orderDetails.needDate,
      });

      toast.success(response.data.message || "Order sent successfully!");
      setShowOrderModal(false);
      setOrderDetails({ quantity: "", needDate: "" });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error("Email Error:", axiosError);
      toast.error(axiosError.response?.data?.message || "Failed to send email");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDeleteId) return;
    setLoading(true);
    try {
      await axiosInstance.delete(`/parts/${selectedDeleteId}`);
      setShowConfirm(false);
      setSelectedDeleteId(null);
      fetchData(currentPage);
      toast.success("Part deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen mt-5 relative">
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-50">
          <FaSpinner className="animate-spin text-4xl text-blue-600" />
        </div>
      )}

      <h1 className="font-bold text-xl md:text-2xl text-black">
        Supplier Inventory
      </h1>

      <div className="bg-white p-4 mt-6 rounded-lg shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <input
          type="text"
          placeholder="Search by part..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-md w-full md:w-1/2 outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={sort}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded-md w-full md:w-1/3 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="bg-white overflow-x-auto mt-4 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm text-gray-600 uppercase font-bold">
              <th className="text-left p-3 border-b">Part Number</th>
              <th className="text-left p-3 border-b">Qty Avail</th>
              <th className="text-left p-3 border-b">Safety Stock</th>
              <th className="text-left p-3 border-b">Cost</th>
              <th className="text-center p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3 font-medium">{item.partNumber}</td>
                  <td className="p-3">
                    <span
                      className={`${item.qtyAvail < item.safetyStock ? "text-red-600" : "text-green-600"} font-bold`}
                    >
                      {item.qtyAvail}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{item.safetyStock}</td>
                  <td className="p-3 font-semibold">${item.currentCost}</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-4">
                      <FaEnvelope
                        title="Send Order Email"
                        className="text-blue-600 cursor-pointer hover:scale-125 transition-transform"
                        onClick={() => handleOpenOrderModal(item)}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer hover:scale-125 transition-transform"
                        onClick={() => {
                          setSelectedDeleteId(item.id);
                          setShowConfirm(true);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-10 text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showOrderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Send Order Request</h2>
            <p className="text-sm text-gray-600 mb-4">
              Part: <strong>{selectedPart?.partNumber}</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full border p-2 rounded outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter quantity"
                  value={orderDetails.quantity}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setOrderDetails({
                      ...orderDetails,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Need Date
                </label>
                <input
                  type="date"
                  className="w-full border p-2 rounded outline-none"
                  value={orderDetails.needDate}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setOrderDetails({
                      ...orderDetails,
                      needDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                onClick={() => setShowOrderModal(false)}
                disabled={emailLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center disabled:bg-blue-300"
                onClick={handleSendOrderEmail}
                disabled={emailLoading}
              >
                {emailLoading ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  "Send Order"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-2">Confirm Delete</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Are you sure you want to delete this part? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierInventory;
