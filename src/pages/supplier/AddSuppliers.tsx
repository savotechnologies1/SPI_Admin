import { FaCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const AddSuppliers = () => {
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Create a new Supplier
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[16px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Suppliers
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            New suppliers
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl md:w-2/3">
        <label className="font-semibold" htmlFor="">
          Suppliers Name
        </label>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
          <div className="sm:w-1/2">
            <input
              type="text"
              placeholder="First Name"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className="sm:w-1/2">
            <input
              type="text"
              placeholder="Last Name"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>
        <label className="font-semibold " htmlFor="">
          Suppliers Email
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="Email address"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
          Address
        </label>
        <div className="mt-2 w-full mb-6">
          <input
            type="text"
            placeholder="Address"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <label className="font-semibold " htmlFor="">
          Billing Terms (In Days) <span className="text-red-700">*</span>
        </label>
        <div className="mt-2 w-full">
          <input
            type="text"
            placeholder="Billing Terms"
            className="border py-4 px-4 rounded-md w-full "
          />
        </div>
        <div className="mt-6 text-end">
          <button className="bg-brand text-white px-5 py-3 rounded-lg ">
            <Link to={"/supplier-list"}>Create Supplier</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSuppliers;
