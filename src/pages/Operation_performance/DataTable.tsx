// import React from "react";

// interface DataTableProps {
//   columns: string[];
//   data: Record<string, any>[]; // Safer than `any`
// }

// const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
//   console.log("datadat3333333333a", data);

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full text-sm text-left border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             {columns.map((col, i) => (
//               <th key={i} className="px-2 py-2 border whitespace-nowrap">
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, i) => (
//             <tr key={i} className="even:bg-gray-50">
//               {columns.map((col, j) => (
//                 <td key={j} className="px-3 py-2 text-[14px] whitespace-nowrap">
//                   {row[col]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DataTable;
// import React from "react";

// const DataTable: React.FC = (manualData, monitorData) => {
//   console.log("manualDatamanualData", monitorData);

//   return (
//     <div className="space-y-10 bg-white  rounded-2xl p-4 w-full">
//       {/* Manual Table */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Manual</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-3 py-2 border">Process</th>
//                 <th className="px-3 py-2 border">Part Number</th>
//                 <th className="px-3 py-2 border">Qty</th>
//                 <th className="px-3 py-2 border">Scrap</th>
//               </tr>
//             </thead>
//             <tbody>
//               {manualData.manualData.map((item) => (
//                 <>
//                   <tr className="even:bg-gray-50">
//                     <td className="px-3 py-2 border">{item.processName}</td>
//                     <td className="px-3 py-2 border">{item.processDesc}</td>
//                     <td className="px-3 py-2 border">{item.totalQuantity}</td>
//                     <td className="px-3 py-2 border">{item.totalScrap}</td>
//                   </tr>
//                 </>
//               ))}
//               {/* <tr className="even:bg-gray-50">
//                 <td className="px-3 py-2 border">Inspection</td>
//                 <td className="px-3 py-2 border">Part B</td>
//                 <td className="px-3 py-2 border">15</td>
//                 <td className="px-3 py-2 border">1</td>
//               </tr>
//               <tr className="even:bg-gray-50">
//                 <td className="px-3 py-2 border">CutTrim</td>
//                 <td className="px-3 py-2 border">Part C</td>
//                 <td className="px-3 py-2 border">8</td>
//                 <td className="px-3 py-2 border">0</td>
//               </tr> */}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Part to Monitor Table */}
//       <div>
//         <h2 className="text-lg font-semibold mb-3">Part to Monitor</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-3 py-2 border">Process</th>
//                 <th className="px-3 py-2 border">Part Desc.</th>
//                 <th className="px-3 py-2 border">Cycle Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* {monitorData.monitorData.map((item) => (
//                 <tr className="even:bg-gray-50">
//                   <td className="px-3 py-2 border">{item.processName}</td>
//                   <td className="px-3 py-2 border">{item.part}</td>
//                   <td className="px-3 py-2 border">{item.cycleTime}</td>
//                 </tr>
//               ))} */}

//               <tr className="even:bg-gray-50">
//                 <td className="px-3 py-2 border">Inspection</td>
//                 <td className="px-3 py-2 border">Part B</td>
//                 <td className="px-3 py-2 border">3 min</td>
//               </tr>
//               <tr className="even:bg-gray-50">
//                 <td className="px-3 py-2 border">CutTrim</td>
//                 <td className="px-3 py-2 border">Part C</td>
//                 <td className="px-3 py-2 border">7 min</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

import React from "react";

interface ManualItem {
  processId: string;
  processName: string;
  processDesc: string;
  part: string;
  totalQuantity: number;
  totalCompleted: number;
  totalScrap: number;
}

interface MonitorItem {
  processName: string;
  processDesc: string;
  part: string;
  cycleTime: string;
}

interface DataTableProps {
  manualData: ManualItem[];
  monitorData: MonitorItem[];
}

const DataTable: React.FC<DataTableProps> = ({ manualData, monitorData }) => {
  return (
    <div className="space-y-10 bg-white rounded-2xl p-4 w-full ">
      {/* Manual Table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Manual</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Process</th>
                <th className="px-3 py-2 border">Part Desc.</th>
                <th className="px-3 py-2 border">Qty</th>
                <th className="px-3 py-2 border">Scrap</th>
              </tr>
            </thead>
            <tbody>
              {manualData.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-3 py-2 border">{item.processName}</td>
                  <td className="px-3 py-2 border">{item.part}</td>
                  <td className="px-3 py-2 border">{item.totalQuantity}</td>
                  <td className="px-3 py-2 border">{item.totalScrap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part to Monitor Table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Part to Monitor</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">Process</th>
                <th className="px-3 py-2 border">Part Desc.</th>
                <th className="px-3 py-2 border">Cycle Time</th>
              </tr>
            </thead>
            <tbody>
              {monitorData.map((item, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-3 py-2 border">{item.processName}</td>
                  <td className="px-3 py-2 border">{item.part}</td>
                  <td className="px-3 py-2 border">
                    {item.cycleTime ? item.cycleTime : "00"} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
