import { useForm } from "react-hook-form";
import Select from "react-select";
import { addStockOrder } from "./https/schedulingApis";
import { useEffect, useState } from "react";
import del_img from "../../assets/delete_1.png";

const options = [
  { value: "cortez-herring", label: "Cortez Herring" },
  { value: "john-doe", label: "John Doe" },
  { value: "jane-smith", label: "Jane Smith" },
];

// const partOption = [
//   { value: "cortez-herring", label: "Cortez Herring" },
//   { value: "john-doe", label: "John Doe" },
//   { value: "jane-smith", label: "Jane Smith" },
// ];
// const processOption = [
//   { value: "cortez-herring", label: "Cortez Herring" },
//   { value: "john-doe", label: "John Doe" },
//   { value: "jane-smith", label: "Jane Smith" },
// ];
// const assignOption = [
//   { value: "cortez-herring", label: "Cortez Herring" },
//   { value: "john-doe", label: "John Doe" },
//   { value: "jane-smith", label: "Jane Smith" },
// ];

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

  const [showFields, setShowFields] = useState(false);
  // const [showPart, setShowPart] = useState(false);

  const handleClick = () => {
    setShowFields(true); // Show fields when clicking the Add button
  };
  // const handleClick2 = () => {
  //   setShowPart(true); // Show fields when clicking the Add button
  // };
  const [orderNumber, setOrderNumber] = useState("");
  const cost = "4500";

  const { register, handleSubmit } = useForm();

 useEffect(() => {
    // Generates random order number like: ORD-594203
    const randomOrder =  + Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(randomOrder.toString());
  }, []);
  // useEffect(() => {
  //   setValue("cost", cost), [cost, setValue];
  // });

  const onSubmit = (data: object) => {
    console.log("Form Data:", data);
    // eslint-disable-next-line no-useless-catch
    try {
      addStockOrder(data).then();
    } catch (error: unknown) {
      throw error;
    }
  };

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
          <div>
            <label className="font-semibold">Select Customer</label>
            {/* <input
              {...register("SelectCustomer")}
              type="text"
              placeholder="Select Customer"
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            /> */}

            <Select
              isMulti
              options={options}
              className="w-full "
              placeholder="Select People"
            />
          </div>

          <div>
            <label className="font-semibold">Customer Name</label>
            <input
              {...register("customerName")}
              type="text"
              placeholder="Enter Customer Name "
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div className="col-span-">
            <label className="font-semibold">Customer Email</label>
            <input
              {...register("customerEmail")}
              type="email"
              placeholder="Enter Customer Email"
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div className="col-span-">
            <label className="font-semibold">Customer Phone</label>
            <input
              {...register("customerPhoneNum")}
              type="number"
              placeholder="Enter Customer Phone  "
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
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
              Add New supplier
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
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
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
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
            />
          </div>
          <div>
            <label className="font-semibold">Cost</label>

            <p
              className="border py-3 px-4 rounded-md w-full  placeholder-gray-600 bg-gray-100"
              {...register("cost")}
            >
              {cost}
            </p>
          </div>

          <div>
            <label className="font-semibold">Product Quantity</label>
            <input
              {...register("productQuantity", {})}
              type="number"
              placeholder="Enter Quantity"
              className="border py-3 px-4 rounded-md w-full  text-gray-600"
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

          {/* <div>
          <label className="font-semibold">Product Drawing</label>
            
            <label className="font-semibold border py-3 px-4  rounded-md w-full  text-gray-600 block">
              <input
                {...register("ProductDrawing", {})}
                type="file"
                placeholder="CHOOSE  FILE"
                className=" hidden "
                onChange={handleFileChange}
              />

              {file ? (
                <span className="">{file.name}</span>
              ) : (
                <span className="text-sm">CHOOSE FILE</span>
              )}
            </label>
          </div> */}
        </div>

        {/* <div className=" px-6 ">
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
                {...register("partDesc")}
                type="text"
                placeholder="Enter part desc"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part Quantity</label>
              <input
                {...register("partQuantity")}
                type="text"
                placeholder="Enter part Quantity"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>

            <div>
              <label className="font-semibold">Part cost</label>
              <input
                {...register("partCost")}
                type="text"
                placeholder="Enter part cost"
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
        )}
        <div className="bg-white px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-4 items-center">
            <div>
              <label className="font-semibold">Total Time</label>
              <input
                {...register("totalTime")}
                type="text"
                placeholder=" 65 min"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
            <div>
              <label className="font-semibold">Select Process</label>
              <Select
                isMulti
                options={processOption}
                className="w-full "
                placeholder="Select part"
              ></Select>
            </div>
            <div className="flex gap-4 items-end ">
              <div>
                <label className="font-semibold">Assign To </label>
                <Select
                  isMulti
                  options={assignOption}
                  className="w-full "
                  placeholder="Select part"
                ></Select>
              </div>

              <div className="items-center justify-center  ">
                <p className="bg-brand text-white p-2  text-sm rounded-sm">
                  Add
                </p>
              </div>
            </div>
          </div>
        </div> */}

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
