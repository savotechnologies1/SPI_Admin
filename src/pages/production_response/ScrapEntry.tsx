import { useState } from "react";
import add from "../../assets/down.png";

import { NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PartForm from "./PartForm";
import ProductForm from "./ProductForm";

const ScrapEntry = () => {
  const [activeTab, setActiveTab] = useState("part");

  return (
    <div className="p-4">
      <div className="flex  justify-between ">
        <div>
          {" "}
          <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
            Scrap Entry
          </h1>
        </div>

        <div className="flex relative  ">
          <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/dashboard/addEmployees"> Scrap Entry</NavLink>
          </button>
          <div className="absolute top-3 right-2 pl-2 ">
            <img src={add} alt="" />
          </div>
        </div>
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
          <span className="text-[14px] hover:cursor-pointer">Shop Floor</span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">Scrap Entry </span>
        </div>
      </div>

      <div className="py-6 bg-white mt-4 rounded-md p-4">
        <Tabs>
          <TabList className={"flex gap-4 border-b"}>
            <Tab
              onClick={() => setActiveTab("part")}
              className={`p-2 px-4 rounded-t-md transition cursor-pointer ${
                activeTab === "part"
                  ? "bg-brand text-white"
                  : "bg-transparent"
              }`}
            >
              Part
            </Tab>
            <Tab
              onClick={() => setActiveTab("product")}
              className={`p-2 px-4 rounded-t-md transition cursor-pointer ${
                activeTab === "product"
                  ? "bg-brand text-white"
                  : "bg-transparent"
              }`}
            >
              Product
            </Tab>
          </TabList>

          <TabPanel>
            <PartForm />
          </TabPanel>
          <TabPanel>
            <ProductForm />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ScrapEntry;
