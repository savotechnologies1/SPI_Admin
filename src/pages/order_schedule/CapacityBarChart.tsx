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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CapacityBarChart = () => {
  const data = {
    labels: ["Sanding", "Inspection", "CutTrim", "Termoforming", "Technology"],
    datasets: [
      {
        label: "2022",
        data: [300, 360, 360, 290, 300],
        backgroundColor: (context: { dataIndex: string | number; }) => {
          const colors = [
            "rgba(0, 210, 150, 1) ",   // Green
            "rgba(255, 99, 132, 1)",  // Red
            "rgba(255, 206, 86, 1)",  // Yellow
            "rgba(54, 162, 235, 1)",  // Blue
            "rgba(153, 102, 255, 1)"  // Purple
          ];
          return colors[context.dataIndex as number];
        },
        borderRadius: 0,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          // usePointStyle: true,
          boxWidth: 10,
        },
      },
    },
    scales: {
      x: {
        position: "top" as const,
        grid: {
          color: "#e5e5e5",
          // drawBorder: false,
        },
        ticks: {
          stepSize: 100,
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[400px] mx-auto p-4 bg-white rounded-lg shadow-lg">
      <Bar data={data} options={options} />
    </div>
  );
};

export default CapacityBarChart;
