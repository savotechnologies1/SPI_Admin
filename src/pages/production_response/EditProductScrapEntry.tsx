import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import {
  scrapEntryDetail,
  selectProductNumber,
  updateScrapEntry,
} from "./https/productionResponseApi";
import { BASE_URL } from "../../utils/axiosInstance";
import { selectCustomer } from "../order_schedule/https/schedulingApis";

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

const EditProductScrapEntry = () => {
  const [partData, setPartData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [customerSuggestions, setCustomerSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      searchPart: "",
      partId: "",
      customer: "",
      customerId: "",
      returnQuantity: "",
      scrapStatus: "yes",
      type: "product",
      defectDesc: "", // ✅ Added Defect Description
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        const payload = {
          ...values,
          type: "product",
          returnQuantity: parseInt(values.returnQuantity, 10) || 0,
          scrapStatus: values.scrapStatus === "yes" ? true : false,
        };
        const response = await updateScrapEntry(id, payload);
        if (response.status === 200) {
          navigate("/scrap-entries");
        }
      } catch (error) {
        console.error("Error updating scrap entry:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [partsRes, customersRes, entryRes] = await Promise.all([
          selectProductNumber(),
          selectCustomer(),
          scrapEntryDetail(id),
        ]);

        setPartData(partsRes || []);
        setCustomerData(customersRes || []);

        // ✅ Prefilling Logic from API JSON
        const data = entryRes.data.data;
        formik.setValues({
          searchPart: data.PartNumber?.partNumber || "",
          partId: data.partId || "",
          customer: data.customer?.name || "", // Agar customer obj me name ho
          customerId: data.customersId || "", // Aapke JSON me customersId hai
          returnQuantity: data.returnQuantity?.toString() || "",
          scrapStatus: data.scrapStatus === true ? "yes" : "no",
          type: data.type || "product",
          defectDesc: data.defectDesc || "", // ✅ Prefill Defect Desc
        });
      } catch (error) {
        console.error("Error fetching scrap entry details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchInitialData();
  }, [id]);

  // Product Suggestions Logic
  useEffect(() => {
    if (formik.values.searchPart && !formik.values.partId) {
      const filtered = partData.filter((part) =>
        part.partNumber
          .toLowerCase()
          .includes(formik.values.searchPart.toLowerCase()),
      );
      setSuggestions(filtered);
    } else if (!formik.values.searchPart) {
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
    } else if (!formik.values.customer) {
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

  const handleReset = () => {
    formik.resetForm();
    setSuggestions([]);
    setCustomerSuggestions([]);
  };

  if (isLoading) return <div className="p-10 text-center">Loading Data...</div>;

  return (
    <div className="py-4 px-5">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
          Edit Product Scrap Entry
        </h1>

        <div className="flex gap-2 items-center mb-6">
          <p className="text-[14px] text-black">
            <NavLink to="/scrap-entries">Scrap Entries </NavLink>
          </p>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-[14px] text-gray-500">
            Edit Product Scrap Entry
          </span>
        </div>

        {/* 🔍 Search Product Input */}
        <div className="bg-white p-4 relative border rounded-md">
          <label className="block font-semibold mb-1">Search Product</label>
          <input
            type="text"
            placeholder="Search product ....."
            className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", "");
            }}
            onFocus={() =>
              !formik.values.searchPart && setSuggestions(partData)
            }
            onBlur={() => setTimeout(() => setSuggestions([]), 150)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {suggestions.map((part) => (
                <li
                  key={part.id}
                  className="p-2 hover:bg-brand hover:text-white cursor-pointer"
                  onClick={() => handleSuggestionClick(part)}
                >
                  {part.partNumber} (Stock: {part.availStock ?? "0"})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 👥 Customer Selection Input */}
        <div className="bg-white p-4 relative mt-4 border rounded-md">
          <label className="block font-semibold mb-1">Customer</label>
          <input
            type="text"
            placeholder="Search Customer"
            className="border py-3 px-4 rounded-md w-full text-gray-600"
            value={formik.values.customer}
            onChange={(e) => {
              formik.setFieldValue("customer", e.target.value);
              formik.setFieldValue("customerId", "");
            }}
            onFocus={() =>
              !formik.values.customer && setCustomerSuggestions(customerData)
            }
            onBlur={() => setTimeout(() => setCustomerSuggestions([]), 150)}
          />
          {customerSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {customerSuggestions.map((customer) => (
                <li
                  key={customer.id}
                  className="p-2 hover:bg-brand hover:text-white cursor-pointer"
                  onClick={() => handleCustomerClick(customer)}
                >
                  {customer.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 📦 Return Quantity & Scrap Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 mt-4 border rounded-md">
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

        {/* 📝 Defect Description Field */}
        <div className="bg-white p-4 mt-4 border rounded-md">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            placeholder="Enter reason for scrap or defect details..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        {/* ✅ Action Buttons */}
        <div className="flex items-center justify-between bg-white p-6 mt-4 border rounded-md">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Updating..." : "Update Scrap Entry"}
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

export default EditProductScrapEntry;
