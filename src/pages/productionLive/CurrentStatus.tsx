// import { useState } from "react";
// import img2 from "../../assets/green.png";
// import img3 from "../../assets/orange.png";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import OrderStatus from "../dashboard/OrderStatus";
// import shape_2 from "../../assets/shape_2.png";
// import shape_3 from "../../assets/shape_3.png";

// const stations = [
//   "Cut Trim",
//   "Inspection",
//   "Kitting",
//   "Packaging And Shipping",
//   "Sanding",
//   "Thermoforming 1",
//   "Thermoforming 2",
//   "Thermoforming 3",
// ];

// const data_1 = [
//   {
//     num: "129",
//     text: "Actual",
//     img: img2,
//     shape: shape_2,
//   },
//   {
//     num: "1",
//     text: "Scrap",
//     img: img3,
//     shape: shape_3,
//   },
// ];

// const data_2 = [
//   {
//     text: "Thermoforming",
//     efficiency: "NAN",
//     productivity: "0.0%",
//   },
//   {
//     text: "Thermoforming",
//     efficiency: "NAN",
//     productivity: "0.0%",
//   },
//   {
//     text: "Thermoforming",
//     efficiency: "NAN",
//     productivity: "0.0%",
//   },
//   {
//     text: "Thermoforming",
//     efficiency: "NAN",
//     productivity: "0.0%",
//   },
// ];
// const partsData = [
//   { process: "Cut Trim", desc: "(t) Pass GMT800 Single" },
//   { process: "Cut Trim", desc: "(t) Pass GMT800 Ext" },
//   { process: "Cut Trim", desc: "(t) Pass GMT800 Crew" },
//   { process: "Cut Trim", desc: "(t) Pass 09-14 F-150 er" },
//   { process: "Cut Trim", desc: "(t) Pass 09-14 F-150 Crew" },
//   { process: "Cut Trim", desc: "(t) Pass 09-14 Ram Quad" },
//   { process: "Cut Trim", desc: "(t) Driven GMT800 Single" },
// ];

// const cycleData = [{ name: "Cut Trim", avgCycle: 20 }];

// const CurrentStatus = () => {
//   const [selected, setSelected] = useState("Cut Trim");
//   const handleSelect = (station: string) => {
//     setSelected(station);
//   };
//   return (
//     <div className="p-6 space-y-8">
//       <div className="flex justify-between gap-4 flex-col md:flex-row">
//         <div className="flex flex-col justify-between">
//           <h1 className="text-2xl font-bold ">
//             Current status of Each process
//           </h1>
//           <h1 className="font-semibold text-base">Deep Dive</h1>
//         </div>

//         <div>
//           <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//             {data_1.map((item) => (
//               <div className="flex justify-between items-center bg-white  rounded-md  w-36">
//                 <div className="p-2">
//                   <p className="font-bold text-2xl">{item.num}</p>
//                   <p>{item.text}</p>
//                 </div>
//                 <div className="relative right-0">
//                   <img className="w-14" src={item.shape} alt="" />
//                   <div className="absolute right-2 top-4">
//                     <img src={item.img} alt="" />
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-between gap-4 flex-col md:flex-row">
//         <div className="w-[70%] grid grid-cols-2 gap-4 ">
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
//         <div className="w-[30%] bg-white p-4 rounded-md">
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
//       </div>

//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="bg-white rounded-lg shadow-md p-4 md:w-[65%]">
//           <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
//           <table className="w-full">
//             <thead>
//               <tr className="bg-gray-100 text-gray-600 text-sm">
//                 <th className="py-2 px-4 text-left">Process Name</th>
//                 <th className="py-2 px-4 text-left">Part Desc</th>
//               </tr>
//             </thead>
//             <tbody>
//               {partsData.map((item, index) => (
//                 <tr key={index} className="border-b">
//                   <td className="py-2 px-4">{item.process}</td>
//                   <td className="py-2 px-4">{item.desc}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <div className="bg-white rounded-lg shadow-md p-4 w-[35%]">
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

//       {/* <div className="">
//         <OrderStatus />
//       </div> */}
//     </div>
//   );
// };

// export default CurrentStatus;

import { useState, useEffect } from "react";
import axios from "axios";
import img2 from "../../assets/green.png";
import img3 from "../../assets/orange.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";

const CurrentStatus = () => {
  const [selected, setSelected] = useState<string>("");
  const [processData, setProcessData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // helper: convert "5 min", "30 sec", "1 hr" → minutes
  const parseCycleTime = (cycleTime: string) => {
    if (!cycleTime) return null;
    const [val, unit] = cycleTime.split(" ");
    const num = parseFloat(val);
    if (unit.startsWith("sec")) return num / 60; // sec → min
    if (unit.startsWith("min")) return num; // already min
    if (unit.startsWith("hr")) return num * 60; // hr → min
    return null;
  };

  // aggregate data (avoid duplicates)
  const aggregateData = (data: any[]) => {
    const map = new Map();

    data.forEach((item) => {
      if (!map.has(item.processName)) {
        map.set(item.processName, {
          processName: item.processName,
          scheduled: 0,
          actual: 0,
          scrap: 0,
          remaining: 0,
          avgCycleTime: item.avgCycleTime,
          parts: [],
        });
      }
      const entry = map.get(item.processName);

      entry.scheduled += item.scheduled || 0;
      entry.actual += item.actual || 0;
      entry.scrap += item.scrap || 0;
      entry.parts.push({ process: item.processName, desc: item.partId });
    });

    // calculate derived fields
    return Array.from(map.values()).map((entry) => {
      const minutes = parseCycleTime(entry.avgCycleTime);
      const targetPerHour =
        minutes && minutes > 0 ? Math.round(60 / minutes) : 0;

      const remaining = Math.max(entry.scheduled - entry.actual, 0);

      const efficiency = targetPerHour
        ? ((entry.actual / targetPerHour) * 100).toFixed(1) + "%"
        : "0%";

      const productivity = entry.scheduled
        ? ((entry.actual / entry.scheduled) * 100).toFixed(1) + "%"
        : "0%";

      return {
        ...entry,
        targetPerHour,
        remaining,
        efficiency,
        productivity,
      };
    });
  };

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/current-status-overview`
        );
        const transformed = aggregateData(res.data);
        setProcessData(transformed);
        if (transformed.length > 0) setSelected(transformed[0].processName);
      } catch (err) {
        console.error("Error fetching process data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (station: string) => {
    setSelected(station);
  };

  // Filter current process data
  const currentProcess = processData.find((p) => p.processName === selected);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div>
          <h1 className="text-2xl font-bold">Current Status of Each Process</h1>
          <p className="font-semibold text-base text-gray-600">Deep Dive</p>
        </div>
      </div>

      {/* Top Stats: Actual & Scrap */}
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex-1 flex justify-between items-center bg-white rounded-md shadow p-4">
          <div>
            <p className="font-bold text-3xl">{currentProcess?.actual || 0}</p>
            <p className="text-gray-600">Actual</p>
          </div>
          <div className="relative">
            <img className="w-16" src={shape_2} alt="" />
            <div className="absolute right-2 top-4">
              <img src={img2} alt="" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-between items-center bg-white rounded-md shadow p-4">
          <div>
            <p className="font-bold text-3xl">{currentProcess?.scrap || 0}</p>
            <p className="text-gray-600">Scrap</p>
          </div>
          <div className="relative">
            <img className="w-16" src={shape_3} alt="" />
            <div className="absolute right-2 top-4">
              <img src={img3} alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* Efficiency & Productivity + Station List */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-md shadow flex flex-col gap-6">
          <h2 className="text-center font-semibold text-lg">{selected}</h2>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-bold text-xl">
                {currentProcess?.efficiency || "0%"}
              </p>
              <p className="text-gray-600 text-sm">Efficiency</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">
                {currentProcess?.productivity || "0%"}
              </p>
              <p className="text-gray-600 text-sm">Productivity</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4">Stations</h2>
          <div className="flex flex-col gap-3">
            {processData.map((p, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 cursor-pointer p-2 rounded ${
                  selected === p.processName
                    ? "bg-[#0F2B36] text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(p.processName)}
              >
                <span className="text-sm">{p.processName}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parts Completed + Avg Cycle Time */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="py-2 px-4 text-left">Process Name</th>
                <th className="py-2 px-4 text-left">Part ID</th>
              </tr>
            </thead>
            <tbody>
              {currentProcess?.parts?.map((item: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{item.process}</td>
                  <td className="py-2 px-4">{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Avg Cycle Time</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  name: selected,
                  avgCycle: parseCycleTime(currentProcess?.avgCycleTime) || 0,
                },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis
                label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="avgCycle" fill="#4664C2" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CurrentStatus;
