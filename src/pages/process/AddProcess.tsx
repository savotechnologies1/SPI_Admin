import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addProcess } from "./https/processApi";
import delete_img from "../../assets/delete_1.png";

const AddProcess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data: object) => {
    try {
      const response = await addProcess(data);

      if (response.status === 201) {
        navigate("/process-list");
      }
    } catch (error: unknown) {}
  };

  return (
    <div className="p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Process
        </h1>
      </div>

      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center">
          <p className="text-xs sm:text-[16px] text-black">
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Process
          </span>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Add/edit process
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 bg-white p-6 w-full rounded-2xl 2xl:w-2/3">
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <label className="font-semibold">Process Name</label>
              <input
                {...register("processName")}
                type="text"
                placeholder="Enter your process name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.processName && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>

            <div className="sm:w-1/2">
              <label className="font-semibold">Machine Name</label>
              <input
                {...register("machineName", { required: true })}
                type="text"
                placeholder="Enter your machine name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.machineName && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <label className="font-semibold">Cycle Time</label>
              <input
                {...register("cycleTime", {})}
                type="string"
                placeholder="Enter your cycle time"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.cycleTime && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>

            <div className="sm:w-1/2">
              <label className="font-semibold">Rate per hour</label>
              <input
                {...register("ratePerHour", {})}
                type="string"
                placeholder="Enter your rate per hour"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.ratePerHour && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
          </div>

          <div className="flex items-center flex-col sm:flex-row gap-4 mt-2 mb-6">
            {/* Part Family Dropdown */}
            <label className="block w-full sm:w-1/2">
              <span className="font-semibold">Part Family</span>
              <select
                name="partFamily"
                className="border mt-1 p-2 rounded w-full"
              >
                <option value="">Select Part Family</option>
                <option value="Cut Trim">Cut Trim</option>
                <option value="Metal">Metal</option>
                <option value="Plastic">Plastic</option>
              </select>
            </label>

            {/* Process Order Needed Radios */}
            <div className="w-full sm:w-1/2">
              <span className="block font-semibold mb-2">
                Process Order Needed?
              </span>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    {...register("orderNeeded", { required: true })}
                    type="radio"
                    id="yes"
                    value="yes"
                    className="accent-blue-600"
                  />
                  <span>Yes</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    {...register("orderNeeded", { required: true })}
                    type="radio"
                    id="no"
                    value="no"
                    className="accent-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>

              {errors.orderNeeded && (
                <p className="text-red-500 text-sm mt-1">
                  Please select an option
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="mt-6">
              <button
                type="submit"
                className="bg-brand text-white px-6 py-3 rounded-md"
              >
                Add/Edit Process
              </button>
            </div>

            <div className="bg-[#FF5630] rounded-full p-2 cursor-pointer">
              <img className="w-[20px]" src={delete_img} alt="delete" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProcess;
