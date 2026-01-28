import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const CashFlowLineGraph: React.FC = () => {
  const [scheduledData, setScheduledData] = useState<any[]>([]);
  const [allSchedule, setAllSchedule] = useState<any[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/revenue-api`);
      const data = response.data;

      // Convert dailyCashFlow object to array
      const schedule = Object.entries(data.dailyCashFlow || {}).map(
        ([date, cashNeeded]) => ({
          date,
          cashNeeded: cashNeeded ?? 0, // Ensure 0 if null or undefined
        }),
      );

      // ✅ Fill missing dates with 0
      if (schedule.length > 0) {
        const startDate = new Date(schedule[0].date);
        const endDate = new Date(schedule[schedule.length - 1].date);
        const allDates: any[] = [];

        for (
          let d = new Date(startDate);
          d <= endDate;
          d.setDate(d.getDate() + 1)
        ) {
          const dateStr = d.toISOString().split("T")[0];
          const existing = schedule.find((s) => s.date === dateStr);
          allDates.push({
            date: dateStr,
            cashNeeded: existing ? existing.cashNeeded : 0,
          });
        }
        setAllSchedule(allDates);
        const today = new Date();
        const defaultMonth =
          today.getFullYear() +
          "-" +
          String(today.getMonth() + 1).padStart(2, "0");
        setSelectedMonth(defaultMonth);
        filterByMonth(defaultMonth, allDates);
      }
    } catch (error) {
      console.error("Error fetching projection data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Month wise filter
  const filterByMonth = (month: string, data = allSchedule) => {
    if (!month) return;
    const [year, monthNum] = month.split("-");
    const filtered = data.filter((s) => {
      const d = new Date(s.date);
      return (
        d.getFullYear().toString() === year &&
        String(d.getMonth() + 1).padStart(2, "0") === monthNum
      );
    });
    setScheduledData(filtered);
  };

  useEffect(() => {
    if (selectedMonth) {
      filterByMonth(selectedMonth);
    }
  }, [selectedMonth, allSchedule]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
          <h2 className="text-2xl font-bold ">Cash Needed Over Time</h2>

          {/* Month Picker */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Select Month:</label>
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Line Graph */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scheduledData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) =>
                  new Date(date).toLocaleDateString("default", {
                    day: "numeric",
                    month: "short",
                  })
                }
              />
              <YAxis />
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="cashNeeded"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4, fill: "#10b981" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CashFlowLineGraph;
