import ScrapBar from "./ScrapBar";
import DatePicker from "react-datepicker";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";

interface SummaryData {
  totalActual: number;
  totalScrap: number;
  totalScheduled: number;
}

interface DetailData {
  [key: string]: string | number;
}

const CurrentQuality = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [summary, setSummary] = useState<SummaryData>({
    totalActual: 0,
    totalScrap: 0,
    totalScheduled: 0,
  });
  const [details, setDetails] = useState<DetailData[]>([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await axios.get(
        `${BASE_URL}/api/admin/current-status-overview`,
        { params },
      );
      if (response.data.summary) {
        setSummary(response.data.summary);
        setDetails(response.data.details || []);
      } else {
        setDetails(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, BASE_URL]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const statsData = [
    {
      title: "Production Progress",
      value: `${summary.totalActual} / ${summary.totalScheduled}`,
      subText: "Actual vs Scheduled",
      percentage:
        summary.totalScheduled > 0
          ? ((summary.totalActual / summary.totalScheduled) * 100).toFixed(1) +
            "%"
          : "0%",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Scrap",
      value: summary.totalScrap || "0",
      subText: "Total Quantity",
      percentage:
        summary.totalActual > 0
          ? (
              (summary.totalScrap /
                (summary.totalActual + summary.totalScrap)) *
              100
            ).toFixed(1) + "% Rate"
          : "0% Rate",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Current Quality Performance
          </h1>
        </div>
        <div className="flex items-center bg-white shadow-sm border rounded-lg px-3 py-2 gap-2">
          <Calendar size={18} className="text-gray-400" />
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date || new Date())}
            className="w-24 text-sm outline-none cursor-pointer"
            placeholderText="Start Date"
          />
          <span className="text-gray-300">|</span>
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date || new Date())}
            minDate={startDate}
            className="w-24 text-sm outline-none cursor-pointer"
            placeholderText="End Date"
          />
          {loading && (
            <div className="ml-2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {statsData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
          >
            <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
              {item.title}
            </p>
            <div className="flex justify-between items-end mt-2">
              <h2 className="text-3xl font-bold text-gray-800">{item.value}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${item.bg} ${item.color}`}
              >
                {item.percentage}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">{item.subText}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <ScrapBar apiData={details} />
      </div>
    </div>
  );
};

export default CurrentQuality;
