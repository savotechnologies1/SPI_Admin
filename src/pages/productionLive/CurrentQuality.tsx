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
import ScrapBar from "./ScrapBar";
import MultiLineChart from "./MultiLineChart";
import DatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Calendar, Info } from "lucide-react";

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
  // 1. Initialize with current date instead of ""
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [summary, setSummary] = useState({
    totalActual: 0,
    totalScrap: 0,
    totalScheduled: 0,
  });
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};

      // Safe Date Check
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await axios.get(
        `${BASE_URL}/api/admin/current-status-overview`,
        { params },
      );

      // Handle response structure
      if (response.data.summary) {
        setSummary(response.data.summary);
        setDetails(response.data.details || []);
      } else {
        setDetails(response.data || []);
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

  const statsData = [
    {
      title: "Production Progress",
      value: `${summary.totalActual} / ${summary.totalScheduled}`,
      subText: "Actual vs Scheduled",
      percentage:
        summary.totalScheduled > 0
          ? ((summary.totalActual / summary.totalScheduled) * 100).toFixed(1) +
            "%"
          : "0%",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Scrap",
      value: summary.totalScrap || "0",
      subText: "Total Quantity",
      percentage:
        summary.totalActual > 0
          ? (
              (summary.totalScrap /
                (summary.totalActual + summary.totalScrap)) *
              100
            ).toFixed(1) + "% Rate"
          : "0% Rate",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-5">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Current Quality Performance
          </h1>
        </div>

        {/* Date Filter Bar */}
        <div className="flex items-center bg-white shadow-sm border rounded-lg px-3 py-2 gap-2">
          <Calendar size={18} className="text-gray-400" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-24 text-sm outline-none cursor-pointer"
            placeholderText="Start Date"
          />
          <span className="text-gray-300">|</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            className="w-24 text-sm outline-none cursor-pointer"
            placeholderText="End Date"
          />
          {loading && (
            <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statsData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              {item.title}
            </p>
            <div className="flex justify-between items-end mt-2">
              <h2 className="text-3xl font-bold text-gray-800">{item.value}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${item.bg} ${item.color}`}
              >
                {item.percentage}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{item.subText}</p>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ScrapBar apiData={details} />
      </div>
    </div>
  );
};

export default CurrentQuality;
