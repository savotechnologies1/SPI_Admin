// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import {
//   addStockOrder,
//   selectCustomer,
//   selectProductNumber,
// } from "./https/schedulingApis";
// import { stockOrderValidation } from "../../utils/validation";
// import {
//   CustomerInterface,
//   ProductNumberInterface,
// } from "../../utils/Interfaces";
// import { useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import DatePicker from "react-datepicker";
// const generateNewOrderNumber = () => Date.now().toString();
// const StockOrderForm = () => {
//   const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
//   const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
//     null,
//   );
//   const [productNumberList, setProductNumberList] = useState<
//     ProductNumberInterface[]
//   >([]);
//   const [singleUnitCost, setSingleUnitCost] = useState<number | null>(null);

//   const getLocalDate = () => {
//     const date = new Date();
//     return date.toLocaleDateString("en-CA");
//   };
//   const navigate = useNavigate();
//   useEffect(() => {
//     getCustomer();
//     getProductNumber();
//   }, []);
//   const getCustomer = async () => {
//     try {
//       const response = await selectCustomer();
//       setCustomerList(Array.isArray(response) ? response : []);
//     } catch (error) {
//       setCustomerList([]);
//     }
//   };
//   const getProductNumber = async () => {
//     try {
//       const response = await selectProductNumber();
//       setProductNumberList(Array.isArray(response) ? response : []);
//     } catch (error) {
//       console.error("Error fetching product number:", error);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-2xl border shadow-md">
//       <Formik
//         initialValues={{
//           orderNumber: generateNewOrderNumber(),
//           orderDate: getLocalDate(),
//           shipDate: "",
//           customerId: "",
//           customerName: "",
//           customerEmail: "",
//           customerPhone: "",
//           productId: "",
//           productNumber: "",
//           cost: "",
//           totalCost: "",
//           productQuantity: "",
//           productDescription: "",
//         }}
//         validationSchema={stockOrderValidation}
//         onSubmit={async (values, { setSubmitting, resetForm }) => {
//           try {
//             const response = await addStockOrder(values);
//             if (response.status === 201 || response) {
//               navigate("/stock-order-schedule");
//               console.log(
//                 "response?.data?.messageresponse?.data?.message",
//                 response?.data?.message,
//               );
//             }
//             resetForm({
//               values: {
//                 orderNumber: generateNewOrderNumber(),
//                 orderDate: new Date().toISOString().split("T")[0],
//                 shipDate: "",
//                 customerId: "",
//                 customerName: "",
//                 customerEmail: "",
//                 customerPhone: "",
//                 productId: "",
//                 productNumber: "",
//                 cost: "",
//                 totalCost: "",
//                 productQuantity: "",
//                 productDescription: "",
//               },
//             });
//             setSelectedCustomerId(null);
//             setSingleUnitCost(null);
//           } catch (error) {
//           } finally {
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({
//           values,
//           setFieldValue,
//           errors,
//           touched,
//           isSubmitting,
//           handleBlur,
//         }) => {
//           const handleCustomerSelectChange = (
//             e: React.ChangeEvent<HTMLSelectElement>,
//           ) => {
//             const value = e.target.value;
//             if (value === "new") {
//               const newCustomerId = uuidv4();
//               setFieldValue("customerId", newCustomerId);
//               setSelectedCustomerId(null);
//               setFieldValue("customerName", "");
//               setFieldValue("customerEmail", "");
//               setFieldValue("customerPhone", "");
//             } else if (value) {
//               const selectedCustomer = customerList.find((c) => c.id === value);
//               if (selectedCustomer) {
//                 setFieldValue("customerId", selectedCustomer.id);
//                 setSelectedCustomerId(selectedCustomer.id);
//                 setFieldValue("customerName", selectedCustomer.name);
//                 setFieldValue("customerEmail", selectedCustomer.email);
//                 setFieldValue("customerPhone", selectedCustomer.customerPhone);
//               }
//             } else {
//               setFieldValue("customerId", "");
//               setSelectedCustomerId(null);
//               setFieldValue("customerName", "");
//               setFieldValue("customerEmail", "");
//               setFieldValue("customerPhone", "");
//             }
//           };

//           const handleProductSelectChange = (
//             e: React.ChangeEvent<HTMLSelectElement>,
//           ) => {
//             const selectedProductId = e.target.value;
//             setFieldValue("productId", selectedProductId);

//             if (selectedProductId) {
//               const selectedProduct = productNumberList.find(
//                 (p) => p.productId === selectedProductId,
//               );
//               if (selectedProduct) {
//                 const unitCost = selectedProduct.cost;
//                 const quantity = 1;
//                 setSingleUnitCost(unitCost);
//                 setFieldValue("productNumber", selectedProduct.partNumber);
//                 setFieldValue("cost", unitCost.toFixed(2));
//                 setFieldValue("productQuantity", quantity);
//                 setFieldValue(
//                   "productDescription",
//                   selectedProduct.productDescription,
//                 );
//                 setFieldValue("totalCost", (unitCost * quantity).toFixed(2));
//               }
//             } else {
//               setSingleUnitCost(null);
//               setFieldValue("productId", "");
//               setFieldValue("productNumber", "");
//               setFieldValue("cost", "");
//               setFieldValue("productQuantity", "");
//               setFieldValue("productDescription", "");
//               setFieldValue("totalCost", "");
//             }
//           };

//           const handleQuantityChange = (
//             e: React.ChangeEvent<HTMLInputElement>,
//           ) => {
//             const quantityValue = e.target.value;
//             setFieldValue("productQuantity", quantityValue);

//             const newQuantity = Number(quantityValue);

//             if (singleUnitCost !== null && newQuantity > 0) {
//               const totalCost = singleUnitCost * newQuantity;
//               setFieldValue("totalCost", totalCost.toFixed(2));
//             } else {
//               setFieldValue("totalCost", "");
//             }
//           };

//           return (
//             <Form>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6">
//                 <div className="flex flex-col">
//                   <label className="font-semibold mb-1">Order Number</label>
//                   <Field
//                     name="orderNumber"
//                     type="text"
//                     readOnly
//                     className="border py-3 px-4 rounded-md w-full placeholder-gray-600 bg-gray-100 h-[50px] outline-none"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="font-semibold mb-1">Order Date</label>
//                   <div className="relative w-full">
//                     <DatePicker
//                       selected={
//                         values.orderDate ? new Date(values.orderDate) : null
//                       }
//                       onChange={(date) =>
//                         setFieldValue(
//                           "orderDate",
//                           date ? date.toLocaleDateString("en-CA") : "",
//                         )
//                       }
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="MM/DD/YYYY"
//                       wrapperClassName="w-full"
//                       className="border py-3 px-4 rounded-md w-full placeholder-gray-600 outline-none h-[50px] border-gray-300"
//                     />
//                   </div>
//                   <ErrorMessage
//                     name="orderDate"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div className="flex flex-col">
//                   <label className="font-semibold mb-1">Ship Date</label>
//                   <div className="relative w-full">
//                     <DatePicker
//                       selected={
//                         values.shipDate ? new Date(values.shipDate) : null
//                       }
//                       onChange={(date) =>
//                         setFieldValue(
//                           "shipDate",
//                           date ? date.toLocaleDateString("en-CA") : "",
//                         )
//                       }
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="MM/DD/YYYY"
//                       wrapperClassName="w-full"
//                       className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 outline-none h-[50px] ${
//                         touched.shipDate && errors.shipDate
//                           ? "border-red-500"
//                           : "border-gray-300"
//                       }`}
//                     />
//                   </div>
//                   <ErrorMessage
//                     name="shipDate"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
//                 <div className="flex flex-col ">
//                   <label className="font-semibold">Select Customer</label>
//                   <select
//                     name="customerId"
//                     value={
//                       values.customerId &&
//                       customerList.some((c) => c.id === values.customerId)
//                         ? values.customerId
//                         : ""
//                     }
//                     onChange={handleCustomerSelectChange}
//                     className={`border px-2 py-3 rounded-md ${
//                       touched.customerId && errors.customerId
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   >
//                     <option value="" label="Select a customer" />
//                     <option value="new">➕ Add New Customer</option>
//                     {customerList.map((c) => (
//                       <option key={c.id} value={c.id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                   <ErrorMessage
//                     name="customerId"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-semibold">Customer Name</label>
//                   <Field
//                     name="customerName"
//                     type="text"
//                     readOnly={selectedCustomerId !== null}
//                     placeholder="Enter Customer Name"
//                     className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${
//                       selectedCustomerId !== null ? "bg-gray-100" : ""
//                     } ${
//                       touched.customerName && errors.customerName
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="customerName"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-semibold">Customer Email</label>
//                   <Field
//                     name="customerEmail"
//                     type="email"
//                     readOnly={selectedCustomerId !== null}
//                     placeholder="Enter Customer Email"
//                     className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${
//                       selectedCustomerId !== null ? "bg-gray-100" : ""
//                     } ${
//                       touched.customerEmail && errors.customerEmail
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="customerEmail"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-semibold">Customer Phone</label>
//                   <Field
//                     name="customerPhone"
//                     type="text"
//                     readOnly={selectedCustomerId !== null}
//                     placeholder="Enter Customer Phone"
//                     className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 ${
//                       selectedCustomerId !== null ? "bg-gray-100" : ""
//                     } ${
//                       touched.customerPhone && errors.customerPhone
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="customerPhone"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
//                 <div className="md:col-span-1">
//                   <label className="font-semibold">Product Number</label>
//                   <select
//                     name="productId"
//                     value={values.productId}
//                     onChange={handleProductSelectChange}
//                     onBlur={handleBlur}
//                     className={`border px-2 py-3 rounded-md w-full placeholder-gray-600 ${
//                       touched.productId && errors.productId
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   >
//                     <option value="" label="Select a product" />
//                     {productNumberList.map((product) => (
//                       <option key={product.productId} value={product.productId}>
//                         {product.partNumber}
//                       </option>
//                     ))}
//                   </select>
//                   <ErrorMessage
//                     name="productId"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-semibold">Unit Cost</label>
//                   <p className="border py-3 px-4 rounded-md w-full bg-gray-100 min-h-[48px] flex items-center">
//                     {singleUnitCost !== null
//                       ? `$${singleUnitCost.toFixed(2)}`
//                       : ""}
//                   </p>
//                 </div>
//                 <div>
//                   <label className="font-semibold">Product Quantity</label>
//                   <Field
//                     name="productQuantity"
//                     type="number"
//                     placeholder="Quantity"
//                     onChange={handleQuantityChange}
//                     min="1"
//                     className={`border py-3 px-4 rounded-md w-full text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
//                       touched.productQuantity && errors.productQuantity
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="productQuantity"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-semibold">Total Cost</label>
//                   <Field
//                     name="totalCost"
//                     type="text"
//                     placeholder="Total Cost"
//                     readOnly
//                     className={`border py-3 px-4 rounded-md w-full bg-gray-100 ${
//                       touched.totalCost && errors.totalCost
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="totalCost"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 mt-4 bg-white px-6 ">
//                 <div className="col-span-2">
//                   <label className="font-semibold">Product Description</label>
//                   <Field
//                     name="productDescription"
//                     as="textarea"
//                     rows="4"
//                     readOnly
//                     placeholder="Description"
//                     className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 bg-gray-100 ${
//                       touched.productDescription && errors.productDescription
//                         ? "border-red-500"
//                         : ""
//                     }`}
//                   />
//                   <ErrorMessage
//                     name="productDescription"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-brand text-white text-md hover:bg-blue-800 transition ml-6 rounded-md disabled:bg-gray-400"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Creating..." : "Create Stock Order"}
//                 </button>
//               </div>
//             </Form>
//           );
//         }}
//       </Formik>
//     </div>
//   );
// };

// export default StockOrderForm;
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import {
  addStockOrder,
  selectCustomer,
  selectProductNumber,
} from "./https/schedulingApis";
import { stockOrderValidation } from "../../utils/validation";
import {
  CustomerInterface,
  ProductNumberInterface,
} from "../../utils/Interfaces";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface StockOrderFormValues {
  orderNumber: string;
  orderDate: string;
  shipDate: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productId: string;
  productNumber: string;
  cost: string;
  totalCost: string;
  productQuantity: string | number;
  productDescription: string;
}

const generateNewOrderNumber = () => Date.now().toString();

const StockOrderForm: React.FC = () => {
  const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );
  const [productNumberList, setProductNumberList] = useState<
    ProductNumberInterface[]
  >([]);
  const [singleUnitCost, setSingleUnitCost] = useState<number | null>(null);

  const navigate = useNavigate();

  const getLocalDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-CA");
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [customers, products] = await Promise.all([
          selectCustomer(),
          selectProductNumber(),
        ]);
        setCustomerList(Array.isArray(customers) ? customers : []);
        setProductNumberList(Array.isArray(products) ? products : []);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const initialValues: StockOrderFormValues = {
    orderNumber: generateNewOrderNumber(),
    orderDate: getLocalDate(),
    shipDate: "",
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productId: "",
    productNumber: "",
    cost: "",
    totalCost: "",
    productQuantity: "",
    productDescription: "",
  };

  const handleOnSubmit = async (
    values: StockOrderFormValues,
    { setSubmitting, resetForm }: FormikHelpers<StockOrderFormValues>,
  ) => {
    try {
      const response = await addStockOrder(values);
      if (response) {
        navigate("/stock-order-schedule");
      }
      resetForm({
        values: {
          ...initialValues,
          orderNumber: generateNewOrderNumber(),
          orderDate: getLocalDate(),
        },
      });
      setSelectedCustomerId(null);
      setSingleUnitCost(null);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl border shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={stockOrderValidation}
        onSubmit={handleOnSubmit}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          isSubmitting,
          handleBlur,
        }) => {
          const handleCustomerSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            const value = e.target.value;
            if (value === "new") {
              const newCustomerId = uuidv4();
              setFieldValue("customerId", newCustomerId);
              setSelectedCustomerId(null);
              setFieldValue("customerName", "");
              setFieldValue("customerEmail", "");
              setFieldValue("customerPhone", "");
            } else if (value) {
              const selectedCustomer = customerList.find((c) => c.id === value);
              if (selectedCustomer) {
                setFieldValue("customerId", selectedCustomer.id);
                setSelectedCustomerId(selectedCustomer.id);
                setFieldValue("customerName", selectedCustomer.name);
                setFieldValue("customerEmail", selectedCustomer.email);
                setFieldValue("customerPhone", selectedCustomer.customerPhone);
              }
            } else {
              setFieldValue("customerId", "");
              setSelectedCustomerId(null);
              setFieldValue("customerName", "");
              setFieldValue("customerEmail", "");
              setFieldValue("customerPhone", "");
            }
          };

          const handleProductSelectChange = (
            e: React.ChangeEvent<HTMLSelectElement>,
          ) => {
            const selectedProductId = e.target.value;
            setFieldValue("productId", selectedProductId);

            if (selectedProductId) {
              const selectedProduct = productNumberList.find(
                (p) => p.productId === selectedProductId,
              );
              if (selectedProduct) {
                const unitCost = selectedProduct.cost;
                const quantity = 1;
                setSingleUnitCost(unitCost);
                setFieldValue("productNumber", selectedProduct.partNumber);
                setFieldValue("cost", unitCost.toFixed(2));
                setFieldValue("productQuantity", quantity);
                setFieldValue(
                  "productDescription",
                  selectedProduct.productDescription,
                );
                setFieldValue("totalCost", (unitCost * quantity).toFixed(2));
              }
            } else {
              setSingleUnitCost(null);
              setFieldValue("productId", "");
              setFieldValue("productNumber", "");
              setFieldValue("cost", "");
              setFieldValue("productQuantity", "");
              setFieldValue("productDescription", "");
              setFieldValue("totalCost", "");
            }
          };

          const handleQuantityChange = (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const quantityValue = e.target.value;
            setFieldValue("productQuantity", quantityValue);
            const newQuantity = Number(quantityValue);

            if (singleUnitCost !== null && newQuantity > 0) {
              setFieldValue(
                "totalCost",
                (singleUnitCost * newQuantity).toFixed(2),
              );
            } else {
              setFieldValue("totalCost", "");
            }
          };

          return (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6">
                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Order Number</label>
                  <Field
                    name="orderNumber"
                    type="text"
                    readOnly
                    className="border py-3 px-4 rounded-md w-full bg-gray-100 h-[50px] outline-none"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Order Date</label>
                  <DatePicker
                    selected={
                      values.orderDate
                        ? new Date(values.orderDate + "T00:00:00")
                        : null
                    }
                    onChange={(date: Date | null) =>
                      setFieldValue(
                        "orderDate",
                        date ? date.toLocaleDateString("en-CA") : "",
                      )
                    }
                    dateFormat="MM/dd/yyyy"
                    className="border py-3 px-4 rounded-md w-full outline-none h-[50px] border-gray-300"
                  />
                  <ErrorMessage
                    name="orderDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-semibold mb-1">Ship Date</label>
                  <DatePicker
                    selected={
                      values.shipDate
                        ? new Date(values.shipDate + "T00:00:00")
                        : null
                    }
                    onChange={(date: Date | null) =>
                      setFieldValue(
                        "shipDate",
                        date ? date.toLocaleDateString("en-CA") : "",
                      )
                    }
                    dateFormat="MM/dd/yyyy"
                    className={`border py-3 px-4 rounded-md w-full outline-none h-[50px] ${
                      touched.shipDate && errors.shipDate
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="shipDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6">
                <div className="flex flex-col">
                  <label className="font-semibold">Select Customer</label>
                  <select
                    name="customerId"
                    value={
                      customerList.some((c) => c.id === values.customerId)
                        ? values.customerId
                        : values.customerId === uuidv4()
                          ? values.customerId
                          : ""
                    }
                    onChange={handleCustomerSelectChange}
                    className={`border px-2 py-3 rounded-md ${touched.customerId && errors.customerId ? "border-red-500" : ""}`}
                  >
                    <option value="">Select a customer</option>
                    <option value="new">➕ Add New Customer</option>
                    {customerList.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="customerId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                {["customerName", "customerEmail", "customerPhone"].map(
                  (field) => (
                    <div key={field}>
                      <label className="font-semibold capitalize">
                        {field.replace("customer", "Customer ")}
                      </label>
                      <Field
                        name={field}
                        readOnly={selectedCustomerId !== null}
                        className={`border py-3 px-4 rounded-md w-full ${selectedCustomerId !== null ? "bg-gray-100" : ""} ${
                          touched[field as keyof StockOrderFormValues] &&
                          errors[field as keyof StockOrderFormValues]
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                      <ErrorMessage
                        name={field}
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  ),
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white px-6">
                <div>
                  <label className="font-semibold">Product Number</label>
                  <select
                    name="productId"
                    value={values.productId}
                    onChange={handleProductSelectChange}
                    onBlur={handleBlur}
                    className={`border px-2 py-3 rounded-md w-full ${touched.productId && errors.productId ? "border-red-500" : ""}`}
                  >
                    <option value="">Select a product</option>
                    {productNumberList.map((p) => (
                      <option key={p.productId} value={p.productId}>
                        {p.partNumber}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage
                    name="productId"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Unit Cost</label>
                  <div className="border py-3 px-4 rounded-md w-full bg-gray-100 min-h-[48px] flex items-center">
                    {singleUnitCost !== null
                      ? `$${singleUnitCost.toFixed(2)}`
                      : ""}
                  </div>
                </div>
                <div>
                  <label className="font-semibold">Quantity</label>
                  <Field
                    name="productQuantity"
                    type="number"
                    onChange={handleQuantityChange}
                    className={`border py-3 px-4 rounded-md w-full ${touched.productQuantity && errors.productQuantity ? "border-red-500" : ""}`}
                  />
                  <ErrorMessage
                    name="productQuantity"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label className="font-semibold">Total Cost</label>
                  <Field
                    name="totalCost"
                    readOnly
                    className="border py-3 px-4 rounded-md w-full bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 mt-4 bg-white px-6">
                <label className="font-semibold">Product Description</label>
                <Field
                  name="productDescription"
                  as="textarea"
                  rows="4"
                  readOnly
                  className="border py-3 px-4 rounded-md w-full bg-gray-100"
                />
              </div>

              <div className="mt-6 px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-brand text-white rounded-md hover:bg-blue-800 transition disabled:bg-gray-400"
                >
                  {isSubmitting ? "Creating..." : "Create Stock Order"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default StockOrderForm;
