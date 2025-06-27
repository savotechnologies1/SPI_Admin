import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import delete_img from "../../assets/delete_1.png";
import { deleteProcess, editProcess, processDetail } from "./https/processApi";
import { useEffect, useState } from "react";
interface ProcessData extends ProcessFormData {
  id: string;
}

const EditProcess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProcessFormData>();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [processData, setProcessData] = useState([]);
  const onSubmit = async (data: object) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await editProcess(data, id);
      if (response.status === 200) {
        navigate("/process-list");
      }
    } catch (error: unknown) {
      throw error;
    }
  };
  const fetchProcessDetail = async () => {
    try {
      const response = await processDetail(id);
      const data = response.data;
      setProcessData(data);
      reset({
        processName: data.processName,
        machineName: data.machineName,
        cycleTime: data.cycleTime,
        ratePerHour: data.ratePerHour,
        orderNeeded: data.orderNeeded,
      });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchProcessDetail();
  }, [id]);
  const handleDelete = async () => {
    try {
      const response = await deleteProcess(id);
      if (response.status === 200) {
        navigate("/process-list");
      }
    } catch (error: unknown) {
      throw error;
    }
  };
  return (
    <div className="p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Edit Process
        </h1>
      </div>

      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center">
          <p className="text-xs sm:text-[16px] text-black">
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Process List
          </span>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Edit process
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
                {...register("cycleTime", {
                  required: true,
                })}
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
                {...register("ratePerHour", {
                  required: true,
                })}
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
                {...register("orderNeeded", { required: true })}
                type="radio"
                id="yes"
                value="yes"
                className="border py-4 px-4 rounded-md"
              />
              <label htmlFor="yes" className="ml-2">
                Yes
              </label>
            </div>

            <div className="flex items-center">
              <input
                {...register("orderNeeded", { required: true })}
                type="radio"
                id="no"
                value="no"
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
                Save
              </button>
            </div>

            <div className="bg-[#FF5630] rounded-full p-2 cursor-pointer">
              <img
                className="w-[20px]"
                src={delete_img}
                alt="delete"
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProcess;
