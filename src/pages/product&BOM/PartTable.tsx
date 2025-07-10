import { useContext, useEffect, useState } from "react";
import { PartContext } from "../../components/Context/PartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaTrash } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import add from "../../assets/add.png";
import { bomList, deletePartNumber } from "./https/partProductApis";

export default function PartTable() {
  const partContext = useContext(PartContext);

  if (!partContext) {
    throw new Error(
      "PartContext is undefined. Ensure it is properly provided."
    );
  }
  const navigate = useNavigate();

  const { parts } = partContext;

  const handleClick = (id, type) => {
    if (type === "part") {
      console.log("333");

      navigate(`/edit-part/${id}`);
    } else {
      console.log("3243");

      navigate(`/edit-product/${id}`);
    }
  };
  const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const rowsPerPage = 25;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const fetchCustomerList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await bomList(page, rowsPerPage, searchVal);
      setCustomerData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchCustomerList(currentPage);
  }, [currentPage, searchVal]);
  const handleDelete = async (id: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      deletePartNumber(id).then();
      await fetchCustomerList(currentPage);
    } catch (error: unknown) {
      throw error;
    }
  };
  return (
    <div className="p-4">
      <div className="flex justify-between mt-8">
        {" "}
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Browse BOM
        </h1>
        <div className="flex relative">
          <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/partform">
              <span className="">New Part Number</span>
            </NavLink>
          </button>
          <div className="absolute top-3 left-2">
            <img src={add} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            product and Bom
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer"> Browse bom</span>
        </div>
      </div>
      <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        {/* <div className="flex justify-between gap-4 items-center mb-6">
          <div className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <BsThreeDotsVertical
              className="text-black hover:text-black cursor-pointer text-lg"
              title="More Options"
            />
          </div>
        </div> */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse  border-gray-300">
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
                  Availble stock
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  order qty.
                </th>
                <th className="border p-2 font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {customerData.map((part, index) => (
                <tr key={index} className="hover:bg-gray-100 text-center">
                  <td className="border-b border-dashed p-2">
                    {part.partNumber}
                  </td>
                  <td className="border-b border-dashed p-2">
                    {part.partFamily}
                  </td>
                  <td className="border-b border-dashed p-2">
                    {part.partDescription}
                  </td>
                  <td className="border-b border-dashed p-2">${part.cost}</td>
                  <td className="border-b border-dashed p-2">
                    {part.leadTime} Days
                  </td>
                  <td className="border-b border-dashed p-2">
                    {part.availStock}
                  </td>
                  <td className="border-b border-dashed p-2">
                    {part.supplierOrderQty}
                  </td>
                  <td className="flex items-center gap-4 border-b border-dashed p-2">
                    {/* Edit Icon */}
                    <FiEdit2
                      className="text-black  cursor-pointer text-lg"
                      title="Quick Edit"
                      onClick={() => handleClick(part.part_id, part.type)}
                    />
                    <button className="text-brand hover:underline">
                      <FaTrash
                        className="text-red-500 cursor-pointer"
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
                              Do you really want to delete this part ?
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
                                  handleDelete(part.part_id);
                                  setShowConfirm(false);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
