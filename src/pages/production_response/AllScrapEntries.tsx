import React, { useEffect, useState, ChangeEvent } from "react";
import edit from "../../assets/edit_icon.png";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import add from "../../assets/add.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  allScrapEntries,
  deleteScrapEntry,
} from "./https/productionResponseApi";
import { format } from "date-fns";

interface ScrapEntry {
  id: string;
  type: string;
  PartNumber?: {
    partNumber: string;
    supplier?: {
      companyName: string;
    };
  };
  scrapStatus: boolean;
  defectDesc: string;
  createdAt: string;
  createdByEmployee?: {
    firstName: string;
    lastName: string;
  };
  createdByAdmin?: {
    name: string;
  };
}

interface ScrapListResponse {
  data: ScrapEntry[];
  pagination?: {
    totalPages: number;
  };
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

const AllScrapEntries: React.FC = () => {
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [workData, setWorkData] = useState<ScrapEntry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState("all");

  const debouncedSearchVal = useDebounce(searchVal, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchWorkInstructionList = async (page = 1) => {
    try {
      const response = (await allScrapEntries(
        page,
        rowsPerPage,
        selectedValue,
        debouncedSearchVal,
      )) as ScrapListResponse;

      setWorkData(response.data || []);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch scrap entries:", error);
    }
  };

  useEffect(() => {
    fetchWorkInstructionList(currentPage);
  }, [currentPage, selectedValue, debouncedSearchVal]);

  const handleDelete = async (id: string | null) => {
    if (!id) return;
    try {
      await deleteScrapEntry(id);
      await fetchWorkInstructionList(currentPage);
    } catch (error: unknown) {
      console.error("Error deleting scrap entry:", error);
    }
  };

  const editWorkInstruction = (id: string, type: string) => {
    if (type === "part") {
      navigate(`/edit-part-scrap-entry/${id}`);
    } else {
      navigate(`/edit-product-scrap-entry/${id}`);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-5">
      <div className="flex justify-between">
        <h1 className="font-bold text-[20px] md:text-[24px] text-black mb-2">
          All Scrap Entries
        </h1>

        <div className="flex relative">
          <NavLink
            to="/scrap-entry"
            className="py-2 pl-10 pr-7 rounded-lg border-gray-100 bg-brand text-white flex items-center h-fit"
          >
            <img src={add} alt="" className="absolute left-4 w-4 h-4" />
            <span>New Scrap Entry</span>
          </NavLink>
        </div>
      </div>

      <div className="flex gap-2 items-center text-sm text-gray-500 mt-2">
        <NavLink to="/dashboardDetailes" className="hover:underline">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px]" />
        <span className="text-gray-400">Scrap Entries</span>
      </div>

      <div className="bg-white p-4 mt-6 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <select
            className="border w-full md:w-1/3 px-3 py-2 rounded-md outline-none"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="all">All Types</option>
            <option value="part">Parts</option>
            <option value="product">Products</option>
          </select>
          <input
            type="text"
            placeholder="Search by part number..."
            className="border w-full md:w-2/3 px-3 py-2 rounded-md outline-none"
            value={searchVal}
            onChange={handleChange}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="px-4 py-3">Part Number</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Scrapped</th>
                <th className="px-4 py-3">Defect</th>
                <th className="px-4 py-3">Submitted By</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {workData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    {item.PartNumber?.partNumber || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {item.PartNumber?.supplier?.companyName || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.scrapStatus ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                    >
                      {item.scrapStatus ? "YES" : "NO"}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {item.defectDesc || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {item.createdByEmployee
                      ? `${item.createdByEmployee.firstName} ${item.createdByEmployee.lastName}`
                      : item.createdByAdmin?.name || "System"}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "MM/dd/yyyy")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-right flex gap-3 justify-end items-center">
                    <button
                      onClick={() => editWorkInstruction(item.id, item.type)}
                    >
                      <img
                        src={edit}
                        alt="Edit"
                        className="w-5 h-5 opacity-70 hover:opacity-100"
                      />
                    </button>
                    <button onClick={() => setSelectedId(item.id)}>
                      <FaTrash className="text-red-400 hover:text-red-600 cursor-pointer" />
                    </button>

                    {selectedId === item.id && (
                      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
                          <h2 className="text-lg font-bold mb-2">
                            Confirm Delete
                          </h2>
                          <p className="mb-6 text-gray-600 text-sm">
                            Are you sure you want to delete this scrap entry?
                            This action is permanent.
                          </p>
                          <div className="flex justify-end space-x-3">
                            <button
                              className="px-4 py-2 text-gray-500"
                              onClick={() => setSelectedId(null)}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold"
                              onClick={() => {
                                handleDelete(selectedId);
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

        <div className="flex justify-between items-center py-4 px-4 bg-white border-t mt-4">
          <p className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-2 border rounded-md disabled:opacity-30"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 border rounded-md disabled:opacity-30"
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
