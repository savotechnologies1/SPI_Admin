import { useContext, useEffect, useRef, useState } from "react";
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
  getProductNumberDetail,
  selectPartNamber,
  selectProcess,
  updateProductNumber,
} from "./https/partProductApis";
import { MdCancel } from "react-icons/md";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

const EditProductForm = () => {
  const partContext = useContext(PartContext);
  const navigate = useNavigate();

  if (!partContext) {
    throw new Error("PartContext is undefined. Ensure the provider is set.");
  }

  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);

  interface Part {
    partFamily: string;
    productNumber: string;
    partDescription: string;
    cost: number;
    leadTime: number;
    availStock: string;
    supplierOrderQty: number;
    cycleTime: number;
    companyName?: string;
    minStock?: number;
    image?: File;
    productNumber1: number;
    partQuantity: number;
    process: string;
    instructionRequired: string;
    partNumber: string;
    partImages: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Part>();
  const [processData, setProcessData] = useState([]);
  const [bomEntries, setBomEntries] = useState([
    {
      productNumber: "",
      partQuantity: "",
      process: "",
      cycleTime: "",
      instructionRequired: "",
    },
  ]);
  const [savedBOMs, setSavedBOMs] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { id } = useParams();

  const handleAddBOMRow = () => {
    setBomEntries([
      ...bomEntries,
      {
        partNumber: "",
        partQuantity: "",
        process: "",
        cycleTime: "",
        instructionRequired: "",
      },
    ]);
  };

  const handleSaveBOMs = () => {
    const validEntries = bomEntries.filter(
      (entry) =>
        entry.partNumber.trim() !== "" &&
        entry.partQuantity !== "" &&
        entry.process.trim() !== ""
    );

    const newEntries = validEntries.filter((newEntry) => {
      return !savedBOMs.some(
        (saved) =>
          saved.partNumber === newEntry.partNumber &&
          saved.process === newEntry.process
      );
    });

    setSavedBOMs((prev) => [...prev, ...newEntries]);
    setBomEntries([
      {
        partNumber: "",
        partQuantity: "",
        process: "",
        processId: "",
        cycleTime: "",
        instructionRequired: "",
      },
    ]);
  };
  const handleDeleteBOM = async (id: string, index: number) => {
    try {
      await deleteProductPartNumber(id);
      const updated = [...savedBOMs];
      updated.splice(index, 1);
      setSavedBOMs(updated);
    } catch (error) {
      console.error("Failed to delete BOM", error);
    }
  };

  const [existingImages, setExistingImages] = useState<string[]>([]);

  const onSubmitProduct = async (data: any) => {
    const formData = new FormData();
    formData.append("partFamily", data.partFamily);
    formData.append("productNumber", data.productNumber);
    formData.append("partDescription", data.partDescription);
    formData.append("cost", data.cost);
    formData.append("leadTime", data.leadTime);
    formData.append("supplierOrderQty", data.supplierOrderQty);
    formData.append("companyName", data.companyName);
    formData.append("minStock", data.minStock);
    formData.append("availStock", data.availStock);
    formData.append("cycleTime", data.cycleTime);

    console.log("data.imagedata.image", data.image);

    if (data.image?.length) {
      for (let file of data.image) {
        formData.append("partImages", file);
      }
    }
    if (imageFiles.length > 0) {
      for (let file of imageFiles) {
        formData.append("partImages", file);
      }
    }

    formData.append("parts", JSON.stringify(savedBOMs));

    try {
      const response = await updateProductNumber(formData, id);
      console.log("Updated Successfully", response);
      if (response.status === 200) {
        navigate("/product-tree");
      }
    } catch (err) {
      throw err;
    }
  };

  const fetchProductDetail = async () => {
    try {
      const response = await getProductNumberDetail(id);
      const data = response.data;
      reset({
        partFamily: data.partFamily || "",
        productNumber: data.productNumber || "",
        partDescription: data.partDescription || "",
        cost: data.cost || "",
        leadTime: data.leadTime || "",
        orderQty: data.orderQty || "",
        companyName: data.companyName || "",
        minStock: data.minStock || "",
        availStock: data.availStock || "",
        cycleTime: data.cycleTime || "",
        supplierOrderQty: data.supplierOrderQty,
      });
      if (data.productImages?.length) {
        setExistingImages(data.productImages.map((img) => img));
      }

      if (Array.isArray(data.parts)) {
        const preFilledBOMs = data.parts.map((part) => ({
          id: part.id || "",
          partNumber: part.partNumber || "",
          partQuantity: part.partQuantity || "",
          process: part.process?.processName || "",
          processId: part.process?.id || "",
          cycleTime: part.process?.cycleTime?.toString() || "",
          instructionRequired: part.instructionRequired ? "Yes" : "No",
          part_id: part.part_id || "",
        }));

        setBomEntries(preFilledBOMs);
        setSavedBOMs(preFilledBOMs);
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);
  const fetchProcessList = async () => {
    try {
      const response = await selectProcess();
      setProcessData(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProcessList();
  }, []);
  const [partData, setPartData] = useState<any[]>([]);

  const fetchPartNumber = async () => {
    try {
      const response = await selectPartNamber();
      setPartData(response?.data || []);
    } catch (error) {
      console.error("Error fetching part numbers:", error);
    }
  };

  useEffect(() => {
    fetchProcessList();
    fetchPartNumber();
  }, []);
  const [suggestions, setSuggestions] = useState<{ [index: number]: string[] }>(
    {}
  );

  const handleBOMChange = (index: number, field: string, value: string) => {
    const updated = [...bomEntries];
    updated[index][field] = value;

    if (field === "partNumber") {
      const filtered = partData
        .filter((item) =>
          item.partNumber.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => item.partNumber);

      setSuggestions((prev) => ({ ...prev, [index]: filtered }));
    }

    setBomEntries(updated);
  };
  const handleSuggestionClick = async (index: number, value: string) => {
    const updated = [...bomEntries];
    updated[index].partNumber = value;

    try {
      const response = await getPartDetail(value);
      const partDetail = response.data;
      console.log("partDetailpartDetail", partDetail);

      updated[index].part_id = partDetail.part_id || "";
      updated[index].process = partDetail.process?.processName || "";
      updated[index].processId =
        partDetail.processId || partDetail.process?.id || "";
      updated[index].cycleTime = partDetail.cycleTime?.toString() || "";
      updated[index].supplierOrderQty =
        partDetail.supplierOrderQty?.toString() || "";

      setBomEntries(updated);
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
    } catch (error) {
      console.error("Failed to fetch part details", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      inputRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target as Node)) {
          setSuggestions((prev) => ({ ...prev, [index]: [] }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log("11", savedBOMs);
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [selectedImages]);

  const handleDeleteImg = async (imageId: string, stepIndex: number) => {
    try {
      console.log("imageIdimageId", imageId);

      await deleteProductImage(imageId);
      await fetchProductDetail(id);
      // const updatedImgs = values.steps[stepIndex].workInstructionImg.filter(
      //   (img) => img.id !== imageId
      // );
      // setFieldValue(`steps.${stepIndex}.workInstructionImg`, updatedImgs);
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
        <span> Edit Product Number</span>
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
              {...register("productNumber", {
                required: "Product Number is required",
              })}
              placeholder="Enter Product Number"
              className="border p-2 rounded w-full"
            />
            {errors.productNumber && (
              <p className="text-red-500 text-xs">
                {errors.productNumber.message}
              </p>
            )}
          </label>
          <label className="col-span-4">
            Description
            <textarea
              {...register("partDescription", {
                required: "Description is required",
              })}
              className="border p-2 rounded w-full"
              placeholder="Product Description"
            />
            {errors.partDescription && (
              <p className="text-red-500 text-xs">
                {errors.partDescription.message}
              </p>
            )}
          </label>
          <div className="col-span-4 md:col-span-1">
            <label>Cost ($)</label>
            <input
              type="number"
              step="0.01"
              {...register("cost", { valueAsNumber: true })}
              placeholder="Cost ($)"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Lead Time (Days)</label>
            <input
              type="number"
              step="1"
              {...register("leadTime", { valueAsNumber: true })}
              placeholder="Lead Time (Days)"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label> Order Quantity by Supplier</label>
            <input
              type="number"
              {...register("supplierOrderQty")}
              placeholder="Order Qty"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Company Name</label>
            <input
              type="text"
              {...register("companyName")}
              placeholder="Company"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Minimum Stock</label>
            <input
              type="number"
              step="1"
              {...register("minStock", { valueAsNumber: true })}
              placeholder="Minimum Stock"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Available Stock</label>
            <input
              type="number"
              step="1"
              {...register("availStock", { valueAsNumber: true })}
              placeholder="Available Stock"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4 md:col-span-1">
            <label>Cycle Time</label>
            <input
              type="number"
              step="1"
              {...register("cycleTime", { valueAsNumber: true })}
              placeholder="Cycle Time"
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="col-span-4">
            <label className="block font-medium mb-2">
              Uploaded Product Images
            </label>
          </div>
          <label className="col-span-4 cursor-pointer bg-gray-100 border rounded p-4 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setImageFiles(files);
                const imageUrls = files.map((file) =>
                  URL.createObjectURL(file)
                );
                setSelectedImages(imageUrls);
              }}
              className="hidden"
            />
            Tap or Click to Upload Product Images
          </label>

          <div className="col-span-4">
            <div className="flex gap-2 flex-wrap">
              {/* Existing from server */}
              {existingImages.map((img, i) => (
                <div className="relative">
                  <img
                    key={i}
                    src={`${BASE_URL}/uploads/partImages/${img.imageUrl}`}
                    alt={`Uploaded ${i}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                  <MdCancel
                    className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full"
                    size={20}
                    onClick={() => handleDeleteImg(img.id, i)}
                  />
                </div>
              ))}
              {selectedImages.map((img, i) => (
                <div>
                  <img
                    key={`new-${i}`}
                    src={img}
                    alt={`Selected ${i}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 mt-4">
            <p className="font-semibold text-lg mb-2">Bill of Material (BOM)</p>
            {bomEntries.map((entry, index) => (
              <div key={index} className="bg-gray-50 border p-4 rounded mb-4">
                <p className="font-semibold mb-2">Part #{index + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={entry.partNumber}
                      onChange={(e) =>
                        handleBOMChange(index, "partNumber", e.target.value)
                      }
                      placeholder="Part Number"
                      className="border p-2 rounded w-full"
                    />
                    {suggestions[index]?.length > 0 && (
                      <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-md">
                        {suggestions[index].map((item, i) => (
                          <li
                            key={i}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(index, item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <input
                    type="number"
                    step="1"
                    value={entry.partQuantity}
                    onChange={(e) =>
                      handleBOMChange(index, "partQuantity", e.target.value)
                    }
                    placeholder="Qty"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    value={entry.process}
                    onChange={(e) =>
                      handleBOMChange(index, "process", e.target.value)
                    }
                    placeholder="Process"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="number"
                    value={entry.cycleTime}
                    onChange={(e) =>
                      handleBOMChange(index, "cycleTime", e.target.value)
                    }
                    placeholder="Cycle Time"
                    className="border p-2 rounded w-full"
                  />
                  <select
                    value={entry.instructionRequired}
                    onChange={(e) =>
                      handleBOMChange(
                        index,
                        "instructionRequired",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Work Instruction</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            ))}

            {/* BOM Actions */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={handleAddBOMRow}
                className="bg-blue-800 text-white px-4 py-2 rounded flex"
              >
                <Plus fontSize={16} /> Add More
              </button>
              <button
                type="button"
                onClick={handleSaveBOMs}
                className="bg-green-600 text-white px-4 py-2 rounded flex"
              >
                Save BOM
              </button>
            </div>
          </div>
          <div className="col-span-4 mt-4">
            {savedBOMs.length > 0 && (
              <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                <h2 className="font-semibold mb-4">Saved BOM Entries</h2>
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-2">Process</th>
                      <th className="p-2">Part Number</th>
                      <th className="p-2">Cycle Time</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedBOMs.map((row, index) => (
                      <tr key={index} className="border-t text-center">
                        <td className="p-2">{row.process}</td>
                        <td className="p-2">{row.partNumber}</td>
                        <td className="p-2">{row.cycleTime}</td>
                        <td className="p-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteBOM(row.id, index)}
                            className="text-red-600"
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-span-4 flex justify-end">
            <button
              type="submit"
              className="mt-6 bg-brand text-white py-2 px-6 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* BOM Table Preview */}
    </div>
  );
};

export default EditProductForm;
