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
            <div className="sm:w-1/2">
              <label className="font-semibold">Part Family</label>
              <input
                {...register("partFamily", {})}
                type="string"
                placeholder="Enter your partFamily"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.partFamily && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <label className="font-semibold">Process Description</label>
              <input
                {...register("processDesc", {})}
                type="string"
                placeholder="Enter your cycle time"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.processDesc && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>
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

          <label className="font-semibold">Process Order Needed?</label>
          <div className="mt-2 mb-6 flex gap-6">
            <div className="flex items-center">
              <input
                {...register("orderNeeded", {
                  required: true,
                  setValueAs: (v) => v === "true", // 🔁 string to boolean conversion
                })}
                type="radio"
                id="yes"
                value="true"
                className="border py-4 px-4 rounded-md"
              />
              <label htmlFor="yes" className="ml-2">
                Yes
              </label>
            </div>

            <div className="flex items-center">
              <input
                {...register("orderNeeded", {
                  required: true,
                  setValueAs: (v) => v === "true", // 🔁 string to boolean conversion
                })}
                type="radio"
                id="no"
                value="false"
                className="border py-4 px-4 rounded-md"
              />
              <label htmlFor="no" className="ml-2">
                No
              </label>
            </div>
          </div>

          {errors.orderNeeded && (
            <p className="text-red-500 text-sm">Please select an option</p>
          )}

          <div className="flex justify-between items-end">
            <div className="mt-6">
              <button
                type="submit"
                className="bg-brand text-white px-6 py-3 rounded-md"
              >
                Add/Edit Process
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProcess;
