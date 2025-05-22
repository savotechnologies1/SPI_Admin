import  { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import Navbar from "./Navbar";

const Layout = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const toggleMenu = () => {
    setActiveMenu((prev) => !prev);
  };
  console.log('0888888888888888888')
  return (
    <div className="flex relative min-h-screen ">
      <Sidebar activeMenu={activeMenu} clicked={toggleMenu} />

      <div
        className={` bg-[#F4F6F8] w-full transition-all duration-300 xl:ml-48 ${
          activeMenu ? "md:ml-64" : "pl-16"
        }`}
      >
        <div className="pt-16"> {/* This matches the height of your navbar */}
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
