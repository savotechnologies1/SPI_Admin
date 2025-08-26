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
  updateScrapEntry,
} from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";

const EditPartScrapEntry = () => {
  const [partData, setPartData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // To manage loading state
  const { id } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      searchPart: "",
      partId: "",
      supplier: "",
      supplierId: "",
      returnQuantity: "",
      scrapStatus: "yes",
      type: "part",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);
        const payload = {
          ...values,
          type: "part",
          returnQuantity: parseInt(values.returnQuantity, 10) || 0,
        };
        // Ensure your updateScrapEntry function handles errors and toasts
        const response = await updateScrapEntry(id, payload);
        if (response.status === 200) {
          navigate("/scrap-entries");
        }
        // Optionally, navigate the user away after success
        // navigate('/scrap-entries');
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
        const [partsRes, suppliersRes, entryRes] = await Promise.all([
          selectPartNamber(),
          selectSupplier(),
          scrapEntryDetail(id),
        ]);
        const allParts = partsRes?.data || [];
        const allSuppliers = suppliersRes || [];
        setPartData(allParts);
        setSupplierData(allSuppliers);

        const entryData = entryRes.data.data;
        formik.setValues({
          searchPart: entryData.PartNumber?.partNumber || "",
          partId: entryData.partId || "",
          supplier: entryData.supplier?.name || "",
          supplierId: entryData.supplierId || "",
          returnQuantity: entryData.returnQuantity?.toString() || "",
          scrapStatus: entryData.scrapStatus === true ? "yes" : "no",
          type: entryData.type || "part",
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchInitialData();
    }
  }, [id]); // Only re-run if the ID changes

  const handleSuggestionClick = (part) => {
    formik.setFieldValue("searchPart", part.partNumber);
    formik.setFieldValue("partId", part.id);
    setSuggestions([]);
  };

  const handleSupplierClick = (supplier) => {
    formik.setFieldValue("supplier", supplier.name);
    formik.setFieldValue("supplierId", supplier.id);
    setSupplierSuggestions([]);
  };

  const handleReset = () => {
    formik.resetForm();
    setSuggestions([]);
    setSupplierSuggestions([]);
  };

  // This useEffect is now for filtering based on typing
  useEffect(() => {
    if (!formik.values.searchPart) {
      setSuggestions([]);
      return;
    }
    const filtered = partData.filter((part) =>
      part.partNumber
        .toLowerCase()
        .includes(formik.values.searchPart.toLowerCase())
    );
    setSuggestions(filtered);
  }, [formik.values.searchPart]);

  // This useEffect is for filtering suppliers based on typing
  useEffect(() => {
    if (!formik.values.supplier) {
      setSupplierSuggestions([]);
      return;
    }
    const filtered = supplierData.filter((supplier) =>
      supplier.name.toLowerCase().includes(formik.values.supplier.toLowerCase())
    );
    setSupplierSuggestions(filtered);
  }, [formik.values.supplier]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className="py-4 px-5">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
          Edit Part Scrap Entry
        </h1>
        {/* Breadcrumbs etc. */}

        {/* Part Search Input */}
        <div className="bg-white p-4 relative">
          <label className="block font-semibold mb-1">Search Part</label>
          <input
            type="text"
            placeholder="Search part ....."
            className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", ""); // Clear ID when typing
              const filtered = partData.filter((part) =>
                part.partNumber
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setSuggestions(filtered);
            }}
            onFocus={() => {
              if (formik.values.searchPart) {
                const filtered = partData.filter((part) =>
                  part.partNumber
                    .toLowerCase()
                    .includes(formik.values.searchPart.toLowerCase())
                );
                setSuggestions(filtered);
              } else {
                setSuggestions(partData); // Show all parts on focus
              }
            }}
            onBlur={() => setTimeout(() => setSuggestions([]), 150)}
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {suggestions.map((part) => (
                <li
                  key={part.id}
                  className="p-2 hover:bg-brand hover:text-white cursor-pointer"
                  onClick={() => handleSuggestionClick(part)}
                >
                  {part.partNumber} (Stock: {part.stock ?? "N/A"})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Supplier Input */}
        <div className="bg-white p-4 relative mt-4">
          <label className="block font-semibold mb-1">Supplier</label>
          <input
            type="text"
            placeholder="Search Supplier"
            className="border py-3 px-4 rounded-md w-full text-gray-600"
            value={formik.values.supplier}
            onChange={(e) => {
              formik.setFieldValue("supplier", e.target.value);
              formik.setFieldValue("supplierId", ""); // Clear ID when user types
            }}
            // <<< THE FIX IS HERE >>>
            // Always show the full list on focus.
            onFocus={() => setSupplierSuggestions(supplierData)}
            onBlur={() => setTimeout(() => setSupplierSuggestions([]), 150)}
          />
          {supplierSuggestions.length > 0 && (
            <ul className="absolute z-50 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {supplierSuggestions.map((supplier) => (
                <li
                  key={supplier.id}
                  className="p-2 hover:bg-brand hover:text-white cursor-pointer"
                  onClick={() => handleSupplierClick(supplier)}
                >
                  {supplier.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Return Quantity & Scrap Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 mt-4">
          <div>
            <label className="block font-semibold mb-1">Return Quantity</label>
            <input
              type="number"
              placeholder="Enter Return Quantity"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("returnQuantity")}
              min="0"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
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

        {/* Buttons */}
        <div className="flex items-center justify-between bg-white p-6 mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md"
            disabled={formik.isSubmitting}
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

export default EditPartScrapEntry;
