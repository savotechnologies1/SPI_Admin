import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const FixedCostGraph = ({
  onDataFetched,
}: {
  onDataFetched?: (payload: any) => void;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchGraphData();
  }, [year]);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchGraphData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/fixed-data-graph`, {
        params: { year },
      });
      if (res.data.success) {
        setData(res.data.data);

        if (onDataFetched) {
          onDataFetched({
            chartData: res.data.data,
            totals: res.data.totals,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: `Total Fixed Cost (${year})`,
        data: data.map((d) => d.totalCost),
        backgroundColor: "rgb(5, 44, 137)",
      },
      {
        label: `Total Revenue (${year})`,
        data: data.map((d) => d.totalRevenue),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: `Fixed Cost & Revenue (${year})` },
    },
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Fixed Cost & Revenue Monthly Graph
      </h2>
      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        className="border p-2 mb-4 rounded"
      >
        {[0, 1, 2].map((i) => {
          const y = new Date().getFullYear() - i;
          return (
            <option key={y} value={y}>
              {y}
            </option>
          );
        })}
      </select>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default FixedCostGraph;
