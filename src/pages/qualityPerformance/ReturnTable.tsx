import {
  Pin,
  Copy,
  Filter,
  Maximize2,
  MoreHorizontal,
  Calendar,
  User,
} from "lucide-react";

const ReturnTable = ({ title, data, nameLabel }) => {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header Section - Icons match your screenshot */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold text-[#1a1a1a]">{title}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[12px] text-gray-500 border-b border-gray-100">
              <th className="p-4 font-semibold">
                <span className="flex items-center gap-1">
                  <Calendar size={14} className="text-gray-400" /> Date
                </span>
              </th>
              <th className="p-4 font-semibold">
                <span className="flex items-center gap-1">
                  <User size={14} className="text-gray-400" /> {nameLabel}
                </span>
              </th>
              <th className="p-4 font-semibold">Part</th>
              <th className="p-4 font-semibold">Is Scrap</th>
              <th className="p-4 font-semibold">Defect</th>
              <th className="p-4 font-semibold text-right">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={index}
                  className="text-[13px] hover:bg-gray-50 transition-colors"
                >
                  {/* Date Column */}
                  <td className="p-4 text-gray-600 whitespace-nowrap">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Name Column (Bold like screenshot) */}
                  <td className="p-4 font-bold text-gray-800">
                    {item.customerName || item.supplierName || "N/A"}
                  </td>

                  {/* Part Description Column */}
                  <td className="p-4 text-gray-600">
                    <div className="max-w-[350px]">
                      <p className="leading-tight">{item.partNumber}</p>
                    </div>
                  </td>

                  {/* Is Scrap & Defect (Hardcoded as per screenshot) */}
                  <td className="p-4 text-gray-600">Yes</td>
                  <td className="p-4 text-gray-600">{item.defectDesc}</td>

                  {/* Qty Column */}
                  <td className="p-4 text-right font-medium text-gray-700">
                    {(item.quantity || 0).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="p-10 text-center text-gray-400 italic"
                >
                  No records found for the selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnTable;
