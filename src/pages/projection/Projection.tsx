import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CashFlowLineGraph from "./LineGraph";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const Projection: React.FC = () => {
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [projections, setProjections] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/admin/revenue-api`);
      const data = response.data;

      setProjections(data.projections);

      const cashFlow = [
        { name: "Total Revenue", value: data.totalRevenue || 0 },
        { name: "Total COGS", value: data.totalCOGS || 0 },
        { name: "Fixed Cost", value: data.totalFixedCost || 0 },
        { name: "Unfulfilled Revenue", value: data.unfulfilledRevenue || 0 },
      ];
      setCashFlowData(cashFlow);
    } catch (error) {
      console.error("Error fetching projection data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-7">Loading...</div>;

  return (
    <div className="p-7">
      <h1 className="font-bold text-2xl mb-6">Projection Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-xl shadow-sm">
          <p className="text-blue-600 font-semibold text-sm uppercase">
            {projections?.orderCard?.title || "Total Open Order Revenue"}
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {/* ${projections?.orderCard?.value?.toLocaleString() || 0} */}$
            {projections?.totalOpenOrderRevenue?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-xl shadow-sm">
          <p className="text-green-600 font-semibold text-sm uppercase">
            {projections?.partCard?.title || "Total Open Parts Cost"}
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {/* ${projections?.partCard?.value?.toLocaleString() || 0}*/}$
            {projections?.totalOpenPartsCost?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-xl shadow-sm">
          <p className="text-purple-600 font-semibold text-sm uppercase">
            {projections?.employeeCard?.title || "Total Open Labor Cost"}
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {/* ${projections?.employeeCard?.value?.toLocaleString() || 0} */}$
            {projections?.totalOpenLaborCost?.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-xl shadow-sm">
          <p className="text-orange-600 font-semibold text-sm uppercase">
            {projections?.fixedCostCard?.title || "Fixed Cost"}
          </p>
          <h2 className="text-3xl font-bold mt-2">
            ${projections?.totalFixedCost?.value?.toLocaleString() || 0}
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Current Cash Flow Summary</h2>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2 text-left">Item</th>
                <th className="border border-gray-200 p-2 text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {cashFlowData.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-2">{row.name}</td>
                  <td className="border border-gray-200 p-2 text-right">
                    ${row?.value?.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cashFlowData.filter((row) => row.value > 0)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <CashFlowLineGraph />
    </div>
  );
};

export default Projection;
