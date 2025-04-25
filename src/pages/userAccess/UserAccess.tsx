import  { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const roles = ["Admin", "Editor", "Viewer"];
const menuItems = ["Main", "Order", "Production", "Inventory", "Masters", "Import Master", "Timesheet", "Control Panel"];

const UserAccess = () => {

  const [selectedRoles, setSelectedRoles] = useState<Record<`role${number}`, string>>({ role1: "", role2: "", role3: "", role4: "" });
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const handleRoleChange = (role: string, value: string) => {
    setSelectedRoles((prev) => ({ ...prev, [role]: value }));
  };

  const toggleMenu = (item: string) => {
    setOpenMenus((prev) => ({ ...prev, [item]: !prev[item] }));
  };
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        User Privilleges
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
          User 
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
          User Privilleges
          </span>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
      
      {/* Role Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2, 3,4].map((num) => (
          <div key={num}>
            <label className="block font-semibold mb-1">Select User Role</label>
            <select
              className="border py-3 px-4 rounded-md w-full focus:outline-none"
              value={selectedRoles[`role${num}`]}
              onChange={(e) => handleRoleChange(`role${num}`, e.target.value)}
            >
              <option value="">Select User Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
         
          </div>
        ))}
      </div>

      {/* Accordion Menu */}
      <div className="mt-6 border-t pt-4 ">
        {menuItems.map((item) => (
          <div key={item} className=" ">
            <button
              onClick={() => toggleMenu(item)}
              className="w-full text-left px-4 py-3 flex justify-between items-center hover:bg-gray-100 border mt-2 rounded-md shadow-sm" 
            >
              <span>{item}</span>
              <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openMenus[item] ? "rotate-180" : ""}`} />
            </button>
            {openMenus[item] && <div className="p-4 bg-gray-50">Content for {item}</div>}
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-6 text-right">
        <button className="bg-brand text-white py-2 px-8 rounded-sm hover:bg-brand-700 transition">
          Save
        </button>
      </div>
   
      </div>
    </div>
  );
};

export default UserAccess;
