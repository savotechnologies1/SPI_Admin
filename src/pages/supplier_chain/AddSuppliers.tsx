import { FaArrowLeft, FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addSupplier } from "./https/suppliersApi";
import { toast } from "react-toastify";

const AddSuppliers = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await addSupplier(data);
      if (response.status === 201) {
        toast.success("Supplier added successfully!");
        navigate("/all-supplier");
      }
    } catch (error: any) {
      // Wise Error Handling: Show the backend message to the user
      const errorMsg = error.response?.data?.message || "Something went wrong";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="p-7 my-5">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white hover:bg-gray-100 rounded-full shadow-sm transition-all border border-gray-200"
          title="Go Back"
        >
          <FaArrowLeft className="text-gray-600" />
        </button>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Add New Supplier
        </h1>
      </div>

      {/* Breadcrumbs */}
      <div className="flex justify-between mt-3 items-center">
        <div className="flex gap-2 items-center text-gray-500">
          <p className="text-[14px]">
            <NavLink to="/dashboardDetailes" className="hover:text-brand">
              Dashboard
            </NavLink>
          </p>
          <FaCircle className="text-[6px]" />
          <p className="text-[14px]">
            <NavLink to="/all-supplier" className="hover:text-brand">
              Suppliers
            </NavLink>
          </p>
          <FaCircle className="text-[6px]" />
          <span className="text-[14px] font-medium text-black">
            New Supplier
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6 bg-white p-8 w-full rounded-2xl md:w-2/3 shadow-sm border border-gray-100">
          <label className="font-semibold text-gray-700">Supplier's Name</label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                type="text"
                placeholder="First Name"
                className={`border py-3 px-4 rounded-md w-full focus:outline-brand ${errors.firstName ? "border-red-500" : ""}`}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs mt-1">
                  {String(errors.firstName.message)}
                </span>
              )}
            </div>
            <div className="sm:w-1/2">
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="Last Name"
                className={`border py-3 px-4 rounded-md w-full focus:outline-brand ${errors.lastName ? "border-red-500" : ""}`}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs mt-1">
                  {String(errors.lastName.message)}
                </span>
              )}
            </div>
          </div>

          <label className="font-semibold text-gray-700">
            Supplier's Email
          </label>
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
              className={`border py-3 px-4 rounded-md w-full focus:outline-brand ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {String(errors.email.message)}
              </span>
            )}
          </div>

          <label className="font-semibold text-gray-700">Company Name</label>
          <div className="mt-2 w-full mb-6">
            <input
              {...register("companyName", {
                required: "Company name is required",
              })} // Fixed the email pattern bug here
              type="text"
              placeholder="Enter company name"
              className={`border py-3 px-4 rounded-md w-full focus:outline-brand ${errors.companyName ? "border-red-500" : ""}`}
            />
            {errors.companyName && (
              <span className="text-red-500 text-xs mt-1">
                {String(errors.companyName.message)}
              </span>
            )}
          </div>

          <label className="font-semibold text-gray-700">Address</label>
          <div className="mt-2 w-full mb-6">
            <input
              {...register("address", { required: "Address is required" })}
              type="text"
              placeholder="Address"
              className={`border py-3 px-4 rounded-md w-full focus:outline-brand ${errors.address ? "border-red-500" : ""}`}
            />
            {errors.address && (
              <span className="text-red-500 text-xs mt-1">
                {String(errors.address.message)}
              </span>
            )}
          </div>

          <label className="font-semibold text-gray-700">
            Billing Terms (In Days) <span className="text-red-700">*</span>
          </label>
          <div className="mt-2 w-full">
            <input
              {...register("billingTerms", {
                required: "Billing terms are required",
                pattern: { value: /^[0-9]+$/, message: "Only numbers allowed" },
              })}
              type="text"
              placeholder="e.g. 30"
              className={`border py-3 px-4 rounded-md w-full focus:outline-brand ${errors.billingTerms ? "border-red-500" : ""}`}
            />
            {errors.billingTerms && (
              <span className="text-red-500 text-xs mt-1">
                {String(errors.billingTerms.message)}
              </span>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-brand hover:bg-opacity-90 text-white px-8 py-3 rounded-lg font-medium transition-all"
            >
              Add Supplier
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddSuppliers;
