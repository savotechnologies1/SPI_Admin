import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DataTable from "../Operation_performance/DataTable";
import "react-datepicker/dist/react-datepicker.css";

import { Calendar, ArrowRight } from "lucide-react";

const MonitorManagement = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [manualData, setManualData] = useState([]);
  const [monitorData, setMonitorData] = useState([]);
  const [productionScrapData, setProductionScrapData] = useState([]);

  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/monitor-chart-data`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      setManualData(res.data.manualTable);
      setMonitorData(res.data.monitorTable);
      setProductionScrapData(res.data.productionScrap);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-5">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 mt-5">
        <div>
          <h1 className="font-bold text-2xl text-gray-800 tracking-tight">
            Monitor Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time production & manual tracking
          </p>
        </div>

        <div className="flex items-center bg-white border border-gray-200 shadow-sm rounded-2xl p-2 gap-2 ml-auto">
          {/* Start Date */}
          <div className="flex items-center gap-3 px-3 py-1 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <Calendar size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                From
              </span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                className="bg-transparent text-sm font-semibold text-gray-700 outline-none w-24 cursor-pointer"
              />
            </div>
          </div>

          <ArrowRight size={16} className="text-gray-300" />

          <div className="flex items-center gap-3 px-3 py-1 hover:bg-gray-50 rounded-xl transition-all cursor-pointer">
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                To
              </span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MM/dd/yyyy"
                minDate={startDate}
                className="bg-transparent text-sm font-semibold text-gray-700 outline-none w-24 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6">
        <DataTable
          manualData={manualData}
          monitorData={monitorData}
          productionScrapData={productionScrapData}
        />
      </div>
      <style>{`
        .react-datepicker {
          border: none !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
          font-family: inherit !important;
        }
        .react-datepicker__header {
          background-color: #fff !important;
          border-bottom: 1px solid #f3f4f6 !important;
          border-top-left-radius: 12px !important;
          border-top-right-radius: 12px !important;
        }
        .react-datepicker__day--selected {
          background-color: #3b82f6 !important;
          border-radius: 6px !important;
        }
      `}</style>
    </div>
  );
};

export default MonitorManagement;
