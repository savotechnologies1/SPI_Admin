import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Tables from "./Tables";
import { FaSpinner } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_SERVER_URL;
const BusinessAnalysis = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 30)),
  );
  const [endDate, setEndDate] = useState(new Date());
  const formatDate = (date) => date.toISOString().split("T")[0];
  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/api/admin/business-analysis?startDate=${formatDate(
            startDate,
          )}&endDate=${formatDate(endDate)}`,
        );
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("API Error:", error);
        setMetrics({
          totalRevenue: 175592.0,
          totalCOGS: 118212.3,
          totalFixedCost: 97232.88,
          Profit: -39853.18,
          InventoryCost: -8916.98,
          scrapCost: 1509.7,
          bomCost: 70842.6,
          laborCost: 45860.0,
          supplierReturn: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    if (startDate && endDate) {
      fetchMetrics();
    }
  }, [startDate, endDate]);

  return (
    <div className="p-7 bg-gray-50 min-h-screen relative">
      <div className="flex flex-col md:flex-row justify-between mb-6 items-start md:items-center">
        <h1 className="font-bold text-[24px] text-black">Business Analysis</h1>

        <div className="flex gap-4 items-center mt-2 md:mt-0">
          <div className="flex items-center gap-2 bg-white p-2 rounded shadow-sm border">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MM/dd/yyyy"
              className="outline-none text-sm w-24 text-center cursor-pointer"
            />
            <span className="text-gray-400">|</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="MM/dd/yyyy"
              className="outline-none text-sm w-24 text-center cursor-pointer"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
          <p className="text-gray-500 font-medium">Fetching Data...</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-300 shadow-lg p-8 max-w-5xl mx-auto min-h-[600px] transition-opacity duration-300">
          {metrics && <Tables metrics={metrics} />}
        </div>
      )}
    </div>
  );
};

export default BusinessAnalysis;
