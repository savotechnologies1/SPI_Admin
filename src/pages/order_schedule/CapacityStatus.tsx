// import { FaCircle } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// import CapacityBarChart from "./CapacityBarChart";
// import CapacityRadialChart from "./CapacityRadialChart";

// const CapacityStatus = () => {
//   const data = [
//     {
//       id: 1,
//       process: "Sanding",
//       product:
//         "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
//       load: 0.0,
//       quantity: 10,
//       openDate: "11 Feb 2022",
//       time: "9:00PM",
//     },
//     {
//       id: 2,
//       process: "Inspection",
//       product:
//         "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
//       load: 0.0,
//       quantity: 10,
//       openDate: "11 Feb 2022",
//       time: "9:00PM",
//     },
//     {
//       id: 3,
//       process: "CutTrim",
//       product:
//         "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
//       load: 0.0,
//       quantity: 10,
//       openDate: "11 Feb 2022",
//       time: "9:00PM",
//     },
//     {
//       id: 4,
//       process: "Termoforming",
//       product:
//         "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
//       load: 0.0,
//       quantity: 10,
//       openDate: "11 Feb 2022",
//       time: "9:00PM",
//     },
//     {
//       id: 5,
//       process: "Technology",
//       product:
//         "(t)2009-2014 F-150SuperCab Cab, SlipOn Rocker Panel +Cab Corner Cover",
//       load: 0.0,
//       quantity: 10,
//       openDate: "11 Feb 2022",
//       time: "9:00PM",
//     },
//   ];

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-5">
//       <div className="flex items-center text-sm text-gray-500 mb-4"></div>
//       <div>
//         {" "}
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//           Capacity Status1
//         </h1>
//       </div>
//       <div className="flex justify-between  items-center">
//         <div className="flex gap-2 items-center ">
//           <p
//             className={`text-[14px] text-black`}
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             daily schedule & capacity
//           </span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             {" "}
//             capacity status
//           </span>
//         </div>
//       </div>

//       <div className="  mt-6 flex  flex-col md:flex-row  justify-between gap-4">
//         <div className="   md:w-[60%]  ">
//           <CapacityBarChart />
//         </div>
//         <div className="md:w-[40%] ">
//           <CapacityRadialChart />
//         </div>
//       </div>

//       <div className="bg-white   rounded-lg mt-4 overflow-auto">
//         <h1 className="p-4 text-lg font-semibold">Process Status11</h1>
//         <table className="min-w-full border-collapse">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 text-sm">
//               <th className="py-2 px-4 text-left ">Process</th>
//               <th className="py-2 px-4 text-left ">Product</th>
//               <th className="py-2 px-4 text-left ">Load</th>
//               <th className="py-2 px-4 text-left ">Quality</th>
//               <th className="py-2 px-4 text-left ">Open Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row) => (
//               <tr key={row.id} className="border-b hover:bg-gray-50">
//                 <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
//                   {row.process}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm whitespace-nowrap">
//                   {row.product}
//                 </td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">{row.load}</td>
//                 <td className="py-3 px-4 text-[#061D22] text-sm">
//                   {row.quantity}
//                 </td>

//                 <td className="py-3 px-4 text-[#061D22] text-sm  flex flex-col space-x-3 items-start whitespace-nowrap">
//                   <p>{row.openDate}</p>
//                   <p className="text-xs text-gray-400 ">{row.time}</p>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {/* <div className="flex justify-between items-center mt-4 p-2">
//           <button
//             onClick={goToPreviousPage}
//             disabled={currentPage === 1}
//             className={`px-2 py-2 rounded-md ${
//               currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
//             }`}
//           >
//             Previous
//           </button>
//           <span>
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={goToNextPage}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded-md ${
//               currentPage === totalPages
//                 ? "bg-gray-300"
//                 : "bg-brand text-white"
//             }`}
//           >
//             Next
//           </button>
//         </div> */}

//         <div>
//           <p className="text-sm p-4 text-right font-semibold">View All </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CapacityStatus;

import CapacityBarChart from "./CapacityBarChart";
import CapacityRadialChart from "./CapacityRadialChart";

// const CapacityStatus = () => {
//   const [scheduleData, setScheduleData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [barChartData, setBarChartData] = useState(null);
//   const [processCompletion, setsetProcessCompletion] = useState(null);
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     const fetchCapacityStatus = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/capacity-status-data`,
//         );
//         setBarChartData(res.data.barChartData); // 👈 ne
//         setScheduleData(res.data.scheduleData);
//         setsetProcessCompletion(res.data.processCompletion);
//         setLoading(false);
//       } catch (error) {
//         console.log("Error fetching capacity status:", error);
//         setLoading(false);
//       }
//     };

//     fetchCapacityStatus();
//   }, []);
//   console.log("processCompletionprocessComp111letion", processCompletion);
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen mt-5">
//       <div>
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//           Capacity Status
//         </h1>
//       </div>

//       <div className="flex justify-between items-center mt-2">
//         <div className="flex gap-2 items-center">
//           <p className="text-[14px] text-black">
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <span className="text-[14px] hover:cursor-pointer">
//             daily schedule & capacity
//           </span>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <span className="text-[14px] hover:cursor-pointer">
//             capacity status
//           </span>
//         </div>
//       </div>

//       <div className="mt-6 flex flex-col md:flex-row justify-between gap-4">
//         <div className="md:w-[60%]">
//           <CapacityBarChart chartData={barChartData} />
//         </div>
//         <div className="md:w-[40%]">
//           <CapacityRadialChart processCompletion={processCompletion} />
//         </div>
//       </div>

//       <div className="bg-white rounded-lg mt-4 overflow-auto">
//         <h1 className="p-4 text-lg font-semibold">Process Status</h1>

//         {loading ? (
//           <p className="p-4 text-gray-500">Loading...</p>
//         ) : (
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-sm">
//                 <th className="py-2 px-4 text-left">Process</th>
//                 <th className="py-2 px-4 text-left">Part Number</th>
//                 <th className="py-2 px-4 text-left">Cycle Time</th>
//                 <th className="py-2 px-4 text-left">Schedule Qty</th>
//                 <th className="py-2 px-4 text-left">Load</th>
//                 <th className="py-2 px-4 text-left">Status</th>
//                 <th className="py-2 px-4 text-left">Order Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {scheduleData.map((row) => (
//                 <tr key={row.id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.process?.processName || "-"}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.part?.partNumber || "-"}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.cycleTimeFromPart?.toFixed(2)} min
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.scheduleQuantity || 0}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.loadTime?.toFixed(2)} min
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.status}
//                   </td>
//                   <td className="py-3 px-4 text-[#061D22] text-sm">
//                     {row.order_date
//                       ? new Date(row.order_date).toLocaleDateString()
//                       : "-"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CapacityStatus;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
// Import your chart components
// import CapacityBarChart from "./CapacityBarChart";
// import CapacityRadialChart from "./CapacityRadialChart";

const CapacityStatus = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [barChartData, setBarChartData] = useState(null);
  const [processCompletion, setProcessCompletion] = useState(null);
  const [overallAverage, setOverallAverage] = useState(0);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchCapacityStatus = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/capacity-status-data`,
        );
        setBarChartData(res.data.barChartData);
        setScheduleData(res.data.scheduleData);
        setProcessCompletion(res.data.processCompletion);
        setOverallAverage(res.data.overallAverage);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching capacity status:", error);
        setLoading(false);
      }
    };
    fetchCapacityStatus();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-5">
      <h1 className="font-semibold text-[24px] text-black">Capacity Status</h1>

      <div className="flex gap-2 items-center mt-2 text-sm text-gray-500">
        <NavLink to="/dashboardDetailes" className="text-black">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px]" />
        <span>daily schedule & capacity</span>
        <FaCircle className="text-[6px]" />
        <span className="font-medium text-black">capacity status</span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="md:w-[60%] bg-white p-4 rounded-lg shadow-sm">
          <CapacityBarChart chartData={barChartData} />
        </div>
        <div className="md:w-[40%] bg-white p-4 rounded-lg shadow-sm">
          <CapacityRadialChart
            processCompletion={processCompletion}
            overallAverage={overallAverage}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg mt-4 overflow-hidden shadow-sm">
        <h2 className="p-4 text-lg font-semibold border-b">Process Status (Completed Orders)</h2>
        <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Process</th>
                <th className="py-3 px-4 text-left">Part Number</th>
                <th className="py-3 px-4 text-left">Cycle Time</th>
                <th className="py-3 px-4 text-left">Schedule Qty</th>
                <th className="py-3 px-4 text-left">Load</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!loading &&
                scheduleData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm font-medium">
                      {row.processName}({row.machineName})
                    </td>
                    <td className="py-3 px-4 text-sm">{row.partNumber}</td>
                    <td className="py-3 px-4 text-sm">
                      {row.cycleTimeFromPart} min
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {row.scheduleQuantity}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold">
                      {row.loadTime} min
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === "completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {row.order_date
                        ? new Date(row.order_date).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CapacityStatus;
