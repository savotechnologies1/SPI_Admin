import React, { useEffect, useState } from "react";
import edit from "../../assets/edit_icon.png";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import add from "../../assets/add.png";
import { Trash2 } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  allScrapEntries,
  deleteScrapEntry,
} from "./https/productionResponseApi";

const AllScrapEntries: React.FC = () => {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleEdit = (id: string) => {
    navigate(`/edit-work-instruction/${id}`);
  };
  const [workData, setWorkData] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("all");
  const debouncedSearchVal = useDebounce(searchVal, 500);
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }
  const handleChange = (e) => {
    try {
      setSearchVal(e.target.value);
    } catch (error) {
      throw error;
    }
  };

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchWorkInstructionList = async (
    page = 1,
    searchTerm = "",
    type = "",
  ) => {
    try {
      const response = await allScrapEntries(
        page,
        rowsPerPage,
        selectedValue,
        debouncedSearchVal,
      );
      setWorkData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch work instructions:", error);
    }
  };

  useEffect(() => {
    fetchWorkInstructionList(currentPage, selectedValue, debouncedSearchVal);
  }, [currentPage, selectedValue, debouncedSearchVal]);

  const handleDelete = async (id: string | null, type: string) => {
    if (!id) return;
    try {
      await deleteScrapEntry(id);
      await new Promise((r) => setTimeout(r, 500));
      await fetchWorkInstructionList(
        currentPage,
        selectedValue,
        debouncedSearchVal,
      );
    } catch (error: unknown) {
      console.error("Error deleting process:", error);
    }
  };

  const editWorkInstruction = (id, type) => {
    if (type === "part") {
      navigate(`/edit-part-scrap-entry/${id}`);
    } else {
      navigate(`/edit-product-scrap-entry/${id}`);
    }
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-5">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
          All Scrap Entries
        </h1>

        <div className="flex relative">
          <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/scrap-entry">
              <span className="">New Scrap Entry</span>
            </NavLink>
          </button>
          <div className="absolute top-3 left-2">
            <img src={add} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center text-sm text-gray-500">
        <NavLink to="/dashboardDetailes">Dashboard</NavLink>
        <FaCircle className="text-[6px]" />
        <span>scrap-entries</span>
      </div>

      <div className="bg-white p-4 mt-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <select
            id="work-instruction-filter"
            className="border w-full md:w-1/3 px-3 py-2 rounded-md"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="part">parts</option>
            <option value="product">products</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            className="border w-full md:w-2/3 px-3 py-2 rounded-md"
            value={searchVal}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Part Number</th>
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Submit By</th>
                <th className="px-4 py-3">Submit Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {workData.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{item?.PartNumber?.partNumber}</td>

                  <td className="px-4 py-3">
                    {item?.PartNumber.supplier.companyName} 
                  </td>
                  <td className="px-4 py-3">
                    {item.scrapStatus == true ? "yes" : "no"}
                  </td>
                  <td className="px-4 py-3">
                    {item.employeeDetails !== null
                      ? `${item?.employeeDetails.firstName} ${item?.employeeDetails.lastName}`
                      : `${
                          item?.createdByAdmin?.name
                            ? item?.createdByAdmin?.name
                            : "Not Available"
                        }`}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded text-xs font-semibold bg-gray-200 text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </td>

                  <td className="px-2 py-3 md:px-3 md:py-4 flex gap-2 md:gap-4">
                    <button
                      className="text-brand hover:underline"
                      onClick={() => editWorkInstruction(item.id, item.type)}
                    >
                      <img
                        src={edit}
                        alt="Edit"
                        className="w-4 h-4 md:w-5 md:h-5"
                      />
                    </button>
                    <FaTrash
                      className="text-red-500 cursor-pointer h-7"
                      onClick={() => setSelectedId(item.id)}
                    />

                    {selectedId === item.id && (
                      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                          <h2 className="text-lg font-semibold mb-4">
                            Are you sure?
                          </h2>
                          <p className="mb-4">
                            Do you really want to delete this scrap entry?
                          </p>
                          <div className="flex justify-end space-x-3">
                            <button
                              className="px-4 py-2 bg-gray-300 rounded"
                              onClick={() => setSelectedId(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded"
                              onClick={() => {
                                handleDelete(selectedId, item.type);
                                setSelectedId(null);
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
        </div>

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
  );
};

export default AllScrapEntries;
