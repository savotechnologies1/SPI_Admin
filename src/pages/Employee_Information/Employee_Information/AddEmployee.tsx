import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addEmployee } from "../https/EmployeeApis";

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
  shopFloorLogin: boolean;
  termsAccepted: boolean;
};

const AddEmployee = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await addEmployee(data);
      if (response?.status == 201) {
        navigate("/employees");
      }
    } catch (error: unknown) {
      throw error;
    }
  };

  const navigate = useNavigate();
  const handleEditEmployee = () => {
    navigate("/edit-employee");
  };
  return (
    <div className="p-4 md:p-7 mt-5">
      <div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h1 className="font-bold text-xl md:text-2xl text-black">
              Create a new Employee
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
          <p
            className={`text-sm md:text-base text-black`}
            onClick={() => "dashboardDetailes"}
          >
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
            New Employee
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md max-w-xl  mt-4 space-y-4"
      >
        <div>
          <label className="font-semibold block mb-1">Employee Name</label>
          <div className="flex gap-2">
            <input
              {...register("firstName")}
              placeholder="First Name"
              className="w-1/2 border px-4 py-2 rounded-md"
            />
            <input
              {...register("lastName")}
              placeholder="Last Name"
              className="w-1/2 border px-4 py-2 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold block mb-1">Employee Full Name</label>
          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="font-semibold block mb-1">Employee Email</label>
          <input
            {...register("email")}
            placeholder="Enter  Email"
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Hourly Rate</label>
          <input
            {...register("hourlyRate")}
            placeholder="$25/Hour"
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Shift</label>
          <select
            {...register("shift")}
            className="w-full border px-4 py-2 rounded-md text-gray-600"
          >
            <option value="">Shift</option>
            <option value="day">Day</option>
            <option value="night">Night</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">Start Date</label>
          <input
            type="date"
            {...register("startDate")}
            placeholder="Start date"
            className="w-full border px-4 py-2 rounded-md text-gray-600"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Pin</label>
          <input
            type="text"
            {...register("pin")}
            placeholder="54215"
            className="w-full border px-4 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Employee Role</label>
          <select
            {...register("role")}
            className="w-full border px-4 py-2 rounded-md text-gray-600"
          >
            <option value="">Require Shop Floor Login</option>
            <option value="Shop_Floor">Shop Floor</option>
            <option value="Frontline_Manager">Frontline Manager</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">Station Login</label>
          <select
            {...register("processLogin")}
            className="w-full border px-4 py-2 rounded-md text-gray-600"
          >
            <option value="">Require Shop Floor Login</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="font-semibold block mb-1">Status</label>
          <select
            {...register("status")}
            className="w-full border px-4 py-2 rounded-md text-gray-600"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="banned">Banned</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {/* <div className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("termsAccepted")}
            className="w-4 h-4"
          />
          <label>I accept Term & Conditions.</label>
        </div> */}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-brand text-white px-4 py-2 rounded-md"
          >
            Add/Edit Employee
          </button>
          {/* <button
          onClick={handleEditEmployee}
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Edit Employee
          </button> */}
          {/* <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Save Employee History
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
