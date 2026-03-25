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

const CapacityBarChart = ({ chartData }) => {
  if (!chartData) return null;

  const data = {
    ...chartData,
    datasets: chartData?.datasets?.map((ds) => ({
      ...ds,
      backgroundColor: [
        "rgba(0, 210, 150, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(153, 102, 255, 0.8)",
        "rgba(255, 159, 64, 0.8)",
      ],
      borderColor: [
        "rgba(0, 210, 150, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
      borderRadius: 6,
      barThickness: 30,
    })),
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "bottom", labels: { boxWidth: 10 } },
    },
    scales: {
      x: {
        position: "top" as const,
        grid: { color: "#e5e5e5" },
        ticks: {
          stepSize: 60,
          callback: (value: number) =>
            value % 60 === 0 ? `${value / 60} hr` : `${value} min`,
          font: { size: 12 },
        },
      },
      y: { grid: { display: false }, ticks: { font: { size: 14 } } },
    },
  };

  return (
    <div className="w-full h-[400px] mx-auto p-4 bg-white rounded-lg shadow-lg">
      <h1 className="font-medium">Open Orders Process</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CapacityBarChart;
