import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  ScrapEntryApi,
  selectProductNamber1,
} from "./https/productionResponseApi";
import { selectCustomer } from "../order_schedule/https/schedulingApis";
import { toast } from "react-toastify";

const ProductForm = () => {
  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [productSuggestions, setProductSuggestions] = useState([]);
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        type: values.type,
        partId: values.partId,
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

  useEffect(() => {
    (async () => {
      try {
        const [products, customers] = await Promise.all([
          selectProductNamber1(),
          selectCustomer(),
        ]);

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
    <div className=" p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
        autoComplete="off"
      >
        <div className="relative">
          <label className="block font-semibold mb-1">Search Product *</label>
          <input
            type="text"
            placeholder="Search product number....."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", "");
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
              <option value="yes">Yes </option>
              <option value="no">No </option>
            </select>
          </div>
        </div>
        <div className="bg-white p-4 border rounded-md">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            placeholder="Explain the reason for scrap..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.values.partId ||
              !formik.values.returnQuantity
            }
            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition disabled:bg-gray-400"
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
