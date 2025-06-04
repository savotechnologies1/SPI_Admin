import React, { useState, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import more from "../../assets/more.png"; // Adjust import path accordingly

type SupplierPart = {
  id: number;
  partNumber: string;
  desc: string;
  supplier: string;
  qty: number;
  stock: number;
  cost: number;
};

type EditedData = {
  qty: string;
  stock: string;
  cost: string;
};

const SupplierPartList: React.FC = () => {
  const [data, setData] = useState<SupplierPart[]>([
    {
      id: 1,
      partNumber: "10001",
      desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
      supplier: "Devon Lane",
      qty: 2560,
      stock: 2001,
      cost: 14.92,
    },
    {
      id: 2,
      partNumber: "10001",
      desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
      supplier: "Darrell Steward",
      qty: 2560,
      stock: 2001,
      cost: 14.92,
    },
    {
      id: 3,
      partNumber: "10001",
      desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
      supplier: "Robert Fox",
      qty: 2560,
      stock: 2001,
      cost: 14.92,
    },
    {
      id: 4,
      partNumber: "10001",
      desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
      supplier: "Marvin McKin",
      qty: 2560,
      stock: 2001,
      cost: 14.92,
    },
  ]);

  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<EditedData>({
    qty: "",
    stock: "",
    cost: "",
  });

  const handleEditClick = (index: number) => {
    const row = data[index];
    setEditingRow(index);
    setEditedData({
      qty: row.qty.toString(),
      stock: row.stock.toString(),
      cost: row.cost.toString(),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (index: number) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      qty: parseFloat(editedData.qty),
      stock: parseFloat(editedData.stock),
      cost: parseFloat(editedData.cost),
    };
    setData(updatedData);
    setEditingRow(null);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4" />
      <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
        Suppliers
      </h1>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[14px] text-black">
            <NavLink to="/dashboardDetailes">Dashboard</NavLink>
          </p>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-[14px] cursor-pointer">Suppliers</span>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-[14px] cursor-pointer">List</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 mt-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-end">
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium">Suppliers Name</label>
            <input
              type="text"
              placeholder="Enter Supplier Name"
              className="border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium">Process</label>
            <select className="border w-full px-3 py-2 rounded-md">
              <option>Project Coordinator</option>
              <option>Production Manager</option>
            </select>
          </div>
          <div className="flex items-center w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-2 rounded-md w-full"
            />
            <img src={more} alt="more" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white overflow-x-auto mt-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-sm whitespace-nowrap">
              <th className="text-left p-3">Part Number</th>
              <th className="text-left p-3">Part Desc</th>
              <th className="text-left p-3">Supplier Name</th>
              <th className="text-left p-3">Qty Avail</th>
              <th className="text-left p-3">Safety Stock</th>
              <th className="text-left p-3">Current Cost</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const actualIndex = (currentPage - 1) * rowsPerPage + index;
              return (
                <React.Fragment key={item.id}>
                  <tr className="border-b hover:bg-gray-50 text-sm">
                    <td className="p-3">{item.partNumber}</td>
                    <td className="p-3">{item.desc}</td>
                    <td className="p-3">{item.supplier}</td>
                    <td className="p-3">{item.qty}</td>
                    <td className="p-3">{item.stock}</td>
                    <td className="p-3">{item.cost}</td>
                    <td className="p-3 flex items-center gap-4">
                      <FiEdit2
                        onClick={() => handleEditClick(actualIndex)}
                        className="text-black cursor-pointer text-lg"
                        title="Quick Edit"
                      />
                      <BsThreeDotsVertical
                        className="text-black cursor-pointer text-lg"
                        title="More Options"
                      />
                    </td>
                  </tr>

                  {editingRow === actualIndex && (
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="p-3 font-semibold text-gray-600">
                        {item.desc}
                      </td>
                      <td className="p-3">
                        <label className="text-xs font-semibold">Qty Avail</label>
                        <input
                          type="number"
                          name="qty"
                          value={editedData.qty}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="p-3">
                        <label className="text-xs font-semibold">Safety Stock</label>
                        <input
                          type="number"
                          name="stock"
                          value={editedData.stock}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="p-3">
                        <label className="text-xs font-semibold">Current Cost</label>
                        <input
                          type="number"
                          name="cost"
                          value={editedData.cost}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md w-full"
                        />
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleUpdate(actualIndex)}
                          className="bg-brand text-white px-3 py-1 rounded-md"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 p-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages ? "bg-gray-300" : "bg-brand text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierPartList;
