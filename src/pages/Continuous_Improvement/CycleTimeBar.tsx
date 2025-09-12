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
  Legend
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
// import { Bar } from "react-chartjs-2";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const CycleTime = ({ partId }: { partId: string }) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (partId) fetchCycleTimeData(partId);
  }, [partId]);

  const fetchCycleTimeData = async (partId: string) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=2025-09-01&endDate=2025-09-12&partId=${partId}`
      );

      console.log("res.datares.data", res.data);

      const apiData = res.data.data.processWiseCT;
      setChartData({
        labels: apiData.map((item: any) => item.processName),
        datasets: [
          {
            label: "Manual CT",
            data: apiData.map((item: any) => item.manualCT),
            backgroundColor: "rgba(214, 69, 80, 1)",
            maxBarThickness: 90, // Set maximum bar thickness in pixels
          },
          {
            label: "Ideal CT",
            data: apiData.map((item: any) => item.idealCT),
            backgroundColor: "rgba(34, 197, 94, 1)",
            maxBarThickness: 90, // Set maximum bar thickness in pixels
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching cycle time data:", error);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" as const } },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Cycle Time (minutes)" },
      },
    },
  };

  return (
    <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm mt-7">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
        Cycle Time Comparison
      </h1>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CycleTime;
