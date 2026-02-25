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

const ScrapBar = ({ apiData }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!apiData || apiData.length === 0) {
      setChartData(null);
      return;
    }
    const scrapByProcess = {};
    apiData.forEach((item) => {
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
          backgroundColor: "rgba(239, 68, 68, 0.8)",
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
