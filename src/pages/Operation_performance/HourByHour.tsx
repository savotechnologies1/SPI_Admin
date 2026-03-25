import scrap_cost from "../../assets/scrap_cost.png";
import supplier_return from "../../assets/supplier_return.png";
import axios from "axios";
import { useEffect, useState } from "react";
import ProcessTable from "../productionLive/Cut$Trim";

const HourByHour = () => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  const [processTablesData, setProcessTablesData] = useState([]);
  const [totalData, setTotalData] = useState();
  const fetchData = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/admin/production/overview`,
    );
  };

  const fetcHourlyhData = async () => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await axios.get(
      `${BASE_URL}/api/admin/production/processes/hourly?tz=${userTimeZone}`,
    );
    setProcessTablesData(response.data.allProcessData);
    setTotalData(response.data.grandTotals);
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
              <p className="font-bold text-xl">{totalData?.actual}</p>
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
              <p className="font-bold text-xl">{totalData?.scrap}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
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
