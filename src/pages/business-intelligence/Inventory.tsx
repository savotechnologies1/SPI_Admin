// // import img1 from "../../assets/green.png";
// // import img2 from "../../assets/yellow.png";
// // import img3 from "../../assets/orange.png";
// // import scrap_1 from "../../assets/scrap_1.png";
// // import scrap_2 from "../../assets/scrap_2.png";
// // import scrap_3 from "../../assets/scrap_3.png";
// // import scrap_cost from "../../assets/scrap_cost.png";
// // import customer_return from "../../assets/customer_return.png";
// // import supplier_return from "../../assets/supplier_return.png";
// // import img4 from "../../assets/green.png";
// // import img5 from "../../assets/yellow.png";
// // import img6 from "../../assets/orange.png";
// // import shape_1 from "../../assets/shape_1.png";
// // import shape_2 from "../../assets/shape_2.png";
// // import shape_3 from "../../assets/shape_3.png";
// // import {
// //   CartesianGrid,
// //   Legend,
// //   Line,
// //   LineChart,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";
// // const data_1 = [
// //   {
// //     num: "$5,00,000",
// //     text: "Scrap Cost",
// //     img: img1,
// //     scrap: scrap_1,
// //     scrap_img: scrap_cost,
// //     increase: "-$10k",
// //     bgColor: "bg-orange-50",
// //     textColor: "text-red-500",
// //   },
// //   {
// //     num: "01",
// //     text: "Customer Return",
// //     img: img2,
// //     scrap: scrap_2,
// //     scrap_img: customer_return,
// //     increase: "+200",
// //     bgColor: "bg-green-50",
// //     textColor: "text-green-500",
// //   },

// //   {
// //     num: "15,000",
// //     text: "Supplier Return",
// //     img: img3,
// //     scrap: scrap_3,
// //     scrap_img: supplier_return,
// //     increase: "+200",
// //     bgColor: "bg-blue-50",
// //     textColor: "text-green-500",
// //   },
// // ];

// // const output = [
// //   { name: "Figma", "2022": 90, "2023": 30 },
// //   { name: "Sketch", "2022": 40, "2023": 30 },
// //   { name: "XD", "2022": 110, "2023": 20 },
// //   { name: "PS", "2022": 80, "2023": 30 },
// //   { name: "AI", "2022": 70, "2023": 35 },
// //   { name: "coreIDR", "2022": 20, "2023": 60 },
// //   { name: "InDesign", "2022": 110, "2023": 90 },
// //   { name: "Canva", "2022": 150, "2023": 45 },
// //   { name: "Webflow", "2022": 40, "2023": 10 },
// //   { name: "Affinity", "2022": 120, "2023": 70 },
// //   { name: "Marker", "2022": 170, "2023": 65 },
// //   { name: "MarkFigmaer", "2022": 20, "2023": 60 },
// // ];

// // const forming = [
// //   { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
// //   { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
// //   { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
// //   { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
// //   { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
// // ];

// // const partsData = [
// //   { partNumber: "30024T", timeToDeliver: "0.00", qtyAvailable: "02" },
// //   { partNumber: "30025T", timeToDeliver: "1.25", qtyAvailable: "05" },
// //   { partNumber: "30026T", timeToDeliver: "0.50", qtyAvailable: "10" },
// //   { partNumber: "30027T", timeToDeliver: "2.00", qtyAvailable: "00" },
// //   { partNumber: "30028T", timeToDeliver: "0.75", qtyAvailable: "07" },
// //   { partNumber: "30029T", timeToDeliver: "3.00", qtyAvailable: "01" },
// //   { partNumber: "30030T", timeToDeliver: "0.20", qtyAvailable: "04" },
// //   { partNumber: "30031T", timeToDeliver: "1.10", qtyAvailable: "06" },
// // ];
// // const data_2 = [
// //   {
// //     num: "1",
// //     text: "shift",
// //     img: img4,
// //     shape: shape_1,
// //   },
// //   {
// //     num: "129",
// //     text: "Actual",
// //     img: img5,
// //     shape: shape_2,
// //   },
// //   {
// //     num: "1",
// //     text: "Scrap",
// //     img: img6,
// //     shape: shape_3,
// //   },
// //   {
// //     num: "129",
// //     text: "Actual",
// //     img: img5,
// //     shape: shape_2,
// //   },
// // ];

// // const Inventory = () => {
// //   return (
// //     <div className="">
// //       <div className="mt-6">
// //         <h1 className="font-semibold text-2xl">Inventory</h1>
// //         <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
// //           {data_1.map((item) => (
// //             <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
// //               {" "}
// //               <div className="flex items-center gap-2">
// //                 <div>
// //                   <img className="w-[40px]" src={item.scrap_img} alt="" />
// //                 </div>
// //                 <div className="">
// //                   {" "}
// //                   <p className="text-sm text-gray-600">{item.text}</p>
// //                   <p className="font-bold text-xl">{item.num}</p>
// //                 </div>
// //               </div>
// //               <div>
// //                 <img src={item.scrap} alt="" />
// //               </div>
// //               <div className="text-sm text-gray-600">
// //                 Increase by{" "}
// //                 <span
// //                   className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
// //                 >
// //                   {" "}
// //                   {item.increase}
// //                 </span>{" "}
// //                 this week
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex flex-col md:flex-row  mt-6 gap-4  ">
// //         {data_2.map((item) => (
// //           <div className="flex justify-between items-center bg-white  rounded-md w-full">
// //             {" "}
// //             <div className="p-2">
// //               {" "}
// //               <p className="font-bold text-2xl">{item.num}</p>
// //               <p>{item.text}</p>
// //             </div>
// //             <div className="relative right-0">
// //               <img src={item.shape} alt="" />
// //               <div className="absolute right-4 top-6">
// //                 {" "}
// //                 <img src={item.img} alt="" />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-6">
// //         {" "}
// //         <div className="bg-white shadow-md rounded-2xl p-4">
// //           <h2 className="text-lg font-medium mb-2">Inventory Trans.</h2>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={output}>
// //               <CartesianGrid stroke="#e0e0e0" />
// //               <XAxis dataKey="name" fontSize={10} />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 dataKey="2022"
// //                 stroke="#ff6b6b"
// //                 strokeWidth={2}
// //                 dot={{ r: 4 }}
// //               />
// //               <Line
// //                 dataKey="2023"
// //                 stroke="#8884d8"
// //                 strokeWidth={2}
// //                 dot={{ r: 4 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //         <div className="mt-5">
// //           {/* <div className="bg-white shadow-md rounded-2xl p-4">
// //             <h2 className="text-lg font-medium mb-2"> Inventory Trans.</h2>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={forming}>
// //                 <CartesianGrid stroke="#e0e0e0" />
// //                 <XAxis dataKey="name" fontSize={10} />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line
// //                   type="bumpX"
// //                   dataKey="2022"
// //                   stroke="#8884d8"
// //                   strokeWidth={2}
// //                   dot={{ r: 4 }}
// //                 />
// //                 <Line
// //                   type="bumpX"
// //                   dataKey="2023"
// //                   stroke="#ff6b6b"
// //                   strokeWidth={2}
// //                   dot={{ r: 4 }}
// //                 />
// //                 <Line
// //                   type="bumpX"
// //                   dataKey="2024"
// //                   stroke="#00bcd4"
// //                   strokeWidth={2}
// //                   dot={{ r: 4 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div> */}

// //           <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
// //             <table className="min-w-full text-sm text-left">
// //               <thead className="bg-gray-100 text-gray-600">
// //                 <tr>
// //                   <th className="px-4 py-3">Part Number</th>
// //                   <th className="px-4 py-3">Time to Deliver </th>
// //                   <th className="px-4 py-3">Qty. Available</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {partsData.map((part, index) => (
// //                   <tr key={index} className="hover:bg-gray-50">
// //                     <td className="px-4 py-2 font-medium">{part.partNumber}</td>
// //                     <td className="px-4 py-2">{part.timeToDeliver}</td>
// //                     <td className="px-4 py-2">{part.qtyAvailable}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Inventory;
// // // import React, { useState, useEffect } from "react";
// // // import { Bar, Line } from "react-chartjs-2";
// // // import {
// // //   Chart as ChartJS,
// // //   CategoryScale,
// // //   LinearScale,
// // //   BarElement,
// // //   PointElement,
// // //   LineElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend,
// // // } from "chart.js";

// // // ChartJS.register(
// // //   CategoryScale,
// // //   LinearScale,
// // //   BarElement,
// // //   PointElement,
// // //   LineElement,
// // //   Title,
// // //   Tooltip,
// // //   Legend
// // // );

// // // interface Part {
// // //   partNumber: string;
// // //   qtyAvail: number;
// // //   minStock: number;
// // //   partCost: number;
// // // }

// // // interface InventoryProps {
// // //   cogs: number; // total COGS for the selected period
// // // }

// // // const Inventory: React.FC<InventoryProps> = ({ cogs }) => {
// // //   const [parts, setParts] = useState<Part[]>([]);
// // //   const [turnover, setTurnover] = useState<number>(0);

// // //   useEffect(() => {
// // //     // Mock data (replace with API call)
// // //     const data: Part[] = [
// // //       { partNumber: "Gobi", qtyAvail: 5, minStock: 2, partCost: 2 },
// // //       { partNumber: "Tomato", qtyAvail: 12, minStock: 5, partCost: 3 },
// // //       { partNumber: "Potato", qtyAvail: 20, minStock: 8, partCost: 1.5 },
// // //     ];
// // //     setParts(data);

// // //     // Calculate inventory values
// // //     const dailyTotalCost = data.reduce(
// // //       (acc, p) => acc + p.qtyAvail * p.partCost,
// // //       0
// // //     );
// // //     const avgInventory = dailyTotalCost / 2; // Example: (opening + closing) / 2
// // //     setTurnover(cogs / avgInventory);
// // //   }, [cogs]);

// // //   // 📌 Inventory Levels per Part
// // //   const barData = {
// // //     labels: parts.map((p) => p.partNumber),
// // //     datasets: [
// // //       {
// // //         label: "Inventory Level (Avail - Min)",
// // //         data: parts.map((p) => p.qtyAvail - p.minStock),
// // //         backgroundColor: "rgba(54, 162, 235, 0.6)",
// // //       },
// // //     ],
// // //   };

// // //   // 📌 Inventory Turnover Trend (mock 5 days)
// // //   const lineData = {
// // //     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
// // //     datasets: [
// // //       {
// // //         label: "Inventory Turnover",
// // //         data: [2.5, 3.2, 2.8, 3.5, turnover], // last point = calculated ratio
// // //         borderColor: "rgba(255, 99, 132, 1)",
// // //         backgroundColor: "rgba(255, 99, 132, 0.3)",
// // //         fill: true,
// // //         tension: 0.3,
// // //       },
// // //     ],
// // //   };

// // //   return (
// // //     <div className="p-5">
// // //       <h1 className="text-xl font-bold mb-5">📦 Inventory Dashboard</h1>

// // //       {/* KPI - Turnover */}
// // //       <div className="mb-5 p-4 border rounded shadow">
// // //         <h2 className="text-lg font-semibold">
// // //           Inventory Turnover Ratio: {turnover.toFixed(2)}x
// // //         </h2>
// // //       </div>

// // //       {/* Inventory Levels */}
// // //       <div className="mb-10">
// // //         <Bar data={barData} options={{ responsive: true }} />
// // //       </div>

// // //       {/* Inventory Turnover Trend */}
// // //       <div>
// // //         <Line data={lineData} options={{ responsive: true }} />
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Inventory;

// // // import React, { useMemo } from "react";
// // // import {
// // //   CartesianGrid,
// // //   Legend,
// // //   Line,
// // //   LineChart,
// // //   ResponsiveContainer,
// // //   Tooltip,
// // //   XAxis,
// // //   YAxis,
// // //   Bar,
// // //   BarChart,
// // // } from "recharts";

// // // // 📌 Mock Data
// // // const revenueData = [
// // //   { orderType: "stock", salesCost: 2000 },
// // //   { orderType: "custom", salesCost: 5000 },
// // // ];

// // // const cogsData = [
// // //   { supplierPartCost: 3000, cycleTime: 2, hourlyRate: 50, partsMade: 10 },
// // //   { supplierPartCost: 1500, cycleTime: 1, hourlyRate: 50, partsMade: 5 },
// // // ];

// // // const partsData = [
// // //   {
// // //     partNumber: "30024T",
// // //     availableInventory: 20,
// // //     minimumStock: 5,
// // //     partCost: 50,
// // //   },
// // //   {
// // //     partNumber: "30025T",
// // //     availableInventory: 10,
// // //     minimumStock: 3,
// // //     partCost: 30,
// // //   },
// // //   {
// // //     partNumber: "30026T",
// // //     availableInventory: 2,
// // //     minimumStock: 5,
// // //     partCost: 20,
// // //   },
// // // ];

// // // // 📌 Dashboard Component
// // // const Inventory = () => {
// // //   // Revenue calculations
// // //   const totalRevenue = useMemo(
// // //     () => revenueData.reduce((sum, r) => sum + r.salesCost, 0),
// // //     []
// // //   );
// // //   const stockRevenue = useMemo(
// // //     () =>
// // //       revenueData
// // //         .filter((r) => r.orderType === "stock")
// // //         .reduce((sum, r) => sum + r.salesCost, 0),
// // //     []
// // //   );
// // //   const customRevenue = useMemo(
// // //     () =>
// // //       revenueData
// // //         .filter((r) => r.orderType === "custom")
// // //         .reduce((sum, r) => sum + r.salesCost, 0),
// // //     []
// // //   );

// // //   const inventoryLevels = Array.from({ length: 120 }, (_, i) => ({
// // //     partNumber: `Part-${i + 1}`,
// // //     inventoryLevel: Math.floor(Math.random() * 500), // random for demo
// // //   }));

// // //   // COGS calculations
// // //   const totalCOGS = useMemo(() => {
// // //     return cogsData.reduce((sum, c) => {
// // //       const partCost = c.supplierPartCost;
// // //       const timeCost = c.cycleTime * c.hourlyRate * c.partsMade;
// // //       return sum + (partCost + timeCost);
// // //     }, 0);
// // //   }, []);

// // //   // Inventory calculations
// // //   const dailyInventoryCost = useMemo(() => {
// // //     return partsData.reduce(
// // //       (sum, p) => sum + p.availableInventory * p.partCost,
// // //       0
// // //     );
// // //   }, []);

// // //   const avgInventory = dailyInventoryCost / 2; // Example approximation
// // //   const turnoverRatio = totalCOGS / avgInventory;

// // //   // const inventoryLevels = partsData.map((p) => ({
// // //   //   partNumber: p.partNumber,
// // //   //   inventoryLevel: p.availableInventory - p.minimumStock,
// // //   // }));

// // //   // Chart Data
// // //   const revenueChart = [
// // //     { name: "Stock Orders", revenue: stockRevenue },
// // //     { name: "Custom Orders", revenue: customRevenue },
// // //   ];

// // //   return (
// // //     <div className="p-6">
// // //       <h1 className="text-2xl font-semibold mb-4">📊 Business Dashboard</h1>

// // //       {/* KPI Row */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// // //         <div className="bg-white shadow p-4 rounded-xl">
// // //           <h2 className="text-gray-600 text-sm">Total Revenue</h2>
// // //           <p className="text-xl font-bold">${totalRevenue}</p>
// // //         </div>
// // //         <div className="bg-white shadow p-4 rounded-xl">
// // //           <h2 className="text-gray-600 text-sm">Total COGS</h2>
// // //           <p className="text-xl font-bold">${totalCOGS}</p>
// // //         </div>
// // //         <div className="bg-white shadow p-4 rounded-xl">
// // //           <h2 className="text-gray-600 text-sm">Inventory Turnover</h2>
// // //           <p className="text-xl font-bold">{turnoverRatio.toFixed(2)}x</p>
// // //         </div>
// // //       </div>

// // //       {/* Revenue Chart */}
// // //       <div className="bg-white shadow p-4 rounded-xl mb-6">
// // //         <h2 className="text-lg font-medium mb-2">Revenue Breakdown</h2>
// // //         <ResponsiveContainer width="100%" height={300}>
// // //           <BarChart data={revenueChart}>
// // //             <CartesianGrid stroke="#e0e0e0" />
// // //             <XAxis dataKey="name" />
// // //             <YAxis />
// // //             <Tooltip />
// // //             <Bar dataKey="revenue" fill="#4CAF50" />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </div>

// // //       {/* Inventory Levels Chart */}
// // //       <div className="bg-white shadow p-4 rounded-xl mb-6">
// // //         <h2 className="text-lg font-medium mb-2">
// // //           Inventory Levels (Per Part)
// // //         </h2>
// // //         <ResponsiveContainer width="100%" height={300}>
// // //           <BarChart data={inventoryLevels}>
// // //             <CartesianGrid stroke="#e0e0e0" />
// // //             <XAxis dataKey="partNumber" />
// // //             <YAxis />
// // //             <Tooltip />
// // //             <Bar dataKey="inventoryLevel" fill="#2196F3" />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </div>
// // //       <div className="bg-white shadow p-4 rounded-xl mb-6">
// // //         <h2 className="text-lg font-medium mb-2">
// // //           Inventory Levels (Per Part)
// // //         </h2>

// // //         <div style={{ width: "100%", height: 500, overflowX: "auto" }}>
// // //           <ResponsiveContainer width={2000} height={500}>
// // //             <BarChart
// // //               data={inventoryLevels}
// // //               layout="vertical"
// // //               margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
// // //             >
// // //               <CartesianGrid stroke="#e0e0e0" />
// // //               <XAxis type="number" />
// // //               <YAxis
// // //                 type="category"
// // //                 dataKey="partNumber"
// // //                 width={100}
// // //                 interval={0} // show all labels
// // //               />
// // //               <Tooltip />
// // //               <Bar dataKey="inventoryLevel" fill="#2196F3" />
// // //             </BarChart>
// // //           </ResponsiveContainer>
// // //         </div>
// // //       </div>
// // //       {/* Inventory Cost Trend */}
// // //       <div className="bg-white shadow p-4 rounded-xl">
// // //         <h2 className="text-lg font-medium mb-2">Daily Inventory Cost Trend</h2>
// // //         <ResponsiveContainer width="100%" height={300}>
// // //           <LineChart
// // //             data={[
// // //               { day: "Day 1", cost: dailyInventoryCost * 0.9 },
// // //               { day: "Day 2", cost: dailyInventoryCost * 1.1 },
// // //               { day: "Day 3", cost: dailyInventoryCost },
// // //             ]}
// // //           >
// // //             <CartesianGrid stroke="#e0e0e0" />
// // //             <XAxis dataKey="day" />
// // //             <YAxis />
// // //             <Tooltip />
// // //             <Legend />
// // //             <Line
// // //               type="monotone"
// // //               dataKey="cost"
// // //               stroke="#FF5722"
// // //               strokeWidth={2}
// // //             />
// // //           </LineChart>
// // //         </ResponsiveContainer>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Inventory;

// import img1 from "../../assets/green.png";
// import img2 from "../../assets/yellow.png";
// import img3 from "../../assets/orange.png";
// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_2 from "../../assets/scrap_2.png";
// import scrap_3 from "../../assets/scrap_3.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import customer_return from "../../assets/customer_return.png";
// import supplier_return from "../../assets/supplier_return.png";
// import img4 from "../../assets/green.png";
// import img5 from "../../assets/yellow.png";
// import img6 from "../../assets/orange.png";
// import shape_1 from "../../assets/shape_1.png";
// import shape_2 from "../../assets/shape_2.png";
// import shape_3 from "../../assets/shape_3.png";
// // import {
// //   CartesianGrid,
// //   Legend,
// //   Line,
// //   LineChart,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// // } from "recharts";
// // const data_1 = [
// //   {
// //     num: "$5,00,000",
// //     text: "Scrap Cost",
// //     img: img1,
// //     scrap: scrap_1,
// //     scrap_img: scrap_cost,
// //     increase: "-$10k",
// //     bgColor: "bg-orange-50",
// //     textColor: "text-red-500",
// //   },
// //   {
// //     num: "01",
// //     text: "Customer Return",
// //     img: img2,
// //     scrap: scrap_2,
// //     scrap_img: customer_return,
// //     increase: "+200",
// //     bgColor: "bg-green-50",
// //     textColor: "text-green-500",
// //   },

// //   {
// //     num: "15,000",
// //     text: "Supplier Return",
// //     img: img3,
// //     scrap: scrap_3,
// //     scrap_img: supplier_return,
// //     increase: "+200",
// //     bgColor: "bg-blue-50",
// //     textColor: "text-green-500",
// //   },
// // ];

// // const output = [
// //   { name: "Jan", "2022": 90 },
// //   { name: "Feb", "2022": 40 },
// //   { name: "Mar", "2022": 110 },
// //   { name: "Apr", "2022": 80 },
// //   { name: "May", "2022": 70 },
// //   { name: "Jun", "2022": 20 },
// //   { name: "Jul", "2022": 110 },
// //   { name: "Aug", "2022": 150 },
// //   { name: "Sep", "2022": 40 },
// //   { name: "Oct", "2022": 120 },
// //   { name: "Nov", "2022": 170 },
// //   { name: "Dec", "2022": 20 },
// // ];

// // const partsData = [
// //   { partNumber: "30024T", timeToDeliver: "0.00", qtyAvailable: "02" },
// //   { partNumber: "30025T", timeToDeliver: "1.25", qtyAvailable: "05" },
// //   { partNumber: "30026T", timeToDeliver: "0.50", qtyAvailable: "10" },
// //   { partNumber: "30027T", timeToDeliver: "2.00", qtyAvailable: "00" },
// //   { partNumber: "30028T", timeToDeliver: "0.75", qtyAvailable: "07" },
// //   { partNumber: "30029T", timeToDeliver: "3.00", qtyAvailable: "01" },
// //   { partNumber: "30030T", timeToDeliver: "0.20", qtyAvailable: "04" },
// //   { partNumber: "30031T", timeToDeliver: "1.10", qtyAvailable: "06" },
// // ];
// // const data_2 = [
// //   {
// //     num: "1",
// //     text: "shift",
// //     img: img4,
// //     shape: shape_1,
// //   },
// //   {
// //     num: "129",
// //     text: "Actual",
// //     img: img5,
// //     shape: shape_2,
// //   },
// //   {
// //     num: "1",
// //     text: "Scrap",
// //     img: img6,
// //     shape: shape_3,
// //   },
// //   {
// //     num: "129",
// //     text: "Actual",
// //     img: img5,
// //     shape: shape_2,
// //   },
// // ];

// // const Inventory = () => {
// //   return (
// //     <div className="">
// //       <div className="mt-6">
// //         <h1 className="font-semibold text-2xl">Inventory</h1>
// //         <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
// //           {data_1.map((item) => (
// //             <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
// //               <div className="flex items-center gap-2">
// //                 <div>
// //                   <img className="w-[40px]" src={item.scrap_img} alt="" />
// //                 </div>
// //                 <div className="">
// //                   <p className="text-sm text-gray-600">{item.text}</p>
// //                   <p className="font-bold text-xl">{item.num}</p>
// //                 </div>
// //               </div>
// //               <div>
// //                 <img src={item.scrap} alt="" />
// //               </div>
// //               <div className="text-sm text-gray-600">
// //                 Increase by{" "}
// //                 <span
// //                   className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
// //                 >
// //                   {" "}
// //                   {item.increase}
// //                 </span>{" "}
// //                 this week
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex flex-col md:flex-row  mt-6 gap-4  ">
// //         {data_2.map((item) => (
// //           <div className="flex justify-between items-center bg-white  rounded-md w-full">
// //             {" "}
// //             <div className="p-2">
// //               {" "}
// //               <p className="font-bold text-2xl">{item.num}</p>
// //               <p>{item.text}</p>
// //             </div>
// //             <div className="relative right-0">
// //               <img src={item.shape} alt="" />
// //               <div className="absolute right-4 top-6">
// //                 {" "}
// //                 <img src={item.img} alt="" />
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-6">
// //         {" "}
// //         <div className="bg-white shadow-md rounded-2xl p-4">
// //           <h2 className="text-lg font-medium mb-2">Inventory Trans.</h2>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <LineChart data={output}>
// //               <CartesianGrid stroke="#e0e0e0" />
// //               <XAxis dataKey="name" fontSize={10} />
// //               <YAxis />
// //               <Tooltip />
// //               <Legend />
// //               <Line
// //                 dataKey="2022"
// //                 stroke="#ff6b6b"
// //                 strokeWidth={2}
// //                 dot={{ r: 4 }}
// //               />
// //               <Line
// //                 dataKey="2023"
// //                 stroke="#8884d8"
// //                 strokeWidth={2}
// //                 dot={{ r: 4 }}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //         <div className="mt-5">
// //           {/* <div className="bg-white shadow-md rounded-2xl p-4">
// //             <h2 className="text-lg font-medium mb-2"> Inventory Trans.</h2>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <LineChart data={forming}>
// //                 <CartesianGrid stroke="#e0e0e0" />
// //                 <XAxis dataKey="name" fontSize={10} />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Line
// //                   type="bumpX"
// //                   dataKey="2022"
// //                   stroke="#8884d8"
// //                   strokeWidth={2}
// //                   dot={{ r: 4 }}
// //                 />
// //                 <Line
// //                   type="bumpX"
// //                   dataKey="2023"
// //                   stroke="#ff6b6b"
// //                   strokeWidth={2}
// //                   dot={{ r: 4 }}
// //                 />
// //                 <Line
// //                   type="bumpX"
// //                   dataKey="2024"
// //                   stroke="#00bcd4"
// //                   strokeWidth={2}
// //                   dot={{ r: 4 }}
// //                 />
// //               </LineChart>
// //             </ResponsiveContainer>
// //           </div> */}

// //           <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
// //             <table className="min-w-full text-sm text-left">
// //               <thead className="bg-gray-100 text-gray-600">
// //                 <tr>
// //                   <th className="px-4 py-3">Part Number</th>
// //                   <th className="px-4 py-3">Time to Deliver </th>
// //                   <th className="px-4 py-3">Qty. Available</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-gray-200">
// //                 {partsData.map((part, index) => (
// //                   <tr key={index} className="hover:bg-gray-50">
// //                     <td className="px-4 py-2 font-medium">{part.partNumber}</td>
// //                     <td className="px-4 py-2">{part.timeToDeliver}</td>
// //                     <td className="px-4 py-2">{part.qtyAvailable}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Inventory;
// // import React, { useState, useEffect } from "react";
// // import { Bar, Line } from "react-chartjs-2";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   BarElement,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend
// // );

// // interface Part {
// //   partNumber: string;
// //   qtyAvail: number;
// //   minStock: number;
// //   partCost: number;
// // }

// // interface InventoryProps {
// //   cogs: number; // total COGS for the selected period
// // }

// // const Inventory: React.FC<InventoryProps> = ({ cogs }) => {
// //   const [parts, setParts] = useState<Part[]>([]);
// //   const [turnover, setTurnover] = useState<number>(0);

// //   useEffect(() => {
// //     // Mock data (replace with API call)
// //     const data: Part[] = [
// //       { partNumber: "Gobi", qtyAvail: 5, minStock: 2, partCost: 2 },
// //       { partNumber: "Tomato", qtyAvail: 12, minStock: 5, partCost: 3 },
// //       { partNumber: "Potato", qtyAvail: 20, minStock: 8, partCost: 1.5 },
// //     ];
// //     setParts(data);

// //     // Calculate inventory values
// //     const dailyTotalCost = data.reduce(
// //       (acc, p) => acc + p.qtyAvail * p.partCost,
// //       0
// //     );
// //     const avgInventory = dailyTotalCost / 2; // Example: (opening + closing) / 2
// //     setTurnover(cogs / avgInventory);
// //   }, [cogs]);

// //   // 📌 Inventory Levels per Part
// //   const barData = {
// //     labels: parts.map((p) => p.partNumber),
// //     datasets: [
// //       {
// //         label: "Inventory Level (Avail - Min)",
// //         data: parts.map((p) => p.qtyAvail - p.minStock),
// //         backgroundColor: "rgba(54, 162, 235, 0.6)",
// //       },
// //     ],
// //   };

// //   // 📌 Inventory Turnover Trend (mock 5 days)
// //   const lineData = {
// //     labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
// //     datasets: [
// //       {
// //         label: "Inventory Turnover",
// //         data: [2.5, 3.2, 2.8, 3.5, turnover], // last point = calculated ratio
// //         borderColor: "rgba(255, 99, 132, 1)",
// //         backgroundColor: "rgba(255, 99, 132, 0.3)",
// //         fill: true,
// //         tension: 0.3,
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="p-5">
// //       <h1 className="text-xl font-bold mb-5">📦 Inventory Dashboard</h1>

// //       {/* KPI - Turnover */}
// //       <div className="mb-5 p-4 border rounded shadow">
// //         <h2 className="text-lg font-semibold">
// //           Inventory Turnover Ratio: {turnover.toFixed(2)}x
// //         </h2>
// //       </div>

// //       {/* Inventory Levels */}
// //       <div className="mb-10">
// //         <Bar data={barData} options={{ responsive: true }} />
// //       </div>

// //       {/* Inventory Turnover Trend */}
// //       <div>
// //         <Line data={lineData} options={{ responsive: true }} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Inventory;

// // import React, { useMemo } from "react";
// // import {
// //   CartesianGrid,
// //   Legend,
// //   Line,
// //   LineChart,
// //   ResponsiveContainer,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   Bar,
// //   BarChart,
// // } from "recharts";

// // // 📌 Mock Data
// // const revenueData = [
// //   { orderType: "stock", salesCost: 2000 },
// //   { orderType: "custom", salesCost: 5000 },
// // ];

// // const cogsData = [
// //   { supplierPartCost: 3000, cycleTime: 2, hourlyRate: 50, partsMade: 10 },
// //   { supplierPartCost: 1500, cycleTime: 1, hourlyRate: 50, partsMade: 5 },
// // ];

// // const partsData = [
// //   {
// //     partNumber: "30024T",
// //     availableInventory: 20,
// //     minimumStock: 5,
// //     partCost: 50,
// //   },
// //   {
// //     partNumber: "30025T",
// //     availableInventory: 10,
// //     minimumStock: 3,
// //     partCost: 30,
// //   },
// //   {
// //     partNumber: "30026T",
// //     availableInventory: 2,
// //     minimumStock: 5,
// //     partCost: 20,
// //   },
// // ];

// // // 📌 Dashboard Component
// // const Inventory = () => {
// //   // Revenue calculations
// //   const totalRevenue = useMemo(
// //     () => revenueData.reduce((sum, r) => sum + r.salesCost, 0),
// //     []
// //   );
// //   const stockRevenue = useMemo(
// //     () =>
// //       revenueData
// //         .filter((r) => r.orderType === "stock")
// //         .reduce((sum, r) => sum + r.salesCost, 0),
// //     []
// //   );
// //   const customRevenue = useMemo(
// //     () =>
// //       revenueData
// //         .filter((r) => r.orderType === "custom")
// //         .reduce((sum, r) => sum + r.salesCost, 0),
// //     []
// //   );

// //   const inventoryLevels = Array.from({ length: 120 }, (_, i) => ({
// //     partNumber: `Part-${i + 1}`,
// //     inventoryLevel: Math.floor(Math.random() * 500), // random for demo
// //   }));

// //   // COGS calculations
// //   const totalCOGS = useMemo(() => {
// //     return cogsData.reduce((sum, c) => {
// //       const partCost = c.supplierPartCost;
// //       const timeCost = c.cycleTime * c.hourlyRate * c.partsMade;
// //       return sum + (partCost + timeCost);
// //     }, 0);
// //   }, []);

// //   // Inventory calculations
// //   const dailyInventoryCost = useMemo(() => {
// //     return partsData.reduce(
// //       (sum, p) => sum + p.availableInventory * p.partCost,
// //       0
// //     );
// //   }, []);

// //   const avgInventory = dailyInventoryCost / 2; // Example approximation
// //   const turnoverRatio = totalCOGS / avgInventory;

// //   // const inventoryLevels = partsData.map((p) => ({
// //   //   partNumber: p.partNumber,
// //   //   inventoryLevel: p.availableInventory - p.minimumStock,
// //   // }));

// //   // Chart Data
// //   const revenueChart = [
// //     { name: "Stock Orders", revenue: stockRevenue },
// //     { name: "Custom Orders", revenue: customRevenue },
// //   ];

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-semibold mb-4">📊 Business Dashboard</h1>

// //       {/* KPI Row */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
// //         <div className="bg-white shadow p-4 rounded-xl">
// //           <h2 className="text-gray-600 text-sm">Total Revenue</h2>
// //           <p className="text-xl font-bold">${totalRevenue}</p>
// //         </div>
// //         <div className="bg-white shadow p-4 rounded-xl">
// //           <h2 className="text-gray-600 text-sm">Total COGS</h2>
// //           <p className="text-xl font-bold">${totalCOGS}</p>
// //         </div>
// //         <div className="bg-white shadow p-4 rounded-xl">
// //           <h2 className="text-gray-600 text-sm">Inventory Turnover</h2>
// //           <p className="text-xl font-bold">{turnoverRatio.toFixed(2)}x</p>
// //         </div>
// //       </div>

// //       {/* Revenue Chart */}
// //       <div className="bg-white shadow p-4 rounded-xl mb-6">
// //         <h2 className="text-lg font-medium mb-2">Revenue Breakdown</h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={revenueChart}>
// //             <CartesianGrid stroke="#e0e0e0" />
// //             <XAxis dataKey="name" />
// //             <YAxis />
// //             <Tooltip />
// //             <Bar dataKey="revenue" fill="#4CAF50" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Inventory Levels Chart */}
// //       <div className="bg-white shadow p-4 rounded-xl mb-6">
// //         <h2 className="text-lg font-medium mb-2">
// //           Inventory Levels (Per Part)
// //         </h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={inventoryLevels}>
// //             <CartesianGrid stroke="#e0e0e0" />
// //             <XAxis dataKey="partNumber" />
// //             <YAxis />
// //             <Tooltip />
// //             <Bar dataKey="inventoryLevel" fill="#2196F3" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>
// //       <div className="bg-white shadow p-4 rounded-xl mb-6">
// //         <h2 className="text-lg font-medium mb-2">
// //           Inventory Levels (Per Part)
// //         </h2>

// //         <div style={{ width: "100%", height: 500, overflowX: "auto" }}>
// //           <ResponsiveContainer width={2000} height={500}>
// //             <BarChart
// //               data={inventoryLevels}
// //               layout="vertical"
// //               margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
// //             >
// //               <CartesianGrid stroke="#e0e0e0" />
// //               <XAxis type="number" />
// //               <YAxis
// //                 type="category"
// //                 dataKey="partNumber"
// //                 width={100}
// //                 interval={0} // show all labels
// //               />
// //               <Tooltip />
// //               <Bar dataKey="inventoryLevel" fill="#2196F3" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </div>
// //       </div>
// //       {/* Inventory Cost Trend */}
// //       <div className="bg-white shadow p-4 rounded-xl">
// //         <h2 className="text-lg font-medium mb-2">Daily Inventory Cost Trend</h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart
// //             data={[
// //               { day: "Day 1", cost: dailyInventoryCost * 0.9 },
// //               { day: "Day 2", cost: dailyInventoryCost * 1.1 },
// //               { day: "Day 3", cost: dailyInventoryCost },
// //             ]}
// //           >
// //             <CartesianGrid stroke="#e0e0e0" />
// //             <XAxis dataKey="day" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line
// //               type="monotone"
// //               dataKey="cost"
// //               stroke="#FF5722"
// //               strokeWidth={2}
// //             />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Inventory;
// import React from "react";

// interface InventoryCost {
//   partNumber: string;
//   inventoryCost: number;
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// type InventoryData = {
//   [key: string]: { inventoryCost: number }[];
// };

// const Inventory = () => {
//   const [inventoryData, setInventoryData] = useState<InventoryData>({});
//   const [totalInventoryCost, setTotalInventoryCost] = useState<number>(0);
//   const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
//     "month",
//   );
//   const dayMap: Record<string, string> = {
//     Monday: "Mon",
//     Tuesday: "Tue",
//     Wednesday: "Wed",
//     Thursday: "Thu",
//     Friday: "Fri",
//     Saturday: "Sat",
//     Sunday: "Sun",
//   };

//   // convert API data keys
//   const normalizeInventoryKeys = (data: any, period: string) => {
//     if (period === "week") {
//       const normalized: any = {};
//       Object.keys(data).forEach((day) => {
//         const shortDay = dayMap[day] || day;
//         normalized[shortDay] = data[day];
//       });
//       return normalized;
//     }
//     return data;
//   };
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   const fetchInventory = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/api/admin/inventory-data`);

//       const normalizedData = normalizeInventoryKeys(
//         res.data.inventoryData,
//         period,
//       );

//       setInventoryData(normalizedData);
//       setTotalInventoryCost(res.data.totalInventoryCost);
//     } catch (error) {
//       console.error("Error fetching inventory:", error);
//     }
//   };

//   useEffect(() => {
//     fetchInventory();
//   }, [period]);

//   const normalizeChartData = () => {
//     const now = new Date();
//     const currentDayNum = now.getDate().toString(); // e.g., "27"
//     const currentMonthName = now.toLocaleString("en-US", { month: "short" }); // e.g., "Jan"
//     const currentWeekdayName = now.toLocaleString("en-US", {
//       weekday: "short",
//     }); // e.g., "Tue"

//     let chartData: { name: string; cost: number }[] = [];

//     // Helper function to calculate total cost for a specific key
//     const getTotalForKey = (
//       key: string,
//       periodType: "month" | "year" | "week",
//     ) => {
//       // 1. Agar backend ne us specific key (jaise "27" ya "Jan") ka data bheja hai
//       if (inventoryData[key]) {
//         return inventoryData[key].reduce(
//           (acc, p) => acc + (p.inventoryCost || 0),
//           0,
//         );
//       }

//       // 2. Agar backend ne sirf "total" bheja hai, toh use "Aaj" ki date par dikhao
//       const isToday =
//         (periodType === "month" && key === currentDayNum) ||
//         (periodType === "year" && key === currentMonthName) ||
//         (periodType === "week" && key === currentWeekdayName);

//       if (isToday && inventoryData["total"]) {
//         return inventoryData["total"].reduce(
//           (acc, p) => acc + (p.inventoryCost || 0),
//           0,
//         );
//       }

//       return 0;
//     };

//     if (period === "year") {
//       const months = [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ];
//       chartData = months.map((m) => ({
//         name: m,
//         cost: getTotalForKey(m, "year"),
//       }));
//     }

//     if (period === "month") {
//       const year = now.getFullYear();
//       const month = now.getMonth() + 1;
//       const daysInMonth = new Date(year, month, 0).getDate();
//       chartData = Array.from({ length: daysInMonth }, (_, i) => {
//         const day = (i + 1).toString();
//         return {
//           name: day,
//           cost: getTotalForKey(day, "month"),
//         };
//       });
//     }

//     if (period === "week") {
//       const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//       chartData = weekDays.map((d) => ({
//         name: d,
//         cost: getTotalForKey(d, "week"),
//       }));
//     }

//     return chartData;
//   };
//   const chartData = normalizeChartData();

//   console.log(
//     "totalInventoryCosttotalInventoryCosttotalInventoryCost",
//     totalInventoryCost,
//   );
//   return (
//     <div className="p-4">
//       <h1 className="font-semibold text-2xl">Inventory</h1>

//       {/* 🔹 Filter */}
//       <div className="mt-4 mb-6">
//         <label className="mr-2 font-medium">Select Period:</label>
//         <select
//           value={period}
//           onChange={(e) => setPeriod(e.target.value as any)}
//           className="border rounded px-3 py-1"
//         >
//           <option value="week">Week</option>
//           <option value="month">Month</option>
//           <option value="year">Year</option>
//         </select>
//       </div>

//       {/* 🔹 KPI */}
//       <div className="mb-5 p-4 border rounded shadow bg-white">
//         <h2 className="text-lg font-semibold">
//           Total Inventory Cost: $ {totalInventoryCost}
//         </h2>
//       </div>

//       {/* 🔹 Line Chart */}
//       <div className="bg-white shadow-md rounded-2xl p-4">
//         <h2 className="text-lg font-medium mb-2">Inventory Trend</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chartData}>
//             <CartesianGrid stroke="#e0e0e0" />
//             <XAxis dataKey="name" fontSize={10} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey={"cost"}
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

// export default Inventory;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ---------------- Types ---------------- */

type Period = "daily" | "weekly" | "monthly";

interface ChartItem {
  date: string;      // X-axis formatted (system time)
  rawDate: string;   // original date (tooltip)
  cost: number;
}

/* ---------------- Date Utils (Frontend Only) ---------------- */

// System / Browser time ke according
const formatShortDate = (date: string | Date) =>
  new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));

const formatFullDate = (date: string | Date) =>
  new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));

/* ---------------- Component ---------------- */

const Inventory = () => {
  const [period, setPeriod] = useState<Period>("daily");
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [totalInventoryCost, setTotalInventoryCost] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  /* ---------------- API Call ---------------- */

  const fetchInventoryGraph = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/admin/inventory-data?period=${period}`
      );

      const formatted: ChartItem[] = res.data.map((item: any) => ({
        date: formatShortDate(item.date), // X-axis (system time)
        rawDate: item.date,
        cost: item.totalInventoryCost,
      }));

      setChartData(formatted);

      // KPI → latest day inventory cost
      if (res.data.length > 0) {
        setTotalInventoryCost(
          res.data[res.data.length - 1].totalInventoryCost
        );
      } else {
        setTotalInventoryCost(0);
      }
    } catch (error) {
      console.error("Inventory graph error:", error);
      setChartData([]);
      setTotalInventoryCost(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryGraph();
  }, [period]);

  /* ---------------- UI ---------------- */

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl mb-4">Inventory</h1>

      {/* 🔹 Period Filter */}
      <div className="mb-6 flex items-center gap-2">
        <label className="font-medium">Select Period:</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          className="border rounded px-3 py-1"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* 🔹 KPI */}
      <div className="mb-6 p-4 border rounded-lg shadow bg-white">
        <h2 className="text-lg font-semibold">
          Total Inventory Cost: $ {totalInventoryCost.toFixed(2)}
        </h2>
        {/* <p className="text-sm text-gray-500 mt-1">
          Last updated: {formatFullDate(new Date())}
        </p> */}
      </div>

      {/* 🔹 Line Graph */}
      <div className="bg-white shadow-md rounded-2xl p-4">
        <h2 className="text-lg font-medium mb-3">
          Inventory Trend (Date Wise)
        </h2>

        {loading ? (
          <p className="text-center py-10 text-gray-500">Loading graph...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis />
              <Tooltip
                labelFormatter={(label, payload) =>
                  payload?.[0]?.payload?.rawDate
                    ? `Date: ${formatFullDate(
                        payload[0].payload.rawDate
                      )}`
                    : label
                }
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Inventory;
