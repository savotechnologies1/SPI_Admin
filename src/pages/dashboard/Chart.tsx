// SalesChart.jsx
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler
);

const Chart = () => {
  const data = {
    labels: [
      "5k",
      "10k",
      "15k",
      "20k",
      "25k",
      "30k",
      "35k",
      "40k",
      "45k",
      "50k",
      "55k",
      "60k",
    ], // X-axis labels
    datasets: [
      {
        label: "Production Overview",
        data: [20,30, 40, 50,30, 45, 90, 35, 45, 48, 60, 21, 24, 41, 70, 45, 60, 56,69, 70, 67, 80, 45, 60, 65, 75, 80], // Data points
        borderColor: "#052C89", 
        fill: true, 
        _backgroundColor: "rgba(0, 51, 204, 0.1)", // Shaded area
        get backgroundColor() {
          return this._backgroundColor;
        },
        set backgroundColor(value) {
          this._backgroundColor = value;
        },
        pointBackgroundColor: "#052C89", // Points
        // pointBorderColor: "#FFFFFF",
        // pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,    
    aspectRatio: 4,                // Make the chart more compact
    plugins: {
        tooltip: {
            callbacks: {
                label: (context: { raw: any; }) => `${context.raw}`,
            },
        },

        legend: {
          display: false,   // Hide the "Sales Details" label
      },
    },
    scales: {
        y: {
            beginAtZero: false,
            min: 20,
            max: 100,
            ticks: {
                stepSize: 20,
                callback: (value: any) => `${value}%`,
            },
        },
        // x: {
        //     title: {
        //         display: true,
        //         text: "Sales ($)",
        //     },
        // },
    },
    elements: {
        line: {
            tension: 0.3,             // Reduce curve smoothness
            borderWidth: 2,           // Thinner line
        },
        point: {
            radius: 2,                // Smaller points
            hoverRadius: 4,           // Slightly larger on hover
        }
    },
};


  return (
    <div className="p-6 bg-white  shadow-md rounded-lg w-full  ">
      <h2 className="text-xl font-semibold mb-4">Production Overview</h2>
      <div className="w-full h-64 md:h-80 lg:h-96"> {/* Responsive height */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Chart;
