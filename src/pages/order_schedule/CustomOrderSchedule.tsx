import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import CustomOrderScheduleForm from "./CustomOrderScheduleForm";

const CustomOrderSchedule = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 md:mb-0  ">
        <div>
          {" "}
          <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
            Custom Order Schedule
          </h1>
        </div>
        <div>
          <button className="py-2 px-10  border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to=""> Schedule Custom Order</NavLink>
          </button>
        </div>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            Order Schedule
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            Custom Order Schedule
          </span>
        </div>
      </div>

        <div className="py-6">
        <CustomOrderScheduleForm />
      </div>

     
    </div>
  );
};

export default CustomOrderSchedule;
