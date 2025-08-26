import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import SupplierOrdersForm from "./SupplierOrdersForm";

const SupplierOrders = () => {
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
      </div>
    </div>
  );
};

export default SupplierOrders;
