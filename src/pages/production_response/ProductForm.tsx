import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  ScrapEntryApi,
  selectProductNumber,
} from "./https/productionResponseApi";
import { selectCustomer } from "../order_schedule/https/schedulingApis";

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
      defectDesc: "",
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
