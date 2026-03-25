import React, { useEffect, useState } from "react";
import axios from "axios";
import FixedCostGraph from "./FixedCostGraph";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { toast } from "react-toastify";
const FixedCost = () => {
  const [records, setRecords] = useState([]);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const fetchFixedCosts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/fixed-data`);
      setRecords(response.data.data);
    } catch (error) {
      console.error("Error fetching fixed costs:", error);
    }
  };

  useEffect(() => {
    fetchFixedCosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/fixed-cost-delete/${id}`);
      toast.success("Fixed cost deleted successfully!");
      setRecords(records.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };
  const [graphData, setGraphData] = useState<any>(null);
  const costing = graphData
    ? [
        {
          name: "Yearly",
          part1: graphData.totals.totalFixedCost || 0,
          part2: graphData.totals.totalRevenue || 0,
        },
      ]
    : [];
  return (
    <div className="p-6  bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Fixed Cost Management
      </h2>
      <div className="bg-white shadow-md rounded-2xl p-4 mt-6 w-full mb-10">
        <div className="flex justify-between mb-6">
          <div>Current Year Total cost</div>
        </div>
        <ResponsiveContainer width="100%" height={50}>
          <BarChart layout="vertical" width={500} height={20} data={costing}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Bar dataKey="part1" stackId="a" fill="#052C89" />
            <Bar dataKey="part2" stackId="a" fill="#2ECC71" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">
              Fixed Cost Records
            </h3>
            <span className="text-sm text-gray-500">
              {records.length} {records.length === 1 ? "record" : "records"}
            </span>
          </div>

          {records.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expense Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Annual Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Depreciation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                          {r.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.expenseName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${parseFloat(r.expenseCost).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {r.depreciation}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="text-red-600 hover:text-red-900 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-gray-400 mb-2">No fixed costs added yet</div>
              <p className="text-sm text-gray-500">
                Add your first fixed cost using the form above
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          <FixedCostGraph onDataFetched={setGraphData} />
        </div>
      </div>
    </div>
  );
};

export default FixedCost;
