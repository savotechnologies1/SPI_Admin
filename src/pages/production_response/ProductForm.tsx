import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  ScrapEntryApi,
  selectProductNamber1,
  selectProductNumber,
} from "./https/productionResponseApi";
import { selectCustomer } from "../order_schedule/https/schedulingApis";
import { selectProductInfoApi } from "../Work_Instrcution.tsx/https/workInstructionApi";

// const ProductForm = () => {
//   const [partData, setPartData] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [customerData, setCustomerData] = useState([]);
//   const [customerSuggestions, setCustomerSuggestions] = useState([]);

//   const formik = useFormik({
//     initialValues: {
//       searchPart: "",
//       partId: "",
//       customer: "",
//       customerId: "",
//       returnQuantity: "",
//       scrapStatus: "yes",
//       type: "product",
//       defectDesc: "",
//     },
//     onSubmit: async (values, { setSubmitting }) => {
//       console.log("Form Submitted:", values);
//       try {
//         setSubmitting(true);
//         await ScrapEntryApi({
//           ...values,
//           type: "product",
//           returnQuantity: parseInt(values.returnQuantity, 10) || 0,
//         });

//         // Success handling
//         formik.resetForm();
//         setSuggestions([]);
//         setCustomerSuggestions([]);
//       } catch (error) {
//         console.error("Submission failed:", error);
//       } finally {
//         setSubmitting(false);
//       }
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
//         const parts = await selectProductInfoApi();
//         const customers = await selectCustomer();

//         setPartData(parts || []);
//         setCustomerData(customers || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     if (formik.values.searchPart && !formik.values.partId) {
//       const filteredSuggestions = partData.filter((part) =>
//         part.partNumber
//           .toLowerCase()
//           .includes(formik.values.searchPart.toLowerCase()),
//       );
//       setSuggestions(filteredSuggestions);
//     } else {
//       setSuggestions([]);
//     }
//   }, [formik.values.searchPart, formik.values.partId, partData]);

//   useEffect(() => {
//     if (formik.values.customer && !formik.values.customerId) {
//       const filtered = customerData.filter((c) =>
//         c.name.toLowerCase().includes(formik.values.customer.toLowerCase()),
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
//                 if (!formik.values.customer)
//                   setCustomerSuggestions(customerData);
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

//         <div className="bg-white p-4">
//           <label className="block font-semibold mb-1">Defect Description</label>
//           <textarea
//             rows={3}
//             placeholder="Enter reason for scrap or defect details..."
//             className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
//             {...formik.getFieldProps("defectDesc")}
//           />
//         </div>

//         {/* ✅ Buttons */}
//         <div className="flex items-center justify-between bg-white p-6">
//           <button
//             type="submit"
//             disabled={formik.isSubmitting}
//             className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md disabled:bg-gray-400"
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

// export default ProductForm;

import { toast } from "react-toastify";

const ProductForm = () => {
  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);

  const formik = useFormik({
    initialValues: {
      searchPart: "", // UI Input for Product
      partId: "", // Product ID for Backend
      customer: "", // UI Input for Customer
      customerId: "", // Customer ID for Backend
      returnQuantity: "",
      scrapStatus: "yes",
      type: "product", // Backend logic identifies this as product scrap
      defectDesc: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Backend Payload Mapping
      const payload = {
        type: values.type,
        partId: values.partId, // Product selected from list
        customerId: values.customerId || null,
        returnQuantity: Number(values.returnQuantity),
        scrapStatus: values.scrapStatus,
        defectDesc: values.defectDesc,
      };

      try {
        setSubmitting(true);
        const res = await ScrapEntryApi(payload);
        if (res) {
          toast.success("Product scrap entry saved successfully!");
          resetForm();
          setProductSuggestions([]);
          setCustomerSuggestions([]);
        }
      } catch (error: any) {
        const errorMsg = error.response?.data?.message || "Submission failed";
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // 1. Initial Data Fetching
  useEffect(() => {
    (async () => {
      try {
        const [products, customers] = await Promise.all([
          selectProductNamber1(),
          selectCustomer(),
        ]);

        // Handle data formats
        setProductData(
          Array.isArray(products) ? products : products?.data || [],
        );
        setCustomerData(
          Array.isArray(customers) ? customers : customers?.data || [],
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    })();
  }, []);

  // 2. Real-time Product Filtering
  useEffect(() => {
    const query = formik.values.searchPart.toLowerCase().trim();
    if (query && !formik.values.partId) {
      const filtered = productData.filter((p: any) =>
        p.partNumber?.toLowerCase().includes(query),
      );
      setProductSuggestions(filtered);
    } else {
      setProductSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, productData]);

  // 3. Real-time Customer Filtering
  useEffect(() => {
    const query = formik.values.customer.toLowerCase().trim();
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
        autoComplete="off"
      >
        {/* PRODUCT SEARCH */}
        <div className="bg-white p-4 border rounded-md relative">
          <label className="block font-semibold mb-1">Search Product *</label>
          <input
            type="text"
            placeholder="Search product number....."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", ""); // Reset ID when typing
            }}
          />
          {productSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {productSuggestions.map((product: any) => (
                <li
                  key={product.part_id || product.id}
                  className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b"
                  onClick={() => {
                    formik.setFieldValue("searchPart", product.partNumber);
                    formik.setFieldValue(
                      "partId",
                      product.part_id || product.id,
                    );
                    setProductSuggestions([]);
                  }}
                >
                  <div className="font-bold">{product.partNumber}</div>
                  <div className="text-xs">
                    Available Stock: {product.availStock || 0}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* CUSTOMER SEARCH */}
        <div className="bg-white p-4 border rounded-md relative">
          <label className="block font-semibold mb-1">
            Customer (Optional)
          </label>
          <input
            type="text"
            placeholder="Search Customer name..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.customer}
            onChange={(e) => {
              formik.setFieldValue("customer", e.target.value);
              formik.setFieldValue("customerId", "");
            }}
          />
          {customerSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {customerSuggestions.map((customer: any) => (
                <li
                  key={customer.id}
                  className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b"
                  onClick={() => {
                    formik.setFieldValue("customer", customer.name);
                    formik.setFieldValue("customerId", customer.id);
                    setCustomerSuggestions([]);
                  }}
                >
                  {customer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* QUANTITY & STATUS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded-md">
            <label className="block font-semibold mb-1">
              Return Quantity *
            </label>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("returnQuantity")}
            />
          </div>
          <div className="bg-white p-4 border rounded-md">
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              className="border py-3 px-4 rounded-md w-full text-gray-600 bg-white"
              {...formik.getFieldProps("scrapStatus")}
            >
              <option value="yes">Yes (Reduce Stock)</option>
              <option value="no">No (Keep Stock)</option>
            </select>
          </div>
        </div>

        {/* DEFECT DESCRIPTION */}
        <div className="bg-white p-4 border rounded-md">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            placeholder="Explain the reason for scrap..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.values.partId ||
              !formik.values.returnQuantity
            }
            className="px-10 py-3 bg-blue-600 text-white font-bold hover:bg-blue-800 transition rounded-md shadow-md disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Saving..." : "Save Product Scrap"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md font-bold"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
