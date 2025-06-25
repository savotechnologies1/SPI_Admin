import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import del_img from "../../assets/delete_1.png";

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
const processOption = [
  { value: "Cut Trim", label: "Cut Trim" },
  { value: "Inspection", label: "Inspection" },
];
const assignOption = [
  { value: "cortez-herring", label: "Cortez Herring" },
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
];
const customers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "1234567890" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "8103111184" },
  { id: 3, name: "Mike Lee", email: "mike@example.com", phone: "9988776655" },
];

const CustomOrderForm = () => {
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

  const [showFields, setShowFields] = useState(false);
  // const [showPart, setShowPart] = useState(false);

  const handleClick = () => {
    setShowFields(true); // Show fields when clicking the Add button
  };
  //    const handleClick2 = () => {
  //   setShowPart(true); // Show fields when clicking the Add button
  // };
  const [orderNumber, setOrderNumber] = useState("");
  // const cost = 3466;
  useEffect(() => {
    const randomOrder = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(randomOrder.toString());
  }, []);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>();

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const customerId = Number(e.target.value);
    setSelectedCustomerId(customerId);

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

  interface FormData {
    orderNumber: number;
    OrderDate: string;
    ShipDate: string;
    Name?: string;
    email?: string;
    mobile?: string;
    productNumber?: number;
    cost?: number;
    ProductQuantity?: number;
    ProductDescription?: string;
    ProductDrawing?: File | null;
    partNumber?: number;
    PartDesc?: string;
    PartQuantity?: string;
    PartCost?: string;
    Time?: string;
    customerName1?: string;
    customerEmail1?: string;
    customerPhone1?: string;
    partNumber1?: number;
    partDesc1?: string;
    partQuantity1?: string;
    partCost1?: string;
  }

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };
  const productNumber = watch("productNumber");

  useEffect(() => {
    if (productNumber && productData[productNumber]) {
      setValue("ProductQuantity", productData[productNumber].quantity);
      setValue("ProductDescription", productData[productNumber].description);
    } else {
      setValue("ProductQuantity", 0);
      setValue("ProductDescription", "");
    }
  }, [productNumber, setValue]);

  return (
    <div className="p-4 bg-white rounded-2xl border shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Channel & Platform */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
          <div>
            <label className="font-semibold">Order Number</label>

            <p
              {...register("orderNumber", {
                required: "Order Number required",
              })}
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 bg-gray-100"
            >
              {orderNumber}
            </p>
          </div>
          <div>
            <label className="font-semibold">Order Date</label>
            <input
              {...register("OrderDate", { required: "Order Date is required" })}
              type="date"
              placeholder=""
              defaultValue={today}
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div>
            <label className="font-semibold">Ship Date </label>
            <input
              {...register("ShipDate", { required: "Ship Date  is required" })}
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
            <select
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
            </select>
          </div>

          <div>
            <label className="font-semibold">Customer Name</label>
            <input
              {...register("Name")}
              type="text"
              value={formData.name}
              placeholder="Enter Customer Name "
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div className="col-span-">
            <label className="font-semibold">Customer Email</label>
            <input
              {...register("email")}
              type="email"
              value={formData.email}
              placeholder="Enter Customer Email"
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div className="col-span-">
            <label className="font-semibold">Customer Phone</label>
            <input
              {...register("mobile")}
              type="number"
              value={formData.phone}
              placeholder="Enter Customer Phone  "
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div className=" flex  justify-start gap-2">
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
          </div>
        </div>

        {/* Render Fields When Clicked */}
        {showFields && (
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
        )}

        {/* Codes & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 bg-white px-6 ">
          <div>
            <label className="font-semibold">Product Number</label>
            <input
              {...register("productNumber")}
              type="number"
              placeholder="Enter Product No..."
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <div>
            <label className="font-semibold">Cost</label>

            <input
              type="number"
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 bg-gray-100 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              {...register("cost")}
              placeholder="Enter Cost"
            ></input>
          </div>

          <div>
            <label className="font-semibold">Product Quantity</label>
            <input
              {...register("ProductQuantity", {})}
              type="number"
              placeholder="Enter Quantity"
              className="border py-3 px-4 rounded-md w-full  text-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
          <div className="col-span-2">
            <label className="font-semibold">Part Number</label>
            <input
              {...register("ProductDescription")}
              type="text"
              placeholder="Part Number"
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
        </div>

        {/* Bank Details */}
        {/* <div className="bg-white px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-4 gap-4">
            <div>
              <label className="font-semibold">Select Part Family</label>
              <Select
                isMulti
                options={partOption}
                className="w-full "
                placeholder="Select part"
              ></Select>
            </div>

            <div>
              <label className="font-semibold">Part Number</label>

              <input
                {...register("partNumber")}
                type="number"
                placeholder="Enter part Number"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part Desc</label>

              <input
                {...register("PartDesc")}
                type="text"
                placeholder="Enter part desc"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part Quantity</label>
              <input
                {...register("PartQuantity")}
                type="text"
                placeholder="Enter part Quantity"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part Cost</label>
              <input
                {...register("PartCost")}
                type="text"
                placeholder="Enter part Cost"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
          </div>

            <div className=" flex  justify-start gap-2">
            <span
              className="text-blue-500 text-sm flex items-center gap-1 cursor-pointer"
              onClick={handleClick2}
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
              Add Another Part
            </span>
          </div>
        </div> */}

        {/* Render Fields When Clicked */}
        {/* {showPart && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  bg-white p-4  ">
            <div>
              <label className="font-semibold">Part Number</label>

              <input
                {...register("partNumber1")}
                type="number"
                placeholder="Enter part Number"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part Desc</label>

              <input
                {...register("partDesc1")}
                type="text"
                placeholder="Enter part desc"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part Quantity</label>
              <input
                {...register("partQuantity1")}
                type="text"
                placeholder="Enter part Quantity"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div className="flex items-center gap-4">
              <div>
                <label className="font-semibold">Part cost</label>
                <input
                  {...register("partCost1")}
                  type="text"
                  placeholder="Enter part cost"
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>
              <div
                onClick={() => setShowPart(false)}
                className="bg-red-600 p-2 rounded-full cursor-pointer"
              >
                <img src={del_img} alt="" />
              </div>
            </div>
          </div>
        )} */}
        <div className="bg-white px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-4 items-center">
            <div>
              <label className="font-semibold">Total Time</label>
              <input
                {...register("Time")}
                type="text"
                placeholder="65 min"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
            <div>
              <label className="font-semibold">Select Process</label>
              <Select
                options={processOption}
                className="w-full "
                placeholder="Select part"
              ></Select>
            </div>
            <div className="flex gap-4 items-end ">
              {" "}
              <div className="">
                <div>
                  <label className="font-semibold">Assign To</label>
                  <input
                    {...register("assignTo")}
                    type="text"
                    placeholder="Assign To"
                    className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                  />
                </div>
                {/* <label className="font-semibold">Assign To </label>
                <Select
                  isMulti
                  options={assignOption}
                  className="w-full "
                  placeholder="Select part"
                ></Select> */}
              </div>
              <div className="items-center justify-center  ">
                <p className="bg-brand text-white p-2  text-sm rounded-sm">
                  Add
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className=" mt-6">
          <button className="px-6 py-2 bg-brand text-white text-md  hover:bg-[#1a2e57] transition ml-6 ">
            Create Custom Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomOrderForm;
