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
  Legend,
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const StepsBar = ({ partId }: { partId: string }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [processData, setProcessData] = useState<any[]>([]);
  const [selectedProcessId, setSelectedProcessId] = useState("");

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    (async () => {
      try {
        const process = await selectProcess();
        setProcessData(process);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    if (partId) {
      fetchCycleTimeData(partId, selectedProcessId);
    }
  }, [partId, selectedProcessId]);

  const fetchCycleTimeData = async (pid: string, procId: string) => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/api/admin/cycle-time-comparision-data?startDate=2024-01-01&endDate=2025-12-31&partId=${pid}`;

      if (procId) {
        url += `&processId=${procId}`;
      }

      const res = await axios.get(url);
      const stepData = res.data.data.stepWiseCT.stepAverages || [];

      if (stepData.length > 0) {
        setChartData({
          labels: stepData.map(
            (item: any) => `Step ${item.stepNumber}: ${item.stepTitle}`,
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
          label: (ctx: any) => ` Time: ${ctx.raw.toFixed(2)} mins`,
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Process
          </label>
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
            <p className="text-sm">
              Select a process or check shop floor entries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepsBar;
