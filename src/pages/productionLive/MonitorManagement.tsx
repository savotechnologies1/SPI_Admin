import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DataTable from "../Operation_performance/DataTable";

const MonitorManagement = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [manualData, setManualData] = useState([]);
  const [monitorData, setMonitorData] = useState([]);
  const [productionScrapData, setProductionScrapData] = useState([]);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/monitor-chart-data`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      setManualData(res.data.manualTable);
      setMonitorData(res.data.monitorTable);
      setProductionScrapData(res.data.productionScrap);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  console.log("manualDatamanualData", manualData);

  return (
    <>
      <div>
        <h1 className="font-bold text-2xl mt-11 px-6">Monitor</h1>
      </div>
      <div className="flex items-center gap-2 justify-end">
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
      <div className="flex  justify-between items-center gap-8 p-6">
        {/* <DataTable columns={table.columns} data={table.data} /> */}
        <DataTable
          manualData={manualData}
          monitorData={monitorData}
          productionScrapData={productionScrapData}
        />
      </div>
    </>
  );
};

export default MonitorManagement;

// ProductionDashboard.tsx
// React + TypeScript + Tailwind CSS single-file component

// Types

// type ManualRow = {
//   process: string;
//   part: string;
//   qty: number;
//   scrap: number;
// };

// type PartRow = {
//   id: number;
//   part: string;
//   machineCT: number; // machine cycle time
//   opTime: number; // operation time
//   totalCT: number; // total cycle time
//   scrap: number;
//   process: string;
// };

// // Mock data (replace with props or fetch from API)
// const MANUAL_DATA: ManualRow[] = [
//   { process: "Inspection", part: "Driver GMT800 Single", qty: 18, scrap: 1 },
//   { process: "Inspection", part: "Pass GMT800 Single", qty: 3, scrap: 1 },
// ];

// const PARTS_DATA: PartRow[] = [
//   {
//     id: 100,
//     part: "General Thermoformed part",
//     machineCT: 3.87,
//     opTime: 2.37,
//     totalCT: 6.23,
//     scrap: 2,
//     process: "Molding",
//   },
//   {
//     id: 101,
//     part: "General Thermoformed part",
//     machineCT: 3.92,
//     opTime: 2.1,
//     totalCT: 6.02,
//     scrap: 5,
//     process: "Inspection",
//   },
//   {
//     id: 102,
//     part: "General Thermoformed part",
//     machineCT: 3.98,
//     opTime: 2.4,
//     totalCT: 6.38,
//     scrap: 1,
//     process: "Packing",
//   },
//   {
//     id: 103,
//     part: "Driver GMT800 Single",
//     machineCT: 4.05,
//     opTime: 2.5,
//     totalCT: 6.55,
//     scrap: 0,
//     process: "Inspection",
//   },
// ];

// export default function MonitorManagement() {
//   const [parts] = useState<PartRow[]>(PARTS_DATA);
//   const [manual] = useState<ManualRow[]>(MANUAL_DATA);

//   const [sortBy, setSortBy] = useState<"totalCT" | "scrap">("totalCT");
//   const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
//   const [selectedPart, setSelectedPart] = useState<PartRow | null>(
//     parts[0] ?? null
//   );

//   // sorted parts for display
//   const sortedParts = useMemo(() => {
//     const copy = [...parts];
//     copy.sort((a, b) => {
//       const vA = sortBy === "totalCT" ? a.totalCT : a.scrap;
//       const vB = sortBy === "totalCT" ? b.totalCT : b.scrap;
//       return sortDir === "desc" ? vB - vA : vA - vB;
//     });
//     return copy;
//   }, [parts, sortBy, sortDir]);

//   // aggregate cycle time by process (for left chart)
//   const cycleByProcess = useMemo(() => {
//     const map = new Map<string, { total: number; count: number }>();
//     parts.forEach((p) => {
//       const existing = map.get(p.process) ?? { total: 0, count: 0 };
//       existing.total += p.totalCT;
//       existing.count += 1;
//       map.set(p.process, existing);
//     });
//     const arr = Array.from(map.entries()).map(
//       ([process, { total, count }]) => ({ process, avgCT: total / count })
//     );
//     // sort desc (high to low)
//     arr.sort((a, b) => b.avgCT - a.avgCT);
//     return arr;
//   }, [parts]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
//       <header className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold">Production Live Monitor</h1>
//         <div className="text-sm text-gray-600">
//           8/22/2023&nbsp;&nbsp;3:19 PM
//         </div>
//       </header>

//       <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
//         {/* Left Column: Manual + Cycle-by-Process */}
//         <section className="lg:col-span-4 space-y-4">
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="font-medium mb-2">Manual Report</h2>
//             <table className="w-full text-sm table-fixed">
//               <thead>
//                 <tr className="text-left text-xs text-gray-500">
//                   <th className="w-1/3">Process</th>
//                   <th className="w-1/3">Part</th>
//                   <th className="w-1/6">Qty</th>
//                   <th className="w-1/6">Scrap</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {manual.map((r, idx) => (
//                   <tr key={idx} className="border-t">
//                     <td className="py-2">{r.process}</td>
//                     <td className="py-2">{r.part}</td>
//                     <td className="py-2">{r.qty}</td>
//                     <td className="py-2">{r.scrap}</td>
//                   </tr>
//                 ))}
//                 <tr className="border-t font-semibold">
//                   <td className="py-2">Total</td>
//                   <td />
//                   <td className="py-2">
//                     {manual.reduce((s, r) => s + r.qty, 0)}
//                   </td>
//                   <td className="py-2">
//                     {manual.reduce((s, r) => s + r.scrap, 0)}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="font-medium mb-2">Cycle Time by Process (avg)</h2>
//             <ul className="space-y-3">
//               {cycleByProcess.map((c) => (
//                 <li
//                   key={c.process}
//                   className="flex items-center justify-between"
//                 >
//                   <div>
//                     <div className="text-sm font-medium">{c.process}</div>
//                     <div className="text-xs text-gray-500">
//                       Avg CT: {c.avgCT.toFixed(2)} s
//                     </div>
//                   </div>
//                   <div className="w-40">
//                     {/* simple bar visual */}
//                     <div className="h-3 bg-gray-100 rounded overflow-hidden">
//                       <div
//                         className="h-full rounded"
//                         style={{
//                           width: `${Math.min(100, (c.avgCT / 8) * 100)}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </section>

//         {/* Middle Column: Part to Monitor + Controls */}
//         <section className="lg:col-span-5 space-y-4">
//           <div className="bg-white shadow rounded-lg p-4">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="font-medium">Part to Monitor</h2>
//               <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="sort"
//                     checked={sortBy === "totalCT"}
//                     onChange={() => setSortBy("totalCT")}
//                   />
//                   Cycle Time
//                 </label>
//                 <label className="flex items-center gap-1">
//                   <input
//                     type="radio"
//                     name="sort"
//                     checked={sortBy === "scrap"}
//                     onChange={() => setSortBy("scrap")}
//                   />
//                   Scrap
//                 </label>
//                 <button
//                   onClick={() =>
//                     setSortDir((d) => (d === "desc" ? "asc" : "desc"))
//                   }
//                   className="px-2 py-1 bg-gray-100 rounded text-xs"
//                 >
//                   {sortDir === "desc" ? "High → Low" : "Low → High"}
//                 </button>
//               </div>
//             </div>

//             <div className="overflow-auto max-h-96">
//               <table className="w-full text-sm">
//                 <thead>
//                   <tr className="text-left text-xs text-gray-500">
//                     <th>ID</th>
//                     <th>Part</th>
//                     <th>Machine CT</th>
//                     <th>Op Time</th>
//                     <th>Total CT</th>
//                     <th>Scrap</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sortedParts.map((p) => (
//                     <tr
//                       key={p.id}
//                       onClick={() => setSelectedPart(p)}
//                       className={`cursor-pointer border-t hover:bg-gray-50 ${
//                         selectedPart?.id === p.id ? "bg-blue-50" : ""
//                       }`}
//                     >
//                       <td className="py-2">{p.id}</td>
//                       <td className="py-2 truncate max-w-[160px]">{p.part}</td>
//                       <td className="py-2">{p.machineCT.toFixed(2)}</td>
//                       <td className="py-2">{p.opTime.toFixed(2)}</td>
//                       <td className="py-2">{p.totalCT.toFixed(2)}</td>
//                       <td className="py-2">{p.scrap}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="font-medium mb-2">Cycle Time Chart (by Process)</h2>
//             <div className="h-48 flex items-end gap-4">
//               {cycleByProcess.map((c) => (
//                 <div
//                   key={c.process}
//                   className="flex-1 flex flex-col items-center"
//                 >
//                   <div className="w-full h-full flex items-end">
//                     <div
//                       className="rounded-t-md"
//                       style={{
//                         width: "100%",
//                         height: `${Math.min(100, (c.avgCT / 8) * 100)}%`,
//                         background: "linear-gradient(180deg,#3b82f6,#60a5fa)",
//                         borderTopLeftRadius: 6,
//                         borderTopRightRadius: 6,
//                       }}
//                     />
//                   </div>
//                   <div className="text-xs mt-2 text-center">{c.process}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Right Column: Part Detail */}
//         <aside className="lg:col-span-3 space-y-4">
//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="font-medium mb-2">Part Details</h2>
//             {selectedPart ? (
//               <div>
//                 <div className="text-sm font-semibold">{selectedPart.part}</div>
//                 <div className="text-xs text-gray-500 mb-3">
//                   Process: {selectedPart.process}
//                 </div>

//                 <dl className="text-sm space-y-2">
//                   <div className="flex justify-between">
//                     <dt>Machine CT</dt>
//                     <dd>{selectedPart.machineCT.toFixed(2)} s</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt>Operation Time</dt>
//                     <dd>{selectedPart.opTime.toFixed(2)} s</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt>Total Cycle Time</dt>
//                     <dd>{selectedPart.totalCT.toFixed(2)} s</dd>
//                   </div>
//                   <div className="flex justify-between">
//                     <dt>Scrap</dt>
//                     <dd>{selectedPart.scrap}</dd>
//                   </div>
//                 </dl>

//                 <div className="mt-4">
//                   <button className="w-full py-2 rounded bg-blue-600 text-white text-sm">
//                     Monitor
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-sm text-gray-500">
//                 Select a part from the table to see details.
//               </div>
//             )}
//           </div>

//           <div className="bg-white shadow rounded-lg p-4">
//             <h2 className="font-medium mb-2">Scrap Summary (Top)</h2>
//             <ol className="list-decimal pl-5 text-sm space-y-2">
//               {sortedParts
//                 .slice()
//                 .sort((a, b) => b.scrap - a.scrap)
//                 .slice(0, 5)
//                 .map((p) => (
//                   <li key={p.id} className="flex justify-between">
//                     <span className="truncate max-w-[150px]">
//                       {p.part} ({p.process})
//                     </span>
//                     <span className="font-semibold">{p.scrap}</span>
//                   </li>
//                 ))}
//             </ol>
//           </div>
//         </aside>
//       </main>

//       <footer className="mt-6 text-xs text-gray-500">
//         Manual Scrap and live data as per current production feed
//       </footer>
//     </div>
//   );
// }
