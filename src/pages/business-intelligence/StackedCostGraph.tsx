import React from "react";
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

const StackedCostGraph: React.FC = () => {
  const chartData: ChartData<"bar"> = {
    labels: ["Cost"],
    datasets: [
      {
        label: "Component 1",
        data: [30],
        backgroundColor: "yellow",
      },
      {
        label: "Component 2",
        data: [70],
        backgroundColor: "darkblue",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "black" },
      },
      title: {
        display: true,
        text: "Cost Breakdown",
        color: "black",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: { color: "black" },
      },
      y: {
        stacked: true,
        ticks: { color: "black" },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedCostGraph;
