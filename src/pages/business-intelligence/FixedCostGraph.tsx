import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// 2. Define data structures
interface MonthlyData {
  month: string;
  totalCost: number;
  totalRevenue: number;
}

interface Totals {
  totalFixedCost?: number;
  totalRevenue?: number;
}

interface GraphPayload {
  chartData: MonthlyData[];
  totals: Totals;
}

interface ApiResponse {
  success: boolean;
  data: MonthlyData[];
  totals: Totals;
}

interface FixedCostGraphProps {
  onDataFetched?: (payload: GraphPayload) => void;
}

const FixedCostGraph: React.FC<FixedCostGraphProps> = ({ onDataFetched }) => {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const BASE_URL =
    (import.meta as any).env.VITE_SERVER_URL || "http://localhost:8086";

  const fetchGraphData = async () => {
    try {
      const res = await axios.get<ApiResponse>(
        `${BASE_URL}/api/admin/fixed-data-graph`,
        {
          params: { year },
        },
      );

      if (res.data.success) {
        setData(res.data.data);

        if (onDataFetched) {
          onDataFetched({
            chartData: res.data.data,
            totals: res.data.totals,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  useEffect(() => {
    fetchGraphData();
  }, [year]);

  // 3. Define Chart Data with proper types
  const chartData: ChartData<"bar"> = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: `Total Fixed Cost (${year})`,
        data: data.map((d) => d.totalCost),
        backgroundColor: "rgb(5, 44, 137)",
      },
      {
        label: `Total Revenue (${year})`,
        data: data.map((d) => d.totalRevenue),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: `Fixed Cost & Revenue (${year})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Fixed Cost & Revenue Monthly Graph
      </h2>
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border p-2 mb-4 rounded bg-white"
      >
        {[0, 1, 2].map((i) => {
          const y = new Date().getFullYear() - i;
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
      <div className="min-h-[300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default FixedCostGraph;
