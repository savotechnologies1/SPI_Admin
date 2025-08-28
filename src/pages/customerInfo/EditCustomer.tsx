// import { FaCircle } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import delete_img from "../../assets/delete_1.png"

// const EditCustomer = () => {
//   return (
//     <div className="p-4 md:p-7">
//       <div>
//         <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//          Edit Customer
//         </h1>
//       </div>
//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center ">
//           <p
//             className={`text-xs sm:text-[16px] text-black`}
//             onClick={() => ("dashboardDetailes")}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-xs sm:text-[16px] hover:cursor-pointer">Customer</span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-xs sm:text-[16px] hover:cursor-pointer">
//             edit customer
//           </span>
//         </div>
//       </div>
//       <div className="mt-4 bg-white p-4 md:p-6 w-full rounded-2xl xl:w-2/3">
//         <label className="font-semibold" htmlFor="">
//           Customer Name
//         </label>
//         <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
//           <div className="sm:w-1/2">
//             <input
//               type="text"
//               placeholder="First Name"
//               className="border py-4 px-4 rounded-md w-full"
//             />
//           </div>
//           <div className="sm:w-1/2">
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="border py-4 px-4 rounded-md w-full"
//             />
//           </div>
//         </div>
//         <label className="font-semibold " htmlFor="">
//           Customer Email
//         </label>
//         <div className="mt-2 w-full mb-6">
//           <input
//             type="text"
//             placeholder="Email address"
//             className="border py-4 px-4 rounded-md w-full "
//           />
//         </div>
//         <label className="font-semibold " htmlFor="">
//           Address
//         </label>
//         <div className="mt-2 w-full mb-6">
//           <input
//             type="text"
//             placeholder="Address"
//             className="border py-4 px-4 rounded-md w-full "
//           />
//         </div>
//         <label className="font-semibold " htmlFor="">
//           Billing Terms (In Days) <span className="text-red-700">*</span>
//         </label>
//         <div className="mt-2 w-full">
//           <input
//             type="text"
//             placeholder="Billing Terms"
//             className="border py-4 px-4 rounded-md w-full "
//           />
//         </div>

//         <div className="flex justify-between items-end">
//         <div className="mt-6 ">
//           <button className="bg-brand text-white px-6 py-3 "> Update</button>
//         </div>

//         <div className="bg-[#FF5630] rounded-full p-2"><img className="w-[20px]" src={delete_img} alt="" /></div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default EditCustomer;

import { useForm } from "react-hook-form";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  customerDetail,
  deleteCustomer,
  editCustomer,
} from "./https/customersApi";
import { useEffect } from "react";

// Step 1: Define the form field types
interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  customerPhone: string;
  address?: string;
  billingTerms: number;
}

const EditCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerFormData>(); // ✅ Type passed here

  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data: CustomerFormData) => {
    try {
      const response = await editCustomer(data, id);
      if (response?.status === 200) {
        navigate("/customer-list");
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchProcessDetail = async () => {
    try {
      const response = await customerDetail(id);
      const data = response.data;

      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        customerPhone: data.customerPhone,
        address: data.address,
        billingTerms: data.billingTerms,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProcessDetail();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await deleteCustomer(id);
      if (response?.status === 200) {
        navigate("/customer-list");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="p-4 md:p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Edit Customer
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <NavLink
            to="/dashboardDetailes"
            className="text-xs sm:text-[16px] text-black"
          >
            Dashboard
          </NavLink>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px]">Customers</span>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px]">Edit Customer</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 bg-white p-2 md:p-6 w-full rounded-2xl xl:w-2/3">
          {/* First & Last Name */}
          <label className="font-semibold">Customer Name</label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <input
                type="text"
                {...register("firstName", {
                  required: "First Name is required.",
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

          {/* Email */}
          <label className="font-semibold">Customer Email</label>
          <div className="mt-2 w-full mb-6">
            <input
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address.",
                },
              })}
              placeholder="Email address"
              className="border py-4 px-4 rounded-md w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <label className="font-semibold">Customer Phone Number</label>
          <div className="mt-2 w-full mb-6">
            <input
              type="tel"
              {...register("customerPhone", {
                required: "Phone number is required.",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Phone number must be 10 to 15 digits.",
                },
              })}
              placeholder="Phone Number"
              className="border py-4 px-4 rounded-md w-full"
            />
            {errors.customerPhone && (
              <p className="text-red-500 text-sm">
                {errors.customerPhone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <label className="font-semibold">Address</label>
          <div className="mt-2 w-full mb-6">
            <textarea
              {...register("address", {
                maxLength: {
                  value: 255,
                  message: "Address cannot exceed 255 characters.",
                },
              })}
              placeholder="Address"
              className="border py-4 px-4 rounded-md w-full resize-none"
              rows={4}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Billing Terms */}
          <label className="font-semibold">
            Billing Terms (In Days) <span className="text-red-700">*</span>
          </label>
          <div className="mt-2 w-full">
            <input
              type="number"
              {...register("billingTerms", {
                required: "Billing Terms is required.",
                min: {
                  value: 1,
                  message: "Must be at least 1 day.",
                },
                max: {
                  value: 365,
                  message: "Cannot exceed 365 days.",
                },
              })}
              placeholder="Billing Terms"
              className="border py-4 px-4 rounded-md w-full"
            />
            {errors.billingTerms && (
              <p className="text-red-500 text-sm">
                {errors.billingTerms.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-end">
            <div className="mt-6 flex gap-4">
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 text-white px-6 py-2 rounded-md"
              >
                Delete
              </button>
              <button
                type="submit"
                className="bg-brand text-white px-6 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
