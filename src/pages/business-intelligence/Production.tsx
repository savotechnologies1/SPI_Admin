// import scrap_cost from "../../assets/scrap_cost.png";
// import supplier_return from "../../assets/supplier_return.png";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// const Production = () => {
//   const [chartData, setChartData] = useState<any[]>([]);
//   const [totals, setTotals] = useState({
//     totalCompleted: 0,
//     totalScrapCost: 0,
//     totalSupplierReturnCost: 0,
//   });

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
//   const selectedYear = new Date().getFullYear();
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;
//   const generateFullMonthData = (
//     apiData: any[],
//     month: number,
//     year: number,
//   ) => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const fullMonthArray = [];

//     for (let day = 1; day <= daysInMonth; day++) {
//       const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
//       const found = apiData.find((item) => item.date === dateStr);

//       fullMonthArray.push({
//         day: String(day),
//         completed: found ? found.completed : 0,
//       });
//     }
//     return fullMonthArray;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const firstDay = new Date(selectedYear, selectedMonth, 1)
//         .toISOString()
//         .split("T")[0];
//       const lastDay = new Date(selectedYear, selectedMonth + 1, 0)
//         .toISOString()
//         .split("T")[0];
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/production-efficiency`,
//           {
//             params: { startDate: firstDay, endDate: lastDay },
//           },
//         );
//         const formattedGraphData = generateFullMonthData(
//           res.data.data,
//           selectedMonth,
//           selectedYear,
//         );
//         setChartData(formattedGraphData);
//         setTotals(res.data.totals);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [selectedMonth, BASE_URL]);

//   const data = {
//     labels: chartData.map((item) => item.day),
//     datasets: [
//       {
//         label: "Completed Quantity",
//         data: chartData.map((item) => item.completed),
//         borderColor: "#052C89",
//         backgroundColor: "rgba(5, 44, 137, 0.1)",
//         fill: true,
//         tension: 0.4,
//         pointBackgroundColor: "#052C89",
//         pointRadius: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: { stepSize: 1 },
//         title: { display: true, text: "Quantity" },
//       },
//       x: {
//         title: { display: true, text: "Day of Month" },
//       },
//     },
//     plugins: {
//       legend: { position: "top" as const },
//     },
//   };

//   const totalsCards = [
//     {
//       text: "Total Completed",
//       num: totals.totalCompleted || 0,
//       img: scrap_cost,
//     },
//     {
//       text: "Total Scrap Cost",
//       num: `$${totals.totalScrapCost || 0}`,
//       img: scrap_cost,
//     },
//     {
//       text: "Total Supplier Return",
//       num: `$${totals.totalSupplierReturnCost || 0}`,
//       img: supplier_return,
//     },
//   ];

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <h1 className="font-semibold text-2xl text-gray-800">
//           Production Dashboard
//         </h1>

//         <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
//           <label className="text-sm font-bold text-gray-500 uppercase">
//             Select Month:
//           </label>
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//             className="text-sm font-semibold outline-none bg-transparent cursor-pointer text-blue-800"
//           >
//             {[
//               "January",
//               "February",
//               "March",
//               "April",
//               "May",
//               "June",
//               "July",
//               "August",
//               "September",
//               "October",
//               "November",
//               "December",
//             ].map((m, i) => (
//               <option key={i} value={i}>
//                 {m}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {totalsCards.map((item, index) => (
//           <div
//             key={index}
//             className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
//           >
//             <div className="p-3 bg-blue-50 rounded-lg">
//               <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500 font-medium">{item.text}</p>
//               <p className="font-bold text-2xl text-gray-800">{item.num}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="p-6 bg-white shadow-sm rounded-xl border border-gray-100">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-bold text-gray-700">
//             Daily Production Trend
//           </h2>
//           <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
//             {selectedYear}
//           </span>
//         </div>
//         <div className="w-full h-[400px]">
//           <Line data={data} options={options as any} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Production;
import scrap_cost from "../../assets/scrap_cost.png";
import supplier_return from "../../assets/supplier_return.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering components only once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Production = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [totals, setTotals] = useState({
    totalCompleted: 0,
    totalScrapCost: 0,
    totalSupplierReturn: 0, // 'Cost' word hata diya backend se match karne ke liye
  });

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 7 }, (_, i) => currentYear - 5 + i);

  const generateFullMonthData = (
    apiData: any[],
    month: number,
    year: number,
  ) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const fullMonthArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day,
      ).padStart(2, "0")}`;
      const found = apiData.find((item) => item.date === dateStr);

      fullMonthArray.push({
        day: String(day),
        completed: found ? found.completed : 0,
      });
    }
    return fullMonthArray;
  };
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/production-efficiency`,
        {
          params: {
            month: selectedMonth + 1, // selectedMonth 0-indexed hota hai, hume 1-12 chahiye
            year: selectedYear,
          },
        },
      );

      // Graph Data formatting
      const formattedGraphData = generateFullMonthData(
        res.data.data,
        selectedMonth,
        selectedYear,
      );

      setChartData(formattedGraphData);
      setTotals(res.data.totals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedYear, BASE_URL]); // dependency array mein dono rakhein
  const data = {
    labels: chartData.map((item) => item.day),
    datasets: [
      {
        label: "Completed Quantity",
        data: chartData.map((item) => item.completed),
        borderColor: "#052C89",
        backgroundColor: "rgba(5, 44, 137, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#052C89",
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Qty" } },
      x: { title: { display: true, text: "Day of Month" } },
    },
    plugins: {
      legend: { display: false },
    },
  };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: { stepSize: 1 },
  //       title: { display: true, text: "Quantity" },
  //     },
  //     x: {
  //       title: { display: true, text: "Day of Month" },
  //     },
  //   },
  //   plugins: {
  //     legend: { position: "top" as const },
  //   },
  // };
  const totalsCards = [
    {
      text: "Total Completed",
      num: totals.totalCompleted || 0,
    },
    {
      text: "Total Scrap Cost",
      num: `$${totals.totalScrapCost || 0}`, // Backend key 'totalScrapCost' hai (Sahi hai)
    },
    {
      text: "Total Supplier Return",
      // FIXED: Yahan 'totalSupplierReturnCost' ki jagah 'totalSupplierReturn' karein
      num: `$${totals.totalSupplierReturn || 0}`,
    },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="font-semibold text-2xl text-gray-800">
          Production Dashboard
        </h1>

        <div className="flex items-center gap-3 bg-white p-2 px-4 rounded-lg shadow-sm border border-gray-200">
          {/* Month Selector */}
          <div className="flex items-center gap-2 border-r pr-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase">
              Month
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="text-sm font-semibold outline-none bg-transparent cursor-pointer text-blue-800"
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((m, i) => (
                <option key={i} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Year Selector Added */}
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="text-sm font-semibold outline-none bg-transparent cursor-pointer text-blue-800"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Totals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {totalsCards.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4"
          >
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-200 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.text}</p>
              <p className="font-bold text-2xl text-gray-800">{item.num}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Section */}
      <div className="p-6 bg-white shadow-sm rounded-xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-700">
            Daily Production Trend
          </h2>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600 text-white">
            {new Intl.DateTimeFormat("en-US", { month: "long" }).format(
              new Date(selectedYear, selectedMonth),
            )}{" "}
            {selectedYear}
          </span>
        </div>
        <div className="w-full h-[400px]">
          <Line data={data} options={options as any} />
        </div>
      </div>
    </div>
  );
};

export default Production;
