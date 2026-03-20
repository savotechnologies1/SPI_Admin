import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { useForm } from "react-hook-form";
import {
  deleteProductImage,
  getPartNumberDetail,
  getProcessDetail,
  partNumberList,
  selectProcess,
  updatePartNumber,
} from "./https/partProductApis";
import { MdCancel } from "react-icons/md";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

// --- Interfaces ---
interface PartImage {
  id: string;
  imageUrl: string;
}

interface ProcessItem {
  id: string;
  name: string;
  partFamily: string;
  machineName?: string;
}

interface SupplierItem {
  id: string;
  name?: string;
  companyName?: string;
}

interface PartFormInputs {
  partFamily: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty: number;
  companyName: string;
  companyId: string;
  minStock: number;
  availStock: number;
  cycleTime: string | number;
  processOrderRequired: string | boolean;
  processId: string;
  processDesc: string;
  instructionRequired: string;
  image: FileList | null;
}

const EditPartForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const context = useContext(PartContext);

  if (!context)
    throw new Error("PartContext must be used within a PartProvider");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PartFormInputs>();

  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [existingImages, setExistingImages] = useState<PartImage[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedProcessId = watch("processId");
  const selectedImages = watch("image");
  const processOrderRequired = watch("processOrderRequired");

  const filteredSuppliers = suppliers.filter((s) => {
    const company = (s.companyName || "").toLowerCase();
    const fName = (s.firstName || "").toLowerCase();
    const lName = (s.lastName || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    return (
      company.includes(search) ||
      fName.includes(search) ||
      lName.includes(search)
    );
  });

  // Fetch Suppliers
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await selectSupplier();
        setSuppliers(res);
      } catch (err) {
        console.error("Suppliers load failed", err);
      }
    };
    fetchSuppliers();
  }, []);

  // Fetch Initial Data (Process & Detail)
  const fetchProcessDetail = async () => {
    if (!id) return;
    try {
      const response = await getPartNumberDetail(id);
      const data = response.data;

      // यहाँ बदलाव करें: Company Name (FirstName LastName) फॉर्मेट बनाने के लिए
      let supplierDisplay = "";
      if (data.supplier) {
        const company = (data.supplier.companyName || "").trim();
        const firstName = (data.supplier.firstName || "").trim();
        const lastName = (data.supplier.lastName || "").trim();

        // अगर Supplier डेटा है तो फॉर्मेट: Company (First Last)
        supplierDisplay = `${company} (${firstName} ${lastName})`.trim();
      } else {
        supplierDisplay = data.companyName || "";
      }

      reset({
        ...data,
        processId: data.processId || "",
        cycleTime: data.cycleTime || "",
        processOrderRequired: data.processOrderRequired ? "true" : "false",
        companyId: data.companyId || data.companyName || "",
      });

      setSearchTerm(supplierDisplay); // अब यहाँ कंबाइन नाम सेट होगा
      setExistingImages(data.partImages || []);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const processes = await selectProcess();
        setProcessData(processes);
        await fetchProcessDetail();
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialData();
  }, [id]);

  // Handle Process Description Auto-fill
  useEffect(() => {
    if (!selectedProcessId) {
      setValue("processDesc", "");
      return;
    }
    getProcessDetail(selectedProcessId).then((res) => {
      setValue("processDesc", res.data?.processDesc || "");
    });
  }, [selectedProcessId, setValue]);

  // Handle Image Previews
  useEffect(() => {
    if (selectedImages && selectedImages.length > 0) {
      const files = Array.from(selectedImages);
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewImages(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setPreviewImages([]);
    }
  }, [selectedImages]);

  const handleRemoveSelectedImage = (index: number) => {
    if (!selectedImages) return;
    const files = Array.from(selectedImages);
    files.splice(index, 1);
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    setValue("image", dataTransfer.files);
  };

  const handleDeleteImg = async (imageId: string) => {
    try {
      await deleteProductImage(imageId);
      if (id) await fetchProcessDetail();
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const onSubmit = async (data: PartFormInputs) => {
    if (!id) return;
    const formData = new FormData();

    // Append all text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined) {
        formData.append(key, String(value));
      }
    });

    // Append new images
    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((file) => {
        formData.append("partImages", file);
      });
    }

    try {
      const response = await updatePartNumber(id, formData);
      if (response && response.status === 200) {
        navigate("/part-table");
      }
    } catch (err) {
      console.error("Error updating part", err);
    }
  };

  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
        Edit Part Number
      </h1>

      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2 text-sm text-gray-600">
        <NavLink to="/dashboardDetailes" className="text-black">
          Dashboard
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px]" />
        <NavLink to="/part-table" className="text-black">
          Product and BOM
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px]" />
        <span className="text-gray-400">Edit Part Number</span>
      </div>

      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <label className="block col-span-4 md:col-span-2">
            Part Family
            <select
              {...register("partFamily")}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Part Family</option>
              {processData.map((item) => (
                <option key={item.id} value={item.partFamily}>
                  {item.partFamily} ({item.machineName})
                </option>
              ))}
            </select>
          </label>

          <label className="block col-span-4 md:col-span-2">
            Part Number
            <input
              type="text"
              {...register("partNumber")}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4">
            Part Description
            <textarea
              {...register("partDescription")}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-1">
            Cost ($)
            <input
              type="number"
              step="0.01"
              {...register("cost", { required: "Required" })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-1">
            Lead Time (Days)
            <input
              type="number"
              {...register("leadTime")}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-1">
            Order Qty
            <input
              type="number"
              {...register("supplierOrderQty")}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Supplier Search Dropdown */}
          <div className="col-span-4 md:col-span-1 relative">
            <label className="block mb-1">Company Name</label>
            <input
              type="hidden"
              {...register("companyId", { required: "Required" })}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
                if (e.target.value === "") setValue("companyId", "");
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="border p-2 rounded w-full focus:ring-2 focus:ring-brand focus:outline-none"
            />
            {showDropdown && searchTerm && filteredSuppliers.length > 0 && (
              <ul className="absolute z-[100] w-full bg-white border rounded shadow-xl mt-1 max-h-40 overflow-y-auto">
                {filteredSuppliers.map((s) => {
                  // यहाँ कंबाइन नाम का वेरिएबल बनाएं
                  const displayName = `${s.companyName} (${s.firstName} ${s.lastName})`;

                  return (
                    <li
                      key={s.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b"
                      onMouseDown={() => {
                        setSearchTerm(displayName); // क्लिक करने पर कंबाइन नाम दिखेगा
                        setValue("companyId", s.id);
                        setShowDropdown(false);
                      }}
                    >
                      {/* लिस्ट में भी वही फॉर्मेट दिखेगा */}
                      <span className="font-semibold">{s.companyName}</span>
                      <span className="text-gray-500 ml-1">
                        ({s.firstName} {s.lastName})
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <label className="block col-span-4 md:col-span-1">
            Min Stock
            <input
              type="number"
              {...register("minStock")}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-1">
            Avail Stock
            <input
              type="number"
              {...register("availStock")}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-1">
            Cycle Time (Min)
            <input
              type="number"
              {...register("cycleTime", { required: "Required" })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-1">
            Instruction Required
            <select
              {...register("instructionRequired")}
              className="border p-2 rounded w-full"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          <label className="block col-span-4 md:col-span-1">
            Process Required
            <select
              {...register("processOrderRequired")}
              className="border p-2 rounded w-full"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>

          {processOrderRequired === "true" && (
            <>
              <label className="block col-span-4 md:col-span-1">
                Process
                <select
                  {...register("processId", { required: "Required" })}
                  className="border p-2 rounded w-full"
                >
                  <option value="">Select Process</option>
                  {processData.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.machineName})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block col-span-4 md:col-span-2">
                Process Description
                <textarea
                  {...register("processDesc")}
                  className="border p-2 rounded w-full"
                />
              </label>
            </>
          )}

          {/* Image Display Section */}
          <div className="col-span-4">
            <label className="block font-medium mb-2">Images</label>
            <div className="flex flex-wrap gap-3">
              {/* Previews of new selected images */}
              {previewImages.map((imgUrl, i) => (
                <div key={`new-${i}`} className="relative w-20 h-20">
                  <img
                    src={imgUrl}
                    className="w-full h-full object-cover border rounded-lg"
                    alt="preview"
                  />
                  <MdCancel
                    className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full shadow-sm"
                    size={22}
                    onClick={() => handleRemoveSelectedImage(i)}
                  />
                </div>
              ))}
              {/* Existing images from server */}
              {existingImages.map((img) => (
                <div key={img.id} className="relative w-20 h-20">
                  <img
                    src={`${BASE_URL}/uploads/partImages/${img.imageUrl}`}
                    className="w-full h-full object-cover border rounded-lg"
                    alt="existing"
                  />
                  <MdCancel
                    className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full shadow-sm"
                    size={22}
                    onClick={() => handleDeleteImg(img.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          <label className="block col-span-4 md:col-span-2 cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 p-4 rounded-lg text-center hover:bg-gray-100 transition">
            <span className="text-gray-500">Tap or Click to Add Pictures</span>
            <input
              type="file"
              {...register("image")}
              className="hidden"
              accept="image/*"
              multiple
            />
          </label>

          <div className="flex justify-end items-center col-span-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 rounded-lg px-8 font-bold shadow-lg hover:bg-opacity-90 transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPartForm;
