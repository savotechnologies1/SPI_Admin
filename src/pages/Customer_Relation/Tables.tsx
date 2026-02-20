import React, { useEffect, useState } from "react";
import axios from "axios";

const columnsManual = [
  "Date",
  "Order",
  "First Name",
  "Last Name",
  "Product Qty",
  "Qty",
];

const Tables = ({ startDate, endDate }) => {
  const [data, setData] = useState({
    openOrders: [],
    fulfilledOrders: [],
    supplierReturn: [],
    performance: [],
  });
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/customer-relation-data`,
          {
            params: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          },
        );
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching supplier relation:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const renderTable = (title: string, rows: any[]) => {
    if (!rows || rows.length === 0) {
      return (
        <div className="border rounded-lg shadow bg-white p-4">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <p className="text-center text-gray-500">No Data Available</p>
        </div>
      );
    }

    const columns = Object.keys(rows[0]);

    return (
      <div className="border rounded-lg shadow bg-white p-4">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="max-h-[250px] overflow-y-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={i}
                    className="border border-gray-300 px-4 py-2 bg-gray-100"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {row[col] !== null ? row[col]?.toString() : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Customer Relations</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderTable("Open Orders", data.openOrders)}
        {renderTable("Fulfilled Orders", data.fulfilledOrders)}
        {renderTable("Performance", data.performance)}
        {renderTable("Scrap Entries", data.scapEntries)}
      </div>
    </div>
  );
};

export default Tables;
