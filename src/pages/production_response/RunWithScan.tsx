import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline } from "react-icons/io5";
import step_1 from "../../assets/step_1.png";
import step_2 from "../../assets/step_2.png";
import step_3 from "../../assets/step_3.png";
import { NavLink, useNavigate } from "react-router-dom";

const data = [
  {
    img: step_1,
    title: "Step 1",
    decs: "Remove burn and sharp edges",
  },
  {
    img: step_2,
    title: "Step 2",
    decs: "Inspect for Surface Finish Defects",
  },
  {
    img: step_3,
    title: "Step 3",
    decs: "Packaged Products",
  },
];

const RunWithScan = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/station-logout");
  };

  return (
    <>
      <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
        <div className="bg-[#243C75] relative ">
          <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-auto">
              <img className="w-24 md:w-40" src={belt} alt="Belt icon" />
              {/* Text centered above image on all screens */}
              <div className="text-white text-lg  font-semibold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full  whitespace-nowrap flex justify-between">
                <div className="gap-2 flex flex-col">
                  <p className="text-2xl 2xl:text-4xl">
                    {" "}
                    tdriver GMT800 single
                  </p>
                  <p className="md:text-xl "> 1001</p>
                  <p className="md:text-xl "> 1002</p>
                </div>
              </div>
            </div>
            <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
              <div>
                <p className="md:text-xl "> january 13 ,2025</p>
              </div>
              <div>
                <p className="md:text-2xl "> Devon Lane</p>
              </div>

              <div className="flex flex-col  gap-1 md:gap-2">
                <p className="text-sm md:text-base">Date: january 17, 2025</p>
                <p className=" text-sm md:text-base">Qty: 20</p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
            <button
              onClick={handleLogout}
              className="text-xs md:text-sm font-semibold flex items-center gap-1"
            >
              Log out
              <IoLogOutOutline size={16} className="md:size-[20px]" />
            </button>
          </div>
        </div>

        <div className="container mx-auto p-4 md:p-6 flex-grow">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <input
              type="text"
              placeholder="Write your comments"
              className="border border-gray-400 py-2 px-4 rounded-md w-full placeholder-gray-400 bg-transparent text-sm md:text-base"
            />

            <div className="flex gap-3 w-full ">
              <button className="bg-brand text-white px-4 md:px-8 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto">
                Send
              </button>

              <button className="bg-brand text-white px-4 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto">
                Change Picture
              </button>
            </div>
          </div>

          <div className="py-4 flex flex-col gap-4">
            {data.map((item) => (
              <div className="flex flex-col md:flex-row gap-20 items-center bg-white rounded-lg shadow-sm">
                <div className="w-full md:w-auto ">
                  <img
                    className="rounded-md w-full max-w-xs md:max-w-none"
                    src={item.img}
                    alt=""
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-gray-600">{item.decs}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <button className="bg-brand text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto">
              Complete Order
            </button>

            <NavLink to="/scrap-entry" className="w-full sm:w-auto">
              <button className="bg-transparent text-brand px-4 py-2 font-semibold border-2 border-black rounded-md w-full">
                Scrap
              </button>
            </NavLink>
          </div>
        </div>
        <div className="bg-[#243C75]  bottom-0 w-full">
          <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Process & Inspection Section */}
            <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
              <div className="flex flex-col items-center">
                <p className="text-sm md:text-base">Process</p>
                <p className="text-sm md:text-base">Inspection</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-green-500 text-sm md:text-base">Qty</p>
                <p className="text-green-500 text-sm md:text-base">20</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-red-500 text-sm md:text-base">Scrap</p>
                <p className="text-red-500 text-sm md:text-base">2</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 md:gap-4  justify-center">
              {/* <NavLink to="/current-status" className="w-full sm:w-auto">
                   <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
                     Process
                   </button>
                 </NavLink>
     
                 <NavLink to="/live-production" className="w-full sm:w-auto">
                   <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
                     Employee
                   </button>
                 </NavLink>
     
                 <NavLink to="/live-production" className="w-full sm:w-auto">
                   <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
                     Count
                   </button>
                 </NavLink>
     
                 <NavLink to="/current-quality" className="w-full sm:w-auto">
                   <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
                     Cycle
                   </button>
                 </NavLink> */}

              <div className="flex flex-col items-center text-white">
                <p className="text-sm md:text-base font-semibold"> Employee</p>
                <p className="text-sm md:text-base">Devon Lane</p>
              </div>
              <div className="flex flex-col items-center text-white">
                <p className="text-sm md:text-base font-semibold">
                  Cycle count
                </p>
                <p className="text-sm md:text-base">150</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RunWithScan;
