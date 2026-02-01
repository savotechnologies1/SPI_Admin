// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { useEffect, useState } from "react";
// import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // const CycleTime = () => {
// //   const data = {
// //     labels: ["Sanding", "Inspection", "CutTrim", "Termoforming", "Technology"],
// //     datasets: [
// //       {
// //         label: "Manual CT",
// //         data: [10, 6, 8, 0, 0],
// //         backgroundColor: "rgba(214, 69, 80, 1)",
// //         borderColor: "rgba(214, 69, 80, 1)",
// //         borderWidth: 1,
// //       },
// //       {
// //         label: "Calculated ideal CT",
// //         data: [0, 0, 0, 9, 11],
// //         backgroundColor: "rgba(230, 143, 150, 1)",
// //         borderColor: "rgba(230, 143, 150, 1)",
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false, // Allows chart to stretch vertically
// //     plugins: {
// //       legend: {
// //         position:
// //           window.innerWidth < 768 ? "bottom" : ("top" as "bottom" | "top"),
// //         labels: {
// //           usePointStyle: true,
// //           boxWidth: 8,
// //           padding: 10,
// //           font: {
// //             size: window.innerWidth < 768 ? 10 : 12,
// //           },
// //         },
// //       },
// //       title: {
// //         display: false,
// //       },
// //       tooltip: {
// //         bodyFont: {
// //           size: window.innerWidth < 768 ? 10 : 12,
// //         },
// //         titleFont: {
// //           size: window.innerWidth < 768 ? 12 : 14,
// //         },
// //       },
// //     },
// //     scales: {
// //       x: {
// //         beginAtZero: true,
// //         grid: {
// //           display: false,
// //         },
// //         ticks: {
// //           font: {
// //             size: window.innerWidth < 768 ? 10 : 12,
// //           },
// //         },
// //       },
// //       y: {
// //         beginAtZero: true,
// //         ticks: {
// //           font: {
// //             size: window.innerWidth < 768 ? 10 : 12,
// //           },
// //           stepSize: 2,
// //         },
// //         title: {
// //           display: true,
// //           text: "Cycle Time (seconds)",
// //           font: {
// //             size: window.innerWidth < 768 ? 12 : 14,
// //           },
// //         },
// //       },
// //     },
// //     barPercentage: window.innerWidth < 768 ? 0.6 : 0.8, // Thinner bars on mobile
// //     categoryPercentage: window.innerWidth < 768 ? 0.7 : 0.9,
// //   };

// //   return (
// //     <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm">
// //       <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
// //         Cycle Time Comparison
// //       </h1>
// //       <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
// //         <Bar data={data} options={options} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default CycleTime;

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface CycleTimeData {
//   processName: string;
//   manualCT: number;
//   idealCT: number;
// }

// const CycleTime = () => {
//   const [chartData, setChartData] = useState<CycleTimeData[]>([]);
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");

//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   // default date = aaj
//   useEffect(() => {
//     const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
//     setStartDate(today);
//     setEndDate(today);
//   }, []);

//   const fetchData = async (sDate: string, eDate: string) => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=${sDate}&endDate=${eDate}`
//       );
//       setChartData(response.data.data);
//     } catch (error) {
//       console.error("Error fetching cycle time data:", error);
//     }
//   };

//   // jab startDate/endDate change ho to API call
//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchData(startDate, endDate);
//     }
//   }, [startDate, endDate]);

//   const data = {
//     labels: chartData.map((item) => item.processName),
//     datasets: [
//       {
//         label: "Manual CT",
//         data: chartData.map((item) => item.manualCT),
//         backgroundColor: "rgba(214, 69, 80, 1)",
//         borderColor: "rgba(214, 69, 80, 1)",
//         borderWidth: 1,
//         maxBarThickness: 90,
//       },
//       {
//         label: "Calculated ideal CT",
//         data: chartData.map((item) => item.idealCT),
//         backgroundColor: "rgba(230, 143, 150, 1)",
//         borderColor: "rgba(230, 143, 150, 1)",
//         borderWidth: 1,
//         maxBarThickness: 90,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position:
//           window.innerWidth < 768 ? "bottom" : ("top" as "bottom" | "top"),
//         labels: {
//           usePointStyle: true,
//           boxWidth: 8,
//           padding: 10,
//           font: { size: window.innerWidth < 768 ? 10 : 12 },
//         },
//       },
//       tooltip: {
//         bodyFont: { size: window.innerWidth < 768 ? 10 : 12 },
//         titleFont: { size: window.innerWidth < 768 ? 12 : 14 },
//       },
//     },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: { font: { size: window.innerWidth < 768 ? 10 : 12 } },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           font: { size: window.innerWidth < 768 ? 10 : 12 },
//           stepSize: 2,
//         },
//         title: {
//           display: true,
//           text: "Cycle Time (minutes)",
//           font: { size: window.innerWidth < 768 ? 12 : 14 },
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm">
//       <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
//         Cycle Time Comparison
//       </h1>

//       {/* Date Filters */}
//       <div className="flex gap-2 mb-4">
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//         <input
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className="border px-2 py-1 rounded"
//         />
//       </div>

//       <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default CycleTime;

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// const CycleTime = () => {
//   const data = {
//     labels: ["Sanding", "Inspection", "CutTrim", "Termoforming", "Technology"],
//     datasets: [
//       {
//         label: "Manual CT",
//         data: [10, 6, 8, 0, 0],
//         backgroundColor: "rgba(214, 69, 80, 1)",
//         borderColor: "rgba(214, 69, 80, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position:
//           window.innerWidth < 768 ? "bottom" : ("top" as "bottom" | "top"),
//         labels: {
//           usePointStyle: true,
//           boxWidth: 8,
//           padding: 10,
//           font: {
//             size: window.innerWidth < 768 ? 10 : 12,
//           },
//         },
//       },
//       title: {
//         display: false, // Removed as we have our own title
//       },
//       tooltip: {
//         bodyFont: {
//           size: window.innerWidth < 768 ? 10 : 12,
//         },
//         titleFont: {
//           size: window.innerWidth < 768 ? 12 : 14,
//         },
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         grid: {
//           display: false,
//         },
//         ticks: {
//           font: {
//             size: window.innerWidth < 768 ? 10 : 12,
//           },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           font: {
//             size: window.innerWidth < 768 ? 10 : 12,
//           },
//           stepSize: 2,
//         },
//         title: {
//           display: true,
//           text: "Cycle Time (seconds)",
//           font: {
//             size: window.innerWidth < 768 ? 12 : 14,
//           },
//         },
//       },
//     },
//     barPercentage: window.innerWidth < 768 ? 0.6 : 0.8,
//     categoryPercentage: window.innerWidth < 768 ? 0.7 : 0.9,
//   };

//   return (
//     <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm mt-7">
//       <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
//         Cycle Time Comparison
//       </h1>
//       <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
//         <Bar data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default CycleTime;
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";
// import { Bar } from "react-chartjs-2";

// const BASE_URL = import.meta.env.VITE_SERVER_URL;

// const CycleTime = ({ partId }: { partId: string }) => {
//   const [chartData, setChartData] = useState<any>(null);

//   useEffect(() => {
//     if (partId) fetchCycleTimeData(partId);
//   }, [partId]);

//   const fetchCycleTimeData = async (partId: string) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/frontLine/cycle-time-comparision-data?startDate=2026-09-01&endDate=2026-09-12&partId=${partId}`
//       );

//       const apiData = res.data.data.processWiseCT;

//       setChartData({
//         labels: apiData.map((item: any) => item.processName),
//         datasets: [
//           {
//             label: "Manual CT",
//             data: apiData.map((item: any) => item.manualCT),
//             backgroundColor: "rgba(214, 69, 80, 1)",
//             maxBarThickness: 50, // Responsive bar thickness
//           },
//           {
//             label: "Ideal CT",
//             data: apiData.map((item: any) => item.idealCT),
//             backgroundColor: "rgba(34, 197, 94, 1)",
//             maxBarThickness: 50,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching cycle time data:", error);
//     }
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: { legend: { position: "top" as const } },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: "Cycle Time (minutes)" },
//       },
//     },
//   };

//   return (
//     <div className="w-full mx-auto p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-sm mt-6 sm:mt-7">
//       <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
//         Cycle Time Comparison
//       </h1>

//       {/* CHART WRAPPER HEIGHT RESPONSIVE */}
//       <div className="w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[450px]">
//         {chartData ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CycleTime;

// Chart.js components ko register karna zaroori hai agar pehle nahi kiya

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const CycleTime = ({ partId }: { partId: string }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Dynamic Dates State (Default: Pichle 7 din)
  const [startDate, setStartDate] = useState<Date | null>(
    subDays(new Date(), 7),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // Jab partId, startDate ya endDate change ho, data fetch karein
  useEffect(() => {
    if (partId && startDate && endDate) {
      fetchCycleTimeData(partId, startDate, endDate);
    }
  }, [partId, startDate, endDate]);

  const fetchCycleTimeData = async (pId: string, start: Date, end: Date) => {
    try {
      setLoading(true);

      // Date format: YYYY-MM-DD
      const formattedStart = format(start, "yyyy-MM-dd");
      const formattedEnd = format(end, "yyyy-MM-dd");

      const res = await axios.get(
        `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=${formattedStart}&endDate=${formattedEnd}&partId=${pId}`,
      );

      const apiData = res.data.data.processWiseCT;

      setChartData({
        labels: apiData.map(
          (item: any) => `${item.processName} (${item.machineName})`,
        ),
        datasets: [
          {
            label: "Manual CT",
            data: apiData.map((item: any) => item.manualCT),
            backgroundColor: "rgba(214, 69, 80, 1)",
            maxBarThickness: 50,
          },
          {
            label: "Ideal CT",
            data: apiData.map((item: any) => item.idealCT),
            backgroundColor: "rgba(34, 197, 94, 1)",
            maxBarThickness: 50,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching cycle time data:", error);
    } finally {
      setLoading(false);
    }
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { 
    legend: { position: "top" as const },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ${context.parsed.y} min`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: { display: true, text: "Cycle Time (minutes)" },
    },
  },
};

  return (
    <div className="w-full mx-auto p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-sm mt-6 sm:mt-7">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Cycle Time Comparison
        </h1>

        {/* DATE PICKERS SECTION */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs text-gray-500 mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
            />
          </div>
        </div>
      </div>

      {/* CHART WRAPPER */}
      <div className="w-full h-[260px] sm:h-[320px] md:h-[400px] lg:h-[450px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
            <p className="text-gray-500 font-medium">Updating Chart...</p>
          </div>
        ) : null}

        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">
              No data available for the selected range.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CycleTime;
