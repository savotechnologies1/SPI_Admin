// import img1 from "../../assets/green.png";
// import img2 from "../../assets/yellow.png";
// import img3 from "../../assets/orange.png";
// import scrap_1 from "../../assets/scrap_1.png";
// import scrap_2 from "../../assets/scrap_2.png";
// import scrap_3 from "../../assets/scrap_3.png";
// import scrap_cost from "../../assets/scrap_cost.png";
// import customer_return from "../../assets/customer_return.png";
// import supplier_return from "../../assets/supplier_return.png";
// import shape_2 from "../../assets/shape_2.png";
// import shape_3 from "../../assets/shape_3.png";
// import green from "../../assets/green.png";
// import orange from "../../assets/orange.png";
// import Tables from "./Tables";

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
// const data_2 = [
//   {
//     num: "129",
//     text: "Actual",
//     img: green,
//     shape: shape_2,
//   },
//   {
//     num: "1",
//     text: "Scrap",
//     img: orange,
//     shape: shape_3,
//   },
// ];

// const BusinessAnalysis = () => {
//   return (
//     <div className="p-7">
//       <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//         Business Analysis
//       </h1>
//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center ">
//           <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
//             Operational Performance:
//           </span>

//           <span className="text-xs sm:text-[16px] hover:cursor-pointer">
//             25/11/2025 (3:19 PM)
//           </span>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h1 className="font-semibold text-xl">Scrap</h1>
//         <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//           {data_1.map((item) => (
//             <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
//               <div className="flex items-center gap-2">
//                 <div>
//                   <img className="w-[40px]" src={item.scrap_img} alt="" />
//                 </div>
//                 <div className="">
//                   <p className="text-sm text-gray-600">{item.text}</p>
//                   <p className="font-bold text-xl">{item.num}</p>
//                 </div>
//               </div>
//               <div>
//                 <img src={item.scrap} alt="" />
//               </div>
//               <div className="text-sm text-gray-600">
//                 Increase by
//                 <span
//                   className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
//                 >
//                   {item.increase}
//                 </span>
//                 this week
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//         {data_2.map((item) => (
//           <div className="flex justify-between items-center bg-white  rounded-md  w-full">
//             <div className="p-2">
//               <p className="font-bold text-2xl">{item.num}</p>
//               <p>{item.text}</p>
//             </div>
//             <div className="relative right-0">
//               <img className="w-14" src={item.shape} alt="" />
//               <div className="absolute right-2 top-4">
//                 <img src={item.img} alt="" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Tables />
//     </div>
//   );
// };

// export default BusinessAnalysis;

// const BusinessAnalysis = () => {
//   const [metrics, setMetrics] = useState(null);

//   useEffect(() => {
//     // Replace with your actual API endpoint
//     fetch(
//       "http://localhost:8080/api/admin/business-analysis?startDate=2025-11-01&endDate=2025-12-15"
//     )
//       .then((res) => res.json())
//       .then((data) => setMetrics(data))
//       .catch((err) => console.error(err));
//   }, []);

//   if (!metrics) return <div>Loading...</div>;

//   // Dynamically create data arrays
//   const data_1 = [
//     {
//       num: `$${metrics.ScrapCost}`,
//       text: "Scrap Cost",
//       scrap_img: scrap_cost,
//       scrap: scrap_1,
//       increase: "-$10k", // You can calculate dynamically later
//       bgColor: "bg-orange-50",
//       textColor: "text-red-500",
//     },
//     {
//       num: `$${metrics.SupplierReturnCost}`,
//       text: "Supplier Return",
//       scrap_img: supplier_return,
//       scrap: scrap_3,
//       increase: "+200", // You can calculate dynamically later
//       bgColor: "bg-blue-50",
//       textColor: "text-green-500",
//     },
//     // You can uncomment Customer Return if needed
//     // {
//     //   num: `$${metrics.CustomerReturnCost}`,
//     //   text: "Customer Return",
//     //   scrap_img: customer_return,
//     //   scrap: scrap_2,
//     //   increase: "+200",
//     //   bgColor: "bg-green-50",
//     //   textColor: "text-green-500",
//     // },
//   ];

//   const data_2 = [
//     {
//       num: `$${metrics.COGS}`,
//       text: "Actual Cost",
//       img: green,
//       shape: shape_2,
//     },
//     {
//       num: `$${metrics.ScrapCost}`,
//       text: "Scrap",
//       img: orange,
//       shape: shape_3,
//     },
//   ];

//   return (
//     <div className="p-7">
//       <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//         Business Analysis
//       </h1>

//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center ">
//           <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
//             Operational Performance:
//           </span>
//           <span className="text-xs sm:text-[16px] hover:cursor-pointer">
//             25/11/2025 (3:19 PM)
//           </span>
//         </div>
//       </div>

//       {/* Scrap / Supplier / Customer Return Cards */}
//       <div className="mt-6">
//         <h1 className="font-semibold text-xl">Scrap</h1>
//         <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//           {data_1.map((item, idx) => (
//             <div
//               key={idx}
//               className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]"
//             >
//               <div className="flex items-center gap-2">
//                 <div>
//                   <img className="w-[40px]" src={item.scrap_img} alt="" />
//                 </div>
//                 <div className="">
//                   <p className="text-sm text-gray-600">{item.text}</p>
//                   <p className="font-bold text-xl">{item.num}</p>
//                 </div>
//               </div>
//               <div>
//                 <img src={item.scrap} alt="" />
//               </div>
//               <div className="text-sm text-gray-600">
//                 Increase by
//                 <span
//                   className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
//                 >
//                   {item.increase}
//                 </span>
//                 this week
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//         {data_2.map((item, idx) => (
//           <div
//             key={idx}
//             className="flex justify-between items-center bg-white  rounded-md  w-full"
//           >
//             <div className="p-2">
//               <p className="font-bold text-2xl">{item.num}</p>
//               <p>{item.text}</p>
//             </div>
//             <div className="relative right-0">
//               <img className="w-14" src={item.shape} alt="" />
//               <div className="absolute right-2 top-4">
//                 <img src={item.img} alt="" />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Tables metrics={metrics} />
//     </div>
//   );
// };

// export default BusinessAnalysis;
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Tables from "./Tables";
import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";
import green from "../../assets/green.png";
import orange from "../../assets/orange.png";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
// Dummy icons/images imports retained if needed for other parts of app,
// but unused in this specific excel-view
// import scrap_cost from "../assets/scrap_cost.png";

const BusinessAnalysis = () => {
  const [metrics, setMetrics] = useState(null);

  // 🔹 Date states
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30))
  );
  const [endDate, setEndDate] = useState(new Date());

  // 🔹 Format date for backend (YYYY-MM-DD)
  const formatDate = (date) => date.toISOString().split("T")[0];

  // 🔹 Fetch metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/admin/business-analysis?startDate=${formatDate(
            startDate
          )}&endDate=${formatDate(endDate)}`
        );
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("API Error:", error);

        // Fallback dummy data for visualization if API fails
        setMetrics({
          totalRevenue: 175592.0,
          totalCOGS: 118212.3,
          totalFixedCost: 97232.88,
          Profit: -39853.18,
          InventoryCost: -8916.98,
          scrapCost: 1509.7,
          bomCost: 70842.6,
          laborCost: 45860.0,
          supplierReturn: 0,
        });
      }
    };

    if (startDate && endDate) {
      fetchMetrics();
    }
  }, [startDate, endDate]);

  if (!metrics) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-7 bg-gray-50 min-h-screen">
      {/* 🔹 Header + Date Picker */}
      <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center">
        <h1 className="font-bold text-[24px] text-black">Business Analysis</h1>

        <div className="flex gap-4 items-center mt-2 md:mt-0">
          <div className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              className="outline-none text-sm w-24 text-center cursor-pointer"
            />
            <span className="text-gray-400">|</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              className="outline-none text-sm w-24 text-center cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 🔹 Main Content Area - replicating the Excel Layout */}
      <div className="bg-white border border-gray-300 shadow-lg p-8 max-w-5xl mx-auto min-h-[600px]">
        <Tables metrics={metrics} />
      </div>
    </div>
  );
};

export default BusinessAnalysis;
