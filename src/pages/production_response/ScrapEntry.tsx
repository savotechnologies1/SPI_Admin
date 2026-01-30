import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCircle } from "react-icons/fa";
import PartForm from "./PartForm";
import ProductForm from "./ProductForm";
const ScrapEntry = () => {
  const [activeTab, setActiveTab] = useState("part");
  const navigate = useNavigate();

  return (
    <div className="p-6 mt-5">
      <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium"
          title="Go Back"
        >
          <FaArrowLeft />
          Back
        </button>
      <div className="flex flex-wrap items-center gap-4">
      

        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Scrap Entry
        </h1>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mt-3 text-[14px]">
        <NavLink to="/dashboardDetailes" className="text-black hover:underline">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px] text-gray-400" />
        <span className="text-gray-500">Production Response</span>
        <FaCircle className="text-[6px] text-gray-400" />
        <span className="font-medium text-black">Scrap Entry</span>
      </div>

      {/* Content Box */}
      <div className="bg-white mt-5 rounded-lg shadow-sm border">
        {/* Tabs */}
        <div className="flex gap-2 border-b px-4 pt-4">
          <button
            onClick={() => setActiveTab("part")}
            className={`px-6 py-2 rounded-t-md font-medium transition
              ${
                activeTab === "part"
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            Part
          </button>

          <button
            onClick={() => setActiveTab("product")}
            className={`px-6 py-2 rounded-t-md font-medium transition
              ${
                activeTab === "product"
                  ? "bg-brand text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            Product
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "part" ? <PartForm /> : <ProductForm />}
        </div>
      </div>
    </div>
  );
};

export default ScrapEntry;
