import React, { useState, useEffect } from "react";
import axios from "axios";
import scrap_cost from "../../assets/scrap_cost.png";
import supplier_return from "../../assets/supplier_return.png";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

// --- Interfaces ---

interface CardData {
  num: string;
  text: string;
  scrap_img: string;
}

interface ChartData {
  name: string;
  value: number;
}

interface ApiResponse {
  totalCOGS?: number;
  supplierReturn?: number;
  scrapCost?: number;
  monthlyCOGS?: Record<string, number>;
}
const formatDollar = (value: string | number): string =>
  `$${Number(value).toLocaleString()}`;

const Costing: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [monthlyCOGS, setMonthlyCOGS] = useState<ChartData[]>([]);

  const BASE_URL =
    (import.meta as any).env.VITE_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      if (!startDate || !endDate) return;

      try {
        const formattedStart = format(startDate, "yyyy-MM-dd");
        const formattedEnd = format(endDate, "yyyy-MM-dd");

        const res = await axios.get<ApiResponse>(
          `${BASE_URL}/api/admin/costing-data`,
          {
            params: { startDate: formattedStart, endDate: formattedEnd },
          },
        );

        const data = res.data;

        setCardsData([
          {
            num: formatDollar(data.totalCOGS || 0),
            text: "Total COGS",
            scrap_img: scrap_cost,
          },
          {
            num: formatDollar(data.supplierReturn || 0),
            text: "Supplier Return",
            scrap_img: supplier_return,
          },
          {
            num: formatDollar(data.scrapCost || 0),
            text: "Total Scrap Cost",
            scrap_img: scrap_cost,
          },
        ]);

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const cogs = data.monthlyCOGS || {};
        const yearKey = formattedStart.split("-")[0];

        const chartData: ChartData[] = months.map((month, index) => {
          const monthNum = String(index + 1).padStart(2, "0");
          const key = `${yearKey}-${monthNum}`;
          return { name: month, value: cogs[key] || 0 };
        });

        setMonthlyCOGS(chartData);
      } catch (error) {
        console.error("Error fetching costing data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate, BASE_URL]);

  const isToday = (date: Date | null): boolean => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="font-semibold text-2xl text-gray-800">
          Costing Analysis
        </h1>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
          <div className="flex flex-col px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">
              From
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              className="text-sm outline-none bg-transparent cursor-pointer w-24 text-gray-700"
            />
          </div>

          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
          <div className="flex flex-col px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase">
              To
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              className="text-sm outline-none bg-transparent cursor-pointer w-24 text-gray-700"
            />
          </div>

          {(!isToday(startDate) || !isToday(endDate)) && (
            <button
              onClick={() => {
                setStartDate(new Date());
                setEndDate(new Date());
              }}
              className="ml-2 text-xs text-blue-500 font-semibold hover:underline"
            >
              Today
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {cardsData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm border border-gray-100"
          >
            <div className="p-3 bg-blue-50 rounded-lg">
              <img
                className="w-8 h-8 object-contain"
                src={item.scrap_img}
                alt={item.text}
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{item.text}</p>
              <p className="font-bold text-2xl text-gray-800">{item.num}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-700">
            Monthly COGS Trend
          </h2>
          <p className="text-xs text-gray-400">
            Year: {startDate?.getFullYear() || new Date().getFullYear()}
          </p>
        </div>

        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyCOGS}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={{ fill: "#9CA3AF" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                fontSize={12}
                tick={{ fill: "#9CA3AF" }}
                tickFormatter={(val) => `$${val}`}
                width={60}
              />
              <Tooltip
                formatter={(value: number) => [formatDollar(value), "COGS"]}
                contentStyle={{
                  borderRadius: "10px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" />
              <Line
                name="Monthly COGS"
                type="monotone"
                dataKey="value"
                stroke="#052C89"
                strokeWidth={3}
                dot={{ r: 4, fill: "#052C89", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Costing;
