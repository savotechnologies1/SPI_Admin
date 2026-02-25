import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import { ScrapEntryApi, selectPartNamber } from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";
import {
  createPartNumber,
  deletePartNumber,
  getProcessDetail,
  partNumberList,
  selectProcess,
} from "../product&BOM/https/partProductApis";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { useForm } from "react-hook-form";
import { FaCircle, FaTrash } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

// --- Types Fixed ---
interface FormDataType {
  partFamily: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty: number;
  companyName: string; // This holds Supplier ID
  minStock: number;
  availStock: number;
  cycleTime: string;
  processOrderRequired: string;
  instructionRequired: string;
  processId: string;
  processDesc: string;
  image: File[]; // Fixed: changed from FileList to File[] for better state handling
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
  cycleTime: string; // Added missing property
}

interface Supplier {
  id: string;
  name: string;
}

const PartForm = () => {
  const navigate = useNavigate();
  const context = useContext(PartContext);

  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [partData, setPartData] = useState<PartItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const rowsPerPage = 5;

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

  const processId = watch("processId");
  const processOrderRequired = watch("processOrderRequired");
  const isProcessRequired = processOrderRequired === "true";

  if (!context) {
    throw new Error("PartContext must be used within a PartProvider");
  }

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [processList, supplierList] = await Promise.all([
          selectProcess(),
          selectSupplier(),
        ]);
        setProcessData(processList);
        setSuppliers(supplierList);
      } catch (error) {
        console.error("Error loading initial data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getAllPartList(currentPage);
  }, [currentPage]);

  const getAllPartList = async (page: number) => {
    try {
      const response = await partNumberList(page, rowsPerPage);
      setPartData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.log(error);
    }
  };

  // Process details on change
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
      }
    };
    fetchProcessDetail();
  }, [processId, setValue]);

  const filteredSuppliers = suppliers.filter((s) =>
    s.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onSubmit = async (data: FormDataType) => {
    try {
      const formData = new FormData();
      // Append all text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, String(value));
        }
      });

      // Append images from state
      selectedImages.forEach((file) => {
        formData.append("partImages", file);
      });

      const response = await createPartNumber(formData);
      if (response && response.status === 201) {
        toast.success("Part created successfully!");
        navigate("/part-table");
      }
    } catch (error) {
      toast.error("Failed to create part");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePartNumber(id);
      toast.success("Part deleted!");
      getAllPartList(currentPage);
      setItemToDeleteId(null);
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Part Number</h1>

      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center mt-2 gap-2 text-sm">
        <NavLink to="/dashboardDetailes">Dashboard</NavLink>
        <FaCircle className="text-[4px] text-gray-500" />
        <NavLink to="/part-table">Product and BOM</NavLink>
        <FaCircle className="text-[4px] text-gray-500" />
        <span className="text-gray-500">Add Part Number</span>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Part Family */}
          <div className="col-span-4 md:col-span-2">
            <label className="font-semibold block mb-1">Part Family</label>
            <select
              {...register("partFamily", { required: "Required" })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Part Family</option>
              {processData.map((item) => (
                <option key={item.id} value={item.partFamily}>
                  {item.partFamily}
                </option>
              ))}
            </select>
            {errors.partFamily && (
              <p className="text-red-500 text-xs">
                {errors.partFamily.message}
              </p>
            )}
          </div>

          {/* Part Number */}
          <div className="col-span-4 md:col-span-2">
            <label className="font-semibold block mb-1">Part Number</label>
            <input
              {...register("partNumber", { required: "Required" })}
              placeholder="Enter Part Number"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Description */}
          <div className="col-span-4">
            <label className="font-semibold block mb-1">Part Description</label>
            <textarea
              {...register("partDescription", { required: "Required" })}
              className="border p-2 rounded w-full"
              rows={2}
            />
          </div>

          {/* Cost, Lead Time, Qty */}
          <div className="col-span-1">
            <label className="font-semibold block mb-1">Cost ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("cost")}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Supplier Search Dropdown */}
          <div className="col-span-4 md:col-span-1 relative">
            <label className="font-semibold block mb-1">Supplier</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search Supplier..."
              className="border p-2 rounded w-full"
            />
            {showDropdown && filteredSuppliers.length > 0 && (
              <ul className="absolute z-[100] w-full bg-white border mt-1 max-h-40 overflow-y-auto shadow-lg">
                {filteredSuppliers.map((s) => (
                  <li
                    key={s.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={() => {
                      setSearchTerm(s.name);
                      setValue("companyName", s.id);
                      setShowDropdown(false);
                    }}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Min Stock, Avail Stock, Cycle Time */}
          <div className="col-span-1">
            <label className="font-semibold block mb-1">Min Stock</label>
            <input
              type="number"
              {...register("minStock")}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-1">
            <label className="font-semibold block mb-1">Cycle Time (min)</label>
            <input
              type="number"
              {...register("cycleTime")}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-1">
            <label className="font-semibold block mb-1">
              Process Order Required?
            </label>
            <select
              {...register("processOrderRequired")}
              className="border p-2 rounded w-full"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Conditional Process Fields */}
          {isProcessRequired && (
            <>
              <div className="col-span-2">
                <label className="font-semibold block mb-1">
                  Select Process
                </label>
                <select
                  {...register("processId")}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Choose...</option>
                  {processData.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="font-semibold block mb-1">Process Desc</label>
                <textarea
                  {...register("processDesc")}
                  className="border p-2 rounded w-full"
                  rows={1}
                />
              </div>
            </>
          )}

          {/* Image Previews Section */}
          <div className="col-span-4 mt-2">
            <div className="flex flex-wrap gap-4">
              {selectedImages.map((file, index) => (
                <div key={index} className="relative inline-block">
                  {/* Outer div doesn't have overflow-hidden so icon can sit on edge */}
                  <div className="w-24 h-24 border rounded-lg overflow-hidden bg-gray-50">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Cancel Button - Positioned exactly on the corner */}
                  <button
                    type="button"
                    onClick={() => {
                      const updated = selectedImages.filter(
                        (_, i) => i !== index,
                      );
                      setSelectedImages(updated);
                      setValue("image", updated);
                    }}
                    className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full shadow-md hover:scale-110 transition-transform z-20"
                  >
                    <MdCancel size={24} />
                  </button>
                </div>
              ))}

              {/* Add Button */}
              <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                <span className="text-xs text-gray-500 font-medium text-center px-1">
                  Add Images
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const arr = Array.from(files);
                      const newSet = [...selectedImages, ...arr];
                      setSelectedImages(newSet);
                      setValue("image", newSet);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="col-span-4 mt-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 px-6 rounded-lg font-semibold hover:bg-opacity-90"
            >
              Add/Edit Part Number
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3">Process</th>
              <th className="p-3">Part Number</th>
              <th className="p-3">Part Family</th>
              <th className="p-3">Cost</th>
              <th className="p-3">Cycle Time</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {partData.map((item) => (
              <tr key={item.part_id} className="hover:bg-gray-50 transition">
                <td className="p-3">{item.process?.processName || "N/A"}</td>
                <td className="p-3 font-medium">{item.partNumber}</td>
                <td className="p-3">{item.partFamily}</td>
                <td className="p-3">${item.cost}</td>
                <td className="p-3">{item.cycleTime} min</td>
                <td className="p-3">
                  <button onClick={() => setItemToDeleteId(item.part_id)}>
                    <FaTrash className="text-red-500 hover:scale-110 transition" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDeleteId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000]">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold mb-2">Delete Part?</h2>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Are you sure?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-100 rounded-lg"
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
    </div>
  );
};

export default PartForm;
