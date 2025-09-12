// import { useState } from "react";
// import CycleTime from "./CycleTimeBar";
// import ProcessTrends from "./ProcessTrends";
// import DatePicker from "react-datepicker";

// const ContinuousImprovement = () => {
//   return (
//     <div className="p-7">
//       <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//         Continuous Improvement
//       </h1>
//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center ">
//           <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
//             Continuous Improvement
//           </span>

//           {/* <div className="flex items-center gap-2">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               dateFormat="dd/MM/yyyy"
//               className="border rounded-md p-1 text-xs"
//             />
//             <span>-</span>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               dateFormat="dd/MM/yyyy"
//               className="border rounded-md p-1 text-xs"
//             />
//           </div> */}
//         </div>
//       </div>
//       <div className="bg-white rounded-md mt-6 shadow-md">
//         <CycleTime />
//       </div>

//       {/* <div className="bg-white rounded-md mt-6 shadow-md">
//         <ProcessTrends />
//       </div> */}
//     </div>
//   );
// };

// export default ContinuousImprovement;

import React, { useState } from "react";
import CycleTime from "./CycleTimeBar";
import StepsBar from "./StepsBar";

// const ContinuousImprovement = () => {
//   const parts = [
//     "partdesc1",
//     "Inspection",
//     "Kitting",
//     "Packaging And Shipping",
//     "Sanding",
//     "Thermoforming 1",
//     "Thermoforming 2",
//     "Thermoforming 3",
//   ];
//   const [selected, setSelected] = useState("partdesc1");
//   const handleSelect = (station: string) => {
//     setSelected(station);
//   };
//   return (
//     <div>
//       <div className="flex">
//         <CycleTime />
//         <div className="w-[30%] bg-white p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-4 mt-8">Part</h2>
//           <div className="flex flex-col gap-3">
//             {parts.map((station, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => handleSelect(station)}
//               >
//                 <div
//                   className={`w-5 h-5 flex items-center justify-center border ${
//                     selected === station ? "bg-[#0F2B36] text-black" : ""
//                   }`}
//                 >
//                   {selected === station && (
//                     <span className="w-3  bg-white rounded-sm"></span>
//                   )}
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     selected === station ? " text-black" : "text-gray-700"
//                   }`}
//                 >
//                   {station}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <StepsBar />
//     </div>
//   );
// };

// export default ContinuousImprovement;

import { useEffect } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const ContinuousImprovement = () => {
  const [parts, setParts] = useState<
    { part_id: string; partDescription: string }[]
  >([]);
  const [selected, setSelected] = useState<string>("");

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/get-parts`);
      setParts(res.data);
      if (res.data.length > 0) setSelected(res.data[0].part_id); // default select first
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };

  return (
    <div className="mt-10 px-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 mt-10 px-6">
        Continuous Improvement
      </h2>
      <div className="flex gap-5 mb-6 ">
        {/* Pass selected partId */}
        {selected && <CycleTime partId={selected} />}

        <div className="w-[30%] bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4 mt-8">Part Desc</h2>
          <div className="flex flex-col gap-3">
            {parts.map((part) => (
              <div
                key={part.part_id}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setSelected(part.part_id)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center border ${
                    selected === part.part_id ? "bg-[#0F2B36] text-black" : ""
                  }`}
                >
                  {selected === part.part_id && (
                    <span className="w-3 bg-white rounded-sm"></span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    selected === part.part_id ? "text-black" : "text-gray-700"
                  }`}
                >
                  {part.partDescription}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selected && <StepsBar partId={selected} />}
    </div>
  );
};

export default ContinuousImprovement;
