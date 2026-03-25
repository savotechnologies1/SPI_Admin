import { useEffect, useCallback, ChangeEvent } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editProcess, processDetail } from "./https/processApi";

interface ProcessFormData {
  processName: string;
  partFamily: string;
  machineName: string;
  processDesc: string;
  cycleTime: string;
  cycleTimeUnit: "sec" | "min" | "hr" | "";
  ratePerHour: string;
  isProcessReq: "true" | "false";
}

const EditProcess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<ProcessFormData>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProcessData = async () => {
      if (id) {
        try {
          const response = await processDetail(id);
          if (response && response.status === 200) {
            const processData = response.data.data;
            console.log("processDataprocessData", processData);
            const [cycleTimeValue, cycleTimeUnit] =
              processData.cycleTime.split(" ");
            reset({
              processName: processData.processName || "",
              machineName: processData.machineName || "",
              partFamily: processData.partFamily || "",
              processDesc: processData.processDesc || "",
              cycleTime: cycleTimeValue || "",
              cycleTimeUnit: cycleTimeUnit as "sec" | "min" | "hr" | "",
              ratePerHour:
                processData.ratePerHour !== null
                  ? processData.ratePerHour.toString()
                  : "",
              isProcessReq: processData.isProcessReq ? "true" : "false",
            });
          }
        } catch (error) {
          console.error("Failed to fetch process data:", error);
        }
      }
    };
    fetchProcessData();
  }, [id, reset]);

  const onSubmit = async (data: ProcessFormData) => {
    try {
      if (!id) {
        console.error("Process ID is missing for update.");
        return;
      }

      const apiPayload = {
        processName: data.processName,
        machineName: data.machineName,
        partFamily: data.partFamily,
        processDesc: data.processDesc,
        cycleTime: `${data.cycleTime}`,
        ratePerHour: parseFloat(data.ratePerHour),
        isProcessReq: data.isProcessReq === "true",
      };

      const response = await editProcess(id, apiPayload);
      if (response && response.status === 200) {
        navigate("/process-list");
      }
    } catch (error) {
      console.error("Failed to update process:", error);
    }
  };

  const handleNumericInput = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: "cycleTime" | "ratePerHour",
  ) => {
    const value = e.target.value;
    const decimalRegex = /^\d*\.?\d*$/;

    if (fieldName === "cycleTime") {
      if (!/^(?:[1-9]\d*)?$/.test(value) && value !== "") {
        setError(fieldName, {
          type: "manual",
          message: "Only positive integers are allowed",
        });
      } else {
        clearErrors(fieldName);
      }
    } else if (fieldName === "ratePerHour") {
      if (!decimalRegex.test(value)) {
        setError(fieldName, {
          type: "manual",
          message: "Only positive numbers (integers or decimals) are allowed",
        });
      } else if (
        value.startsWith("0") &&
        value.length > 1 &&
        !value.startsWith("0.")
      ) {
        setError(fieldName, {
          type: "manual",
          message:
            "Invalid number format (e.g., no leading zeros for integers)",
        });
      } else if (parseFloat(value) < 0) {
        setError(fieldName, {
          type: "manual",
          message: "Only positive numbers are allowed",
        });
      } else {
        clearErrors(fieldName);
      }
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
          <NavLink
            to={"/process-list"}
            className="text-xs sm:text-[16px] hover:cursor-pointer"
          >
            Process List
          </NavLink>
          <FaCircle className="text-[6px] text-gray-500" />
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            Edit Process
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 bg-white p-6 w-full rounded-2xl 2xl:w-2/3">
          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <label className="font-semibold">Process Name</label>
              <input
                {...register("processName", {
                  required: "Process Name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Process Name is required",
                })}
                type="text"
                placeholder="Enter your process name"
                className="border py-4 px-4 rounded-md w-full"
              />
              {errors.processName && (
                <p className="text-red-500 text-sm">
                  {errors.processName.message}
                </p>
              )}
            </div>

            <div className="sm:w-1/2">
              <label className="font-semibold">Machine Name</label>
              <input
                {...register("machineName", {
                  required: "Machine Name is required",
                  validate: (value) =>
                    value.trim() !== "" || "Machine Name is required",
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
            <div className="sm:w-1/2">
              <label className="font-semibold">Part Family</label>
              <input
                {...register("partFamily", {
                  required: "Part Family is required",
                  validate: (value) =>
                    value.trim() !== "" || "Part Family is required",
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
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
            <div className="sm:w-1/2">
              <label className="font-semibold">Process Description</label>
              <textarea
                {...register("processDesc", {
                  required: "Process Description is required",
                  validate: (value) =>
                    value.trim() !== "" || "Process Description is required",
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
                  required: "Cycle time is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Only positive integers are allowed",
                  },
                })}
                type="text"
                inputMode="numeric"
                placeholder="Enter cycle time"
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
                    clearErrors("cycleTime");
                  }
                }}
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
                  pattern: {
                    value: /^(?:[1-9]\d*|0)(?:\.\d*)?$|^\.\d*[1-9]\d*$/,
                    message:
                      "Only positive numbers (integers or decimals) are allowed",
                  },
                  validate: (value) =>
                    value.trim() !== "" || "Rate per hour is required",
                })}
                type="text"
                inputMode="decimal"
                placeholder="Enter your rate per hour"
                onKeyDown={(e) => {
                  if (
                    !/[0-9]/.test(e.key) &&
                    e.key !== "." &&
                    e.key !== "Backspace" &&
                    e.key !== "Delete" &&
                    e.key !== "ArrowLeft" &&
                    e.key !== "ArrowRight" &&
                    e.key !== "Tab"
                  ) {
                    e.preventDefault();
                  }
                }}
                onInput={(e: ChangeEvent<HTMLInputElement>) =>
                  handleNumericInput(e, "ratePerHour")
                }
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
