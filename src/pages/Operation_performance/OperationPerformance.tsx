import  { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Machine from "./Machine";
import HourByHour from "./HourByHour";
import Dive from "./Dive";
import Monitor from "./Monitor";

const tabs = ["Machine", "Hour by Hour", "Monitor", "Dive"];

const OperationPerformance = () => {
  const [activeTab, setActiveTab] = useState("Machine");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Machine":
        return (
          <p>
           <Machine/>
          </p>
        );
      case "Hour by Hour":
        return (
          <p>
          <HourByHour/>
          </p>
        );
      case "Monitor":
        return (
          <p>
       <Monitor/>
          </p>
        );
      case "Dive":
        return (
          <p>
            <Dive/>
          </p>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <div className="p-4 md:p-7">
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Operational Performance
        </h1>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
              Operational Performance:
            </span>

            <span className="text-xs sm:text-[16px] hover:cursor-pointer">
              25/11/2025 (3:19 PM)
            </span>
          </div>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <span className="text-xs sm:text-[14px] hover:cursor-pointer text-gray-600">
              Operational Performance
            </span>
            <span>
              <FaCircle className="text-[6px] text-gray-500" />
            </span>
            <span className="text-xs sm:text-[14px] hover:cursor-pointer text-gray-400">
              Machine
            </span>
          </div>
        </div>
        <div className="py-6">
          <div className="flex gap-4 border-b pb-2 overflow-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2  font-medium transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-800 "
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-6 text-gray-700 ">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationPerformance;
