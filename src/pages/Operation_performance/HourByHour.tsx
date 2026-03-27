
import React, { useEffect, useState } from "react";
import axios from "axios";
import scrap_cost from "../../assets/scrap_cost.png";
import supplier_return from "../../assets/supplier_return.png";
import ProcessTable from "../productionLive/Cut$Trim";

interface HourlyEntry {
  hour: string;
  actual: number;
  scrap: number;
}

interface ProcessData {
  processName: string;
  machineName: string;
  hourlyData: HourlyEntry[];
  total: {
    actual: number;
    scrap: number;
  };
  employees: string[]; 
}

interface GrandTotals {
  actual: number;
  scrap: number;
}

interface HourlyApiResponse {
  allProcessData: ProcessData[];
  grandTotals: GrandTotals;
}

const HourByHour: React.FC = () => {
  const BASE_URL =
    (import.meta as any).env.VITE_SERVER_URL || "http://localhost:8086";

  const [processTablesData, setProcessTablesData] = useState<ProcessData[]>([]);
  const [totalData, setTotalData] = useState<GrandTotals | undefined>(
    undefined,
  );

  const fetchData = async () => {
    try {
      await axios.get(`${BASE_URL}/api/admin/production/overview`);
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  const fetcHourlyhData = async () => {
    try {
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await axios.get<HourlyApiResponse>(
        `${BASE_URL}/api/admin/production/processes/hourly?tz=${userTimeZone}`,
      );
      setProcessTablesData(response.data.allProcessData || []);
      setTotalData(response.data.grandTotals);
    } catch (error) {
      console.error("Error fetching hourly data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetcHourlyhData();
  }, []);
  const currentHour = new Date().getHours();
  let shift = 1;
  if (currentHour >= 6 && currentHour < 14) shift = 1;
  else if (currentHour >= 14 && currentHour < 22) shift = 2;
  else shift = 3;

  return (
    <div>
      <div className="flex flex-col md:flex-row mt-2 gap-4">
        <div className="flex flex-col justify-between bg-white rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
          <div className="flex items-center gap-2">
            <div>
              <img className="w-[40px]" src={scrap_cost} alt="scrap cost" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Actual</p>
              <p className="font-bold text-xl">{totalData?.actual ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-white rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
          <div className="flex items-center gap-2">
            <div>
              <img
                className="w-[40px]"
                src={supplier_return}
                alt="supplier return"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Scrap</p>
              <p className="font-bold text-xl">{totalData?.scrap ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {processTablesData.map((process, index) => (
          <div key={index} className="bg-white">
            <ProcessTable
              processName={process.processName}
              machineName={process.machineName}
              hourlyData={process.hourlyData}
              total={process.total}
              employees={process.employees} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourByHour;
