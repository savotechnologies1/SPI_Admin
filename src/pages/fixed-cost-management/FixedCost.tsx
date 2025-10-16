import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { toast } from "react-toastify";
const FixedCost = () => {
  const [records, setRecords] = useState([]);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const validationSchema = Yup.object({
    category: Yup.string().required("Required"),
    name: Yup.string().required("Required"),
    cost: Yup.number().required("Required").positive("Must be positive"),
    depreciation: Yup.number()
      .min(0)
      .max(100, "0-100 only")
      .required("Required"),
  });

  return (
    <div className="p-6 max-w-6xl  bg-gray-50 min-h-screen mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ">
        Fixed Cost Management
      </h2>

      {/* Form Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Add New Fixed Cost
        </h3>

        <Formik
          initialValues={{ category: "", name: "", cost: "", depreciation: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await axios.post(
                `${BASE_URL}/api/admin/fixed-data-calulation`,
                values
              );
              console.log("responseresponse", response);
              toast.success("Fixed cost added successfully!");
              setRecords([...records, response.data]); // add saved record with id
              resetForm();
            } catch (error) {
              console.error("Error adding fixed cost:", error);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="">
              {/* Category */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2 ">
                  Cost Category
                </label>
                <Field
                  type="text"
                  name="category"
                  placeholder="Cost category"
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.category && touched.category
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Name
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Expense Name"
                  className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Cost */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Cost / Year
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <Field
                    type="number"
                    name="cost"
                    className={`border rounded-lg p-3 w-full pl-7 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.cost && touched.cost
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0.00"
                  />
                </div>
                <ErrorMessage
                  name="cost"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Depreciation */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Depreciation %
                </label>
                <div className="relative">
                  <Field
                    type="number"
                    name="depreciation"
                    className={`border rounded-lg p-3 w-full pr-7 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                      errors.depreciation && touched.depreciation
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="0-100"
                  />
                  <span className="absolute right-3 top-3 text-gray-500">
                    %
                  </span>
                </div>
                <ErrorMessage
                  name="depreciation"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="md:col-span-2 lg:col-span-4 flex justify-end pt-2">
                <button
                  type="submit"
                  className="bg-brand text-white px-6 py-2.5 rounded-lg mt-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition shadow-md"
                >
                  Add Fixed Cost
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FixedCost;
