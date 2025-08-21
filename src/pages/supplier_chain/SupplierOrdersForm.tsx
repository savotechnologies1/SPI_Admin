// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import del_img from "../../assets/delete_1.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// import { addSupplierOrder, selectSupplier } from "./https/suppliersApi";

// const SupplierOrdersForm = () => {
//   const [showFields, setShowFields] = useState(false);

//   const handleClick = () => {
//     setShowFields(true); // Show fields when clicking the Add button
//   };

//   // const [formData, setFormData] = useState({
//   //   orderNumber: "",
//   //   orderDate: "2025-02-26",
//   //   shipDate: "2025-02-26",
//   //   customer: "Cortez Herring",
//   //   customerName: "",
//   //   customerEmail: "",
//   //   customerPhone: "",
//   //   productNumber: "",
//   //   cost: "",
//   //   quantity: "",
//   //   description: "",
//   //   file: null,
//   //   partFamily: "Cortez Herring",
//   //   partNumber: "",
//   //   partDesc: "",
//   //   partQuantity: "",
//   //   partCost: "",
//   //   time: "09:33 AM",
//   //   process: "Cortez Herring",
//   //   assignTo: "Cortez Herring",
//   // });

//   const [order_number, setOrderNumber] = useState("");

//   const { register, handleSubmit, setValue } = useForm();

//   const onSubmit = async (data: object) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       const response = await addSupplierOrder(data);
//       //  if (response.status === 201) {
//       //   navigate("/all-supplier");
//       // }
//     } catch (error: unknown) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     setValue("order_number", order_number);
//   }, [order_number, setValue]);

//   useEffect(() => {
//     const randomOrder = +Math.floor(10000 + Math.random() * 90000);
//     setOrderNumber(randomOrder.toString());
//   }, []);
//   const [supplierData, setSupplierData] = useState([]);
//   const fetchCustomerList = async (page = 1) => {
//     // eslint-disable-next-line no-useless-catch
//     try {
//       const response = await selectSupplier();
//       setSupplierData(response);
//     } catch (error) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchCustomerList();
//   }, []);

//   return (
//     <div className="p-4 bg-white rounded-2xl border shadow-md">
//       <form onSubmit={handleSubmit(onSubmit)} className="">
//         {/* Channel & Platform */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white  ">
//           {/* <div>
//             <label className="font-semibold">Order Number</label>
//             <input
//               {...register("order_number", {
//                 required: "Order Number required",
//               })}
//               type="number"
//               readOnly
//               placeholder="Enter Order Number"
//               className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//             />
//           </div> */}
//           <div>
//             <label className="font-semibold">Order Number</label>
//             <p
//               className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 bg-gray-100"
//               {...register("order_number", {
//                 required: "Order Number required",
//               })}
//             >
//               {" "}
//               {order_number}
//             </p>
//           </div>
//           <div>
//             <label className="font-semibold">Order Date</label>
//             <input
//               {...register("order_date", {
//                 required: "Order Date is required",
//               })}
//               type="date"
//               placeholder=""
//               className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//             />
//           </div>
//           <div>
//             <label className="font-semibold">Supplier</label>
//             <select
//               {...register("supplier_id")}
//               className="border py-3 px-4 rounded-md w-full text-gray-600"
//             >
//               <option value="">-- Select Supplier --</option>
//               {supplierData.map((item) => (
//                 <option key={item.id} value={item.id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <Link
//             className="md:col-span-3 flex items-center justify-end gap-2"
//             to="/add-supplier"
//           >
//             <span
//               className="text-blue-500 text-sm flex items-center gap-1 cursor-pointer"
//               onClick={handleClick}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-4 h-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               Add New supplier
//             </span>
//           </Link>
//         </div>

//         {/* Render Fields When Clicked */}
//         {showFields && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-white  ">
//             <div>
//               <label className="font-semibold">Customer Name</label>
//               <input
//                 {...register("customerName", {
//                   required: "Customer name required",
//                 })}
//                 type="text"
//                 placeholder="Enter Customer Name"
//                 className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//               />
//             </div>
//             <div>
//               <label className="font-semibold">Customer Email</label>
//               <input
//                 {...register("customerEmail", {
//                   required: "Customer Email  required",
//                 })}
//                 type="email"
//                 placeholder="Enter Customer Email"
//                 className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//               />
//             </div>
//             <div className="flex items-center gap-4">
//               <div>
//                 <label className="font-semibold">Customer Phone</label>
//                 <input
//                   {...register("customerPhone", {
//                     required: "Customer number  required",
//                   })}
//                   type="number"
//                   placeholder="Enter Customer Phone"
//                   className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//                 />
//               </div>
//               <div
//                 onClick={() => setShowFields(false)}
//                 className="bg-red-600 p-2 rounded-full cursor-pointer"
//               >
//                 <img src={del_img} alt="" />
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 bg-white  ">
//           <div>
//             <label className="font-semibold">
//               Select Part{" "}
//               <span className="text-  text-gray-400 text-[10px]">
//                 (you can select multiple)
//               </span>{" "}
//             </label>
//             <select
//               {...register("part_name")}
//               className="border py-3 px-4 rounded-md w-full  text-gray-600 "
//             >
//               <option value="Cortez Herring">Cortez Herring </option>
//               <option value="Swizz ">Swizz </option>
//             </select>
//           </div>

//           <div>
//             <label className="font-semibold">Order Quantity</label>
//             <input
//               {...register("quantity", {})}
//               type="number"
//               placeholder="Enter part Quantity"
//               className="border py-3 px-4 rounded-md w-full  text-gray-600"
//             />
//           </div>
//           <div>
//             <label className="font-semibold">Cost</label>
//             <input
//               {...register("cost")}
//               type="number"
//               placeholder="Enter part Cost"
//               className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Need Date</label>
//             <input
//               {...register("need_date")}
//               type="date"
//               placeholder="09:33 AM"
//               className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
//             />
//           </div>
//         </div>
//         <div className="flex justify-between">
//           <div className="mt-6 text-end">
//             <button
//               type="submit"
//               className="bg-brand text-white px-5 py-3 rounded-lg"
//             >
//               Add Supplier Order
//             </button>
//           </div>
//           {/* Submit Button */}
//           <div className=" mt-6">
//             <button className="px-6 py-2  text-red-700 transition ml-6 ">
//               <FontAwesomeIcon icon={faRotateRight} /> Reset
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SupplierOrdersForm;

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { addSupplierOrder, selectSupplier } from "./https/suppliersApi";
import { selectProductApi } from "../Work_Instrcution.tsx/https/workInstructionApi";
import Select from "react-select";
const validationSchema = Yup.object({
  order_date: Yup.date().required("Order Date is required"),

  // When 'showFields' is false, 'supplier_id' is required.
  supplier_id: Yup.string().when("showFields", {
    is: false,
    then: (schema) =>
      schema.required("Please select a supplier or add a new one."),
    otherwise: (schema) => schema.notRequired(),
  }),

  // The following fields are ONLY required when 'showFields' is true.
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

  // These validations remain the same
  part_id: Yup.string().required("Product is required"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  cost: Yup.number()
    .min(0, "Cost cannot be negative")
    .required("Cost is required"),
  need_date: Yup.date().required("Required By Date is required"),
});

const SupplierOrdersForm = () => {
  const [supplierData, setSupplierData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
  useEffect(() => {
    setOrderNumber(Math.floor(10000 + Math.random() * 90000).toString());

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

  const initialValues = {
    order_number: "",
    order_date: "",
    supplier_id: "",
    part_id: "",
    quantity: "",
    cost: "",
    need_date: "",
    showFields: false,
    firstName: "",
    lastName: "",
    email: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("handleSubmit called!");

    const { showFields, firstName, lastName, email, ...orderData } = values;
    let finalPayload = { ...orderData };
    const tempId = crypto.randomUUID(); // Temporary ID for the backend to recognize a new customer
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
      console.log("Submitting Payload to API:", finalPayload);
      await addSupplierOrder(finalPayload);
      alert("Order submitted successfully!");
      const newOrderNum = Math.floor(10000 + Math.random() * 90000).toString();
      setOrderNumber(newOrderNum);
      resetForm({ values: { ...initialValues, order_number: newOrderNum } });
    } catch (error) {
      console.error("Submit error:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl border shadow-md max-w-4xl ">
      <Formik
        enableReinitialize
        initialValues={{ ...initialValues, order_number: orderNumber }}
        validationSchema={validationSchema} // Using the corrected schema
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
                  <Field
                    id="order_date"
                    name="order_date"
                    type="date"
                    className="border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="order_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
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
                        className={`border py-3 px-4 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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
                      onClick={() =>
                        setFieldValue("showFields", !values.showFields)
                      }
                      className="bg-blue-100 text-blue-600 font-semibold px-4 py-3 rounded-md flex items-center gap-2 hover:bg-blue-200 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      {values.showFields ? "Cancel" : "Add New"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Conditional Section: Add New Supplier */}
            {values.showFields && (
              <div className="border-t pt-6 mt-6 border-dashed">
                <h3 className="text-lg font-bold text-gray-700 mb-4">
                  Add a New Supplier
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4 bg-gray-50 rounded-lg border">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-2">
                      Supplier First Name
                    </label>
                    <Field
                      name="firstName"
                      type="text"
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
                      Supplier Last Name
                    </label>
                    <Field
                      name="lastName"
                      type="text"
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
            {/* Section 2: Item Details */}
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
                  <Select
                    options={productData.map((item) => ({
                      value: item.id,
                      label: item.partNumber,
                    }))}
                    onChange={(option) =>
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
                    id="part_id"
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
                    placeholder="e.g., 100"
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
                    placeholder="e.g., 550.50"
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
                  <Field
                    id="need_date"
                    name="need_date"
                    type="date"
                    className="border py-3 px-4 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="need_date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>
            {/* Form Actions */}
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
