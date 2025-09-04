import DatePicker from "react-datepicker";
import Tables from "./Tables";
import { useState } from "react";

const CustomerRelation = () => {
  const [startDate, setStartDate] = useState(new Date("2024-08-25"));
  const [endDate, setEndDate] = useState(new Date("2025-11-25"));
  return (
    <div className="p-2 md:p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Customer Relations
      </h1>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
            Sales:
          </span>

          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </div>
      <Tables />
    </div>
  );
};

export default CustomerRelation;
