import data from "../../components/Data/customerReturnData";
import client_icon from "../../assets/client.png";
import date_icon from "../../assets/date.png";
import pin from "../../assets/pin.png";
import copy from "../../assets/copy.png";
import filter from "../../assets/byte_filter.png";
import fullscren from "../../assets/fullscreen.png";
import more from "../../assets/more.png";
import React from "react";

const SupplierReturn = ({ qualityData }) => {
  console.log("qualityData", qualityData);

  return (
    <div className="py-6 bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold px-4">Manual</h1>
        </div>
      </div>

      <div className="overflow-x-auto py-6">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left font-medium">Process</th>
              <th className="px-4 py-3 text-left font-medium">
                Part Description
              </th>
              {/* <th className="px-4 py-3 text-left font-medium">
                Schedule Quantity
              </th> */}
              <th className="px-4 py-3 text-left font-medium">
                Scrap Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {qualityData.map((item, index) => (
              <tr key={index}>
                {/* Access process correctly from item.part.process */}
                <td className="px-4 py-4 text-sm sm:text-base">
                  {item.part.process.processName}
                </td>

                <td className="px-4 py-4 text-sm sm:text-base">
                  {item.part.partDescription}
                </td>

                {/* <td className="px-4 py-4 text-sm sm:text-base">
                  {item.scheduleQuantity}
                </td> */}

                <td className="px-4 py-4 text-sm sm:text-base">
                  {item.scrapQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierReturn;
