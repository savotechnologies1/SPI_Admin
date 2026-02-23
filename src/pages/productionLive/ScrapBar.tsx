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
import { useEffect, useState } from "react";
import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ScrapBar = () => {
//   const data = {
//     labels: ["Sanding", "Inspection", "CutTrim", "Termoforming", "Technology"],
//     datasets: [
//       {
//         label: "Prod Scrap",
//         data: [10, 6, 8, 0, 0],
//         backgroundColor: "rgba(214, 69, 80, 1)", // Consistent color
//         borderColor: "rgba(214, 69, 80, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "TH Scrap",
//         data: [0, 0, 0, 9, 11],
//         backgroundColor: "rgba(230, 143, 150, 1)",
//         borderColor: "rgba(230, 143, 150, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//         labels: {
//           usePointStyle: true,
//           boxWidth: 10,
//           padding: 15,
//         },
//       },
//       title: {
//         display: true,

//         font: {
//           size: 20,
//         },
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         ticks: {
//           font: {
//             size: 12,
//           },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           font: {
//             size: 12,
//           },
//         },
//         title: {
//           display: true,
//           text: "Scrap Quantity",
//           font: {
//             size: 14,
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-full mx-auto p-6 ">
//       <h1 className="text-2xl font-semibold">Scrap By Process</h1>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default ScrapBar;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// const ScrapBar = () => {
//   const [chartData, setChartData] = useState(null);
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     const fetchScrapData = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/current-status-overview`
//         );
//         const apiData = res.data;

//         // 🔑 aggregate scrap quantity per process
//         const scrapByProcess = {};
//         apiData.forEach((item) => {
//           if (!scrapByProcess[item.processName]) {
//             scrapByProcess[item.processName] = 0;
//           }
//           scrapByProcess[item.processName] += item.scrap || 0;
//         });

//         const labels = Object.keys(scrapByProcess);
//         const scrapValues = Object.values(scrapByProcess);

//         setChartData({
//           labels,
//           datasets: [
//             {
//               label: "Scrap",
//               data: scrapValues,
//               backgroundColor: "rgba(214, 69, 80, 1)",
//               borderColor: "rgba(214, 69, 80, 1)",
//               borderWidth: 1,
//               maxBarThickness: 90, // Set maximum bar thickness in pixels
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Error fetching scrap data:", error);
//       }
//     };

//     fetchScrapData();
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           usePointStyle: true,
//           boxWidth: 10,
//           padding: 15,
//         },
//       },
//       title: {
//         display: true,
//         text: "Scrap By Process",
//         font: { size: 20 },
//       },
//     },
//     scales: {
//       x: {
//         beginAtZero: true,
//         ticks: { font: { size: 12 } },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { font: { size: 12 } },
//         title: {
//           display: true,
//           text: "Scrap Quantity",
//           font: { size: 14 },
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-full mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">Scrap By Process</h1>
//       {chartData ? (
//         <Bar data={chartData} options={options} />
//       ) : (
//         <p>Loading chart...</p>
//       )}
//     </div>
//   );
// };

// export default ScrapBar;

// ChartJS register zaroori hai
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const ScrapBar = ({ apiData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Agar data nahi hai toh chart null kardo
    if (!apiData || apiData.length === 0) {
      setChartData(null);
      return;
    }

    const scrapByProcess = {};
    apiData.forEach((item) => {
      // Logic: Process Name aur Machine Name ko combine karke label banana
      const name = `${item?.processName || "Unknown"} (${item?.machineName || "N/A"})`;
      scrapByProcess[name] =
        (scrapByProcess[name] || 0) + (item.scrapQuantity || item.scrap || 0);
    });

    const labels = Object.keys(scrapByProcess);
    const scrapValues = Object.values(scrapByProcess);

    setChartData({
      labels,
      datasets: [
        {
          label: "Scrap Quantity",
          data: scrapValues,
          backgroundColor: "rgba(239, 68, 68, 0.8)", // Tailwind red-500 style
          borderColor: "rgba(220, 38, 38, 1)",
          borderWidth: 1,
          borderRadius: 6,
          maxBarThickness: 50,
        },
      ],
    });
  }, [apiData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      y: { beginAtZero: true, grid: { display: false } },
      x: { grid: { display: false } },
    },
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-lg font-bold mb-4 text-gray-700">Scrap Analytics</h2>
      <div className="h-[300px] flex items-center justify-center">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="text-center text-gray-400">
            <p className="text-sm italic">
              No scrap data found for selected period
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ScrapBar;
