// import React, { useState, useEffect } from "react";
// import { useFormik } from "formik";
// import { ScrapEntryApi, selectPartNamber } from "./https/productionResponseApi";
// import { selectSupplier } from "../supplier_chain/https/suppliersApi";
// import { NavLink } from "react-router-dom";
// import { FaCircle } from "react-icons/fa";

// const EditPartScrapEntry = () => {
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
//     },
//     onSubmit: async (values) => {
//       console.log("Form Submitted:", values);
//       await ScrapEntryApi({ ...values, type: "part" });
//       formik.resetForm();
//       setSuggestions([]);
//       setSupplierSuggestions([]);
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

//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filtered = partData.filter((part) =>
//         part.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase())
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   useEffect(() => {
//     if (formik.values.supplier && !formik.values.supplierId) {
//       const filtered = supplierData.filter((supplier) =>
//         supplier.name
//           .toLowerCase()
//           .includes(formik.values.supplier.toLowerCase())
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

//   // Reset handler: clear form and suggestions
//   const handleReset = () => {
//     formik.resetForm();
//     setSuggestions([]);
//     setSupplierSuggestions([]);
//   };

//   return (
//     <div className="py-4 px-5">
//       <form onSubmit={formik.handleSubmit} autoComplete="off">
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
//           Edit Part Scrap Entry
//         </h1>
//         <div className="flex justify-between items-center">
//           <div className="flex gap-2 items-center">
//             <p className="text-[14px] text-black">
//               <NavLink to="/station-login">Station Login </NavLink>
//             </p>

//             <FaCircle className="text-[6px] text-gray-500" />
//             <span className="text-[14px]">Edit Part Scrap Entry</span>
//           </div>
//         </div>
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
//                     .includes(formik.values.searchPart.toLowerCase())
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
//               const filtered = supplierData.filter((s) =>
//                 s.name.toLowerCase().includes(e.target.value.toLowerCase())
//               );
//               setSupplierSuggestions(filtered);
//             }}
//             onFocus={() => {
//               if (formik.values.supplier) {
//                 const filtered = supplierData.filter((s) =>
//                   s.name
//                     .toLowerCase()
//                     .includes(formik.values.supplier.toLowerCase())
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

//         {/* Buttons */}
//         <div className="flex items-center justify-between bg-white p-6 mt-4">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md"
//           >
//             Save Scrap
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

// export default EditPartScrapEntry;

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  scrapEntryDetail,
  selectPartNamber,
  selectPartNamber1,
  updateScrapEntry,
} from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";
import { FaArrowLeft, FaCircle } from "react-icons/fa";

// const EditPartScrapEntry = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true); // To manage loading state
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       supplier: "",
//       supplierId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "part",
//     },
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting, resetForm }) => {
//       try {
//         setSubmitting(true);
//         const payload = {
//           ...values,
//           type: "part",
//           returnQuantity: parseInt(values.returnQuantity, 10) || 0,
//         };
//         // Ensure your updateScrapEntry function handles errors and toasts
//         const response = await updateScrapEntry(id, payload);
//         if (response.status === 200) {
//           navigate("/scrap-entries");
//         }
//         // Optionally, navigate the user away after success
//         // navigate('/scrap-entries');
//       } catch (error) {
//         console.error("Error updating scrap entry:", error);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setIsLoading(true);
//       try {
//         const [partsRes, suppliersRes, entryRes] = await Promise.all([
//           selectPartNamber(),
//           selectSupplier(),
//           scrapEntryDetail(id),
//         ]);
//         const allParts = partsRes?.data || [];
//         const allSuppliers = suppliersRes || [];
//         setPartData(allParts);
//         setSupplierData(allSuppliers);

//         const entryData = entryRes.data.data;
//         formik.setValues({
//           searchPart: entryData.PartNumber?.partNumber || "",
//           partId: entryData.partId || "",
//           supplier: entryData.supplier?.name || "",
//           supplierId: entryData.supplierId || "",
//           returnQuantity: entryData.returnQuantity?.toString() || "",
//           scrapStatus: entryData.scrapStatus === true ? "yes" : "no",
//           type: entryData.type || "part",
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchInitialData();
//     }
//   }, [id]); // Only re-run if the ID changes

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

//   // This useEffect is now for filtering based on typing
//   useEffect(() => {
//     if (!formik.values.searchPart) {
//       setSuggestions([]);
//       return;
//     }
//     const filtered = partData.filter((part) =>
//       part.partNumber
//         .toLowerCase()
//         .includes(formik.values.searchPart.toLowerCase())
//     );
//     setSuggestions(filtered);
//   }, [formik.values.searchPart]);

//   // This useEffect is for filtering suppliers based on typing
//   useEffect(() => {
//     if (!formik.values.supplier) {
//       setSupplierSuggestions([]);
//       return;
//     }
//     const filtered = supplierData.filter((supplier) =>
//       supplier.name.toLowerCase().includes(formik.values.supplier.toLowerCase())
//     );
//     setSupplierSuggestions(filtered);
//   }, [formik.values.supplier]);

//   if (isLoading) {
//     return <div>Loading...</div>; // Or a spinner component
//   }

//   return (
//     <div className="py-4 px-5">
//       <form onSubmit={formik.handleSubmit} autoComplete="off">
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
//           Edit Part Scrap Entry
//         </h1>
//         {/* Breadcrumbs etc. */}

//         {/* Part Search Input */}
//         <div className="bg-white p-4 relative">
//           <label className="block font-semibold mb-1">Search Part</label>
//           <input
//             type="text"
//             placeholder="Search part ....."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
//             value={formik.values.searchPart}
//             onChange={(e) => {
//               formik.setFieldValue("searchPart", e.target.value);
//               formik.setFieldValue("partId", ""); // Clear ID when typing
//               const filtered = partData.filter((part) =>
//                 part.partNumber
//                   .toLowerCase()
//                   .includes(e.target.value.toLowerCase())
//               );
//               setSuggestions(filtered);
//             }}
//             onFocus={() => {
//               if (formik.values.searchPart) {
//                 const filtered = partData.filter((part) =>
//                   part.partNumber
//                     .toLowerCase()
//                     .includes(formik.values.searchPart.toLowerCase())
//                 );
//                 setSuggestions(filtered);
//               } else {
//                 setSuggestions(partData); // Show all parts on focus
//               }
//             }}
//             onBlur={() => setTimeout(() => setSuggestions([]), 150)}
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute z-50 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//               {suggestions.map((part) => (
//                 <li
//                   key={part.id}
//                   className="p-2 hover:bg-brand hover:text-white cursor-pointer"
//                   onClick={() => handleSuggestionClick(part)}
//                 >
//                   {part.partNumber} (Stock: {part.stock ?? "N/A"})
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
//               formik.setFieldValue("supplierId", ""); // Clear ID when user types
//             }}
//             // <<< THE FIX IS HERE >>>
//             // Always show the full list on focus.
//             onFocus={() => setSupplierSuggestions(supplierData)}
//             onBlur={() => setTimeout(() => setSupplierSuggestions([]), 150)}
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

// const EditPartScrapEntry = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       supplier: "",
//       supplierId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "part",
//       defectDesc: "", // ✅ Added this field
//     },
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         setSubmitting(true);
//         const payload = {
//           ...values,
//           type: "part",
//           returnQuantity: parseInt(values.returnQuantity, 10) || 0,
//           // scrapStatus ko wapas boolean me convert karna ho sakta hai backend ke liye
//           scrapStatus: values.scrapStatus === "yes" ? true : false,
//         };

//         const response = await updateScrapEntry(id, payload);
//         if (response.status === 200) {
//           navigate("/scrap-entries");
//         }
//       } catch (error) {
//         console.error("Error updating scrap entry:", error);
//       } finally {
//         setSubmitting(false);
//       }
//     },
//   });

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setIsLoading(true);
//       try {
//         const [partsRes, suppliersRes, entryRes] = await Promise.all([
//           selectPartNamber(),
//           selectSupplier(),
//           scrapEntryDetail(id),
//         ]);

//         const allParts = partsRes?.data || [];
//         const allSuppliers = suppliersRes || [];
//         setPartData(allParts);
//         setSupplierData(allSuppliers);

//         // ✅ Data Mapping from JSON
//         const entryData = entryRes.data.data;
//         formik.setValues({
//           searchPart: entryData.PartNumber?.partNumber || "",
//           partId: entryData.partId || "",
//           supplier: entryData.supplier?.name || "",
//           supplierId: entryData.supplierId || "",
//           returnQuantity: entryData.returnQuantity?.toString() || "",
//           scrapStatus: entryData.scrapStatus === true ? "yes" : "no",
//           type: entryData.type || "part",
//           defectDesc: entryData.defectDesc || "", // ✅ Pre-fill Description
//         });
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) {
//       fetchInitialData();
//     }
//   }, [id]);

//   // Filtering Logic for Part Search
//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filtered = partData.filter((part) =>
//         part.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase()),
//       );
//       setSuggestions(filtered);
//     } else if (!formik.values.searchPart) {
//       setSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   // Suggestion Click Handlers
//   const handleSuggestionClick = (part) => {
//     formik.setFieldValue("searchPart", part.partNumber);
//     formik.setFieldValue("partId", part.id || part.part_id);
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

//   if (isLoading) {
//     return (
//       <div className="p-10 text-center font-semibold">Loading details...</div>
//     );
//   }

//   return (
//     <div className="py-4 px-5">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium"
//         title="Go Back"
//       >
//         <FaArrowLeft />
//         Back
//       </button>
//       <form onSubmit={formik.handleSubmit} autoComplete="off">
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-4">
//           Edit Part Scrap Entry
//         </h1>

//         {/* Part Search Input */}
//         <div className="bg-white p-4 relative border rounded-md">
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
//             onFocus={() =>
//               !formik.values.searchPart && setSuggestions(partData)
//             }
//             onBlur={() => setTimeout(() => setSuggestions([]), 150)}
//           />
//           {suggestions.length > 0 && (
//             <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//               {suggestions.map((part) => (
//                 <li
//                   key={part.id || part.part_id}
//                   className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
//                   onClick={() => handleSuggestionClick(part)}
//                 >
//                   {part.partNumber}
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
//             placeholder="Search Supplier"
//             className="border py-3 px-4 rounded-md w-full text-gray-600"
//             value={formik.values.supplier}
//             onChange={(e) => {
//               formik.setFieldValue("supplier", e.target.value);
//               formik.setFieldValue("supplierId", "");
//             }}
//             onFocus={() => setSupplierSuggestions(supplierData)}
//             onBlur={() => setTimeout(() => setSupplierSuggestions([]), 150)}
//           />
//           {supplierSuggestions.length > 0 && (
//             <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//               {supplierSuggestions.map((supplier) => (
//                 <li
//                   key={supplier.id}
//                   className="p-2 hover:bg-blue-600 hover:text-white cursor-pointer"
//                   onClick={() => handleSupplierClick(supplier)}
//                 >
//                   {supplier.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* Return Quantity & Scrap Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 mt-4 border rounded-md">
//           <div>
//             <label className="block font-semibold mb-1">Return Quantity</label>
//             <input
//               type="number"
//               placeholder="Enter Return Quantity"
//               className="border py-3 px-4 rounded-md w-full text-gray-600"
//               {...formik.getFieldProps("returnQuantity")}
//               min="0"
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

//         {/* Defect Description (Naya Field) */}
//         <div className="bg-white p-4 mt-4 border rounded-md">
//           <label className="block font-semibold mb-1">Defect Description</label>
//           <textarea
//             rows={3}
//             placeholder="Describe the defect or reason for scrap..."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
//             {...formik.getFieldProps("defectDesc")}
//           />
//         </div>

//         {/* Buttons */}
//         <div className="flex items-center justify-between bg-white p-6 mt-4 border rounded-md">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md"
//             disabled={formik.isSubmitting}
//           >
//             {formik.isSubmitting ? "Updating..." : "Update Scrap Entry"}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/scrap-entries")}
//             className="ml-4 px-6 py-2 border border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white transition rounded-md"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

import { toast } from "react-toastify";

const EditPartScrapEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [partData, setPartData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [partSuggestions, setPartSuggestions] = useState([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      searchPart: "", // UI display text
      partId: "", // ID for Backend
      supplier: "", // UI display text
      supplierId: "", // ID for Backend
      returnQuantity: "",
      scrapStatus: "yes",
      type: "part", // Fixed type for this form
      defectDesc: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      // Backend Payload Mapping
      const payload = {
        type: "part",
        partId: values.partId,
        supplierId: values.supplierId || null,
        returnQuantity: Number(values.returnQuantity),
        scrapStatus: values.scrapStatus,
        defectDesc: values.defectDesc,
      };

      try {
        setSubmitting(true);
        const response = await updateScrapEntry(id, payload);
        if (response.status === 200 || response.status === 201) {
          navigate("/scrap-entries");
        }
      } catch (error: any) {
        console.error("Update failed:", error);
        toast.error(error.response?.data?.message || "Update failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // 1. Initial Data Load & Prefilling
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [partsRes, suppliersRes, detailRes] = await Promise.all([
          selectPartNamber1(),
          selectSupplier(),
          scrapEntryDetail(id),
        ]);

        const allParts = Array.isArray(partsRes)
          ? partsRes
          : partsRes?.data || [];
        const allSuppliers = Array.isArray(suppliersRes)
          ? suppliersRes
          : suppliersRes?.data || [];

        setPartData(allParts);
        setSupplierData(allSuppliers);

        // Pre-fill fields from Detail API
        const entryData = detailRes.data.data;
        if (entryData) {
          formik.setValues({
            searchPart: entryData.PartNumber?.partNumber || "",
            partId: entryData.partId || "",
            // Supplier mapping (considering name or companyName)
            supplier:
              entryData.supplier?.name || entryData.supplier?.companyName || "",
            supplierId: entryData.supplierId || "",
            returnQuantity: entryData.returnQuantity?.toString() || "",
            scrapStatus: entryData.scrapStatus === true ? "yes" : "no",
            type: entryData.type || "part",
            defectDesc: entryData.defectDesc || "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchInitialData();
  }, [id]);

  // 2. Real-time Part Filtering (Same as Add form)
  useEffect(() => {
    const query = formik.values.searchPart.trim().toLowerCase();
    if (query && !formik.values.partId) {
      const filtered = partData.filter((p: any) =>
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
      const filtered = supplierData.filter((s: any) =>
        s.name?.toLowerCase().includes(query),
      );
      setSupplierSuggestions(filtered);
    } else {
      setSupplierSuggestions([]);
    }
  }, [formik.values.supplier, formik.values.supplierId, supplierData]);

  if (isLoading)
    return <div className="p-10 text-center font-bold">Loading Details...</div>;

  return (
    <div className="py-4 px-5 ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium mb-4"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="flex gap-2 items-center mb-6">
        <NavLink
          to="/scrap-entries"
          className="text-[14px] text-blue-600 hover:underline"
        >
          Scrap Entries
        </NavLink>
        <FaCircle className="text-[6px] text-gray-500" />
        <span className="text-[14px] text-gray-500">Edit Part Scrap Entry</span>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
        autoComplete="off"
      >
        <h1 className="font-bold text-2xl text-black mb-4">
          Edit Part Scrap Entry
        </h1>

        {/* PART SEARCH INPUT */}
        <div className="bg-white p-4 relative border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Part Number *</label>
          <input
            type="text"
            placeholder="Search part number..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", "");
            }}
          />
          {partSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {partSuggestions.map((p: any) => (
                <li
                  key={p.part_id || p.id}
                  className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b"
                  onClick={() => {
                    formik.setFieldValue("searchPart", p.partNumber);
                    formik.setFieldValue("partId", p.part_id || p.id);
                    setPartSuggestions([]);
                  }}
                >
                  <div className="font-bold">{p.partNumber}</div>
                  <div className="text-xs">Stock: {p.availStock || 0}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* SUPPLIER SEARCH INPUT */}
        <div className="bg-white p-4 relative border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Supplier</label>
          <input
            type="text"
            placeholder="Search supplier..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.supplier}
            onChange={(e) => {
              formik.setFieldValue("supplier", e.target.value);
              formik.setFieldValue("supplierId", "");
            }}
          />
          {supplierSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {supplierSuggestions.map((s: any) => (
                <li
                  key={s.id}
                  className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <label className="block font-semibold mb-1">
              Return Quantity *
            </label>
            <input
              type="number"
              className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
              {...formik.getFieldProps("returnQuantity")}
            />
          </div>
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              className="border py-3 px-4 rounded-md w-full text-gray-600 bg-white"
              {...formik.getFieldProps("scrapStatus")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* DEFECT DESCRIPTION */}
        <div className="bg-white p-4 border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            placeholder="Describe why this is being scrapped..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-md border">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.values.partId ||
              !formik.values.returnQuantity
            }
            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition shadow-md disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Updating..." : "Update Scrap Entry"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/scrap-entries")}
            className="px-10 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPartScrapEntry;
