import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Tables from "./Tables";

const CustomerRelation = () => {
  const today = new Date();

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <div className="p-2 md:p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Customer Relations
      </h1>

      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
            Orders:
          </span>
          <div className="flex items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
              dateFormat="MM/dd/yyyy"
              className="border rounded-md p-1 text-xs"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date!)}
              dateFormat="MM/dd/yyyy"
              className="border rounded-md p-1 text-xs"
            />
          </div>
        </div>
      </div>

      <Tables startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default CustomerRelation;
