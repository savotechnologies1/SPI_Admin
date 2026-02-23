import DatePicker from "react-datepicker";
import DataTable from "./DataTable";
import TableCard from "./TableCard";
import { useEffect, useState } from "react";

// const Monitor = () => {
//   const [startDate, setStartDate] = useState(new Date("2024-08-25"));
//   const [endDate, setEndDate] = useState(new Date("2025-11-25"));
//   const tableList = [
//     { title: "Manual", columns: columnsManual, data: sampleData },
//     // { title: "Machine", columns: columnsManual, data: sampleData },
//     { title: "Part to Monitor", columns: columnsManual1, data: sampleData1 },
//     // { title: "Part to Monitor", columns: columnsManual2, data: sampleData2 },git
//     // {
//     //   title: "Manual Scrap & Machine Scrap by Process",
//     //   columns: columnsManual1,
//     //   data: sampleData1,
//     // },
//     // {
//     //   title: "Cycle Time By Process",
//     //   columns: columnsManual2,
//     //   data: sampleData2,
//     // },
//   ];

//   return (
//     <>
//       <div className="flex items-center gap-2 justify-end">
//         <DatePicker
//           selected={startDate}
//           onChange={(date) => setStartDate(date)}
//           dateFormat="dd/MM/yyyy"
//           className="border rounded-md p-1 text-xs"
//         />
//         <span>-</span>
//         <DatePicker
//           selected={endDate}
//           onChange={(date) => setEndDate(date)}
//           dateFormat="dd/MM/yyyy"
//           className="border rounded-md p-1 text-xs"
//         />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
//         {tableList.map((table, i) => (
//           <TableCard key={i} title={table.title}>
//             <DataTable columns={table.columns} data={table.data} />
//           </TableCard>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Monitor;

import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Calendar } from "lucide-react";

const Monitor = () => {
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Monitoring Dashboard
        </h1>

        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200 shadow-sm ml-auto">
          {/* Start Date */}
          <div className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-md transition-colors">
            <Calendar size={16} className="text-blue-500" />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                From
              </span>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy" // <-- Format Changed Here
                className="bg-transparent text-sm font-medium outline-none text-gray-700 w-24 cursor-pointer"
              />
            </div>
          </div>

          <div className="h-8 w-[1px] bg-gray-200"></div>

          {/* End Date */}
          <div className="flex items-center gap-2 px-2 hover:bg-gray-50 rounded-md transition-colors">
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">
                To
              </span>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MM/dd/yyyy"
                minDate={startDate}
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
