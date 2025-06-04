import { FaCircle } from "react-icons/fa";
import {  NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addSupplier } from "./https/suppliersApi";

const AddSuppliers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data :object) => {
    console.log("✅ Supplier Form Data:", data);
     // eslint-disable-next-line no-useless-catch
    try {
      addSupplier(data).then();
    } catch (error: unknown) {
      throw error;
    }
  };
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Add new Supplier
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[16px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Suppliers
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            New suppliers
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl md:w-2/3">
        {/* Supplier Name */}
        <label className="font-semibold">Supplier's Name</label>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
          <div className="sm:w-1/2">
            <input
              {...register("firstName", { required: "First name is required" })}
              type="text"
              placeholder="First Name"
              className="border py-4 px-4 rounded-md w-full"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{String(errors.firstName.message)}</span>
            )}
          </div>
          <div className="sm:w-1/2">
            <input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              placeholder="Last Name"
              className="border py-4 px-4 rounded-md w-full"
            />
            {errors.lastName && (
              <span className="text-red-500 text-sm">{String(errors.lastName.message)}</span>
            )}
          </div>
        </div>

        {/* Email */}
        <label className="font-semibold">Supplier's Email</label>
        <div className="mt-2 w-full mb-6">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Enter a valid email",
              },
            })}
            type="email"
            placeholder="Email address"
            className="border py-4 px-4 rounded-md w-full"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{String(errors.email.message)}</span>
          )}
        </div>

        {/* Address */}
        <label className="font-semibold">Address</label>
        <div className="mt-2 w-full mb-6">
          <input
            {...register("address", { required: "Address is required" })}
            type="text"
            placeholder="Address"
            className="border py-4 px-4 rounded-md w-full"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">{String(errors.address.message)}</span>
          )}
        </div>

        {/* Billing Terms */}
        <label className="font-semibold">
          Billing Terms (In Days) <span className="text-red-700">*</span>
        </label>
        <div className="mt-2 w-full">
          <input
            {...register("billingTerms", {
              required: "Billing terms are required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Only numbers allowed",
              },
            })}
            type="text"
            placeholder="Billing Terms"
            className="border py-4 px-4 rounded-md w-full"
          />
          {errors.billingTerms && (
            <span className="text-red-500 text-sm">{String(errors.billingTerms.message)}</span>
          )}
        </div>

        {/* Submit */}
        <div className="mt-6 text-end">
          <button
            type="submit"
            className="bg-brand text-white px-5 py-3 rounded-lg"
          >
            Create Supplier
          </button>
        </div>
      </div>
    </form>
    </div>
  );
};

export default AddSuppliers;
