import { useState } from "react";
import CycleTime from "./CycleTimeBar";
import ProcessTrends from "./ProcessTrends";
import DatePicker from "react-datepicker";

const ContinuousImprovement = () => {
  return (
    <div className="p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Continuous Improvement
      </h1>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
            Continuous Improvement
          </span>

          {/* <div className="flex items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border rounded-md p-1 text-xs"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
              className="border rounded-md p-1 text-xs"
            />
          </div> */}
        </div>
      </div>
      <div className="bg-white rounded-md mt-6 shadow-md">
        <CycleTime />
      </div>

      {/* <div className="bg-white rounded-md mt-6 shadow-md">
        <ProcessTrends />
      </div> */}
    </div>
  );
};

export default ContinuousImprovement;
