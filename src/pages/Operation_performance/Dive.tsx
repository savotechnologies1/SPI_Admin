import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { FaSortAmountDown, FaSortAmountUp, FaSpinner, FaTrophy } from "react-icons/fa";

// const Dive = () => {
//   const [selectedStation, setSelectedStation] = useState<string>("");
//   const [selectedEmployee, setSelectedEmployee] = useState<string>("");
//   const [productivity, setProductivity] = useState<string>("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState<any>({
//     totalActual: 0,
//     processMetrics: [],
//     stations: [],
//     employees: [],
//     partsCompleted: [],
//     avgCycleTime: [],
//   });
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;
//   const getData = async (processId?: string, employeeId?: string) => {
//     try {
//       let url = `${BASE_URL}/api/admin/dive-chart-data`;
//       const params = [];

//       if (processId) params.push(`processId=${processId}`);
//       if (employeeId) params.push(`employeeId=${employeeId}`);
//       if (startDate)
//         params.push(`startDate=${startDate.toISOString().slice(0, 10)}`);
//       if (endDate) params.push(`endDate=${endDate.toISOString().slice(0, 10)}`);

//       if (params.length > 0) {
//         url += "?" + params.join("&");
//       }

//       const res = await axios.get(url);

//       const processedData = processApiData(res.data.data);
//       setDashboardData(processedData);
//       console.log("res.datares.data", res.data);
//       setProductivity(res.data?.productivity);

//       if (!selectedStation && processedData.stations.length > 0) {
//         setSelectedStation(processedData.stations[0]);
//       }
//       if (!selectedEmployee && processedData.employees.length > 0) {
//         setSelectedEmployee(processedData.employees[0]);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getData(selectedStation, selectedEmployee);
//   }, [startDate, endDate]);

//   // const processApiData = (data: any[]) => {
//   //   let totalActualCount = 0;
//   //   const processMap = new Map();
//   //   const uniqueStations = new Set();
//   //   const uniqueEmployees = new Set();
//   //   const partsTableData: any[] = [];

//   //   data.forEach((item) => {
//   //     totalActualCount += item.actual;
//   //     uniqueStations.add(item.processName);

//   //     if (item.employeeInfo) {
//   //       const fullName = `${item.employeeInfo.firstName} ${item.employeeInfo.lastName}`;
//   //       uniqueEmployees.add(fullName);
//   //     }

//   //     if (!processMap.has(item.processName)) {
//   //       processMap.set(item.processName, {
//   //         totalEfficiency: 0,
//   //         totalProductivity: 0,
//   //         count: 0,
//   //         cycleTimeValues: [] as number[],
//   //       });
//   //     }

//   //     const processEntry = processMap.get(item.processName);
//   //     processEntry.totalEfficiency += parseFloat(item.efficiency);
//   //     processEntry.totalProductivity += parseFloat(item.productivity);
//   //     processEntry.count++;

//   //     if (item.avgCycleTime) {
//   //       const [value, unit] = item.avgCycleTime.split(" ");
//   //       let minutes = parseFloat(value);
//   //       if (unit === "hr") minutes *= 60;
//   //       processEntry.cycleTimeValues.push(minutes);
//   //     }

//   //     partsTableData.push({
//   //       process: item.processName,
//   //       desc: item.partNumber,
//   //       employee: item.employeeInfo
//   //         ? `${item.employeeInfo.firstName} ${item.employeeInfo.lastName}`
//   //         : "Unassigned",
//   //     });
//   //   });

//   //   const processMetrics = Array.from(processMap.entries()).map(
//   //     ([processName, metrics]: any) => {
//   //       const avgEfficiency = (metrics.totalEfficiency / metrics.count).toFixed(
//   //         2
//   //       );
//   //       const avgProductivity = (
//   //         metrics.totalProductivity / metrics.count
//   //       ).toFixed(2);
//   //       const totalCycleTimeMinutes = metrics.cycleTimeValues.reduce(
//   //         (sum: number, t: number) => sum + t,
//   //         0
//   //       );
//   //       const avgCycleTimeMinutes =
//   //         metrics.cycleTimeValues.length > 0
//   //           ? totalCycleTimeMinutes / metrics.cycleTimeValues.length
//   //           : 0;

//   //       return {
//   //         text: processName,
//   //         efficiency: `${avgEfficiency}%`,
//   //         productivity: `${avgProductivity}%`,
//   //         avgCycle: avgCycleTimeMinutes,
//   //       };
//   //     }
//   //   );

//   //   const avgCycleTimeChartData = processMetrics.map((p) => ({
//   //     name: p.text,
//   //     avgCycle: p.avgCycle,
//   //   }));

//   //   return {
//   //     totalActual: totalActualCount,
//   //     processMetrics,
//   //     stations: Array.from(uniqueStations),
//   //     employees: Array.from(uniqueEmployees),
//   //     partsCompleted: partsTableData,
//   //     avgCycleTime: avgCycleTimeChartData,
//   //   };
//   // };

//   const processApiData = (data: any[]) => {
//     let totalActualCount = 0;
//     const processMap = new Map();
//     const uniqueStations = new Set();
//     const uniqueEmployees = new Set();
//     const partsTableData: any[] = [];

//     data.forEach((item) => {
//       totalActualCount += item.actual;
//       uniqueStations.add(item.processName);

//       // FIX: Employee string check
//       if (item.employee) {
//         uniqueEmployees.add(item.employee);
//       }

//       if (!processMap.has(item.processName)) {
//         processMap.set(item.processName, {
//           totalEfficiency: 0,
//           totalProductivity: 0,
//           count: 0,
//           cycleTimeValues: [] as number[],
//         });
//       }

//       const processEntry = processMap.get(item.processName);
//       processEntry.totalEfficiency += parseFloat(item.efficiency) || 0;
//       processEntry.totalProductivity += parseFloat(item.productivity) || 0;
//       processEntry.count++;

//       // FIX: Check if field exists
//       if (item.avgCycleTime) {
//         const [value, unit] = item.avgCycleTime.split(" ");
//         let minutes = parseFloat(value);
//         if (unit === "hr") minutes *= 60;
//         processEntry.cycleTimeValues.push(minutes);
//       }

//       partsTableData.push({
//         process: item.processName,
//         desc: item.partNumber,
//         employee: item.employee || "Unassigned", // FIX: Using item.employee directly
//       });
//     });

//     const processMetrics = Array.from(processMap.entries()).map(
//       ([processName, metrics]: any) => {
//         const avgEfficiency = (metrics.totalEfficiency / metrics.count).toFixed(
//           2
//         );
//         const avgProductivity = (
//           metrics.totalProductivity / metrics.count
//         ).toFixed(2);
//         const totalCycleTimeMinutes = metrics.cycleTimeValues.reduce(
//           (sum: number, t: number) => sum + t,
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

//     return {
//       totalActual: totalActualCount,
//       processMetrics,
//       stations: Array.from(uniqueStations),
//       employees: Array.from(uniqueEmployees),
//       partsCompleted: partsTableData,
//       avgCycleTime: processMetrics.map((p) => ({
//         name: p.text,
//         avgCycle: p.avgCycle,
//       })),
//     };
//   };
//   const handleSelectStation = (station: string) => {
//     setSelectedStation(station);
//   };

//   const handleSelectEmployee = (name: string) => {
//     setSelectedEmployee(name);
//   };

//   const filteredProcessMetrics = dashboardData.processMetrics.map((metric) => ({
//     ...metric,
//     isSelected: metric.text === selectedStation,
//   }));

//   const filteredParts = dashboardData.partsCompleted.filter(
//     (p) =>
//       (!selectedStation || p.process === selectedStation) &&
//       (!selectedEmployee || p.employee === selectedEmployee)
//   );

//   console.log(
//     "filteredProcessMetricsfilteredProcessMetrics",
//     filteredProcessMetrics
//   );

//   return (
//     <div>
//       <div className="flex items-center gap-2 justify-end">
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           dateFormat="dd/MM/yyyy"
//           className="border rounded-md p-1 text-xs"
//         />
//         <span>-</span>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           dateFormat="dd/MM/yyyy"
//           className="border rounded-md p-1 text-xs"
//         />
//       </div>
//       <div className="flex justify-between gap-4 flex-col md:flex-row mt-4">
//         <div className="md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 ">
//           {filteredProcessMetrics.map((item, index) => (
//             <div
//               key={index}
//               className={`bg-white p-4 rounded-md flex flex-col justify-center gap-4 px-8 ${
//                 item.isSelected ? "border-2 border-[#0F2B36]" : ""
//               }`}
//             >
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
//             {dashboardData.stations.map((station: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => handleSelectStation(station)}
//               >
//                 <div
//                   className={`w-5 h-5 flex items-center justify-center border ${
//                     selectedStation === station ? "bg-[#0F2B36]" : ""
//                   }`}
//                 >
//                   {selectedStation === station && (
//                     <span className="w-3 h-3 bg-white rounded-sm"></span>
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
//           <h2 className="text-lg font-semibold mb-4">Employee</h2>
//           <div className="flex flex-col gap-3">
//             {dashboardData.employees.map((name: string, index: number) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//                 onClick={() => handleSelectEmployee(name)}
//               >
//                 <div
//                   className={`w-5 h-5 flex items-center justify-center border ${
//                     selectedEmployee === name ? "bg-[#0F2B36]" : ""
//                   }`}
//                 >
//                   {selectedEmployee === name && (
//                     <span className="w-3 h-3 bg-white rounded-sm"></span>
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
//                 <th className="py-2 px-4 text-left">Process</th>
//                 <th className="py-2 px-4 text-left">Part Desc</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredParts.map((item, index) => (
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
//                   value: "Avg Cycle Time (minutes)",
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
//       <div className="bg-white rounded-lg shadow-md p-4 md:w-[65%] overflow-x-auto mt-6">
//         <h2 className="text-lg font-semibold mb-4">Producitivity</h2>
//         <table className="w-full">
//           <thead>
//             <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
//               <th className="py-2 px-4 text-left">Process Name</th>
//               <th className="py-2 px-4 text-left">Employee Name</th>
//               <th className="py-2 px-4 text-left">Cycle Time</th>
//               <th className="py-2 px-4 text-left">Qty</th>
//               <th className="py-2 px-4 text-left">Scrap</th>
//               <th className="py-2 px-4 text-left">Producitvity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productivity?.length > 0 ? (
//               productivity.map((item, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="py-2 px-4">{item.processName}</td>
//                   <td className="py-2 px-4">{item.employeeName}</td>
//                   <td className="py-2 px-4">{item.CT}</td>
//                   <td className="py-2 px-4">{item.Qty}</td>
//                   <td className="py-2 px-4">{item.Scrap}</td>
//                   <td className="py-2 px-4">{item.Prod}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dive;

// const Dive = () => {
//   const [selectedStation, setSelectedStation] = useState<string>("");
//   const [selectedEmployee, setSelectedEmployee] = useState<string>("");
//   const [productivityTable, setProductivityTable] = useState<any[]>([]);
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [dashboardData, setDashboardData] = useState<any>({
//     processMetrics: [],
//     stations: [],
//     employees: [],
//     partsCompleted: [],
//     avgCycleTime: [],
//   });

//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   const getData = async () => {
//     try {
//       let url = `${BASE_URL}/api/admin/dive-chart-data`;
//       const params = new URLSearchParams();

//       if (startDate) params.append("startDate", startDate.toISOString());
//       if (endDate) params.append("endDate", endDate.toISOString());
//       const res = await axios.get(`${url}?${params.toString()}`);
//       const rawData = res.data.data;

//       setProductivityTable(res.data.productivity);
//       const processed = processApiData(rawData);
//       setDashboardData(processed);
//       if (!selectedStation && processed.stations.length > 0)
//         setSelectedStation(processed.stations[0]);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [startDate, endDate]);

//   const processApiData = (data: any[]) => {
//     const uniqueStations = new Set<string>();
//     const uniqueEmployees = new Set<string>();
//     const processStats: any = {};

//     data.forEach((item) => {
//       uniqueStations.add(item.processName);
//       if (item.employee) uniqueEmployees.add(item.employee);

//       if (!processStats[item.processName]) {
//         processStats[item.processName] = {
//           text: item.processName,
//           effTotal: 0,
//           prodTotal: 0,
//           ctTotal: 0,
//           count: 0,
//         };
//       }
//       processStats[item.processName].effTotal += parseFloat(item.efficiency);
//       processStats[item.processName].prodTotal += parseFloat(item.productivity);
//       processStats[item.processName].ctTotal +=
//         parseFloat(item.avgCycleTime) || 0;
//       processStats[item.processName].count++;
//     });

//     const processMetrics = Object.values(processStats).map((s: any) => ({
//       text: s.text,
//       efficiency: (s.effTotal / s.count).toFixed(1) + "%",
//       productivity: (s.prodTotal / s.count).toFixed(1) + "%",
//       avgCycle: (s.ctTotal / s.count).toFixed(2),
//     }));

//     return {
//       processMetrics,
//       stations: Array.from(uniqueStations),
//       employees: Array.from(uniqueEmployees),
//       partsCompleted: data,
//       avgCycleTime: processMetrics.map((m) => ({
//         name: m.text,
//         avgCycle: parseFloat(m.avgCycle),
//       })),
//     };
//   };

//   const filteredParts = dashboardData.partsCompleted.filter(
//     (p: any) =>
//       (!selectedStation || p.processName === selectedStation) &&
//       (!selectedEmployee || p.employee === selectedEmployee)
//   );

//   return (
//     <div className="p-4">
//       <div className="flex items-center gap-2 justify-end mb-4">
//         <DatePicker
//           selected={startDate}
//           onChange={(d) => setStartDate(d!)}
//           className="border p-1 rounded"
//         />
//         <span>to</span>
//         <DatePicker
//           selected={endDate}
//           onChange={(d) => setEndDate(d!)}
//           className="border p-1 rounded"
//         />
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="md:w-[60%] grid grid-cols-2 gap-4">
//           {dashboardData.processMetrics.map((item: any, i: number) => (
//             <div
//               key={i}
//               className={`p-4 bg-white rounded shadow ${
//                 selectedStation === item.text ? "ring-2 ring-blue-500" : ""
//               }`}
//             >
//               <h3 className="font-bold text-center border-b mb-2">
//                 {item.text}
//               </h3>
//               <div className="flex justify-between">
//                 <div>
//                   <p className="text-xs text-gray-500">Efficiency</p>
//                   <p className="font-bold">{item.efficiency}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-500">Productivity</p>
//                   <p className="font-bold">{item.productivity}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="md:w-[20%] bg-white p-4 rounded shadow">
//           <h3 className="font-bold mb-2">Stations</h3>
//           {dashboardData.stations.map((s: string) => (
//             <label
//               key={s}
//               className="flex items-center gap-2 mb-1 cursor-pointer"
//             >
//               <input
//                 type="radio"
//                 checked={selectedStation === s}
//                 onChange={() => setSelectedStation(s)}
//               />
//               <span className="text-sm">{s}</span>
//             </label>
//           ))}
//         </div>

//         <div className="md:w-[20%] bg-white p-4 rounded shadow">
//           <h3 className="font-bold mb-2">Employees</h3>
//           <label className="flex items-center gap-2 mb-1 cursor-pointer">
//             <input
//               type="radio"
//               checked={selectedEmployee === ""}
//               onChange={() => setSelectedEmployee("")}
//             />
//             <span className="text-sm">All Employees</span>
//           </label>
//           {dashboardData.employees.map((e: string) => (
//             <label
//               key={e}
//               className="flex items-center gap-2 mb-1 cursor-pointer"
//             >
//               <input
//                 type="radio"
//                 checked={selectedEmployee === e}
//                 onChange={() => setSelectedEmployee(e)}
//               />
//               <span className="text-sm">{e}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <div className="bg-white p-4 rounded shadow overflow-x-auto">
//           <h3 className="font-bold mb-3">Parts Completed</h3>
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-gray-50 text-left">
//                 <th>Process</th>
//                 <th>Part</th>
//                 <th>Employee</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredParts.map((p: any, i: number) => (
//                 <tr key={i} className="border-t">
//                   <td>{p.processName}</td>
//                   <td>{p.partNumber}</td>
//                   <td>{p.employee}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="bg-white p-4 rounded shadow">
//           <h3 className="font-bold mb-3">Avg Cycle Time (min)</h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={dashboardData.avgCycleTime}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="avgCycle" fill="#4664C2" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded shadow mt-6 overflow-x-auto">
//         <h3 className="font-bold mb-3">Employee Wise Productivity</h3>
//         <table className="w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th>Process</th>
//               <th>Employee</th>
//               <th>Avg CT</th>
//               <th>Qty</th>
//               <th>Scrap</th>
//               <th>Prod %</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productivityTable.map((item, i) => (
//               <tr key={i} className="border-t text-center">
//                 <td>{item.processName}</td>
//                 <td>{item.employeeName}</td>
//                 <td>{item.CT}</td>
//                 <td>{item.Qty}</td>
//                 <td>{item.Scrap}</td>
//                 <td>{item.Prod}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

import "react-datepicker/dist/react-datepicker.css";

const Dive = () => {
  const [selectedStation, setSelectedStation] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [productivityTable, setProductivityTable] = useState<any[]>([]);
  
  // 1. Naya state top performers ke liye
  const [topPerformers, setTopPerformers] = useState<any[]>([]); 
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [dashboardData, setDashboardData] = useState<any>({
    processMetrics: [],
    stations: [],
    employees: [],
    partsCompleted: [],
    avgCycleTime: [],
  });
  const [parts, setParts] = useState<{ part_id: string; partNumber: string }[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [loadingParts, setLoadingParts] = useState(true);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest">("highest"); // Naya State

  const sortedRanking = [...topPerformers].sort((a, b) => {
    if (sortOrder === "highest") {
      return b._sortEff - a._sortEff || b._sortProd - a._sortProd;
    } else {
      return a._sortEff - b._sortEff || a._sortProd - b._sortProd;
    }
  });

  const getData = async () => {
    try {
      let url = `${BASE_URL}/api/admin/dive-chart-data`;
      const params = new URLSearchParams();

      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        params.append("startDate", start.toLocaleString('sv-SE').replace(' ', 'T'));
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        params.append("endDate", end.toLocaleString('sv-SE').replace(' ', 'T'));
      }
      if (selected) params.append("partId", selected);

      const res = await axios.get(`${url}?${params.toString()}`);
      
      // 2. API se data set karna
      setProductivityTable(res.data.productivity || []);
      setTopPerformers(res.data.topPerformers || []); // Backend se sorted ranking data
      
      const processed = processApiData(res.data.data);
      setDashboardData(processed);

      if (!selectedStation && processed.stations.length > 0)
        setSelectedStation(processed.stations[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchParts = async () => {
    try {
      setLoadingParts(true);
      const res = await axios.get(`${BASE_URL}/api/admin/get-parts`);
      setParts(res.data);
    } catch (error) {
      console.error("Error fetching parts:", error);
    } finally {
      setLoadingParts(false);
    }
  };

  useEffect(() => {
    fetchParts();
    getData();
  }, [startDate, endDate, selected]);

  const processApiData = (data: any[]) => {
    const uniqueMachines = new Set<string>();
    const uniqueEmployees = new Set<string>();
    const machineStats: any = {};

    data.forEach((item) => {
      const mName = item.machineName || item.processName;
      uniqueMachines.add(mName);
      if (item.employee) uniqueEmployees.add(item.employee);

      if (!machineStats[mName]) {
        machineStats[mName] = {
          text: mName,
          process: item.processName,
          effTotal: 0,
          prodTotal: 0,
          ctTotal: 0,
          count: 0,
        };
      }
      machineStats[mName].effTotal += parseFloat(item.efficiency) || 0;
      machineStats[mName].prodTotal += parseFloat(item.productivity) || 0;
      machineStats[mName].ctTotal += parseFloat(item.avgCycleTime) || 0;
      machineStats[mName].count++;
    });

    const processMetrics = Object.values(machineStats).map((s: any) => ({
      text: s.text,
      process: s.process,
      efficiency: (s.effTotal / s.count).toFixed(1) + "%",
      productivity: (s.prodTotal / s.count).toFixed(1) + "%",
      avgCycle: (s.ctTotal / s.count).toFixed(2),
    }));

    return {
      processMetrics,
      stations: Array.from(uniqueMachines),
      employees: Array.from(uniqueEmployees),
      partsCompleted: data,
      avgCycleTime: processMetrics.map((m) => ({
        name: m.text,
        avgCycle: parseFloat(m.avgCycle),
      })),
    };
  };

  const filteredParts = dashboardData.partsCompleted.filter(
    (p: any) =>
      (!selectedStation || p.machineName === selectedStation) &&
      (!selectedEmployee || p.employee === selectedEmployee)
  );

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Date Filters */}
      <div className="flex flex-wrap items-center gap-4 justify-between mb-4 bg-white p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Operational Dive</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Period:</span>
          <DatePicker
            selected={startDate}
            onChange={(d) => setStartDate(d!)}
            className="border p-1.5 rounded text-sm bg-gray-50"
          />
          <span className="text-gray-400">to</span>
          <DatePicker
            selected={endDate}
            onChange={(d) => setEndDate(d!)}
            className="border p-1.5 rounded text-sm bg-gray-50"
          />
        </div>
      </div>

      {/* Top Cards Grid */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Metrics Cards */}
        <div className="md:w-[60%] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dashboardData.processMetrics.map((item: any, i: number) => (
            <div
              key={i}
              onClick={() => setSelectedStation(item.text)}
              className={`p-4 bg-white rounded shadow-sm border-t-4 cursor-pointer transition-all ${
                selectedStation === item.text
                  ? "border-blue-600 scale-[1.02] shadow-md"
                  : "border-transparent"
              }`}
            >
              <h3 className="font-bold text-sm text-gray-700 truncate mb-2">{item.text}</h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Efficiency</p>
                  <p className="text-lg font-bold text-blue-600">{item.efficiency}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">Productivity</p>
                  <p className="text-lg font-bold text-green-600">{item.productivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Machines & Employees Selectors */}
        <div className="md:w-[20%] bg-white p-4 rounded shadow-sm max-h-[250px] overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">Machines</h3>
          {dashboardData.stations.map((s: string) => (
            <label key={s} className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="radio" name="station" checked={selectedStation === s} onChange={() => setSelectedStation(s)} />
              <span className="text-xs font-medium text-gray-600 truncate">{s}</span>
            </label>
          ))}
        </div>

        <div className="md:w-[20%] bg-white p-4 rounded shadow-sm max-h-[250px] overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">Employees</h3>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input type="radio" name="employee" checked={selectedEmployee === ""} onChange={() => setSelectedEmployee("")} />
            <span className="text-xs font-medium">All Employees</span>
          </label>
          {dashboardData.employees.map((e: string) => (
            <label key={e} className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input type="radio" name="employee" checked={selectedEmployee === e} onChange={() => setSelectedEmployee(e)} />
              <span className="text-xs font-medium text-gray-600">{e}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parts Completed */}
        <div className="bg-white p-4 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">Parts Completed</h3>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="p-2 bg-gray-50 border border-gray-300 text-sm rounded-lg w-40"
            >
              <option value="">All Parts</option>
              {parts.map((part) => (
                <option key={part.part_id} value={part.part_id}>{part.partNumber}</option>
              ))}
            </select>
          </div>
          <div className="overflow-y-auto max-h-[300px]">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-50 text-gray-600 text-left">
                  <th className="p-2">Machine</th>
                  <th className="p-2">Part Number</th>
                  <th className="p-2">Employee</th>
                </tr>
              </thead>
              <tbody>
                {filteredParts.map((p: any, i: number) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-2 text-xs text-blue-600 font-medium">{p.machineName}</td>
                    <td className="p-2 text-xs">{p.partNumber}</td>
                    <td className="p-2 text-xs text-gray-500">{p.employee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Avg Cycle Time Chart */}
        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4">Avg Cycle Time by Machine (min)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dashboardData.avgCycleTime}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="avgCycle" fill="#4664C2" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4 text-start ">Employee Performance Detail</h3>
        <div className="overflow-x-auto max-h-[300px]">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-800 text-white">
                <th className="p-2">Process (Machine)</th>
                <th className="p-2">Employee</th>
                <th className="p-2">Avg CT</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Scrap</th>
                <th className="p-2">Eff %</th>
                <th className="p-2">Prod %</th>
              </tr>
            </thead>
            <tbody>
              {productivityTable.map((item, i) => (
                <tr key={i} className="border-b text-center hover:bg-gray-50">
                  <td className="p-2 text-left">{item.processName} ({item.machineName})</td>
                  <td className="p-2 font-medium">{item.employeeName}</td>
                  <td className="p-2">{item.CT} min</td>
                  <td className="p-2 font-bold text-blue-600">{item.Qty}</td>
                  <td className="p-2 text-red-500">{item.Scrap}</td>
                  <td className="p-2 bg-blue-50 font-bold">{item.Eff}</td>
                  <td className="p-2 bg-green-50 font-bold">{item.Prod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* --- NEW: TOP PERFORMERS TABLE (RANKING) --- */}
       <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h3 className="font-bold text-gray-700 mb-4 text-start">
            Top  Performance 
              </h3>
    
              {/* Highest / Lowest Toggle Filter */}
              <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setSortOrder("highest")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    sortOrder === "highest" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FaSortAmountDown /> Highest First
                </button>
                <button
                  onClick={() => setSortOrder("lowest")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    sortOrder === "lowest" 
                    ? "bg-white text-red-600 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <FaSortAmountUp /> Lowest First
                </button>
              </div>
            </div>
    
            <div className="overflow-x-auto border ">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className={` bg-gray-800 text-white`}>
                    <th className="p-3 text-left">Employee Name</th>
                    <th className="p-3 text-center">Total Efficiency</th>
                    <th className="p-3 text-center">Total Productivity</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-center">Scrap</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRanking.length > 0 ? (
                    sortedRanking.map((emp, i) => {
                      // Rank calculate logic based on order
                      const displayRank = sortOrder === "highest" ? i + 1 : topPerformers.length - i;
                      
                      return (
                        <tr key={i} className="border-b hover:bg-gray-50 transition-colors">
                      
                          <td className="p-3 font-semibold text-gray-700">
                            {emp.employeeName}
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex flex-col items-center">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                parseFloat(emp.totalEfficiency) >= 80 ? "bg-green-100 text-green-700" : 
                                parseFloat(emp.totalEfficiency) >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                              }`}>
                                {emp.totalEfficiency}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-center text-gray-600 font-medium">
                            {emp.totalProductivity}
                          </td>
                          <td className="p-3 text-center font-bold text-blue-600">
                            {emp.totalQty}
                          </td>
                          <td className="p-3 text-center text-red-500">
                            {emp.totalScrap}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-gray-400">No records found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      {/* Process Wise Detail Table */}
  
    </div>
  );
};

export default Dive;