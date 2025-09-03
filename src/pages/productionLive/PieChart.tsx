// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const PieChart = () => {
//   const data = {
//     labels: ["Scrap", "Actual"],
//     datasets: [
//       {
//         data: [35, 65],
//         backgroundColor: ["#FFD666", "#00A76F"],
//         hoverBackgroundColor: ["#FBBF24", "#15803D"],
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   return (
//     <div className="bg-white  py-6 px-14  rounded-lg  ">
//       <Pie data={data} options={options} />
//       <div className="flex justify-center mt-4 ">
//         <div className="flex items-center mr-4">
//           <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//           <span className="text-gray-700 text-sm">Scrap</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
//           <span className="text-gray-700 text-sm">Actual</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PieChart;

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Convert API data into chart.js format
  const chartData = {
    labels: data.map((item) => item.name), // ["Actual", "Scrap"]
    datasets: [
      {
        data: data.map((item) => item.value), // [120, 30]
        backgroundColor: data.map((item) => item.color), // ["#4CAF50", "#FFC107"]
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

      {/* Custom Legends */}
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
