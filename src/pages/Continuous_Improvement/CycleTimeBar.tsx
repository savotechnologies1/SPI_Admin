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
//       {
//         label: "Calculated ideal CT",
//         data: [0, 0, 0, 9, 11],
//         backgroundColor: "rgba(230, 143, 150, 1)",
//         borderColor: "rgba(230, 143, 150, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false, // Allows chart to stretch vertically
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
//         display: false,
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
//     barPercentage: window.innerWidth < 768 ? 0.6 : 0.8, // Thinner bars on mobile
//     categoryPercentage: window.innerWidth < 768 ? 0.7 : 0.9,
//   };

//   return (
//     <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm">
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

import React, { useEffect, useState } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CycleTimeData {
  processName: string;
  manualCT: number;
  idealCT: number;
}

const CycleTime = () => {
  const [chartData, setChartData] = useState<CycleTimeData[]>([]);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startDate = "2025-09-01"; // example, can be dynamic
        const endDate = "2025-09-05"; // example, can be dynamic
        const response = await axios.get(
          `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=${startDate}&endDate=${endDate}`
        );
        setChartData(response.data.data);
      } catch (error) {
        console.error("Error fetching cycle time data:", error);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.processName),
    datasets: [
      {
        label: "Manual CT",
        data: chartData.map((item) => item.manualCT),
        backgroundColor: "rgba(214, 69, 80, 1)",
        borderColor: "rgba(214, 69, 80, 1)",
        borderWidth: 1,
        maxBarThickness: 90, // Set maximum bar thickness in pixels
      },
      {
        label: "Calculated ideal CT",
        data: chartData.map((item) => item.idealCT),
        backgroundColor: "rgba(230, 143, 150, 1)",
        borderColor: "rgba(230, 143, 150, 1)",
        borderWidth: 1,
        maxBarThickness: 90, // Set maximum bar thickness in pixels
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position:
          window.innerWidth < 768 ? "bottom" : ("top" as "bottom" | "top"),
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          padding: 10,
          font: {
            size: window.innerWidth < 768 ? 10 : 12,
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        bodyFont: { size: window.innerWidth < 768 ? 10 : 12 },
        titleFont: { size: window.innerWidth < 768 ? 12 : 14 },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { font: { size: window.innerWidth < 768 ? 10 : 12 } },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: window.innerWidth < 768 ? 10 : 12 },
          stepSize: 2,
        },
        title: {
          display: true,
          text: "Cycle Time (minutes)",
          font: { size: window.innerWidth < 768 ? 12 : 14 },
        },
      },
    },
    barPercentage: window.innerWidth < 768 ? 0.6 : 0.8,
    categoryPercentage: window.innerWidth < 768 ? 0.7 : 0.9,
  };

  return (
    <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
        Cycle Time Comparison
      </h1>
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CycleTime;
