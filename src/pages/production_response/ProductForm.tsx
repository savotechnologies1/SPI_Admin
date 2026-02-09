import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { selectPartNamber } from "../product&BOM/https/partProductApis";
import {
  ScrapEntryApi,
  selectProductNumber,
} from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";
import { selectCustomer } from "../order_schedule/https/schedulingApis";

// const ProductForm = () => {
//   const [partData, setPartData] = useState<any[]>([]);
//   const [suggestions, setSuggestions] = useState<any[]>([]);
//   const [supplierData, setSupplierData] = useState<any[]>([]);
//   const [supplierSuggestions, setSupplierSuggestions] = useState<any[]>([]);

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
//     onSubmit: async (values) => {
//       console.log("Form Submitted:", values);
//       await ScrapEntryApi({
//         ...values,
//         type: "product",
//       });
//     },
//   });

//   const handleReset = () => {
//     formik.resetForm();
//     setSuggestions([]);
//     setSupplierSuggestions([]);
//   };
//   useEffect(() => {
//     (async () => {
//       try {
//         const parts = await selectProductNumber();
//         const suppliers = await selectSupplier();
//         console.log("partsparts", parts);

//         setPartData(parts || []);
//         console.log("supplierssuppliers", suppliers);

//         setSupplierData(suppliers || []);
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filteredSuggestions = partData.filter((part) =>
//         part.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   useEffect(() => {
//     if (formik.values.supplier && !formik.values.supplierId) {
//       const filteredSuppliers = supplierData.filter((s) =>
//         s.name.toLowerCase().includes(formik.values.supplier.toLowerCase())
//       );
//       setSupplierSuggestions(filteredSuppliers);
//     } else {
//       setSupplierSuggestions([]);
//     }
//   }, [formik.values.supplier, formik.values.supplierId, supplierData]);

//   const handleSuggestionClick = (part: any) => {
//     formik.setFieldValue("searchPart", part.partNumber);
//     formik.setFieldValue("partId", part.id);
//     setSuggestions([]);
//   };

//   const handleSupplierClick = (supplier: any) => {
//     formik.setFieldValue("supplier", supplier.name);
//     formik.setFieldValue("supplierId", supplier.id);
//     setSupplierSuggestions([]);
//   };

//   return (
//     <div className="">
//       <form onSubmit={formik.handleSubmit} className="">
//         <div className="bg-white p-4">
//           <label className="block font-semibold mb-1">Search Product</label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search product ....."
//               className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
//               value={formik.values.searchPart}
//               onChange={(e) => {
//                 formik.setFieldValue("searchPart", e.target.value);
//                 formik.setFieldValue("partId", "");
//               }}
//               onFocus={() => {
//                 if (formik.values.searchPart) {
//                   const filtered = partData.filter((part) =>
//                     part.partNumber
//                       .toLowerCase()
//                       .includes(formik.values.searchPart.toLowerCase())
//                   );
//                   setSuggestions(filtered);
//                 } else {
//                   setSuggestions(partData);
//                 }
//               }}
//               onBlur={() => {
//                 setTimeout(() => setSuggestions([]), 150);
//               }}
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//                 {suggestions.map((part) => (
//                   <li
//                     key={part.part_id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSuggestionClick(part)}
//                   >
//                     {part.partNumber} (Stock: {part.availStock})
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//         <div className="grid grid-cols-1 gap-4 bg-white p-4">
//           <label className="block font-semibold mb-1">Supplier</label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search Supplier"
//               className="border py-3 px-4 rounded-md w-full text-gray-600"
//               value={formik.values.supplier}
//               onChange={(e) => {
//                 formik.setFieldValue("supplier", e.target.value);
//                 formik.setFieldValue("supplierId", "");
//                 const filtered = supplierData.filter((s) =>
//                   s.name.toLowerCase().includes(e.target.value.toLowerCase())
//                 );
//                 setSupplierSuggestions(filtered);
//               }}
//               onFocus={() => {
//                 if (formik.values.supplier) {
//                   const filtered = supplierData.filter((s) =>
//                     s.name
//                       .toLowerCase()
//                       .includes(formik.values.supplier.toLowerCase())
//                   );
//                   setSupplierSuggestions(filtered);
//                 } else {
//                   setSupplierSuggestions(supplierData);
//                 }
//               }}
//               onBlur={() => {
//                 setTimeout(() => setSupplierSuggestions([]), 150);
//               }}
//             />
//             {supplierSuggestions.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//                 {supplierSuggestions.map((supplier) => (
//                   <li
//                     key={supplier.id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSupplierClick(supplier)}
//                   >
//                     {supplier.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* 📦 Return Quantity & Scrap Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4">
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

//         {/* ✅ Buttons */}
//         <div className="flex items-center justify-between bg-white p-6">
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

// export default ProductForm;

// const ProductForm = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [customerData, setCustomerData] = useState([]); // Supplier ki jagah Customer
//   const [customerSuggestions, setCustomerSuggestions] = useState([]); // Suggestions list

//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       customer: "",      // supplier -> customer
//       customerId: "",    // supplierId -> customerId
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "product",
//     },
//     onSubmit: async (values) => {
//       console.log("Form Submitted:", values);
//       await ScrapEntryApi({
//         ...values,
//         type: "product",
//       });
//     },
//   });

//   const handleReset = () => {
//     formik.resetForm();
//     setSuggestions([]);
//     setCustomerSuggestions([]);
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const parts = await selectProductNumber();
//         const customers = await selectCustomer(); // selectSupplier ki jagah selectCustomer

//         setPartData(parts || []);
//         setCustomerData(customers || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     })();
//   }, []);

//   // Product Suggestions Logic
//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filteredSuggestions = partData.filter((part) =>
//         part.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase())
//       );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   // Customer Suggestions Logic (Modified)
//   useEffect(() => {
//     if (formik.values.customer && !formik.values.customerId) {
//       const filtered = customerData.filter((c) =>
//         c.name.toLowerCase().includes(formik.values.customer.toLowerCase())
//       );
//       setCustomerSuggestions(filtered);
//     } else {
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

//   return (
//     <div className="">
//       <form onSubmit={formik.handleSubmit} className="">
//         {/* 🔍 Search Product */}
//         <div className="bg-white p-4">
//           <label className="block font-semibold mb-1">Search Product</label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search product ....."
//               className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
//               value={formik.values.searchPart}
//               onChange={(e) => {
//                 formik.setFieldValue("searchPart", e.target.value);
//                 formik.setFieldValue("partId", "");
//               }}
//               onFocus={() => {
//                 if (!formik.values.searchPart) setSuggestions(partData);
//               }}
//               onBlur={() => {
//                 setTimeout(() => setSuggestions([]), 150);
//               }}
//             />
//             {suggestions.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//                 {suggestions.map((part) => (
//                   <li
//                     key={part.id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     onClick={() => handleSuggestionClick(part)}
//                   >
//                     {part.partNumber} (Stock: {part.availStock})
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* 👥 Customer Selection (Replaced Supplier) */}
//         <div className="grid grid-cols-1 gap-4 bg-white p-4">
//           <label className="block font-semibold mb-1">Customer</label>
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search Customer"
//               className="border py-3 px-4 rounded-md w-full text-gray-600"
//               value={formik.values.customer}
//               onChange={(e) => {
//                 formik.setFieldValue("customer", e.target.value);
//                 formik.setFieldValue("customerId", "");
//               }}
//               onFocus={() => {
//                 if (!formik.values.customer) setCustomerSuggestions(customerData);
//               }}
//               onBlur={() => {
//                 setTimeout(() => setCustomerSuggestions([]), 150);
//               }}
//             />
//             {customerSuggestions.length > 0 && (
//               <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
//                 {customerSuggestions.map((customer) => (
//                   <li
//                     key={customer.id}
//                     className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
//                     onClick={() => handleCustomerClick(customer)}
//                   >
//                     {customer.name}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* 📦 Return Quantity & Scrap Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4">
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

//         {/* ✅ Buttons */}
//         <div className="flex items-center justify-between bg-white p-6">
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

// export default ProductForm;

const ProductForm = () => {
  const [partData, setPartData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);

  const formik = useFormik({
    initialValues: {
      searchPart: "",
      partId: "",
      customer: "",
      customerId: "",
      returnQuantity: "",
      scrapStatus: "yes",
      type: "product",
      defectDesc: "", // ✅ Added defectDesc key
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log("Form Submitted:", values);
      try {
        setSubmitting(true);
        await ScrapEntryApi({
          ...values,
          type: "product",
          returnQuantity: parseInt(values.returnQuantity, 10) || 0,
        });

        // Success handling
        formik.resetForm();
        setSuggestions([]);
        setCustomerSuggestions([]);
      } catch (error) {
        console.error("Submission failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
    setSuggestions([]);
    setCustomerSuggestions([]);
  };

  useEffect(() => {
    (async () => {
      try {
        const parts = await selectProductNumber();
        const customers = await selectCustomer();

        setPartData(parts || []);
        setCustomerData(customers || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    })();
  }, []);

  // Product Suggestions Logic
  useEffect(() => {
    if (formik.values.searchPart && !formik.values.partId) {
      const filteredSuggestions = partData.filter((part) =>
        part.partNumber
          .toLowerCase()
          .includes(formik.values.searchPart.toLowerCase()),
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, partData]);

  // Customer Suggestions Logic
  useEffect(() => {
    if (formik.values.customer && !formik.values.customerId) {
      const filtered = customerData.filter((c) =>
        c.name.toLowerCase().includes(formik.values.customer.toLowerCase()),
      );
      setCustomerSuggestions(filtered);
    } else {
      setCustomerSuggestions([]);
    }
  }, [formik.values.customer, formik.values.customerId, customerData]);

  const handleSuggestionClick = (part) => {
    formik.setFieldValue("searchPart", part.partNumber);
    formik.setFieldValue("partId", part.id);
    setSuggestions([]);
  };

  const handleCustomerClick = (customer) => {
    formik.setFieldValue("customer", customer.name);
    formik.setFieldValue("customerId", customer.id);
    setCustomerSuggestions([]);
  };

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="">
        {/* 🔍 Search Product */}
        <div className="bg-white p-4">
          <label className="block font-semibold mb-1">Search Product</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search product ....."
              className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
              value={formik.values.searchPart}
              onChange={(e) => {
                formik.setFieldValue("searchPart", e.target.value);
                formik.setFieldValue("partId", "");
              }}
              onFocus={() => {
                if (!formik.values.searchPart) setSuggestions(partData);
              }}
              onBlur={() => {
                setTimeout(() => setSuggestions([]), 150);
              }}
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {suggestions.map((part) => (
                  <li
                    key={part.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSuggestionClick(part)}
                  >
                    {part.partNumber} (Stock: {part.availStock})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 👥 Customer Selection */}
        <div className="grid grid-cols-1 gap-4 bg-white p-4">
          <label className="block font-semibold mb-1">Customer</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Customer"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              value={formik.values.customer}
              onChange={(e) => {
                formik.setFieldValue("customer", e.target.value);
                formik.setFieldValue("customerId", "");
              }}
              onFocus={() => {
                if (!formik.values.customer)
                  setCustomerSuggestions(customerData);
              }}
              onBlur={() => {
                setTimeout(() => setCustomerSuggestions([]), 150);
              }}
            />
            {customerSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {customerSuggestions.map((customer) => (
                  <li
                    key={customer.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleCustomerClick(customer)}
                  >
                    {customer.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 📦 Return Quantity & Scrap Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4">
          <div>
            <label className="block font-semibold mb-1">Return Quantity</label>
            <input
              type="number"
              placeholder="Enter Return Quantity"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("returnQuantity")}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("scrapStatus")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        {/* ✅ NEW: Description / Defect Description Field */}
        <div className="bg-white p-4">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            placeholder="Enter reason for scrap or defect details..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        {/* ✅ Buttons */}
        <div className="flex items-center justify-between bg-white p-6">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Saving..." : "Save Scrap"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="ml-4 px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md flex items-center"
          >
            <span className="text-lg mr-1">🔄</span> Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
