// import belt from "../../assets/belt-solid.png";
// import { IoLogOutOutline } from "react-icons/io5";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   completeTraningApi,
//   stationProcessDetail,
//   updateStepTime,
// } from "./https/productionResponseApi";
// import CommentBox from "./CommentBox";
// const BASE_URL = import.meta.env.VITE_SERVER_URL;

// interface Image {
//   imagePath: string;
// }

// interface Step {
//   id: string;
//   title: string;
//   instruction: string;
//   images: Image[];
// }

// interface WorkInstruction {
//   id: string;
//   steps: Step[];
// }

// interface Part {
//   partDescription: string;
//   WorkInstruction: WorkInstruction[];
// }

// interface Order {
//   orderNumber: string;
//   order_date: string;
//   delivery_date: string;
//   productQuantity: number;
// }

// interface EmployeeInfo {
//   firstName: string;
//   lastName: string;
// }

// interface Process {
//   processName: string;
// }

// interface JobData {
//   productionId: string;
//   part: Part;
//   order: Order;
//   employeeInfo: EmployeeInfo;
//   process: Process;
//   quantity: number;
//   completedQuantity: number;
//   cycleTime: string;
// }

// const Training = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   console.log("idid", id);
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
//   const allSteps =
//     jobData?.part?.WorkInstruction?.flatMap((wi) => wi.steps) || [];

//   // Check if all steps are selected

//   const handleStepClick = async (stepId: string) => {
//     if (!jobData) return;

//     // UI update
//     setCompletedSteps((prev) => {
//       const newSet = new Set(prev);
//       newSet.add(stepId);
//       return newSet;
//     });

//     try {
//       // Backend call
//       await updateStepTime(jobData.productionId, stepId);
//     } catch (error) {
//       console.error("Failed to update step time", error);
//     }
//   };
//   const fetchJobDetails = async (jobId: string | undefined) => {
//     if (!jobId) {
//       setLoading(false);
//       navigate("/station-login");
//       return;
//     }
//     console.log("jobIdjobId", jobId);
//     const stationUserId = localStorage.getItem("stationUserId");
//     try {
//       setLoading(true);
//       const response = await stationProcessDetail(jobId, stationUserId);
//       const data = response?.data;
//       if (data) setJobData(data);
//     } catch (error: any) {
//       if (error?.status === 404) {
//         navigate("/station-login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     navigate("/station-logout");
//   };

//   const allCompleted =
//     allSteps.length > 0 && completedSteps.size === allSteps.length;

//   const handleCompleteOrder = async () => {
//     if (!jobData) return;

//     try {
//       const response = await completeTraningApi(jobData.productionId);
//       fetchJobDetails(id);
//       if (response?.status === 200) {
//         navigate("/station-login");
//       }
//     } catch (error: any) {
//       if (error?.response?.status === 400) {
//         fetchJobDetails(id);
//       } else {
//         console.error("Error completing order:", error);
//       }
//     }
//   };

//   const formatDate = (date: string | undefined) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

//   const formatTime = (timeStr: string | undefined) =>
//     timeStr ? new Date(`1970-01-01T${timeStr}Z`).toLocaleTimeString() : "N/A";

//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!jobData) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p>No any traning available.</p>

//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand"
//         >
//           Go Back to station login
//         </button>
//       </div>
//     );
//   }
//   const formatCycleTime = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const startTime = new Date(dateString);
//       if (isNaN(startTime.getTime())) {
//         return "Invalid Time";
//       }
//       const now = new Date();
//       const diffMs = now - startTime;
//       const diffMinutes = Math.floor(diffMs / (1000 * 60));

//       return `${diffMinutes} min`;
//     } catch (error) {
//       console.error("Could not format cycle time:", dateString, error);
//       return "N/A";
//     }
//   };
//   const {
//     part,
//     order,
//     employeeInfo,
//     process,
//     upcommingParts,
//     upcommingOrder,
//     order_date,
//   } = jobData;
//   console.log("partpart", jobData);
//   // const rows = [
//   //   { part: part.partNumber, date: order_date },
//   //   { part: upcommingParts, date: upcommingOrder },
//   // ];
//   const rows = [
//     { part: part?.partNumber || part?.partDescription, date: order_date },
//   ];
//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       <div className="bg-[#243C75] relative">
//         <div className="flex justify-end p-2 bg-[#17274C] text-white">
//           <button
//             onClick={handleLogout}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={16} className="md:size-[20px]" />
//           </button>
//         </div>
//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full max-w-xl mx-auto">
//             <div className="w-full  mb-8 sm:mb-8 md:mb-8">
//               <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold break-words leading-snug text-white px-2">
//                 Process Name :
//                 <span className="text-md font-medium">
//                   {part?.process.processName || "No Available"}
//                 </span>
//               </p>
//             </div>

//             <img
//               src={belt}
//               alt="Belt icon"
//               className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
//             />

//             {/* Table overlay on image */}
//             <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-3 md:px-4 mt-5">
//               <div className=" bg-opacity-50 rounded-md overflow-x-auto w-full">
//                 <table className="border border-white text-white text-center w-full min-w-[280px]">
//                   <thead>
//                     <tr className="font-semibold">
//                       <th className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                         Part
//                       </th>
//                       <th className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                         Schedule date
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {rows.map((row, i) => (
//                       <tr key={i}>
//                         <td className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                           {row.part}
//                         </td>
//                         <td className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                           {formatDate(row.date)}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//           <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
//             <div>
//               <p className="md:text-2xl ">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
//             </div>
//             <div className="flex flex-col  gap-1 md:gap-2">
//               <p className="text-sm md:text-base">
//                 Date: {formatDate(jobData.delivery_date)}
//               </p>
//               <p className=" text-sm md:text-base">
//                 Qty: {jobData.completedQty}
//               </p>
//               <p className=" text-sm md:text-base">
//                 Scrap Qty: {jobData.scrapQty}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto p-4 md:p-6 flex-grow">
//         <CommentBox employeeInfo={employeeInfo} />

//         <div className="py-4 flex flex-col gap-4">
//           {allSteps.map((step, index) => (
//             <div
//               key={step.id || index}
//               onClick={() => handleStepClick(step.id)} // Card click logic
//               className={`flex flex-col md:flex-row gap-4 md:gap-20 items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all
//                 ${
//                   completedSteps.has(step.id)
//                     ? "border-2 border-green-500 bg-green-50"
//                     : "border-2 border-transparent"
//                 }
//               `}
//             >
//               <div className="w-full md:w-auto">
//                 <img
//                   className="rounded-md w-40 h-24 object-cover"
//                   src={
//                     step.images?.[0]
//                       ? `${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`
//                       : "https://via.placeholder.com/150"
//                   }
//                   alt={step.title}
//                 />
//               </div>
//               <div className="text-center md:text-left">
//                 <p className="font-semibold text-lg">{step.title}</p>
//                 <p className="text-gray-600">{step.instruction}</p>
//               </div>
//               {completedSteps.has(step.id) && (
//                 <div className="ml-auto text-green-600 font-bold">
//                   ✓ Selected
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col items-center gap-3 mt-6">
//           <button
//             onClick={handleCompleteOrder}
//             disabled={!allCompleted}
//             className={`px-10 py-3 rounded-md font-bold transition-all ${
//               allCompleted
//                 ? "bg-green-600 text-white cursor-pointer shadow-lg"
//                 : "bg-gray-400 text-gray-700 cursor-not-allowed"
//             }`}
//           >
//             Complete Training
//           </button>
//         </div>
//       </div>

//       <div className="bg-[#243C75]  bottom-0 w-full">
//         <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//             <div className="flex flex-col items-center">
//               <p className="text-sm md:text-base">Process</p>
//               <p className="text-sm md:text-base">{process?.processName}</p>
//             </div>
//             {/* <div className="flex flex-col items-center">
//               <p className="text-green-500 text-sm md:text-base">Total Qty</p>
//               <p className="text-green-500 text-sm md:text-base">
//                 {jobData.quantity}
//               </p>
//             </div> */}
//             {/* <div className="flex flex-col items-center">
//               <p className="text-green-500 text-sm md:text-base">
//                 Remaining Qty
//               </p>
//               <p className="text-green-500 text-sm md:text-base">
//                 {jobData.remainingQty}
//               </p>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-red-500 text-sm md:text-base">Scrap</p>
//               <p className="text-red-500 text-sm md:text-base">
//                 {" "}
//                 {jobData.scrapQuantity}
//               </p>
//             </div> */}
//           </div>
//           <div className="flex gap-2 md:gap-6  justify-center">
//             <div className="flex flex-col items-center text-white">
//               <p className="text-sm md:text-base font-semibold"> Employee</p>
//               <p className="text-sm md:text-base">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
//             </div>
//             {/* <div className="flex flex-col items-center text-white">
//               <p className="text-sm md:text-base font-semibold"> Qty</p>
//               <p className="text-sm md:text-base">{jobData.completedQty}</p>
//             </div> */}
//             <div className="flex flex-col items-center text-white">
//               <p className="text-sm md:text-base font-semibold">Cycle Time</p>
//               <p className="text-sm md:text-base">
//                 {formatCycleTime(jobData?.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Training;
// import belt from "../../assets/belt-solid.png";
// import { IoLogOutOutline } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import {
//   completeTraningApi,
//   stationProcessDetail,
//   updateStepTime,
// } from "./https/productionResponseApi";
// import CommentBox from "./CommentBox";

// const BASE_URL = import.meta.env.VITE_SERVER_URL;

// // --- Interfaces Fixed to match your JSON ---
// interface Image {
//   imagePath: string;
// }

// interface Step {
//   id: string;
//   title: string;
//   instruction: string;
//   images: Image[];
//   stepNumber: number;
// }

// interface JobData {
//   productionId: string;
//   workInstructionSteps: Step[]; // JSON ke hisaab se seedha yahan hai
//   part: {
//     partNumber: string;
//     partDescription: string;
//     process: { processName: string };
//   };
//   order: {
//     orderNumber: string;
//     orderDate: string;
//     delivery_date: string;
//   };
//   employeeInfo: {
//     firstName: string;
//     lastName: string;
//   };
//   process: {
//     processName: string;
//   };
//   cycleTime: string;
//   completedQuantity: number;
//   scrapQuantity: number;
//   incomingJobs: any[]; // Table ke liye
// }

// const Training = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

//   // FIXED: Accessing steps directly from jobData
//   const allSteps = jobData?.workInstructionSteps || [];

//   const handleStepClick = async (stepId: string) => {
//     if (!jobData) return;
//     setCompletedSteps((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(stepId)) return prev; // Avoid duplicate calls
//       newSet.add(stepId);
//       return newSet;
//     });

//     try {
//       await updateStepTime(jobData.productionId, stepId);
//     } catch (error) {
//       console.error("Failed to update step time", error);
//     }
//   };

//   const fetchJobDetails = async (jobId: string | undefined) => {
//     if (!jobId) {
//       navigate("/station-login");
//       return;
//     }
//     const stationUserId = localStorage.getItem("stationUserId");
//     try {
//       setLoading(true);
//       const response = await stationProcessDetail(jobId, stationUserId);
//       if (response?.data) {
//         setJobData(response.data);
//       }
//     } catch (error: any) {
//       if (error?.status === 404) navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteOrder = async () => {
//     if (!jobData) return;
//     try {
//       const response = await completeTraningApi(jobData.productionId);
//       if (response?.status === 200) {
//         navigate("/station-login");
//       }
//     } catch (error: any) {
//       console.error("Error completing training:", error);
//     }
//   };

//   const formatDate = (date: string | undefined) =>
//     date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

//   const formatCycleTime = (dateString: string | undefined) => {
//     if (!dateString) return "0 min";
//     const startTime = new Date(dateString);
//     const diffMs = new Date().getTime() - startTime.getTime();
//     return `${Math.floor(diffMs / (1000 * 60))} min`;
//   };

//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id]);

//   if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
//   if (!jobData) return <div className="min-h-screen flex flex-col items-center justify-center">No Training Available.</div>;

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* Header Section */}
//       <div className="bg-[#243C75] relative">
//         <div className="flex justify-end p-2 bg-[#17274C] text-white">
//           <button onClick={() => navigate("/station-logout")} className="text-xs flex items-center gap-1">
//             Log out <IoLogOutOutline size={20} />
//           </button>
//         </div>
//          <div className="container  p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full max-w-xl">
//             <p className="text-xl font-semibold text-white mb-4">
//               Process Name: <span className="font-normal">{jobData.process?.processName}</span>
//             </p>

//             <div className="relative">
//                 <img src={belt} alt="Belt" className="w-full h-32 object-contain" />
//                 <div className="absolute inset-0 flex items-center justify-center mt-6">
//                 <table className="border border-white text-white text-center w-4/5 text-xs">
//                     <thead>
//                     <tr>
//                         <th className="border border-white p-1">Part</th>
//                         <th className="border border-white p-1">Date</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     <tr>
//                         <td className="border border-white p-1">{jobData.part?.partNumber}</td>
//                         <td className="border border-white p-1">{formatDate(jobData.order?.orderDate)}</td>
//                     </tr>
//                     </tbody>
//                 </table>
//                 </div>
//             </div>
//           </div>

//           <div className="text-white text-right">
//             <p className="text-2xl">{`${jobData.employeeInfo?.firstName} ${jobData.employeeInfo?.lastName}`}</p>
//             {/* <p>Completed Qty: {jobData.completedQuantity}</p>
//             <p>Scrap Qty: {jobData.scrapQuantity}</p> */}
//           </div>
//         </div>
//       </div>

//       {/* Steps Section */}
//       <div className="container mx-auto p-6 flex-grow">
//         <CommentBox employeeInfo={jobData.employeeInfo} />

//         <div className="py-6 flex flex-col gap-4">
//           {allSteps.length > 0 ? (
//             allSteps.map((step) => (
//               <div
//                 key={step.id}
//                 onClick={() => handleStepClick(step.id)}
//                 className={`flex gap-6 items-center bg-white rounded-lg shadow-md p-4 cursor-pointer border-2 transition-all
//                   ${completedSteps.has(step.id) ? "border-green-500 bg-green-50" : "border-transparent"}
//                 `}
//               >
//                 <img
//                   className="rounded-md w-32 h-20 object-cover"
//                   src={step.images?.[0] ? `${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}` : "https://via.placeholder.com/150"}
//                   alt={step.title}
//                 />
//                 <div>
//                   <p className="font-bold text-lg">{step.stepNumber}. {step.title}</p>
//                   <p className="text-gray-600">{step.instruction}</p>
//                 </div>
//                 {completedSteps.has(step.id) && <div className="ml-auto text-green-600 font-bold">✓ DONE</div>}
//               </div>
//             ))
//           ) : (
//             <p className="text-center py-10">No steps found for this training.</p>
//           )}
//         </div>

//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleCompleteOrder}
//             disabled={completedSteps.size < allSteps.length || allSteps.length === 0}
//             className={`px-10 py-3 rounded-md font-bold ${
//               completedSteps.size >= allSteps.length && allSteps.length > 0
//                 ? "bg-green-600 text-white shadow-lg"
//                 : "bg-gray-400 text-gray-700 cursor-not-allowed"
//             }`}
//           >
//             Complete Training
//           </button>
//         </div>
//       </div>

//       {/* Footer Section */}
//       <div className="bg-[#243C75] text-white p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <div>
//             <p className="text-xs uppercase opacity-70">Process</p>
//             <p>{jobData.process?.processName}</p>
//           </div>
//           <div>
//             <p className="text-xs uppercase opacity-70">Cycle Time</p>
//             <p>{formatCycleTime(jobData.cycleTime)}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Training;import belt from "../../assets/belt-solid.png";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  completeTraningApi,
  stationProcessDetail,
  stationTrainingProcessDetail,
  traningStatus,
  updateStepTime,
} from "./https/productionResponseApi";
import CommentBox from "./CommentBox";
 import belt from "../../assets/belt-solid.png";
import { formatDate } from "date-fns";
import { FaPlay, FaSpinner } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_SERVER_URL;

// --- Interfaces ---
interface Image { imagePath: string; }
interface Step {
  id: string;
  title: string;
  instruction: string;
  images: Image[];
  stepNumber: number;
}

interface JobData {
  productionId: string;
  part_id: string;        // Added for training check
  customPartId: string;   // Added for training check
  workInstructionSteps: Step[];
  part: {
    partNumber: string;
    partDescription: string;
  };
  employeeInfo: { firstName: string; lastName: string; };
  process: { processName: string; };
  cycleTime: string;
  order: { orderNumber: string; orderDate: string; };
}


const Training = () => {
  const navigate = useNavigate();
  const { id: processId } = useParams<{ id: string }>();
  const [jobData, setJobData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // 1. Station User ID Helper
  const getUserId = () => {
    const rawData = localStorage.getItem("stationUserId");
    if (!rawData) return null;
    try {
      const parsed = JSON.parse(rawData);
      return typeof parsed === "object" ? parsed.id : parsed;
    } catch {
      return rawData;
    }
  };

  const stationUserId = getUserId();

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Not Available";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

const formatCycleTime = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const startTime = new Date(dateString);
    if (isNaN(startTime.getTime())) {
      return "Invalid Time";
    }
    const now = new Date();
    const diffMs = now - startTime;

    // Math.max use kiya hai taaki agar difference 0 se chota ho toh 0 dikhaye
    const diffMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

    return `${diffMinutes} min`;
  } catch (error) {
    console.error("Could not format cycle time:", dateString, error);
    return "N/A";
  }
};
  // 2. Training Certification Check
  const verifyTraining = async (productId: string) => {
    if (!stationUserId || !processId || !productId || stationUserId === "undefined") return;
    try {
      const response = await traningStatus({
        stationUserId: String(stationUserId),
        processId: String(processId),
        productId: String(productId)
      });
      if (response?.isTrained) {
        navigate(`/station-login`);
      }
    } catch (error) {
      console.error("Training check failed:", error);
    }
  };

  // 3. Fetch Job and Instructions
  const fetchJobDetails = async () => {
    if (!processId || !stationUserId) {
      navigate("/station-login");
      return;
    }
    try {
      setLoading(true);
      const response = await stationTrainingProcessDetail(processId, stationUserId);
      if (response?.data) {
        setJobData(response.data);
        const pId = response.data.part_id || response.data.customPartId;
        if (pId) await verifyTraining(pId);
      } else {
        alert("No trainable jobs available.");
        navigate("/station-login");
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      if (error?.status === 404) navigate("/station-login");
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Step Learning
  const handleStepClick = async (stepId: string) => {
    if (!jobData || !jobData.productionId || completedSteps.has(stepId)) return;
    setCompletedSteps((prev) => new Set(prev).add(stepId));
    try {
      await updateStepTime({
        productionId: String(jobData.productionId),
        stepId: String(stepId)
      });
    } catch (error) {
      console.error("Failed to update step time:", error);
    }
  };

  const handleCompleteTraining = async () => {
    if (!jobData) return;
    try {
      const response = await completeTraningApi(jobData.productionId);
      if (response?.status === 200) {
        alert("Congratulations! Training Completed.");
        navigate(`/station-login`);
      }
    } catch (error: any) {
      console.error("Error completing training:", error);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [processId]);

  if (loading) return <div className="min-h-screen flex justify-center items-center"><FaSpinner/></div>;
  if (!jobData) return <div className="min-h-screen flex justify-center items-center">No Jobs Found.</div>;

  const allSteps = jobData.workInstructionSteps || [];
  const rows = [{ status: "Current", part: jobData.part?.partNumber || "N/A", date: jobData.order_date }];

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
      {/* HEADER SECTION (Consistent with RunSchedule) */}
      <div className="bg-[#243C75] relative">
        <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
          <button onClick={() => navigate("/station-login")} className="text-xs md:text-sm font-semibold flex items-center gap-1">
            Log out <IoLogOutOutline size={20} />
          </button>
        </div>

        <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="w-full mb-8">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white px-2">
                  Training Mode: 
                  <span className="text-md font-medium ml-2">
                    {jobData.process?.processName} ({jobData.process?.machineName})
                  </span>
                </p>
              </div>

              <img src={belt} alt="Belt" className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain" />

              <div className="absolute inset-0 flex items-center justify-center px-2 mt-5">
                <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
                  <table className="border border-white text-white text-center w-full min-w-[280px]">
                    <thead className="sticky top-0 bg-[#243C75]">
                      <tr className="font-semibold text-xs sm:text-sm">
                        <th className="border border-white px-2 py-1">Part Number (Learning)</th>
                        <th className="border border-white px-2 py-1">Due Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className="bg-blue-600/30">
                          <td className="border border-white px-2 py-1 text-xs sm:text-sm">{row.part}</td>
                          <td className="border border-white px-2 py-1 text-xs sm:text-sm">
                            {row.date.includes('T') ? formatDate(row.date) : row.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white flex flex-col gap-1">
            <p className="text-sm font-bold uppercase text-blue-300">Training Progress</p>
            <p className="text-3xl font-black">{completedSteps.size} / {allSteps.length}</p>
            <p className="text-sm">Steps Completed</p>
          </div>
        </div>
      </div>

      {/* INSTRUCTIONS SECTION */}
      <div className="container mx-auto p-4 md:p-6 flex-grow max-w-6xl">
        <div className="py-4 flex flex-col gap-4">
          {allSteps.map((step: any, index: number) => (
            <div
              key={step.id || index}
              onClick={() => handleStepClick(step.id)}
              className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
                ${completedSteps.has(step.id) ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-brand"}
              `}
            >
              {/* STEP NUMBER */}
              <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold 
                ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}>
                {index + 1}
              </div>

              {/* MEDIA SECTION (Images & Videos) */}
              <div className="flex flex-wrap gap-3 flex-shrink-0">
                {step.images?.length > 0 && (
                  <img
                    className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border"
                    src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
                    alt={step.title}
                  />
                )}

                {step.videos?.length > 0 && (
                  <div
                    className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent marking step as learned when just playing video
                      setActiveVideo(`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`);
                    }}
                  >
                    <video className="w-full h-full object-cover opacity-60">
                      <source src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`} />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
                        <FaPlay className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* TEXT SECTION */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{step.title}</h3>
                  {completedSteps.has(step.id) && <span className="text-green-600 font-bold text-sm">✓ LEARNED</span>}
                </div>
                <p className="text-gray-600 leading-relaxed">{step.instruction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION */}
        <div className="flex flex-col items-center mt-10 mb-10">
          <button
            onClick={handleCompleteTraining}
            disabled={completedSteps.size < allSteps.length || allSteps.length === 0}
            className={`px-10 py-3 rounded-md font-bold text-lg transition-all
              ${completedSteps.size < allSteps.length 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-brand text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto"}
            `}
          >
            Complete Training
          </button>
          {/* {completedSteps.size < allSteps.length && (
            <p className="text-red-500 mt-2 text-sm">Please complete all {allSteps.length} steps to finish.</p>
          )} */}
        </div>
      </div>

      {/* VIDEO PLAYER MODAL */}
       <div className="bg-[#243C75] w-full mt-auto">
        <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Left Side: Order & Process Stats */}
          <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <p className="text-xs md:text-sm opacity-70">Process</p>
              <p className="text-sm md:text-base font-semibold">
                {jobData.process?.processName || "N/A"}
              </p>
            </div>
            {/* <div className="flex flex-col items-center">
              <p className="text-green-500 text-xs md:text-sm">Total Qty</p>
              <p className="text-green-500 text-sm md:text-base font-bold">
                {jobData.scheduleQuantity || 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-green-500 text-xs md:text-sm">Remaining Qty</p>
              <p className="text-green-500 text-sm md:text-base font-bold">
                {jobData.remainingQty || 0}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-xs md:text-sm">Scrap</p>
              <p className="text-red-500 text-sm md:text-base font-bold">
                {jobData.scrapQuantity || 0}
              </p>
            </div> */}
          </div>

          {/* Right Side: Employee & Performance Stats */}
          <div className="flex gap-4 md:gap-10 justify-center">
            <div className="flex flex-col items-center text-white">
              {/* <p className="text-xs md:text-sm font-semibold opacity-70">Employee</p>
              <p className="text-sm md:text-base">
                {jobData.employeeInfo 
                  ? `${jobData.employeeInfo.firstName} ${jobData.employeeInfo.lastName}` 
                  : "Worker"}
              </p> */}
            </div>
            <div className="flex flex-col items-center text-white">
              <p className="text-xs md:text-sm font-semibold opacity-70">Completed</p>
              <p className="text-sm md:text-base">{jobData.employeeCompletedQty || 0}</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <p className="text-xs md:text-sm font-semibold opacity-70">Cycle Time</p>
              <p className="text-sm md:text-base font-mono">
                {formatCycleTime(jobData?.cycleTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* --- FOOTER SECTION END --- */}

      {/* Video Player Modal (Same as before) */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={() => setActiveVideo(null)}></div>
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
            {/* Close & Video Player */}
            <div className="absolute top-0 right-0 p-4 z-20">
               <button onClick={() => setActiveVideo(null)} className="text-white bg-white/10 p-2 rounded-full"><IoClose size={30} /></button>
            </div>
            <video src={activeVideo} controls autoPlay className="w-full h-full" />
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Training;
// const Training = () => {
//   const navigate = useNavigate();
//   const { id: processId } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

//   const stationUserId = localStorage.getItem("stationUserId");
// const verifyTraining = async (productId: string) => {
//   if (!stationUserId || !processId || !productId) {
//       console.error("Missing params:", { stationUserId, processId, productId });
//       return;
//   }

//   try {
//     // Yahan ensure karein ki stationUserId ek string hai, object nahi
//     const response = await traningStatus({
//       stationUserId: String(stationUserId), // Force string
//       processId: String(processId),
//       productId: String(productId)
//     });

//     if (response?.isTrained) {
//        navigate(`/production/${processId}`); 
//     }
//   } catch (error) {
//     console.error("Training check failed", error);
//   }
// };
//   const fetchJobDetails = async (jobId: string | undefined) => {
//     if (!jobId || !stationUserId) {
//       navigate("/station-login");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await stationTrainingProcessDetail(jobId, stationUserId);
//       if (response?.data) {
//         setJobData(response.data);
        
//         // Job milte hi training check karein
//         const pId = response.data.part_id || response.data.customPartId;
//         if (pId) {
//           verifyTraining(pId);
//         }
//       }
//     } catch (error: any) {
//       if (error?.status === 404) navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStepClick = async (stepId: string) => {
//     if (!jobData) return;
//     if (completedSteps.has(stepId)) return;

//     setCompletedSteps((prev) => new Set(prev).add(stepId));

//     try {
//       // Backend par step complete hone ka time record karein
//       await updateStepTime(jobData.productionId, stepId);
//     } catch (error) {
//       console.error("Failed to update step time", error);
//     }
//   };

//   const handleCompleteTraining = async () => {
//     if (!jobData) return;
//     try {
//       // API call to set trainingStatus = true in DB
//       const response = await completeTraningApi(jobData.productionId);
//       if (response?.status === 200) {
//         alert("Training Completed Successfully!");
//         navigate("/station-login"); // Ya production par bhejein
//       }
//     } catch (error: any) {
//       console.error("Error completing training:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails(processId);
//   }, [processId]);

//   if (loading) return <div className="min-h-screen flex justify-center items-center font-bold">Checking training status...</div>;
//   if (!jobData) return <div className="min-h-screen flex flex-col items-center justify-center">No Training Found.</div>;

//   const allSteps = jobData.workInstructionSteps || [];

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* Header */}
//       <div className="bg-[#243C75] text-white">
//         <div className="flex justify-end p-2 bg-[#17274C]">
//           <button onClick={() => navigate("/station-logout")} className="text-xs flex items-center gap-1">
//             Log out <IoLogOutOutline size={20} />
//           </button>
//         </div>
//         <div className="container p-4 flex justify-between items-center">
//           <div>
//             <p className="text-xl font-bold">Training Mode</p>
//             <p className="opacity-80">Process: {jobData.process?.processName}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-lg font-semibold">{`${jobData.employeeInfo?.firstName} ${jobData.employeeInfo?.lastName}`}</p>
//             <p className="text-xs bg-yellow-500 text-black px-2 py-1 rounded inline-block mt-1">Pending Certification</p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto p-6 flex-grow">
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
//             <div>
//                 <p className="text-gray-500 text-xs">PART NUMBER</p>
//                 <p className="font-bold text-lg">{jobData.part?.partNumber}</p>
//             </div>
//             <div className="text-right">
//                 <p className="text-gray-500 text-xs">ORDER NO</p>
//                 <p className="font-bold">{jobData.order?.orderNumber}</p>
//             </div>
//         </div>

//         <div className="flex flex-col gap-4">
//           {allSteps.length > 0 ? (
//             allSteps.map((step) => (
//               <div
//                 key={step.id}
//                 onClick={() => handleStepClick(step.id)}
//                 className={`flex gap-6 items-center bg-white rounded-lg shadow-md p-4 cursor-pointer border-l-8 transition-all
//                   ${completedSteps.has(step.id) ? "border-green-500 bg-green-50" : "border-red-400"}
//                 `}
//               >
//                 <div className="bg-gray-200 rounded text-xl font-bold w-10 h-10 flex items-center justify-center">
//                     {step.stepNumber}
//                 </div>
//                 <img
//                   className="rounded-md w-32 h-20 object-cover border"
//                   src={step.images?.[0] ? `${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}` : "https://via.placeholder.com/150"}
//                   alt={step.title}
//                 />
//                 <div className="flex-grow">
//                   <p className="font-bold text-lg">{step.title}</p>
//                   <p className="text-gray-600 text-sm">{step.instruction}</p>
//                 </div>
//                 {completedSteps.has(step.id) && <div className="text-green-600 font-bold text-xl">✓</div>}
//               </div>
//             ))
//           ) : (
//             <div className="bg-orange-100 p-10 text-center rounded-lg border border-orange-200">
//                 No Work Instructions found for this product.
//             </div>
//           )}
//         </div>

//         {/* Action Button */}
//         <div className="flex justify-center mt-10">
//           <button
//             onClick={handleCompleteTraining}
//             disabled={completedSteps.size < allSteps.length || allSteps.length === 0}
//             className={`px-12 py-4 rounded-full font-bold text-lg transition-all shadow-lg ${
//               completedSteps.size >= allSteps.length && allSteps.length > 0
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {completedSteps.size >= allSteps.length ? "Finish & Submit Training" : `Complete all ${allSteps.length} steps`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Training;