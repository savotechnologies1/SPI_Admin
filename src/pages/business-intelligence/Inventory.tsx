import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Period = "daily" | "weekly" | "monthly" | "yearly";

interface ChartItem {
  date: string;
  rawDate: string;
  cost: number;
}
const formatFullDate = (date: string | Date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const formatXAxis = (dateStr: string, period: Period) => {
  const date = new Date(dateStr);

  if (period === "yearly") {
    return date.getFullYear().toString();
  }

  if (period === "monthly") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    }).format(date);
  }

  if (period === "weekly") {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
    }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
  }).format(date);
};

interface ChartItem {
  date: string;
  rawDate: string;
  cost: number;
}

interface PartItem {
  partNumber: string;
  availStock: number;
  minStock: number;
  extraStock: number;
  costPerUnit: string;
  totalExtraCost: string;
}

interface ChartItem {
  date: string;
  rawDate: string;
  cost: number;
}

interface PartItem {
  partNumber: string;
  availStock: number;
  minStock: number;
  extraStock: number;
  costPerUnit: string;
  totalExtraCost: string;
  leadTime: number;
}

const Inventory = () => {
  const [period, setPeriod] = useState<Period>("daily");
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [parts, setParts] = useState<PartItem[]>([]);
  const [totalInventoryCost, setTotalInventoryCost] = useState<number>(0);
  const [outOfStockCount, setOutOfStockCount] = useState<number>(0);
  const [turnoverRatio, setTurnoverRatio] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchInventoryGraph = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/admin/inventory-data?period=${period}`,
      );

      const rawChartData = res.data.chartData || [];
      const partsList = res.data.parts || [];
      const summary = res.data.summary || {};

      const formatted: ChartItem[] = rawChartData.map((item: any) => ({
        date: formatXAxis(item.date, period),
        rawDate: item.date,
        cost: item.totalInventoryCost,
      }));

      setChartData(formatted);
      setParts(partsList);
      setTotalInventoryCost(summary.totalInventoryCost || 0);
      setTurnoverRatio(summary.turnoverRatio || 0);
      setOutOfStockCount(summary.outOfStockCount || 0);
      setCurrentPage(1);
    } catch (error) {
      console.error("Inventory graph error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryGraph();
  }, [period]);

  const totalItems = parts.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = parts.slice(indexOfFirstRow, indexOfLastRow);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <div className="p-4">
        <h1 className="font-semibold text-2xl mb-4">Inventory</h1>
        <div className="mb-6 flex items-center gap-2">
          <label className="font-medium">Select Period:</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            className="border rounded px-3 py-1 bg-white shadow-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded-lg shadow bg-white border-l-4 border-l-indigo-500">
            <p className="text-sm text-gray-500 font-medium mb-1">
              Total Inventory Cost
            </p>
            <h2 className="text-2xl font-bold text-gray-800">
              $
              {totalInventoryCost.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
          <div className="p-4 border rounded-lg shadow bg-white border-l-4 border-l-green-500">
            <p className="text-sm text-gray-500 font-medium mb-1">
              Inventory Turnover Ratio (Inv/COGS)
            </p>
            <h2 className="text-2xl font-bold text-gray-800">
              {turnoverRatio.toFixed(2)}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Target: Higher ratio indicates faster stock movement
            </p>
          </div>
          <div className="p-4 border rounded-lg shadow bg-white border-l-4 border-l-red-500">
            <p className="text-sm text-gray-500 font-medium mb-1">
              Inventory Turnover Ratio
            </p>
            <h2 className="text-2xl font-bold text-gray-800">
              {outOfStockCount.toFixed(2)}
            </h2>
            <p className="text-xs text-gray-400 mt-1">Out Of Stock</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6 border border-gray-100">
          <h2 className="text-lg font-medium mb-3">
            Inventory Trend ({period.charAt(0).toUpperCase() + period.slice(1)})
          </h2>

          {loading ? (
            <p className="text-center py-10 text-gray-500">Loading graph...</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="date"
                  fontSize={10}
                  tickMargin={10}
                  interval={
                    period === "daily" ? 2 : period === "monthly" ? 0 : 0
                  }
                />
                <YAxis
                  fontSize={11}
                  tickFormatter={(value) => `$${value}`}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload?.[0]?.payload?.rawDate) {
                      const raw = payload[0].payload.rawDate;
                      if (period === "yearly")
                        return `Year: ${new Date(raw).getFullYear()}`;
                      if (period === "monthly")
                        return new Intl.DateTimeFormat("en-US", {
                          month: "long",
                          year: "numeric",
                        }).format(new Date(raw));
                      return formatFullDate(raw);
                    }
                    return label;
                  }}
                />
                <Line
                  name="Inventory Cost"
                  type="monotone"
                  dataKey="cost"
                  stroke="#4f46e5"
                  strokeWidth={2.5}
                  dot={
                    period === "daily" || period === "monthly"
                      ? { r: 2 }
                      : { r: 4 }
                  }
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-normal">Part Number</th>
                <th className="px-6 py-4 font-normal text-center">
                  Time to Deliver (Lead)
                </th>
                <th className="px-6 py-4 font-normal  text-center">
                  Part minStock
                </th>
                <th className="px-6 py-4 font-normal text-right">
                  Qty. Available
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentRows.length > 0 ? (
                currentRows.map((part, index) => (
                  <tr
                    key={index}
                    className="text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{part.partNumber}</td>

                    <td className="px-6 py-4 text-center">
                      {part.leadTime > 1
                        ? `${part.leadTime} days`
                        : `${part.leadTime} day`}
                    </td>
                    <td className="px-6 py-4 text-center font-semibold">
                      {part.minStock}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      {part?.availStock?.toString().padStart(2, "0")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    No parts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-4 flex justify-end items-center gap-6 text-sm text-gray-600 border-t">
            <span>Rows per page: {rowsPerPage}</span>
            <span>
              {totalItems > 0 ? indexOfFirstRow + 1 : 0}-
              {Math.min(indexOfLastRow, totalItems)} of {totalItems}
            </span>
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`text-lg font-bold ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:text-indigo-600"}`}
              >
                &lt;
              </button>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`text-lg font-bold ${currentPage === totalPages || totalPages === 0 ? "opacity-30 cursor-not-allowed" : "hover:text-indigo-600"}`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
