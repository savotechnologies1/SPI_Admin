import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
}

const PieChart = ({ data }: PieChartProps) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        hoverBackgroundColor: data.map((item) => item.color),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="bg-white py-6 px-14 rounded-lg">
      <Pie data={chartData} options={options} />
      <div className="flex justify-center mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center mr-4">
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-700 text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
