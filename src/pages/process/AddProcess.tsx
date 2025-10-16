// // import { FaCircle } from "react-icons/fa";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { useForm } from "react-hook-form";
// // import { addProcess } from "./https/processApi";

// // const AddProcess = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     setError,
// //     clearErrors,
// //   } = useForm();

// //   const navigate = useNavigate();
// //   const onSubmit = async (data) => {
// //     try {
// //       const response = await addProcess(data);

// //       if (response.status === 201) {
// //         navigate("/process-list");
// //       }
// //     } catch (error) {}
// //   };

// //   return (
// //     <div className="p-7">
// //       <div>
// //         <h1 className="font-bold text-[20px] md:text-[24px] text-black">
// //           Process
// //         </h1>
// //       </div>

// //       <div className="flex justify-between mt-2 items-center">
// //         <div className="flex gap-4 items-center">
// //           <p className="text-xs sm:text-[16px] text-black">
// //             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
// //           </p>
// //           <FaCircle className="text-[6px] text-gray-500" />
// //           <span className="text-xs sm:text-[16px] hover:cursor-pointer">
// //             Process
// //           </span>
// //           <FaCircle className="text-[6px] text-gray-500" />
// //           <span className="text-xs sm:text-[16px] hover:cursor-pointer">
// //             Add process
// //           </span>
// //         </div>
// //       </div>

// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         <div className="mt-4 bg-white p-6 w-full rounded-2xl 2xl:w-2/3">
// //           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Process Name</label>
// //               <input
// //                 {...register("processName", {
// //                   required: "Process Name is required",
// //                 })}
// //                 type="text"
// //                 placeholder="Enter your process name"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.processName && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.processName.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Machine Name</label>
// //               <input
// //                 {...register("machineName", {
// //                   required: "Machine Name is required",
// //                 })}
// //                 type="text"
// //                 placeholder="Enter your machine name"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.machineName && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.machineName.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Part Family</label>
// //               <input
// //                 {...register("partFamily", {
// //                   required: "Part Family is required",
// //                 })}
// //                 type="text"
// //                 placeholder="Enter your partFamily"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.partFamily && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.partFamily.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Process Description</label>
// //               <textarea
// //                 {...register("processDesc", {
// //                   required: "Process Description is required",
// //                 })}
// //                 placeholder="Enter a description "
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.processDesc && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.processDesc.message}
// //                 </p>
// //               )}
// //             </div>
// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Cycle Time</label>
// //               <input
// //                 {...register("cycleTime", {
// //                   required: "Cycle time is required",
// //                   pattern: {
// //                     value: /^[1-9]\d*$/,
// //                     message: "Only positive integers are allowed",
// //                   },
// //                 })}
// //                 type="text"
// //                 inputMode="numeric"
// //                 placeholder="Enter cycle time"
// //                 onKeyDown={(e) => {
// //                   if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
// //                     e.preventDefault();
// //                   }
// //                 }}
// //                 onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
// //                   const value = e.target.value;
// //                   if (!/^[1-9]\d*$/.test(value) && value !== "") {
// //                     setError("cycleTime", {
// //                       type: "manual",
// //                       message: "Only positive integers are allowed",
// //                     });
// //                   } else {
// //                     clearErrors("cycleTime");
// //                   }
// //                 }}
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.cycleTime && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.cycleTime.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Rate per Hour</label>
// //               <input
// //                 {...register("ratePerHour", {
// //                   required: "Rate per hour is required",
// //                   pattern: {
// //                     value: /^[1-9]\d*$/,
// //                     message: "Only positive integers are allowed",
// //                   },
// //                 })}
// //                 type="text"
// //                 inputMode="numeric"
// //                 placeholder="Enter rate per hour"
// //                 onKeyDown={(e) => {
// //                   if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
// //                     e.preventDefault();
// //                   }
// //                 }}
// //                 onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
// //                   const value = e.target.value;
// //                   if (!/^[1-9]\d*$/.test(value) && value !== "") {
// //                     setError("ratePerHour", {
// //                       type: "manual",
// //                       message: "Only positive integers are allowed",
// //                     });
// //                   } else {
// //                     clearErrors("ratePerHour");
// //                   }
// //                 }}
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.ratePerHour && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.ratePerHour.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           <label className="font-semibold">Process Order Needed?</label>
// //           <div className="mt-2 mb-6 flex gap-6">
// //             <div className="flex items-center">
// //               <input
// //                 {...register("isProcessReq", {
// //                   required: "Please select an option",
// //                 })}
// //                 type="radio"
// //                 id="yes"
// //                 value="true"
// //                 className="border py-4 px-4 rounded-md"
// //               />
// //               <label htmlFor="yes" className="ml-2">
// //                 Yes
// //               </label>
// //             </div>

// //             <div className="flex items-center">
// //               <input
// //                 {...register("isProcessReq", {
// //                   required: "Please select an option",
// //                 })}
// //                 type="radio"
// //                 id="no"
// //                 value="false"
// //                 className="border py-4 px-4 rounded-md"
// //               />
// //               <label htmlFor="no" className="ml-2">
// //                 No
// //               </label>
// //             </div>
// //           </div>

// //           {errors.isProcessReq && (
// //             <p className="text-red-500 text-sm">
// //               {errors.isProcessReq.message}
// //             </p>
// //           )}

// //           <div className="flex justify-end items-end">
// //             <div className="mt-6">
// //               <button
// //                 type="submit"
// //                 className="bg-brand text-white px-6 py-3 rounded-md"
// //               >
// //                 Add Process
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default AddProcess;
// import { FaCircle } from "react-icons/fa";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { addProcess } from "./https/processApi";
// import { ChangeEvent } from "react";

// type ProcessFormData = {
//   processName: string;
//   machineName: string;
//   partFamily: string;
//   processDesc: string;
//   cycleTimeValue: string;
//   cycleTimeUnit: "sec" | "min" | "hr";
//   ratePerHour: string;
//   isProcessReq: string;
// };

// // const AddProcess = () => {
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //     setError,
// //     clearErrors,
// //   } = useForm<ProcessFormData>();

// //   const navigate = useNavigate();

// //   const onSubmit = async (data: ProcessFormData) => {
// //     try {
// //       const apiPayload = {
// //         processName: data.processName,
// //         machineName: data.machineName,
// //         partFamily: data.partFamily,
// //         processDesc: data.processDesc,
// //         cycleTime: `${data.cycleTimeValue} ${data.cycleTimeUnit}`, // ✅ Combine here
// //         ratePerHour: parseInt(data.ratePerHour, 10),
// //         isProcessReq: data.isProcessReq === "true",
// //       };

// //       const response = await addProcess(apiPayload);
// //       if (response && response.status === 201) {
// //         navigate("/process-list");
// //       }
// //     } catch (error) {
// //       console.error("Failed to add process:", error);
// //     }
// //   };

// //   const handleNumericInput = (
// //     e: ChangeEvent<HTMLInputElement>,
// //     fieldName: "cycleTimeValue" | "ratePerHour"
// //   ) => {
// //     const value = e.target.value;
// //     // Allow empty string, positive integers, and positive decimal numbers
// //     const decimalRegex = /^\d*\.?\d*$/; // Allows empty, 123, 123., .5, 0.5, 12.34, 0

// //     if (fieldName === "cycleTimeValue") {
// //       // Keep original validation for cycleTimeValue (positive integers)
// //       // Allow empty string or numbers starting from 1
// //       if (!/^(?:[1-9]\d*)?$/.test(value) && value !== "") {
// //         setError(fieldName, {
// //           type: "manual",
// //           message: "Only positive integers are allowed",
// //         });
// //       } else {
// //         clearErrors(fieldName);
// //       }
// //     } else if (fieldName === "ratePerHour") {
// //       // New validation for ratePerHour (positive decimals or integers)
// //       // Allow empty string, positive integers, and positive decimal numbers (including 0.X)
// //       if (!decimalRegex.test(value)) {
// //         // Check if it matches the general decimal regex
// //         setError(fieldName, {
// //           type: "manual",
// //           message: "Only positive numbers (integers or decimals) are allowed",
// //         });
// //       } else if (
// //         value.startsWith("0") &&
// //         value.length > 1 &&
// //         !value.startsWith("0.")
// //       ) {
// //         // Disallow leading zeros for integers (e.g., "05"), but allow "0."
// //         setError(fieldName, {
// //           type: "manual",
// //           message:
// //             "Invalid number format (e.g., no leading zeros for integers)",
// //         });
// //       } else if (parseFloat(value) < 0) {
// //         // Ensure the parsed number is not negative
// //         setError(fieldName, {
// //           type: "manual",
// //           message: "Only positive numbers are allowed",
// //         });
// //       } else {
// //         clearErrors(fieldName);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="p-7">
// //       <div>
// //         <h1 className="font-bold text-[20px] md:text-[24px] text-black">
// //           Process
// //         </h1>
// //       </div>

// //       <div className="flex justify-between mt-2 items-center">
// //         <div className="flex gap-4 items-center">
// //           <p className="text-xs sm:text-[16px] text-black">
// //             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
// //           </p>
// //           <FaCircle className="text-[6px] text-gray-500" />
// //           <NavLink to={"/process-list"}>
// //             {" "}
// //             <span className="text-xs sm:text-[16px]">Process</span>
// //           </NavLink>
// //           <FaCircle className="text-[6px] text-gray-500" />
// //           <span className="text-xs sm:text-[16px]">Add process</span>
// //         </div>
// //       </div>

// //       <form onSubmit={handleSubmit(onSubmit)}>
// //         <div className="mt-4 bg-white p-6 w-full rounded-2xl 2xl:w-2/3">
// //           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Process Name</label>
// //               <input
// //                 {...register("processName", {
// //                   required: "Process Name is required",
// //                 })}
// //                 type="text"
// //                 placeholder="Enter your process name"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.processName && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.processName.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Machine Name</label>
// //               <input
// //                 {...register("machineName", {
// //                   required: "Machine Name is required",
// //                 })}
// //                 type="text"
// //                 placeholder="Enter your machine name"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.machineName && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.machineName.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Part Family</label>
// //               <input
// //                 {...register("partFamily", {
// //                   required: "Part Family is required",
// //                 })}
// //                 type="text"
// //                 placeholder="Enter your part family"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.partFamily && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.partFamily.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Process Description</label>
// //               <textarea
// //                 {...register("processDesc", {
// //                   required: "Process Description is required",
// //                 })}
// //                 placeholder="Enter a description"
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.processDesc && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.processDesc.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Cycle Time</label>
// //               <div className="flex gap-2">
// //                 <input
// //                   {...register("cycleTimeValue", {
// //                     required: "Cycle time is required",
// //                     pattern: {
// //                       value: /^[1-9]\d*$/,
// //                       message: "Only positive integers are allowed",
// //                     },
// //                   })}
// //                   type="text"
// //                   inputMode="numeric"
// //                   placeholder="Enter time"
// //                   onKeyDown={(e) => {
// //                     if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
// //                       e.preventDefault();
// //                     }
// //                   }}
// //                   onInput={(e: ChangeEvent<HTMLInputElement>) =>
// //                     handleNumericInput(e, "cycleTimeValue")
// //                   }
// //                   className="border py-4 px-4 rounded-md w-full"
// //                 />
// //                 <select
// //                   {...register("cycleTimeUnit", {
// //                     required: "Unit is required",
// //                   })}
// //                   className="border py-4 px-2 rounded-md w-1/3"
// //                   defaultValue=""
// //                 >
// //                   <option value="" disabled>
// //                     Unit
// //                   </option>
// //                   <option value="sec">Sec</option>
// //                   <option value="min">Min</option>
// //                   <option value="hr">Hr</option>
// //                 </select>
// //               </div>
// //               {(errors.cycleTimeValue || errors.cycleTimeUnit) && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.cycleTimeValue?.message ||
// //                     errors.cycleTimeUnit?.message}
// //                 </p>
// //               )}
// //             </div>

// //             <div className="sm:w-1/2">
// //               <label className="font-semibold">Rate per hour</label>
// //               <input
// //                 {...register("ratePerHour", {
// //                   required: "Rate per hour is required",
// //                   pattern: {
// //                     // Updated regex to allow positive integers and decimals, and optional leading zero for decimals
// //                     value: /^(?:[1-9]\d*|0)(?:\.\d*)?$|^\.\d*[1-9]\d*$/,
// //                     // This pattern is more robust:
// //                     // ^(?:[1-9]\d*|0) matches positive integers or 0
// //                     // (?:\.\d*)?$ allows an optional decimal part (e.g., 123. or 123.45)
// //                     // |^\.\d*[1-9]\d*$ allows numbers starting with a decimal (e.g., .5, .123)
// //                     message:
// //                       "Only positive numbers (integers or decimals) are allowed",
// //                   },
// //                 })}
// //                 type="text"
// //                 inputMode="decimal" // Use 'decimal' for better mobile keyboard experience
// //                 placeholder="Enter your rate per hour"
// //                 onKeyDown={(e) => {
// //                   // Allow numbers and decimal point for ratePerHour
// //                   if (
// //                     !/[0-9]/.test(e.key) &&
// //                     e.key !== "." &&
// //                     e.key !== "Backspace" &&
// //                     e.key !== "Delete" &&
// //                     e.key !== "ArrowLeft" &&
// //                     e.key !== "ArrowRight" &&
// //                     e.key !== "Tab"
// //                   ) {
// //                     e.preventDefault();
// //                   }
// //                 }}
// //                 onInput={(e: ChangeEvent<HTMLInputElement>) =>
// //                   handleNumericInput(e, "ratePerHour")
// //                 }
// //                 className="border py-4 px-4 rounded-md w-full"
// //               />
// //               {errors.ratePerHour && (
// //                 <p className="text-red-500 text-sm">
// //                   {errors.ratePerHour.message}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           <label className="font-semibold">Process Order Needed?</label>
// //           <div className="mt-2 mb-6 flex gap-6">
// //             <div className="flex items-center">
// //               <input
// //                 {...register("isProcessReq", {
// //                   required: "Please select an option",
// //                 })}
// //                 type="radio"
// //                 id="yes"
// //                 value="true"
// //               />
// //               <label htmlFor="yes" className="ml-2">
// //                 Yes
// //               </label>
// //             </div>

// //             <div className="flex items-center">
// //               <input
// //                 {...register("isProcessReq", {
// //                   required: "Please select an option",
// //                 })}
// //                 type="radio"
// //                 id="no"
// //                 value="false"
// //               />
// //               <label htmlFor="no" className="ml-2">
// //                 No
// //               </label>
// //             </div>
// //           </div>

// //           {errors.isProcessReq && (
// //             <p className="text-red-500 text-sm">
// //               {errors.isProcessReq.message}
// //             </p>
// //           )}

// //           <div className="flex justify-end items-end">
// //             <div className="mt-6">
// //               <button
// //                 type="submit"
// //                 className="bg-brand text-white px-6 py-3 rounded-md"
// //               >
// //                 Add Process
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// const AddProcess = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//     clearErrors,
//   } = useForm<ProcessFormData>();

//   const navigate = useNavigate();

//   const onSubmit = async (data: ProcessFormData) => {
//     try {
//       const apiPayload = {
//         processName: data.processName,
//         machineName: data.machineName,
//         partFamily: data.partFamily,
//         processDesc: data.processDesc,
//         cycleTime: `${data.cycleTime}`, // ✅ Combine here
//         ratePerHour: parseFloat(data.ratePerHour), // Use parseFloat for decimal numbers
//         isProcessReq: data.isProcessReq === "true",
//       };

//       const response = await addProcess(apiPayload);
//       if (response && response.status === 201) {
//         navigate("/process-list");
//       }
//     } catch (error) {
//       console.error("Failed to add process:", error);
//     }
//   };

//   const handleNumericInput = (
//     e: ChangeEvent<HTMLInputElement>,
//     fieldName: "cycleTimeValue" | "ratePerHour"
//   ) => {
//     const value = e.target.value;
//     // Allow empty string, positive integers, and positive decimal numbers
//     const decimalRegex = /^\d*\.?\d*$/; // Allows empty, 123, 123., .5, 0.5, 12.34, 0

//     if (fieldName === "cycleTimeValue") {
//       // Keep original validation for cycleTimeValue (positive integers)
//       // Allow empty string or numbers starting from 1
//       if (!/^(?:[1-9]\d*)?$/.test(value) && value !== "") {
//         setError(fieldName, {
//           type: "manual",
//           message: "Only positive integers are allowed",
//         });
//       } else {
//         clearErrors(fieldName);
//       }
//     } else if (fieldName === "ratePerHour") {
//       // New validation for ratePerHour (positive decimals or integers)
//       // Allow empty string, positive integers, and positive decimal numbers (including 0.X)
//       if (!decimalRegex.test(value)) {
//         // Check if it matches the general decimal regex
//         setError(fieldName, {
//           type: "manual",
//           message: "Only positive numbers (integers or decimals) are allowed",
//         });
//       } else if (
//         value.startsWith("0") &&
//         value.length > 1 &&
//         !value.startsWith("0.")
//       ) {
//         // Disallow leading zeros for integers (e.g., "05"), but allow "0."
//         setError(fieldName, {
//           type: "manual",
//           message:
//             "Invalid number format (e.g., no leading zeros for integers)",
//         });
//       } else if (parseFloat(value) < 0) {
//         // Ensure the parsed number is not negative
//         setError(fieldName, {
//           type: "manual",
//           message: "Only positive numbers are allowed",
//         });
//       } else {
//         clearErrors(fieldName);
//       }
//     }
//   };

//   return (
//     <div className="p-7">
//       <div>
//         <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//           Process
//         </h1>
//       </div>

//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center">
//           <p className="text-xs sm:text-[16px] text-black">
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <NavLink to={"/process-list"}>
//             {" "}
//             <span className="text-xs sm:text-[16px]">Process</span>
//           </NavLink>
//           <FaCircle className="text-[6px] text-gray-500" />
//           <span className="text-xs sm:text-[16px]">Add process</span>
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
//                   // Add validation to prevent submission of only whitespace
//                   validate: (value) =>
//                     value.trim() !== "" || "Process Name is required",
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
//               <label className="font-semibold">Machine Name</label>
//               <input
//                 {...register("machineName", {
//                   required: "Machine Name is required",
//                   // Add validation to prevent submission of only whitespace
//                   validate: (value) =>
//                     value.trim() !== "" || "Machine Name is required",
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

//             <div className="sm:w-1/2">
//               <label className="font-semibold">Part Family</label>
//               <input
//                 {...register("partFamily", {
//                   required: "Part Family is required",
//                   // Add validation to prevent submission of only whitespace
//                   validate: (value) =>
//                     value.trim() !== "" || "Part Family is required",
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
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 mt-2 mb-6">
//             <div className="sm:w-1/2">
//               <label className="font-semibold">Process Description</label>
//               <textarea
//                 {...register("processDesc", {
//                   required: "Process Description is required",
//                   // Add validation to prevent submission of only whitespace
//                   validate: (value) =>
//                     value.trim() !== "" || "Process Description is required",
//                 })}
//                 placeholder="Enter a description"
//                 className="border py-4 px-4 rounded-md w-full"
//               />
//               {errors.processDesc && (
//                 <p className="text-red-500 text-sm">
//                   {errors.processDesc.message}
//                 </p>
//               )}
//             </div>

//             <div className="sm:w-1/2">
//               <label className="font-semibold">Cycle Time</label>
//               <div className="flex gap-2">
//                 <input
//                   {...register("cycleTime", {
//                     required: "Cycle time is required",
//                     pattern: {
//                       value: /^[1-9]\d*$/,
//                       message: "Only positive integers are allowed",
//                     },
//                     // Add validation to prevent submission of only whitespace
//                     validate: (value) =>
//                       value.trim() !== "" || "Cycle time is required",
//                   })}
//                   type="text"
//                   inputMode="numeric"
//                   placeholder="Enter time"
//                   onKeyDown={(e) => {
//                     if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
//                       e.preventDefault();
//                     }
//                   }}
//                   onInput={(e: ChangeEvent<HTMLInputElement>) =>
//                     handleNumericInput(e, "cycleTimeValue")
//                   }
//                   className="border py-4 px-4 rounded-md w-full"
//                 />
//                 {/* <select
//                   {...register("cycleTimeUnit", {
//                     required: "Unit is required",
//                   })}
//                   className="border py-4 px-2 rounded-md w-1/3"
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Unit
//                   </option>
//                   <option value="sec">Sec</option>
//                   <option value="min">Min</option>
//                   <option value="hr">Hr</option>
//                 </select> */}
//               </div>
//               {(errors.cycleTime || errors.cycleTime) && (
//                 <p className="text-red-500 text-sm">
//                   {errors.cycleTime?.message || errors.cycleTime?.message}
//                 </p>
//               )}
//             </div>

//             <div className="sm:w-1/2">
//               <label className="font-semibold">Rate per hour</label>
//               <input
//                 {...register("ratePerHour", {
//                   required: "Rate per hour is required",
//                   pattern: {
//                     value: /^(?:[1-9]\d*|0)(?:\.\d*)?$|^\.\d*[1-9]\d*$/,
//                     message:
//                       "Only positive numbers (integers or decimals) are allowed",
//                   },
//                   // Add validation to prevent submission of only whitespace
//                   validate: (value) =>
//                     value.trim() !== "" || "Rate per hour is required",
//                 })}
//                 type="text"
//                 inputMode="decimal"
//                 placeholder="Enter your rate per hour"
//                 onKeyDown={(e) => {
//                   if (
//                     !/[0-9]/.test(e.key) &&
//                     e.key !== "." &&
//                     e.key !== "Backspace" &&
//                     e.key !== "Delete" &&
//                     e.key !== "ArrowLeft" &&
//                     e.key !== "ArrowRight" &&
//                     e.key !== "Tab"
//                   ) {
//                     e.preventDefault();
//                   }
//                 }}
//                 onInput={(e: ChangeEvent<HTMLInputElement>) =>
//                   handleNumericInput(e, "ratePerHour")
//                 }
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
//                 {...register("isProcessReq", {
//                   required: "Please select an option",
//                 })}
//                 type="radio"
//                 id="yes"
//                 value="true"
//               />
//               <label htmlFor="yes" className="ml-2">
//                 Yes
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 {...register("isProcessReq", {
//                   required: "Please select an option",
//                 })}
//                 type="radio"
//                 id="no"
//                 value="false"
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
//                 Add Process
//               </button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProcess;

import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addProcess } from "./https/processApi";

const AddProcess = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await addProcess(data);

      if (response.status === 201) {
        navigate("/process-list");
      }
    } catch (error) {}
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
            Add process
          </span>
        </div>
      </div>

      {/* handleSubmit will handle validation before calling onSubmit */}
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

            <div className="sm:w-1/2">
              <label className="font-semibold">Part Family</label>
              <input
                {...register("partFamily", {
                  required: "Part Family is required",
                })}
                type="text"
                placeholder="Enter your partFamily"
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
                })}
                placeholder="Enter a description "
                className="border py-4 px-4 rounded-md w-full"
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
              <label className="font-semibold">Rate per Hour</label>
              <input
                {...register("ratePerHour", {
                  required: "Rate per hour is required",
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: "Only positive integers are allowed",
                  },
                })}
                type="text"
                inputMode="numeric"
                placeholder="Enter rate per hour"
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  if (!/^[1-9]\d*$/.test(value) && value !== "") {
                    setError("ratePerHour", {
                      type: "manual",
                      message: "Only positive integers are allowed",
                    });
                  } else {
                    clearErrors("ratePerHour");
                  }
                }}
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
                {...register("isProcessReq", {
                  required: "Please select an option",
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
                {...register("isProcessReq", {
                  required: "Please select an option",
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
                Add Process
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProcess;
