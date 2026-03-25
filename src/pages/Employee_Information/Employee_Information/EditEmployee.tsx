import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
  startDate: string;
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
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormData>();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);
    if (!id) {
      console.error("Employee ID is missing");
      return;
    }
    try {
      const response = await editEmployee(data, id);
      if (response?.status === 200) {
        navigate("/employees");
      }
    } catch (error: unknown) {
      console.error("Failed to edit employee:", error);
    }
  };

  const fetchEmployeeDetail = async () => {
    if (!id) {
      console.error("Employee ID is missing");
      return;
    }
    try {
      const response = await employeeDetail(id);
      const data = response.data;
      const formattedStartDate = data?.startDate
        ? new Date(data.startDate).toISOString().split("T")[0]
        : "";

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
        startDate: formattedStartDate,
        termsAccepted: data.termsAccepted,
      });
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchEmployeeDetail();
    }
  }, [id, reset]);

  const handleDelete = async () => {
    if (!id) {
      console.error("Employee ID is missing");
      return;
    }
    try {
      const response = await deleteEmployee(id);
      if (response?.status === 200) {
        navigate("/employees");
      }
    } catch (error: unknown) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="p-4 md:p-7 mt-5">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-black">
              Edit Employee
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <p className={`text-sm md:text-base text-black`}>
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base hover:cursor-pointer">
            Employees
          </span>
          <span>
            <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
          </span>
          <span className="text-sm md:text-base hover:cursor-pointer">
            Edit Employee
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md mt-4 space-y-4"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">First Name</label>
            <input
              {...register("firstName", {
                required: "First Name is required",
              })}
              placeholder="First Name"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Last Name</label>
            <input
              {...register("lastName", {
                required: "Last Name is required",
              })}
              placeholder="Last Name"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Full Name</label>
            <input
              {...register("fullName", {
                required: "Full Name is required",
              })}
              placeholder="Full Name"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Employee Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              placeholder="Enter Email"
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Hourly Rate</label>
            <input
              {...register("hourlyRate", {
                required: "Hourly Rate is required",
                pattern: {
                  value: /^\d+(\.\d{1,2})?$/,
                  message:
                    "Hourly Rate must be a valid number (e.g., 25 or 25.50)",
                },
                onBlur: (e) => {
                  const value = e.target.value;
                  if (value && !/^\d+(\.\d{1,2})?$/.test(value)) {
                    setError("hourlyRate", {
                      type: "manual",
                      message:
                        "Hourly Rate must be a valid number (e.g., 25 or 25.50)",
                    });
                  } else {
                    clearErrors("hourlyRate");
                  }
                },
              })}
              type="text"
              inputMode="numeric"
              placeholder="$25/Hour"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
                if (e.key === "." && e.currentTarget.value.includes(".")) {
                  e.preventDefault();
                }
              }}
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.hourlyRate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.hourlyRate.message}
              </p>
            )}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Shift</label>
            <select
              {...register("shift", {
                required: "Shift is required",
              })}
              className="w-full border px-4 py-2 rounded-md text-gray-600"
            >
              <option value="">Select Shift</option>
              <option value="day">Day</option>
              <option value="night">Night</option>
            </select>
            {errors.shift && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shift.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Start Date</label>
            <input
              type="date"
              {...register("startDate", {
                required: "Start Date is required",
              })}
              placeholder="Start date"
              className="w-full border px-4 py-2 rounded-md text-gray-600"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDate.message}
              </p>
            )}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Pin</label>
            <input
              {...register("pin", {
                required: "PIN is required",
                pattern: {
                  value: /^\d{5}$/,
                  message: "PIN must be exactly 5 digits",
                },
                onBlur: (e) => {
                  const value = e.target.value;
                  if (value && !/^\d{5}$/.test(value)) {
                    setError("pin", {
                      type: "manual",
                      message: "PIN must be exactly 5 digits",
                    });
                  } else {
                    clearErrors("pin");
                  }
                },
              })}
              type="text"
              inputMode="numeric"
              placeholder="54215"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="w-full border px-4 py-2 rounded-md"
            />
            {errors.pin && (
              <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Employee Role</label>
            <select
              {...register("role", {
                required: "Employee Role is required",
              })}
              className="w-full border px-4 py-2 rounded-md text-gray-600"
            >
              <option value="">Select Role</option>
              <option value="Shop_Floor">Shop Floor</option>
              <option value="Frontline_Manager">Frontline Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Station Login</label>
            <select
              {...register("processLogin", {
                required: "Station Login is required",
              })}
              className="w-full border px-4 py-2 rounded-md text-gray-600"
            >
              <option value="">Require Shop Floor Login?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {errors.processLogin && (
              <p className="text-red-500 text-sm mt-1">
                {errors.processLogin.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="sm:w-1/2">
            <label className="font-semibold block mb-1">Status</label>
            <select
              {...register("status", {
                required: "Status is required",
              })}
              className="w-full border px-4 py-2 rounded-md text-gray-600"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="banned">Banned</option>
              <option value="rejected">Rejected</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
          <div className="sm:w-1/2"></div>
        </div>

        <div className="flex justify-end pt-2 mt-6">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-md mr-4"
          >
            Delete
          </button>
          <button
            type="submit"
            className="bg-brand text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
