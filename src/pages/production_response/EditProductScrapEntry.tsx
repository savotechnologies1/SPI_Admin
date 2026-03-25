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
      searchPart: "",
      partId: "",
      customer: "",
      customerId: "",
      returnQuantity: "",
      scrapStatus: "yes",
      type: "product",
      defectDesc: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      const payload = {
        type: "product",
        partId: values.partId,
        customerId: values.customerId || null,
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

        <div className="bg-white p-4 border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

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
