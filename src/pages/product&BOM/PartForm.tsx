// import { useContext, useEffect, useState } from "react";
// import { FaCircle, FaTrash } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import { PartContext } from "../../components/Context/PartContext";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { useForm } from "react-hook-form";
// import {
//   createPartNumber,
//   deletePartNumber,
//   getProcessDetail,
//   partNumberList,
//   selectProcess,
// } from "./https/partProductApis";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { toast } from "react-toastify";

// const PartForm = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   const context = useContext(PartContext);
//   const navigate = useNavigate();

//   const [processData, setProcessData] = useState([]);
//   const [partData, setPartData] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;
//   const [showConfirm, setShowConfirm] = useState(false);
//   const processId = watch("processId");
//   if (!context)
//     throw new Error("PartContext must be used within a PartProvider");
//   const { addPart } = context;

//   const fetchProcessList = async () => {
//     try {
//       const response = await selectProcess();
//       setProcessData(response);
//     } catch (error) {
//       toast.error("Failed to fetch process list");
//     }
//   };

//   const getAllPartList = async (page = 1) => {
//     try {
//       const response = await partNumberList(page, rowsPerPage);
//       setPartData(response.data);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (error) {
//       toast.error("Failed to fetch part data");
//     }
//   };

//   useEffect(() => {
//     fetchProcessList();
//     getAllPartList();
//   }, [currentPage]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const onSubmit = async (data: any) => {
//     const formData = new FormData();

//     formData.append("partFamily", data.partFamily);
//     formData.append("partNumber", data.partNumber);
//     formData.append("partDescription", data.partDescription);
//     formData.append("cost", data.cost);
//     formData.append("leadTime", data.leadTime);
//     formData.append("supplierOrderQty", data.supplierOrderQty);
//     formData.append("cycleTime", data.cycleTime);
//     formData.append("companyName", data.companyName);
//     formData.append("minStock", data.minStock);
//     formData.append("availStock", data.availStock);
//     formData.append("processOrderRequired", data.processOrderRequired);
//     formData.append("processId", data.processId);
//     formData.append("processDesc", data.processDesc);

//     if (data.image && data.image.length > 0) {
//       Array.from(data.image).forEach((file: File) => {
//         formData.append("partImages", file);
//       });
//     }

//     try {
//       const response = await createPartNumber(formData);
//       console.log("response.statusresponse.status", response.status);

//       if (response.status === 201) {
//         toast.success(response.data.message);
//         navigate("/part-table");
//         getAllPartList(currentPage);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   useEffect(() => {
//     if (processId) {
//       const fetchProcessDetail = async () => {
//         try {
//           const res = await getProcessDetail(processId);

//           const desc = res.data?.processDesc || "";

//           setValue("processDesc", desc);
//         } catch (error) {
//           console.error("Failed to fetch process description", error);
//           setValue("processDesc", "");
//         }
//       };

//       fetchProcessDetail();
//     } else {
//       setValue("processDesc", "");
//     }
//   }, [processId]);

//   const handleDelete = (id: string) => {
//     try {
//       deletePartNumber(id).then();
//     } catch (error: unknown) {
//       throw error;
//     }
//   };
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
  cycleTime: number;
  processOrderRequired: string;
  processId: string;
  processDesc: string;
  image: FileList;
}

const PartForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormDataType>();

  const context = useContext(PartContext);
  const navigate = useNavigate();

  const [processData, setProcessData] = useState<any[]>([]);
  const [partData, setPartData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const rowsPerPage = 5;
  const processId = watch("processId");

  if (!context)
    throw new Error("PartContext must be used within a PartProvider");
  const { addPart } = context;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [processList, partList] = await Promise.all([
          selectProcess(),
          partNumberList(currentPage, rowsPerPage),
        ]);
        setProcessData(processList);
        setPartData(partList.data);
        setTotalPages(partList.pagination?.totalPages || 1);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const fetchProcessDetail = async () => {
      if (!processId) return setValue("processDesc", "");
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
        if (key === "image") {
          Array.from(value).forEach((file) =>
            formData.append("partImages", file)
          );
        } else {
          formData.append(key, value as string);
        }
      });
      const response = await createPartNumber(formData);
      if (response.status === 201) {
        navigate("/part-table");
        getAllPartList(currentPage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPartList = async (page = 1) => {
    try {
      const response = await partNumberList(page, rowsPerPage);
      setPartData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      toast.error("Failed to fetch part data");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePartNumber(id);
      getAllPartList(currentPage);
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

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
        <NavLink
          to="/dashboardDetailes"
          className="text-xs sm:text-sm md:text-base text-black"
        >
          Dashboard
        </NavLink>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-xs sm:text-sm md:text-base">Product and BOM</span>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-xs sm:text-sm md:text-base">
          Edit Part Number
        </span>
      </div>

      {/* Form */}
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
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
                  {item.partFamily}
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
              placeholder="Cost ($)"
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
            <label>Order Quantity by Supplier</label>
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
              {...register("minStock")}
              placeholder="Minimum Stock"
              className="border p-2 rounded w-full"
            />
          </div>

          <div className="col-span-4 md:col-span-1">
            <label>Available Stock</label>
            <input
              type="number"
              {...register("availStock")}
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
          <div className="col-span-4 md:col-span-1">
            <label>Process Order Required</label>
            <select
              {...register("processOrderRequired", {
                required: "Please select Yes or No",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.processOrderRequired && (
              <p className="text-red-500 text-sm">
                {errors.processOrderRequired.message}
              </p>
            )}
          </div>
          <div className="col-span-4 md:col-span-2">
            <label>Process</label>
            <select
              {...register("processId", { required: "Process is required" })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Process</option>
              {processData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.processId && (
              <p className="text-red-500 text-sm">{errors.processId.message}</p>
            )}
          </div>

          {/* Process Order Required */}

          <label className="block col-span-4 md:col-span-2">
            Process Description
            <textarea
              {...register("processDesc")}
              placeholder="Process Description"
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-4 md:col-span-2 cursor-pointer border bg-gray-100 p-4 rounded text-center">
            {watch("image")?.length
              ? `${watch("image").length} image(s) selected`
              : "Tap or Click to Add Pictures"}
            <input
              type="file"
              multiple
              {...register("image")}
              className="hidden"
              accept="image/*"
            />
          </label>

          <div className="flex justify-between items-center col-span-4">
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
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
        <table className="text-sm w-full">
          <thead className="bg-[#F4F6F8] text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Process</th>
              <th className="px-4 py-3 font-medium">Part Number</th>
              <th className="px-4 py-3 font-medium">Part Family</th>
              <th className="px-4 py-3 font-medium">Cost</th>
              <th className="px-4 py-3 font-medium">Cycle Time</th>
              <th className="px-4 py-3 font-medium">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {partData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-gray-200"
              >
                <td className="px-4 py-4">{item.process?.processName}</td>
                <td className="px-4 py-4">{item.partNumber}</td>
                <td className="px-4 py-4">{item.partFamily}</td>
                <td className="px-4 py-4">{item.cost}</td>
                <td className="px-4 py-4">{item.cycleTime}</td>
                <td className="px-4 py-4">
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
                            Do you really want to delete this process ?
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
                                handleDelete(item.part_id);
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

        {/* Pagination */}
        <div className="flex flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2">
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

export default PartForm;
