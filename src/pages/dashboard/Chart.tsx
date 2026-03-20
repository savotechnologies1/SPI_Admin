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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// const Chart = () => {
//   const [chartData, setChartData] = useState<
//     { date: string; completed: number }[]
//   >([]);
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default current month
//   const selectedYear = new Date().getFullYear();

//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   // --- Helper Function: Mahine ke saare din generate karne ke liye (1 to 31) ---
//   const generateFullMonthData = (
//     apiData: any[],
//     month: number,
//     year: number,
//   ) => {
//     const daysInMonth = new Date(year, month + 1, 0).getDate(); // Mahine mein kitne din hain
//     const fullMonthArray = [];

//     for (let day = 1; day <= daysInMonth; day++) {
//       // Date format match karne ke liye: YYYY-MM-DD
//       const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

//       // API data mein check karo agar is date ka data hai
//       const found = apiData.find((item) => item.date === dateStr);

//       fullMonthArray.push({
//         date: String(day), // X-axis par sirf '1', '2', '3' dikhane ke liye
//         completed: found ? found.completed : 0, // Agar data nahi hai toh 0
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

//         // Data ko fill kar rahe hain 1 se 31 tak
//         const formattedData = generateFullMonthData(
//           res.data.data,
//           selectedMonth,
//           selectedYear,
//         );
//         setChartData(formattedData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [selectedMonth]);

//   const data = {
//     labels: chartData.map((item) => item.date), // Yeh 1, 2, 3...31 dikhayega
//     datasets: [
//       {
//         label: "Completed Quantity",
//         data: chartData.map((item) => item.completed),
//         borderColor: "#052C89",
//         backgroundColor: "rgba(5, 44, 137, 0.1)",
//         fill: true,
//         tension: 0.3,
//         pointRadius: 3,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: { beginAtZero: true, title: { display: true, text: "Qty" } },
//       x: { title: { display: true, text: "Day of Month" } },
//     },
//     plugins: {
//       legend: { display: false },
//     },
//   };

//   return (
//     <div className="p-6 bg-white shadow-md rounded-lg w-full">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-lg font-bold">Production Efficiency by Process</h2>

//         {/* Month Selector */}
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//           className="p-2 border rounded-md bg-gray-50 text-sm outline-none"
//         >
//           {[
//             "Jan",
//             "Feb",
//             "Mar",
//             "Apr",
//             "May",
//             "Jun",
//             "Jul",
//             "Aug",
//             "Sep",
//             "Oct",
//             "Nov",
//             "Dec",
//           ].map((m, i) => (
//             <option key={i} value={i}>
//               {m}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="w-full h-80">
//         <Line data={data} options={options} />
//       </div>
//     </div>
//   );
// };

// export default Chart;

const Chart = () => {
  const [chartData, setChartData] = useState<
    { date: string; completed: number }[]
  >([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const selectedYear = new Date().getFullYear();

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const generateFullMonthData = (
    apiData: any[],
    month: number,
    year: number,
  ) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const fullMonthArray = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const found = apiData?.find(
        (item) => item.date.split("T")[0] === dateStr,
      );

      fullMonthArray.push({
        date: String(day),
        completed: found ? found.completed : 0,
      });
    }
    return fullMonthArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/production-efficiency`,
          {
            params: {
              month: selectedMonth + 1, 
              year: selectedYear,
            },
          },
        );

        const formattedData = generateFullMonthData(
          res.data.data || [],
          selectedMonth,
          selectedYear,
        );
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedMonth, selectedYear]); // Year change par bhi fetch karega

  const data = {
    labels: chartData.map((item) => item.date),
    datasets: [
      {
        label: "Completed Quantity",
        data: chartData.map((item) => item.completed),
        borderColor: "#052C89",
        backgroundColor: "rgba(5, 44, 137, 0.1)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "#052C89",
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

  return (
    <div className="p-6 bg-white shadow-sm rounded-xl border border-gray-100 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Production Efficiency by Process
          </h2>
        </div>

        {/* Month Selector */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="p-2 border rounded-lg bg-gray-50 text-sm font-semibold outline-none text-gray-700 cursor-pointer hover:border-blue-300 transition-all"
        >
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((m, i) => (
            <option key={i} value={i}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full h-80">
        <Line data={data} options={options as any} />
      </div>
    </div>
  );
};

export default Chart;
