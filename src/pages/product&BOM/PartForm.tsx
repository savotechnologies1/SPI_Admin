import { useContext, useEffect, useState } from "react";
import { FaCircle, FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  createPartNumber,
  deletePartNumber,
  getProcessDetail,
  partNumberList,
  selectProcess,
} from "./https/partProductApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";

interface FormDataType {
  partFamily: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty: number;
  companyName: string;
  minStock: number;
  availStock: number;
  cycleTime: string;
  processOrderRequired: string;
  instructionRequired: string;
  processId: string;
  processDesc: string;
  image: File[] | null;
}

interface ProcessItem {
  id: string;
  name: string;
  partFamily: string;
  machineName?: string;
}

interface PartItem {
  part_id: string;
  process: {
    processName: string;
  };
  partNumber: string;
  partFamily: string;
  cost: number;
  cycleTime: number | string;
}

interface Supplier {
  id: string;
  companyName: string;
}

const PartForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>({
    defaultValues: {
      supplierOrderQty: 0,
      availStock: 0,
      minStock: 0,
      image: [],
    },
  });

  const context = useContext(PartContext);
  const navigate = useNavigate();
  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [partData, setPartData] = useState<PartItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const rowsPerPage = 5;

  const processId = watch("processId");
  const processOrderRequired = watch("processOrderRequired");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const isProcessRequired = processOrderRequired === "true";

  if (!context) {
    throw new Error("PartContext must be used within a PartProvider");
  }

  const fetchSuppliers = async () => {
    try {
      const res = await selectSupplier();
      setSuppliers(res);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const filteredSuppliers = suppliers.filter((s) =>
    s.companyName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getAllPartList = async (page: number) => {
    try {
      const response = await partNumberList(page, rowsPerPage);
      setPartData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processList = await selectProcess();
        setProcessData(processList);
      } catch (error) {
        throw error;
      }
      getAllPartList(currentPage);
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchProcessDetail = async () => {
      if (!processId) {
        setValue("processDesc", "");
        return;
      }
      try {
        const res = await getProcessDetail(processId);
        setValue("processDesc", res.data?.processDesc || "");
      } catch (err) {
        setValue("processDesc", "");
        toast.error("Failed to fetch process description");
      }
    };
    fetchProcessDetail();
  }, [processId, setValue]);

  const onSubmit = async (data: FormDataType) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value as string);
        }
      });

      if (selectedImages.length > 0) {
        selectedImages.forEach((file) => formData.append("partImages", file));
      }

      const response = await createPartNumber(formData);
      if (response && response.status === 201) {
        toast.success("Part created successfully");
        navigate("/part-table");
      }
    } catch (error) {
      toast.error("Failed to create part");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePartNumber(id);
      toast.success("Part deleted successfully!");
      getAllPartList(currentPage);
      setItemToDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete part");
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
        Part Number
      </h1>
      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2 text-xs sm:text-sm md:text-base">
        <NavLink to="/dashboardDetailes" className="text-black">
          Dashboard
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <NavLink to="/part-table" className="text-black">
          Product and BOM
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-gray-500">Edit Part Number</span>
      </div>

      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Part Family */}
          <label className="block col-span-4 md:col-span-2">
            Part Family
            <select
              {...register("partFamily", {
                required: "Part Family is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Part Family</option>
              {processData.map((item) => (
                <option key={item.id} value={item.partFamily}>
                  {item.partFamily}{" "}
                  {item.machineName ? `(${item.machineName})` : ""}
                </option>
              ))}
            </select>
            {errors.partFamily && (
              <p className="text-red-500 text-sm">
                {errors.partFamily.message}
              </p>
            )}
          </label>

          <label className="block col-span-4 md:col-span-2">
            Part Number
            <input
              type="text"
              {...register("partNumber", {
                required: "Part Number is required",
              })}
              placeholder="Enter Part Number"
              className="border p-2 rounded w-full"
            />
            {errors.partNumber && (
              <p className="text-red-500 text-sm">
                {errors.partNumber.message}
              </p>
            )}
          </label>

          <label className="block col-span-4">
            Part Description
            <textarea
              {...register("partDescription", {
                required: "Part Description is required",
              })}
              placeholder="Part Description"
              className="border p-2 rounded w-full"
            />
            {errors.partDescription && (
              <p className="text-red-500 text-sm">
                {errors.partDescription.message}
              </p>
            )}
          </label>

          <div className="col-span-4 md:col-span-1">
            <label>Cost</label>
            <input
              type="number"
              step="0.01"
              {...register("cost", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Lead Time (Days)</label>
            <input
              type="number"
              {...register("leadTime", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Order Qty (Supplier)</label>
            <input
              type="number"
              {...register("supplierOrderQty", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1 relative">
            <label className="block mb-1">Company (Supplier)</label>
            <input
              type="hidden"
              {...register("companyName", { required: "Supplier is required" })}
            />
            <input
              type="text"
              value={searchTerm}
              placeholder="Search Supplier..."
              autoComplete="off"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
                if (e.target.value === "") setValue("companyName", "");
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-brand focus:outline-none"
            />
            {showDropdown && searchTerm && filteredSuppliers.length > 0 && (
              <ul className="absolute z-[100] w-full bg-white border border-gray-300 rounded shadow-xl mt-1 max-h-40 overflow-y-auto">
                {filteredSuppliers.map((s) => (
                  <li
                    key={s.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-0"
                    onMouseDown={() => {
                      setSearchTerm(s.companyName);
                      setValue("companyName", s.id);
                      setShowDropdown(false);
                    }}
                  >
                    {s.companyName}
                  </li>
                ))}
              </ul>
            )}
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Minimum Stock</label>
            <input
              type="number"
              {...register("minStock", {
                required: "Required",
                valueAsNumber: true,
              })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Available Stock</label>
            <input
              type="number"
              {...register("availStock", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Cycle Time (min)</label>
            <input
              {...register("cycleTime", { required: "Required" })}
              type="text"
              inputMode="numeric"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Process Order Required</label>
            <select
              {...register("processOrderRequired", { required: "Required" })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {isProcessRequired && (
            <>
              <div className="col-span-4 md:col-span-2">
                <label>Process</label>
                <select
                  {...register("processId", { required: "Required" })}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Process</option>
                  {processData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="block col-span-4 md:col-span-2">
                Process Description
                <textarea
                  {...register("processDesc")}
                  className="border p-2 rounded w-full"
                />
              </label>
            </>
          )}

          {selectedImages.length > 0 && (
            <div className="flex flex-wrap gap-3 col-span-4 mt-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImages = selectedImages.filter(
                        (_, i) => i !== index,
                      );
                      setSelectedImages(updatedImages);
                      setValue("image", updatedImages);
                    }}
                    className="absolute -top-2 -right-2 bg-white rounded-full text-red-600 shadow-md hover:scale-110 transition-transform z-10"
                  >
                    <MdCancel size={22} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="block col-span-4 md:col-span-2 cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition">
            <span className="text-gray-600 font-medium">
              {selectedImages.length > 0
                ? `${selectedImages.length} image(s) selected`
                : "Tap or Click to Add Pictures"}
            </span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  const fileArray = Array.from(files);
                  const updatedFiles = [...selectedImages, ...fileArray];
                  setSelectedImages(updatedFiles);
                  setValue("image", updatedFiles);
                }
              }}
            />
          </label>

          <div className="flex justify-between items-center col-span-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 rounded-lg px-6 font-semibold shadow-md hover:bg-opacity-90 transition"
            >
              Add/Edit Part Number
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <table className="text-sm w-full min-w-[600px]">
          <thead className="bg-[#F4F6F8] text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Process</th>
              <th className="px-4 py-3 font-medium">Part Number</th>
              <th className="px-4 py-3 font-medium">Part Family</th>
              <th className="px-4 py-3 font-medium">Cost</th>
              <th className="px-4 py-3 font-medium">Cycle Time</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {partData.map((item) => (
              <tr
                key={item.part_id}
                className="border-b border-dashed border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-4">
                  {item.process?.processName || "N/A"}
                </td>
                <td className="px-4 py-4">{item.partNumber}</td>
                <td className="px-4 py-4">{item.partFamily}</td>
                <td className="px-4 py-4">${item.cost}</td>
                <td className="px-4 py-4">{item.cycleTime}</td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => setItemToDeleteId(item.part_id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {itemToDeleteId && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[1000]">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full">
              <h2 className="text-lg font-bold mb-2">Delete Part?</h2>
              <p className="text-gray-600 mb-6">
                This action cannot be undone. Are you sure?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                  onClick={() => setItemToDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  onClick={() => handleDelete(itemToDeleteId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`p-2 rounded border ${currentPage === 1 ? "bg-gray-50 text-gray-300" : "hover:bg-gray-100"}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`p-2 rounded border ${currentPage === totalPages ? "bg-gray-50 text-gray-300" : "hover:bg-gray-100"}`}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartForm;
