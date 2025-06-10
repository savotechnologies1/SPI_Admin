
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const CustomOrderDetails = () => {
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

  const {
    register,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  return (
    <div className="p-4">
      <div>
        {" "}
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Custom Order Schedule
        </h1>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">Order</span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            Custom Orders details{" "}
          </span>
        </div>
      </div>

      <div className="py-6">
        <div className="p-4 bg-white rounded-2xl border shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="">
            {/* Channel & Platform */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
              <div>
                <label className="font-semibold">Order Number</label>
                <input
                  {...register("orderNumber", {
                    required: "Order Number required",
                  })}
                  type="number"
                  placeholder="Enter Order Number"
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>
              <div>
                <label className="font-semibold">Order Date</label>
                <input
                  {...register("OrderDate", {
                    required: "Order Date is required",
                  })}
                  type="date"
                  placeholder=""
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>
              <div>
                <label className="font-semibold">Ship Date </label>
                <input
                  {...register("ShipDate", {
                    required: "Ship Date  is required",
                  })}
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
                <input
                  {...register("SelectCustomer")}
                  type="text"
                  placeholder="Select Customer"
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>

              <div>
                <label className="font-semibold">Customer Name</label>
                <input
                  {...register("Name")}
                  type="text"
                  placeholder="Enter Customer Name "
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>
              <div className="col-span-">
                <label className="font-semibold">Customer Email</label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter Customer Email"
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>
              <div className="col-span-">
                <label className="font-semibold">Customer Phone</label>
                <input
                  {...register("mobile")}
                  type="number"
                  placeholder="Enter Customer Phone  "
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>
            </div>

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
                <input
                  {...register("Cost")}
                  type="number"
                  placeholder="Enter Cost"
                  className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>

              <div>
                <label className="font-semibold">Product Quantity</label>
                <input
                  {...register("ProductQuantity", {})}
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
                  {...register("ProductDescription")}
                  type="text"
                  placeholder="Meta Description"
                  className="border py-6 px-4 rounded-md w-full  placeholder-gray-600"
                />
              </div>

              <div>
                <label className="font-semibold">Product Drawing</label>
                <input
                  {...register("ProductDrawing", {})}
                  type="file"
                  placeholder="CHOOSE  FILE"
                  className="border py-3 px-4 rounded-md w-full  text-gray-600 "
                />
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white px-6 ">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 mt-4 gap-4">
                <div>
                  <label className="font-semibold">Select Part Family</label>
                  <select
                    {...register("PartNumber")}
                    className="border py-3 px-4 rounded-md w-full  text-gray-600"
                  >
                    <option value="">Cortez Herring </option>
                    <option value="Swizz Bank">Cortez </option>
                  </select>
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
            </div>
            <div className="bg-white px-6 ">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-4 gap-4">
                <div>
                  <label className="font-semibold">Time</label>
                  <input
                    {...register("Time")}
                    type="date"
                    placeholder="09:33 AM"
                    className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
                  />
                </div>
                <div>
                  <label className="font-semibold">Select Process</label>
                  <select
                    {...register("Process")}
                    className="border py-3 px-4 rounded-md w-full  text-gray-600"
                  >
                    <option value="">Cortez Herring </option>
                    <option value="Swizz Bank">Cortez </option>
                  </select>
                </div>
                <div className="flex gap-">
                  <div>
                    <label className="font-semibold">Assign To </label>
                    <select
                      {...register("assignTo")}
                      className="border py-3 px-4 rounded-md w-full  text-gray-600"
                    >
                      <option value="">Cortez Herring </option>
                      <option value="Swizz Bank">Cortez </option>
                    </select>
                  </div>
                  <div className=" mt-6">
                    <p className="px-2 py-2 bg-brand text-white text-sm  hover:bg-[#1a2e57] transition ml-4 rounded-md ">
                  Assigned Date
                    </p>
                  </div>
                </div>

          
              </div>
            </div>

            {/* Submit Button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderDetails;
