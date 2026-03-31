import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import {
  employeeDetail,
  editEmployee,
  deleteEmployee,
} from "../https/EmployeeApis";

type FormData = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  hourlyRate: string;
  shift: string;
  status: string;
  startDate: Date | null; 
  pin: string;
  role: string;
  processLogin: string;
  termsAccepted: boolean;
};

const EditEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    if (!id) return;

    // API ko data bhejte waqt format standard (YYYY-MM-DD) hi rakhein taaki backend reject na kare
    const formattedData = {
      ...data,
      startDate: data.startDate ? data.startDate.toISOString().split("T")[0] : "",
    };

    try {
      const response = await editEmployee(formattedData, id);
      if (response?.status === 200) {
        navigate("/employees");
      }
    } catch (error: unknown) {
      console.error("Failed to edit employee:", error);
    }
  };

  const fetchEmployeeDetail = async () => {
    if (!id) return;
    try {
      const response = await employeeDetail(id);
      const data = response.data;

      reset({
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: data.fullName,
        email: data.email,
        hourlyRate: data.hourlyRate,
        pin: data.pin,
        shift: data.shift,
        role: data.role,
        processLogin: String(data.processLogin),
        status: data.status,
        // API se aane wali date string ko Date object mein convert karein
        startDate: data.startDate ? new Date(data.startDate) : null,
        termsAccepted: data.termsAccepted,
      });
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  useEffect(() => {
    if (id) fetchEmployeeDetail();
  }, [id, reset]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      const response = await deleteEmployee(id);
      if (response?.status === 200) navigate("/employees");
    } catch (error: unknown) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-4 md:p-7 mt-5">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="font-bold text-xl md:text-2xl text-black">Edit Employee</h1>
        </div>

        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <p className="text-sm md:text-base text-black">
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span><FaCircle className="text-[4px] md:text-[6px] text-gray-500" /></span>
          <span className="text-sm md:text-base hover:cursor-pointer">Employees</span>
          <span><FaCircle className="text-[4px] md:text-[6px] text-gray-500" /></span>
          <span className="text-sm md:text-base hover:cursor-pointer">Edit Employee</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md mt-4 space-y-4">
        {/* Name Fields */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">First Name</label>
            <input {...register("firstName", { required: "First Name is required" })} className="w-full border px-4 py-2 rounded-md" />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Last Name</label>
            <input {...register("lastName", { required: "Last Name is required" })} className="w-full border px-4 py-2 rounded-md" />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email & Full Name */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Full Name</label>
            <input {...register("fullName", { required: "Full Name is required" })} className="w-full border px-4 py-2 rounded-md" />
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Employee Email</label>
            <input {...register("email", { required: "Email is required" })} className="w-full border px-4 py-2 rounded-md" />
          </div>
        </div>

        {/* Rate & Shift */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Hourly Rate</label>
            <input {...register("hourlyRate", { required: "Required" })} className="w-full border px-4 py-2 rounded-md" />
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Shift</label>
            <select {...register("shift")} className="w-full border px-4 py-2 rounded-md text-gray-600">
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
          </div>
        </div>

        {/* Start Date (UPDATED FOR MM/DD/YYYY) */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Start Date</label>
            <Controller
              control={control}
              name="startDate"
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="MM/DD/YYYY"
                  className="w-full border px-4 py-2 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MM/dd/yyyy" // <--- Yahan format change kiya hai
                  wrapperClassName="w-full"
                />
              )}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Pin</label>
            <input {...register("pin", { required: "Required" })} className="w-full border px-4 py-2 rounded-md" />
          </div>
        </div>

        {/* Role & Station Login */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Employee Role</label>
            <select {...register("role")} className="w-full border px-4 py-2 rounded-md">
              <option value="Shop_Floor">Shop Floor</option>
              <option value="Frontline_Manager">Frontline Manager</option>
            </select>
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Station Login</label>
            <select {...register("processLogin")} className="w-full border px-4 py-2 rounded-md">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Status</label>
            <select {...register("status")} className="w-full border px-4 py-2 rounded-md">
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-2 mt-6">
          {/* <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md mr-4"
          >
            Delete
          </button> */}
          <button
            type="submit"
            className="bg-brand bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;