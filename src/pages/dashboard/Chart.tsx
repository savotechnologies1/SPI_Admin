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
  }, [selectedMonth, selectedYear]);

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
