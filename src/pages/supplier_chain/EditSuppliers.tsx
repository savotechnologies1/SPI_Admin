import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import delete_img from "../../assets/delete_1.png";
import { useForm } from "react-hook-form";
import {
  deleteSupplier,
  editSupplier,
  supplierDetail,
} from "./https/suppliersApi";
import { useEffect } from "react";

const EditSuppliers = () => {
interface SupplierFormData {
  firstName: string;
  lastName: string;
  email?: string;
  address?: string;
  billingTerms?: string;
  // add more fields if needed
}

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SupplierFormData>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Step 2: Strongly type the onSubmit function
 const onSubmit = async (data: object) => {
    console.log("✅ Updated Supplier Data:", data);
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await editSupplier(data, id!).then();
       navigate("/all-supplier");
       console.log(response)
      // if (response.status === 201) {
      //   navigate("/all-supplier");
      // }
    } catch (error: unknown) {
      throw error;
    }
  };


  const fetchProcessDetail = async () => {
    try {
      const response = await supplierDetail(id!);
      const data = response.data;
      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
        billingTerms: data.billingTerms,
      });
    } catch (error) {console.log(error)}
  };

  useEffect(() => {
    fetchProcessDetail();
  }, [id]);

  const handleDelete = async () => {
    console.log("Updated2332323");
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await deleteSupplier(id!);
      console.log("response", response);
        navigate("/all-supplier");
      // if (response.status === 200) {
      //   navigate("/all-supplier");
      // }
      
    } catch (error: unknown) {
      throw error;
    }
    // You can trigger an API call or confirmation modal here
  };
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Edit Supplier
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
            Suppliers
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            edit suppliers
          </span>
        </div>
      </div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 bg-white p-6 w-full rounded-2xl md:w-2/3">
          {/* Name */}
          <label className="font-semibold">Supplier's Name</label>
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                type="text"
                placeholder="First Name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {String(errors.firstName.message)}
                </p>
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
                <p className="text-red-500 text-sm">
                  {String(errors.lastName.message)}
                </p>
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
              <p className="text-red-500 text-sm">
                {String(errors.email.message)}
              </p>
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
              <p className="text-red-500 text-sm">
                {String(errors.address.message)}
              </p>
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
              <p className="text-red-500 text-sm">
                {String(errors.billingTerms.message)}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-end mt-6">
            <button
              type="submit"
              className="bg-brand text-white px-6 py-3 rounded-lg"
            >
              Update
            </button>
            <div
              onClick={handleDelete}
              className="bg-[#FF5630] rounded-full p-2 cursor-pointer"
            >
              <img className="w-[20px]" src={delete_img} alt="delete" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditSuppliers
