import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { addSupplierOrder, selectSupplier } from "./https/suppliersApi";
import { selectProductApi } from "../Work_Instrcution.tsx/https/workInstructionApi";
import Select, { SingleValue } from "react-select";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Supplier {
  id: string;
  name: string;
}

interface Product {
  id: string;
  partNumber: string;
}

interface FormValues {
  order_number: string;
  order_date: Date | null;
  supplier_id: string;
  part_id: string;
  quantity: number | "";
  cost: number | "";
  need_date: Date | null;
  showFields: boolean;
  firstName: string;
  lastName: string;
  email: string;
}

interface ProductOption {
  value: string;
  label: string;
}

const validationSchema = Yup.object({
  order_date: Yup.date().nullable().required("Order Date is required"),
  showFields: Yup.boolean(),
  supplier_id: Yup.string().when("showFields", {
    is: false,
    then: (schema) =>
      schema.required("Please select a supplier or add a new one."),
    otherwise: (schema) => schema.notRequired(),
  }),
  firstName: Yup.string().when("showFields", {
    is: true,
    then: (schema) =>
      schema.required("First name is required for a new supplier."),
  }),
  lastName: Yup.string().when("showFields", {
    is: true,
    then: (schema) =>
      schema.required("Last name is required for a new supplier."),
  }),
  email: Yup.string().when("showFields", {
    is: true,
    then: (schema) =>
      schema
        .email("Please enter a valid email address.")
        .required("Email is required for a new supplier."),
  }),
  part_id: Yup.string().required("Product is required"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  cost: Yup.number()
    .min(0, "Cost cannot be negative")
    .required("Cost is required"),
  need_date: Yup.date().nullable().required("Required By Date is required"),
});

const SupplierOrdersForm: React.FC = () => {
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [productData, setProductData] = useState<Product[]>([]);
  const [orderNumber, setOrderNumber] = useState<string>("");
  const navigate = useNavigate();

  const generateOrderNum = () =>
    Math.floor(10000 + Math.random() * 90000).toString();

  useEffect(() => {
    setOrderNumber(generateOrderNum());

    const fetchInitialData = async () => {
      try {
        const suppliers = await selectSupplier();
        const productsResponse = await selectProductApi();
        setSupplierData(suppliers || []);
        setProductData(productsResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  const initialValues: FormValues = {
    order_number: "",
    order_date: null,
    supplier_id: "",
    part_id: "",
    quantity: "",
    cost: "",
    need_date: null,
    showFields: false,
    firstName: "",
    lastName: "",
    email: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    const { showFields, firstName, lastName, email, ...orderData } = values;

    let finalPayload: any = { ...orderData };
    const tempId = uuidv4();

    if (showFields) {
      finalPayload.supplier_id = null;
      finalPayload.newSupplier = {
        firstName,
        lastName,
        email,
        supplier_id: tempId,
      };
    }

    try {
      const response = await addSupplierOrder(finalPayload);
      if (response && response.status === 201) {
        navigate("/supplier-order-list");
      }
      const newOrderNum = generateOrderNum();
      setOrderNumber(newOrderNum);
      resetForm({ values: { ...initialValues, order_number: newOrderNum } });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border shadow-md max-w-4xl">
      <Formik
        enableReinitialize
        initialValues={{ ...initialValues, order_number: orderNumber }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm, setFieldValue, values, touched, errors }) => (
          <Form className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
                Order Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-2">
                    Order Number
                  </label>
                  <p className="border py-3 px-4 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed">
                    {values.order_number}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="order_date"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Order Date
                  </label>
                  <DatePicker
                    selected={values.order_date}
                    onChange={(date: Date | null) =>
                      setFieldValue("order_date", date)
                    }
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select Order Date"
                    className="border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.order_date && touched.order_date && (
                    <div className="text-red-500 text-sm mt-1">
                      {String(errors.order_date)}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="supplier_id"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Supplier
                  </label>
                  <div className="flex items-start gap-4">
                    <div className="flex-grow">
                      <Field
                        as="select"
                        id="supplier_id"
                        name="supplier_id"
                        disabled={values.showFields}
                        className={`border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 ${
                          values.showFields
                            ? "bg-gray-100 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <option value="">-- Select Supplier --</option>
                        {supplierData.map((supplier) => (
                          <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="supplier_id"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue("showFields", !values.showFields);
                        if (!values.showFields)
                          setFieldValue("supplier_id", "");
                      }}
                      className="bg-blue-100 text-blue-600 font-semibold px-4 py-3 rounded-md flex items-center gap-2 hover:bg-blue-200 transition"
                    >
                      {values.showFields ? "Cancel" : "Add New"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {values.showFields && (
              <div className="border-t pt-6 mt-6 border-dashed">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Add a New Supplier
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      placeholder="Enter First Name"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      placeholder="Enter Last Name"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-2">
                      Supplier Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter Supplier Email"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-6">
                Item Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="part_id"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Select Product
                  </label>
                  <Select<ProductOption>
                    options={productData.map((item) => ({
                      value: item.id,
                      label: item.partNumber,
                    }))}
                    onChange={(option: SingleValue<ProductOption>) =>
                      setFieldValue("part_id", option ? option.value : "")
                    }
                    value={
                      productData
                        .map((item) => ({
                          value: item.id,
                          label: item.partNumber,
                        }))
                        .find((opt) => opt.value === values.part_id) || null
                    }
                    isClearable
                    placeholder="Search or select a product..."
                  />
                  <ErrorMessage
                    name="part_id"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Order Quantity
                  </label>
                  <Field
                    id="quantity"
                    name="quantity"
                    type="number"
                    className="border py-3 px-4 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cost"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Total Cost ($)
                  </label>
                  <Field
                    id="cost"
                    name="cost"
                    type="number"
                    className="border py-3 px-4 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="cost"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="need_date"
                    className="font-semibold text-gray-700 block mb-2"
                  >
                    Required By (Need Date)
                  </label>
                  <DatePicker
                    selected={values.need_date}
                    onChange={(date: Date | null) =>
                      setFieldValue("need_date", date)
                    }
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Select Need Date"
                    className="border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.need_date && touched.need_date && (
                    <div className="text-red-500 text-sm mt-1">
                      {String(errors.need_date)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 pt-6 border-t">
              <button
                type="button"
                className="text-gray-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 flex items-center gap-2"
                onClick={() => resetForm()}
              >
                <FontAwesomeIcon icon={faRotateRight} /> Reset Form
              </button>
              <button
                type="submit"
                className="bg-brand text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Supplier Order
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SupplierOrdersForm;
