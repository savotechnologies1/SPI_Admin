// import { useForm } from "react-hook-form";
// import { addStockOrder, selectCustomer } from "./https/schedulingApis";
// import { useEffect, useState } from "react";
// import { customerDetail } from "../customerInfo/https/customersApi";
// import { v4 as uuidv4 } from "uuid";
// import del_img from "../../assets/delete_1.png";

// const StockOrderForm = () => {
//   const [supplierData, setSupplierData] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [orderNumber, setOrderNumber] = useState("");
//   const [showFields, setShowFields] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm();

//   const productNumber = watch("productNumber");
//   const today = new Date().toISOString().split("T")[0];

//   // Fetch customer list
//   const fetchCustomerList = async () => {
//     try {
//       const response = await selectCustomer();
//       setSupplierData(response);
//     } catch (error) {
//       console.error("Failed to fetch customer list", error);
//     }
//   };

//   const [customerId, setCustomerId] = useState("");
//   const handleClick = () => {
//     setShowFields(true);
//     setSelectedCustomer("");

//     const newId = uuidv4().slice(0, 6);
//     setCustomerId(newId);
//     setValue("customerId", newId);
//   };
//   // Handle customer selection from dropdown
//   const handleCustomers = async (e) => {
//     const customerId = e.target.value;
//     setSelectedCustomer(customerId);

//     try {
//       const response = await customerDetail(customerId);
//       setValue("customerName", response.data.firstName);
//       setValue("customerEmail", response.data.email);
//       setValue("customerPhone", response.data.customerPhone);
//       setValue("customerId", response.data.id || "");
//     } catch (error) {
//       console.error("Error loading customer details", error);
//     }
//   };

//   // Generate order number once on mount
//   useEffect(() => {
//     const randomOrder = Math.floor(10000 + Math.random() * 90000).toString();
//     setOrderNumber(randomOrder);
//     setValue("orderNumber", randomOrder);
//   }, []);

//   // Fetch customers on mount
//   useEffect(() => {
//     fetchCustomerList();
//   }, []);

//   // Auto-fill productQuantity & productDescription if productNumber is matched
//   const productData = {
//     "1001": { quantity: 50, description: "Steel Bolts - Pack of 100" },
//     "1002": { quantity: 30, description: "Copper Nuts - Box of 50" },
//   };

//   console.log("productDataproductData", productData[productNumber]);

//   useEffect(() => {
//     if ("1002" && productData["1002"]) {
//       setValue("productQuantity", productData["1002"].quantity);
//       setValue("productDescription", productData["1002"].description);
//     } else {
//       setValue("productQuantity", "");
//       setValue("productDescription", "");
//     }
//   }, ["1002"]);

//   const onSubmit = async (data) => {
//     try {
//       const response = await addStockOrder(data);
//       if (response.status === 201) {
//         reset();
//       }
//     } catch (error) {
//       console.error("Submit Error:", error);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-md ">
//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="font-semibold">Order Number</label>
//             <input
//               className="border py-3 px-4 rounded-md w-full bg-gray-100"
//               disabled
//               {...register("orderNumber")}
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Order Date</label>
//             <input
//               type="date"
//               defaultValue={today}
//               {...register("orderDate", { required: "Order Date is required" })}
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Ship Date</label>
//             <input
//               type="date"
//               {...register("shipDate", { required: "Ship Date is required" })}
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//           <div>
//             <label className="font-semibold">Select Customer</label>
//             <select
//               className="border px-3 py-2 rounded w-full"
//               value={selectedCustomer}
//               onChange={handleCustomers}
//             >
//               <option value="">Select Customer</option>
//               {supplierData.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="font-semibold">Customer Name</label>
//             <input
//               {...register("customerName", { required: true })}
//               type="text"
//               placeholder="Enter Customer Name"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Customer Email</label>
//             <input
//               {...register("customerEmail", { required: true })}
//               type="email"
//               placeholder="Enter Customer Email"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>

//           <div>
//             <label className="font-semibold">Customer Phone</label>
//             <input
//               {...register("customerPhone", { required: true })}
//               type="tel"
//               placeholder="Enter Phone Number"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>
//         </div>
//         {showFields && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-white p-4  ">
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
//                   className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

//         {/* Add New Customer Fields (Optional) */}
//         {/* {showFields && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <input
//               {...register("customerName")}
//               placeholder="New Customer Name"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//             <input
//               {...register("customerEmail")}
//               placeholder="New Customer Email"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//             <input
//               {...register("customerPhone")}
//               placeholder="New Customer Phone"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//             <div
//               onClick={() => setShowFields(false)}
//               className="bg-red-600 p-2 rounded-full cursor-pointer"
//             >
//               <img src={del_img} alt="" />
//             </div>
//           </div>
//         )} */}

//         <span
//           className="text-blue-500 text-sm cursor-pointer"
//           onClick={handleClick}
//         >
//           + Add New Customer
//         </span>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
//           <div>
//             <label className="font-semibold">Product Number</label>
//             <input
//               {...register("productNumber")}
//               type="text"
//               placeholder="Enter Product No."
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label className="font-semibold">Cost</label>
//             <input
//               {...register("cost", { required: true })}
//               type="number"
//               placeholder="Enter Cost"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>
//           <div>
//             <label className="font-semibold">Quantity</label>
//             <input
//               {...register("productQuantity", { required: true })}
//               type="number"
//               placeholder="Enter Quantity"
//               className="border py-3 px-4 rounded-md w-full"
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="font-semibold">Product Description</label>
//           <input
//             {...register("productDescription")}
//             type="text"
//             placeholder="Enter Product Description"
//             className="border py-3 px-4 rounded-md w-full"
//           />
//         </div>

//         <button className="px-6 py-2 bg-brand text-white text-md  hover:bg-[#1a2e57] transition ml-6 ">
//           Create Stock Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default StockOrderForm;

import { useForm } from "react-hook-form";
import { addStockOrder } from "./https/schedulingApis";
import { useEffect, useState } from "react";
// import del_img from "../../assets/delete_1.png";

const productData: Record<string, { quantity: number; description: string }> = {
  "1001": {
    quantity: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
  },
  "1002": {
    quantity: 10,
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna ",
  },
  "1003": {
    quantity: 3,
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco",
  },
};

const StockOrderForm = () => {
  // const [formData, setFormData] = useState({
  //   orderNumber: "",
  //   orderDate: "2025-02-26",
  //   shipDate: "2025-02-26",
  //   customer: "Cortez Herring",
  //   customerName: "",
  //   customerEmail: "",
  //   customerPhone: "",
  //   productNumber: "",
  //   cost: "",
  //   quantity: "",
  //   description: "",
  //   file: null,
  //   partFamily: "Cortez Herring",
  //   partNumber: "",
  //   partDesc: "",
  //   partQuantity: "",
  //   partCost: "",
  //   time: "09:33 AM",
  //   process: "Cortez Herring",
  //   assignTo: "Cortez Herring",
  // });

  // const [file, setFile] = useState<File | null>(null);

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     setFile(files[0]);
  //   }
  // };

  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
    },
    { id: 3, name: "Mike Lee", email: "mike@example.com", phone: "9988776655" },
  ];

  const [showFields, setShowFields] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleClick = () => {
    setShowFields(true);
  };

  const [orderNumber, setOrderNumber] = useState("");

  const { register, handleSubmit, watch, setValue } = useForm();

  useEffect(() => {
    const randomOrder = +Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(randomOrder.toString());
  }, []);

  const onSubmit = (data: object) => {
    console.log("Form Data:", data);
    try {
      addStockOrder(data).then();
    } catch (error: unknown) {
      throw error;
    }
  };

  const productNumber = watch("productNumber");
  useEffect(() => {
    if (productNumber) {
      const filtered = Object.keys(productData).filter((key) =>
        key.startsWith(productNumber.toString())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [productNumber]);
  useEffect(() => {
    if (productNumber && productData[productNumber]) {
      setValue("productQuantity", productData[productNumber].quantity);
      setValue("productDesc", productData[productNumber].description);
    } else {
      setValue("productQuantity", "");
      setValue("productDesc", "");
    }
  }, [productNumber, setValue]);

  const handleSuggestionClick = (suggestion: string) => {
    setValue("productNumber", suggestion); // This will also trigger useEffect autofill
    setSuggestions([]);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    if (value === "new") {
      setShowFields(true);
      setSelectedCustomerId(null); // Clear previous selection
      setFormData({ name: "", email: "", phone: "" }); // Clear form data
      return;
    }

    const customerId = Number(value);
    setSelectedCustomerId(customerId);
    setShowFields(false); // Hide new customer fields if existing selected

    const selectedCustomer = customers.find((c) => c.id === customerId);
    if (selectedCustomer) {
      setFormData({
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone,
      });
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-4 bg-white rounded-2xl border shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Channel & Platform */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
          <div>
            <label className="font-semibold">Order Number</label>
            <p
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 bg-gray-100"
              {...register("orderNumber", {
                required: "Order Number required",
              })}
            >
              {" "}
              {orderNumber}
            </p>
          </div>
          <div>
            <label className="font-semibold">Order Date</label>
            <input
              {...register("orderDate", { required: "Order Date is required" })}
              type="date"
              value={today}
              placeholder=""
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div>
            <label className="font-semibold">Ship Date </label>
            <input
              {...register("shipDate", { required: "Ship Date  is required" })}
              type="date"
              placeholder=""
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
        </div>

        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 mt-4 bg-white px-6 ">
          <div className="flex flex-col ">
            <label className="font-semibold">Select Customer</label>
            {/* <input
              {...register("SelectCustomer")}
              type="text"
              placeholder="Select Customer"
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            /> */}
            <select
              onChange={handleSelectChange}
              value={selectedCustomerId ?? ""}
              className="border px-2 py-1 rounded"
            >
              <option value="">Select Customer </option>
              <option value="new">➕ Add New Customer</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* <select
              onChange={handleSelectChange}
              value={selectedCustomerId ?? ""}
              className="border px-2 py-1 rounded"
            >
              <option value="">Select Customer </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select> */}
          </div>

          <div>
            <label className="font-semibold">Customer Name</label>
            <input
              {...register("customerName")}
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              readOnly={selectedCustomerId !== null}
              placeholder="Enter Customer Name"
              className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
            />
          </div>
          <div className="col-span-">
            <label className="font-semibold">Customer Email</label>
            <input
              {...register("customerEmail")}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              readOnly={selectedCustomerId !== null}
              placeholder="Enter Customer Email"
              className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
            />
          </div>
          <div className="col-span-">
            <label className="font-semibold">Customer Phone</label>
            <input
              {...register("customerPhoneNum")}
              type="number"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              readOnly={selectedCustomerId !== null}
              placeholder="Enter Customer Phone"
              className="border py-3 px-4 rounded-md w-full placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          {/* <div className=" flex  justify-start gap-2">
            <span
              className="text-blue-500 text-sm flex items-center gap-1 cursor-pointer"
              onClick={handleClick}
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
              Add New Customer
            </span>
          </div> */}
        </div>

        {/* Render Fields When Clicked */}
        {/* {showFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-white p-4  ">
            <div>
              <label className="font-semibold">Customer Name</label>
              <input
                {...register("customerName1", {
                  required: "Customer name required",
                })}
                type="text"
                placeholder="Enter Customer Name"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
            <div>
              <label className="font-semibold">Customer Email</label>
              <input
                {...register("customerEmail1", {
                  required: "Customer Email  required",
                })}
                type="email"
                placeholder="Enter Customer Email"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="font-semibold">Customer Phone</label>
                <input
                  {...register("customerPhone1", {
                    required: "Customer number  required",
                  })}
                  type="number"
                  placeholder="Enter Customer Phone"
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <div
                onClick={() => setShowFields(false)}
                className="bg-red-600 p-2 rounded-full cursor-pointer"
              >
                <img src={del_img} alt="" />
              </div>
            </div>
          </div>
        )} */}

        {/* Codes & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 bg-white px-6 ">
          <div>
            <label className="font-semibold">Product Number</label>
            <input
              {...register("productNumber")}
              type="number"
              placeholder="Enter Product No..."
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute bg-white border w-40 mt-1 rounded shadow z-10">
                {suggestions.map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSuggestionClick(item)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <label className="font-semibold">Cost</label>

            <input
              type="number"
              className="border py-3 px-4 rounded-md w-full  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("cost")}
              placeholder="Enter Cost"
            ></input>
          </div>

          <div>
            <label className="font-semibold">Product Quantity</label>
            <input
              {...register("productQuantity", {})}
              type="number"
              placeholder="Enter Quantity"
              className="border py-3 px-4 rounded-md w-full  text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
          <div className="col-span-2">
            <label className="font-semibold">Product Description</label>
            <input
              {...register("productDesc")}
              type="text"
              placeholder="Product Description"
              className="border py-6 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className=" mt-6">
          <button className="px-6 py-2 bg-brand text-white text-md  hover:bg-[#1a2e57] transition ml-6 ">
            Create Stock Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockOrderForm;
