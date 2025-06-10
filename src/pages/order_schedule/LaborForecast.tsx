

import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import LaborForecastList from "./LaborForecastList";

const LaborForecast = () => {
  return (
    <div className="p-4">
      <div>
        {" "}
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Labor Forecast
        </h1>
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
            daily schedule & capacity
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            Labor Forecast
          </span>
        </div>
      </div>

      <div className="py-6">
        <LaborForecastList />
      </div>
    </div>
  );
};

export default LaborForecast;
