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
  getPartDetail,
  getPartNumberDetail,
  partNumberList,
  selectProcess,
  updatePartNumber,
} from "./https/partProductApis";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
const data = [
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "320 min",
    totalCycle: "54252 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "320 min",
    totalCycle: "54252 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "320 min",
    totalCycle: "54252 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "320 min",
    totalCycle: "54252 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "320 min",
    totalCycle: "54252 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "320 min",
    totalCycle: "54252 min",
  },
];

const EditPartForm = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const context = useContext(PartContext);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  if (!context)
    throw new Error("PartContext must be used within a PartProvider");
  const rowsPerPage = 5;
  const { id } = useParams();

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const { addPart } = context;

  const onSubmit = async (data: any) => {
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
    formData.append("cycleTime", data.cycleTime);
    formData.append("processOrderRequired", data.processOrderRequired);
    formData.append("processId", data.processId);
    formData.append("processDesc", data.processDesc);

    if (data.image?.length) {
      for (let file of data.image) {
        formData.append("partImages", file); // name must match multer field
      }
    }

    try {
      const response = await updatePartNumber(id, formData);

      console.log("Part updated", response.data);
    } catch (err) {
      console.error("Error updating part", err);
    }
  };

  const [processData, setProcessData] = useState([]);
  const [partData, setPartData] = useState([]);
  const getAllPartList = async (page = 1) => {
    try {
      const response = await partNumberList(page, rowsPerPage);
      setPartData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {}
  };
  const fetchProcessList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await selectProcess();
      setProcessData(response);
    } catch (error) {
      throw error;
    }
  };
  console.log("partDatapartData", partData);

  const [existingImages, setExistingImages] = useState<string[]>([]);

  const fetchProcessDetail = async () => {
    try {
      const response = await getPartNumberDetail(id);
      const data = response.data;

      reset({
        ...data,
        processOrderRequired: data.processOrderRequired ? "true" : "false",
      });

      setExistingImages(data.partImages.map((img) => img.imageUrl));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProcessDetail();
  }, [id]);

  useEffect(() => {
    fetchProcessList();
    getAllPartList();
  }, []);
  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
        Part Number
      </h1>
      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
        <NavLink
          to="/dashboardDetailes"
          className="text-xs sm:text-sm md:text-base text-black"
        >
          Dashboard
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-xs sm:text-sm md:text-base">product and Bom</span>
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
          <label className="block col-span-4 md:col-span-2">
            Part Number
            <input
              type="text"
              {...register("partNumber")}
              placeholder="Enter Part Number"
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4">
            Part Description
            <textarea
              {...register("partDescription")}
              placeholder="Part Description"
              className="border p-2 rounded w-full"
            />
          </label>

          <div className="col-span-4 md:col-span-1">
            <label>Cost ($)</label>
            <input
              type="number"
              {...register("cost")}
              placeholder="Enter Cost"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Lead Time (Days)</label>
            <input
              type="number"
              {...register("leadTime")}
              placeholder="Lead Time Days"
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
              {...register("minStock", { valueAsNumber: true })}
              placeholder="Minimum Stock"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Available Stock</label>
            <input
              type="number"
              {...register("availStock", { valueAsNumber: true })}
              placeholder="Available Stock"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Cycle Time</label>
            <input
              type="number"
              {...register("cycleTime")}
              placeholder="Cycle Time"
              className="border p-2 rounded w-full"
            />
          </div>
          {/* <div>
            <label className="font-semibold">Supplier</label>
            <select
              {...register("supplier_id")}
              className="border py-3 px-4 rounded-md w-full text-gray-600"
            >
              <option value="">-- Select Supplier --</option>
              {supplierData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div> */}
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

          <label className="block col-span-4 md:col-span-2">
            Process Description
            <textarea
              {...register("processDesc")}
              placeholder="Process Description"
              className="border p-2 rounded w-full"
            />
          </label>
          <div className="col-span-4">
            <label className="block font-medium mb-2">Uploaded Images</label>
            <div className="flex gap-2 flex-wrap">
              {existingImages.map((img, i) => (
                <img
                  key={i}
                  src={`${BASE_URL}/uploads/partImages/${img}`} // or use S3/CDN path if hosted
                  alt={`Uploaded ${i}`}
                  className="w-20 h-20 object-cover border rounded"
                />
              ))}
            </div>
          </div>

          <label className="block col-span-4 md:col-span-2 cursor-pointer border bg-gray-100 p-4 rounded text-center">
            {watch("image")?.[0]?.name || "Tap or Click to Add Picture"}
            <input type="file" {...register("image")} className="hidden" />
          </label>

          <div className="flex justify-end items-center col-span-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 rounded px-4"
            >
              Add/Edit Part Number
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
    </div>
  );
};

export default EditPartForm;
