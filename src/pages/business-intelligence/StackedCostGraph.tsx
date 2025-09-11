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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedCostGraph = () => {
  const chartData = {
    labels: ["Cost"],
    datasets: [
      {
        label: "Component 1", // e.g., fixed cost
        data: [30], // percentage or value
        backgroundColor: "yellow",
      },
      {
        label: "Component 2", // e.g., remaining cost
        data: [70],
        backgroundColor: "darkblue",
      },
      // Add more components if needed
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bar
    responsive: true,
    plugins: {
      legend: {
        position: "top",
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

  return <Bar data={chartData} options={options} />;
};

export default StackedCostGraph;
