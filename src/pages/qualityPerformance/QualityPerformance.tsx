import { NavLink } from "react-router-dom";
import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import {
  CartesianGrid,
  Legend,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import CustomerReturn from "./CustomerReturn";
import SupplierReturn from "./SupplierReturn";
import ScrapBar from "./ScrapBar";

const data_1 = [
  // {
  //   num: "$5,00,000",
  //   text: "Scrap Cost",
  //   img: img1,
  //   scrap: scrap_1,
  //   scrap_img: scrap_cost,
  //   increase: "-$10k",
  //   bgColor: "bg-orange-50",
  //   textColor: "text-red-500",
  // },
  // {
  //   num: "01",
  //   text: "Customer Return",
  //   img: img2,
  //   scrap: scrap_2,
  //   scrap_img: customer_return,
  //   increase: "+200",
  //   bgColor: "bg-green-50",
  //   textColor: "text-green-500",
  // },
  {
    num: "15,000",
    text: "Supplier Return",
    img: img3,
    scrap: scrap_3,
    scrap_img: supplier_return,
    increase: "+200",
    bgColor: "bg-blue-50",
    textColor: "text-green-500",
  },
];
const forming = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];
const coolingTime = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];
const vacPrestrech = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];

// const QualityPerformance = () => {
//   return (
//     <div>
//       <div className="p-7">
//         <div>
//           <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//             Quality Performance
//           </h1>
//         </div>
//         <div className="flex justify-between mt-2 items-center">
//           <div className="flex gap-4 items-center ">
//             <p className={`text-sm  text-black font-semibold`}>
//               <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
//             </p>

//             <span className="text-xs  hover:cursor-pointer">25/08/2024</span>
//             <span>-</span>
//             <span className="text-xs  hover:cursor-pointer">25/11/2025</span>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h1 className="font-semibold text-xl">Scrap</h1>
//           <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//             {data_1.map((item) => (
//               <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
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
//                   Increase by
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

//         <div className="mt-6">{/* <CustomerReturn /> */}</div>
//         <div className="mt-6">
//           <SupplierReturn />
//         </div>
//         <div className="mt-6 bg-white rounded-md shadow-sm">
//           <ScrapBar />
//         </div>
//         {/*
//         <div className="bg-white shadow-md rounded-2xl  mt-6 p-4 ">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-white shadow-md rounded-2xl p-2 md:p-4">
//               <h2 className=" md:text-lg font-medium mb-2">
//                 Forming Temp by Time
//               </h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={forming}>
//                   <CartesianGrid stroke="#e0e0e0" />
//                   <XAxis dataKey="name" fontSize={10} />
//                   <YAxis fontSize={10} />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="bumpX"
//                     dataKey="2022"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                   <Line
//                     type="bumpX"
//                     dataKey="2023"
//                     stroke="#ff6b6b"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                   <Line
//                     type="bumpX"
//                     dataKey="2024"
//                     stroke="#00bcd4"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>

//             <div className="bg-white shadow-md rounded-2xl p-2 md:p-4">
//               <h2 className="md:text-lg font-medium mb-2">
//                 Cooling Time & Cool Delay by Time
//               </h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={coolingTime}>
//                   <CartesianGrid stroke="#e0e0e0" />
//                   <XAxis dataKey="name" fontSize={10} />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="bumpX"
//                     dataKey="2022"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                   <Line
//                     type="bumpX"
//                     dataKey="2023"
//                     stroke="#ff6b6b"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                   <Line
//                     type="bumpX"
//                     dataKey="2024"
//                     stroke="#00bcd4"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//             <div className="bg-white shadow-md rounded-2xl p-2 md:p-4">
//               <h2 className="md:text-lg font-medium mb-2">
//                 Vac Prestrech by Time{" "}
//               </h2>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={vacPrestrech}>
//                   <CartesianGrid stroke="#e0e0e0" />
//                   <XAxis dataKey="name" fontSize={10} />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line
//                     type="bumpX"
//                     dataKey="2022"
//                     stroke="#8884d8"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                   <Line
//                     type="bumpX"
//                     dataKey="2023"
//                     stroke="#ff6b6b"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                   <Line
//                     type="bumpX"
//                     dataKey="2024"
//                     stroke="#00bcd4"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default QualityPerformance;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS

// const QualityPerformance = () => {
//   const [startDate, setStartDate] = useState(new Date()); // Default to today
//   const [endDate, setEndDate] = useState(new Date()); // Default to today for now, you can adjust this logic

//   return (
//     <div>
//       <div className="p-7">
//         <div>
//           <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//             Quality Performance
//           </h1>
//         </div>
//         <div className="flex justify-between mt-2 items-center">
//           <div className="flex gap-4 items-center ">
//             <p className={`text-sm  text-black font-semibold`}>
//               <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
//             </p>

//             {/* Date Pickers */}
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//               selectsStart
//               startDate={startDate}
//               endDate={endDate}
//               className="text-xs hover:cursor-pointer border rounded-md p-1"
//               dateFormat="dd/MM/yyyy"
//             />
//             <span>-</span>
//             <DatePicker
//               selected={endDate}
//               onChange={(date) => setEndDate(date)}
//               selectsEnd
//               startDate={startDate}
//               endDate={endDate}
//               minDate={startDate} // End date cannot be before start date
//               className="text-xs hover:cursor-pointer border rounded-md p-1"
//               dateFormat="dd/MM/yyyy"
//             />
//           </div>
//         </div>

//         <div className="mt-6">
//           <h1 className="font-semibold text-xl">Scrap</h1>
//           <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//             {data_1.map((item, index) => (
//               <div
//                 key={index} // Add a key for list items
//                 className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]"
//               >
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
//                   Increase by
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

//         <div className="mt-6">{/* <CustomerReturn /> */}</div>
//         <div className="mt-6">
//           <SupplierReturn />
//         </div>
//         <div className="mt-6 bg-white rounded-md shadow-sm">
//           <ScrapBar />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QualityPerformance;

const QualityPerformance = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [supplierReturnData, setSupplierReturnData] = useState([]);
  const [totalReturnQty, setTotalReturnQty] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchSupplierReturns = async () => {
    setLoading(true);
    setError(null);
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];

      const response = await fetch(
        `${BASE_URL}/api/admin/supplier-return?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setSupplierReturnData(result.data);
      setTotalReturnQty(result.totalReturnQuantity);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch supplier returns:", err);
    } finally {
      setLoading(false);
    }
  };

  // fetch data whenever dates change
  useEffect(() => {
    if (startDate && endDate) {
      fetchSupplierReturns();
    }
  }, [startDate, endDate]);
  console.log("supplierReturnDatasupplierReturnData", totalReturnQty);

  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Quality Performance
          </h1>
        </div>

        {/* Date Pickers */}
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <p className="text-sm text-black font-semibold">
              <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
            </p>

            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="text-xs hover:cursor-pointer border rounded-md p-1"
              dateFormat="dd/MM/yyyy"
            />
            <span>-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="text-xs hover:cursor-pointer border rounded-md p-1"
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>

        {/* Scrap section */}
        <div className="mt-6">
          <h1 className="font-semibold text-xl">Scrap</h1>
          <div className="flex flex-col md:flex-row  mt-2 gap-4">
            {data_1.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-between bg-white rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]"
              >
                <div className="flex items-center gap-2">
                  <img className="w-[40px]" src={item.scrap_img} alt="" />
                  <div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                    <p className="font-bold text-xl">{totalReturnQty}</p>
                  </div>
                </div>
                {/* <div>
                  <img src={item.scrap} alt="" />
                </div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Return with date props */}
        <div className="mt-6">
          <SupplierReturn
            data={supplierReturnData}
            loading={loading}
            error={error}
          />
        </div>

        <div className="mt-6 bg-white rounded-md shadow-sm">
          <ScrapBar supplierReturnData={supplierReturnData} />
        </div>
      </div>
    </div>
  );
};

export default QualityPerformance;
