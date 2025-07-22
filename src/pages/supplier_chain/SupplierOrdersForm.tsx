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
import del_img from "../../assets/delete_1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  addSupplierOrder,
  selectSupplier,
  supplierOrderListApi,
} from "./https/suppliersApi";
import { selectProductApi } from "../Work_Instrcution.tsx/https/workInstructionApi";
import Select from "react-select";

const validationSchema = Yup.object({
  order_date: Yup.string().required("Order Date is required"),
  supplier_id: Yup.string().required("Supplier is required"),
  customerName: Yup.string().when("showFields", {
    is: true,
    then: Yup.string().required("Customer Name is required"),
  }),
  customerEmail: Yup.string()
    .email("Invalid email")
    .when("showFields", {
      is: true,
      then: Yup.string().required("Customer Email is required"),
    }),
  customerPhone: Yup.string().when("showFields", {
    is: true,
    then: Yup.string().required("Customer Phone is required"),
  }),
  part_id: Yup.string().required("Product is required"),
  quantity: Yup.number(),
  cost: Yup.number(),
  need_date: Yup.string(),
});

const SupplierOrdersForm = () => {
  const [showFields, setShowFields] = useState(false);
  const [supplierData, setSupplierData] = useState([]);
  const [orderNumber, setOrderNumber] = useState("");
  const [productData, setProductData] = useState<any[]>([]);

  useEffect(() => {
    setOrderNumber(Math.floor(10000 + Math.random() * 90000).toString());

    const fetchProducts = async () => {
      try {
        const response = await selectProductApi();
        setProductData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await selectSupplier();
        setSupplierData(response);
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
      }
    };
    fetchSuppliers();
  }, []);

  const initialValues = {
    order_number: orderNumber,
    order_date: "",
    supplier_id: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    part_id: "",
    quantity: "",
    cost: "",
    need_date: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addSupplierOrder(values);
      resetForm();
      setShowFields(false);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-2xl border shadow-md">
      <Formik
        enableReinitialize
        initialValues={{ ...initialValues, order_number: orderNumber }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm, setFieldValue, values, touched, errors }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold">Order Number</label>
                <p className="border py-3 px-4 rounded-md bg-gray-100">
                  {orderNumber}
                </p>
                <Field type="hidden" name="order_number" />
              </div>

              <div>
                <label className="font-semibold">Order Date</label>
                <Field
                  name="order_date"
                  type="date"
                  className="border py-3 px-4 rounded-md w-full"
                />
                <ErrorMessage
                  name="order_date"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="font-semibold">Supplier</label>
                <Field
                  as="select"
                  name="supplier_id"
                  className="border py-3 px-4 rounded-md w-full"
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
                  className="text-red-500 text-sm"
                />
              </div>

              <Link
                to="/add-supplier"
                className="md:col-span-3 flex justify-end items-center"
              >
                <span
                  onClick={() => setShowFields(true)}
                  className="text-blue-500 text-sm flex gap-1 items-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
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
                  Add New Supplier
                </span>
              </Link>
            </div>

            {showFields && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="font-semibold">Customer Name</label>
                  <Field
                    name="customerName"
                    type="text"
                    placeholder="Enter Customer Name"
                    className="border py-3 px-4 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="customerName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="font-semibold">Customer Email</label>
                  <Field
                    name="customerEmail"
                    type="email"
                    placeholder="Enter Customer Email"
                    className="border py-3 px-4 rounded-md w-full"
                  />
                  <ErrorMessage
                    name="customerEmail"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-full">
                    <label className="font-semibold">Customer Phone</label>
                    <Field
                      name="customerPhone"
                      type="text"
                      placeholder="Enter Customer Phone"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="customerPhone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div
                    onClick={() => setShowFields(false)}
                    className="bg-red-600 p-2 rounded-full cursor-pointer"
                  >
                    <img src={del_img} alt="delete" />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              <div className="w-full">
                <label className="font-semibold">Select Product</label>
                <Select
                  options={productData.map((item) => ({
                    value: item.id,
                    label: item.partNumber,
                  }))}
                  name="part_id"
                  onChange={(selectedOption) =>
                    setFieldValue("part_id", selectedOption?.value || "")
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
                />
                {touched.part_id && errors.part_id && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.part_id}
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold">Order Quantity</label>
                <Field
                  name="quantity"
                  type="number"
                  placeholder="Enter Quantity"
                  className="border py-3 px-4 rounded-md w-full"
                />
              </div>

              <div>
                <label className="font-semibold">Cost</label>
                <Field
                  name="cost"
                  type="number"
                  placeholder="Enter Cost"
                  className="border py-3 px-4 rounded-md w-full"
                />
              </div>

              <div>
                <label className="font-semibold">Need Date</label>
                <Field
                  name="need_date"
                  type="date"
                  className="border py-3 px-4 rounded-md w-full"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                type="submit"
                className="bg-brand text-white px-5 py-3 rounded-lg"
              >
                Add Supplier Order
              </button>
              <button
                type="button"
                className="px-6 py-2 text-red-700"
                onClick={() => resetForm()}
              >
                <FontAwesomeIcon icon={faRotateRight} /> Reset
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SupplierOrdersForm;
