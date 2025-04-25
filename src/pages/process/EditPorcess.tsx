import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import delete_img from "../../assets/delete_1.png";

const EditProcess = () => {
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Process
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
            Process
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Add/edit process
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl 2xl:w-2/3">
        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
          <div className="sm:w-1/2">
            <label className="font-semibold" htmlFor="">
              Process Name
            </label>
            <input
              type="text"
              placeholder="Enter your process name"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold" htmlFor="">
              Machine Name
            </label>
            <input
              type="text"
              placeholder="Enter your machine name"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
          <div className="sm:w-1/2">
            <label className="font-semibold" htmlFor="">
              Cycle Time
            </label>
            <input
              type="number"
              placeholder="Enter your cycle time"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
          <div className="sm:w-1/2">
            <label className="font-semibold" htmlFor="">
              Rate per hour
            </label>
            <input
              type="number"
              placeholder="Enter your rate per hour"
              className="border py-4 px-4 rounded-md w-full"
            />
          </div>
        </div>

        <label className="font-semibold" htmlFor="processOrderNeeded">
  Process Order Needed?
</label>
<div className="mt-2 mb-6 flex gap-6">
  {/* Yes Option */}
  <div className="flex items-center">
    <input
      type="radio"
      id="yes"
      name="processOrderNeeded"
      value="yes"
      className="border py-4 px-4 rounded-md"
    />
    <label htmlFor="yes" className="ml-2">
      Yes
    </label>
  </div>

  {/* No Option */}
  <div className="flex items-center">
    <input
      type="radio"
      id="no"
      name="processOrderNeeded"
      value="no"
      className="border py-4 px-4 rounded-md"
    />
    <label htmlFor="no" className="ml-2">
      No
    </label>
  </div>
</div>

       

        <div className="flex justify-between items-end">
          <div className="mt-6 ">
            <button className="bg-brand text-white px-6 py-3 ">
              {" "}
              Add/Edit Process
            </button>
          </div>

          <div className="bg-[#FF5630] rounded-full p-2">
            <img className="w-[20px]" src={delete_img} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProcess;
