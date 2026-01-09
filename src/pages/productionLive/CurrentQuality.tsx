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
import CustomerReturn from "./CustomerReturn";
import SupplierReturn from "./SupplierReturn";
import ScrapBar from "./ScrapBar";
import MultiLineChart from "./MultiLineChart";
import DatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const data_1 = [
  {
    num: "1",
    text: "shift",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
  {
    num: "129",
    text: "Actual",
    img: img2,
    scrap: scrap_2,
    scrap_img: customer_return,
    increase: "+200",
    bgColor: "bg-green-50",
    textColor: "text-green-500",
  },
  {
    num: "1",
    text: "Scrap",
    img: img3,
    scrap: scrap_3,
    scrap_img: supplier_return,
    increase: "+200",
    bgColor: "bg-brand-50",
    textColor: "text-green-500",
  },
];

// const CurrentQuality = () => {
//   return (
//     <div>
//       <div className="p-7">
//         <div>
//           <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//             Current Quality Performance
//           </h1>
//         </div>
//         <div className="flex justify-between mt-2 items-center">
//           <div className="flex gap-4 items-center ">
//             <p className={`text-sm  text-black font-semibold`}>
//               <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
//             </p>
//             <DatePicker></DatePicker>
//             <span>-</span>
//             <DatePicker></DatePicker>
//           </div>
//         </div>

//         <div className="mt-6">
//           <h1 className="font-semibold text-xl">Scrap</h1>
//           <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
//             {data_1.map((item) => (
//               <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border">
//                 <div className="flex items-center gap-2">
//                   <div>
//                     <img className="w-[40px]" src={item.scrap_img} alt="" />
//                   </div>
//                   <div className="">
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
//                     {item.increase}
//                   </span>
//                   this week
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {/*
//         <div className="mt-6">
//           <CustomerReturn />
//         </div>
//         <div className="mt-6">
//           <SupplierReturn />
//         </div> */}
//         <div className="mt-6 bg-white rounded-md shadow-sm">
//           <ScrapBar />
//         </div>

//         {/* <div className=" bg-white p-4 mt-6 ">
//           <div className="mt-6 bg-white rounded-md shadow  ">
//             <MultiLineChart />
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default CurrentQuality;

// --- SCRAP BAR COMPONENT (Child) ---

// --- MAIN CURRENT QUALITY COMPONENT (Parent) ---
const CurrentQuality = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [summary, setSummary] = useState({
    totalActual: 0,
    totalScrap: 0,
    totalScheduled: 0,
    count: 0,
  });
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // API Fetch Function
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/admin/current-status-overview`,
        {
          params: { startDate, endDate },
        }
      );

      // Maan lijiye backend return karta hai: { summary: {...}, details: [...] }
      if (response.data.summary) {
        setSummary(response.data.summary);
        setDetails(response.data.details);
      } else {
        // Fallback agar backend purana format bhej raha ho
        setDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, BASE_URL]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Data for the 3 Cards
  const statsData = [
    {
      num: summary.count || "0",
      text: "Total Processes",
      // img: img1, // Apne images use karein
      increase: "Live",
      bgColor: "bg-orange-50",
      textColor: "text-orange-500",
    },
    {
      num: `${summary.totalActual} / ${summary.totalScheduled}`,
      text: "Actual / Scheduled",
      // img: img2,
      increase:
        summary.totalScheduled > 0
          ? ((summary.totalActual / summary.totalScheduled) * 100).toFixed(1) +
            "%"
          : "0%",
      bgColor: "bg-green-50",
      textColor: "text-green-500",
    },
    {
      num: summary.totalScrap || "0",
      text: "Total Scrap",
      // img: img3,
      increase:
        summary.totalActual > 0
          ? ((summary.totalScrap / summary.totalActual) * 100).toFixed(1) + "%"
          : "0%",
      bgColor: "bg-brand-50",
      textColor: "text-red-500",
    },
  ];

  return (
    <div className="p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Current Quality Performance
        </h1>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap justify-between mt-4 items-center gap-4">
        <div className="flex gap-4 items-center">
          <p className="text-sm text-black font-semibold">
            <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
          </p>
          <div className="flex items-center gap-2">
            <input
              type="date"
              className="border p-2 rounded-md text-sm shadow-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <span className="font-bold">-</span>
            <input
              type="date"
              className="border p-2 rounded-md text-sm shadow-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {loading && (
            <span className="text-xs text-blue-500 animate-pulse">
              Loading...
            </span>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-6">
        <h1 className="font-semibold text-xl mb-4">Quality Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statsData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between bg-white rounded-md p-4 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${item.bgColor}`}>
                  {/* <img className="w-[30px]" src={item.scrap_img} alt="" /> */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 ${item.textColor}`}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase font-medium">
                    {item.text}
                  </p>
                  <p className="font-bold text-2xl">{item.num}</p>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-600 border-t pt-2">
                Performance:
                <span
                  className={`ml-2 font-bold px-2 py-0.5 rounded ${item.bgColor} ${item.textColor}`}
                >
                  {item.increase}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrap Bar Chart */}
      <div className="mt-8 bg-white rounded-md shadow-md border">
        <ScrapBar startDate={startDate} endDate={endDate} apiData={details} />
      </div>
    </div>
  );
};

export default CurrentQuality;
