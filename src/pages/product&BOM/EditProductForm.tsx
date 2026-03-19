import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PartContext } from "../../components/Context/PartContext";
import { Plus } from "lucide-react";
import {
  deleteProductImage,
  deleteProductPartNumber,
  getPartDetail,
  getProcessDetail,
  getProductNumberDetail,
  selectPartNamber,
  selectProcess,
  updateProductNumber,
} from "./https/partProductApis";
import { MdCancel } from "react-icons/md";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

// --- Interfaces ---
interface BOMItem {
  id?: string;
  part_id?: string;
  partNumber: string;
  partQuantity: string | number;
  process: string;
  processId?: string;
  cycleTime: string | number;
  instructionRequired: string;
}

interface ProductFormData {
  partFamily: string;
  productNumber: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  availStock: number;
  supplierOrderQty: number;
  cycleTime: number;
  companyName: string;
  minStock: number;
  processOrderRequired: string;
  instructionRequired: string;
  processId: string;
  processDesc: string;
}

interface ProcessItem {
  id: string;
  name: string;
  partFamily: string;
  machineName?: string;
}

interface SupplierItem {
  id: string;
  companyName: string;
}

interface ExistingImage {
  id: string;
  imageUrl: string;
}

const EditProductForm = () => {
  const partContext = useContext(PartContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!partContext) {
    throw new Error("PartContext is undefined. Ensure the provider is set.");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>();

  const [processData, setProcessData] = useState<ProcessItem[]>([]);
  const [bomItems, setBomItems] = useState<BOMItem[]>([
    {
      partNumber: "",
      partQuantity: "",
      process: "",
      cycleTime: "",
      instructionRequired: "No",
    },
  ]);

  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [partData, setPartData] = useState<any[]>([]); // API response for parts
  const [suggestions, setSuggestions] = useState<{ [index: number]: string[] }>(
    {},
  );
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedProcessId = watch("processId");
  const processOrderRequired = watch("processOrderRequired");
  const isProcessRequired = processOrderRequired === "true";

  const filteredSuppliers = suppliers.filter((s) =>
    s.companyName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  // Fetch Product Detail
  const fetchProductDetail = async () => {
    if (!id) return;
    try {
      const response = await getProductNumberDetail(id);
      const data = response.data;

      const supplierName = data.supplier
        ? data.supplier.companyName
        : data.companyName || "";
      setSearchTerm(supplierName);

      reset({
        partFamily: data.partFamily || "",
        productNumber: data.productNumber || "",
        partDescription: data.partDescription || "",
        cost: data.cost || 0,
        leadTime: data.leadTime || 0,
        companyName: data.companyName || "",
        minStock: data.minStock || 0,
        availStock: data.availStock || 0,
        cycleTime: data.cycleTime || 0,
        supplierOrderQty: data.supplierOrderQty || 0,
        processOrderRequired: String(data.processOrderRequired),
        instructionRequired: String(data.instructionRequired),
        processId: data.processId || "",
        processDesc: data.processDesc || "",
      });

      if (data.productImages) setExistingImages(data.productImages);

      if (data.parts && data.parts.length > 0) {
        setBomItems(
          data.parts.map((part: any) => ({
            id: part.id,
            part_id: part.part_id,
            partNumber: part.partNumber,
            partQuantity: part.partQuantity,
            process: part.process?.processName || "",
            processId: part.process?.id || "",
            cycleTime: part.process?.cycleTime || "",
            instructionRequired: part.instructionRequired ? "Yes" : "No",
          })),
        );
      }
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    const fetchInitialData = async () => {
      const processes = await selectProcess();
      setProcessData(processes);
      const parts = await selectPartNamber();
      setPartData(parts?.data || []);
    };
    fetchInitialData();
  }, [id]);

  // Handle Process Description
  useEffect(() => {
    if (!selectedProcessId) {
      setValue("processDesc", "");
      return;
    }
    getProcessDetail(selectedProcessId).then((res) => {
      setValue("processDesc", res.data?.processDesc || "");
    });
  }, [selectedProcessId, setValue]);
  const onSubmitProduct = async (data: ProductFormData) => {
    // 1. Check if id exists
    if (!id) {
      console.error("Product ID is missing");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, String(value)),
    );

    imageFiles.forEach((file) => formData.append("partImages", file));
    formData.append("parts", JSON.stringify(bomItems));

    try {
      // अब TypeScript को पता है कि id 'string' ही है
      const response = await updateProductNumber(formData, id);
      if (response && response.status === 200) {
        navigate("/product-tree");
      }
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };
  // BOM Handlers
  const handleAddBOMRow = () => {
    setBomItems([
      ...bomItems,
      {
        partNumber: "",
        partQuantity: "",
        process: "",
        cycleTime: "",
        instructionRequired: "No",
      },
    ]);
  };

  const handleDeleteBOM = async (index: number, itemId?: string) => {
    const updatedItems = [...bomItems];
    updatedItems.splice(index, 1);
    setBomItems(updatedItems);
    if (itemId) await deleteProductPartNumber(itemId);
  };

  const handleBOMChange = (
    index: number,
    field: keyof BOMItem,
    value: string,
  ) => {
    const updatedItems = [...bomItems];
    (updatedItems[index] as any)[field] = value;

    if (field === "partNumber") {
      const filtered = partData
        .filter((item) =>
          item.partNumber.toLowerCase().includes(value.toLowerCase()),
        )
        .map((item) => item.partNumber);
      setSuggestions((prev) => ({ ...prev, [index]: filtered }));
    }
    setBomItems(updatedItems);
  };

  const handleSuggestionClick = async (index: number, value: string) => {
    const updatedItems = [...bomItems];
    try {
      const response = await getPartDetail(value);
      const partDetail = response.data;
      updatedItems[index] = {
        ...updatedItems[index],
        partNumber: value,
        part_id: partDetail.part_id,
        process: partDetail.process?.processName || "",
        processId: partDetail.process?.id || "",
        cycleTime: partDetail.cycleTime || "",
        partQuantity: partDetail.minStock || "",
        instructionRequired: partDetail.instructionRequired ? "Yes" : "No",
      };
      setBomItems(updatedItems);
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
    } catch (error) {
      console.error("Failed to fetch part details", error);
    }
  };

  const handleDeleteImg = async (imageId: string) => {
    try {
      await deleteProductImage(imageId);
      fetchProductDetail();
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Edit Product Number
      </h1>

      <div className="flex gap-4 items-center mt-2 text-sm text-gray-700">
        <NavLink to="/dashboardDetailes" className="hover:underline">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px]" />
        <span>Product and BOM</span>
        <FaCircle className="text-[6px]" />
        <span>Edit Product Number</span>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmitProduct)}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
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
                  {item.partFamily}
                </option>
              ))}
            </select>
          </label>

          <label className="col-span-2">
            Product Number
            <input
              type="text"
              {...register("productNumber", { required: "Required" })}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="col-span-4">
            Description
            <textarea
              {...register("partDescription", { required: "Required" })}
              className="border p-2 rounded w-full"
            />
          </label>

          <div className="col-span-4 md:col-span-1">
            <label>Cost ($)</label>
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
            <label>Order Qty</label>
            <input
              type="number"
              {...register("supplierOrderQty", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Supplier Dropdown */}
          <div className="col-span-4 md:col-span-1 relative">
            <label className="block mb-1">Company Name</label>
            <input type="hidden" {...register("companyName")} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
                if (e.target.value === "") setValue("companyName", "");
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              className="border p-2 rounded w-full"
            />
            {showDropdown && searchTerm && filteredSuppliers.length > 0 && (
              <ul className="absolute z-[100] w-full bg-white border rounded shadow-xl mt-1 max-h-40 overflow-y-auto">
                {filteredSuppliers.map((s) => (
                  <li
                    key={s.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onMouseDown={() => {
                      setSearchTerm(s.companyName);
                      setValue("companyName", s.id);
                      setShowDropdown(false);
                    }}
                  >
                    {s.companyName} ({s.name})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Min Stock</label>
            <input
              type="number"
              {...register("minStock", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Cycle Time (Min)</label>
            <input
              type="number"
              {...register("cycleTime", { valueAsNumber: true })}
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Process Required</label>
            <select
              {...register("processOrderRequired")}
              className="border p-2 rounded w-full"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {isProcessRequired && (
            <div className="col-span-4 md:col-span-2">
              <label>Process</label>
              <select
                {...register("processId")}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Process</option>
                {processData.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.machineName})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-span-4 md:col-span-1">
            <label>Work Instruction</label>
            <select
              {...register("instructionRequired")}
              className="border p-2 rounded w-full"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {/* Image Section Fixed Gap */}
          <div className="col-span-4 mt-4">
            <label className="block font-medium mb-2">Product Images</label>
            <label className="block cursor-pointer bg-gray-50 border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-100 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setImageFiles((prev) => [...prev, ...files]);
                  const imageUrls = files.map((file) =>
                    URL.createObjectURL(file),
                  );
                  setSelectedImages((prev) => [...prev, ...imageUrls]);
                }}
                className="hidden"
              />
              <span className="text-gray-500">
                Tap or Click to Upload Product Images
              </span>
            </label>

            {/* Images Preview with fixed Gap */}
            <div className="flex flex-wrap gap-3 mt-4">
              {existingImages.map((img) => (
                <div key={img.id} className="relative w-20 h-20">
                  <img
                    src={`${BASE_URL}/uploads/partImages/${img.imageUrl}`}
                    alt="Uploaded"
                    className="w-full h-full object-cover border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImg(img.id)}
                    className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full shadow-md"
                  >
                    <MdCancel size={22} />
                  </button>
                </div>
              ))}
              {selectedImages.map((img, i) => (
                <div key={`new-${i}`} className="relative w-20 h-20">
                  <img
                    src={img}
                    alt="Selected"
                    className="w-full h-full object-cover border rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImages((prev) =>
                        prev.filter((_, index) => index !== i),
                      );
                      setImageFiles((prev) =>
                        prev.filter((_, index) => index !== i),
                      );
                    }}
                    className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full shadow-md"
                  >
                    <MdCancel size={22} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOM Section */}
          <div className="col-span-4 mt-6">
            <p className="font-semibold text-lg mb-4 border-b pb-2">
              Bill of Material (BOM)
            </p>
            {bomItems.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border p-4 rounded-xl mb-4 flex flex-col md:flex-row gap-4 items-end"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 w-full">
                  <div className="relative">
                    <label className="text-xs font-bold uppercase text-gray-500">
                      Part Number
                    </label>
                    <input
                      type="text"
                      value={item.partNumber}
                      onChange={(e) =>
                        handleBOMChange(index, "partNumber", e.target.value)
                      }
                      className="border p-2 rounded w-full mt-1 bg-white"
                    />
                    {suggestions[index]?.length > 0 && (
                      <ul className="absolute z-20 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-lg">
                        {suggestions[index].map((sugg, i) => (
                          <li
                            key={i}
                            className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleSuggestionClick(index, sugg)}
                          >
                            {sugg}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.partQuantity}
                      onChange={(e) =>
                        handleBOMChange(index, "partQuantity", e.target.value)
                      }
                      className="border p-2 rounded w-full mt-1 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500">
                      Process
                    </label>
                    <input
                      type="text"
                      value={item.process}
                      readOnly
                      className="border p-2 rounded w-full mt-1 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500">
                      Cycle (min)
                    </label>
                    <input
                      type="text"
                      value={item.cycleTime}
                      readOnly
                      className="border p-2 rounded w-full mt-1 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-500">
                      Instruction
                    </label>
                    <select
                      value={item.instructionRequired}
                      onChange={(e) =>
                        handleBOMChange(
                          index,
                          "instructionRequired",
                          e.target.value,
                        )
                      }
                      className="border p-2 rounded w-full mt-1 bg-white"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteBOM(index, item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <RiDeleteBin6Line size={22} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddBOMRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={18} /> Add Part
            </button>
          </div>

          <div className="col-span-4 flex justify-end mt-6">
            <button
              type="submit"
              className="bg-brand text-white py-2 px-8 rounded-lg font-bold shadow-lg"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
