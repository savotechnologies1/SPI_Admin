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
import delete_img from "../../assets/delete_1.png";

const EditCustomer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data: object) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await editCustomer(data, id);
      if (response?.status == 200) {
        navigate("/customer-list");
      }
    } catch (error: unknown) {
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
      if (response?.status == 200) {
        navigate("/customer-list");
      }
    } catch (error: unknown) {
      console.log("errorerror", error);
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
          <p
            className={`text-xs sm:text-[16px] text-black`}
            onClick={() => "dashboardDetailes"}
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
            Edit Customer
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 bg-white p-2 md:p-6 w-full rounded-2xl  xl:w-2/3">
          <label className="font-semibold" htmlFor="">
            Customer Name
          </label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <input
                type="text"
                {...register("firstName", { required: true })}
                placeholder="First Name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">This field is required .</p>
              )}
            </div>
            <div className="sm:w-1/2">
              <input
                type="text"
                {...register("lastName", { required: true })}
                placeholder="Last Name"
                className="border py-4 px-4 rounded-md w-full"
              />

              {errors.lastName && (
                <p className="text-red-500 text-sm">This field is required .</p>
              )}
            </div>
          </div>
          <label className="font-semibold " htmlFor="">
            Customer Email
          </label>
          <div className="mt-2 w-full mb-6">
            <input
              type="text"
              {...register("email", { required: true })}
              placeholder="Email address"
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.email && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <label className="font-semibold " htmlFor="">
            Customer Phone Number
          </label>
          <div className="mt-2 w-full mb-6">
            <input
              type="number"
              {...register("customerPhone", { required: true })}
              placeholder="Phone Number"
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.email && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <label className="font-semibold " htmlFor="">
            Address
          </label>
          <div className="mt-2 w-full mb-6">
            <input
              type="text"
              {...register("address", { required: true })}
              placeholder="Address"
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.address && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>
          <label className="font-semibold " htmlFor="">
            Billing Terms (In Days) <span className="text-red-700">*</span>
          </label>
          <div className="mt-2 w-full">
            <input
              type="text"
              {...register("billingTerms", { required: true })}
              placeholder="Billing Terms"
              className="border py-4 px-4 rounded-md w-full "
            />
            {errors.billingTerms && (
              <p className="text-red-500 text-sm">This field is required</p>
            )}
          </div>

          <div className="flex justify-between items-end">
            <div className="mt-6">
              <button
                type="submit"
                className="bg-brand text-white px-6 py-2 rounded-md"
              >
                Save
              </button>
            </div>

            <div className="bg-[#FF5630] rounded-full p-2 cursor-pointer">
              <img
                className="w-[20px]"
                src={delete_img}
                alt="delete"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
