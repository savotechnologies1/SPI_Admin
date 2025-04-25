import { useState } from "react";
import img from "../assets/pofile_img.jpg";
import cross from "../assets/cross.png";
import home from "../assets/home.png";
import { Link } from "react-router-dom";
import upgrade from "../assets/upgrade.png";

const Account = () => {
  const [isOpen, setIsOpen] = useState(true);

  const section = [
    {
      key: "Home",
      label: "Home",
      icon: home,
      path: "dashboardDetailes",
    },
    {
      key: "Profile",
      label: "Profile",
      icon: home,
      path: "dashboard/suppliers",
    },
    {
      key: "Projects",
      label: "Projects",
      icon: home,
      path: "dashboard/suppliers",
    },
    {
      key: "Subscription",
      label: "Subscription",
      icon: home,
      path: "dashboard/suppliers",
    },
    {
      key: "Security",
      label: "Security",
      icon: home,
      path: "dashboard/suppliers",
    },
  ];

  return (
    <div>
      <div className="fixed overflow-y-auto right-0 top-0 z-20 w-[320px] h-full bg-white shadow-lg">
        <div className="p-4">
          <div>
            <img 
              src={cross} 
              alt="Close sidebar" 
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex flex-col items-center pt-6">
            <div>
              <img
                src={img}
                alt="User Avatar"
                className="rounded-full w-[90px] border-2 border-green-400 mb-2"
              />
            </div>
            <div className="ml-3">
              <p className="font-semibold">Hudson Alvarez</p>
              <p className="text-sm text-gray-500">demo@minimals.cc</p>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="flex flex-col justify-between">
            <div>
              <ul className="space-y-2 px-2 py-4 h-[500px]">
                {section.map((section) => (
                  <li key={section.key}>
                    <Link to={`/${section.path}`}>
                      <button
                        className={`flex items-center space-x-4 w-full px-2 py-3 rounded-md hover:bg-brand hover:text-white`}
                      >
                        <img
                          src={section.icon}
                          alt={section.label}
                          className="w-6"
                        />
                        {isOpen && (
                          <span className="block transition-all duration-300">
                            {section.label}
                          </span>
                        )}
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 p-4 bg-black text-white rounded-xl flex relative py-8 px-6">
              <div className="w-[80%]">
                <p className="text-lg font-semibold mr-4">
                  Upgrade Your Plan And Get More Space
                </p>
                <button className="mt-4 bg-[#FFAB00] text-black px-4 py-2 rounded-lg text-ms">
                  Upgrade Plan
                </button>
              </div>
              <div className="absolute right-0 bottom-0 py-4 px-4">
                <img className="w-28" src={upgrade} alt="Upgrade illustration" />
              </div>
            </div>
          </div>
          
          <button className="mt-4 w-full bg-[#FF563014] text-[#B71D18] py-2 rounded-lg font-semibold text-lg">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;