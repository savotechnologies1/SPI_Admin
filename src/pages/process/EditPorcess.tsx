import { useEffect, useCallback } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editProcess, processDetail } from "./https/processApi";

// Assuming your API returns an object with these properties
type ProcessFormData = {
  processName: string;
  partFamily: string;
  machineName: string;
  cycleTime: string;
  ratePerHour: string;
  isProcessReq: "true" | "false"; // Radio button values are strings
  processDesc: string;
};

const EditProcess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset, // We'll use reset to populate the form
  } = useForm<ProcessFormData>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // CHANGE 4: Removed unused `processData` state.
  // The form's state is handled by react-hook-form after `reset` is called.

  const onSubmit = async (data: ProcessFormData) => {
    if (!id) return; // Guard clause in case id is missing

    try {
      const response = await editProcess(
        {
          ...data,
          // Convert string "true"/"false" back to boolean for the API
          isProcessReq: data.isProcessReq === "true",
        },
        id
      );
      if (response.status === 200) {
        navigate("/process-list");
      }
    } catch (error) {
      // CHANGE 3: Improved error handling
      console.error("Failed to edit process:", error);
    }
  };

  // Using useCallback is a good practice for functions used in useEffect
  const fetchProcessDetail = useCallback(async () => {
    if (!id) return;

    try {
      const response = await processDetail(id);
      const data = response.data;

      // Populate the form with data from the API
      // Convert boolean `isProcessReq` to a string for the radio buttons
      reset({
        ...data,
        isProcessReq: data.isProcessReq ? "true" : "false",
      });
    } catch (error) {
      // CHANGE 3: Improved error handling
      console.error("Failed to fetch process details:", error);
      navigate("/process-list"); // Navigate away if data can't be loaded
    }
  }, [id, reset, navigate]); // Added dependencies

  useEffect(() => {
    fetchProcessDetail();
  }, [fetchProcessDetail]); // useEffect dependency is now the stable useCallback function

  return (
    <div className="p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Edit Process
        </h1>
      </div>

      <div className="flex justify-between mt-2 items-center">
        {/* Breadcrumb navigation */}
        <div className="flex gap-4 items-center">
          <p className="text-xs sm:text-[16px] text-black">
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <FaCircle className="text-[6px] text-gray-500" />
          <NavLink
            to={"/process-list"}
            className="text-xs sm:text-[16px] hover:cursor-pointer"
          >
            Process List
          </NavLink>
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
                // CHANGE 1: Added specific error message
                {...register("processName", {
                  required: "Process Name is required",
                })}
                type="text"
                placeholder="Enter your process name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {/* CHANGE 2: Displaying the specific error message */}
              {errors.processName && (
                <p className="text-red-500 text-sm">
                  {errors.processName.message}
                </p>
              )}
            </div>
            <div className="sm:w-1/2">
              <label className="font-semibold">Part Family</label>
              <input
                {...register("partFamily", {
                  required: "Part Family is required",
                })}
                type="text"
                placeholder="Enter your part family"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.partFamily && (
                <p className="text-red-500 text-sm">
                  {errors.partFamily.message}
                </p>
              )}
            </div>
            <div className="sm:w-1/2">
              <label className="font-semibold">Machine Name</label>
              <input
                {...register("machineName", {
                  required: "Machine Name is required",
                })}
                type="text"
                placeholder="Enter your machine name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.machineName && (
                <p className="text-red-500 text-sm">
                  {errors.machineName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <label className="font-semibold">Process Description</label>
              <textarea
                {...register("processDesc", {
                  required: "Process Description is required",
                })}
                placeholder="Enter your process description"
                className="border py-2 px-4 rounded-md w-full min-h-[100px] resize-y"
              />
              {errors.processDesc && (
                <p className="text-red-500 text-sm">
                  {errors.processDesc.message}
                </p>
              )}
            </div>

            <div className="sm:w-1/2">
              <label className="font-semibold">Cycle Time</label>
              <input
                {...register("cycleTime", {
                  required: "Cycle Time is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Only positive integers are allowed",
                  },
                })}
                type="text"
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  if (!/^[1-9]\d*$/.test(value) && value !== "") {
                    setError("cycleTime", {
                      type: "manual",
                      message: "Only positive integers are allowed",
                    });
                  } else {
                    clearErrors("ratePcycleTimeerHour");
                  }
                }}
                placeholder="Enter your cycle time"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.cycleTime && (
                <p className="text-red-500 text-sm">
                  {errors.cycleTime.message}
                </p>
              )}
            </div>
            <div className="sm:w-1/2">
              <label className="font-semibold">Rate per hour</label>
              <input
                {...register("ratePerHour", {
                  required: "Rate per hour is required",
                })}
                type="text"
                placeholder="Enter your rate per hour"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.ratePerHour && (
                <p className="text-red-500 text-sm">
                  {errors.ratePerHour.message}
                </p>
              )}
            </div>
          </div>

          <label className="font-semibold">Process Order Needed?</label>
          <div className="mt-2 mb-6 flex gap-6">
            <div className="flex items-center">
              <input
                type="radio"
                value="true"
                {...register("isProcessReq", {
                  required: "Please select an option",
                })}
                id="yes"
              />
              <label htmlFor="yes" className="ml-2">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                value="false"
                {...register("isProcessReq", {
                  required: "Please select an option",
                })}
                id="no"
              />
              <label htmlFor="no" className="ml-2">
                No
              </label>
            </div>
          </div>

          {errors.isProcessReq && (
            <p className="text-red-500 text-sm">
              {errors.isProcessReq.message}
            </p>
          )}

          <div className="flex justify-end items-end">
            <div className="mt-6">
              <button
                type="submit"
                className="bg-brand text-white px-6 py-3 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProcess;
