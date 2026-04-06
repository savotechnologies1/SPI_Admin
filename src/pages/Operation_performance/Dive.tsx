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
import {
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

const Dive = () => {
 const [selectedStation, setSelectedStation] = useState<string>("All Machines");

  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [productivityTable, setProductivityTable] = useState<any[]>([]);
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
  const [parts, setParts] = useState<{ part_id: string; partNumber: string }[]>(
    [],
  );
  const [selected, setSelected] = useState<string>("");
  const [loadingParts, setLoadingParts] = useState(true);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [sortOrder, setSortOrder] = useState<"highest" | "lowest">("highest");

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
        params.append(
          "startDate",
          start.toLocaleString("sv-SE").replace(" ", "T"),
        );
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        params.append("endDate", end.toLocaleString("sv-SE").replace(" ", "T"));
      }
      if (selected) params.append("partId", selected);
      const res = await axios.get(`${url}?${params.toString()}`);
      setProductivityTable(res.data.productivity || []);
      setTopPerformers(res.data.topPerformers || []);
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

// const processApiData = (data: any[]) => {
//   const uniqueMachines = new Set<string>();
//   const uniqueEmployees = new Set<string>();
//   const machineStats: any = {};

//   data.forEach((item) => {
//     const mName = item.machineName || item.processName;
//     uniqueMachines.add(mName);
//     if (item.employee) uniqueEmployees.add(item.employee);

//     if (!machineStats[mName]) {
//       machineStats[mName] = {
//         text: mName,
//         process: item.processName,
//         effTotal: 0,
//         prodTotal: 0,
//         ctTotal: 0,
//         count: 0,
//         validCTCount: 0, // Naya counter sirf sahi entries ke liye
//       };
//     }

//     const currentCT = parseFloat(item.avgCycleTime) || 0;
    
//     machineStats[mName].effTotal += parseFloat(item.efficiency) || 0;
//     machineStats[mName].prodTotal += parseFloat(item.productivity) || 0;
//     machineStats[mName].count++;

//     // FIX: Agar cycle time 0 se bada hai, tabhi count karein
//     if (currentCT > 0) {
//       machineStats[mName].ctTotal += currentCT;
//       machineStats[mName].validCTCount++; 
//     }
//   });

//   const processMetrics = Object.values(machineStats).map((s: any) => ({
//     text: s.text,
//     process: s.process,
//     efficiency: (s.effTotal / s.count).toFixed(1) + "%",
//     productivity: (s.prodTotal / s.count).toFixed(1) + "%",
//     // FIX: s.count ki jagah s.validCTCount use karein
//     avgCycle: s.validCTCount > 0 ? (s.ctTotal / s.validCTCount).toFixed(2) : "0.00",
//   }));

//   return {
//     processMetrics,
//     stations: Array.from(uniqueMachines),
//     employees: Array.from(uniqueEmployees),
//     partsCompleted: data,
//     avgCycleTime: processMetrics.map((m) => ({
//       name: m.text,
//       avgCycle: parseFloat(m.avgCycle),
//     })),
//   };
// };
  
const processApiData = (data: any[]) => {
  const uniqueMachines = new Set<string>();
  const machineStats: any = {};
  
  // Global totals for "All Machines" card
  let totalEff = 0, totalProd = 0, totalCT = 0, totalCount = 0, totalValidCT = 0;

  data.forEach((item) => {
    const mName = item.machineName || item.processName;
    uniqueMachines.add(mName);

    if (!machineStats[mName]) {
      machineStats[mName] = { text: mName, effTotal: 0, prodTotal: 0, ctTotal: 0, count: 0, validCTCount: 0 };
    }

    const eff = parseFloat(item.efficiency) || 0;
    const prod = parseFloat(item.productivity) || 0;
    const ct = parseFloat(item.avgCycleTime) || 0;

    machineStats[mName].effTotal += eff;
    machineStats[mName].prodTotal += prod;
    machineStats[mName].count++;
    
    totalEff += eff;
    totalProd += prod;
    totalCount++;

    if (ct > 0) {
      machineStats[mName].ctTotal += ct;
      machineStats[mName].validCTCount++;
      totalCT += ct;
      totalValidCT++;
    }
  });

  const processMetrics = Object.values(machineStats).map((s: any) => ({
    text: s.text,
    efficiency: (s.effTotal / s.count).toFixed(1) + "%",
    productivity: (s.prodTotal / s.count).toFixed(1) + "%",
    avgCycle: s.validCTCount > 0 ? (s.ctTotal / s.validCTCount).toFixed(2) : "0.00",
  }));

  // "All Machines" metric add karein
  const allMetric = {
    text: "All Machines",
    efficiency: totalCount > 0 ? (totalEff / totalCount).toFixed(1) + "%" : "0.0%",
    productivity: totalCount > 0 ? (totalProd / totalCount).toFixed(1) + "%" : "0.0%",
    avgCycle: totalValidCT > 0 ? (totalCT / totalValidCT).toFixed(2) : "0.00"
  };

  return {
    processMetrics: [allMetric, ...processMetrics], // Pehla card All Machines ka hoga
    stations: Array.from(uniqueMachines),
    employees: Array.from(new Set(data.map(i => i.employee).filter(Boolean))),
    partsCompleted: data,
    avgCycleTime: processMetrics.map((m) => ({ name: m.text, avgCycle: parseFloat(m.avgCycle) })),
  };
};


// const filteredParts = dashboardData.partsCompleted.filter(
//     (p: any) =>
//       (!selectedStation || p.machineName === selectedStation) &&
//       (!selectedEmployee || p.employee === selectedEmployee),
//   );
const filteredParts = dashboardData.partsCompleted.filter(
  (p: any) =>
    (!selectedStation || selectedStation === "All Machines" || p.machineName === selectedStation) &&
    (!selectedEmployee || p.employee === selectedEmployee),
);
  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap items-center gap-4 justify-between mb-4 bg-white p-4 rounded shadow-sm">
        <h2 className="text-xl font-bold text-gray-800">Operational Dive</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Period:</span>
          <DatePicker
            selected={startDate}
            onChange={(d) => setStartDate(d!)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            className="border p-1.5 rounded text-sm bg-gray-50"
          />
          <span className="text-gray-400">to</span>
          <DatePicker
            selected={endDate}
            onChange={(d) => setEndDate(d!)}
            dateFormat="MM/dd/yyyy"
            placeholderText="MM/DD/YYYY"
            className="border p-1.5 rounded text-sm bg-gray-50"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
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
              <h3 className="font-bold text-sm text-gray-700 truncate mb-2">
                {item.text}
              </h3>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">
                    Efficiency
                  </p>
                  <p className="text-lg font-bold text-blue-600">
                    {item.efficiency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase text-gray-400 font-semibold">
                    Productivity
                  </p>
                  <p className="text-lg font-bold text-green-600">
                    {item.productivity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="md:w-[20%] bg-white p-4 rounded shadow-sm max-h-[250px] overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">
            Machines
          </h3>
          {dashboardData.stations.map((s: string) => (
            <label
              key={s}
              className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="radio"
                name="station"
                checked={selectedStation === s}
                onChange={() => setSelectedStation(s)}
              />
              <span className="text-xs font-medium text-gray-600 truncate">
                {s}
              </span>
            </label>
          ))}
        </div> */}
<div className="md:w-[20%] bg-white p-4 rounded shadow-sm max-h-[250px] overflow-y-auto">
  <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">Machines</h3>
  <label className="flex items-center gap-2 mb-2 cursor-pointer">
    <input
      type="radio"
      name="station"
      checked={selectedStation === "" || selectedStation === "All Machines"}
      onChange={() => setSelectedStation("")}
    />
    <span className="text-xs font-medium">All Machines</span>
  </label>
  {dashboardData.stations.map((s: string) => (
    <label key={s} className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
      <input
        type="radio"
        name="station"
        checked={selectedStation === s}
        onChange={() => setSelectedStation(s)}
      />
      <span className="text-xs font-medium text-gray-600 truncate">{s}</span>
    </label>
  ))}
</div>
        <div className="md:w-[20%] bg-white p-4 rounded shadow-sm max-h-[250px] overflow-y-auto">
          <h3 className="font-bold text-gray-700 mb-3 border-b pb-1">
            Employees
          </h3>
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="employee"
              checked={selectedEmployee === ""}
              onChange={() => setSelectedEmployee("")}
            />
            <span className="text-xs font-medium">All Employees</span>
          </label>
          {dashboardData.employees.map((e: string) => (
            <label
              key={e}
              className="flex items-center gap-2 mb-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
            >
              <input
                type="radio"
                name="employee"
                checked={selectedEmployee === e}
                onChange={() => setSelectedEmployee(e)}
              />
              <span className="text-xs font-medium text-gray-600">{e}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <option key={part.part_id} value={part.part_id}>
                  {part.partNumber}
                </option>
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
                    <td className="p-2 text-xs text-blue-600 font-medium">
                      {p.machineName}
                    </td>
                    <td className="p-2 text-xs">{p.partNumber}</td>
                    <td className="p-2 text-xs text-gray-500">{p.employee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4">
            Avg Cycle Time by Machine (min)
          </h3>
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
        <h3 className="font-bold text-gray-700 mb-4 text-start ">
          Employee Performance Detail
        </h3>
        <div className="overflow-x-auto max-h-[300px]">
          <table className="w-full text-sm border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-800 text-white">
                <th className="p-2 text-left">Process (Machine)</th>
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
                  <td className="p-2 text-left">
                    {item.processName} ({item.machineName})
                  </td>
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
      <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <h3 className="font-bold text-gray-700 mb-4 text-start">
            Top Performance
          </h3>

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
                  return (
                    <tr
                      key={i}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 font-semibold text-gray-700">
                        {emp.employeeName}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex flex-col items-center">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              parseFloat(emp.totalEfficiency) >= 80
                                ? "bg-green-100 text-green-700"
                                : parseFloat(emp.totalEfficiency) >= 50
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
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
                  <td colSpan={6} className="p-10 text-center text-gray-400">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dive;
