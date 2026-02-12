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
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ReturnTable from "./ReturnTable";

const data_1 = [
  {
    num: "$5,00,000",
    text: "Scrap Quantity",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
  {
    num: "01",
    text: "Customer Return",
    img: img2,
    scrap: scrap_2,
    scrap_img: customer_return,
    increase: "+200",
    bgColor: "bg-green-50",
    textColor: "text-green-500",
  },
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
//   const [qualityData, setQualityData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     const fetchQualityData = async () => {
//       try {
//         const res = await fetch(
//           `${BASE_URL}/api/admin/quality-performance-data`
//         ); // Replace with your API
//         const data = await res.json();
//         if (data && data.data) {
//           setQualityData(data.data);
//         }
//       } catch (error) {
//         console.error("Error fetching quality performance:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQualityData();
//   }, []);

//   // Example: aggregate scrap and schedule quantities
//   const scrapSummary = qualityData.reduce(
//     (acc, item) => {
//       acc.totalScrap += item.scrapQuantity;
//       acc.totalSchedule += item.scheduleQuantity;
//       return acc;
//     },
//     { totalScrap: 0, totalSchedule: 0 }
//   );

//   if (loading) return <p>Loading...</p>;

//   console.log("scrapSummaryscrapSummary,scrapSummary", qualityData);

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

//             <div className="flex items-center gap-2">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date!)}
//                 dateFormat="dd/MM/yyyy"
//                 className="border rounded-md p-1 text-xs"
//               />
//               <span>-</span>
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date!)}
//                 dateFormat="dd/MM/yyyy"
//                 className="border rounded-md p-1 text-xs"
//               />
//             </div>
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

//         <div className="mt-6">
//           <SupplierReturn qualityData={qualityData} />
//         </div>
//         <div className="mt-6 bg-white rounded-md shadow-sm">
//           <ScrapBar qualityData={qualityData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QualityPerformance;

const QualityPerformance = () => {
  const [qualityData, setQualityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date(); // aaj ki date
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [totalData, setTotalData] = useState();
  const [customerReturns, setCustomerReturns] = useState([]);
  const [supplierReturns, setSupplierReturns] = useState([]);
  const fetchQualityData = async () => {
    try {
      setLoading(true);

      // query string build karo
      let query = "";
      if (startDate && endDate) {
        query = `?startDate=${startDate.toISOString().split("T")[0]}&endDate=${
          endDate.toISOString().split("T")[0]
        }`;
      }

      const res = await fetch(
        `${BASE_URL}/api/admin/quality-performance-data${query}`,
      );
      const data = await res.json();
      if (data && data.data) {
        setTotalData(data.totalScrapQty);
        setQualityData(data.data);
        setCustomerReturns(data.customerScrapDetails || []);
        setSupplierReturns(data.supplierScrapDetails || []);
      }
    } catch (error) {
      console.error("Error fetching quality performance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQualityData();
  }, [startDate, endDate]);

  const scrapSummary = qualityData.reduce(
    (acc, item) => {
      acc.totalScrap += item.scrapQuantity || 0;
      acc.totalSchedule += item.scheduleQuantity || 0;
      return acc;
    },
    { totalScrap: 0, totalSchedule: 0 },
  );

  if (loading) return <p>Loading...</p>;

  console.log("scrapSummary", totalData);

  const data_1 = [
    {
      num: totalData,
      text: "Scrap Quantity",
      img: img1,
      scrap: scrap_1,
      scrap_img: scrap_cost,
      // increase: "-$10k",
      bgColor: "bg-orange-50",
      textColor: "text-red-500",
    },
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
    // {
    //   num: "15,000",
    //   text: "Supplier Return",
    //   img: img3,
    //   scrap: scrap_3,
    //   scrap_img: supplier_return,
    //   increase: "+200",
    //   bgColor: "bg-blue-50",
    //   textColor: "text-green-500",
    // },
  ];
  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Quality Performance
          </h1>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <p className={`text-sm  text-black font-semibold`}>
              <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
            </p>

            <div className="flex items-center gap-2">
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
          </div>
        </div>

        <div className="mt-6">
          <h1 className="font-semibold text-xl">Scrap</h1>
          <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
            {data_1.map((item) => (
              <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
                <div className="flex items-center gap-2">
                  <div>
                    <img className="w-[40px]" src={item.scrap_img} alt="" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.text}</p>
                    <p className="font-bold text-xl">{item.num}</p>
                  </div>
                </div>
                {/* <div>
                  <img src={item.scrap} alt="" />
                </div> */}
                {/* <div className="text-sm text-gray-600">
                  Increase by{" "}
                  <span
                    className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
                  >
                    {item.increase}
                  </span>{" "}
                  this week
                </div> */}
              </div>
            ))}
          </div>
        </div>
        {/* Customer Return Table */}
        <ReturnTable
          title="Customer Return"
          data={customerReturns} // Yeh state API se aayegi
          nameLabel="Customer Name"
        />

        {/* Supplier Return Table */}
        <ReturnTable
          title="Supplier Return"
          data={supplierReturns} // Yeh state API se aayegi
          nameLabel="Customer Name" // Screenshot mein dono jagah Customer Name hi likha hai
        />
        <div className="mt-6">
          <SupplierReturn qualityData={qualityData} />
        </div>
        <div className="mt-6 bg-white rounded-md shadow-sm">
          <ScrapBar qualityData={qualityData} />
        </div>
      </div>
    </div>
  );
};

export default QualityPerformance;
