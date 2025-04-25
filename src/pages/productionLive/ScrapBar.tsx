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

const ScrapBar = () => {
  const data = {
    labels: ["Sanding", "Inspection", "CutTrim", "Termoforming", "Technology"],
    datasets: [
      {
        label: "Prod Scrap",
        data: [10, 6, 8, 0,0],
        backgroundColor: "rgba(214, 69, 80, 1)",  // Consistent color
        borderColor: "rgba(214, 69, 80, 1)",
        borderWidth: 1,
      },
      {
        label: "TH Scrap",
        data: [0,0,0, 9, 11],
        backgroundColor: "rgba(230, 143, 150, 1)", 
        borderColor: "rgba(230, 143, 150, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,   
          boxWidth: 10,
          padding: 15,
        },
      },
      title: {
        display: true,
     
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: "Scrap Quantity",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="w-full mx-auto p-6 ">
      <h1 className="text-2xl font-semibold">Scrap By Process</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ScrapBar;
