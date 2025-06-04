import  { useState,  } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import search_2 from "../../assets/search_2.png";
import more from "../../assets/more.png";
import edit from "../../assets/edit_icon.png";
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import data from "../../components/Data/VacationListData";

const VacationList = () => {
  const navigate = useNavigate();
  const categorys = [
    { tab: "All ", text: "80" },
    { tab: "Active ", text: "18" },
    { tab: "Pending ", text: "22" },
    { tab: "Rejected ", text: "32" },
  ];
  const [activeTab, setActiveTab] = useState("All ");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const visibleRows = data.slice(startIndex, startIndex + rowsPerPage);

  const handleTabs = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="p-4 md:p-7">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
              Vacation List for approval
            </h1>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <p className="text-sm md:text-base text-black" onClick={() => ("dashboardDetailes")}>
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          <span className="text-sm md:text-base hover:cursor-pointer">Employee</span>
          <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          <span className="text-sm md:text-base hover:cursor-pointer">vacation list</span>
        </div>
        
        <div className="rounded-md mt-4">
          <div className="flex flex-col bg-white rounded-t">
            <div className="flex gap-2 md:gap-4 font-semibold px-2 items-center hover:cursor-pointer border-b overflow-x-auto whitespace-nowrap">
              {categorys.map((category) => (
                <div
                  key={category.tab}
                  className={`${
                    activeTab === category.tab
                      ? "border-b-2 border-brand px-1 md:px-2 py-2 md:py-3"
                      : "text-[#637381]"
                  }`}
                  onClick={() => handleTabs(category.tab)}
                >
                  <div className="flex gap-1 md:gap-2 items-center">
                    <p className="text-xs md:text-sm">{category.tab}</p>
                    <p
                      className={`px-1 md:px-2 py-1 rounded-lg text-xs md:text-sm font-medium ${
                        category.tab.trim() === "All"
                          ? "text-white bg-brand"
                          : category.tab.trim() === "Active"
                          ? "text-green-800 bg-green-100"
                          : category.tab.trim() === "Pending"
                          ? "text-[#B76E00] bg-[#FFAB0029]"
                          : category.tab.trim() === "Rejected"
                          ? "text-gray-800 bg-gray-100"
                          : "text-gray-800 bg-gray-100"
                      }`}
                    >
                      {category.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2 md:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
                <div className="flex flex-col w-full sm:w-auto">
                  <label htmlFor="role" className="text-xs md:text-sm font-medium text-gray-500">
                    Role
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full sm:w-40 md:w-52 rounded-md border-gray-300 text-xs md:text-sm"
                    defaultValue="Project Coordinator"
                  >
                    <option>Newly added</option>
                    <option>Developer</option>
                    <option>Designer</option>
                  </select>
                </div>

                <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm outline-none"
                  />
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img src={search_2} alt="" className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>

                <div className="hidden sm:block">
                  <img src={more} alt="" className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white">
              <thead>
                <tr className="bg-[#F4F6F8]">
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                    <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Name
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden sm:table-cell">
                    Start Date
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden md:table-cell">
                    End Date
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                    Hours
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium hidden xl:table-cell">
                    Notes
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Status
                  </th>
                  <th className="px-2 py-2 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dashed border-gray-200 cursor-pointer"
                    onClick={() => navigate(`/vacation-approval`)}
                  >
                    <td className="px-2 py-2">
                      <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-300 mr-2 md:mr-4 overflow-hidden">
                          <img src={item.avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-xs md:text-sm font-medium hidden sm:table-cell">
                      {item.start_date}
                    </td>
                    <td className="px-2 py-3 text-xs md:text-sm font-medium hidden md:table-cell">
                      {item.end_date}
                    </td>
                    <td className="px-2 py-3 text-xs md:text-sm font-medium hidden lg:table-cell">
                      {item.hours}
                    </td>
                    <td className="px-2 py-3 text-xs md:text-sm font-medium hidden xl:table-cell">
                      {item.notes}
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
                          item.status === "Active"
                            ? "text-green-800 bg-green-100"
                            : item.status === "Pending"
                            ? "text-[#B76E00] bg-yellow-100"
                            : item.status === "Rejected"
                            ? "text-[#637381] bg-gray-100"
                            : "text-gray-800 bg-gray-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-2 py-3 flex gap-2 md:gap-4">
                      <button className="text-brand hover:underline">
                        <img src={edit} alt="Edit" className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button className="text-brand hover:underline">
                        <img src={more} alt="More" className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2">
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
                  <img src={back} alt="" className="w-4 h-4 md:w-5 md:h-5" />
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
                  <img src={next} alt="" className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationList;