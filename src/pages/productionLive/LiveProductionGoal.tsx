import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import ProcessTable from "./Cut$Trim";

interface HourByHourItem {
  label: string;
  value: string | number;
  image: string;
}

interface PieChartItem {
  name: string;
  value: number;
  color: string;
}

interface OverviewData {
  hourByHour: HourByHourItem[];
  pieChartData: PieChartItem[];
}

interface HourlyEntry {
  hour: string;
  target: number;
  actual: number;
  scrap: number;
}

interface ProcessData {
  processName: string;
  machineName: string;
  hourlyData: HourlyEntry[];
  total: {
    target: number;
    actual: number;
    scrap: number;
  };
  employees: string[];
}

const LiveProductionGoal: React.FC = () => {
  const BASE_URL =
    (import.meta as any).env.VITE_SERVER_URL || "http://localhost:8086";

  const [overviewData, setOverviewData] = useState<OverviewData>({
    hourByHour: [],
    pieChartData: [],
  });
  const [processTablesData, setProcessTablesData] = useState<ProcessData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const [overviewRes, processRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/production/overview`),
          fetch(
            `${BASE_URL}/api/admin/production/processes/hourly?tz=${userTimeZone}`,
          ),
        ]);

        if (!overviewRes.ok || !processRes.ok) {
          throw new Error("Failed to fetch data from server");
        }

        const overview: OverviewData = await overviewRes.json();
        const processDataResponse = await processRes.json();

        setOverviewData(overview);
        setProcessTablesData(processDataResponse.allProcessData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [BASE_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
          <p className="mt-4 font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 mt-5">
      <div className="flex flex-col xl:flex-row justify-between w-full gap-4">
        <div className="xl:w-[70%] flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-2xl mt-4">
              Live Production Goal Board
            </h1>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-700">
              Hour By Hour
            </h2>
            <div className="flex flex-col md:flex-row mt-2 gap-4">
              {overviewData.hourByHour.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-white rounded-md w-full border p-4 shadow-sm"
                >
                  <div>
                    <p className="font-bold text-2xl text-gray-800">
                      {item.value}
                    </p>
                    <p className="text-sm text-gray-500">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="xl:w-[30%] bg-white p-4 rounded-lg border shadow-sm">
          <PieChart data={overviewData.pieChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {processTablesData.map((process, index) => (
          <div key={index} className="bg-white border rounded-lg shadow-sm">
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

export default LiveProductionGoal;
