import { useContext, useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import edit from "../../assets/edit.png";
import more from "../../assets/more.png";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import {
  createPartNumber,
  partNumberList,
  selectProcess,
} from "./https/partProductApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const data = [
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
];

// const PartForm = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const context = useContext(PartContext);

//   if (!context) {
//     throw new Error("PartContext must be used within a PartProvider");
//   }

//   const { addPart } = context;
//   const navigate = useNavigate();

//   const [partFormData, setPartFormData] = useState<{
//     partFamily: string;
//     partNumber: string;
//     description: string;
//     cost: string;
//     leadTime: string;
//     supplierOrderQty: string;
//     companyName: string;
//     minStock: string;
//     availableStock: string;
//     cycleTime: string;
//     processOrder: string;
//     image: File | null;
//   }>({
//     partFamily: "",
//     partNumber: "",
//     description: "",
//     cost: "",
//     leadTime: "",
//     supplierOrderQty: "",
//     companyName: "",
//     minStock: "",
//     availableStock: "",
//     cycleTime: "",
//     processOrder: "Yes",
//     image: null,
//   });

//   const [processStepFormData, setProcessStepFormData] = useState({
//     process: "",
//     cycleTime: "",
//     description: "",
//     totalCycleTime: "",
//   });

//   const handlePartFormChange = (e: any) => {
//     const { name, value } = e.target;
//     setPartFormData({ ...partFormData, [name]: value });
//   };

//   const handleProcessStepChange = (e: any) => {
//     const { name, value } = e.target;
//     setProcessStepFormData({ ...processStepFormData, [name]: value });
//   };

//   const handleSubmitPartForm = (e: any) => {
//     e.preventDefault();

//     addPart({
//       ...partFormData,
//       cost: parseFloat(partFormData.cost),
//       leadTime: parseInt(partFormData.leadTime, 10),
//       supplierOrderQty: parseInt(partFormData.supplierOrderQty, 10),
//       cycleTime: parseInt(partFormData.cycleTime, 10),
//     });
//     navigate("/part-table");
//   };

//   const handleSubmitProcessStep = (e: any) => {
//     e.preventDefault();
//     // Add your own logic here
//   };

//   const filteredData = data.filter((item) =>
//     item.partDesc.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 4; // Change this as needed

//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const paginatedData = filteredData.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   return (
//     <div className="p-4 md:p-7">
//       <div>
//         <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
//           Part Number
//         </h1>
//       </div>

//       <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
//         <p className="text-xs sm:text-sm md:text-base text-black">
//           <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//         </p>
//         <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//         <span className="text-xs sm:text-sm md:text-base hover:cursor-pointer">
//           product and Bom
//         </span>
//         <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//         <span className="text-xs sm:text-sm md:text-base hover:cursor-pointer">
//           Edit Part Number
//         </span>
//       </div>

//       <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
//         <form
//           onSubmit={handleSubmitPartForm}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//         >
//           {/* Part Family */}
//           <label className="block col-span-4 md:col-span-2">
//             Part Family
//             <select
//               name="partFamily"
//               value={partFormData.partFamily}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Select Part Family</option>
//               <option value="Cut Trim">Cut Trim</option>
//               <option value="Metal">Metal</option>
//               <option value="Plastic">Plastic</option>
//             </select>
//           </label>

//           {/* Part Number */}
//           <label className="block col-span-4 md:col-span-2">
//             Part Number
//             <input
//               type="text"
//               name="partNumber"
//               placeholder="Enter Part Number"
//               value={partFormData.partNumber}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full"
//             />
//           </label>

//           {/* Description */}
//           <label className="block col-span-4">
//             Part Description
//             <textarea
//               name="description"
//               placeholder="Part Description"
//               value={partFormData.description}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full"
//             ></textarea>
//           </label>

//           {/* Cost */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">Cost ($)</label>
//             <input
//               type="number"
//               name="cost"
//               placeholder="Enter Cost"
//               value={partFormData.cost}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Lead Time */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Lead Time (Days)
//             </label>
//             <input
//               type="number"
//               name="leadTime"
//               placeholder="Lead Time Days"
//               value={partFormData.leadTime}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Order Qty */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Order Quantity
//             </label>
//             <input
//               type="number"
//               name="supplierOrderQty"
//               placeholder="Order Qty"
//               value={partFormData.supplierOrderQty}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Company */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company"
//               value={partFormData.companyName}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Minimum Stock */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Minimum Stock
//             </label>
//             <input
//               type="number"
//               name="minStock"
//               placeholder="Minimum Stock"
//               value={partFormData.minStock}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Available Stock */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Available Stock
//             </label>
//             <input
//               type="number"
//               name="availableStock"
//               placeholder="Available Stock"
//               value={partFormData.availableStock}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Cycle Time */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Cycle Time
//             </label>
//             <input
//               type="number"
//               name="cycleTime"
//               placeholder="Cycle Time"
//               value={partFormData.cycleTime}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             />
//           </div>

//           {/* Availability (Yes/No) */}
//           <div className="col-span-4 md:col-span-1">
//             <label className="block text-sm md:text-base mb-1">
//               Process order required
//             </label>
//             <select
//               name="processOrder"
//               value={partFormData.processOrder}
//               onChange={handlePartFormChange}
//               className="border p-2 rounded w-full text-sm md:text-base"
//             >
//               <option value="Yes">Yes</option>
//               <option value="No">No</option>
//             </select>
//           </div>

//           <label className="block col-span-4 md:col-span-2">
//             Process
//             <select
//               name="process"
//               value={processStepFormData.process}
//               onChange={handleProcessStepChange}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Select Process</option>
//               <option value="Cutting">Cutting</option>
//               <option value="Molding">Molding</option>
//               <option value="Assembly">Assembly</option>
//             </select>
//           </label>

//           <label className="block col-span-4 md:col-span-2">
//             Process Description
//             <textarea
//               name="description"
//               placeholder="Process Description"
//               value={processStepFormData.description}
//               onChange={handleProcessStepChange}
//               className="border p-2 rounded w-full"
//             ></textarea>
//           </label>

//           <label className="border bg-gray-100 rounded p-4 text-sm cursor-pointer block text-center">
//             {partFormData.image ? (
//               <span className="text-gray-700">{partFormData.image.name}</span>
//             ) : (
//               "Tap or Click to Add Picture"
//             )}
//             <input
//               type="file"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   setPartFormData((prev: any) => ({ ...prev, image: file }));
//                 }
//               }}
//             />
//           </label>

//           <div className="flex justify-between items-center col-span-4">
//             <button
//               type="submit"
//               className="bg-brand text-white py-2 rounded px-4"
//             >
//               Add/Edit Part Number
//             </button>

//             <div className="bg-[#FF5630] p-3 rounded-full cursor-pointer">
//               <RiDeleteBin6Line color="white " fontSize={18} />
//             </div>
//           </div>
//         </form>
//       </div>

//       {/* <div>
//         <h1 className="font-bold text-lg mt-6">Process step table</h1>
//         <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
//           <form
//             onSubmit={handleSubmitProcessStep}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//           >
//             <label className="block col-span-4 md:col-span-2">
//               Process
//               <select
//                 name="process"
//                 value={processStepFormData.process}
//                 onChange={handleProcessStepChange}
//                 className="border p-2 rounded w-full"
//               >
//                 <option value="">Select Process</option>
//                 <option value="Cutting">Cutting</option>
//                 <option value="Molding">Molding</option>
//                 <option value="Assembly">Assembly</option>
//               </select>
//             </label>

//             <label className="block col-span-4 md:col-span-2">
//               Cycle Time
//               <input
//                 type="number"
//                 name="cycleTime"
//                 placeholder="Cycle Time"
//                 value={processStepFormData.cycleTime}
//                 onChange={handleProcessStepChange}
//                 className="border p-2 rounded w-full"
//               />
//             </label>

//             <label className="block col-span-4">
//               Process Description
//               <textarea
//                 name="description"
//                 placeholder="Process Description"
//                 value={processStepFormData.description}
//                 onChange={handleProcessStepChange}
//                 className="border p-2 rounded w-full"
//               ></textarea>
//             </label>

//             <label className="block col-span-4">
//               Total Cycle Time
//               <input
//                 type="number"
//                 name="totalCycleTime"
//                 placeholder="Enter Total Cycle Time"
//                 value={processStepFormData.totalCycleTime}
//                 onChange={handleProcessStepChange}
//                 className="border p-2 rounded w-full"
//               />
//             </label>

//             <div className="flex justify-between items-center col-span-4">
//               <button
//                 type="submit"
//                 className="bg-brand text-white py-2 rounded px-4"
//               >
//                 Save Process
//               </button>

//               <div className="bg-[#FF5630] p-3 rounded-full cursor-pointer">
//                 <RiDeleteBin6Line color="white " fontSize={18} />
//               </div>
//             </div>
//           </form>
//         </div>
//       </div> */}

//       <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
//         {/* Search bar */}
//         {/* <div className="flex justify-between items-center mb-4">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full px-4 py-2 border border-gray-300 rounded-md "
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <img src={more} alt="" />
//         </div> */}

//         {/* Table */}
//         <table className="text-sm w-full">
//           <thead className="bg-[#F4F6F8] text-left text-gray-500">
//             <tr>
//               <th className="px-4 py-3 font-medium">Process</th>
//               <th className="px-4 py-3 font-medium">Part Description</th>
//               <th className="px-4 py-3 font-medium">Cycle Time</th>
//               <th className="px-4 py-3 font-medium"></th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-800">
//             {paginatedData.map((item, index) => (
//               <tr
//                 key={index}
//                 className="border-b border-dashed border-gray-200"
//               >
//                 <td className="px-4 py-4">{item.process}</td>
//                 <td className="px-4 py-4">
//                   {item.partDesc.split("/")[0]} <br />/
//                   {item.partDesc.split("/")[1]}
//                 </td>
//                 <td className="px-4 py-4">{item.cycleTime}</td>
//                 <td className="px-4 py-4 flex items-center gap-4">
//                   <button>
//                     <img className="" src={edit} alt="Edit" />
//                   </button>
//                   <button>
//                     <img src={more} alt="More" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-end items-center py-4 gap-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-3 py-1 border rounded ${
//               currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Prev
//           </button>

//           <span className="text-sm text-gray-600">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className={`px-3 py-1 border rounded ${
//               currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PartForm;

const PartForm = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const context = useContext(PartContext);
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  if (!context)
    throw new Error("PartContext must be used within a PartProvider");
  const rowsPerPage = 5;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const { addPart } = context;

  const onSubmit = async (data: any) => {
    const parsedData = {
      ...data,
      cost: parseFloat(data.cost),
      leadTime: parseInt(data.leadTime, 10),
      supplierOrderQty: parseInt(data.supplierOrderQty, 10),
      cycleTime: parseInt(data.cycleTime, 10),
      image: data.image[0],
    };
    console.log("parsedDataparsedData", parsedData);

    addPart(parsedData);
    await createPartNumber(parsedData);
    // navigate("/part-table");
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

          <select
            {...register("processOrderRequired", {
              setValueAs: (v) => v === "true",
            })}
            className="border p-2 rounded w-full"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

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

          <label className="block col-span-4 md:col-span-2 cursor-pointer border bg-gray-100 p-4 rounded text-center">
            {watch("image")?.[0]?.name || "Tap or Click to Add Picture"}
            <input type="file" {...register("image")} className="hidden" />
          </label>

          <div className="flex justify-between items-center col-span-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 rounded px-4"
            >
              Add/Edit Part Number
            </button>
            <div className="bg-[#FF5630] p-3 rounded-full cursor-pointer">
              <RiDeleteBin6Line color="white" fontSize={18} />
            </div>
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
              <th className="px-4 py-3 font-medium">partFamily</th>
              <th className="px-4 py-3 font-medium">Cost</th>
              <th className="px-4 py-3 font-medium">Cycle Time</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {partData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-gray-200"
              >
                <td className="px-4 py-4">{item.process.processName}</td>
                <td className="px-4 py-4">{item.partNumber}</td>
                <td className="px-4 py-4">{item.partFamily}</td>
                <td className="px-4 py-4">{item.cost}</td>
                <td className="px-4 py-4">{item.cycleTime}</td>
                {/* <td className="px-4 py-4 flex items-center gap-4">
                  <button>
                    <img src={edit} alt="Edit" />
                  </button>
                  <button>
                    <img src={more} alt="More" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
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

export default PartForm;
