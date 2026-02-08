// import img1 from "../../assets/green.png";
// import img2 from "../../assets/yellow.png";
// import img3 from "../../assets/orange.png";
// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_2 from "../../assets/scrap_2.png";
// import scrap_3 from "../../assets/scrap_3.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import customer_return from "../../assets/customer_return.png";
// import supplier_return from "../../assets/supplier_return.png";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
// const data_1 = [
//   {
//     num: "$5,00,000",
//     text: "Scrap Cost",
//     img: img1,
//     scrap: scrap_1,
//     scrap_img: scrap_cost,
//     increase: "-$10k",
//     bgColor: "bg-orange-50",
//     textColor: "text-red-500",
//   },
//   // {
//   //   num: "01",
//   //   text: "Customer Return",
//   //   img: img2,
//   //   scrap: scrap_2,
//   //   scrap_img: customer_return,
//   //   increase: "+200",
//   //   bgColor: "bg-green-50",
//   //   textColor: "text-green-500",
//   // },
//   // {
//   //   num: "$5,00,000",
//   //   text: "Scrap Cost",
//   //   img: img1,
//   //   scrap: scrap_1,
//   //   scrap_img: scrap_cost,
//   //   increase: "-$10k",
//   //   bgColor: "bg-orange-50",
//   //   textColor: "text-red-500",
//   // },
//   {
//     num: "15,000",
//     text: "Supplier Return",
//     img: img3,
//     scrap: scrap_3,
//     scrap_img: supplier_return,
//     increase: "+200",
//     bgColor: "bg-blue-50",
//     textColor: "text-green-500",
//   },
// ];

// const output = [
//   { name: "Figma", "2022": 90, "2023": 30 },
//   { name: "Sketch", "2022": 40, "2023": 30 },
//   { name: "XD", "2022": 110, "2023": 20 },
//   { name: "PS", "2022": 80, "2023": 30 },
//   { name: "AI", "2022": 70, "2023": 35 },
//   { name: "coreIDR", "2022": 20, "2023": 60 },
//   { name: "InDesign", "2022": 110, "2023": 90 },
//   { name: "Canva", "2022": 150, "2023": 45 },
//   { name: "Webflow", "2022": 40, "2023": 10 },
//   { name: "Affinity", "2022": 120, "2023": 70 },
//   { name: "Marker", "2022": 170, "2023": 65 },
//   { name: "MarkFigmaer", "2022": 20, "2023": 60 },
// ];
// const costing = [{ name: "Cost", part1: 60, part2: 40 }];

// const Costing = () => {
//   return (
//     <div className="">
//       <div className="mt-6">
//         <h1 className="font-semibold text-2xl">Costing</h1>
//         <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//           {data_1.map((item) => (
//             <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
//               {" "}
//               <div className="flex items-center gap-2">
//                 <div>
//                   <img className="w-[40px]" src={item.scrap_img} alt="" />
//                 </div>
//                 <div className="">
//                   {" "}
//                   <p className="text-sm text-gray-600">{item.text}</p>
//                   <p className="font-bold text-xl">{item.num}</p>
//                 </div>
//               </div>
//               <div>
//                 <img src={item.scrap} alt="" />
//               </div>
//               <div className="text-sm text-gray-600">
//                 Increase by{" "}
//                 <span
//                   className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
//                 >
//                   {" "}
//                   {item.increase}
//                 </span>{" "}
//                 this week
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
//         <h2 className="text-lg font-medium mb-2">Costing</h2>
//         <ResponsiveContainer width="100%" height={50}>
//           <BarChart layout="vertical" width={500} height={100} data={costing}>
//             <XAxis type="number" hide />
//             <YAxis type="category" dataKey="name" hide />
//             <Bar dataKey="part1" stackId="a" fill="#052C89" />
//             <Bar dataKey="part2" stackId="a" fill="#2ECC71" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="mt-6">
//         {" "}
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <h2 className="text-lg font-medium mb-2">Output</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={output}>
//               <CartesianGrid stroke="#e0e0e0" />
//               <XAxis dataKey="name" fontSize={10} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 dataKey="2022"
//                 stroke="#ff6b6b"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//               <Line
//                 dataKey="2023"
//                 stroke="#8884d8"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Costing;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_3 from "../../assets/scrap_3.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import supplier_return from "../../assets/supplier_return.png";

// const Costing = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [costingData, setCostingData] = useState([]);
//   const [monthlyCOGS, setMonthlyCOGS] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8080/api/admin/costing-data"
//         );
//         const data = res.data;

//         // ----- CARDS DATA -----
//         setCardsData([
//           {
//             num: "$" + (data.scrapCost || 0).toLocaleString(),
//             text: "Scrap Cost",
//             scrap_img: scrap_cost,
//             scrap: scrap_1,
//             increase: data.scrapIncrease || "-$0",
//             bgColor: "bg-orange-50",
//             textColor: "text-red-500",
//           },
//           {
//             num: (data.supplierReturn || 0).toLocaleString(),
//             text: "Supplier Return",
//             scrap_img: supplier_return,
//             scrap: scrap_3,
//             increase: data.supplierReturnIncrease || "+0",
//             bgColor: "bg-blue-50",
//             textColor: "text-green-500",
//           },
//         ]);

//         // ----- VERTICAL BAR CHART -----
//         setCostingData([
//           {
//             name: "Cost",
//             part1: data.part1Cost || 0,
//             part2: data.part2Cost || 0,
//           },
//         ]);

//         // ----- MONTHLY COGS LINE CHART -----
//         const allMonths = [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ];

//         const cogs = data.monthlyCOGS || {};

//         // Convert API object to array for line chart
//         const chartData = allMonths.map((month, index) => {
//           const monthKey = `2025-${String(index + 1).padStart(2, "0")}`;
//           return { name: month, value: cogs[monthKey] || 0 };
//         });

//         setMonthlyCOGS(chartData);
//       } catch (error) {
//         console.error("Error fetching COGS:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="">
//       {/* Cards */}
//       <div className="mt-6">
//         <h1 className="font-semibold text-2xl">Costing</h1>
//         <div className="flex flex-col md:flex-row mt-2 gap-4">
//           {cardsData.map((item) => (
//             <div
//               key={item.text}
//               className={`flex flex-col justify-between bg-white rounded-md w-full p-2 gap-2 border ${item.bgColor}`}
//             >
//               <div className="flex items-center gap-2">
//                 <img className="w-[40px]" src={item.scrap_img} alt="" />
//                 <div>
//                   <p className="text-sm text-gray-600">{item.text}</p>
//                   <p className="font-bold text-xl">{item.num}</p>
//                 </div>
//               </div>
//               <div>
//                 <img src={item.scrap} alt="" />
//               </div>
//               <div className="text-sm text-gray-600">
//                 Increase by{" "}
//                 <span
//                   className={`font-semibold rounded-md text-xs ${item.textColor}`}
//                 >
//                   {item.increase}
//                 </span>{" "}
//                 this week
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Vertical Bar Chart */}
//       <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
//         <h2 className="text-lg font-medium mb-2">Costing</h2>
//         <ResponsiveContainer width="100%" height={50}>
//           <BarChart
//             layout="vertical"
//             width={500}
//             height={100}
//             data={costingData}
//           >
//             <XAxis type="number" hide />
//             <YAxis type="category" dataKey="name" hide />
//             <Bar dataKey="part1" stackId="a" fill="#052C89" />
//             <Bar dataKey="part2" stackId="a" fill="#2ECC71" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Monthly COGS Line Chart */}
//       <div className="mt-6">
//         <div className="bg-white shadow-md rounded-2xl p-4">
//           <h2 className="text-lg font-medium mb-2">Monthly COGS</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyCOGS}>
//               <CartesianGrid stroke="#e0e0e0" />
//               <XAxis dataKey="name" fontSize={10} />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 dataKey="value"
//                 stroke="#8884d8"
//                 strokeWidth={2}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Costing;

// import { useState, useEffect } from "react";
// import axios from "axios";
// import img1 from "../../assets/green.png";
// import img3 from "../../assets/orange.png";
// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_3 from "../../assets/scrap_3.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import supplier_return from "../../assets/supplier_return.png";
// import {
//   BarChart,
//   Bar,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   LineChart,
//   Line,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import DatePicker from "react-datepicker";

// const formatDollar = (value) => `$${value.toLocaleString()}`;

// const Costing = () => {
//   const [cardsData, setCardsData] = useState([]);
//   const [costingData, setCostingData] = useState([]);
//   const [monthlyCOGS, setMonthlyCOGS] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   // Generate list of years dynamically
//   const years = Array.from(
//     { length: new Date().getFullYear() - 2020 + 1 },
//     (_, i) => 2020 + i
//   );
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/costing-data?year=${selectedYear}`
//         );
//         const data = res.data;

//         // Cards
//         setCardsData([
//           {
//             num: formatDollar(data.totalYearCost || 0),
//             text: "Total Year Cost",
//             scrap_img: scrap_cost,
//             scrap: scrap_1,
//             textColor: "text-red-500",
//           },
//           {
//             num: formatDollar(data.supplierReturn || 0),
//             text: "Supplier Return",
//             scrap_img: supplier_return,
//             scrap: scrap_3,

//             textColor: "text-green-500",
//           },
//         ]);

//         // Vertical Bar Chart
//         setCostingData([
//           {
//             name: "Cost",
//             part1: data.part1Cost || 0,
//             part2: data.part2Cost || 0,
//           },
//         ]);

//         // Monthly COGS Line Chart
//         const months = [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "Nov",
//           "Dec",
//         ];
//         const cogs = data.monthlyCOGS || {};
//         const chartData = months.map((month, index) => {
//           const key = `${selectedYear}-${String(index + 1).padStart(2, "0")}`;
//           return { name: month, value: cogs[key] || 0 };
//         });
//         setMonthlyCOGS(chartData);
//       } catch (error) {
//         console.error("Error fetching COGS:", error);
//       }
//     };

//     fetchData();
//   }, [selectedYear]);

//   console.log("costingDatacostingData", costingData);

//   return (
//     <div className="p-4">
//       {/* Year Selector */}
//       <div className="flex items-center gap-2 mb-4">
//         <label className="text-sm font-medium">Select Year:</label>
//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(Number(e.target.value))}
//           className="border rounded-md p-1 text-sm"
//         >
//           {years.map((year) => (
//             <option key={year} value={year}>
//               {year}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Cards */}
//       <div className="mt-6">
//         <h1 className="font-semibold text-2xl mb-2">Costing</h1>
//         <div className="flex flex-col md:flex-row gap-4">
//           {cardsData.map((item) => (
//             <div
//               key={item.text}
//               className={`flex flex-col justify-between bg-white rounded-md w-full p-2 gap-2 border ${item.bgColor}`}
//             >
//               <div className="flex items-center gap-2">
//                 <img className="w-[40px]" src={item.scrap_img} alt="" />
//                 <div>
//                   <p className="text-sm text-gray-600">{item.text}</p>
//                   <p className="font-bold text-xl">{item.num}</p>
//                 </div>
//               </div>
//               {/* <div>
//                 <img src={item.scrap} alt="" />
//               </div>
//               <div className="text-sm text-gray-600">
//                 Increase by{" "}
//                 <span
//                   className={`font-semibold rounded-md text-xs ${item.textColor}`}
//                 >
//                   {item.increase}
//                 </span>{" "}
//                 this year
//               </div> */}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Vertical Bar Chart */}
//       {/* <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
//         <h2 className="text-lg font-medium mb-2">Cost Breakdown</h2>
//         <ResponsiveContainer width="100%" height={50}>
//           <BarChart layout="vertical" data={costingData}>
//             <XAxis type="number" hide />
//             <YAxis type="category" dataKey="name" hide />
//             <Bar dataKey="part1" stackId="a" fill="#052C89" />
//             <Bar dataKey="part2" stackId="a" fill="#2ECC71" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div> */}

//       {/* Monthly COGS Line Chart */}
//       <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
//         <h2 className="text-lg font-medium mb-2">Monthly COGS</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={monthlyCOGS}>
//             <CartesianGrid stroke="#e0e0e0" />
//             <XAxis dataKey="name" fontSize={10} />
//             <YAxis />
//             <Tooltip formatter={(value) => formatDollar(value)} />
//             <Legend />
//             <Line
//               dataKey="value"
//               stroke="#8884d8"
//               strokeWidth={2}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Costing;

import { useState, useEffect } from "react";
import axios from "axios";
import scrap_cost from "../../assets/scrap_cost.png";
import supplier_return from "../../assets/supplier_return.png";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const getTodayDate = () => {
  return new Date().toLocaleDateString("en-CA");
};

const formatDollar = (value) => `$${Number(value).toLocaleString()}`;

const Costing = () => {
  const [cardsData, setCardsData] = useState([]);
  const [monthlyCOGS, setMonthlyCOGS] = useState([]);

  // 1. Start and End Date states with Today as default
  const [startDate, setStartDate] = useState(getTodayDate());
  const [endDate, setEndDate] = useState(getTodayDate());

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 2. API call with startDate and endDate
        const res = await axios.get(`${BASE_URL}/api/admin/costing-data`, {
          params: { startDate, endDate },
        });
        const data = res.data;

        // Cards logic
        setCardsData([
          {
            num: formatDollar(data.totalYearCost || 0),
            text: "Total COGS",
            scrap_img: scrap_cost,
            textColor: "text-red-500",
          },
          {
            num: formatDollar(data.supplierReturn || 0),
            text: "Supplier Return",
            scrap_img: supplier_return,
            textColor: "text-green-500",
          },
          {
            num: formatDollar(data.scrapCost || 0),
            text: "Total Scrap Cost",
            scrap_img: scrap_cost,
            textColor: "text-orange-500",
          },
        ]);

        // Monthly COGS Line Chart Logic
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const cogs = data.monthlyCOGS || {};

        // Agar single year hai toh months dikhayenge, varna keys dikhayenge
        const chartData = months.map((month, index) => {
          const monthNum = String(index + 1).padStart(2, "0");
          // Current year ya selected range ka year check karne ke liye logic
          const yearKey = startDate.split("-")[0];
          const key = `${yearKey}-${monthNum}`;
          return { name: month, value: cogs[key] || 0 };
        });

        setMonthlyCOGS(chartData);
      } catch (error) {
        console.error("Error fetching costing data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Jab bhi dates badlengi, data refresh hoga

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="font-semibold text-2xl text-gray-800">
          Costing Analysis
        </h1>

        {/* --- Date Picker UI --- */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">
              From
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-sm outline-none bg-transparent cursor-pointer"
            />
          </div>
          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
          <div className="flex flex-col px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">
              To
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-sm outline-none bg-transparent cursor-pointer"
            />
          </div>
          {(startDate !== getTodayDate() || endDate !== getTodayDate()) && (
            <button
              onClick={() => {
                setStartDate(getTodayDate());
                setEndDate(getTodayDate());
              }}
              className="ml-2 text-xs text-blue-500 font-semibold hover:underline"
            >
              Today
            </button>
          )}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {cardsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white rounded-xl w-full p-5 shadow-sm border border-gray-100"
          >
            <div className="p-3 bg-blue-50 rounded-lg">
              <img
                className="w-8 h-8 object-contain"
                src={item.scrap_img}
                alt=""
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.text}</p>
              <p className="font-bold text-2xl text-gray-800">{item.num}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly COGS Line Chart */}
      <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-700">
            Monthly COGS Trend
          </h2>
          <p className="text-xs text-gray-400">
            Values based on {startDate.split("-")[0]}
          </p>
        </div>
        {/* <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyCOGS}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={{ fill: "#9CA3AF" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [formatDollar(value), "COGS"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Line
                name="Monthly COGS"
                type="monotone"
                dataKey="value"
                stroke="#052C89"
                strokeWidth={3}
                dot={{ r: 4, fill: "#052C89", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyCOGS}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={{ fill: "#9CA3AF" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={{ fill: "#9CA3AF" }}
                // Yahan value ko seedha $ ke saath dikhayenge
                tickFormatter={(value) => `$${value}`}
                width={60} // Taki bade numbers cut na ho
              />
              <Tooltip
                // formatDollar function ka use karein jo aapne pehle define kiya hai
                formatter={(value) => [formatDollar(value), "COGS"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Line
                name="Monthly COGS"
                type="monotone"
                dataKey="value"
                stroke="#052C89"
                strokeWidth={3}
                dot={{ r: 4, fill: "#052C89", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Costing;
