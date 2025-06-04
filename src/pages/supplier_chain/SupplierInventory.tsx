import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import more from "../../assets/more.png";
import { FiEdit2 } from "react-icons/fi"; 
import { BsThreeDotsVertical } from "react-icons/bs";

const SupplierInventory = () => {
  const [data, setData] = useState([
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

  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({
    qty: "",
    stock: "",
    cost: "",
  });

  // Handle Edit Click
  const handleEditClick = (index:any) => {
    setEditingRow(index);
    setEditedData({
      qty: data[index].qty.toString(),
      stock: data[index].stock.toString(),
      cost: data[index].cost.toString(),
    });
  };

  // Handle Change in Input Fields
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  // Save the Updated Data
  const handleUpdate = (index:any) => {
    const updatedData = [...data];
    updatedData[index] = {
      ...updatedData[index],
      qty: Number(editedData.qty),
      stock: Number(editedData.stock),
      cost: Number(editedData.cost),
    };
    setData(updatedData);
    setEditingRow(null);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const totalPages = Math.ceil(data.length / rowsPerPage);


  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-4"></div>
      <div>
        {" "}
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Supplier part list and inventory list
        </h1>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            Supplier information
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            Supplier part list and inventory list
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white  p-4 mt-6">
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
          <div className="flex items-center">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search..."
                className="border w-full px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <img src={more} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white overflow-x-auto   ">
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
            {data.map((item, index) => (
              <React.Fragment key={item.id}>
                <tr className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3">{item.partNumber}</td>
                  <td className="p-3 whitespace-nowrap">{item.desc}</td>
                  <td className="p-3">{item.supplier}</td>
                  <td className="p-3">{item.qty}</td>
                  <td className="p-3">{item.stock}</td>
                  <td className="p-3">{item.cost}</td>
                  <td className="p-3 flex items-center gap-4">
                    {/* Edit Icon */}
                    <FiEdit2
                      onClick={() => handleEditClick(index)}
                      className="text-black  cursor-pointer text-lg"
                      title="Quick Edit"
                    />
                    {/* More Icon */}
                    <BsThreeDotsVertical
                      className="text-black hover:text-black cursor-pointer text-lg"
                      title="More Options"
                    />
                  </td>
                </tr>

                {/* Editable Row */}
                {editingRow === index && (
                  <tr className="bg-gray-50 ">
                    <td colSpan={3} className="p-3 font-semibold text-gray-600">
                      {item.desc}
                    </td>
                    <td className="p-3">
                      <div>
                        <label className="font-semibold text-xs">
                          Quantity Available{" "}
                        </label>

                        <input
                          type="number"
                          name="qty"
                          value={editedData.qty}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md w-full"
                          placeholder="Quantity"
                        />
                      </div>
                    </td>
                    <div>
                      <td className="p-3">
                        <label className="font-semibold text-xs">
                          Safety Stock{" "}
                        </label>
                        <input
                          type="number"
                          name="stock"
                          value={editedData.stock}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md w-full"
                          placeholder="Stock"
                        />
                      </td>
                    </div>
                    <td className="p-3">
                      <div>
                        <label className="font-semibold text-xs">
                          Current Stock{" "}
                        </label>
                        <input
                          type="number"
                          name="cost"
                          value={editedData.cost}
                          onChange={handleChange}
                          className="border px-3 py-2 rounded-md w-full"
                          placeholder="Cost"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => handleUpdate(index)}
                        className="bg-brand text-white px-3 py-1 rounded-md  transition"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 p-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-2 py-2 rounded-md ${
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

export default SupplierInventory;
