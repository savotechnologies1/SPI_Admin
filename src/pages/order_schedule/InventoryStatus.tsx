import { useState } from "react";
import { FaCircle} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import more from "../../assets/more.png";
import edit from "../../assets/edit.png";

const InventoryStatus = () => {
  const data = [
    {
      id: 1,
      partNumber: "10001",
      desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
      qty: 2560,
      stock: 2001,
      cost: 14.92,
    },
    {
      id: 2,
      partNumber: "10002",
      desc: "18'x72' Polycarbonate, clear smooth",
      qty: 1280,
      stock: 950,
      cost: 9.45,
    },
    {
      id: 3,
      partNumber: "10003",
      desc: "30'x60' Acrylic, frosted matte",
      qty: 3200,
      stock: 2400,
      cost: 19.55,
    },
    {
      id: 4,
      partNumber: "10004",
      desc: "20'x48' Polyethylene, white smooth",
      qty: 1500,
      stock: 1200,
      cost: 8.75,
    },
    {
      id: 3,
      partNumber: "10003",
      desc: "30'x60' Acrylic, frosted matte",
      qty: 3200,
      stock: 2400,
      cost: 19.55,
    },
    {
      id: 4,
      partNumber: "10004",
      desc: "20'x48' Polyethylene, white smooth",
      qty: 1500,
      stock: 1200,
      cost: 8.75,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentRows = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
          Inventory status
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
            daily schedule & capacity
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            Inventory status
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white  p-4 mt-6">
        <div className="flex flex-col md:flex-row justify- gap-4 items-end">
          <div className="w-full ">
            <label className="block text-sm font-semibold">Part Family</label>
            <select className="border w-full px-3 py-2 rounded-md">
              <option>Cut trim</option>
              <option>Sending</option>
            </select>
          </div>

          {/* <div className="flex items-center w-full">
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
          </div> */}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white overflow-x-auto  ">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
              <th className="py-2 px-4 text-left ">Part Number</th>
              <th className="py-2 px-4 text-left ">Part Description</th>
              <th className="py-2 px-4 text-left ">Qty Avail</th>
              <th className="py-2 px-4 text-left ">Safety Stock</th>
              <th className="py-2 px-4 text-left ">Current Cost</th>
              <th className="py-2 px-4 text-left "></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
                  {row.partNumber}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
                  {row.desc}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">{row.qty}</td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  {row.stock}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  ${row.cost.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm  flex space-x-3 items-center">
                  <img src={edit} alt="" />
                  <img src={more} alt="" />
                </td>
              </tr>
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

export default InventoryStatus;
