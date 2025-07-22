import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import SupplierOrdersForm from "./SupplierOrdersForm";
import { useState } from "react";
import SupplierOrderList from "./supplierOrderList";

const orders = ["12345", "23456", "34567", "45678", "56789", "67890", "78901"];
const SupplierOrders = () => {
  const [query, setQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredOrders([]);
    } else {
      const results = orders.filter((order) => order.includes(value.trim()));
      setFilteredOrders(results);
    }
  };
  return (
    <div className="p-4 mt-4">
      <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 md:mb-0">
        <div>
          {" "}
          <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
            Supplier Orders
          </h1>
        </div>
        <div className="relative w-[400px]">
          <input
            type="text"
            placeholder="Search order number..."
            value={query}
            onChange={handleChange}
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg outline-none focus:ring-0 focus:border-gray-400"
          />
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2a7 7 0 010 14z"
              />
            </svg>
          </div>

          {filteredOrders.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-40 overflow-auto shadow-md">
              {filteredOrders.map((order, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setQuery(order);
                    setFilteredOrders([]);
                  }}
                >
                  {order}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex justify-between  items-center">
        <div className="flex gap-2 items-center ">
          <p
            className={`text-[14px] text-black`}
            onClick={() => "dashboardDetailes"}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">Supplier's </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            {" "}
            Supplier Order
          </span>
        </div>
      </div>

      <div className="py-6">
        <SupplierOrdersForm /> <SupplierOrderList query={query} />
      </div>
    </div>
  );
};

export default SupplierOrders;
