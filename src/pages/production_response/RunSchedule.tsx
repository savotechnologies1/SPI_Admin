import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline } from "react-icons/io5";
import step_1 from "../../assets/step_1.png";
import step_2 from "../../assets/step_2.png";
import step_3 from "../../assets/step_3.png";
import { NavLink } from "react-router-dom";

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

const RunSchedule = () => {
  return (
    <>
      <div className="relative">
        <div className="bg-[#243C75] flex flex-col md:flex-row items-center justify-between p-4 ">
          <div className="relative">
            <img src={belt} alt="" />
          </div>
          <div className="text-white text-xl font-semibold absolute ">
            tdriver GMT800 single
          </div>
          <div className="text-white flex  gap-10 flex-col md:flex-row ">
            <div className="flex flex-col items-center gap-2 ">
              <p className="font-semibold">Date</p>
              <p>january 17, 2025</p>
            </div>

            <div className="flex flex-col items-center gap-2 ">
              <p className="font-semibold">Part Desc</p>
              <p>20</p>
            </div>

            <div className="flex flex-col items-center gap-2 ">
              <p className="font-semibold">Step No.</p>
              <p>1</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
          <NavLink to="/station-login">
            {" "}
            <button className="text-sm font-semibold">Log out</button>{" "}
          </NavLink>
          <span className="text-lg">
            <IoLogOutOutline size={20} />
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-center gap-4">
          {/* Comment Input */}
          <input
            type="text"
            placeholder="Write your comments"
            className="border border-gray-400 py-2 px-4 rounded-md w-1/2 placeholder-gray-400 bg-transparent"
          />

          {/* Send Button */}
          <button className="bg-brand text-white px-6 py-2 rounded-sm  transition font-semibold">
            Send
          </button>

          {/* Change Picture Button */}
          <button className="bg-brand text-white px-6 py-2 rounded-sm  transition font-semibold">
            Change Picture
          </button>
        </div>

        <div className="py-4 flex flex-col gap-4">
          {data.map((item) => (
            <div className="flex flex-col md:flex-row gap-20 items-center bg-white rounded-lg shadow-sm">
              <div className="p-2">
                <img className="rounded-md" src={item.img} alt="" />
              </div>
              <div className="">
                <p className="font-semibold">{item.title}</p>
                <p>{item.decs}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button className="bg-brand text-white px-6 py-2 rounded-md  transition font-semibold">
            Complete Order
          </button>

          <NavLink to="/scrap-entry">
            <button className="bg-transparent text-[#052C89] px-10 py-2   transition font-semibold border-2 border-black rounded-md">
              Scrap
            </button>
          </NavLink>
        </div>
      </div>
      <div className="bg-[#243C75] flex justify-end gap-40 items-center p-4 sticky bottom-0 w-full ">
        {/* Process & Inspection Section */}
        <div className="text-white flex gap-10 items-center">
          <div className="flex flex-col items-center">
            <p>Process</p>
            <p>Inspection</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-green-500">Qty</p>
            <p className="text-green-500">20</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-red-500">Scrap</p>
            <p className="text-red-500">2</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <NavLink to="/current-status">
            <button className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
              Process
            </button>
          </NavLink>

          <NavLink to="/live-production">
            <button className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
              Employee
            </button>
          </NavLink>

          <NavLink to="/live-production">
            <button className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
              Count
            </button>
          </NavLink>

          <NavLink to="/current-quality">
            <button className="bg-white text-black px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
              Cycle
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default RunSchedule;
