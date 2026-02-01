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
import { FaSpinner } from "react-icons/fa";
import { selectProcess } from "../product&BOM/https/partProductApis";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const StepsBar = ({ partId }: { partId: string }) => {
//   const [chartData, setChartData] = useState<any>(null);
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     if (partId) fetchCycleTimeData(partId);
//   }, [partId]);

//   const fetchCycleTimeData = async (partId: string) => {
//     try {
//       const res = await axios.get(
//         `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=2025-09-01&endDate=2025-09-12&partId=${partId}`
//       );

//       console.log("res.data", res.data);

//       const stepData = res.data.data.stepWiseCT.stepAverages || [];
//       setChartData({
//         labels: stepData.map(
//           (item: any) => `Step ${item.stepNumber} (${item.stepTitle})` // 👈 X-axis me step number
//         ),
//         datasets: [
//           {
//             label: "Average Duration (mins)",
//             data: stepData.map((item: any) => item.averageDuration),
//             backgroundColor: "rgba(5, 44, 137, 0.8)",
//             borderColor: "rgba(5, 44, 137, 1)",
//             borderWidth: 1,
//             maxBarThickness: 90, // Set maximum bar thickness in pixels
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
//       tooltip: {
//         callbacks: {
//           label: function (context: any) {
//             return `${context.dataset.label}: ${context.raw.toFixed(2)} mins`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: { display: false },
//         ticks: {
//           font: { size: window.innerWidth < 768 ? 10 : 12 },
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           font: { size: window.innerWidth < 768 ? 10 : 12 },
//         },
//         title: {
//           display: true,
//           text: "Cycle Time (mins)", // 👈 Y-axis label
//           font: { size: window.innerWidth < 768 ? 12 : 14 },
//         },
//       },
//     },
//   };

//   return (
//     <div className="w-full mx-auto p-2 md:p-4 bg-white rounded-lg shadow-sm">
//       <h1 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
//         Process Step Analysis
//       </h1>
//       <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
//         {chartData ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <p className="text-center text-gray-500">Loading chart...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StepsBar;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const StepsBar = ({ partId }: { partId: string }) => {
//   const [chartData, setChartData] = useState<any>(null);
//   const [loading, setLoading] = useState(false); // 🔹 Chart loading state
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     if (partId) fetchCycleTimeData(partId);
//   }, [partId]);

//   const fetchCycleTimeData = async (partId: string) => {
//     try {
//       setLoading(true); // 🔹 Start loading
//       // Note: Ideal to pass dates from props instead of hardcoding
//       const res = await axios.get(
//         `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=2024-01-01&endDate=2025-12-31&partId=${partId}`
//       );

//       const stepData = res.data.data.stepWiseCT.stepAverages || [];
      
//       setChartData({
//         labels: stepData.map(
//           (item: any) => `Step ${item.stepNumber}: ${item.stepTitle}`
//         ),
//         datasets: [
//           {
//             label: "Avg Duration (mins)",
//             data: stepData.map((item: any) => item.averageDuration),
//             backgroundColor: "rgba(5, 44, 137, 0.8)",
//             hoverBackgroundColor: "rgba(5, 44, 137, 1)",
//             borderRadius: 6,
//             maxBarThickness: 60,
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Error fetching cycle time data:", error);
//     } finally {
//       setLoading(false); // 🔹 Stop loading
//     }
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" as const },
//       tooltip: {
//         callbacks: {
//           label: (ctx: any) => `Duration: ${ctx.raw.toFixed(2)} mins`,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         title: { display: true, text: "Minutes" }
//       }
//     }
//   };

//   return (
//     <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
//       <h1 className="text-xl font-bold mb-6 text-gray-800">
//         Process Step Analysis
//       </h1>
      
//       <div className="w-full h-[400px] flex items-center justify-center relative">
//         {loading ? (
//           <div className="flex flex-col items-center gap-3">
//             <FaSpinner className="animate-spin text-4xl text-blue-600" />
//             <p className="text-gray-500 font-medium">Analyzing steps...</p>
//           </div>
//         ) : chartData ? (
//           <Bar data={chartData} options={options} />
//         ) : (
//           <p className="text-gray-400 italic">No data available for this part</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StepsBar;
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const StepsBar = ({ partId }: { partId: string }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processData, setProcessData] = useState<any[]>([]);
  const [selectedProcessId, setSelectedProcessId] = useState(""); // 👈 New state for Process ID

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // 1. Initial Processes Load
  useEffect(() => {
    (async () => {
      try {
        const process = await selectProcess(); // Aapka existing function
        setProcessData(process);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // 2. Fetch data when partId OR selectedProcessId changes
  useEffect(() => {
    if (partId) {
      fetchCycleTimeData(partId, selectedProcessId);
    }
  }, [partId, selectedProcessId]); // 👈 Added dependency

  const fetchCycleTimeData = async (pid: string, procId: string) => {
    try {
      setLoading(true);
      
      // API call with processId as query param
      let url = `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=2024-01-01&endDate=2025-12-31&partId=${pid}`;
      
      if (procId) {
        url += `&processId=${procId}`; // 👈 Backend query parameter
      }

      const res = await axios.get(url);
      const stepData = res.data.data.stepWiseCT.stepAverages || [];
      
      if (stepData.length > 0) {
        setChartData({
          labels: stepData.map(
            (item: any) => `Step ${item.stepNumber}: ${item.stepTitle}`
          ),
          datasets: [
            {
              label: "Average Duration (mins)",
              data: stepData.map((item: any) => item.averageDuration),
              backgroundColor: "rgba(5, 44, 137, 0.8)",
              hoverBackgroundColor: "rgba(5, 44, 137, 1)",
              borderColor: "rgba(5, 44, 137, 1)",
              borderWidth: 1,
              borderRadius: 8,
              maxBarThickness: 60,
            },
          ],
        });
      } else {
        setChartData(null);
      }
    } catch (error) {
      console.error("Error fetching cycle time data:", error);
      setChartData(null);
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
          label: (ctx: any) => `⏳ Time: ${ctx.raw.toFixed(2)} mins`,
        },
      },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Minutes" } },
    },
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          Process Step Analysis
        </h1>
        <div className="mb-6 max-w-xs">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Process</label>
        <select
          value={selectedProcessId}
          onChange={(e) => setSelectedProcessId(e.target.value)} // 👈 Update state on change
          className="border p-2 rounded w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">All Processes</option>
          {processData.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.processName || item.name} ({item.machineName})
            </option>
          ))}
        </select>
      </div>
      </div>
    
      {/* Select Process Dropdown */}
      

      <div className="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg relative overflow-hidden">
        {loading ? (
          <FaSpinner className="animate-spin text-5xl text-blue-600" />
        ) : chartData ? (
          <div className="w-full h-full p-4">
            <Bar data={chartData} options={options} />
          </div>
        ) : (
          <div className="text-center text-gray-400">
             <p className="text-lg">No step data found.</p>
             <p className="text-sm">Select a process or check shop floor entries.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsBar;