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
  Filler
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FormingTemp = () => {
  const data = {
    labels: ["Technology", "Car Brands", "Airlines", "Energy", "Technology"],
    datasets: [
      {
        label: "2022",
        data: [80, 80, 50, 100, 40],
        borderColor: "rgba(114, 9, 183, 1)",  // Purple
        backgroundColor: "rgba(114, 9, 183, 0.2)",
        pointBackgroundColor: "rgba(114, 9, 183, 1)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        tension: 0.4,  // Smooth curve
        
      },
      {
        label: "2023",
        data: [20, 60, 30, 90, 50],
        borderColor: "rgba(255, 99, 132, 1)",  // Red
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        tension: 0.4,  // Smooth curve
      },
      {
        label: "2024",
        data: [15, 40, 25, 35, 45],
        borderColor: "rgba(75, 192, 192, 1)",  // Cyan
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointRadius: 5,
        tension: 0.4,  // Smooth curve
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 15,
        },
      },
      title: {
        display: false,
        text: "Process Parameter (Temp)",
        font: {
          size: 14,
          
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: true,
          color: "#E5E7EB",
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
          beginAtZero: true,
          
         
        },
        grid: {
          color: "#E5E7EB",
        },
      },
    },
  };

  return (
    <div className=" mx-auto p-2 bg-white rounded-xl shadow-lg h-full">
      <h1 className='font-semibold p-2'>Forming Temp By Time</h1>

      <Line data={data} options={options} />
    </div>
  );
};

export default FormingTemp;
