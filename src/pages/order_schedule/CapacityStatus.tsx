import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import CapacityBarChart from "./CapacityBarChart";
import CapacityRadialChart from "./CapacityRadialChart";

interface ScheduleItem {
  id: string | number;
  processName: string;
  machineName: string;
  partNumber: string;
  cycleTimeFromPart: number;
  scheduleQuantity: number;
  loadTime: number;
  status: string;
  order_date: string;
}

interface BarChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

interface CapacityStatusResponse {
  barChartData: BarChartData;
  scheduleData: ScheduleItem[];
  processCompletion: any;
  overallAverage: number;
}

const CapacityStatus: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [barChartData, setBarChartData] = useState<BarChartData | null>(null);
  const [processCompletion, setProcessCompletion] = useState<any | null>(null);
  const [overallAverage, setOverallAverage] = useState<number>(0);

  const BASE_URL =
    (import.meta as any).env.VITE_SERVER_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchCapacityStatus = async () => {
      try {
        const res = await axios.get<CapacityStatusResponse>(
          `${BASE_URL}/api/admin/capacity-status-data`,
        );
        setBarChartData(res.data.barChartData);
        setScheduleData(res.data.scheduleData);
        setProcessCompletion(res.data.processCompletion);
        setOverallAverage(res.data.overallAverage);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchCapacityStatus();
  }, [BASE_URL]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen mt-5">
      <h1 className="font-semibold text-[24px] text-black">Capacity Status</h1>

      <div className="flex gap-2 items-center mt-2 text-sm text-gray-500">
        <NavLink to="/dashboardDetailes" className="text-black hover:underline">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px]" />
        <span>Daily Schedule & Capacity</span>
        <FaCircle className="text-[6px]" />
        <span className="font-medium text-black">Capacity Status</span>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <div className="md:w-[60%] bg-white p-4 rounded-lg shadow-sm">
          <CapacityBarChart chartData={barChartData} />
        </div>
        <div className="md:w-[40%] bg-white p-4 rounded-lg shadow-sm">
          <CapacityRadialChart
            processCompletion={processCompletion}
            overallAverage={overallAverage}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg mt-4 overflow-hidden shadow-sm">
        <h2 className="p-4 text-lg font-semibold border-b">
          Process Status (Completed Orders)
        </h2>
        <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="py-3 px-4 text-left">Process</th>
                <th className="py-3 px-4 text-left">Part Number</th>
                <th className="py-3 px-4 text-left">Cycle Time</th>
                <th className="py-3 px-4 text-left">Schedule Qty</th>
                <th className="py-3 px-4 text-left">Load</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Order Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {!loading && scheduleData.length > 0
                ? scheduleData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium">
                        {row.processName} ({row.machineName})
                      </td>
                      <td className="py-3 px-4 text-sm">{row.partNumber}</td>
                      <td className="py-3 px-4 text-sm">
                        {row.cycleTimeFromPart} min
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {row.scheduleQuantity}
                      </td>
                      <td className="py-3 px-4 text-sm font-semibold">
                        {row.loadTime} min
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                            row.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {row.order_date
                          ? new Date(row.order_date).toLocaleDateString("en-US")
                          : "-"}
                      </td>
                    </tr>
                  ))
                : !loading && (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-gray-400"
                      >
                        No schedule data found.
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CapacityStatus;
