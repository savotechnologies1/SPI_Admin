// import { useEffect, useCallback } from "react";
// import { FaCircle } from "react-icons/fa";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { editProcess, processDetail } from "./https/processApi";

// type ProcessFormData = {
//   processName: string;
//   partFamily: string;
//   machineName: string;
//   cycleTime: string;
//   ratePerHour: string;
//   isProcessReq: "true" | "false";
//   processDesc: string;
// };

// const EditProcess = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     clearErrors,
//     reset,
//   } = useForm<ProcessFormData>();

//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();

//   const onSubmit = async (data: ProcessFormData) => {
//     if (!id) return;

//     try {
//       const response = await editProcess(
//         {
//           ...data,
//           isProcessReq: data.isProcessReq === "true",
//         },
//         id
//       );
//       if (response.status === 200) {
//         navigate("/process-list");
//       }
//     } catch (error) {
//       console.error("Failed to edit process:", error);
//     }
//   };

//   const fetchProcessDetail = useCallback(async () => {
//     if (!id) return;

//     try {
//       const response = await processDetail(id);
//       const data = response.data;
//       reset({
//         ...data,
//         isProcessReq: data.isProcessReq ? "true" : "false",
//       });
//     } catch (error) {
//       navigate("/process-list");
//     }
//   }, [id, reset, navigate]);

//   useEffect(() => {
//     fetchProcessDetail();
//   }, [fetchProcessDetail]);

//   return (
//     <div className="p-7">
//       <div>
//         <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//           Edit Process
//         </h1>
//       </div>

//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center">
//           <p className="text-xs sm:text-[16px] text-black">
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <NavLink
//             to={"/process-list"}
//             className="text-xs sm:text-[16px] hover:cursor-pointer"
//           >
//             Process List
//           </NavLink>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <span className="text-xs sm:text-[16px] hover:cursor-pointer">
//             Edit process
//           </span>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mt-4 bg-white p-6 w-full rounded-2xl 2xl:w-2/3">
//           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
//             <div className="sm:w-1/2">
//               <label className="font-semibold">Process Name</label>
//               <input
//                 {...register("processName", {
//                   required: "Process Name is required",
//                 })}
//                 type="text"
//                 placeholder="Enter your process name"
//                 className="border py-4 px-4 rounded-md w-full"
//               />
//               {errors.processName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.processName.message}
//                 </p>
//               )}
//             </div>
//             <div className="sm:w-1/2">
//               <label className="font-semibold">Part Family</label>
//               <input
//                 {...register("partFamily", {
//                   required: "Part Family is required",
//                 })}
//                 type="text"
//                 placeholder="Enter your part family"
//                 className="border py-4 px-4 rounded-md w-full"
//               />
//               {errors.partFamily && (
//                 <p className="text-red-500 text-sm">
//                   {errors.partFamily.message}
//                 </p>
//               )}
//             </div>
//             <div className="sm:w-1/2">
//               <label className="font-semibold">Machine Name</label>
//               <input
//                 {...register("machineName", {
//                   required: "Machine Name is required",
//                 })}
//                 type="text"
//                 placeholder="Enter your machine name"
//                 className="border py-4 px-4 rounded-md w-full"
//               />
//               {errors.machineName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.machineName.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
//             <div className="sm:w-1/2">
//               <label className="font-semibold">Process Description</label>
//               <textarea
//                 {...register("processDesc", {
//                   required: "Process Description is required",
//                 })}
//                 placeholder="Enter your process description"
//                 className="border py-2 px-4 rounded-md w-full min-h-[100px] resize-y"
//               />
//               {errors.processDesc && (
//                 <p className="text-red-500 text-sm">
//                   {errors.processDesc.message}
//                 </p>
//               )}
//             </div>

//             <div className="sm:w-1/2">
//               <label className="font-semibold">Cycle Time</label>
//               <input
//                 {...register("cycleTime", {
//                   required: "Cycle Time is required",
//                   pattern: {
//                     value: /^[1-9]\d*$/,
//                     message: "Only positive integers are allowed",
//                   },
//                 })}
//                 type="text"
//                 onKeyDown={(e) => {
//                   if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
//                   const value = e.target.value;
//                   if (!/^[1-9]\d*$/.test(value) && value !== "") {
//                     setError("cycleTime", {
//                       type: "manual",
//                       message: "Only positive integers are allowed",
//                     });
//                   } else {
//                     clearErrors("ratePcycleTimeerHour");
//                   }
//                 }}
//                 placeholder="Enter your cycle time"
//                 className="border py-4 px-4 rounded-md w-full"
//               />
//               {errors.cycleTime && (
//                 <p className="text-red-500 text-sm">
//                   {errors.cycleTime.message}
//                 </p>
//               )}
//             </div>
//             <div className="sm:w-1/2">
//               <label className="font-semibold">Rate per hour</label>
//               <input
//                 {...register("ratePerHour", {
//                   required: "Rate per hour is required",
//                 })}
//                 type="text"
//                 placeholder="Enter your rate per hour"
//                 className="border py-4 px-4 rounded-md w-full"
//               />
//               {errors.ratePerHour && (
//                 <p className="text-red-500 text-sm">
//                   {errors.ratePerHour.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <label className="font-semibold">Process Order Needed?</label>
//           <div className="mt-2 mb-6 flex gap-6">
//             <div className="flex items-center">
//               <input
//                 type="radio"
//                 value="true"
//                 {...register("isProcessReq", {
//                   required: "Please select an option",
//                 })}
//                 id="yes"
//               />
//               <label htmlFor="yes" className="ml-2">
//                 Yes
//               </label>
//             </div>
//             <div className="flex items-center">
//               <input
//                 type="radio"
//                 value="false"
//                 {...register("isProcessReq", {
//                   required: "Please select an option",
//                 })}
//                 id="no"
//               />
//               <label htmlFor="no" className="ml-2">
//                 No
//               </label>
//             </div>
//           </div>

//           {errors.isProcessReq && (
//             <p className="text-red-500 text-sm">
//               {errors.isProcessReq.message}
//             </p>
//           )}

//           <div className="flex justify-end items-end">
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="bg-brand text-white px-6 py-3 rounded-md"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProcess;

import { useEffect, useCallback, ChangeEvent } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { editProcess, processDetail } from "./https/processApi";

type ProcessFormData = {
  processName: string;
  partFamily: string;
  machineName: string;
  cycleTime: string;
  ratePerHour: string;
  isProcessReq: "true" | "false";
  processDesc: string;
};

type ProcessApiData = {
  processName: string;
  partFamily: string;
  machineName: string;
  cycleTime: number;
  ratePerHour: number;
  isProcessReq: boolean;
  processDesc: string;
};

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

  const onSubmit = async (data: ProcessFormData) => {
    if (!id) return;

    try {
      const payload = {
        ...data,
        cycleTime: parseInt(data.cycleTime),
        ratePerHour: parseInt(data.ratePerHour),
        isProcessReq: data.isProcessReq === "true",
      };

      const response = await editProcess(payload, id);
      if (response && response.status === 200) {
        navigate("/process-list");
      }
    } catch (error) {
      console.error("Failed to edit process:", error);
    }
  };

  const handleNumericInput = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: "cycleTime" | "ratePerHour"
  ) => {
    const value = e.target.value;
    if (!/^[1-9]\d*$/.test(value) && value !== "") {
      setError(fieldName, {
        type: "manual",
        message: "Only positive integers are allowed",
      });
    } else {
      clearErrors(fieldName);
    }
  };

  const fetchProcessDetail = useCallback(async () => {
    if (!id) return;

    try {
      const response = await processDetail(id);
      const data: ProcessApiData = response.data;
      reset({
        ...data,
        cycleTime: data.cycleTime.toString(),
        ratePerHour: data.ratePerHour.toString(),
        isProcessReq: data.isProcessReq ? "true" : "false",
      });
    } catch (error) {
      navigate("/process-list");
    }
  }, [id, reset, navigate]);

  useEffect(() => {
    fetchProcessDetail();
  }, [fetchProcessDetail]);

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
                {...register("processName", {
                  required: "Process Name is required",
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
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  handleNumericInput(e, "cycleTime");
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
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  handleNumericInput(e, "ratePerHour");
                }}
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
