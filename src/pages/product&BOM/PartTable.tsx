import { useContext } from "react";
import { PartContext } from "../../components/Context/PartContext";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function PartTable() {
  const partContext = useContext(PartContext);

  if (!partContext) {
    throw new Error("PartContext is undefined. Ensure it is properly provided.");
  }

  const { parts } = partContext;

  return (
    <div className="p-4">
      <div>
        {" "}
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Browse BOM
        </h1>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            product and Bom
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            Browse bom
          </span>
        </div>
      </div>
      <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <div className="flex justify-between gap-4 items-center mb-6">
          <div className="w-1/2">
            <select className="border w-full px-3 py-2 rounded-md">
              <option>Select product number</option>
              <option>1</option>
            </select>
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Search..."
              className="border w-full px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <BsThreeDotsVertical
              className="text-black hover:text-black cursor-pointer text-lg"
              title="More Options"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full border-collapse  border-gray-300">
          <thead className="bg-gray-200">
            <tr className="whitespace-nowrap">
              <th className="border p-2 font-semibold text-gray-600">
                Part Number
              </th>
              <th className="border p-2 font-semibold text-gray-600">
                Part Family
              </th>
              <th className="border p-2 font-semibold text-gray-600">
                Part Desc
              </th>
              <th className="border p-2 font-semibold text-gray-600">Cost</th>
              <th className="border p-2 font-semibold text-gray-600">
                LeadTimeDays
              </th>
              <th className="border p-2 font-semibold text-gray-600">
                Availble stock
              </th>
              <th className="border p-2 font-semibold text-gray-600">
                order qty.
              </th>
              <th className="border p-2 font-semibold text-gray-600"></th>
            </tr>
          </thead>
          <tbody>
            {parts.map((part, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b border-dashed p-2">
                  {part.partNumber}
                </td>
                <td className="border-b border-dashed p-2">
                  {part.partFamily}
                </td>
                <td className="border-b border-dashed p-2">
                  {part.description}
                </td>
                <td className="border-b border-dashed p-2">${part.cost}</td>
                <td className="border-b border-dashed p-2">{part.leadTime}</td>
                <td className="border-b border-dashed p-2">
                  {part.availableStock}
                </td>
                <td className="border-b border-dashed p-2">{part.orderQty}</td>
                <td className="flex items-center gap-4 border-b border-dashed p-2">
                  {/* Edit Icon */}
                  <FiEdit2
                    className="text-black  cursor-pointer text-lg"
                    title="Quick Edit"
                  />
                  {/* More Icon */}
                  <BsThreeDotsVertical
                    className="text-black hover:text-black cursor-pointer text-lg"
                    title="More Options"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
