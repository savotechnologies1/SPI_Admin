import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const addEmployees = () => {
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Create a new Employee’s
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
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">Employee</span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            New Employee
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl xl:w-2/3">
        <label className="font-semibold" htmlFor="">
        Employee Name
        </label>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6 ">
          <div className=" w-full md:w-1/2">
            <input
              type="text"
              placeholder="First Name"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className=" w-full md:w-1/2">
            <input
              type="text"
              placeholder="Last Name"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>
        <label className="font-semibold " htmlFor="">
        Employee Full Name
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="Full Name"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
        Hourly Rate
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="$25/Hour"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
        Shift
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="Shift"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
        Start Date
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="date"
            placeholder="Start Date"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
      Pin
        </label>
        <div className="mt-2 w-full">
          <input
            type="text"
            placeholder=" 542115"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>

      




        
        <div className="mt-6 text-end">
          <button className="bg-brand text-white px-5 py-3 rounded-lg ">Create Employee</button>
        </div>
      </div>
    </div>
  );
};

export default addEmployees;
