import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaCircle } from "react-icons/fa";
import {
  scrapEntryDetail,
  selectProductNamber1,
  selectProductNumber,
  updateScrapEntry,
} from "./https/productionResponseApi";
import { BASE_URL } from "../../utils/axiosInstance";
import { selectCustomer } from "../order_schedule/https/schedulingApis";
import { toast } from "react-toastify";

// const EditProductScrapEntry = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [supplierData, setSupplierData] = useState([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState([]);
//   const { id } = useParams();
//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       supplier: "",
//       supplierId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "product",
//     },
//     enableReinitialize: true,
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const payload = {
//           ...values,
//           type: "product",
//         };
//         await updateScrapEntry(id, payload);

//         resetForm();
//         setSuggestions([]);
//         setSupplierSuggestions([]);
//       } catch (error) {
//         console.error("Error submitting scrap entry:", error);
//       }
//     },
//   });

//   useEffect(() => {
//     const fetchScrapEntryDetail = async () => {
//       try {
//         const response = await scrapEntryDetail(id);
//         const data = response.data.data;
//         formik.setValues({
//           searchPart: data.PartNumber?.partNumber || "",
//           partId: data.partId || "",
//           supplier: data.supplier
//             ? `${data.supplier.firstName} ${data.supplier.lastName}`
//             : "",
//           supplierId: data.supplierId || "",
//           returnQuantity: data.returnQuantity?.toString() || "",
//           scrapStatus: data.scrapStatus === true ? "yes" : "no",
//           type: data.type || "product",
//         });
//       } catch (error) {
//         console.error("Error fetching scrap entry detail:", error);
//       }
//     };

//     if (id) {
//       fetchScrapEntryDetail();
//     }
//   }, [id]);

//   useEffect(() => {
//     const fetchPartsAndSuppliers = async () => {
//       try {
//         const [partsRes, suppliersRes] = await Promise.all([
//           axios.get(`${BASE_URL}/select-schedule-part-number`),
//           axios.get(`${BASE_URL}/select-supplier`),
//         ]);

//         setPartData(partsRes.data.data || []);
//         setSupplierData(suppliersRes.data.data || []);
//       } catch (error) {
//         console.error("Error fetching parts or suppliers:", error);
//       }
//     };
//     fetchPartsAndSuppliers();
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
//         `${supplier.firstName} ${supplier.lastName}`
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
//     formik.setFieldValue("partId", part.part_id || part.id);
//     setSuggestions([]);
//   };

//   const handleSupplierClick = (supplier) => {
//     const fullName = `${supplier.firstName} ${supplier.lastName}`;
//     formik.setFieldValue("supplier", fullName);
//     formik.setFieldValue("supplierId", supplier.id);
//     setSupplierSuggestions([]);
//   };

//   const handleReset = () => {
//     formik.resetForm();
//     setSuggestions([]);
//     setSupplierSuggestions([]);
//   };

//   return (
//     <div className="py-4 px-5">
//       <form onSubmit={formik.handleSubmit} autoComplete="off">
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
//           Edit Product Scrap Entry
//         </h1>

//         <div className="flex justify-between items-center mb-4">
//           <div className="flex gap-2 items-center">
//             <p className="text-[14px] text-black">
//               <NavLink to="/scrap-entries">Station Login </NavLink>
//             </p>
//             <FaCircle className="text-[6px] text-gray-500" />
//             <span className="text-[14px]">Edit Product Scrap Entry</span>
//           </div>
//         </div>

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
//                   key={part.part_id || part.id}
//                   className="p-2 hover:bg-brand hover:text-white cursor-pointer"
//                   onClick={() => handleSuggestionClick(part)}
//                 >
//                   {part.partNumber} (Stock: {part.availStock ?? "N/A"})
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
//                 `${s.firstName} ${s.lastName}`
//                   .toLowerCase()
//                   .includes(e.target.value.toLowerCase())
//               );
//               setSupplierSuggestions(filtered);
//             }}
//             onFocus={() => {
//               if (formik.values.supplier) {
//                 const filtered = supplierData.filter((s) =>
//                   `${s.firstName} ${s.lastName}`
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
//                   {supplier.firstName} {supplier.lastName}
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

// const EditProductScrapEntry = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [customerData, setCustomerData] = useState([]);
//   const [customerSuggestions, setCustomerSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   const { id } = useParams();
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       customer: "",
//       customerId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "product",
//       defectDesc: "", // ✅ Added Defect Description
//     },
//     enableReinitialize: true,
//     onSubmit: async (values, { setSubmitting }) => {
//       try {
//         setSubmitting(true);
//         const payload = {
//           ...values,
//           type: "product",
//           returnQuantity: parseInt(values.returnQuantity, 10) || 0,
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
//         const [partsRes, customersRes, entryRes] = await Promise.all([
//           selectProductNumber(),
//           selectCustomer(),
//           scrapEntryDetail(id),
//         ]);

//         setPartData(partsRes || []);
//         setCustomerData(customersRes || []);

//         // ✅ Prefilling Logic from API JSON
//         const data = entryRes.data.data;
//         formik.setValues({
//           searchPart: data.PartNumber?.partNumber || "",
//           partId: data.partId || "",
//           customer: data.customer?.name || "", // Agar customer obj me name ho
//           customerId: data.customersId || "", // Aapke JSON me customersId hai
//           returnQuantity: data.returnQuantity?.toString() || "",
//           scrapStatus: data.scrapStatus === true ? "yes" : "no",
//           type: data.type || "product",
//           defectDesc: data.defectDesc || "", // ✅ Prefill Defect Desc
//         });
//       } catch (error) {
//         console.error("Error fetching scrap entry details:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (id) fetchInitialData();
//   }, [id]);

//   // Product Suggestions Logic
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

//   // Customer Suggestions Logic
//   useEffect(() => {
//     if (formik.values.customer && !formik.values.customerId) {
//       const filtered = customerData.filter((c) =>
//         c.name.toLowerCase().includes(formik.values.customer.toLowerCase()),
//       );
//       setCustomerSuggestions(filtered);
//     } else if (!formik.values.customer) {
//       setCustomerSuggestions([]);
//     }
//   }, [formik.values.customer, formik.values.customerId, customerData]);

//   const handleSuggestionClick = (part) => {
//     formik.setFieldValue("searchPart", part.partNumber);
//     formik.setFieldValue("partId", part.id);
//     setSuggestions([]);
//   };

//   const handleCustomerClick = (customer) => {
//     formik.setFieldValue("customer", customer.name);
//     formik.setFieldValue("customerId", customer.id);
//     setCustomerSuggestions([]);
//   };

//   const handleReset = () => {
//     formik.resetForm();
//     setSuggestions([]);
//     setCustomerSuggestions([]);
//   };

//   if (isLoading) return <div className="p-10 text-center">Loading Data...</div>;

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
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
//           Edit Product Scrap Entry
//         </h1>

//         <div className="flex gap-2 items-center mb-6">
//           <p className="text-[14px] text-black">
//             <NavLink to="/scrap-entries">Scrap Entries </NavLink>
//           </p>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <span className="text-[14px] text-gray-500">
//             Edit Product Scrap Entry
//           </span>
//         </div>

//         {/* 🔍 Search Product Input */}
//         <div className="bg-white p-4 relative border rounded-md">
//           <label className="block font-semibold mb-1">Search Product</label>
//           <input
//             type="text"
//             placeholder="Search product ....."
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
//                   key={part.id}
//                   className="p-2 hover:bg-brand hover:text-white cursor-pointer"
//                   onClick={() => handleSuggestionClick(part)}
//                 >
//                   {part.partNumber} (Stock: {part.availStock ?? "0"})
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* 👥 Customer Selection Input */}
//         <div className="bg-white p-4 relative mt-4 border rounded-md">
//           <label className="block font-semibold mb-1">Customer</label>
//           <input
//             type="text"
//             placeholder="Search Customer"
//             className="border py-3 px-4 rounded-md w-full text-gray-600"
//             value={formik.values.customer}
//             onChange={(e) => {
//               formik.setFieldValue("customer", e.target.value);
//               formik.setFieldValue("customerId", "");
//             }}
//             onFocus={() =>
//               !formik.values.customer && setCustomerSuggestions(customerData)
//             }
//             onBlur={() => setTimeout(() => setCustomerSuggestions([]), 150)}
//           />
//           {customerSuggestions.length > 0 && (
//             <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//               {customerSuggestions.map((customer) => (
//                 <li
//                   key={customer.id}
//                   className="p-2 hover:bg-brand hover:text-white cursor-pointer"
//                   onClick={() => handleCustomerClick(customer)}
//                 >
//                   {customer.name}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* 📦 Return Quantity & Scrap Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 mt-4 border rounded-md">
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

//         {/* 📝 Defect Description Field */}
//         <div className="bg-white p-4 mt-4 border rounded-md">
//           <label className="block font-semibold mb-1">Defect Description</label>
//           <textarea
//             rows={3}
//             placeholder="Enter reason for scrap or defect details..."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
//             {...formik.getFieldProps("defectDesc")}
//           />
//         </div>

//         {/* ✅ Action Buttons */}
//         <div className="flex items-center justify-between bg-white p-6 mt-4 border rounded-md">
//           <button
//             type="submit"
//             disabled={formik.isSubmitting}
//             className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md disabled:bg-gray-400"
//           >
//             {formik.isSubmitting ? "Updating..." : "Update Scrap Entry"}
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

const EditProductScrapEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      searchPart: "", // UI display
      partId: "", // Backend ID
      customer: "", // UI display
      customerId: "", // Backend ID
      returnQuantity: "",
      scrapStatus: "yes",
      type: "product",
      defectDesc: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      // Backend Payload Mapping (Same as your controller req.body)
      const payload = {
        type: "product",
        partId: values.partId,
        customerId: values.customerId || null,
        returnQuantity: Number(values.returnQuantity),
        scrapStatus: values.scrapStatus, // Controller "yes" handle kar lega ya hum true/false bhej sakte hain
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

  // 1. Initial Data Fetching & Prefilling
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, customersRes, detailRes] = await Promise.all([
          selectProductNamber1(),
          selectCustomer(),
          scrapEntryDetail(id),
        ]);

        const products = Array.isArray(productsRes)
          ? productsRes
          : productsRes?.data || [];
        const customers = Array.isArray(customersRes)
          ? customersRes
          : customersRes?.data || [];

        setProductData(products);
        setCustomerData(customers);

        // Pre-filling from API
        const data = detailRes.data.data;
        if (data) {
          formik.setValues({
            searchPart: data.PartNumber?.partNumber || "",
            partId: data.partId || "",
            customer:
              data.customerName ||
              `${data.customers?.firstName} ${data.customers?.lastName}` ||
              "",
            customerId: data.customersId || "",
            returnQuantity: data.returnQuantity?.toString() || "",
            scrapStatus: data.scrapStatus === true ? "yes" : "no",
            type: data.type || "product",
            defectDesc: data.defectDesc || "",
          });
        }
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Failed to load details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchInitialData();
  }, [id]);

  // 2. Real-time Product Suggestions (Same as Add form)
  useEffect(() => {
    const query = formik.values.searchPart.trim().toLowerCase();
    if (query && !formik.values.partId) {
      const filtered = productData.filter((p: any) =>
        p.partNumber?.toLowerCase().includes(query),
      );
      setProductSuggestions(filtered);
    } else {
      setProductSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, productData]);

  // 3. Real-time Customer Suggestions
  useEffect(() => {
    const query = formik.values.customer.trim().toLowerCase();
    if (query && !formik.values.customerId) {
      const filtered = customerData.filter((c: any) =>
        c.name?.toLowerCase().includes(query),
      );
      setCustomerSuggestions(filtered);
    } else {
      setCustomerSuggestions([]);
    }
  }, [formik.values.customer, formik.values.customerId, customerData]);

  const handleReset = () => {
    formik.resetForm();
    setProductSuggestions([]);
    setCustomerSuggestions([]);
  };

  if (isLoading)
    return <div className="p-10 text-center font-bold">Loading Data...</div>;

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
        <span className="text-[14px] text-gray-500">
          Edit Product Scrap Entry
        </span>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
        autoComplete="off"
      >
        <h1 className="font-bold text-2xl text-black mb-4">
          Edit Product Scrap Entry
        </h1>

        {/* PRODUCT SEARCH */}
        <div className="bg-white p-4 relative border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Product Number *</label>
          <input
            type="text"
            placeholder="Search product number..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", "");
            }}
          />
          {productSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {productSuggestions.map((p: any) => (
                <li
                  key={p.part_id || p.id}
                  className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b"
                  onClick={() => {
                    formik.setFieldValue("searchPart", p.partNumber);
                    formik.setFieldValue("partId", p.part_id || p.id);
                    setProductSuggestions([]);
                  }}
                >
                  <div className="font-bold">{p.partNumber}</div>
                  <div className="text-xs">Stock: {p.availStock || 0}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CUSTOMER SEARCH */}
        <div className="bg-white p-4 relative border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">
            Customer (Optional)
          </label>
          <input
            type="text"
            placeholder="Search customer name..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.customer}
            onChange={(e) => {
              formik.setFieldValue("customer", e.target.value);
              formik.setFieldValue("customerId", "");
            }}
          />
          {customerSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {customerSuggestions.map((c: any) => (
                <li
                  key={c.id}
                  className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b"
                  onClick={() => {
                    formik.setFieldValue("customer", c.name);
                    formik.setFieldValue("customerId", c.id);
                    setCustomerSuggestions([]);
                  }}
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* QUANTITY & STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <label className="block font-semibold mb-1">
              Return Quantity *
            </label>
            <input
              type="number"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
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
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-md border">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.values.partId ||
              !formik.values.returnQuantity
            }
            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Updating..." : "Update Scrap Entry"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md font-bold"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductScrapEntry;
