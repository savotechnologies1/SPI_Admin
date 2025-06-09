import { useState } from "react";

import Production from "./Production";
import Costing from "./Costing";
import FixedCost from "./FixedCost";
import Inventory from "./Inventory";

const tabs = ["Production", "Costing", "Fixed Cost", "Inventory"];

const BusinessIntelligence = () => {
  const [activeTab, setActiveTab] = useState("Production");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Production":
        return <p><Production/></p>;
      case "Costing":
        return <p><Costing/></p>;
      case "Fixed Cost":
        return <p><FixedCost/></p>;
      case "Inventory":
        return <p><Inventory/></p>;
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="p-7">
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Business Intelligence
        </h1>
        <div className="py-6">
          <div className="flex gap-4 border-b pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2  font-medium transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-800 "
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 text-gray-700 ">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessIntelligence;
