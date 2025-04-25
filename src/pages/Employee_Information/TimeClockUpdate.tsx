import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const TimeClockUpdate = () => {
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Time clock update
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px] hover:cursor-pointer">
            Employee
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px] hover:cursor-pointer">
            Update
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl ">
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

        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6 ">
          <div className=" w-full md:w-1/2 ">
            <label className="font-semibold" htmlFor="">
              Login
            </label>
            <input
              type="date"
              placeholder=""
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className=" w-full md:w-1/2 ">
            <label className="font-semibold" htmlFor="">
              Lunch In
            </label>
            <input
              type="date"
              placeholder=""
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className=" w-full md:w-1/2 ">
            <label className="font-semibold" htmlFor="">
              Lunch End
            </label>
            <input
              type="date"
              placeholder=""
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6 ">
          <div className=" w-full md:w-1/2 ">
            <label className="font-semibold" htmlFor="">
            Exception In
            </label>
            <input
              type="date"
              placeholder=""
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className=" w-full md:w-1/2 ">
            <label className="font-semibold" htmlFor="">
            Exception End
            </label>
            <input
              type="date"
              placeholder=""
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className=" w-full md:w-1/2 ">
            <label className="font-semibold" htmlFor="">
              Log Out
            </label>
            <input
              type="date"
              placeholder=""
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>

        <div className="mt-6 text-end">
          <button className="bg-brand text-white px-5 py-3 rounded-lg ">
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeClockUpdate;
