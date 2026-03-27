import { useCallback, useState } from "react";
import { FaCheck, FaCircle, FaEdit, FaSearch, FaTimes } from "react-icons/fa";
import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
        setLoading(false);
        throw error;
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

  const handleEditClick = (row: any) => {
    setEditRowId(row.partNumber);
    setEditFormData({ ...row });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleSave = async () => {
    try {
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
  const currentRows = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen mt-5">
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
                <td className="py-3 px-4 text-center">
                  {editRowId === row.partNumber ? (
                    <input
                      type="number"
                      name="qtyAvailable"
                      value={editFormData.qtyAvailable}
                      onChange={handleInputChange}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
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
      </div>
    </div>
  );
};

export default InventoryStatus;
