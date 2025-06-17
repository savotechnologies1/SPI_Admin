import { SetStateAction, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaTrash } from "react-icons/fa";
import search_2 from "../../assets/search_2.png";
import more from "../../assets/more.png";
import edit from "../../assets/edit_icon.png";
import add from "../../assets/add.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { customerList, deleteCustomer } from "./https/customersApi";
import delete_img from "../../assets/delete_1.png";
import { Trash2 } from "lucide-react";

interface CustomerItem {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  billingTerms: string;
  createdAt: string;
}

const CustomerList = () => {
  const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const rowsPerPage = 5;

  const navigate = useNavigate();
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSearchVal(e.target.value);
  };

  const fetchCustomerList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await customerList(page, rowsPerPage, searchVal);
      setCustomerData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteCustomer(id);
      if (response?.status == 200) {
         fetchCustomerList(currentPage);
      }
    } catch (error: unknown) {
      console.log("errorerror", error);
    }
  };

  useEffect(() => {
    fetchCustomerList(currentPage);
  }, [currentPage, searchVal]);

  const editCustomer = (id: string) => {
    navigate(`/edit-customer/${id}`);
  };

  console.log("searchValsearchValsearchVal", searchVal);
  return (
    <div className="p-4 md:p-7">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-black">
              Customers
            </h1>
          </div>

          <div className="flex relative">
            <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/new-customer">
                <span className="">New Customer</span>
              </NavLink>
            </button>
            <div className="absolute top-3 left-2">
              <img src={add} alt="" className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <p
            className={`text-sm md:text-base text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base hover:cursor-pointer">
            CustomerList
          </span>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base hover:cursor-pointer">
            List
          </span>
        </div>

        <div className="rounded-md mt-4">
          <div className="flex flex-col bg-white rounded-t">
            <div className="p-2 md:p-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4 p-2 md:p-4">
                {/* <div className="flex flex-col w-full sm:w-auto">
                  <label
                    htmlFor="role"
                    className="text-xs md:text-sm font-medium text-gray-500"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full sm:w-40 md:w-52 rounded-md border-gray-300 text-sm md:text-base"
                    defaultValue="Project Coordinator"
                  >
                    <option>Newly added</option>
                    <option>Developer</option>
                    <option>Designer</option>
                  </select>
                </div> */}

                <div className="flex-1 w-full relative border p-2 md:p-3 rounded-md">
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                    className="w-full rounded-md border-gray-300 pl-6 text-xs md:text-sm lg:text-base outline-none"
                  />
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <img
                      src={search_2}
                      alt=""
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
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
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    <input type="checkbox" className="w-3 h-3 md:w-4 md:h-4" />
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Name
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden sm:table-cell">
                    Address
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden md:table-cell">
                    Billing Terms
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium hidden lg:table-cell">
                    Submitted By
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium">
                    Submit Date
                  </th>
                  <th className="px-2 py-2 md:px-3 md:py-3 text-left text-gray-400 text-xs md:text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-dashed border-gray-200"
                  >
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        className="w-3 h-3 md:w-4 md:h-4"
                      />
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gray-300 mr-2 md:mr-4 overflow-hidden">
                          {/* <img
                            src={item.avatar}
                            alt=""
                            className="w-full h-full object-cover"
                          /> */}

                          <FaCircle />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm lg:text-base font-medium">
                            {item.firstName} {item.lastName}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-[100px] md:max-w-none">
                            {item.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden sm:table-cell">
                      {item.address}
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden md:table-cell">
                      {item.billingTerms} Days
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden md:table-cell">
                      Admin
                    </td>
                    <td className="px-2 py-3 md:px-3 md:py-4 text-xs md:text-sm lg:text-base font-medium hidden lg:table-cell">
                      <span
                        className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-mediumtext-green-800 bg-green-100`}
                      >
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* <td className="px-2 py-3 md:px-3 md:py-4">
                      <span
                        className={`px-2 py-1 md:px-3 rounded-full text-xs md:text-sm font-medium ${
                          item.status === "Active"
                            ? "text-green-800 bg-green-100"
                            : item.status === "Pending"
                            ? "text-[#B76E00] bg-yellow-100"
                            : item.status === "Banned"
                            ? "text-[#B71D18] bg-[#FF563029]"
                            : item.status === "Rejected"
                            ? "text-[#637381] bg-gray-100"
                            : "text-gray-800 bg-gray-100"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td> */}
                    <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
                      <button
                        className="text-brand hover:underline"
                        onClick={() => editCustomer(item.id)}
                      >
                        <img
                          src={edit}
                          alt="Edit"
                          className="w-4 h-4 md:w-5 md:h-5"
                        />
                      </button>
                      <FaTrash
                        className="text-red-500 cursor-pointer h-7"
                        onClick={() => setShowConfirm(true)}
                      />
                      {showConfirm && (
                        <div
                          className="fixed inset-0 bg-opacity-50 backdrop-blur-sm
                                    flex items-center justify-center z-50"
                        >
                          <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">
                              Are you sure?
                            </h2>
                            <p className="mb-4">
                              Do you really want to delete this customer?
                            </p>
                            <div className="flex justify-end space-x-3">
                              <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setShowConfirm(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={() => {
                                  handleDelete(item.id);
                                  setShowConfirm(false);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

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
      </div>

      {/* Modal */}
    </div>
  );
};

export default CustomerList;
