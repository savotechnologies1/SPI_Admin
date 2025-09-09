// import img1 from "../../assets/green.png";
// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
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
// ];

// const costing = [{ name: "Cost", part1: 60, part2: 40 }];

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

// const FixedCost = () => {
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-2">Fixed Cost</h2>

//       <div className="flex gap-4 w-full">
//         <div className="mt-4">
//           <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//             {data_1.map((item) => (
//               <div className="flex flex-col justify-between  bg-white w-[200px]  rounded-md  p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
//                 {" "}
//                 <div className="flex items-center gap-2">
//                   <div>
//                     <img className="w-[40px]" src={item.scrap_img} alt="" />
//                   </div>
//                   <div className="">
//                     {" "}
//                     <p className="text-sm text-gray-600">{item.text}</p>
//                     <p className="font-bold text-xl">{item.num}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <img src={item.scrap} alt="" />
//                 </div>
//                 <div className="text-sm text-gray-600">
//                   Increase by{" "}
//                   <span
//                     className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
//                   >
//                     {" "}
//                     {item.increase}
//                   </span>{" "}
//                   this week
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="bg-white shadow-md rounded-2xl p-4 mt-6 w-full">
//           <div className="flex justify-between mb-6">
//             <h1 className="fonr-semibold">Fixed Cost</h1>
//             <div>cost</div>
//           </div>
//           <ResponsiveContainer width="100%" height={50}>
//             <BarChart layout="vertical" width={500} height={20} data={costing}>
//               <XAxis type="number" hide />
//               <YAxis type="category" dataKey="name" hide />
//               <Bar dataKey="part1" stackId="a" fill="#052C89" />
//               <Bar dataKey="part2" stackId="a" fill="#2ECC71" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
//         <h2 className="text-lg font-semibold mb-2">Cost vs Revenue</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             width={500}
//             height={300}
//             margin={{
//               top: 20,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//             data={output}
//           >
//             <CartesianGrid stroke="#e0e0e0" />
//             <XAxis dataKey="name" fontSize={10} />
//             <YAxis
//               label={{
//                 value: "Cost",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//             />
//             <Tooltip />
//             <Bar dataKey="2022" fill="#D64550" stackId="a" barSize={40} />
//             <Bar dataKey="2023" fill="#E68F96" stackId="a" barSize={40} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default FixedCost;

import { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/green.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_cost from "../../assets/scrap_cost.png";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const formatDollar = (value) => `$${value.toLocaleString()}`;
const allMonths = [
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

const transformMonthlyData = (monthlyCompleted, monthlyScrap, year) => {
  return allMonths.map((month, index) => {
    const monthKey = `${year}-${String(index + 1).padStart(2, "0")}`;
    return {
      name: month,
      Revenue: monthlyCompleted[monthKey] || 0,
      ScrapCost: monthlyScrap[monthKey] || 0,
    };
  });
};

const FixedCost = () => {
  const [cardsData, setCardsData] = useState([]);
  const [costingData, setCostingData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchCosting = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/fixed-cost-data?year=${selectedYear}`
        );
        const data = res.data;
        const transformed = transformMonthlyData(
          data.monthlyCompleted,
          data.monthlyScrap,
          year
        );
        setMonthlyData(transformed);
        setCardsData([
          {
            num: formatDollar(data.totalYearScrap || 0),
            text: "Scrap Cost",
            scrap_img: scrap_cost,
            scrap: scrap_1,
            increase: formatDollar(data.scrapIncrease || 0),
            bgColor: "bg-orange-50",
            textColor: "text-red-500",
          },
          {
            num: formatDollar(data.totalYearCompleted || 0),
            text: "Completed Cost",
            scrap_img: img1,
            scrap: img1,
            increase: formatDollar(data.totalYearCost || 0), // or any % increase
            bgColor: "bg-blue-50",
            textColor: "text-green-500",
          },
        ]);

        // Vertical bar chart
        setCostingData([
          {
            name: "Cost",
            part1: data.scrapCost || 0,
            part2: data.totalYearCost || 0,
          },
        ]);
      } catch (error) {
        console.error("Error fetching FixedCost:", error);
      }
    };

    fetchCosting();
  }, [selectedYear]);

  // Years dropdown
  const years = [];
  for (let i = 2020; i <= new Date().getFullYear(); i++) years.push(i);

  return (
    <div>
      {/* Year Selector */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm font-medium">Select Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border rounded-md p-1 text-sm"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row mt-2 gap-4">
        {cardsData.map((item) => (
          <div
            key={item.text}
            className={`flex flex-col justify-between bg-white w-[200px] rounded-md p-2 gap-2 border ${item.bgColor}`}
          >
            <div className="flex items-center gap-2">
              <img className="w-[40px]" src={item.scrap_img} alt="" />
              <div>
                <p className="text-sm text-gray-600">{item.text}</p>
                <p className="font-bold text-xl">{item.num}</p>
              </div>
            </div>
            {/* <div>
              <img src={item.scrap} alt="" />
            </div>
            <div className="text-sm text-gray-600">
              Increase by{" "}
              <span
                className={`font-semibold rounded-md text-xs ${item.textColor}`}
              >
                {item.increase}
              </span>{" "}
              this year
            </div> */}
          </div>
        ))}
      </div>

      {/* Vertical Bar Chart */}
      <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
        <h2 className="text-lg font-medium mb-2">Fixed Cost</h2>

        <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Cost vs Revenue ({year})
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="Revenue" fill="#052C89" barSize={30} />
              <Bar dataKey="ScrapCost" fill="#2ECC71" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FixedCost;

// RevenueTables.tsx
// import React from "react";

// type Order = {
//   orderDate: string;
//   product: string;
//   qty: number;
//   salesRevenue: number;
//   deliveryDate?: string;
//   shippedDate?: string;
// };

// type RevenueTablesProps = {
//   stockOrders: Order[];
//   customOrders: Order[];
//   fulfilledOrders: Order[];
// };

// const FixedCost: React.FC<RevenueTablesProps> = ({}) => {
//   const stockOrders = [
//     {
//       orderDate: "2025-09-01",
//       product: "Aloo Paratha",
//       qty: 10,
//       salesRevenue: 1000,
//       deliveryDate: "2025-09-05",
//     },
//   ];

//   const customOrders = [
//     {
//       orderDate: "2025-09-02",
//       product: "Paneer Paratha",
//       qty: 5,
//       salesRevenue: 500,
//       deliveryDate: "2025-09-06",
//     },
//   ];

//   const fulfilledOrders = [
//     {
//       orderDate: "2025-09-01",
//       product: "Aloo Paratha",
//       qty: 10,
//       salesRevenue: 1000,
//       shippedDate: "2025-09-05",
//     },
//   ];
//   const totalStockRevenue = stockOrders?.reduce(
//     (sum, o) => sum + o.salesRevenue,
//     0
//   );
//   const totalCustomRevenue = customOrders?.reduce(
//     (sum, o) => sum + o.salesRevenue,
//     0
//   );
//   const totalRevenue = totalStockRevenue + totalCustomRevenue;

//   return (
//     <div className="space-y-10 p-4">
//       {/* Stock Orders Table */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Stock Orders Summary</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2 text-left">Order Date</th>
//                 <th className="border px-3 py-2 text-left">Product</th>
//                 <th className="border px-3 py-2 text-right">Qty</th>
//                 <th className="border px-3 py-2 text-right">Sales Revenue</th>
//                 <th className="border px-3 py-2 text-left">Delivery Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stockOrders.map((order, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border px-3 py-2">{order.orderDate}</td>
//                   <td className="border px-3 py-2">{order.product}</td>
//                   <td className="border px-3 py-2 text-right">{order.qty}</td>
//                   <td className="border px-3 py-2 text-right">
//                     {order.salesRevenue.toLocaleString()}
//                   </td>
//                   <td className="border px-3 py-2">{order.deliveryDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="bg-gray-100 font-semibold">
//               <tr>
//                 <td className="border px-3 py-2" colSpan={3}>
//                   Total
//                 </td>
//                 <td className="border px-3 py-2 text-right">
//                   {totalStockRevenue.toLocaleString()}
//                 </td>
//                 <td className="border px-3 py-2"></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>

//       {/* Custom Orders Table */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Custom Orders Summary</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2 text-left">Order Date</th>
//                 <th className="border px-3 py-2 text-left">Product</th>
//                 <th className="border px-3 py-2 text-right">Qty</th>
//                 <th className="border px-3 py-2 text-right">Sales Revenue</th>
//                 <th className="border px-3 py-2 text-left">Delivery Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customOrders.map((order, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border px-3 py-2">{order.orderDate}</td>
//                   <td className="border px-3 py-2">{order.product}</td>
//                   <td className="border px-3 py-2 text-right">{order.qty}</td>
//                   <td className="border px-3 py-2 text-right">
//                     {order.salesRevenue.toLocaleString()}
//                   </td>
//                   <td className="border px-3 py-2">{order.deliveryDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="bg-gray-100 font-semibold">
//               <tr>
//                 <td className="border px-3 py-2" colSpan={3}>
//                   Total
//                 </td>
//                 <td className="border px-3 py-2 text-right">
//                   {totalCustomRevenue.toLocaleString()}
//                 </td>
//                 <td className="border px-3 py-2"></td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>

//       {/* Total Revenue */}
//       <div className="p-4 bg-blue-50 rounded-lg text-lg font-semibold">
//         Total Revenue (Stock + Custom):{" "}
//         <span className="text-blue-800">{totalRevenue.toLocaleString()}</span>
//       </div>

//       {/* Fulfilled Orders Table */}
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Fulfilled Orders</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300 text-sm">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border px-3 py-2 text-left">Order Date</th>
//                 <th className="border px-3 py-2 text-left">Product</th>
//                 <th className="border px-3 py-2 text-right">Qty</th>
//                 <th className="border px-3 py-2 text-right">Sales Revenue</th>
//                 <th className="border px-3 py-2 text-left">Shipped Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {fulfilledOrders.map((order, idx) => (
//                 <tr key={idx} className="hover:bg-gray-50">
//                   <td className="border px-3 py-2">{order.orderDate}</td>
//                   <td className="border px-3 py-2">{order.product}</td>
//                   <td className="border px-3 py-2 text-right">{order.qty}</td>
//                   <td className="border px-3 py-2 text-right">
//                     {order.salesRevenue.toLocaleString()}
//                   </td>
//                   <td className="border px-3 py-2">{order.shippedDate}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FixedCost;
