import { useState } from "react";

import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import shape_1 from "../../assets/shape_1.png";
import shape_2 from "../../assets/shape_2.png";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import OrderStatus from "../productionLive/OrderStatus";
const data_1 = [
  {
    num: "1",
    text: "shift",
    img: img1,
    shape: shape_1,
  },
  {
    num: "129",
    text: "Actual",
    img: img2,
    shape: shape_2,
  },
];

const data_2 = [
  {
    text: "Thermoforming",
    efficiency: "NAN",
    productivity: "0.0%",
  },
  {
    text: "Cut & Trim",
    efficiency: "NAN",
    productivity: "0.0%",
  },
  {
    text: "Sanding",
    efficiency: "NAN",
    productivity: "0.0%",
  },
  {
    text: "Inspection",
    efficiency: "NAN",
    productivity: "0.0%",
  },
];
const stations = [
  "Cut Trim",
  "Inspection",
  "Kitting",
  "Packaging And Shipping",
  "Sanding",
  "Thermoforming 1",
  "Thermoforming 2",
  "Thermoforming 3",
];
const names = [
  "Jane Cooper",
  "John Smith",
  "Emily Davis",
  "Michael Johnson",
  "Sarah Lee",
  "Daniel Thompson",
  "Olivia Martinez",
  "James Wilson",
];

const partsData = [
  { process: "Cut Trim", desc: "(t) Pass GMT800 Single" },
  { process: "Cut Trim", desc: "(t) Pass GMT800 Ext" },
  { process: "Cut Trim", desc: "(t) Pass GMT800 Crew" },
  { process: "Cut Trim", desc: "(t) Pass 09-14 F-150 er" },
  { process: "Cut Trim", desc: "(t) Pass 09-14 F-150 Crew" },
  { process: "Cut Trim", desc: "(t) Pass 09-14 Ram Quad" },
  { process: "Cut Trim", desc: "(t) Driven GMT800 Single" },
];

const cycleData = [{ name: "Cut Trim", avgCycle: 20 }];
``;

// const Dive = () => {
//   const [selected, setSelected] = useState("Cut Trim");
//   const handleSelect = (station: string) => {
//     setSelected(station);
//   };
//   const [selected1, setSelected1] = useState("Jane Cooper");
//   const handleSelect1 = (name: string) => {
//     setSelected1(name);
//   };
//   return (
//     <div>
//       <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//         {data_1.map((item) => (
//           <div className="flex justify-between items-center bg-white  rounded-md  w-60">
//             {" "}
//             <div className="p-2">
//               {" "}
//               <p className="font-bold text-2xl">{item.num}</p>
//               <p>{item.text}</p>
//             </div>
//             <div className="relative right-0">
//               <img src={item.shape} alt="" />
//               <div className="absolute right-4 top-6">
//                 {" "}
//                 <img src={item.img} alt="" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex  justify-between gap-4 flex-col md:flex-row mt-4">
//         <div className="md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 ">
//           {data_2.map((item) => (
//             <div>
//               <div className="bg-white p-4 rounded-md  flex flex-col justify-center gap-4 px-8">
//                 <h1 className="text-center font-semibold">{item.text}</h1>
//                 <div className="flex justify-between">
//                   <div className="flex flex-col">
//                     <p className="font-bold">{item.efficiency}</p>
//                     <p className="text-[#525252] text-sm">Efficiency</p>
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="font-bold">{item.productivity}</p>
//                     <p className="text-[#525252] text-sm">Productivity</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="md:w-[30%] bg-white p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Station</h2>
//           <div className="flex flex-col gap-3">
//             {stations.map((station, index) => (
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
//         <div className="md:w-[30%] bg-white p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Full Name</h2>
//           <div className="flex flex-col gap-3">
//             {names.map((name, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => handleSelect1(name)}
//               >
//                 <div
//                   className={`w-5 h-5 flex items-center justify-center border ${
//                     selected1 === name ? "bg-[#0F2B36] text-black" : ""
//                   }`}
//                 >
//                   {selected1 === name && (
//                     <span className="w-3  bg-white rounded-sm"></span>
//                   )}
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     selected1 === name ? " text-black" : "text-gray-700"
//                   }`}
//                 >
//                   {name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 mt-6">
//         <div className="bg-white rounded-lg shadow-md p-4 md:w-[65%] overflow-x-auto">
//           <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
//                 <th className="py-2 px-4 text-left">Process Name</th>
//                 <th className="py-2 px-4 text-left">Part Desc</th>
//               </tr>
//             </thead>
//             <tbody>
//               {partsData.map((item, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="py-2 px-4 whitespace-nowrap">
//                     {item.process}
//                   </td>
//                   <td className="py-2 px-4 whitespace-nowrap">{item.desc}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-lg shadow-md p-4 md:w-[35%]">
//           <h2 className="text-lg font-semibold mb-4">Avg Cycle Time</h2>
//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart data={cycleData}>
//               <XAxis
//                 dataKey="name"
//                 label={{ value: "Process", position: "bottom" }}
//               />
//               <YAxis
//                 label={{
//                   value: "Avg Cycle Time",
//                   angle: -90,
//                   position: "insideLeft",
//                 }}
//               />
//               <Tooltip />
//               <Bar dataKey="avgCycle" fill="#4664C2" barSize={60} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="mt-6">{/* <OrderStatus /> */}</div>
//     </div>
//   );
// };

import React, { useEffect } from "react";
import axios from "axios";

const apiResponse = {
  message: "Current status overview fetched successfully",
  processId: "All",
  totalRecords: 12,
  data: [
    {
      orderType: "StockOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "79ddf5",
      partNumber: "aloo",
      scheduled: 2,
      actual: 1,
      scrap: 0,
      remaining: 1,
      targetPerHour: 2,
      efficiency: "50.0%",
      productivity: "50.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-04T12:58:36.056Z",
      deliveryDate: "2025-09-04T12:58:32.933Z",
      currentDate: "2025-09-05T09:35:09.610Z",
    },
    {
      orderType: "StockOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "071f12",
      partNumber: "product1",
      scheduled: 1,
      actual: 0,
      scrap: 0,
      remaining: 1,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-04T13:29:21.520Z",
      deliveryDate: "2025-09-04T13:29:16.157Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "StockOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "79ddf5",
      partNumber: "aloo",
      scheduled: 0,
      actual: 0,
      scrap: 4,
      remaining: 0,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-03T13:07:36.782Z",
      deliveryDate: "2025-09-03T13:07:34.803Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "CustomOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "65aacf",
      partNumber: "part1",
      scheduled: 2,
      actual: 0,
      scrap: 0,
      remaining: 2,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-05T09:34:58.149Z",
      deliveryDate: "2025-09-06T00:00:00.000Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "StockOrder",
      processId: "4f087e",
      processName: "cooking",
      partId: "c7191d",
      partNumber: "aloo paratha",
      scheduled: 1,
      actual: 0,
      scrap: 0,
      remaining: 1,
      targetPerHour: 1,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "1 hr",
      startDate: "2025-09-04T12:58:36.056Z",
      deliveryDate: "2025-09-04T12:58:32.933Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "StockOrder",
      processId: "4f087e",
      processName: "cooking",
      partId: "c7191d",
      partNumber: "aloo paratha",
      scheduled: 1,
      actual: 1,
      scrap: 0,
      remaining: 0,
      targetPerHour: 1,
      efficiency: "100.0%",
      productivity: "100.0%",
      avgCycleTime: "1 hr",
      startDate: "2025-09-03T12:51:24.150Z",
      deliveryDate: "2025-09-03T12:51:22.575Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "CustomOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "f6228678-fa7d-4995-8168-1e496d1c9dee",
      partNumber: "part3",
      scheduled: 2,
      actual: 0,
      scrap: 0,
      remaining: 2,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-05T09:34:58.149Z",
      deliveryDate: "2025-09-06T00:00:00.000Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "StockOrder",
      processId: "4f087e",
      processName: "cooking",
      partId: "c7191d",
      partNumber: "aloo paratha",
      scheduled: 1,
      actual: 1,
      scrap: 1,
      remaining: 0,
      targetPerHour: 1,
      efficiency: "100.0%",
      productivity: "100.0%",
      avgCycleTime: "1 hr",
      startDate: "2025-09-03T13:07:36.782Z",
      deliveryDate: "2025-09-03T13:07:34.803Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "StockOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "65aacf",
      partNumber: "part1",
      scheduled: 2,
      actual: 0,
      scrap: 0,
      remaining: 2,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-04T13:29:21.520Z",
      deliveryDate: "2025-09-04T13:29:16.157Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "StockOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "79ddf5",
      partNumber: "aloo",
      scheduled: 1,
      actual: 1,
      scrap: 1,
      remaining: 0,
      targetPerHour: 2,
      efficiency: "50.0%",
      productivity: "100.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-03T12:51:24.150Z",
      deliveryDate: "2025-09-03T12:51:22.575Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "CustomOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "071f12",
      partNumber: "product1",
      scheduled: 1,
      actual: 0,
      scrap: 0,
      remaining: 1,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-05T09:34:58.149Z",
      deliveryDate: "2025-09-06T00:00:00.000Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
    {
      orderType: "CustomOrder",
      processId: "06df10",
      processName: "boiling",
      partId: "58f203",
      partNumber: "gobi",
      scheduled: 2,
      actual: 0,
      scrap: 0,
      remaining: 2,
      targetPerHour: 2,
      efficiency: "0.0%",
      productivity: "0.0%",
      avgCycleTime: "30 min",
      startDate: "2025-09-05T09:34:58.149Z",
      deliveryDate: "2025-09-06T00:00:00.000Z",
      currentDate: "2025-09-05T09:35:09.611Z",
    },
  ],
};

// const Dive = () => {
//   const [selectedStation, setSelectedStation] = useState("boiling");
//   const [selectedEmployee, setSelectedEmployee] = useState("Jane Cooper");
//   const [dashboardData, setDashboardData] = useState({
//     totalActual: 0,
//     processMetrics: [],
//     stations: [],
//     partsCompleted: [],
//     avgCycleTime: [],
//   });
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   const getData = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/dive-chart-data`);
//     } catch (error) {}
//   };
//   useEffect(() => {
//     // Process the API response to fit your dashboard structure
//     const processedData = processApiData(apiResponse.data);
//     setDashboardData(processedData);
//     getData();
//   }, []);

//   const processApiData = (data) => {
//     let totalActualCount = 0;
//     const processMap = new Map();
//     const uniqueStations = new Set();
//     const uniqueEmployees = new Set();
//     const partsTableData = [];

//     data.forEach((item) => {
//       totalActualCount += item.actual;
//       uniqueStations.add(item.processName);

//       if (item.employeeInfo) {
//         const fullName = `${item.employeeInfo.firstName} ${item.employeeInfo.lastName}`;
//         uniqueEmployees.add(fullName);
//       }

//       if (!processMap.has(item.processName)) {
//         processMap.set(item.processName, {
//           totalEfficiency: 0,
//           totalProductivity: 0,
//           count: 0,
//           cycleTimeValues: [],
//         });
//       }

//       const processEntry = processMap.get(item.processName);
//       processEntry.totalEfficiency += parseFloat(item.efficiency);
//       processEntry.totalProductivity += parseFloat(item.productivity);
//       processEntry.count++;
//       if (item.avgCycleTime) {
//         const [value, unit] = item.avgCycleTime.split(" ");
//         let minutes = parseFloat(value);
//         if (unit === "hr") minutes *= 60;
//         processEntry.cycleTimeValues.push(minutes);
//       }

//       partsTableData.push({
//         process: item.processName,
//         desc: item.partNumber,
//       });
//     });

//     const processMetrics = Array.from(processMap.entries()).map(
//       ([processName, metrics]) => {
//         const avgEfficiency = (metrics.totalEfficiency / metrics.count).toFixed(
//           2
//         );
//         const avgProductivity = (
//           metrics.totalProductivity / metrics.count
//         ).toFixed(2);
//         const totalCycleTimeMinutes = metrics.cycleTimeValues.reduce(
//           (sum, t) => sum + t,
//           0
//         );
//         const avgCycleTimeMinutes =
//           metrics.cycleTimeValues.length > 0
//             ? totalCycleTimeMinutes / metrics.cycleTimeValues.length
//             : 0;

//         return {
//           text: processName,
//           efficiency: `${avgEfficiency}%`,
//           productivity: `${avgProductivity}%`,
//           avgCycle: avgCycleTimeMinutes,
//         };
//       }
//     );

//     const avgCycleTimeChartData = processMetrics.map((p) => ({
//       name: p.text,
//       avgCycle: p.avgCycle,
//     }));

//     return {
//       totalActual: totalActualCount,
//       processMetrics,
//       stations: Array.from(uniqueStations),
//       employees: Array.from(uniqueEmployees),
//       partsCompleted: partsTableData,
//       avgCycleTime: avgCycleTimeChartData,
//     };
//   };

//   const handleSelectStation = (station: string) => {
//     setSelectedStation(station);
//   };

//   const handleSelectEmployee = (name: string) => {
//     setSelectedEmployee(name);
//   };

//   const data_1 = [
//     {
//       num: "1",
//       text: "shift",
//       shape: "/path/to/shape1.svg",
//       img: "/path/to/img1.svg",
//     },
//     {
//       num: dashboardData.totalActual,
//       text: "Actual",
//       shape: "/path/to/shape2.svg",
//       img: "/path/to/img2.svg",
//     },
//     // Add more top card data as needed
//   ];

//   // For demonstration, using hardcoded employee names as they are not in the JSON
//   const names = [
//     "Jane Cooper",
//     "John Smith",
//     "Emily Davis",
//     "Michael Johnson",
//     "Sarah Lee",
//     "Daniel Thompson",
//     "Olivia Martinez",
//     "James Wilson",
//   ];

//   // Filter process metrics based on selected station if needed
//   const filteredProcessMetrics = selectedStation
//     ? dashboardData.processMetrics.filter(
//         (metric) => metric.text === selectedStation
//       )
//     : dashboardData.processMetrics;

//   return (
//     <div>
//       <div className="flex flex-col md:flex-row mt-2 gap-4 ">
//         {data_1.map((item, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center bg-white rounded-md w-60"
//           >
//             <div className="p-2">
//               <p className="font-bold text-2xl">{item.num}</p>
//               <p>{item.text}</p>
//             </div>
//             {/* Assuming shape and img are illustrative and not directly from your data */}
//             <div className="relative right-0">
//               {/* <img src={item.shape} alt="" /> */}
//               <div className="absolute right-4 top-6">
//                 {/* <img src={item.img} alt="" /> */}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between gap-4 flex-col md:flex-row mt-4">
//         <div className="md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 ">
//           {dashboardData.processMetrics.map((item, index) => (
//             <div key={index}>
//               <div className="bg-white p-4 rounded-md flex flex-col justify-center gap-4 px-8">
//                 <h1 className="text-center font-semibold">{item.text}</h1>
//                 <div className="flex justify-between">
//                   <div className="flex flex-col">
//                     <p className="font-bold">{item.efficiency}</p>
//                     <p className="text-[#525252] text-sm">Efficiency</p>
//                   </div>
//                   <div className="flex flex-col">
//                     <p className="font-bold">{item.productivity}</p>
//                     <p className="text-[#525252] text-sm">Productivity</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="md:w-[30%] bg-white p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Station</h2>
//           <div className="flex flex-col gap-3">
//             {dashboardData.stations.map((station, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => handleSelectStation(station)}
//               >
//                 <div
//                   className={`w-5 h-5 flex items-center justify-center border ${
//                     selectedStation === station ? "bg-[#0F2B36] text-black" : ""
//                   }`}
//                 >
//                   {selectedStation === station && (
//                     <span className="w-3 bg-white rounded-sm"></span>
//                   )}
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     selectedStation === station
//                       ? " text-black"
//                       : "text-gray-700"
//                   }`}
//                 >
//                   {station}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="md:w-[30%] bg-white p-4 rounded-md">
//           <h2 className="text-lg font-semibold mb-4">Full Name</h2>
//           <div className="flex flex-col gap-3">
//             {names.map((name, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => handleSelectEmployee(name)}
//               >
//                 <div
//                   className={`w-5 h-5 flex items-center justify-center border ${
//                     selectedEmployee === name ? "bg-[#0F2B36] text-black" : ""
//                   }`}
//                 >
//                   {selectedEmployee === name && (
//                     <span className="w-3 bg-white rounded-sm"></span>
//                   )}
//                 </div>
//                 <span
//                   className={`text-sm ${
//                     selectedEmployee === name ? " text-black" : "text-gray-700"
//                   }`}
//                 >
//                   {name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-8 mt-6">
//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-md p-4 md:w-[65%] overflow-x-auto">
//           <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
//                 <th className="py-2 px-4 text-left">Process Name</th>
//                 <th className="py-2 px-4 text-left">Part Desc</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dashboardData.partsCompleted.map((item, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="py-2 px-4 whitespace-nowrap">
//                     {item.process}
//                   </td>
//                   <td className="py-2 px-4 whitespace-nowrap">{item.desc}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-lg shadow-md p-4 md:w-[35%]">
//           <h2 className="text-lg font-semibold mb-4">Avg Cycle Time</h2>
//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart data={dashboardData.avgCycleTime}>
//               <XAxis
//                 dataKey="name"
//                 label={{ value: "Process", position: "bottom" }}
//               />
//               <YAxis
//                 label={{
//                   value: "Avg Cycle Time (minutes)", // Updated unit
//                   angle: -90,
//                   position: "insideLeft",
//                 }}
//               />
//               <Tooltip />
//               <Bar dataKey="avgCycle" fill="#4664C2" barSize={60} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//       <div className="mt-6">{/* <OrderStatus /> */}</div>
//     </div>
//   );
// };

const Dive = () => {
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [dashboardData, setDashboardData] = useState<any>({
    totalActual: 0,
    processMetrics: [],
    stations: [],
    employees: [],
    partsCompleted: [],
    avgCycleTime: [],
  });
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // 🔹 Fetch API data
  // Fetch API data
  const getData = async (processId?: string, employeeId?: string) => {
    try {
      let url = `${BASE_URL}/api/admin/dive-chart-data`;
      const params = [];

      if (processId) params.push(`processId=${processId}`);
      if (employeeId) params.push(`employeeId=${employeeId}`);

      if (params.length > 0) {
        url += "?" + params.join("&");
      }

      const res = await axios.get(url);
      const processedData = processApiData(res.data.data);
      setDashboardData(processedData);

      // Auto select if empty
      if (!selectedStation && processedData.stations.length > 0) {
        setSelectedStation(processedData.stations[0]);
      }
      if (!selectedEmployee && processedData.employees.length > 0) {
        setSelectedEmployee(processedData.employees[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // 🔹 Process API data into UI-friendly structure
  const processApiData = (data: any[]) => {
    let totalActualCount = 0;
    const processMap = new Map();
    const uniqueStations = new Set();
    const uniqueEmployees = new Set();
    const partsTableData: any[] = [];

    data.forEach((item) => {
      totalActualCount += item.actual;
      uniqueStations.add(item.processName);

      if (item.employeeInfo) {
        const fullName = `${item.employeeInfo.firstName} ${item.employeeInfo.lastName}`;
        uniqueEmployees.add(fullName);
      }

      if (!processMap.has(item.processName)) {
        processMap.set(item.processName, {
          totalEfficiency: 0,
          totalProductivity: 0,
          count: 0,
          cycleTimeValues: [] as number[],
        });
      }

      const processEntry = processMap.get(item.processName);
      processEntry.totalEfficiency += parseFloat(item.efficiency);
      processEntry.totalProductivity += parseFloat(item.productivity);
      processEntry.count++;

      if (item.avgCycleTime) {
        const [value, unit] = item.avgCycleTime.split(" ");
        let minutes = parseFloat(value);
        if (unit === "hr") minutes *= 60;
        processEntry.cycleTimeValues.push(minutes);
      }

      partsTableData.push({
        process: item.processName,
        desc: item.partNumber,
        employee: item.employeeInfo
          ? `${item.employeeInfo.firstName} ${item.employeeInfo.lastName}`
          : "Unassigned",
      });
    });

    const processMetrics = Array.from(processMap.entries()).map(
      ([processName, metrics]: any) => {
        const avgEfficiency = (metrics.totalEfficiency / metrics.count).toFixed(
          2
        );
        const avgProductivity = (
          metrics.totalProductivity / metrics.count
        ).toFixed(2);
        const totalCycleTimeMinutes = metrics.cycleTimeValues.reduce(
          (sum: number, t: number) => sum + t,
          0
        );
        const avgCycleTimeMinutes =
          metrics.cycleTimeValues.length > 0
            ? totalCycleTimeMinutes / metrics.cycleTimeValues.length
            : 0;

        return {
          text: processName,
          efficiency: `${avgEfficiency}%`,
          productivity: `${avgProductivity}%`,
          avgCycle: avgCycleTimeMinutes,
        };
      }
    );

    const avgCycleTimeChartData = processMetrics.map((p) => ({
      name: p.text,
      avgCycle: p.avgCycle,
    }));

    return {
      totalActual: totalActualCount,
      processMetrics,
      stations: Array.from(uniqueStations),
      employees: Array.from(uniqueEmployees),
      partsCompleted: partsTableData,
      avgCycleTime: avgCycleTimeChartData,
    };
  };

  // 🔹 Handlers
  const handleSelectStation = (station: string) => {
    setSelectedStation(station);
  };

  const handleSelectEmployee = (name: string) => {
    setSelectedEmployee(name);
  };

  // 🔹 Filter data based on selected station & employee
  const filteredProcessMetrics = dashboardData.processMetrics.filter(
    (metric) => !selectedStation || metric.text === selectedStation
  );

  const filteredParts = dashboardData.partsCompleted.filter(
    (p) =>
      (!selectedStation || p.process === selectedStation) &&
      (!selectedEmployee || p.employee === selectedEmployee)
  );

  // 🔹 Top cards
  const data_1 = [
    {
      num: "1",
      text: "Shift",
    },
    {
      num: dashboardData.totalActual,
      text: "Actual",
    },
  ];

  return (
    <div>
      {/* Top Cards */}
      {/* <div className="flex flex-col md:flex-row mt-2 gap-4 ">
        {data_1.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white rounded-md w-60 p-2"
          >
            <div>
              <p className="font-bold text-2xl">{item.num}</p>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div> */}

      {/* Process Metrics + Station + Employee */}
      <div className="flex justify-between gap-4 flex-col md:flex-row mt-4">
        <div className="md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {filteredProcessMetrics.map((item, index) => (
            <div key={index}>
              <div className="bg-white p-4 rounded-md flex flex-col justify-center gap-4 px-8">
                <h1 className="text-center font-semibold">{item.text}</h1>
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p className="font-bold">{item.efficiency}</p>
                    <p className="text-[#525252] text-sm">Efficiency</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">{item.productivity}</p>
                    <p className="text-[#525252] text-sm">Productivity</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Station Tabs */}
        <div className="md:w-[30%] bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Station</h2>
          <div className="flex flex-col gap-3">
            {dashboardData.stations.map((station: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSelectStation(station)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center border ${
                    selectedStation === station ? "bg-[#0F2B36]" : ""
                  }`}
                >
                  {selectedStation === station && (
                    <span className="w-3 h-3 bg-white rounded-sm"></span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    selectedStation === station
                      ? " text-black"
                      : "text-gray-700"
                  }`}
                >
                  {station}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Tabs */}
        <div className="md:w-[30%] bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Employee</h2>
          <div className="flex flex-col gap-3">
            {dashboardData.employees.map((name: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSelectEmployee(name)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center border ${
                    selectedEmployee === name ? "bg-[#0F2B36]" : ""
                  }`}
                >
                  {selectedEmployee === name && (
                    <span className="w-3 h-3 bg-white rounded-sm"></span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    selectedEmployee === name ? " text-black" : "text-gray-700"
                  }`}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table + Chart */}
      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Table */}
        <div className="bg-white rounded-lg shadow-md p-4 md:w-[65%] overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                <th className="py-2 px-4 text-left">Process</th>
                <th className="py-2 px-4 text-left">Part Desc</th>
                <th className="py-2 px-4 text-left">Employee</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4 whitespace-nowrap">
                    {item.process}
                  </td>
                  <td className="py-2 px-4 whitespace-nowrap">{item.desc}</td>
                  <td className="py-2 px-4 whitespace-nowrap">
                    {item.employee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 md:w-[35%]">
          <h2 className="text-lg font-semibold mb-4">Avg Cycle Time</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dashboardData.avgCycleTime}>
              <XAxis
                dataKey="name"
                label={{ value: "Process", position: "bottom" }}
              />
              <YAxis
                label={{
                  value: "Avg Cycle Time (minutes)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar dataKey="avgCycle" fill="#4664C2" barSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dive;
