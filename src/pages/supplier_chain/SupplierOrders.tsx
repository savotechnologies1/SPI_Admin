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
        <SupplierOrdersForm />

        {/* <SupplierOrderList query={query} /> */}
      </div>
    </div>
  );
};

export default SupplierOrders;
