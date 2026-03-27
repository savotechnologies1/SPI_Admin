import React from "react";
import profile from "../../assets/profile.png";
export interface HourlyDataItem {
  hour: string;
  target?: number; // Optional
  actual: number;
  scrap: number;
}

export interface Employee {
  name: string;
  profileImage?: string;
}

interface TotalData {
  actual?: number;
  scrap?: number;
}

interface ProcessTableProps {
  processName: string;
  machineName: string;
  hourlyData: HourlyDataItem[];
  total?: TotalData;
  employees: (Employee | string)[];
}

const getShiftHours = (shift: number): string[] => {
  if (shift === 1) {
    return [
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
    ];
  } else if (shift === 2) {
    return [
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
    ];
  } else {
    return [
      "22:00",
      "23:00",
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
    ];
  }
};

const ProcessTable: React.FC<ProcessTableProps> = ({
  processName,
  machineName,
  hourlyData,
  total,
  employees,
}) => {
  const currentHour = new Date().getHours();
  let shift: number = 1;

  if (currentHour >= 6 && currentHour < 14) shift = 1;
  else if (currentHour >= 14 && currentHour < 22) shift = 2;
  else shift = 3;

  const allowedHours = getShiftHours(shift);

  const filteredData = hourlyData.filter((item) =>
    allowedHours.includes(item.hour),
  );

  const shiftTotal = filteredData.reduce(
    (acc, item) => {
      acc.target += item.target || 0;
      acc.actual += item.actual;
      acc.scrap += item.scrap;
      return acc;
    },
    { target: 0, actual: 0, scrap: 0 },
  );

  return (
    <div className="p-2 rounded-lg mx-auto">
      <h2 className="font-semibold mb-4 text-center text-[#1C252E]">
        {processName} ({machineName})
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-xs">
            <th className="py-1 px-2 text-left text-xs">Hour</th>
            <th className="py-1 px-2 text-left text-xs">Target</th>
            <th className="py-1 px-2 text-left text-xs">Actual</th>
            <th className="py-1 px-2 text-left text-xs">Scrap</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr
              key={index}
              className={`border-b ${
                item.hour === `${currentHour.toString().padStart(2, "0")}:00`
                  ? "bg-yellow-100"
                  : ""
              }`}
            >
              <td className="py-1 px-2 text-xs border">{item.hour}</td>
              <td className="py-1 px-2 text-xs border">{item.target ?? 0}</td>
              <td className="py-1 px-2 text-xs border">{item.actual}</td>
              <td className="py-1 px-2 text-xs border">{item.scrap}</td>
            </tr>
          ))}
          <tr className="font-semibold">
            <td className="py-1 px-2 text-xs border">Total</td>
            <td className="py-1 px-2 text-xs border"></td>
            <td className="py-1 px-2 text-xs border">
              {total?.actual ?? shiftTotal.actual}
            </td>
            <td className="py-1 px-2 text-xs border">
              {total?.scrap ?? shiftTotal.scrap}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mt-2">
        <p className="bg-gray-100 text-sm font-semibold p-1">EMP</p>
        <div className="flex flex-col">
          {employees.map((emp, index) => {
            // Type Guard: Check if emp is a string or an object
            const isString = typeof emp === "string";
            const empName = isString ? emp : emp.name;
            const empImage = isString ? profile : emp.profileImage || profile;

            return (
              <div key={index} className="flex items-center gap-4 p-1 border-b">
                <img
                  className="w-[20px]"
                  src={empImage as string}
                  alt={empName}
                />
                <p className="text-xs">{empName}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessTable;
