// SalesChart.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

// const Chart = () => {
//   const data = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ], // X-axis labels
//     datasets: [
//       {
//         label: "Production Overview",
//         data: [
//           20, 30, 40, 50, 30, 45, 90, 35, 45, 48, 60, 21, 24, 41, 70, 45, 60,
//           56, 69, 70, 67, 80, 45, 60, 65, 75, 80,
//         ], // Data points
//         borderColor: "#052C89",
//         fill: true,
//         _backgroundColor: "rgba(0, 51, 204, 0.1)", // Shaded area
//         get backgroundColor() {
//           return this._backgroundColor;
//         },
//         set backgroundColor(value) {
//           this._backgroundColor = value;
//         },
//         pointBackgroundColor: "#052C89", // Points
//         // pointBorderColor: "#FFFFFF",
//         // pointRadius: 4,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     aspectRatio: 4, // Make the chart more compact
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context: { raw: unknown }) => `${context.raw}`,
//         },
//       },

//       legend: {
//         display: false, // Hide the "Sales Details" label
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: false,
//         min: 20,
//         max: 100,
//         ticks: {
//           stepSize: 20,
//           callback: (value: unknown) => `${value}%`,
//         },
//       },
//       // x: {
//       //     title: {
//       //         display: true,
//       //         text: "Sales ($)",
//       //     },
//       // },
//     },
//     elements: {
//       line: {
//         tension: 0.3, // Reduce curve smoothness
//         borderWidth: 2, // Thinner line
//       },
//       point: {
//         radius: 2, // Smaller points
//         hoverRadius: 4, // Slightly larger on hover
//       },
//     },
//   };

//   return (
//     <div className="p-6 bg-white  shadow-md rounded-lg w-full  ">
//       <h2 className="text-xl font-semibold mb-4">Production Overview</h2>
//       <div className="w-full h-64 md:h-80 lg:h-96">
//         {" "}
//         {/* Responsive height */}
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default Chart;

import { useEffect, useState } from "react";
import axios from "axios";
import { Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ScheduleData {
  id: string;
  order_id: string;
  part_id: string;
  scheduleQuantity: number;
  completedQuantity: number;
  order_date: string;
  efficiency: number;
}

const Chart = () => {
  const [chartData, setChartData] = useState<
    { processName: string; efficiency: number }[]
  >([]);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/production-efficiency`
        );
        setChartData(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.processName),
    datasets: [
      {
        label: "Production Efficiency (%)",
        data: chartData.map((item) => item.efficiency),
        borderColor: "#052C89",
        fill: true,
        backgroundColor: "rgba(5, 44, 137, 0.1)",
        pointBackgroundColor: "#052C89",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: { raw: unknown }) => `${context.raw}%`,
        },
      },
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          callback: (value: unknown) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-xl font-semibold mb-4">
        Production Efficiency by Process
      </h2>
      <div className="w-full h-64 md:h-80 lg:h-96">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
