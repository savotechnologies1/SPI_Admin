
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DataTable, { ManualItem, MonitorItem, ProductionItem } from "./DataTable";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Calendar } from "lucide-react";

interface MonitorApiResponse {
  manualTable: ManualItem[];
  monitorTable: MonitorItem[];
  productionScrap: ProductionItem[];
}

const Monitor: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [manualData, setManualData] = useState<ManualItem[]>([]);
  const [monitorData, setMonitorData] = useState<MonitorItem[]>([]);
  const [productionScrapData, setProductionScrapData] = useState<ProductionItem[]>([]);
  const BASE_URL = (import.meta as any).env.VITE_SERVER_URL || "http://localhost:5000";

  const fetchData = async () => {
    if (!startDate || !endDate) return;

    try {
      const res = await axios.get<MonitorApiResponse>(
        `${BASE_URL}/api/admin/monitor-chart-data`,
        {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        }
      );

      setManualData(res.data.manualTable || []);
      setMonitorData(res.data.monitorTable || []);
      setProductionScrapData(res.data.productionScrap || []);
    } catch (err) {
     throw err
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Monitoring Dashboard</h1>

        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm ml-auto">
          <div className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-md transition-colors">
            <Calendar size={16} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">From</span>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                className="bg-transparent text-sm font-medium outline-none text-gray-700 w-24 cursor-pointer"
              />
            </div>
          </div>

          <div className="h-8 w-[1px] bg-gray-200"></div>

          <div className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">To</span>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date)}
                dateFormat="MM/dd/yyyy"
                minDate={startDate || undefined}
                className="bg-transparent text-sm font-medium outline-none text-gray-700 w-24 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <DataTable
          manualData={manualData}
          monitorData={monitorData}
          productionScrapData={productionScrapData}
        />
      </div>
    </div>
  );
};

export default Monitor;