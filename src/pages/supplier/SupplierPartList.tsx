import  { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import ItemSelector from "./ItemSelector";
import more from "../../assets/more.png";
import edit from "../../assets/edit.png";
import avatar from "../../assets/Avatar.png";

const SupplierPartList = () => {
  const data = [
    {
      id: 1,
      name: "Jayvion Simon",
      email: "nannie.abernathy70@yahoo.com",
      status: "Active",
      statusColor: "green",
      avatar: avatar,
      billing: "CEO",
      submitted_by: "Flores, Juanita",
      Address: "775 Rolling Green Rd.s",
      date: "18/09/2016",
    },
    {
      id: 2,
      name: "Lucian Obrien",
      email: "ashlynn.ohara62@gmail.com",
      status: "Pending",
      statusColor: "yellow",
      avatar: avatar,
      billing: "CEO",
      submitted_by: "Flores, Juanita",
      Address: "775 Rolling Green Rd.s",
      date: "18/09/2016",
    },
    {
      id: 3,
      name: "Deja Brady",
      email: "milo.farrell@hotmail.com",
      status: "Active",
      statusColor: "green",
      avatar: avatar,
      billing: "Project Coordinator",
      submitted_by: "Flores, Juanita",
      Address: "775 Rolling Green Rd.s",
      date: "18/09/2016",
    },
    {
      id: 4,
      name: "Reece Chung",
      email: "letha.lubowitz24@yahoo.com",
      status: "Banned",
      statusColor: "red",
      avatar: avatar,
      billing: "Project Coordinator",
      submitted_by: "Flores, Juanita",
      Address: "775 Rolling Green Rd.s",
      date: "18/09/2016",
    },
    {
      id: 3,
      name: "Deja Brady",
      email: "milo.farrell@hotmail.com",
      status: "Active",
      statusColor: "green",
      avatar: avatar,
      billing: "Project Coordinator",
      submitted_by: "Flores, Juanita",
      Address: "775 Rolling Green Rd.s",
      date: "18/09/2016",
    },
    {
      id: 4,
      name: "Reece Chung",
      email: "letha.lubowitz24@yahoo.com",
      status: "Banned",
      statusColor: "red",
      avatar: avatar,
      billing: "Project Coordinator",
      submitted_by: "Flores, Juanita",
      Address: "775 Rolling Green Rd.s",
      date: "18/09/2016",
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
        <div className="flex flex-col md:flex-row justify-between gap-4 md:items-end">
          <div className="md:w-1/2">
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
      <div className="bg-white overflow-x-auto  ">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
              <th className="py-2 px-4 text-left ">
                <input type="checkbox" />
              </th>
              <th className="py-2 px-4 text-left ">Name & Email</th>
              <th className="py-2 px-4 text-left ">Address</th>
              <th className="py-2 px-4 text-left "> Billing Terms</th>
              <th className="py-2 px-4 text-left ">Submitted By </th>
              <th className="py-2 px-4 text-left ">Submit Date </th>
              <th className="py-2 px-4 text-left "></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 whitespace-nowrap">
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  <input type="checkbox"></input>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-300 mr-4">
                      <img src={row.avatar} alt="" />
                    </div>
                    <div>
                      <p className="text-sm sm:text-base font-medium text-[#052C89]">
                        {row.name}
                      </p>
                      <p className="text-sm text-gray-400">{row.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  {row.Address}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  {row.billing}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  {row.submitted_by}
                </td>
                <td className="py-3 px-4 text-[#061D22] text-sm">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      row.status === "Active"
                        ? "text-green-800 bg-green-100"
                        : row.status === "Pending"
                        ? "text-[#B76E00] bg-yellow-100"
                        : row.status === "Banned"
                        ? "text-[#B71D18] bg-[#FF563029]"
                        : row.status === "Rejected"
                        ? "text-[#637381] bg-gray-100"
                        : "text-gray-800 bg-gray-100"
                    }`}
                  >
                    {row.date}
                  </span>
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
              currentPage === totalPages
                ? "bg-gray-300"
                : "bg-brand text-white"
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
