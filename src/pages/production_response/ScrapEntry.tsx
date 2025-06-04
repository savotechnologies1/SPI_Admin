import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import PartForm from "./PartForm";
import ProductForm from "./ProductForm";

const ScrapEntry = () => {
  const [activeTab, setActiveTab] = useState("part"); // 'part' or 'product'

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Scrap Entry
        </h1>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <p className="text-[14px] text-black">
            <NavLink to="/dashboardDetailes">Dashboard</NavLink>
          </p>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-[14px]">Shop Floor</span>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-[14px]">Scrap Entry</span>
        </div>
      </div>

      <div className="py-6 bg-white mt-4 rounded-md p-4">
        {/* Custom Tabs Implementation */}
        <div className="flex gap-4 border-b">
          <button
            className={`p-2 px-4 rounded-t-md transition cursor-pointer ${
              activeTab === "part" ? "bg-brand text-white" : "bg-transparent"
            }`}
            onClick={() => setActiveTab("part")}
          >
            Part
          </button>
          <button
            className={`p-2 px-4 rounded-t-md transition cursor-pointer ${
              activeTab === "product" ? "bg-brand text-white" : "bg-transparent"
            }`}
            onClick={() => setActiveTab("product")}
          >
            Product
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-4">
          {activeTab === "part" ? <PartForm /> : <ProductForm />}
        </div>
      </div>
    </div>
  );
};

export default ScrapEntry;