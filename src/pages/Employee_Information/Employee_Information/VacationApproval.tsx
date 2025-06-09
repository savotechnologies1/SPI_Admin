import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const VacationApproval = () => {
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          vacation Approval
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
            Approval
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl md:w-2/3">
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
          <div className=" w-full md:w-1/2">
            <label className="font-semibold" htmlFor="">
              Start Date
            </label>
            <input
              type="date"
              placeholder="Start Date"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className=" w-full md:w-1/2">
            <label className="font-semibold" htmlFor="">
              End Date
            </label>
            <input
              type="Date"
              placeholder=" End Date"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>

        <label className="font-semibold " htmlFor="">
          Hours
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="Hour"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
          Notes
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="Note"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>

        <label className="font-semibold " htmlFor="">
          Approval
        </label>
        <div className="mt-2 w-full">
          <select className="border py-4 px-4 rounded-md w-full " name="" id="">
            <option value="Yes">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>

        <div className="mt-6 text-end">
          <button className="bg-brand text-white px-5 py-2 rounded-lg ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VacationApproval;
