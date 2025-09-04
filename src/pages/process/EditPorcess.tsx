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

// import { useEffect, useCallback, ChangeEvent } from "react";
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

// type ProcessApiData = {
//   processName: string;
//   partFamily: string;
//   machineName: string;
//   cycleTime: number;
//   ratePerHour: number;
//   isProcessReq: boolean;
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
//       const payload = {
//         ...data,
//         cycleTime: data.cycleTime,
//         ratePerHour: data.cycleTime,
//         isProcessReq: data.isProcessReq === "true",
//       };

//       const response = await editProcess(payload, id);
//       if (response && response.status === 200) {
//         navigate("/process-list");
//       }
//     } catch (error) {
//       console.error("Failed to edit process:", error);
//     }
//   };

//   const handleNumericInput = (
//     e: ChangeEvent<HTMLInputElement>,
//     fieldName: "cycleTime" | "ratePerHour"
//   ) => {
//     const value = e.target.value;
//     if (!/^[1-9]\d*$/.test(value) && value !== "") {
//       setError(fieldName, {
//         type: "manual",
//         message: "Only positive integers are allowed",
//       });
//     } else {
//       clearErrors(fieldName);
//     }
//   };

//   const fetchProcessDetail = useCallback(async () => {
//     if (!id) return;

//     try {
//       const response = await processDetail(id);
//       const data: ProcessApiData = response.data;
//       reset({
//         ...data,
//         cycleTime: data.cycleTime.toString(),
//         ratePerHour: data.ratePerHour.toString(),
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
//                 onInput={(e: ChangeEvent<HTMLInputElement>) => {
//                   handleNumericInput(e, "cycleTime");
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
//                 onInput={(e: ChangeEvent<HTMLInputElement>) => {
//                   handleNumericInput(e, "ratePerHour");
//                 }}
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

interface ProcessApiData {
  processName: string;
  partFamily: string;
  machineName: string;
  processDesc: string;
  cycleTime: string; // e.g., "15 min"
  ratePerHour: number; // Expecting a number (float/decimal)
  isProcessReq: boolean;
}

// Define your form data and API data interfaces
interface ProcessFormData {
  processName: string;
  partFamily: string;
  machineName: string;
  processDesc: string;
  cycleTimeValue: string;
  cycleTimeUnit: "sec" | "min" | "hr" | ""; // Add empty string for initial state
  ratePerHour: string; // Keep as string for form input
  isProcessReq: "true" | "false";
}

const EditProcess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset, // Add reset to set form values
  } = useForm<ProcessFormData>();

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Get ID from URL

  useEffect(() => {
    const fetchProcessData = async () => {
      if (id) {
        try {
          const response = await processDetail(id); // Fetch data based on ID
          if (response && response.status === 200) {
            const processData = response.data.data;
            // Split cycleTime into value and unit
            const [cycleTimeValue, cycleTimeUnit] =
              processData.cycleTime.split(" ");

            reset({
              processName: processData.processName,
              machineName: processData.machineName,
              partFamily: processData.partFamily,
              processDesc: processData.processDesc,
              cycleTimeValue: cycleTimeValue || "",
              cycleTimeUnit: cycleTimeUnit as "sec" | "min" | "hr" | "",
              ratePerHour: processData.ratePerHour.toString(),
              isProcessReq: processData.isProcessReq ? "true" : "false",
            });
          }
        } catch (error) {
          console.error("Failed to fetch process data:", error);
          // Optionally, navigate back or show an error message
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
        cycleTime: `${data.cycleTimeValue} ${data.cycleTimeUnit}`,
        ratePerHour: parseFloat(data.ratePerHour), // Use parseFloat for decimal numbers
        isProcessReq: data.isProcessReq === "true",
      };

      const response = await editProcess(id, apiPayload); // Call update API
      if (response && response.status === 200) {
        navigate("/process-list");
      }
    } catch (error) {
      console.error("Failed to update process:", error);
    }
  };

  const handleNumericInput = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: "cycleTimeValue" | "ratePerHour"
  ) => {
    const value = e.target.value;
    // Allow empty string, positive integers, and positive decimal numbers
    const decimalRegex = /^\d*\.?\d*$/; // Allows empty, 123, 123., .5, 0.5, 12.34, 0

    if (fieldName === "cycleTimeValue") {
      // Keep original validation for cycleTimeValue (positive integers)
      // Allow empty string or numbers starting from 1
      if (!/^(?:[1-9]\d*)?$/.test(value) && value !== "") {
        setError(fieldName, {
          type: "manual",
          message: "Only positive integers are allowed",
        });
      } else {
        clearErrors(fieldName);
      }
    } else if (fieldName === "ratePerHour") {
      // New validation for ratePerHour (positive decimals or integers)
      // Allow empty string, positive integers, and positive decimal numbers (including 0.X)
      if (!decimalRegex.test(value)) {
        // Check if it matches the general decimal regex
        setError(fieldName, {
          type: "manual",
          message: "Only positive numbers (integers or decimals) are allowed",
        });
      } else if (
        value.startsWith("0") &&
        value.length > 1 &&
        !value.startsWith("0.")
      ) {
        // Disallow leading zeros for integers (e.g., "05"), but allow "0."
        setError(fieldName, {
          type: "manual",
          message:
            "Invalid number format (e.g., no leading zeros for integers)",
        });
      } else if (parseFloat(value) < 0) {
        // Ensure the parsed number is not negative
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
              <div className="flex gap-2">
                <input
                  {...register("cycleTimeValue", {
                    required: "Cycle time value is required",
                    pattern: {
                      value: /^(?:[1-9]\d*)?$/,
                      message: "Only positive integers are allowed",
                    },
                    validate: (value) =>
                      value.trim() !== "" || "Cycle time value is required",
                  })}
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter cycle time"
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  onInput={(e: ChangeEvent<HTMLInputElement>) =>
                    handleNumericInput(e, "cycleTimeValue")
                  }
                  className="border py-4 px-4 rounded-md w-full"
                />
                <select
                  {...register("cycleTimeUnit", {
                    required: "Cycle time unit is required",
                  })}
                  className="border py-4 px-2 rounded-md w-1/3"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  <option value="sec">Sec</option>
                  <option value="min">Min</option>
                  <option value="hr">Hr</option>
                </select>
              </div>
              {(errors.cycleTimeValue || errors.cycleTimeUnit) && (
                <p className="text-red-500 text-sm">
                  {errors.cycleTimeValue?.message ||
                    errors.cycleTimeUnit?.message}
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
