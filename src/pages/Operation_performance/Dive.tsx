import  { useState } from "react";

import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import shape_1 from "../../assets/shape_1.png";
import shape_2 from "../../assets/shape_2.png";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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

const Dive = () => {
   const [selected, setSelected] = useState("Cut Trim");
    const handleSelect = (station: string) => {
      setSelected(station);
    };
   const [selected1, setSelected1] = useState("Jane Cooper");
    const handleSelect1 = (name: string) => {
      setSelected1(name);
    };
  return (
    <div>
      <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
        {data_1.map((item) => (
          <div className="flex justify-between items-center bg-white  rounded-md  w-60">
            {" "}
            <div className="p-2">
              {" "}
              <p className="font-bold text-2xl">{item.num}</p>
              <p>{item.text}</p>
            </div>
            <div className="relative right-0">
              <img src={item.shape} alt="" />
              <div className="absolute right-4 top-6">
                {" "}
                <img src={item.img} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex  justify-between gap-4 flex-col md:flex-row mt-4">
        <div className="md:w-[70%] grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {data_2.map((item) => (
            <div>
              <div className="bg-white p-4 rounded-md  flex flex-col justify-center gap-4 px-8">
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
        <div className="md:w-[30%] bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Station</h2>
          <div className="flex flex-col gap-3">
            {stations.map((station, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSelect(station)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center border ${
                    selected === station ? "bg-[#0F2B36] text-black" : ""
                  }`}
                >
                  {selected === station && (
                    <span className="w-3  bg-white rounded-sm"></span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    selected === station ? " text-black" : "text-gray-700"
                  }`}
                >
                  {station}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-[30%] bg-white p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-4">Full Name</h2>
          <div className="flex flex-col gap-3">
            {names.map((name, index) => (
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSelect1(name)}
              >
                <div
                  className={`w-5 h-5 flex items-center justify-center border ${
                    selected1 === name ? "bg-[#0F2B36] text-black" : ""
                  }`}
                >
                  {selected1 === name && (
                    <span className="w-3  bg-white rounded-sm"></span>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    selected1 === name ? " text-black" : "text-gray-700"
                  }`}
                >
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>


        <div className="flex flex-col md:flex-row gap-8 mt-6">
              {/* Table */}
              <div className="bg-white rounded-lg shadow-md p-4 md:w-[65%] overflow-x-auto">
                <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
                      <th className="py-2 px-4 text-left">Process Name</th>
                      <th className="py-2 px-4 text-left">Part Desc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partsData.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4 whitespace-nowrap">{item.process}</td>
                        <td className="py-2 px-4 whitespace-nowrap">{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
      
              {/* Bar Chart */}
              <div className="bg-white rounded-lg shadow-md p-4 md:w-[35%]">
                <h2 className="text-lg font-semibold mb-4">Avg Cycle Time</h2>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={cycleData}>
                    <XAxis
                      dataKey="name"
                      label={{ value: "Process", position: "bottom" }}
                    />
                    <YAxis
                      label={{
                        value: "Avg Cycle Time",
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
            <div className="mt-6">
        <OrderStatus />
      </div>
    </div>
  );
};

export default Dive;
