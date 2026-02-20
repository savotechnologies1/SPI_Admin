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
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format, subDays } from "date-fns";

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
  const [startDate, setStartDate] = useState<Date | null>(
    subDays(new Date(), 7),
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  useEffect(() => {
    if (partId && startDate && endDate) {
      fetchCycleTimeData(partId, startDate, endDate);
    }
  }, [partId, startDate, endDate]);

  const fetchCycleTimeData = async (pId: string, start: Date, end: Date) => {
    try {
      setLoading(true);
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
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y} min`;
          },
        },
      },
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
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
       <div className="flex flex-col">
                 <label className="text-xs text-gray-500 mb-1">Start Date</label>
                 <DatePicker
                   selected={startDate}
                   onChange={(date) => setStartDate(date)}
                   selectsStart
                   startDate={startDate}
                   endDate={endDate}
                   dateFormat="MM/dd/yyyy" // <-- Yahan change kiya
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
                   dateFormat="MM/dd/yyyy" // <-- Yahan change kiya
                   className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                 />
               </div>
        </div>
      </div>

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
