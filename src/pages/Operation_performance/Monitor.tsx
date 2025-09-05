import DatePicker from "react-datepicker";
import DataTable from "./DataTable";
import TableCard from "./TableCard";
import { useEffect, useState } from "react";

const sampleData = [
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    Qty: "01",
    Scrap: "01",
  },
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    Qty: "01",
    Scrap: "01",
  },
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    Qty: "01",
    Scrap: "01",
  },
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    Qty: "01",
    Scrap: "01",
  },
];

const sampleData1 = [
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    "Cycle Time": "01",
  },
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    "Cycle Time": "01",
  },
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    "Cycle Time": "01",
  },
  {
    Process: "Inspection",
    "Part Desc.": "Quick Brackets for Inner ",
    "Cycle Time": "01",
  },
];
const sampleData2 = [
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
  {
    ID: "100",
    "Part Desc.": "Quick Brackets for Inner ",
    "Machine Timer": "01",
    "Op Timer": "01",
    "Total CT": "01",
  },
];

const columnsManual = ["Process", "Part Desc.", "Qty", "Scrap"];
const columnsManual1 = ["Process", "Part Desc.", "Cycle Time"];
const columnsManual2 = [
  "ID",
  "Part Desc.",
  "Machine Timer",
  "Op Timer",
  "Total CT",
];

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

const Monitor = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [manualData, setManualData] = useState([]);
  const [monitorData, setMonitorData] = useState([]);
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
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  console.log("manualDatamanualData", manualData);

  const tableList = [
    { title: "Manual", columns: columnsManual, data: manualData },
    { title: "Part to Monitor", columns: columnsManual1, data: monitorData },
  ];

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="dd/MM/yyyy"
          className="border rounded-md p-1 text-xs"
        />
        <span>-</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="dd/MM/yyyy"
          className="border rounded-md p-1 text-xs"
        />
      </div>
      <div className="flex  justify-between items-center gap-8 p-6">
        {/* <DataTable columns={table.columns} data={table.data} /> */}
        <DataTable manualData={manualData} monitorData={monitorData} />
      </div>
    </>
  );
};

export default Monitor;
