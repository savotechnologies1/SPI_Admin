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
interface Image {
  imagePath: string;
}
interface Step {
  id: string;
  title: string;
  instruction: string;
  images: Image[];
  stepNumber: number;
}

interface JobData {
  productionId: string;
  part_id: string; // Added for training check
  customPartId: string; // Added for training check
  workInstructionSteps: Step[];
  part: {
    partNumber: string;
    partDescription: string;
  };
  employeeInfo: { firstName: string; lastName: string };
  process: { processName: string };
  cycleTime: string;
  order: { orderNumber: string; orderDate: string };
}

// const Training = () => {
//   const navigate = useNavigate();
//   const { id: processId } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//   // 1. Station User ID Helper
//   const getUserId = () => {
//     const rawData = localStorage.getItem("stationUserId");
//     if (!rawData) return null;
//     try {
//       const parsed = JSON.parse(rawData);
//       return typeof parsed === "object" ? parsed.id : parsed;
//     } catch {
//       return rawData;
//     }
//   };

//   const stationUserId = getUserId();

//   const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return "Not Available";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatCycleTime = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const startTime = new Date(dateString);
//       if (isNaN(startTime.getTime())) {
//         return "Invalid Time";
//       }

//       const now = new Date();
//       const diffMs = now - startTime;

//       // Total minutes nikaalein
//       const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

//       // 1. Agar 24 ghante (1440 min) se zyada hai
//       if (totalMinutes >= 1440) {
//         const days = Math.floor(totalMinutes / 1440);
//         const remainingMinutesAfterDays = totalMinutes % 1440;
//         const hours = Math.floor(remainingMinutesAfterDays / 60);
//         const mins = remainingMinutesAfterDays % 60;

//         let result = `${days} day${days > 1 ? "s" : ""}`;
//         if (hours > 0) result += ` ${hours} hr`;
//         if (mins > 0) result += ` ${mins} min`;

//         return result;
//       }

//       // 2. Agar 1 ghante (60 min) se zyada hai
//       else if (totalMinutes >= 60) {
//         const hours = Math.floor(totalMinutes / 60);
//         const mins = totalMinutes % 60;

//         if (mins === 0) {
//           return `${hours} hr`;
//         } else {
//           return `${hours} hr ${mins} min`;
//         }
//       }

//       // 3. Agar sirf minutes hain
//       else {
//         return `${totalMinutes} min`;
//       }
//     } catch (error) {
//       console.error("Could not format cycle time:", dateString, error);
//       return "N/A";
//     }
//   };

//   const verifyTraining = async (productId: string) => {
//     if (
//       !stationUserId ||
//       !processId ||
//       !productId ||
//       stationUserId === "undefined"
//     )
//       return;
//     try {
//       const response = await traningStatus({
//         stationUserId: String(stationUserId),
//         processId: String(processId),
//         productId: String(productId),
//       });
//       if (response?.isTrained) {
//         navigate(`/station-login`);
//       }
//     } catch (error) {
//       console.error("Training check failed:", error);
//     }
//   };

//   const fetchJobDetails = async () => {
//     if (!processId || !stationUserId) {
//       navigate("/station-login");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await stationTrainingProcessDetail(
//         processId,
//         stationUserId,
//       );
//       if (response?.data) {
//         setJobData(response.data);
//         const pId = response.data.part_id || response.data.customPartId;
//         if (pId) await verifyTraining(pId);
//       } else {
//         alert("No trainable jobs available.");
//         navigate("/station-login");
//       }
//     } catch (error: any) {
//       console.error("Fetch error:", error);
//       if (error?.status === 404) navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 4. Handle Step Learning
//   const handleStepClick = async (stepId: string) => {
//     if (!jobData || !jobData.productionId || completedSteps.has(stepId)) return;
//     setCompletedSteps((prev) => new Set(prev).add(stepId));
//     try {
//       await updateStepTime({
//         productionId: String(jobData.productionId),
//         stepId: String(stepId),
//       });
//     } catch (error) {
//       console.error("Failed to update step time:", error);
//     }
//   };

//   const handleCompleteTraining = async () => {
//     if (!jobData) return;
//     try {
//       const response = await completeTraningApi(jobData.productionId);
//       if (response?.status === 200) {
//         alert("Congratulations! Training Completed.");
//         navigate(`/station-login`);
//       }
//     } catch (error: any) {
//       console.error("Error completing training:", error);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails();
//   }, [processId]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <FaSpinner />
//       </div>
//     );
//   if (!jobData)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         No Jobs Found.
//       </div>
//     );

//   const allSteps = jobData.workInstructionSteps || [];
//   const rows = [
//     {
//       status: "Current",
//       part: jobData.part?.partNumber || "N/A",
//       date: jobData.order_date,
//     },
//   ];

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* HEADER SECTION (Consistent with RunSchedule) */}
//       <div className="bg-[#243C75] relative">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={() => navigate("/station-login")}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={20} />
//           </button>
//         </div>

//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full mb-8">
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white px-2">
//                   Training Mode:
//                   <span className="text-md font-medium ml-2">
//                     {jobData.process?.processName} (
//                     {jobData.process?.machineName})
//                   </span>
//                 </p>
//               </div>

//               <img
//                 src={belt}
//                 alt="Belt"
//                 className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
//               />

//               <div className="absolute inset-0 flex items-center justify-center px-2 mt-5">
//                 <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead className="sticky top-0 bg-[#243C75]">
//                       <tr className="font-semibold text-xs sm:text-sm">
//                         <th className="border border-white px-2 py-1">
//                           Part Number (Learning)
//                         </th>
//                         <th className="border border-white px-2 py-1">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, i) => (
//                         <tr key={i} className="bg-blue-600/30">
//                           <td className="border border-white px-2 py-1 text-xs sm:text-sm">
//                             {row.part}
//                           </td>
//                           <td className="border border-white px-2 py-1 text-xs sm:text-sm">
//                             {row.date.includes("T")
//                               ? formatDate(row.date)
//                               : row.date}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-white flex flex-col gap-1">
//             <p className="text-sm font-bold uppercase text-blue-300">
//               Training Progress
//             </p>
//             <p className="text-3xl font-black">
//               {completedSteps.size} / {allSteps.length}
//             </p>
//             <p className="text-sm">Steps Completed</p>
//           </div>
//         </div>
//       </div>

//       {/* INSTRUCTIONS SECTION */}
//       <div className="container mx-auto p-4 md:p-6 flex-grow max-w-6xl">
//         <div className="py-4 flex flex-col gap-4">
//           {allSteps.map((step: any, index: number) => (
//             <div
//               key={step.id || index}
//               onClick={() => handleStepClick(step.id)}
//               className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
//                 ${completedSteps.has(step.id) ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-brand"}
//               `}
//             >
//               {/* STEP NUMBER */}
//               <div
//                 className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold
//                 ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
//               >
//                 {index + 1}
//               </div>

//               {/* MEDIA SECTION (Images & Videos) */}
//               <div className="flex flex-wrap gap-3 flex-shrink-0">
//                 {step.images?.length > 0 && (
//                   <img
//                     className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border"
//                     src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                     alt={step.title}
//                   />
//                 )}

//                 {step.videos?.length > 0 && (
//                   <div
//                     className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent marking step as learned when just playing video
//                       setActiveVideo(
//                         `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
//                       );
//                     }}
//                   >
//                     <video className="w-full h-full object-cover opacity-60">
//                       <source
//                         src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                       />
//                     </video>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                         <FaPlay className="text-white text-xl" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* TEXT SECTION */}
//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold text-lg text-gray-800 mb-1">
//                     {step.title}
//                   </h3>
//                   {completedSteps.has(step.id) && (
//                     <span className="text-green-600 font-bold text-sm">
//                       ✓ LEARNED
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-gray-600 leading-relaxed">
//                   {step.instruction}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* BOTTOM ACTION */}
//         <div className="flex flex-col items-center mt-10 mb-10">
//           <button
//             onClick={handleCompleteTraining}
//             disabled={
//               completedSteps.size < allSteps.length || allSteps.length === 0
//             }
//             className={`px-10 py-3 rounded-md font-bold text-lg transition-all
//               ${
//                 completedSteps.size < allSteps.length
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-brand text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto"
//               }
//             `}
//           >
//             Complete Training
//           </button>
//           {/* {completedSteps.size < allSteps.length && (
//             <p className="text-red-500 mt-2 text-sm">Please complete all {allSteps.length} steps to finish.</p>
//           )} */}
//         </div>
//       </div>

//       {/* VIDEO PLAYER MODAL */}
//       <div className="bg-[#243C75] w-full mt-auto">
//         <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           {/* Left Side: Order & Process Stats */}
//           <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//             <div className="flex flex-col items-center">
//               <p className="text-xs md:text-sm opacity-70">Process</p>
//               <p className="text-sm md:text-base font-semibold">
//                 {jobData.process?.processName || "N/A"}
//               </p>
//             </div>
//             {/* <div className="flex flex-col items-center">
//               <p className="text-green-500 text-xs md:text-sm">Total Qty</p>
//               <p className="text-green-500 text-sm md:text-base font-bold">
//                 {jobData.scheduleQuantity || 0}
//               </p>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-green-500 text-xs md:text-sm">Remaining Qty</p>
//               <p className="text-green-500 text-sm md:text-base font-bold">
//                 {jobData.remainingQty || 0}
//               </p>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-red-500 text-xs md:text-sm">Scrap</p>
//               <p className="text-red-500 text-sm md:text-base font-bold">
//                 {jobData.scrapQuantity || 0}
//               </p>
//             </div> */}
//           </div>

//           {/* Right Side: Employee & Performance Stats */}
//           <div className="flex gap-4 md:gap-10 justify-center">
//             <div className="flex flex-col items-center text-white">
//               {/* <p className="text-xs md:text-sm font-semibold opacity-70">Employee</p>
//               <p className="text-sm md:text-base">
//                 {jobData.employeeInfo
//                   ? `${jobData.employeeInfo.firstName} ${jobData.employeeInfo.lastName}`
//                   : "Worker"}
//               </p> */}
//             </div>
//             <div className="flex flex-col items-center text-white">
//               <p className="text-xs md:text-sm font-semibold opacity-70">
//                 Completed
//               </p>
//               <p className="text-sm md:text-base">
//                 {jobData.employeeCompletedQty || 0}
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-white">
//               <p className="text-xs md:text-sm font-semibold opacity-70">
//                 Cycle Time
//               </p>
//               <p className="text-sm md:text-base font-mono">
//                 {formatCycleTime(jobData?.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* --- FOOTER SECTION END --- */}

//       {/* Video Player Modal (Same as before) */}
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>
//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             {/* Close & Video Player */}
//             <div className="absolute top-0 right-0 p-4 z-20">
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="text-white bg-white/10 p-2 rounded-full"
//               >
//                 <IoClose size={30} />
//               </button>
//             </div>
//             <video
//               src={activeVideo}
//               controls
//               autoPlay
//               className="w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Training;

// const Training = () => {
//   const navigate = useNavigate();
//   const { id: processId } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//   const getUserId = () => {
//     const rawData = localStorage.getItem("stationUserId");
//     if (!rawData) return null;
//     try {
//       const parsed = JSON.parse(rawData);
//       return typeof parsed === "object" ? parsed.id : parsed;
//     } catch {
//       return rawData;
//     }
//   };

//   const stationUserId = getUserId();

//   const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return "Not Available";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatCycleTime = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const startTime = new Date(dateString);
//       if (isNaN(startTime.getTime())) {
//         return "Invalid Time";
//       }

//       const now = new Date();
//       const diffMs = now - startTime;

//       // Total minutes nikaalein
//       const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

//       // 1. Agar 24 ghante (1440 min) se zyada hai
//       if (totalMinutes >= 1440) {
//         const days = Math.floor(totalMinutes / 1440);
//         const remainingMinutesAfterDays = totalMinutes % 1440;
//         const hours = Math.floor(remainingMinutesAfterDays / 60);
//         const mins = remainingMinutesAfterDays % 60;

//         let result = `${days} day${days > 1 ? "s" : ""}`;
//         if (hours > 0) result += ` ${hours} hr`;
//         if (mins > 0) result += ` ${mins} min`;

//         return result;
//       } else if (totalMinutes >= 60) {
//         const hours = Math.floor(totalMinutes / 60);
//         const mins = totalMinutes % 60;

//         if (mins === 0) {
//           return `${hours} hr`;
//         } else {
//           return `${hours} hr ${mins} min`;
//         }
//       } else {
//         return `${totalMinutes} min`;
//       }
//     } catch (error) {
//       console.error("Could not format cycle time:", dateString, error);
//       return "N/A";
//     }
//   };
//   // const fetchJobDetails = async () => {
//   //   if (!processId || !stationUserId) {
//   //     navigate("/station-login");
//   //     return;
//   //   }
//   //   try {
//   //     setLoading(true);
//   //     const response = await stationTrainingProcessDetail(
//   //       processId,
//   //       stationUserId,
//   //     );
//   //     if (response?.data) {
//   //       setJobData(response.data);
//   //     } else {
//   //       alert("No trainable jobs available.");
//   //       navigate("/station-login");
//   //     }
//   //   } catch (error) {
//   //     console.error("Fetch error:", error);
//   //     navigate("/station-login");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const fetchJobDetails = async () => {
//     if (!processId || !stationUserId) {
//       navigate("/station-login");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await stationTrainingProcessDetail(
//         processId,
//         stationUserId,
//       );

//       // Check karein ki kya backend ne 'allCompleted' flag bheja hai
//       if (response?.data) {
//         setJobData(response.data);
//         setCompletedSteps(new Set()); // New part ke liye steps reset
//       } else {
//         navigate("/station-login");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleStepClick = async (stepId: string) => {
//     if (!jobData?.productionId || completedSteps.has(stepId)) return;
//     setCompletedSteps((prev) => new Set(prev).add(stepId));
//     try {
//       await updateStepTime({
//         productionId: String(jobData.productionId),
//         stepId: String(stepId),
//       });
//     } catch (error) {
//       console.error("Failed to update step time:", error);
//     }
//   };

//   // const handleCompleteTraining = async () => {
//   //   if (!jobData?.productionId) return;
//   //   try {
//   //     const response = await completeTraningApi(jobData.productionId);
//   //     if (response?.status === 200) {
//   //       alert("Congratulations! Training Completed.");
//   //       navigate(`/station-login`);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error completing training:", error);
//   //   }
//   // };
//   const handleCompleteTraining = async () => {
//     // 1. Pehle current training khatam karo
//     await completeTraningApi(jobData.productionId);

//     // 2. Ab check karo agla part hai kya (Wahi API call karke)
//     const response = await stationTrainingProcessDetail(
//       processId,
//       stationUserId,
//     );

//     if (response?.allCompleted) {
//       alert("Saari training khatam! Ab aap kaam shuru kar sakte hain.");
//       navigate("/station-login");
//     } else {
//       // Naya data set karo, screen par agla part aa jayega
//       setJobData(response.data);
//       setCompletedSteps(new Set());
//     }
//   };
//   useEffect(() => {
//     fetchJobDetails();
//   }, [processId]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <FaSpinner className="animate-spin text-2xl text-brand" />
//       </div>
//     );
//   if (!jobData)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         No Jobs Found.
//       </div>
//     );

//   const allSteps = jobData.workInstructionSteps || [];
//   const rows = [
//     {
//       part: jobData.partNumber || jobData.part?.partNumber || "N/A",
//       date:
//         jobData.order?.orderDate ||
//         jobData.createdAt ||
//         new Date().toISOString(),
//     },
//   ];

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* --- HEADER SECTION (PURANI UI) --- */}
//       <div className="bg-[#243C75] relative">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={() => navigate("/station-login")}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={20} />
//           </button>
//         </div>

//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full mb-8">
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white px-2">
//                   Training Mode:
//                   <span className="text-md font-medium ml-2">
//                     {jobData.processName || jobData.process?.processName} (
//                     {jobData.process?.machineName || "Station"})
//                   </span>
//                 </p>
//               </div>

//               <img
//                 src={belt}
//                 alt="Belt"
//                 className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
//               />

//               <div className="absolute inset-0 flex items-center justify-center px-2 mt-5">
//                 <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead className="sticky top-0 bg-[#243C75]">
//                       <tr className="font-semibold text-xs sm:text-sm">
//                         <th className="border border-white px-2 py-1">
//                           Part Number (Learning)
//                         </th>
//                         <th className="border border-white px-2 py-1">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, i) => (
//                         <tr key={i} className="bg-blue-600/30">
//                           <td className="border border-white px-2 py-1 text-xs sm:text-sm">
//                             {row.part}
//                           </td>
//                           <td className="border border-white px-2 py-1 text-xs sm:text-sm">
//                             {row.date.includes("T")
//                               ? formatDate(row.date)
//                               : row.date}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-white flex flex-col gap-1">
//             <p className="text-sm font-bold uppercase text-blue-300">
//               Training Progress
//             </p>
//             <p className="text-3xl font-black">
//               {completedSteps.size} / {allSteps.length}
//             </p>
//             <p className="text-sm">Steps Completed</p>
//           </div>
//         </div>
//       </div>

//       {/* --- INSTRUCTIONS SECTION (PURANI UI) --- */}
//       <div className="container mx-auto p-4 md:p-6 flex-grow max-w-6xl">
//         <div className="py-4 flex flex-col gap-4">
//           {allSteps.map((step: any, index: number) => (
//             <div
//               key={step.id || index}
//               onClick={() => handleStepClick(step.id)}
//               className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
//                 ${completedSteps.has(step.id) ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-brand"}
//               `}
//             >
//               <div
//                 className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold
//                 ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
//               >
//                 {index + 1}
//               </div>

//               <div className="flex flex-wrap gap-3 flex-shrink-0">
//                 {step.images?.length > 0 && (
//                   <img
//                     className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border"
//                     src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                     alt={step.title}
//                   />
//                 )}
//                 {step.videos?.length > 0 && (
//                   <div
//                     className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setActiveVideo(
//                         `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
//                       );
//                     }}
//                   >
//                     <video className="w-full h-full object-cover opacity-60">
//                       <source
//                         src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                       />
//                     </video>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                         <FaPlay className="text-white text-xl" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="flex-1">
//                 <div className="flex justify-between items-start">
//                   <h3 className="font-bold text-lg text-gray-800 mb-1">
//                     {step.title}
//                   </h3>
//                   {completedSteps.has(step.id) && (
//                     <span className="text-green-600 font-bold text-sm">
//                       ✓ LEARNED
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-gray-600 leading-relaxed">
//                   {step.instruction}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* --- BOTTOM ACTION --- */}
//         <div className="flex flex-col items-center mt-10 mb-10">
//           <button
//             onClick={handleCompleteTraining}
//             disabled={
//               completedSteps.size < allSteps.length || allSteps.length === 0
//             }
//             className={`px-10 py-3 rounded-md font-bold text-lg transition-all
//               ${
//                 completedSteps.size < allSteps.length
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-brand text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto hover:bg-opacity-90"
//               }
//             `}
//           >
//             Complete Training
//           </button>
//         </div>
//       </div>

//       {/* --- FOOTER BAR (PURANI UI) --- */}
//       <div className="bg-[#243C75] w-full mt-auto">
//         <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//             {/* Footer ke andar Process wala hissa */}
//             <div className="flex flex-col items-center">
//               <p className="text-xs md:text-sm opacity-70">Process</p>
//               {/* Yahan jobData.processName ki jagah jobData.process?.processName likhein */}
//               <p className="text-sm md:text-base font-semibold">
//                 {jobData.process?.processName || "N/A"}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-4 md:gap-10 justify-center">
//             <div className="flex flex-col items-center text-white">
//               <p className="text-xs md:text-sm font-semibold opacity-70">
//                 Completed
//               </p>
//               <p className="text-sm md:text-base">
//                 {jobData.employeeCompletedQty || 0}
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-white">
//               <p className="text-xs md:text-sm font-semibold opacity-70">
//                 Cycle Time
//               </p>
//               <p className="text-sm md:text-base font-mono">
//                 {formatCycleTime(jobData?.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- VIDEO MODAL (PURANI UI) --- */}
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>
//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             <div className="absolute top-0 right-0 p-4 z-20">
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="text-white bg-white/10 p-2 rounded-full"
//               >
//                 <IoClose size={30} />
//               </button>
//             </div>
//             <video
//               src={activeVideo}
//               controls
//               autoPlay
//               className="w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Training = () => {
//   const navigate = useNavigate();
//   const { id: processId } = useParams<{ id: string }>();

//   const [jobData, setJobData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//   // --- Helpers ---
//   const getUserId = () => {
//     const rawData = localStorage.getItem("stationUserId");
//     if (!rawData) return null;
//     try {
//       const parsed = JSON.parse(rawData);
//       return typeof parsed === "object" ? parsed.id : parsed;
//     } catch {
//       return rawData;
//     }
//   };

//   const stationUserId = getUserId();

//   const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return "Not Available";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatCycleTime = (dateString: any) => {
//     if (!dateString) return "0 min";
//     try {
//       const startTime = new Date(dateString);
//       const now = new Date();
//       const diffMs = now.getTime() - startTime.getTime();
//       const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

//       if (totalMinutes >= 1440) {
//         return `${Math.floor(totalMinutes / 1440)} days`;
//       } else if (totalMinutes >= 60) {
//         return `${Math.floor(totalMinutes / 60)} hr ${totalMinutes % 60} min`;
//       }
//       return `${totalMinutes} min`;
//     } catch {
//       return "0 min";
//     }
//   };

//   // --- Logic: Fetch Training Details ---
//   const fetchJobDetails = async () => {
//     if (!processId || !stationUserId) {
//       navigate("/station-login");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await stationTrainingProcessDetail(
//         processId,
//         stationUserId,
//       );

//       // Backend 'allCompleted' bhej raha hai logout ke liye
//       if (response?.allCompleted) {
//         alert("Congratulations! Saari training complete ho gayi hai.");
//         localStorage.removeItem("stationUserId");
//         navigate("/station-login");
//         return;
//       }

//       if (response?.data) {
//         setJobData(response.data);
//         setCompletedSteps(new Set());
//         window.scrollTo(0, 0);
//       } else {
//         // Agar data hi nahi aaya aur error bhi nahi hai
//         navigate("/station-login");
//       }
//     } catch (error: any) {
//       console.error("Fetch error:", error);
//       // 404 handling
//       if (error.response?.status === 404) {
//         alert("No instructions found for this process.");
//       }
//       navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Logic: Individual Step Progress ---
//   const handleStepClick = async (stepId: string) => {
//     if (!jobData?.productionId || completedSteps.has(stepId)) return;

//     setCompletedSteps((prev) => new Set(prev).add(stepId));
//     try {
//       await updateStepTime({
//         productionId: String(jobData.productionId),
//         stepId: String(stepId),
//       });
//     } catch (error) {
//       console.error("Failed to update step time:", error);
//     }
//   };
//   const handleCompleteTraining = async () => {
//     if (!jobData?.productionId) return;

//     try {
//       setLoading(true);

//       // 1. Current Part ki training complete karein
//       const completeRes = await completeTraningApi(jobData.productionId);

//       if (completeRes) {
//         // 2. Agla part fetch karein (Backend ab naya part bhejega kyunki purana finished ho gaya)
//         const response = await stationTrainingProcessDetail(
//           processId,
//           stationUserId,
//         );

//         if (response?.allCompleted) {
//           // Case: Aakhri part bhi khatam ho gaya
//           alert("Saari training khatam! Ab aapko logout kiya ja raha hai.");
//           localStorage.removeItem("stationUserId"); // Clear session
//           navigate("/station-login"); // Redirect to login
//         } else if (response?.data) {
//           // Case: Agla part mil gaya (P2, P3 etc.)
//           setJobData(response.data);
//           setCompletedSteps(new Set()); // Steps reset
//           window.scrollTo(0, 0); // Scroll top
//           alert("Next part training started!");
//         }
//       }
//     } catch (error) {
//       console.error("Error moving to next part:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchJobDetails();
//   }, [processId]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <FaSpinner className="animate-spin text-2xl text-brand" />
//       </div>
//     );

//   if (!jobData)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         No Training Material Found.
//       </div>
//     );

//   const allSteps = jobData.workInstructionSteps || [];
//   const incomingPartsCount = jobData.incomingJobs?.length || 0;

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* --- HEADER SECTION --- */}
//       <div className="bg-[#243C75] relative">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={() => navigate("/station-login")}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={20} />
//           </button>
//         </div>

//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full mb-8">
//                 <p className="text-xl md:text-2xl font-semibold text-white px-2">
//                   Training Mode:
//                   <span className="text-md font-normal ml-2 text-blue-200">
//                     {jobData.processName || "N/A"}
//                   </span>
//                 </p>
//                 {incomingPartsCount > 0 && (
//                   <span className="ml-2 bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded font-black">
//                     {incomingPartsCount} PARTS REMAINING
//                   </span>
//                 )}
//               </div>

//               <img
//                 src={belt}
//                 alt="Belt"
//                 className="w-20 md:w-32 object-contain"
//               />

//               <div className="absolute inset-0 flex items-center justify-center px-2 mt-5">
//                 <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead className="sticky top-0 bg-[#243C75]">
//                       <tr className="font-semibold text-xs sm:text-sm">
//                         <th className="border border-white px-2 py-1">
//                           Current Part
//                         </th>
//                         <th className="border border-white px-2 py-1">
//                           Next In Queue
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="bg-blue-600/30">
//                         <td className="border border-white px-2 py-1 text-sm font-bold text-yellow-300">
//                           {jobData.partNumber || "N/A"}
//                         </td>
//                         <td className="border border-white px-2 py-1 text-xs italic">
//                           {incomingPartsCount > 0
//                             ? jobData.incomingJobs[0].partNumber
//                             : "Last Part"}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-white flex flex-col gap-1 items-center md:items-end">
//             <p className="text-sm font-bold uppercase text-blue-300">
//               Training Progress
//             </p>
//             <p className="text-4xl font-black">
//               {completedSteps.size} / {allSteps.length}
//             </p>
//             <p className="text-xs">Steps Completed</p>
//           </div>
//         </div>
//       </div>

//       {/* --- INSTRUCTIONS SECTION --- */}
//       <div className="container mx-auto p-4 md:p-6 flex-grow max-w-6xl">
//         <div className="py-4 flex flex-col gap-4">
//           {allSteps.length > 0 ? (
//             allSteps.map((step: any, index: number) => (
//               <div
//                 key={step.id || index}
//                 onClick={() => handleStepClick(step.id)}
//                 className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
//                   ${completedSteps.has(step.id) ? "border-green-500 bg-green-50 shadow-md" : "border-gray-100 hover:border-brand"}
//                 `}
//               >
//                 <div
//                   className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold
//                   ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
//                 >
//                   {index + 1}
//                 </div>

//                 <div className="flex flex-wrap gap-3 flex-shrink-0">
//                   {step.images?.length > 0 && (
//                     <img
//                       className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border shadow-sm"
//                       src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                       alt={step.title}
//                     />
//                   )}
//                   {step.videos?.length > 0 && (
//                     <div
//                       className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setActiveVideo(
//                           `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
//                         );
//                       }}
//                     >
//                       <video className="w-full h-full object-cover opacity-60">
//                         <source
//                           src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                         />
//                       </video>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                           <FaPlay className="text-white text-xl" />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-bold text-lg text-gray-800 mb-1">
//                       {step.title}
//                     </h3>
//                     {completedSteps.has(step.id) && (
//                       <span className="text-green-600 font-bold text-xs uppercase tracking-widest">
//                         ✓ Learned
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//                     {step.instruction}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center p-10 bg-white rounded shadow text-gray-400">
//               No instructions provided for this part.
//             </div>
//           )}
//         </div>

//         {/* --- BOTTOM ACTION --- */}
//         <div className="flex flex-col items-center mt-10 mb-10">
//           <button
//             onClick={handleCompleteTraining}
//             disabled={
//               loading ||
//               completedSteps.size < allSteps.length ||
//               allSteps.length === 0
//             }
//             className={`px-12 py-4 rounded-md font-bold text-lg transition-all shadow-lg
//               ${
//                 completedSteps.size < allSteps.length || loading
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1"
//               }
//             `}
//           >
//             {loading
//               ? "Please Wait..."
//               : incomingPartsCount > 0
//                 ? "Next Part Training"
//                 : "Finish All Training"}
//           </button>
//         </div>
//       </div>

//       {/* --- FOOTER BAR --- */}
//       <div className="bg-[#243C75] w-full mt-auto">
//         <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-white flex gap-10 items-center">
//             <div className="flex flex-col">
//               <p className="text-[10px] opacity-60 uppercase">
//                 Current Process
//               </p>
//               <p className="text-sm font-bold uppercase tracking-wide">
//                 {jobData.processName || "N/A"}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-8">
//             <div className="flex flex-col items-center text-white">
//               <p className="text-[10px] font-bold opacity-60 uppercase">
//                 In Training
//               </p>
//               <p className="text-md font-bold text-yellow-400">
//                 {jobData.employeeInfo?.fullName || "Guest"}
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-white border-l border-white/20 pl-8">
//               <p className="text-[10px] font-bold opacity-60 uppercase">
//                 Session Timer
//               </p>
//               <p className="text-md font-mono font-bold tracking-tighter">
//                 {formatCycleTime(jobData?.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- VIDEO MODAL --- */}
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>
//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             <div className="absolute top-0 right-0 p-4 z-20">
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20"
//               >
//                 <IoClose size={30} />
//               </button>
//             </div>
//             <video
//               src={activeVideo}
//               controls
//               autoPlay
//               className="w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Training = () => {
//   const navigate = useNavigate();
//   const { id: processId } = useParams<{ id: string }>();

//   const [jobData, setJobData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);

//   // --- Helpers ---
//   const getUserId = () => {
//     const rawData = localStorage.getItem("stationUserId");
//     if (!rawData) return null;
//     try {
//       const parsed = JSON.parse(rawData);
//       return typeof parsed === "object" ? parsed.id : parsed;
//     } catch {
//       return rawData;
//     }
//   };

//   const stationUserId = getUserId();

//   const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return "Not Available";
//     return new Date(dateString).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatCycleTime = (dateString: any) => {
//     if (!dateString) return "0 min";
//     try {
//       const startTime = new Date(dateString);
//       const now = new Date();
//       const diffMs = now.getTime() - startTime.getTime();
//       const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

//       if (totalMinutes >= 1440) {
//         return `${Math.floor(totalMinutes / 1440)} days`;
//       } else if (totalMinutes >= 60) {
//         return `${Math.floor(totalMinutes / 60)} hr ${totalMinutes % 60} min`;
//       }
//       return `${totalMinutes} min`;
//     } catch {
//       return "0 min";
//     }
//   };

//   // --- Logic: Fetch Training Details ---
//   const fetchJobDetails = async () => {
//     if (!processId || !stationUserId) {
//       navigate("/station-login");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await stationTrainingProcessDetail(
//         processId,
//         stationUserId,
//       );

//       // Backend sends 'allCompleted' when the sequence is finished
//       if (response?.allCompleted) {
//         alert("Congratulations! You have completed all training sessions.");
//         localStorage.removeItem("stationUserId");
//         navigate("/station-login");
//         return;
//       }

//       if (response?.data) {
//         setJobData(response.data);
//         setCompletedSteps(new Set()); // Progress reset for the new part
//         window.scrollTo(0, 0);
//       } else {
//         navigate("/station-login");
//       }
//     } catch (error: any) {
//       console.error("Fetch error:", error);
//       if (error.response?.status === 404) {
//         alert("No instructions found for this process.");
//       }
//       navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Logic: Individual Step Progress ---
//   const handleStepClick = async (stepId: string) => {
//     if (!jobData?.productionId || completedSteps.has(stepId)) return;

//     setCompletedSteps((prev) => new Set(prev).add(stepId));
//     try {
//       await updateStepTime({
//         productionId: String(jobData.productionId),
//         stepId: String(stepId),
//       });
//     } catch (error) {
//       console.error("Failed to update step time:", error);
//     }
//   };

//   // --- Logic: Complete Part & Move to Next ---
//   const handleCompleteTraining = async () => {
//     if (!jobData?.productionId) return;

//     try {
//       setLoading(true);

//       // 1. Mark current part as finished
//       const completeRes = await completeTraningApi(jobData.productionId);

//       if (completeRes) {
//         // 2. Fetch next part details
//         const response = await stationTrainingProcessDetail(
//           processId,
//           stationUserId,
//         );

//         if (response?.allCompleted) {
//           alert("Training cycle finished! Logging out.");
//           localStorage.removeItem("stationUserId");
//           navigate("/station-login");
//         } else if (response?.data) {
//           setJobData(response.data);
//           setCompletedSteps(new Set());
//           window.scrollTo(0, 0);
//           alert("Next part training started!");
//         }
//       }
//     } catch (error) {
//       console.error("Error moving to next part:", error);
//       alert("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails();
//   }, [processId]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <FaSpinner className="animate-spin text-2xl text-brand" />
//       </div>
//     );

//   if (!jobData)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         No Training Material Found.
//       </div>
//     );

//   const allSteps = jobData.workInstructionSteps || [];
//   const incomingPartsCount = jobData.incomingJobs?.length || 0;

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* --- HEADER SECTION --- */}
//       <div className="bg-[#243C75] relative">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={() => navigate("/station-login")}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={20} />
//           </button>
//         </div>

//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full mb-8">
//                 <p className="text-xl md:text-2xl font-semibold text-white px-2">
//                   Training Mode:{" "}
//                   <span className="text-md font-normal ml-2 text-blue-200 uppercase">
//                     {jobData.processName || "N/A"}
//                   </span>
//                 </p>
//                 {incomingPartsCount > 0 && (
//                   <span className="ml-2 bg-yellow-500 text-black text-[10px] px-2 py-0.5 rounded font-black">
//                     {incomingPartsCount} PARTS REMAINING
//                   </span>
//                 )}
//               </div>

//               <img
//                 src={belt}
//                 alt="Belt"
//                 className="w-20 md:w-32 object-contain"
//               />

//               <div className="absolute inset-0 flex items-center justify-center px-2 mt-5">
//                 <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead className="sticky top-0 bg-[#243C75]">
//                       <tr className="font-semibold text-xs sm:text-sm">
//                         <th className="border border-white px-2 py-1">
//                           Part Number (Learning)
//                         </th>
//                         <th className="border border-white px-2 py-1">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr className="bg-blue-600/30">
//                         <td className="border border-white px-2 py-1 text-sm font-bold text-yellow-300">
//                           {jobData.partNumber || "N/A"}
//                         </td>
//                         <td className="border border-white px-2 py-1 text-xs">
//                           {formatDate(new Date().toISOString())}
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="text-white flex flex-col gap-1 items-center md:items-end">
//             <p className="text-sm font-bold uppercase text-blue-300">
//               Training Progress
//             </p>
//             <p className="text-4xl font-black">
//               {completedSteps.size} / {allSteps.length}
//             </p>
//             <p className="text-xs">Steps Completed</p>
//           </div>
//         </div>
//       </div>

//       {/* --- INSTRUCTIONS SECTION --- */}
//       <div className="container mx-auto p-4 md:p-6 flex-grow max-w-6xl">
//         <div className="py-4 flex flex-col gap-4">
//           {allSteps.length > 0 ? (
//             allSteps.map((step: any, index: number) => (
//               <div
//                 key={step.id || index}
//                 onClick={() => handleStepClick(step.id)}
//                 className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
//                   ${completedSteps.has(step.id) ? "border-green-500 bg-green-50 shadow-md" : "border-gray-100 hover:border-brand"}
//                 `}
//               >
//                 <div
//                   className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold
//                   ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
//                 >
//                   {index + 1}
//                 </div>

//                 <div className="flex flex-wrap gap-3 flex-shrink-0">
//                   {step.images?.length > 0 && (
//                     <img
//                       className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border shadow-sm"
//                       src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                       alt={step.title}
//                     />
//                   )}
//                   {step.videos?.length > 0 && (
//                     <div
//                       className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setActiveVideo(
//                           `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
//                         );
//                       }}
//                     >
//                       <video className="w-full h-full object-cover opacity-60">
//                         <source
//                           src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                         />
//                       </video>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                           <FaPlay className="text-white text-xl" />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <div className="flex justify-between items-start">
//                     <h3 className="font-bold text-lg text-gray-800 mb-1 uppercase tracking-tight">
//                       {step.title}
//                     </h3>
//                     {completedSteps.has(step.id) && (
//                       <span className="text-green-600 font-bold text-xs uppercase tracking-widest">
//                         ✓ Learned
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-600 leading-relaxed text-sm md:text-base">
//                     {step.instruction}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center p-10 bg-white rounded shadow text-gray-400">
//               No instructions available for this part.
//             </div>
//           )}
//         </div>

//         {/* --- BOTTOM ACTION --- */}
//         <div className="flex flex-col items-center mt-10 mb-10">
//           <button
//             onClick={handleCompleteTraining}
//             disabled={
//               loading ||
//               completedSteps.size < allSteps.length ||
//               allSteps.length === 0
//             }
//             className={`px-12 py-4 rounded-md font-bold text-lg transition-all shadow-lg
//               ${
//                 completedSteps.size < allSteps.length || loading
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1"
//               }
//             `}
//           >
//             {loading
//               ? "Processing..."
//               : incomingPartsCount > 0
//                 ? "Next Part Training"
//                 : "Finish All Training"}
//           </button>
//         </div>
//       </div>

//       {/* --- FOOTER BAR --- */}
//       <div className="bg-[#243C75] w-full mt-auto">
//         <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-white flex gap-10 items-center">
//             <div className="flex flex-col">
//               <p className="text-[10px] opacity-60 uppercase">
//                 Current Process
//               </p>
//               <p className="text-sm font-bold uppercase tracking-wide">
//                 {jobData.processName || "N/A"}
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-8">
//             <div className="flex flex-col items-center text-white">
//               <p className="text-[10px] font-bold opacity-60 uppercase">
//                 In Training
//               </p>
//               <p className="text-md font-bold text-yellow-400 uppercase">
//                 {jobData.employeeInfo?.fullName || "Employee"}
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-white border-l border-white/20 pl-8">
//               <p className="text-[10px] font-bold opacity-60 uppercase">
//                 Session Timer
//               </p>
//               <p className="text-md font-mono font-bold tracking-tighter">
//                 {formatCycleTime(jobData?.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- VIDEO MODAL --- */}
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>
//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             <div className="absolute top-0 right-0 p-4 z-20">
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="text-white bg-white/10 p-2 rounded-full hover:bg-white/20"
//               >
//                 <IoClose size={30} />
//               </button>
//             </div>
//             <video
//               src={activeVideo}
//               controls
//               autoPlay
//               className="w-full h-full"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

const Training = () => {
  const navigate = useNavigate();
  const { id: processId } = useParams<{ id: string }>();

  const [jobData, setJobData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // --- Helpers ---
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

  const formatCycleTime = (dateString: any) => {
    if (!dateString) return "0 min";
    try {
      const startTime = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

      if (totalMinutes >= 1440) {
        return `${Math.floor(totalMinutes / 1440)} days`;
      } else if (totalMinutes >= 60) {
        return `${Math.floor(totalMinutes / 60)} hr ${totalMinutes % 60} min`;
      }
      return `${totalMinutes} min`;
    } catch {
      return "0 min";
    }
  };

  // --- Logic: Fetch Training Details ---
  const fetchJobDetails = async () => {
    if (!processId || !stationUserId) {
      navigate("/station-login");
      return;
    }
    try {
      setLoading(true);
      const response = await stationTrainingProcessDetail(
        processId,
        stationUserId,
      );

      if (response?.allCompleted) {
        alert("Congratulations! You have completed all training sessions.");
        localStorage.removeItem("stationUserId");
        navigate("/station-login");
        return;
      }

      if (response?.data) {
        setJobData(response.data);
        setCompletedSteps(new Set()); // Reset progress for new part
        window.scrollTo(0, 0);
      } else {
        navigate("/station-login");
      }
    } catch (error: any) {
      console.error("Fetch error:", error);
      alert("Error fetching training details.");
      navigate("/station-login");
    } finally {
      setLoading(false);
    }
  };

  // --- Logic: Individual Step Progress ---
  const handleStepClick = async (stepId: string) => {
    if (!jobData?.productionId || completedSteps.has(stepId)) return;

    setCompletedSteps((prev) => new Set(prev).add(stepId));
    try {
      await updateStepTime({
        productionId: String(jobData.productionId),
        stepId: String(stepId),
      });
    } catch (error) {
      console.error("Failed to update step time:", error);
    }
  };

  // --- Logic: Complete Part & Move to Next ---
  const handleCompleteTraining = async () => {
    if (!jobData?.productionId) return;

    try {
      setLoading(true);
      const completeRes = await completeTraningApi(jobData.productionId);

      if (completeRes) {
        const response = await stationTrainingProcessDetail(
          processId,
          stationUserId,
        );

        if (response?.allCompleted) {
          localStorage.removeItem("stationUserId");
          navigate("/station-login");
        } else if (response?.data) {
          setJobData(response.data);
          setCompletedSteps(new Set());
        }
      }
    } catch (error) {
      console.error("Error moving to next part:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [processId]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-brand" />
      </div>
    );

  if (!jobData)
    return (
      <div className="min-h-screen flex justify-center items-center">
        No Jobs Found.
      </div>
    );

  const allSteps = jobData.workInstructionSteps || [];
  const incomingPart = jobData.incomingJobs?.[0]?.partNumber || "Last Part";

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="bg-[#243C75] relative">
        <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2 px-6">
          <button
            onClick={() => navigate("/station-login")}
            className="text-xs md:text-sm font-semibold flex items-center gap-1 hover:text-blue-300 transition-colors"
          >
            Log out <IoLogOutOutline size={20} />
          </button>
        </div>

        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col">
            <div className="relative w-full max-w-xl mx-auto md:mx-0">
              <div className="w-full mb-8">
                <p className="text-xl md:text-2xl font-bold text-white px-2">
                  Training Mode:
                  <span className="text-md font-medium ml-2 text-blue-200">
                    {jobData.processName} (
                    {jobData.process?.machineName || "Station"})
                  </span>
                </p>
              </div>

              <img
                src={belt}
                alt="Belt"
                className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center px-2 mt-8">
                {/* --- CURRENT PART TABLE --- */}
                <div className="bg-opacity-50 rounded-md w-full max-w-md">
                  <table className="border border-white text-white text-center w-full">
                    <thead className="bg-[#243C75]">
                      <tr className="font-semibold text-xs sm:text-sm">
                        <th className="border border-white px-2 py-1">
                          Part Number (Learning)
                        </th>
                        <th className="border border-white px-2 py-1">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-600/30">
                        <td className="border border-white px-2 py-1 text-xs sm:text-sm font-bold">
                          {jobData.partNumber || "N/A"}
                        </td>
                        <td className="border border-white px-2 py-1 text-xs sm:text-sm">
                          {formatDate(new Date().toISOString())}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white px-2 py-1 text-xs sm:text-sm font-bold">
                          {incomingPart}
                        </td>
                        <td className="text-xs font-mono font-bold  px-2 py-0.5 rounded">
                          Not Available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* --- UPCOMING PART DISPLAY (Requested) --- */}
              </div>
            </div>
          </div>

          <div className="text-white flex flex-col gap-1 items-center md:items-end">
            <p className="text-sm font-bold uppercase text-blue-300">
              Training Progress
            </p>
            <p className="text-5xl font-black">
              {completedSteps.size} / {allSteps.length}
            </p>
            <p className="text-sm opacity-80 uppercase tracking-tighter">
              Steps Completed
            </p>
          </div>
        </div>
      </div>

      {/* --- INSTRUCTIONS SECTION --- */}
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
              <div
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold 
                ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {index + 1}
              </div>

              <div className="flex flex-wrap gap-3 flex-shrink-0">
                {step.images?.length > 0 && (
                  <img
                    className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border shadow-sm"
                    src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
                    alt={step.title}
                  />
                )}
                {step.videos?.length > 0 && (
                  <div
                    className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideo(
                        `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
                      );
                    }}
                  >
                    <video className="w-full h-full object-cover opacity-60">
                      <source
                        src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
                      />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
                        <FaPlay className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800 mb-1 uppercase">
                    {step.title}
                  </h3>
                  {completedSteps.has(step.id) && (
                    <span className="text-green-600 font-bold text-xs uppercase tracking-widest">
                      ✓ LEARNED
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {step.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM ACTION --- */}
        <div className="flex flex-col items-center mt-10 mb-10">
          <button
            onClick={handleCompleteTraining}
            disabled={
              loading ||
              completedSteps.size < allSteps.length ||
              allSteps.length === 0
            }
            className={`px-16 py-4 rounded-md font-bold text-lg transition-all shadow-lg
              ${
                completedSteps.size < allSteps.length || loading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#243C75] text-white hover:bg-opacity-90 active:scale-95"
              }
            `}
          >
            {loading ? "Processing..." : "Complete Training"}
          </button>
        </div>
      </div>

      {/* --- FOOTER BAR --- */}
      <div className="bg-[#243C75] w-full mt-auto">
        <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white flex gap-10 items-center">
            <div className="flex flex-col items-start">
              <p className="text-[10px] md:text-xs opacity-70 uppercase font-bold tracking-wider">
                Current Process
              </p>
              <p className="text-sm md:text-base font-semibold">
                {jobData.processName || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex gap-10 items-center">
            <div className="flex flex-col items-center text-white">
              <p className="text-[10px] md:text-xs font-bold opacity-70 uppercase">
                Employee
              </p>
              <p className="text-sm md:text-base font-bold">
                {jobData?.employeeName}
              </p>
            </div>
            <div className="flex flex-col items-center text-white border-l border-white/20 pl-10">
              <p className="text-[10px] md:text-xs font-bold opacity-70 uppercase tracking-widest">
                Session Timer
              </p>
              <p className="text-sm md:text-base font-mono bg-black/20 px-3 py-1 rounded">
                {formatCycleTime(jobData?.cycleTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- VIDEO MODAL --- */}
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
          <div
            className="absolute inset-0"
            onClick={() => setActiveVideo(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10 border border-white/10">
            <div className="absolute top-0 right-0 p-4 z-20">
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <IoClose size={30} />
              </button>
            </div>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full h-full"
            />
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
