import { useEffect, useState } from "react";
import { FaCircle, FaSpinner } from "react-icons/fa";
import Machine from "./Machine";
import HourByHour from "./HourByHour";
import Dive from "./Dive";
import Monitor from "./Monitor";
import DatePicker from "react-datepicker";

const tabs = ["Hour by Hour", "Dive"];

const OperationPerformance = () => {
  const [activeTab, setActiveTab] = useState("Hour by Hour");
  
  const [loading, setLoading] = useState(true); // Loading state
    useEffect(() => {
      setLoading(true);
      
      // Yahan aap apna real API call kar sakte hain
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000); // 1 second ka delay simulate kiya hai
  
      return () => clearTimeout(timer);
    }, [activeTab]);
  
 const renderTabContent = () => {
     // Agar loading hai toh content ki jagah loader dikhao
     if (loading) {
       return (
         <div className="flex flex-col items-center justify-center h-64">
           <FaSpinner className="w-10 h-10 animate-spin text-brand" />
           <p className="mt-2 text-gray-500 font-medium">Loading data...</p>
         </div>
       );
     }
 
     switch (activeTab) {
       case "Hour by Hour":
         return <HourByHour />;
       case "Dive":
         return <Dive />;
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
            {/* <span className="text-xs sm:text-[16px] hover:cursor-pointer">
              25/11/2025 (3:19 PM)
            </span> */}
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

          <div className="mt-6 text-gray-700 ">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default OperationPerformance;
