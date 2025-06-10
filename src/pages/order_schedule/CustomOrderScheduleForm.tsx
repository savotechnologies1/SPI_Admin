import { useState } from "react";
import { useForm } from "react-hook-form";

import CustomItemSelected from "./CustomItemSelected";

const CustomOrderScheduleForm = () => {
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

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 ">
            <div>
              <label className="font-semibold">Customer Name</label>
              <input
                {...register("CustomerName", {
                  required: "Customer Name required",
                })}
                type="text"
                placeholder="Enter Customer Name"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
            <div>
              <label className="font-semibold">Customer Email</label>
              <input
                {...register("CustomerEmail", {
                  required: "Customer Email required",
                })}
                type="email"
                placeholder="Enter Customer Email"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
            <div>
              <label className="font-semibold">Customer Phone</label>
              <input
                {...register("CustomerPhone", {
                  required: " Phone number is required",
                })}
                type="date"
                placeholder="number"
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

          <div className="grid grid-cols-1  gap-4  bg-white px-6 ">
            <div>
              <label className="font-semibold">Product Description</label>
              <input
                {...register("ProductDescription")}
                type="text"
                placeholder="Meta description
"
                className="border py-3 px-4 rounded-md w-full  placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  gap-4 mt-4 bg-white px-6 justify-between md;items-center  ">
            <div className="md:w-1/2">
              <label className="block border py-2 px-4 rounded-md w-full bg-[#919EAB33] text-center cursor-pointer hover:bg-gray-200 shadow-sm items-center">
                <input
                  {...register("file")}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {file ? (
                  <span className="">{file.name}</span>
                ) : (
                  <span className="text-sm">Tap or Click to Add Picture</span>
                )}
              </label>
            </div>
            <div>
              <span></span> <p className="text-[#B71D18] text-sm">Clear Cart</p>
            </div>
          </div>

          {/* Submit Button */}
          {/* <div className=" mt-6">
          <button className="px-6 py-2 bg-brand text-white text-md  hover:bg-[#1a2e57] transition ml-6 ">
             Order
          </button>
        </div> */}
        </form>
      </div>

      <CustomItemSelected/>
 
    </>
  );
};

export default CustomOrderScheduleForm;
