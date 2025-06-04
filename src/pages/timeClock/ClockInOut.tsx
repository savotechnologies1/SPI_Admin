
import img from "../../assets/arrow-right.png";
import dp from "../../assets/dp_1.png";
import QuickPunch from "./QuickPunch";
import Timeline from "./TimeLine";
const ClockInOut = () => {
  return (
    <>
      <div className="bg-[#243C75] p-4 text-end pb-10">
        <h1 className="text-2xl  text-white ">Thu May 03, 2025</h1>
        <p className="text-lg text-white">Today</p>
      </div>
      <div className="bg-[#17274C] flex text-white text-xs p-2 justify-between">
        <p>Clock In And Out</p>
        <img src={img} alt="" />
      </div>

      <div className="flex flex-col xl:flex-row p-6 justify-between gap-10">
        <div className="w-full sm:w-[80%] md:w-[100%] lg:w-[50%] xl:w-[40%] bg-white shadow-lg rounded-2xl py-6 sm:py-10 px-4 sm:px-6 text-center">
          {/* Profile Image */}
          <div className="flex justify-center">
            <img
              className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-[#d1a822] object-cover"
              src={dp}
              alt="Profile"
            />
          </div>

          {/* User Info */}
          <div className="mt-3 sm:mt-4">
            <p className="text-gray-600 text-xs sm:text-sm">#15652542</p>
            <h2 className="text-base sm:text-lg font-bold mt-1">
              Selemon Alemayehu
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Process/Inspection
            </p>
          </div>

          {/* Details */}
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-4 sm:gap-x-4 ">
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-gray-500">Joined</p>
              <p className="text-sm  font-semibold mt-1">
                22 Feb 2024
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Contact No.</p>
              <p className="text-sm  font-semibold mt-1">
                7585263152
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm  font-semibold mt-1 truncate">
                admin@gmail.com
              </p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-gray-500">Contact No.</p>
              <p className="text-sm  font-semibold mt-1">
                7585263152
              </p>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-[60%] ">
          {" "}
          <QuickPunch />
        </div>
      </div>
      <div className="p-6 ">
        <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 ">
          <Timeline />
        </div>
      </div>
    </>
  );
};

export default ClockInOut;
