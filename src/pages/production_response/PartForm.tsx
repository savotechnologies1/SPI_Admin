import { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import {
  ScrapEntryApi,
  selectPartNamber1,
} from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";
import {
  createPartNumber,
  deletePartNumber,
  getProcessDetail,
  partNumberList,
  selectPartNamber,
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

// const PartForm = () => {
//   const navigate = useNavigate();
//   const context = useContext(PartContext);

//   const [processData, setProcessData] = useState<ProcessItem[]>([]);
//   const [partData, setPartData] = useState<PartItem[]>([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
//   const [suppliers, setSuppliers] = useState<Supplier[]>([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);

//   const rowsPerPage = 5;

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<FormDataType>({
//     defaultValues: {
//       supplierOrderQty: 0,
//       availStock: 0,
//       minStock: 0,
//       image: [],
//     },
//   });

//   const processId = watch("processId");
//   const processOrderRequired = watch("processOrderRequired");
//   const isProcessRequired = processOrderRequired === "true";

//   if (!context) {
//     throw new Error("PartContext must be used within a PartProvider");
//   }

//   // Fetch Initial Data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [processList, supplierList] = await Promise.all([
//           selectProcess(),
//           selectSupplier(),
//         ]);
//         setProcessData(processList);
//         setSuppliers(supplierList);
//       } catch (error) {
//         console.error("Error loading initial data", error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     getAllPartList(currentPage);
//   }, [currentPage]);

//   const getAllPartList = async (page: number) => {
//     try {
//       const response = await partNumberList(page, rowsPerPage);
//       setPartData(response.data);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Process details on change
//   useEffect(() => {
//     const fetchProcessDetail = async () => {
//       if (!processId) {
//         setValue("processDesc", "");
//         return;
//       }
//       try {
//         const res = await getProcessDetail(processId);
//         setValue("processDesc", res.data?.processDesc || "");
//       } catch (err) {
//         setValue("processDesc", "");
//       }
//     };
//     fetchProcessDetail();
//   }, [processId, setValue]);

//   const filteredSuppliers = suppliers.filter((s) =>
//     s.name?.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const onSubmit = async (data: FormDataType) => {
//     try {
//       const formData = new FormData();
//       // Append all text fields
//       Object.entries(data).forEach(([key, value]) => {
//         if (key !== "image") {
//           formData.append(key, String(value));
//         }
//       });

//       // Append images from state
//       selectedImages.forEach((file) => {
//         formData.append("partImages", file);
//       });

//       const response = await createPartNumber(formData);
//       if (response && response.status === 201) {
//         navigate("/part-table");
//       }
//     } catch (error) {
//       toast.error("Failed to create part");
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       await deletePartNumber(id);
//       toast.success("Part deleted!");
//       getAllPartList(currentPage);
//       setItemToDeleteId(null);
//     } catch (error) {
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="p-4 md:p-7">
//       <h1 className="font-bold text-lg md:text-xl lg:text-2xl">Part Number</h1>

//       {/* Breadcrumbs */}
//       <div className="flex flex-wrap items-center mt-2 gap-2 text-sm">
//         <NavLink to="/dashboardDetailes">Dashboard</NavLink>
//         <FaCircle className="text-[4px] text-gray-500" />
//         <NavLink to="/part-table">Product and BOM</NavLink>
//         <FaCircle className="text-[4px] text-gray-500" />
//         <span className="text-gray-500">Add Part Number</span>
//       </div>

//       <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//         >
//           {/* Part Family */}
//           <div className="col-span-4 md:col-span-2">
//             <label className="font-semibold block mb-1">Part Family</label>
//             <select
//               {...register("partFamily", { required: "Required" })}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Select Part Family</option>
//               {processData.map((item) => (
//                 <option key={item.id} value={item.partFamily}>
//                   {item.partFamily}
//                 </option>
//               ))}
//             </select>
//             {errors.partFamily && (
//               <p className="text-red-500 text-xs">
//                 {errors.partFamily.message}
//               </p>
//             )}
//           </div>

//           {/* Part Number */}
//           <div className="col-span-4 md:col-span-2">
//             <label className="font-semibold block mb-1">Part Number</label>
//             <input
//               {...register("partNumber", { required: "Required" })}
//               placeholder="Enter Part Number"
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           {/* Description */}
//           <div className="col-span-4">
//             <label className="font-semibold block mb-1">Part Description</label>
//             <textarea
//               {...register("partDescription", { required: "Required" })}
//               className="border p-2 rounded w-full"
//               rows={2}
//             />
//           </div>

//           {/* Cost, Lead Time, Qty */}
//           <div className="col-span-1">
//             <label className="font-semibold block mb-1">Cost ($)</label>
//             <input
//               type="number"
//               step="0.01"
//               {...register("cost")}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           {/* Supplier Search Dropdown */}
//           <div className="col-span-4 md:col-span-1 relative">
//             <label className="font-semibold block mb-1">Supplier</label>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setShowDropdown(true);
//               }}
//               onFocus={() => setShowDropdown(true)}
//               placeholder="Search Supplier..."
//               className="border p-2 rounded w-full"
//             />
//             {showDropdown && filteredSuppliers.length > 0 && (
//               <ul className="absolute z-[100] w-full bg-white border mt-1 max-h-40 overflow-y-auto shadow-lg">
//                 {filteredSuppliers.map((s) => (
//                   <li
//                     key={s.id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     onMouseDown={() => {
//                       setSearchTerm(s.name);
//                       setValue("companyName", s.id);
//                       setShowDropdown(false);
//                     }}
//                   >
//                     {s.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Min Stock, Avail Stock, Cycle Time */}
//           <div className="col-span-1">
//             <label className="font-semibold block mb-1">Min Stock</label>
//             <input
//               type="number"
//               {...register("minStock")}
//               className="border p-2 rounded w-full"
//             />
//           </div>
//           <div className="col-span-1">
//             <label className="font-semibold block mb-1">Cycle Time (min)</label>
//             <input
//               type="number"
//               {...register("cycleTime")}
//               className="border p-2 rounded w-full"
//             />
//           </div>

//           <div className="col-span-1">
//             <label className="font-semibold block mb-1">
//               Process Order Required?
//             </label>
//             <select
//               {...register("processOrderRequired")}
//               className="border p-2 rounded w-full"
//             >
//               <option value="false">No</option>
//               <option value="true">Yes</option>
//             </select>
//           </div>

//           {/* Conditional Process Fields */}
//           {isProcessRequired && (
//             <>
//               <div className="col-span-2">
//                 <label className="font-semibold block mb-1">
//                   Select Process
//                 </label>
//                 <select
//                   {...register("processId")}
//                   className="border p-2 rounded w-full"
//                 >
//                   <option value="">Choose...</option>
//                   {processData.map((p) => (
//                     <option key={p.id} value={p.id}>
//                       {p.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-span-2">
//                 <label className="font-semibold block mb-1">Process Desc</label>
//                 <textarea
//                   {...register("processDesc")}
//                   className="border p-2 rounded w-full"
//                   rows={1}
//                 />
//               </div>
//             </>
//           )}

//           {/* Image Previews Section */}
//           <div className="col-span-4 mt-2">
//             <div className="flex flex-wrap gap-4">
//               {selectedImages.map((file, index) => (
//                 <div key={index} className="relative inline-block">
//                   {/* Outer div doesn't have overflow-hidden so icon can sit on edge */}
//                   <div className="w-24 h-24 border rounded-lg overflow-hidden bg-gray-50">
//                     <img
//                       src={URL.createObjectURL(file)}
//                       alt="preview"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   {/* Cancel Button - Positioned exactly on the corner */}
//                   <button
//                     type="button"
//                     onClick={() => {
//                       const updated = selectedImages.filter(
//                         (_, i) => i !== index,
//                       );
//                       setSelectedImages(updated);
//                       setValue("image", updated);
//                     }}
//                     className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full shadow-md hover:scale-110 transition-transform z-20"
//                   >
//                     <MdCancel size={24} />
//                   </button>
//                 </div>
//               ))}

//               {/* Add Button */}
//               <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
//                 <span className="text-xs text-gray-500 font-medium text-center px-1">
//                   Add Images
//                 </span>
//                 <input
//                   type="file"
//                   multiple
//                   accept="image/*"
//                   className="hidden"
//                   onChange={(e) => {
//                     const files = e.target.files;
//                     if (files) {
//                       const arr = Array.from(files);
//                       const newSet = [...selectedImages, ...arr];
//                       setSelectedImages(newSet);
//                       setValue("image", newSet);
//                     }
//                   }}
//                 />
//               </label>
//             </div>
//           </div>

//           <div className="col-span-4 mt-4">
//             <button
//               type="submit"
//               className="bg-brand text-white py-2 px-6 rounded-lg font-semibold hover:bg-opacity-90"
//             >
//               Add/Edit Part Number
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Table Section */}
//       <div className="mt-8 bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="p-3">Process</th>
//               <th className="p-3">Part Number</th>
//               <th className="p-3">Part Family</th>
//               <th className="p-3">Cost</th>
//               <th className="p-3">Cycle Time</th>
//               <th className="p-3">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {partData.map((item) => (
//               <tr key={item.part_id} className="hover:bg-gray-50 transition">
//                 <td className="p-3">{item.process?.processName || "N/A"}</td>
//                 <td className="p-3 font-medium">{item.partNumber}</td>
//                 <td className="p-3">{item.partFamily}</td>
//                 <td className="p-3">${item.cost}</td>
//                 <td className="p-3">{item.cycleTime} min</td>
//                 <td className="p-3">
//                   <button onClick={() => setItemToDeleteId(item.part_id)}>
//                     <FaTrash className="text-red-500 hover:scale-110 transition" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {itemToDeleteId && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000]">
//           <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full mx-4">
//             <h2 className="text-xl font-bold mb-2">Delete Part?</h2>
//             <p className="text-gray-600 mb-6">
//               This action cannot be undone. Are you sure?
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 className="px-4 py-2 bg-gray-100 rounded-lg"
//                 onClick={() => setItemToDeleteId(null)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                 onClick={() => handleDelete(itemToDeleteId)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const PartForm = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       supplier: "",
//       supplierId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "part",
//       defectDesc: "", // Key is already here
//     },
//     onSubmit: async (values, { setSubmitting }) => {
//       const payload = {
//         ...values,
//         type: "part",
//         returnQuantity: parseInt(values.returnQuantity, 10) || 0,
//         // defectDesc is automatically included via ...values
//       };

//       try {
//         setSubmitting(true);
//         await ScrapEntryApi(payload);
//         formik.resetForm();
//         setSuggestions([]);
//         setSupplierSuggestions([]);
//       } catch (error) {
//         console.error("Submission failed:", error);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   useEffect(() => {
//     (async () => {
//       try {
//         const parts = await selectPartNamber();
//         const suppliers = await selectSupplier();
//         setPartData(parts?.data || []);
//         setSupplierData(suppliers || []);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []);

//   // Filter logic for Part Suggestions
//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filtered = partData.filter((part) =>
//         part?.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase()),
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   // Filter logic for Supplier Suggestions
//   useEffect(() => {
//     if (formik.values.supplier && !formik.values.supplierId) {
//       const filtered = supplierData.filter((supplier) =>
//         supplier.name
//           .toLowerCase()
//           .includes(formik.values.supplier.toLowerCase()),
//       );
//       setSupplierSuggestions(filtered);
//     } else {
//       setSupplierSuggestions([]);
//     }
//   }, [formik.values.supplier, formik.values.supplierId, supplierData]);

//   const handleSuggestionClick = (part) => {
//     formik.setFieldValue("searchPart", part.partNumber);
//     formik.setFieldValue("partId", part.id);
//     setSuggestions([]);
//   };

//   const handleSupplierClick = (supplier) => {
//     formik.setFieldValue("supplier", supplier.name);
//     formik.setFieldValue("supplierId", supplier.id);
//     setSupplierSuggestions([]);
//   };

//   const handleReset = () => {
//     formik.resetForm();
//     setSuggestions([]);
//     setSupplierSuggestions([]);
//   };

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit} autoComplete="off">
//         {/* Part Input */}
//         <div className="bg-white p-4 relative">
//           <label className="block font-semibold mb-1">Search Part</label>
//           <input
//             type="text"
//             placeholder="Search part ....."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
//             value={formik.values.searchPart}
//             onChange={(e) => {
//               formik.setFieldValue("searchPart", e.target.value);
//               formik.setFieldValue("partId", "");
//             }}
//             onFocus={() => {
//               if (formik.values.searchPart) {
//                 const filtered = partData.filter((part) =>
//                   part.partNumber
//                     .toLowerCase()
//                     .includes(formik.values.searchPart.toLowerCase()),
//                 );
//                 setSuggestions(filtered);
//               } else {
//                 setSuggestions(partData);
//               }
//             }}
//             onBlur={() => {
//               setTimeout(() => setSuggestions([]), 150);
//             }}
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute z-50 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//               {suggestions.map((part) => (
//                 <li
//                   key={part.id}
//                   className="p-2 hover:bg-brand hover:text-white cursor-pointer"
//                   onClick={() => handleSuggestionClick(part)}
//                 >
//                   {part.partNumber} (Stock: {part.stock})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Supplier Input */}
//         <div className="bg-white p-4 relative mt-4">
//           <label className="block font-semibold mb-1">Supplier</label>
//           <input
//             type="text"
//             placeholder="Search Supplier"
//             className="border py-3 px-4 rounded-md w-full text-gray-600"
//             value={formik.values.supplier}
//             onChange={(e) => {
//               formik.setFieldValue("supplier", e.target.value);
//               formik.setFieldValue("supplierId", "");
//             }}
//             onFocus={() => {
//               if (formik.values.supplier) {
//                 const filtered = supplierData.filter((s) =>
//                   s.name
//                     .toLowerCase()
//                     .includes(formik.values.supplier.toLowerCase()),
//                 );
//                 setSupplierSuggestions(filtered);
//               } else {
//                 setSupplierSuggestions(supplierData);
//               }
//             }}
//             onBlur={() => {
//               setTimeout(() => setSupplierSuggestions([]), 150);
//             }}
//           />
//           {supplierSuggestions.length > 0 && (
//             <ul className="absolute z-50 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//               {supplierSuggestions.map((supplier) => (
//                 <li
//                   key={supplier.id}
//                   className="p-2 hover:bg-brand hover:text-white cursor-pointer"
//                   onClick={() => handleSupplierClick(supplier)}
//                 >
//                   {supplier.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Return Quantity & Scrap Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 mt-4">
//           <div>
//             <label className="block font-semibold mb-1">Return Quantity</label>
//             <input
//               type="number"
//               placeholder="Enter Return Quantity"
//               className="border py-3 px-4 rounded-md w-full text-gray-600"
//               {...formik.getFieldProps("returnQuantity")}
//               min="0"
//               onKeyDown={(e) => {
//                 if (["e", "E", "+", "-", "."].includes(e.key)) {
//                   e.preventDefault();
//                 }
//               }}
//             />
//           </div>
//           <div>
//             <label className="block font-semibold mb-1">Scrap Status</label>
//             <select
//               className="border py-3 px-4 rounded-md w-full text-gray-600"
//               {...formik.getFieldProps("scrapStatus")}
//             >
//               <option value="yes">Yes</option>
//               <option value="no">No</option>
//             </select>
//           </div>
//         </div>

//         {/* ✅ NEW: Description / Defect Description Field */}
//         <div className="bg-white p-4 mt-4">
//           <label className="block font-semibold mb-1">Defect Description</label>
//           <textarea
//             rows={3}
//             placeholder="Describe the defect or reason for scrap..."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
//             {...formik.getFieldProps("defectDesc")}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center justify-between bg-white p-6 mt-4">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md"
//             disabled={formik.isSubmitting}
//           >
//             {formik.isSubmitting ? "Saving..." : "Save Scrap"}
//           </button>
//           <button
//             type="button"
//             onClick={handleReset}
//             className="ml-4 px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md flex items-center"
//           >
//             <span className="text-lg mr-1">🔄</span> Reset
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const PartForm = () => {
//   const [partData, setPartData] = useState([]); // For Parts
//   const [productData, setProductData] = useState([]); // For Products
//   const [suggestions, setSuggestions] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       type: "part", // Default type 'part'
//       searchItem: "", // Dynamic label (Part or Product)
//       itemId: "", // Stores the selected ID (part_id)
//       supplier: "",
//       supplierId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       defectDesc: "",
//     },
//     onSubmit: async (values, { setSubmitting }) => {
//       // Mapping values to match backend ScrapEntry schema
//       const payload = {
//         ...values,
//         partId: values.itemId, // Backend expects partId for both parts/products in scapEntries
//         returnQuantity: parseInt(values.returnQuantity, 10) || 0,
//       };

//       try {
//         setSubmitting(true);
//         const res = await ScrapEntryApi(payload);
//         if (res) {
//           toast.success("Scrap entry saved successfully!");
//           formik.resetForm();
//           setSuggestions([]);
//           setSupplierSuggestions([]);
//         }
//       } catch (error) {
//         toast.error("Submission failed");
//         console.error("Submission failed:", error);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   // Data Fetching: Parts, Products, and Suppliers
//   useEffect(() => {
//     (async () => {
//       try {
//         const [parts, products, suppliers] = await Promise.all([
//           selectPartNamber1(), // API for type='part'
//           // selectProductNamber(), // API for type='product'
//           selectSupplier(),
//         ]);
//         setPartData(parts?.data || []);
//         setProductData(products?.data || []);
//         setSupplierData(suppliers || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     })();
//   }, []);

//   // Filter logic for Part/Product Suggestions based on "type"
//   useEffect(() => {
//     const currentList = formik.values.type === "part" ? partData : productData;

//     if (formik.values.searchItem && !formik.values.itemId) {
//       const filtered = currentList.filter((item) =>
//         item?.partNumber
//           ?.toLowerCase()
//           .includes(formik.values.searchItem.toLowerCase()),
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   }, [
//     formik.values.searchItem,
//     formik.values.itemId,
//     formik.values.type,
//     partData,
//     productData,
//   ]);

//   // Filter logic for Supplier Suggestions
//   useEffect(() => {
//     if (formik.values.supplier && !formik.values.supplierId) {
//       const filtered = supplierData.filter((supplier) =>
//         supplier.name
//           ?.toLowerCase()
//           .includes(formik.values.supplier.toLowerCase()),
//       );
//       setSupplierSuggestions(filtered);
//     } else {
//       setSupplierSuggestions([]);
//     }
//   }, [formik.values.supplier, formik.values.supplierId, supplierData]);

//   const handleSuggestionClick = (item) => {
//     formik.setFieldValue("searchItem", item.partNumber);
//     formik.setFieldValue("itemId", item.part_id || item.id);
//     setSuggestions([]);
//   };

//   const handleSupplierClick = (supplier) => {
//     formik.setFieldValue("supplier", supplier.name);
//     formik.setFieldValue("supplierId", supplier.id);
//     setSupplierSuggestions([]);
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <form onSubmit={formik.handleSubmit} autoComplete="off">
//         {/* Toggle between Part and Product */}
//         <div className="bg-white p-4 mb-4 rounded-md shadow-sm border">
//           <label className="block font-bold mb-2 text-gray-700">
//             Select Entry Type
//           </label>
//           <div className="flex gap-6">
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="type"
//                 value="part"
//                 className="mr-2 w-4 h-4"
//                 checked={formik.values.type === "part"}
//                 onChange={() => {
//                   formik.setFieldValue("type", "part");
//                   formik.setFieldValue("searchItem", "");
//                   formik.setFieldValue("itemId", "");
//                 }}
//               />
//               Part Entry
//             </label>
//             <label className="flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="type"
//                 value="product"
//                 className="mr-2 w-4 h-4"
//                 checked={formik.values.type === "product"}
//                 onChange={() => {
//                   formik.setFieldValue("type", "product");
//                   formik.setFieldValue("searchItem", "");
//                   formik.setFieldValue("itemId", "");
//                 }}
//               />
//               Product Entry
//             </label>
//           </div>
//         </div>

//         {/* Dynamic Search Input (Part or Product) */}
//         <div className="bg-white p-4 relative border rounded-md">
//           <label className="block font-semibold mb-1">
//             Search {formik.values.type === "part" ? "Part" : "Product"}
//           </label>
//           <input
//             type="text"
//             placeholder={`Search ${formik.values.type}...`}
//             className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
//             value={formik.values.searchItem}
//             onChange={(e) => {
//               formik.setFieldValue("searchItem", e.target.value);
//               formik.setFieldValue("itemId", "");
//             }}
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute left-4 right-4 z-50 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
//               {suggestions.map((item) => (
//                 <li
//                   key={item.part_id || item.id}
//                   className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b last:border-0"
//                   onClick={() => handleSuggestionClick(item)}
//                 >
//                   <div className="font-medium">{item.partNumber}</div>
//                   <div className="text-xs opacity-80">
//                     {item.partDescription}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Supplier Input */}
//         <div className="bg-white p-4 relative mt-4 border rounded-md">
//           <label className="block font-semibold mb-1">Supplier</label>
//           <input
//             type="text"
//             placeholder="Search Supplier..."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
//             value={formik.values.supplier}
//             onChange={(e) => {
//               formik.setFieldValue("supplier", e.target.value);
//               formik.setFieldValue("supplierId", "");
//             }}
//           />
//           {supplierSuggestions.length > 0 && (
//             <ul className="absolute left-4 right-4 z-50 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
//               {supplierSuggestions.map((s) => (
//                 <li
//                   key={s.id}
//                   className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b last:border-0"
//                   onClick={() => handleSupplierClick(s)}
//                 >
//                   {s.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Quantity & Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           <div className="bg-white p-4 border rounded-md">
//             <label className="block font-semibold mb-1">Return Quantity</label>
//             <input
//               type="number"
//               className="border py-3 px-4 rounded-md w-full"
//               {...formik.getFieldProps("returnQuantity")}
//             />
//           </div>
//           <div className="bg-white p-4 border rounded-md">
//             <label className="block font-semibold mb-1">Scrap Status</label>
//             <select
//               className="border py-3 px-4 rounded-md w-full"
//               {...formik.getFieldProps("scrapStatus")}
//             >
//               <option value="yes">Yes (Scrapped)</option>
//               <option value="no">No (Return to Inventory)</option>
//             </select>
//           </div>
//         </div>

//         {/* Defect Description */}
//         <div className="bg-white p-4 mt-4 border rounded-md">
//           <label className="block font-semibold mb-1">Defect Description</label>
//           <textarea
//             rows={3}
//             placeholder="Reason for scrap..."
//             className="border py-3 px-4 rounded-md w-full text-gray-600"
//             {...formik.getFieldProps("defectDesc")}
//           />
//         </div>

//         {/* Form Buttons */}
//         <div className="flex items-center justify-between bg-white p-6 mt-4 border rounded-md">
//           <button
//             type="submit"
//             className="px-8 py-3 bg-blue-600 text-white font-bold hover:bg-blue-800 transition rounded-md shadow-md disabled:bg-gray-400"
//             disabled={formik.isSubmitting || !formik.values.itemId}
//           >
//             {formik.isSubmitting ? "Saving..." : "Submit Entry"}
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               formik.resetForm();
//               setSuggestions([]);
//               setSupplierSuggestions([]);
//             }}
//             className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md font-bold"
//           >
//             Reset Form
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// const PartForm = () => {
//   const [partData, setPartData] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [partSuggestions, setPartSuggestions] = useState([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       type: "part", // Backend controller expects this
//       searchPart: "", // UI Input field
//       partId: "", // For Backend
//       supplier: "", // UI Input field
//       supplierId: "", // For Backend
//       returnQuantity: "",
//       scrapStatus: "yes", // "yes" or "no"
//       defectDesc: "",
//     },
//     onSubmit: async (values, { setSubmitting }) => {
//       // Backend Payload Mapping
//       const payload = {
//         type: values.type,
//         partId: values.partId,
//         supplierId: values.supplierId || null,
//         returnQuantity: Number(values.returnQuantity),
//         scrapStatus: values.scrapStatus,
//         defectDesc: values.defectDesc,
//       };

//       try {
//         setSubmitting(true);
//         const res = await ScrapEntryApi(payload);
//         if (res) {
//           toast.success("Scrap entry created successfully");
//           formik.resetForm();
//           setPartSuggestions([]);
//           setSupplierSuggestions([]);
//         }
//       } catch (error: any) {
//         const errorMsg = error.response?.data?.message || "Submission failed";
//         toast.error(errorMsg);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   // Initial Data Fetching
//   useEffect(() => {
//     (async () => {
//       try {
//         const [parts, suppliers] = await Promise.all([
//           selectPartNamber1(),
//           selectSupplier(),
//         ]);
//         setPartData(parts?.data || []);
//         setSupplierData(suppliers || []);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       }
//     })();
//   }, []);

//   // Real-time Part Filtering
//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filtered = partData.filter((p: any) =>
//         p.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase()),
//       );
//       setPartSuggestions(filtered);
//     } else {
//       setPartSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   // Real-time Supplier Filtering
//   useEffect(() => {
//     if (formik.values.supplier && !formik.values.supplierId) {
//       const filtered = supplierData.filter((s: any) =>
//         s.name.toLowerCase().includes(formik.values.supplier.toLowerCase()),
//       );
//       setSupplierSuggestions(filtered);
//     } else {
//       setSupplierSuggestions([]);
//     }
//   }, [formik.values.supplier, formik.values.supplierId, supplierData]);

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-6">Create Scrap Entry</h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         {/* PART SEARCH INPUT */}
//         <div className="bg-white p-4 border rounded-md relative">
//           <label className="block font-semibold mb-1 text-gray-700">
//             Search Part *
//           </label>
//           <input
//             type="text"
//             placeholder="Type part number..."
//             className="border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
//             value={formik.values.searchPart}
//             onChange={(e) => {
//               formik.setFieldValue("searchPart", e.target.value);
//               formik.setFieldValue("partId", ""); // Reset ID if typing
//             }}
//           />
//           {partSuggestions.length > 0 && (
//             <ul className="absolute left-4 right-4 z-50 bg-white border rounded-md mt-1 max-h-48 overflow-y-auto shadow-xl">
//               {partSuggestions.map((p: any) => (
//                 <li
//                   key={p.part_id}
//                   className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b"
//                   onClick={() => {
//                     formik.setFieldValue("searchPart", p.partNumber);
//                     formik.setFieldValue("partId", p.part_id);
//                     setPartSuggestions([]);
//                   }}
//                 >
//                   <div className="font-bold">{p.partNumber}</div>
//                   <div className="text-xs">Stock: {p.availStock}</div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* SUPPLIER SEARCH INPUT */}
//         <div className="bg-white p-4 border rounded-md relative">
//           <label className="block font-semibold mb-1 text-gray-700">
//             Supplier (Optional)
//           </label>
//           <input
//             type="text"
//             placeholder="Search supplier..."
//             className="border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
//             value={formik.values.supplier}
//             onChange={(e) => {
//               formik.setFieldValue("supplier", e.target.value);
//               formik.setFieldValue("supplierId", "");
//             }}
//           />
//           {supplierSuggestions.length > 0 && (
//             <ul className="absolute left-4 right-4 z-50 bg-white border rounded-md mt-1 max-h-48 overflow-y-auto shadow-xl">
//               {supplierSuggestions.map((s: any) => (
//                 <li
//                   key={s.id}
//                   className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b"
//                   onClick={() => {
//                     formik.setFieldValue("supplier", s.name);
//                     formik.setFieldValue("supplierId", s.id);
//                     setSupplierSuggestions([]);
//                   }}
//                 >
//                   {s.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* RETURN QUANTITY & SCRAP STATUS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="bg-white p-4 border rounded-md">
//             <label className="block font-semibold mb-1 text-gray-700">
//               Return Quantity *
//             </label>
//             <input
//               type="number"
//               placeholder="0"
//               className="border py-3 px-4 rounded-md w-full"
//               {...formik.getFieldProps("returnQuantity")}
//             />
//           </div>
//           <div className="bg-white p-4 border rounded-md">
//             <label className="block font-semibold mb-1 text-gray-700">
//               Scrap Status
//             </label>
//             <select
//               className="border py-3 px-4 rounded-md w-full"
//               {...formik.getFieldProps("scrapStatus")}
//             >
//               <option value="yes">Yes (Decrease Stock)</option>
//               <option value="no">No (Return only)</option>
//             </select>
//           </div>
//         </div>

//         {/* DEFECT DESCRIPTION */}
//         <div className="bg-white p-4 border rounded-md">
//           <label className="block font-semibold mb-1 text-gray-700">
//             Defect Description
//           </label>
//           <textarea
//             rows={3}
//             placeholder="Reason for scrap or defect details..."
//             className="border py-3 px-4 rounded-md w-full outline-none focus:ring-2 focus:ring-blue-500"
//             {...formik.getFieldProps("defectDesc")}
//           />
//         </div>

//         {/* ACTIONS */}
//         <div className="flex items-center justify-between pt-4">
//           <button
//             type="submit"
//             disabled={
//               formik.isSubmitting ||
//               !formik.values.partId ||
//               !formik.values.returnQuantity
//             }
//             className="px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition disabled:bg-gray-400"
//           >
//             {formik.isSubmitting ? "Processing..." : "Save Scrap Entry"}
//           </button>

//           <button
//             type="button"
//             onClick={() => {
//               formik.resetForm();
//               setPartSuggestions([]);
//               setSupplierSuggestions([]);
//             }}
//             className="px-6 py-3 border border-red-500 text-red-500 font-semibold rounded-md hover:bg-red-50"
//           >
//             Reset
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// --- Types for better development ---
interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  availStock: number;
}

interface Supplier {
  id: string;
  name: string;
}

const PartForm = () => {
  // States for Data and Suggestions
  const [partData, setPartData] = useState<Part[]>([]);
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [partSuggestions, setPartSuggestions] = useState<Part[]>([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState<Supplier[]>(
    [],
  );

  const formik = useFormik({
    initialValues: {
      type: "part", // Required by your backend API
      searchPart: "", // Input field text
      partId: "", // Actual ID for backend
      supplier: "", // Input field text
      supplierId: "", // Actual ID for backend
      returnQuantity: "",
      scrapStatus: "yes", // Matches "yes" or "no" logic in controller
      defectDesc: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Mapping values exactly to your Backend Controller keys
      const payload = {
        type: values.type,
        partId: values.partId,
        supplierId: values.supplierId || null,
        returnQuantity: Number(values.returnQuantity),
        scrapStatus: values.scrapStatus,
        defectDesc: values.defectDesc,
      };

      try {
        setSubmitting(true);
        const res = await ScrapEntryApi(payload);
        if (res) {
          toast.success("Scrap entry created successfully");
          resetForm();
          setPartSuggestions([]);
          setSupplierSuggestions([]);
        }
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message || "Internal server error";
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // 1. Initial Data Load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [partsRes, suppliersRes] = await Promise.all([
          selectPartNamber1(),
          selectSupplier(),
        ]);

        // Handle both formats: { data: [...] } OR direct array [...]
        const parts = Array.isArray(partsRes) ? partsRes : partsRes?.data || [];
        const suppliers = Array.isArray(suppliersRes)
          ? suppliersRes
          : suppliersRes?.data || [];

        setPartData(parts);
        setSupplierData(suppliers);

        console.log("Parts Loaded:", parts); // Debugging ke liye
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load parts or suppliers");
      }
    };
    loadInitialData();
  }, []);

  // 2. Real-time Part Filtering (Jaise hi type karein)
  useEffect(() => {
    const query = formik.values.searchPart.trim().toLowerCase();

    // Sirf tab filter karein jab input ho aur ID select na hui ho
    if (query && !formik.values.partId) {
      const filtered = partData.filter((p) =>
        p.partNumber?.toLowerCase().includes(query),
      );
      setPartSuggestions(filtered);
    } else {
      setPartSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, partData]);

  // 3. Real-time Supplier Filtering
  useEffect(() => {
    const query = formik.values.supplier.trim().toLowerCase();

    if (query && !formik.values.supplierId) {
      const filtered = supplierData.filter((s) =>
        s.name?.toLowerCase().includes(query),
      );
      setSupplierSuggestions(filtered);
    } else {
      setSupplierSuggestions([]);
    }
  }, [formik.values.supplier, formik.values.supplierId, supplierData]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          New Scrap Entry
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          autoComplete="off"
        >
          {/* PART SEARCH INPUT */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Search Part Number *
            </label>
            <input
              type="text"
              name="searchPart"
              placeholder="Start typing part number (e.g. part1)..."
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              value={formik.values.searchPart}
              onChange={(e) => {
                formik.setFieldValue("searchPart", e.target.value);
                formik.setFieldValue("partId", ""); // Clear ID while typing
              }}
            />
            {/* Part Suggestions Dropdown */}
            {partSuggestions.length > 0 && (
              <ul className="absolute z-[100] left-0 right-0 bg-white border-2 border-blue-100 rounded-lg mt-1 max-h-56 overflow-y-auto shadow-2xl">
                {partSuggestions.map((p) => (
                  <li
                    key={p.part_id}
                    className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b last:border-0 transition"
                    onClick={() => {
                      formik.setFieldValue("searchPart", p.partNumber);
                      formik.setFieldValue("partId", p.part_id);
                      setPartSuggestions([]);
                    }}
                  >
                    <div className="font-bold">{p.partNumber}</div>
                    <div className="text-xs opacity-80">
                      {p.partDescription} | Stock: {p.availStock}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SUPPLIER SEARCH INPUT */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Supplier (Optional)
            </label>
            <input
              type="text"
              name="supplier"
              placeholder="Search supplier name..."
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              value={formik.values.supplier}
              onChange={(e) => {
                formik.setFieldValue("supplier", e.target.value);
                formik.setFieldValue("supplierId", "");
              }}
            />
            {/* Supplier Suggestions Dropdown */}
            {supplierSuggestions.length > 0 && (
              <ul className="absolute z-[100] left-0 right-0 bg-white border-2 border-green-100 rounded-lg mt-1 max-h-56 overflow-y-auto shadow-2xl">
                {supplierSuggestions.map((s) => (
                  <li
                    key={s.id}
                    className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b last:border-0 transition"
                    onClick={() => {
                      formik.setFieldValue("supplier", s.name);
                      formik.setFieldValue("supplierId", s.id);
                      setSupplierSuggestions([]);
                    }}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RETURN QUANTITY & STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Quantity to Scrap *
              </label>
              <input
                type="number"
                name="returnQuantity"
                placeholder="0"
                className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formik.values.returnQuantity}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Update Stock (Scrap Status)
              </label>
              <select
                name="scrapStatus"
                className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg outline-none focus:border-blue-500 bg-white"
                value={formik.values.scrapStatus}
                onChange={formik.handleChange}
              >
                <option value="yes">Yes (Decrease Inventory)</option>
                <option value="no">No (Log Only)</option>
              </select>
            </div>
          </div>

          {/* DEFECT DESCRIPTION */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Defect Description / Reason
            </label>
            <textarea
              name="defectDesc"
              rows={3}
              placeholder="Why is this being scrapped?"
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg outline-none focus:border-blue-500"
              value={formik.values.defectDesc}
              onChange={formik.handleChange}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={
                formik.isSubmitting ||
                !formik.values.partId ||
                !formik.values.returnQuantity
              }
              className="flex-1 bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-800 transition shadow-lg disabled:bg-gray-400 disabled:shadow-none"
            >
              {formik.isSubmitting ? "Saving Entry..." : "Submit Scrap Entry"}
            </button>
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setPartSuggestions([]);
                setSupplierSuggestions([]);
              }}
              className="py-4 px-8 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartForm;
