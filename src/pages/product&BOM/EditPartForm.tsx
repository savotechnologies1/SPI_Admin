import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import edit from "../../assets/edit.png";
import more from "../../assets/more.png";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  createPartNumber,
  deleteProductImage,
  getPartDetail,
  getPartNumberDetail,
  getProcessDetail,
  partNumberList,
  selectProcess,
  updatePartNumber,
} from "./https/partProductApis";
import { MdCancel } from "react-icons/md";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
const EditPartForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const selectedProcessId = watch("processId");

  const context = useContext(PartContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const rowsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  if (!context)
    throw new Error("PartContext must be used within a PartProvider");

  const [processData, setProcessData] = useState([]);
  const [partData, setPartData] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const selectedImages = watch("image");
  const [previewImages, setPreviewImages] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("partFamily", data.partFamily);
    formData.append("partNumber", data.partNumber);
    formData.append("partDescription", data.partDescription);
    formData.append("cost", data.cost);
    formData.append("leadTime", data.leadTime);
    formData.append("supplierOrderQty", data.supplierOrderQty);
    formData.append("companyName", data.companyName);
    formData.append("minStock", data.minStock);
    formData.append("availStock", data.availStock);
    formData.append(
      "cycleTime",
      `${data.cycleTimeValue} ${data.cycleTimeUnit}`
    );
    formData.append("processOrderRequired", data.processOrderRequired);
    formData.append("processId", data.processId);
    formData.append("processDesc", data.processDesc);

    if (data.image?.length) {
      for (let file of data.image) {
        formData.append("partImages", file);
      }
    }

    try {
      const response = await updatePartNumber(id, formData);
      if (response.status === 200) {
        navigate("/part-table");
      }
    } catch (err) {
      console.error("Error updating part", err);
    }
  };

  const getAllPartList = async (page = 1) => {
    try {
      const response = await partNumberList(page, rowsPerPage);
      setPartData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {}
  };

  const fetchProcessList = async () => {
    try {
      const response = await selectProcess();
      setProcessData(response);
    } catch (error) {
      throw error;
    }
  };

  const fetchProcessDetail = async () => {
    try {
      const response = await getPartNumberDetail(id);
      const data = response.data;

      // ✅ cycleTime को अलग करें
      let cycleTimeValue = "";
      let cycleTimeUnit = "";
      if (data.cycleTime && typeof data.cycleTime === "string") {
        const parts = data.cycleTime.split(" ");
        if (parts.length === 2) {
          cycleTimeValue = parts[0];
          cycleTimeUnit = parts[1];
        } else {
          // अगर सिर्फ नंबर आता है या यूनिट नहीं है, तो सिर्फ वैल्यू सेट करें
          cycleTimeValue = data.cycleTime;
          cycleTimeUnit = ""; // या कोई डिफॉल्ट यूनिट
        }
      }

      reset({
        ...data,
        // ✅ cycleTime को हटाकर cycleTimeValue और cycleTimeUnit जोड़ें
        cycleTime: undefined, // मूल cycleTime फ़ील्ड को हटा दें
        cycleTimeValue: cycleTimeValue,
        cycleTimeUnit: cycleTimeUnit,
        processOrderRequired: data.processOrderRequired ? "true" : "false",
      });

      setExistingImages(data.partImages.map((img) => img));
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumericInput = (
    e: React.ChangeEvent<HTMLInputElement>, // `React.ChangeEvent` का उपयोग करें
    fieldName: "cycleTimeValue" // यदि कोई अन्य numeric फ़ील्ड है तो उसे भी जोड़ें
  ) => {
    const value = e.target.value;
    // Allow empty string or numbers starting from 1
    if (!/^(?:[1-9]\d*)?$/.test(value) && value !== "") {
      setError(fieldName, {
        type: "manual",
        message: "Only positive integers are allowed",
      });
    } else {
      clearErrors(fieldName);
    }
  };
  const handleDeleteImg = async (imageId) => {
    try {
      await deleteProductImage(imageId);
      await fetchProcessDetail(id);
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  // Update preview image URLs on image selection
  useEffect(() => {
    if (selectedImages?.length) {
      const newPreviews = Array.from(selectedImages).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(newPreviews);

      return () => {
        newPreviews.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewImages([]);
    }
  }, [selectedImages]);
  const handleRemoveSelectedImage = (index) => {
    const updatedFiles = Array.from(selectedImages);
    updatedFiles.splice(index, 1);

    // Create a new DataTransfer object to mimic FileList
    const dataTransfer = new DataTransfer();
    updatedFiles.forEach((file) => dataTransfer.items.add(file));

    setValue("image", dataTransfer.files); // Update the form field
  };

  useEffect(() => {
    const fetchProcessDescription = async () => {
      // If no process is selected, clear the description and stop.
      if (!selectedProcessId) {
        setValue("processDesc", "");
        return;
      }

      try {
        // Fetch details for the *specific* selected process
        const res = await getProcessDetail(selectedProcessId);
        // Set the description from the API response
        setValue("processDesc", res.data?.processDesc || "");
      } catch (err) {
        // If the API call fails, clear the description and notify the user
        setValue("processDesc", "");
        console.error(err);
      }
    };

    fetchProcessDescription();
  }, [selectedProcessId, setValue]); // This effect runs whenever the selected process ID changes

  useEffect(() => {
    fetchProcessDetail();
  }, [id]);

  useEffect(() => {
    fetchProcessList();
    getAllPartList();
  }, []);

  return (
    // ... your JSX is unchanged, it will work automatically now
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
        Edit Part Number
      </h1>
      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
        <NavLink
          to="/dashboardDetailes"
          className="text-xs sm:text-sm md:text-base text-black"
        >
          Dashboard
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <NavLink
          to="/part-table"
          className="text-xs sm:text-sm md:text-base text-black"
        >
          <span className="text-xs sm:text-sm md:text-base">
            product and Bom
          </span>
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-xs sm:text-sm md:text-base">
          Edit Part Number
        </span>
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

          {/* Part Number */}
          <label className="block col-span-4 md:col-span-2">
            Part Number
            <input
              type="text"
              {...register("partNumber")}
              placeholder="Enter Part Number"
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Part Description */}
          <label className="block col-span-4">
            Part Description
            <textarea
              {...register("partDescription")}
              placeholder="Part Description"
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Cost */}
          <div className="col-span-4 md:col-span-1">
            <label>Cost ($)</label>
            <input
              type="number"
              {...register("cost")}
              placeholder="Enter Cost"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Lead Time */}
          <div className="col-span-4 md:col-span-1">
            <label>Lead Time (Days)</label>
            <input
              type="number"
              {...register("leadTime")}
              placeholder="Lead Time Days"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Order Quantity */}
          <div className="col-span-4 md:col-span-1">
            <label>Order Quantity by Supplier</label>
            <input
              type="number"
              {...register("supplierOrderQty")}
              placeholder="Order Qty"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Company Name */}
          <div className="col-span-4 md:col-span-1">
            <label>Company Name</label>
            <input
              type="text"
              {...register("companyName")}
              placeholder="Company"
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Minimum Stock */}
          <div className="col-span-4 md:col-span-1">
            <label>Minimum Stock</label>
            <input
              type="number"
              {...register("minStock", {
                // required: "Minimum Stock is required",
                valueAsNumber: true,
                validate: (value) => {
                  const supplierOrderQty = watch("supplierOrderQty");
                  if (supplierOrderQty === null || isNaN(supplierOrderQty))
                    return true;
                  return (
                    value <= supplierOrderQty ||
                    "Minimum Stock must be less than Order Quantity"
                  );
                },
              })}
              placeholder="Minimum Stock"
              className="border p-2 rounded w-full"
            />
            {errors.minStock && (
              <p className="text-red-500 text-sm">{errors.minStock.message}</p>
            )}
          </div>

          {/* Available Stock */}
          <div className="col-span-4 md:col-span-1">
            <label>Available Stock</label>
            <input
              type="number"
              {...register("availStock", {
                // required: "Available Stock is required",
                valueAsNumber: true,
                validate: (value) => {
                  const supplierOrderQty = watch("supplierOrderQty");
                  if (supplierOrderQty === null || isNaN(supplierOrderQty))
                    return true;
                  return (
                    value <= supplierOrderQty ||
                    "Available Stock must be less than Order Quantity"
                  );
                },
              })}
              placeholder="Available Stock"
              className="border p-2 rounded w-full"
            />
            {errors.availStock && (
              <p className="text-red-500 text-sm">
                {errors.availStock.message}
              </p>
            )}
          </div>

          {/* Cycle Time */}
          <div className="col-span-4 md:col-span-1">
            <label className="font-semibold">Cycle Time</label>
            <div className="flex gap-2">
              <input
                {...register("cycleTimeValue", {
                  required: "Cycle time is required",
                  pattern: {
                    value: /^[1-9]\d*$/, // केवल positive integers
                    message: "Only positive integers are allowed",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Cycle time is required",
                })}
                type="text" // 'number' से 'text' में बदला ताकि onInput हैंडलर काम कर सके
                inputMode="numeric"
                placeholder="Enter time"
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleNumericInput(e, "cycleTimeValue")
                }
                className="border p-2 rounded w-full"
              />
              <select
                {...register("cycleTimeUnit", {
                  required: "Unit is required",
                })}
                className="border p-2 rounded w-1/3"
                defaultValue=""
              >
                <option value="" disabled>
                  Unit
                </option>
                <option value="sec">Sec</option>
                <option value="min">Min</option>
                <option value="hr">Hr</option>
              </select>
            </div>
            {(errors.cycleTimeValue || errors.cycleTimeUnit) && (
              <p className="text-red-500 text-sm">
                {errors.cycleTimeValue?.message ||
                  errors.cycleTimeUnit?.message}
              </p>
            )}
          </div>

          {/* Process Order Required */}
          <div className="col-span-4 md:col-span-1">
            <label>Process Order Required</label>
            <select
              {...register("processOrderRequired", {
                setValueAs: (v) => v === "true",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Process */}
          <label className="block col-span-4 md:col-span-2">
            Process
            <select
              {...register("processId")}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Process</option>
              {processData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          {/* Process Description */}
          <label className="block col-span-4 md:col-span-2">
            Process Description
            <textarea
              {...register("processDesc")}
              placeholder="Process Description"
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Images */}
          <div className="col-span-4">
            <label className="block font-medium mb-2">Uploaded Images</label>
            {previewImages.length > 0 && (
              <div className="col-span-4 flex gap-2 flex-wrap mt-2">
                {previewImages.map((imgUrl, i) => (
                  <div key={i} className="relative">
                    <img
                      src={imgUrl}
                      alt={`Preview ${i}`}
                      className="w-20 h-20 object-cover border rounded"
                    />
                    <MdCancel
                      className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full"
                      size={20}
                      onClick={() => handleRemoveSelectedImage(i)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, i) => (
                <div key={img.id} className="relative">
                  <img
                    src={`${BASE_URL}/uploads/partImages/${img.imageUrl}`}
                    alt={`Uploaded ${i}`}
                    className="w-20 h-20 object-cover border rounded"
                  />
                  <MdCancel
                    className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full"
                    size={20}
                    onClick={() => handleDeleteImg(img.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <label className="block col-span-4 md:col-span-2 cursor-pointer border bg-gray-100 p-4 rounded text-center">
            {selectedImages?.[0]?.name || "Tap or Click to Add Picture"}
            <input
              type="file"
              {...register("image")}
              className="hidden"
              accept="image/*"
              multiple
            />
          </label>

          {/* Submit Button */}
          <div className="flex justify-end items-center col-span-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 rounded px-4"
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
