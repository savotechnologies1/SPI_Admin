// // SalesChart.jsx
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Filler
// );

// // const Chart = () => {
// //   const data = {
// //     labels: [
// //       "Jan",
// //       "Feb",
// //       "Mar",
// //       "May",
// //       "Jun",
// //       "Jul",
// //       "Aug",
// //       "Sep",
// //       "Oct",
// //       "Nov",
// //       "Dec",
// //     ], // X-axis labels
// //     datasets: [
// //       {
// //         label: "Production Overview",
// //         data: [
// //           20, 30, 40, 50, 30, 45, 90, 35, 45, 48, 60, 21, 24, 41, 70, 45, 60,
// //           56, 69, 70, 67, 80, 45, 60, 65, 75, 80,
// //         ], // Data points
// //         borderColor: "#052C89",
// //         fill: true,
// //         _backgroundColor: "rgba(0, 51, 204, 0.1)", // Shaded area
// //         get backgroundColor() {
// //           return this._backgroundColor;
// //         },
// //         set backgroundColor(value) {
// //           this._backgroundColor = value;
// //         },
// //         pointBackgroundColor: "#052C89", // Points
// //         // pointBorderColor: "#FFFFFF",
// //         // pointRadius: 4,
// //       },
// //     ],
// //   };

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     aspectRatio: 4, // Make the chart more compact
// //     plugins: {
// //       tooltip: {
// //         callbacks: {
// //           label: (context: { raw: unknown }) => `${context.raw}`,
// //         },
// //       },

// //       legend: {
// //         display: false, // Hide the "Sales Details" label
// //       },
// //     },
// //     scales: {
// //       y: {
// //         beginAtZero: false,
// //         min: 20,
// //         max: 100,
// //         ticks: {
// //           stepSize: 20,
// //           callback: (value: unknown) => `${value}%`,
// //         },
// //       },
// //       // x: {
// //       //     title: {
// //       //         display: true,
// //       //         text: "Sales ($)",
// //       //     },
// //       // },
// //     },
// //     elements: {
// //       line: {
// //         tension: 0.3, // Reduce curve smoothness
// //         borderWidth: 2, // Thinner line
// //       },
// //       point: {
// //         radius: 2, // Smaller points
// //         hoverRadius: 4, // Slightly larger on hover
// //       },
// //     },
// //   };

// //   return (
// //     <div className="p-6 bg-white  shadow-md rounded-lg w-full  ">
// //       <h2 className="text-xl font-semibold mb-4">Production Overview</h2>
// //       <div className="w-full h-64 md:h-80 lg:h-96">
// //         {" "}
// //         {/* Responsive height */}
// //         <Line data={data} options={options} />
// //       </div>
// //     </div>
// //   );
// // };

// // export default Chart;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Legend } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// interface ScheduleData {
//   id: string;
//   order_id: string;
//   part_id: string;
//   scheduleQuantity: number;
//   completedQuantity: number;
//   order_date: string;
//   efficiency: number;
// }

// const Chart = () => {
//   const [chartData, setChartData] = useState<
//     { processName: string; efficiency: number }[]
//   >([]);
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/production-efficiency`
//         );
//         setChartData(res.data.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const data = {
//     labels: chartData.map((item) => `${item.processName} (${item.machineName})`),
//     datasets: [
//       {
//         label: "Production Efficiency (%)",
//         data: chartData.map((item) => item.efficiency),
//         borderColor: "#052C89",
//         fill: true,
//         backgroundColor: "rgba(5, 44, 137, 0.1)",
//         pointBackgroundColor: "#052C89",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (context: { raw: unknown }) => `${context.raw}%`,
//         },
//       },
//       legend: { display: false },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         ticks: {
//           stepSize: 20,
//           callback: (value: unknown) => `${value}%`,
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg w-full">
//       <h2 className="text-xl font-semibold mb-4">
//         Production Efficiency by Process
//       </h2>
//       <div className="w-full h-64 md:h-80 lg:h-96">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default Chart;

import React, { useEffect, useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = () => {
  const [chartData, setChartData] = useState<{ date: string; completed: number }[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default current month
  const selectedYear = new Date().getFullYear(); 

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // --- Helper Function: Mahine ke saare din generate karne ke liye (1 to 31) ---
  const generateFullMonthData = (apiData: any[], month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Mahine mein kitne din hain
    const fullMonthArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      // Date format match karne ke liye: YYYY-MM-DD
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      
      // API data mein check karo agar is date ka data hai
      const found = apiData.find(item => item.date === dateStr);
      
      fullMonthArray.push({
        date: String(day), // X-axis par sirf '1', '2', '3' dikhane ke liye
        completed: found ? found.completed : 0 // Agar data nahi hai toh 0
      });
    }
    return fullMonthArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      const firstDay = new Date(selectedYear, selectedMonth, 1).toISOString().split("T")[0];
      const lastDay = new Date(selectedYear, selectedMonth + 1, 0).toISOString().split("T")[0];

      try {
        const res = await axios.get(`${BASE_URL}/api/admin/production-efficiency`, {
          params: { startDate: firstDay, endDate: lastDay },
        });
        
        // Data ko fill kar rahe hain 1 se 31 tak
        const formattedData = generateFullMonthData(res.data.data, selectedMonth, selectedYear);
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  const data = {
    labels: chartData.map((item) => item.date), // Yeh 1, 2, 3...31 dikhayega
    datasets: [
      {
        label: "Completed Quantity",
        data: chartData.map((item) => item.completed),
        borderColor: "#052C89",
        backgroundColor: "rgba(5, 44, 137, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Qty' } },
      x: { title: { display: true, text: 'Day of Month' } }
    },
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold">Production Efficiency by Process</h2>
        
        {/* Month Selector */}
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="p-2 border rounded-md bg-gray-50 text-sm outline-none"
        >
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => (
            <option key={i} value={i}>{m}</option>
          ))}
        </select>
      </div>

      <div className="w-full h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;