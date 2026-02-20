import { useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { addCustomer } from "./https/customersApi";
import { ChangeEvent } from "react";

interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  customerPhone: string;
  address: string;
  billingTerms: string;
}

const NewCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CustomerFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: CustomerFormData) => {
    try {
      const apiPayload = {
        ...data,
        customerPhone: data.customerPhone.trim(),
        billingTerms: parseInt(data.billingTerms, 10),
      };

      const response = await addCustomer(apiPayload);
      if (response?.status === 201) {
        navigate("/customer-list");
      }
    } catch (error: unknown) {
      console.error("Failed to add customer:", error);
    }
  };

  const handleNumericInput = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: "customerPhone" | "billingTerms",
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value) && value !== "") {
      setError(fieldName, {
        type: "manual",
        message: "Only numbers are allowed",
      });
    } else {
      clearErrors(fieldName);
    }
  };

  return (
    <div className="p-4 md:p-7 my-6">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Create a new Customer
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[16px] text-black`}
            onClick={() => navigate("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Customers
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            New Customer
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 bg-white p-2 md:p-6 w-full rounded-2xl  xl:w-2/3">
          <label className="font-semibold" htmlFor="">
            Customer Name<span className="text-red-700 pl-2">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <input
                type="text"
                {...register("firstName", {
                  required: "First Name is required.",
                  validate: (value) =>
                    value.trim() !== "" || "First Name is required.",
                })}
                placeholder="First Name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="sm:w-1/2">
              <input
                type="text"
                {...register("lastName", {
                  required: "Last Name is required.",
                  validate: (value) =>
                    value.trim() !== "" || "Last Name is required.",
                })}
                placeholder="Last Name"
                className="border py-4 px-4 rounded-md w-full"
              />

              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <label className="font-semibold " htmlFor="">
            Customer Email<span className="text-red-700 pl-2">*</span>
          </label>
          <div className="mt-2 w-full mb-6">
            <input
              type="email"
              {...register("email", {
                required: "Email address is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address.",
                },
                validate: (value) =>
                  value.trim() !== "" || "Email address is required.",
              })}
              placeholder="Email address"
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <label className="font-semibold " htmlFor="">
            Customer Phone Number<span className="text-red-700 pl-2">*</span>
          </label>
          <div className="mt-2 w-full mb-6">
            <input
              type="text"
              inputMode="numeric"
              {...register("customerPhone", {
                required: "Phone Number is required.",
                validate: (value) =>
                  value.trim() !== "" || "Phone Number is required.",
              })}
              placeholder="Phone Number"
              onKeyDown={(e) => {
                // Allow only numbers, backspace, delete, arrow keys, tab
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleNumericInput(e, "customerPhone")
              }
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-sm">
                {errors.customerPhone.message}
              </p>
            )}
          </div>
          {/* Address */}
          <label className="font-semibold " htmlFor="">
            Address
          </label>
          <div className="mt-2 w-full mb-6">
            <textarea
              {...register("address", {
                maxLength: {
                  value: 255,
                  message: "Address cannot exceed 255 characters",
                },
                validate: (value) =>
                  !value ||
                  value.trim() !== "" ||
                  "Address cannot be just spaces.",
              })}
              placeholder="Address"
              className="border py-4 px-4 rounded-md w-full resize-none"
              rows={4}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <label className="font-semibold " htmlFor="">
            Billing Terms (In Days) <span className="text-red-700 pl-2">*</span>
          </label>
          <div className="mt-2 w-full">
            <input
              type="text"
              inputMode="numeric"
              {...register("billingTerms", {
                required: "Billing Terms are required.",
                validate: (value) =>
                  value.trim() !== "" || "Billing Terms are required.",
              })}
              placeholder="Billing Terms"
              onKeyDown={(e) => {
                if (
                  !/[0-9]/.test(e.key) &&
                  e.key !== "Backspace" &&
                  e.key !== "Delete" &&
                  e.key !== "ArrowLeft" &&
                  e.key !== "ArrowRight" &&
                  e.key !== "Tab"
                ) {
                  e.preventDefault();
                }
              }}
              onInput={(e: ChangeEvent<HTMLInputElement>) =>
                handleNumericInput(e, "billingTerms")
              }
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.billingTerms && (
              <p className="text-red-500 text-sm">
                {errors.billingTerms.message}
              </p>
            )}
          </div>
          <div className="mt-6 text-end">
            <button className="bg-brand text-white px-5 py-3 rounded-lg ">
              Add/Edit Customer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewCustomer;
