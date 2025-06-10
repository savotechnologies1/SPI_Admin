import send from "../../assets/Send.png";

import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import StockOrderScheduleForm from "./StockOrderScheduleForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const StockOrderSchedule = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 md:mb-0  ">
        <div>
          {" "}
          <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
            Stock Order Schedule
          </h1>
        </div>

        <div className="flex gap-4 justify-center items-center">
          <div className="bg-white p-2 rounded-3xl">
        <FontAwesomeIcon icon={faCartShopping} />
        </div>
          <div className="flex relative  ">
            <button className="py-2 px-10  border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/dashboard/addEmployees"> Schedule Order</NavLink>
            </button>
            <div className="absolute top-3 right-2 pl-2 ">
              <img src={send} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
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
            Stock Order Schedule
          </span>
        </div>
      </div>

      <div className="py-6">
        <StockOrderScheduleForm />
      </div>
    </div>
  );
};

export default StockOrderSchedule;
