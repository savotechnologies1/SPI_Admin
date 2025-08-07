import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { selectPartNamber } from "../product&BOM/https/partProductApis";
import { ScrapEntryApi } from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";

const PartForm = () => {
  const [partData, setPartData] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [supplierData, setSupplierData] = useState<any[]>([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState<any[]>([]);

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
    onSubmit: async (values) => {
      console.log("Form Submitted:", values);
      await ScrapEntryApi({
        ...values,
        type: "part",
      });
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const parts = await selectPartNamber();
        const suppliers = await selectSupplier();
        setPartData(parts?.data || []);
        console.log("supplierssuppliers", suppliers);

        setSupplierData(suppliers || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  console.log(
    "supplierSuggestionssupplierSuggestions",
    suggestions,
    supplierSuggestions
  );

  // Filter part suggestions
  useEffect(() => {
    if (formik.values.searchPart && !formik.values.partId) {
      const filteredSuggestions = partData.filter((part) =>
        part.partNumber
          .toLowerCase()
          .includes(formik.values.searchPart.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, partData]);

  // Filter supplier suggestions
  useEffect(() => {
    if (formik.values.supplier && !formik.values.supplierId) {
      const filteredSuppliers = supplierData.filter((s) =>
        s.name.toLowerCase().includes(formik.values.supplier.toLowerCase())
      );
      setSupplierSuggestions(filteredSuppliers);
    } else {
      setSupplierSuggestions([]);
    }
  }, [formik.values.supplier, formik.values.supplierId, supplierData]);

  // Select part
  const handleSuggestionClick = (part: any) => {
    formik.setFieldValue("searchPart", part.partNumber);
    formik.setFieldValue("partId", part.id);
    setSuggestions([]);
  };

  // Select supplier
  const handleSupplierClick = (supplier: any) => {
    formik.setFieldValue("supplier", supplier.name);
    formik.setFieldValue("supplierId", supplier.id);
    setSupplierSuggestions([]);
  };

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="">
        {/* 🔍 Search Part Input */}
        <div className="bg-white p-4">
          <label className="block font-semibold mb-1">
            Search Part For Update
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search part for update....."
              className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
              value={formik.values.searchPart}
              onChange={(e) => {
                formik.setFieldValue("searchPart", e.target.value);
                formik.setFieldValue("partId", "");
              }}
              onFocus={() => {
                if (formik.values.searchPart && !formik.values.partId) {
                  const filtered = partData.filter((part) =>
                    part.partNumber
                      .toLowerCase()
                      .includes(formik.values.searchPart.toLowerCase())
                  );
                  setSuggestions(filtered);
                }
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
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(part)}
                  >
                    {part.partNumber} (Stock: {part.stock})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 🔍 Supplier Input with Suggestions */}
        <div className="grid grid-cols-1 gap-4 bg-white p-4">
          <label className="block font-semibold mb-1">Supplier</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Supplier"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              value={formik.values.supplier}
              onChange={(e) => {
                formik.setFieldValue("supplier", e.target.value);
                formik.setFieldValue("supplierId", "");
                const filtered = supplierData.filter((s) =>
                  s.name.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setSupplierSuggestions(filtered);
              }}
              onFocus={() => {
                if (formik.values.supplier && !formik.values.supplierId) {
                  const filtered = supplierData.filter((s) =>
                    s.name
                      .toLowerCase()
                      .includes(formik.values.supplier.toLowerCase())
                  );
                  setSupplierSuggestions(filtered);
                }
              }}
              onBlur={() => {
                setTimeout(() => setSupplierSuggestions([]), 150);
              }}
            />
            {supplierSuggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {supplierSuggestions.map((supplier) => (
                  <li
                    key={supplier.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSupplierClick(supplier)}
                  >
                    {supplier.name}
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

        {/* ✅ Buttons */}
        <div className="flex items-center justify-start bg-white p-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md"
          >
            Save Scrap
          </button>
          <button
            type="button"
            onClick={() => formik.resetForm()}
            className="ml-4 px-6 py-2 text-red-500 hover:text-red-700 transition rounded-md flex items-center"
          >
            <span className="text-lg mr-1">🔄</span> Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartForm;
