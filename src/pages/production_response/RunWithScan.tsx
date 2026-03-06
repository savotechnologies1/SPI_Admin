// import belt from "../../assets/belt-solid.png";
// import { IoClose, IoLogOutOutline } from "react-icons/io5";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import {
//   completeOrder,
//   scrapOrder,
//   stationLogin,
//   stationLogoutApi,
//   stationProcessDetail,
// } from "./https/productionResponseApi";
// import { useEffect, useState, useCallback } from "react";
// import Barcode from "react-barcode";
// import CommentBox from "./CommentBox";
// import { FaPlay } from "react-icons/fa";
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
//   steps: Step[];
// }
// interface Part {
//   partDescription: string;
//   WorkInstruction: WorkInstruction[];
// }
// interface Order {
//   orderNumber: string;
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
//   order_id: string;
//   part_id: string;
//   order_date: string;
//   delivery_date: string;
//   upcommingOrder: string;
//   part: Part;
//   order: Order;
//   employeeInfo: EmployeeInfo;
//   process: Process;
//   quantity: number;
//   completedQuantity: number;
//   cycleTime: string;
// }
// const formatDate = (dateString: string | undefined): string => {
//   if (!dateString) return "Not Available";
//   return new Date(dateString).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };
// const formatCycleTime = (dateString) => {
//   if (!dateString) return "N/A";

//   try {
//     const startTime = new Date(dateString);
//     if (isNaN(startTime.getTime())) {
//       return "Invalid Time";
//     }

//     const now = new Date();
//     const diffMs = now - startTime;
//     const diffMinutes = Math.floor(diffMs / (1000 * 60));

//     return `${diffMinutes} min`;
//   } catch (error) {
//     console.error("Could not format cycle time:", dateString, error);
//     return "N/A";
//   }
// };
// const RunWithScan = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const fetchJobDetails = useCallback(
//     async (jobId: string | undefined) => {
//       if (!jobId) {
//         setLoading(false);
//         navigate("/station-login");
//         return;
//       }
//       try {
//         setLoading(true);
//         const stationUserId = localStorage.getItem("stationUserId");
//         const response = await stationProcessDetail(jobId, stationUserId);
//         const data = response?.data;
//         if (data) setJobData(data);
//       } catch (error: any) {
//         if (error?.status === 404) navigate("/station-login");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [navigate],
//   );
//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id, fetchJobDetails]);
//   const [isCompleting, setIsCompleting] = useState(false);

//   const handleCompleteOrder = async () => {
//     if (!jobData || isCompleting) return;
//     setIsCompleting(true);
//     try {
//       if (jobData.type === "product") {
//         const stationLoginData = {
//           processId: jobData.processId,
//           stationUserId: jobData.employeeInfo.id,
//           type: "run_schedule",
//         };

//         const loginRes = await stationLogin(stationLoginData);
//         if (loginRes?.status !== 200) {
//           console.error("Station login failed");
//           setIsCompleting(false);
//           return;
//         }
//         console.log("Station login successful!");
//       }

//       let productId = null;
//       if (jobData.type === "product") {
//         productId = jobData.productId || jobData.order.productId;
//       }

//       await completeOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.order_type,
//         jobData.part_id,
//         jobData.employeeInfo.id,
//         jobData.productId || jobData.order.productId,
//         jobData.type,
//       );
//       fetchJobDetails(id);
//     } catch (error: any) {
//       const status = error?.response?.status;
//       if (status === 400) {
//         console.warn("Order might be already completed. Refetching...");
//         fetchJobDetails(id);
//       } else {
//         console.error("Error completing order:", error);
//       }
//     } finally {
//       setIsCompleting(false);
//     }
//   };

//   const handleScrapOrder = useCallback(async () => {
//     if (!jobData) return;
//     console.log("ACTION: Scrapping part...");
//     try {
//       await scrapOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.order_type,
//         jobData.part_id,
//         jobData.employeeInfo.id,
//       );
//       fetchJobDetails(id);
//     } catch (error: any) {
//       console.error("Error scrapping part:", error);
//     }
//   }, [jobData, id, fetchJobDetails]);
//   let COMPLETE_BARCODE = `${jobData?.order.orderNumber}`;
//   let SCRAP_BARCODE = `${jobData?.part.partNumber}`;

//   useEffect(() => {
//     let scanned = "";

//     const handleKeyDown = (event: KeyboardEvent) => {
//       const target = event.target as HTMLElement;
//       if (["input", "textarea"].includes(target.tagName.toLowerCase())) return;

//       if (event.key === "Enter") {
//         // Enter key ka matlab scan complete
//         if (scanned === COMPLETE_BARCODE) handleCompleteOrder();
//         else if (scanned === SCRAP_BARCODE) handleScrapOrder();
//         else console.log("❌ Barcode not matched:", scanned);

//         scanned = "";
//       } else if (event.key.length === 1) {
//         scanned += event.key;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [COMPLETE_BARCODE, SCRAP_BARCODE, handleCompleteOrder, handleScrapOrder]);

//   const stationLogout = useCallback(async () => {
//     if (!jobData) return;
//     try {
//       const response = await stationLogoutApi(jobData.productionId);
//       if (response && response.status === 200) navigate("/station-login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   }, [jobData, navigate]);
//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );

//   if (!jobData) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4">
//         <p>No job data available.</p>

//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand"
//         >
//           Go Back to station login
//         </button>
//       </div>
//     );
//   }

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

//   const rows = [
//     {
//       status: "Current",
//       part: jobData.partNumber || "N/A",
//       date: jobData.order_date || "",
//     },
//   ];

//   if (jobData.incomingJobs && jobData.incomingJobs.length > 0) {
//     const nextJob = jobData.incomingJobs[0];
//     rows.push({
//       status: "Upcoming",
//       part: nextJob.partNumber || "N/A",
//       date: nextJob.scheudleDate || "No Date",
//     });
//   }
//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       <div className="bg-[#243C75] relative ">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={stationLogout}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out
//             <IoLogOutOutline size={16} className="md:size-[20px]" />
//           </button>
//         </div>
//         <div className="container  p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col ">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full  mb-8 sm:mb-8 md:mb-8">
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold break-words leading-snug text-white px-2">
//                   Process Name :
//                   <span className="text-md font-medium">
//                     {part?.process?.processName || jobData.process.processName}{" "}
//                     ({" "}
//                     {part?.process?.machineName || jobData.process.machineName})
//                   </span>
//                 </p>
//               </div>

//               <img
//                 src={belt}
//                 alt="Belt icon"
//                 className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
//               />

//               <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-3 md:px-4 mt-5">
//                 <div className=" bg-opacity-50 rounded-md overflow-x-auto w-full">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead>
//                       <tr className="font-semibold">
//                         <th className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                           Part
//                         </th>
//                         <th className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                           Schedule date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, i) => (
//                         <tr key={i}>
//                           <td className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                             {row.part}
//                           </td>
//                           <td className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
//                             {formatDate(row.date)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
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
//                 Qty: {jobData.employeeCompletedQty}
//               </p>
//               <p className=" text-sm md:text-base">
//                 Scrap Qty: {jobData.employeeScrapQty}
//               </p>
//               <p className=" text-sm md:text-base">
//                 Order Type: {jobData.order_type}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto p-4 md:p-6 flex-grow">
//         <CommentBox employeeInfo={employeeInfo} />

//         <div className="py-4 flex flex-col gap-4">
//           {/* Yahan change kiya: part.WorkInstruction ki jagah jobData.workInstructionSteps */}
//           {jobData.workInstructionSteps &&
//           jobData.workInstructionSteps.length > 0 ? (
//             jobData.workInstructionSteps.map((step, index) => (
//               <div
//                 key={step.id || index}
//                 className="flex flex-col md:flex-row gap-4 md:gap-10 items-start bg-white rounded-lg shadow-sm p-4 border border-gray-100"
//               >
//                 {/* MEDIA SECTION */}
//                 <div className="flex flex-wrap gap-3 flex-shrink-0">
//                   {/* IMAGE: step.images directly access karein */}
//                   {step.images && step.images.length > 0 && (
//                     <img
//                       className="rounded-md w-40 h-40 object-cover border"
//                       src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                       alt={step.title}
//                     />
//                   )}

//                   {/* VIDEO: step.videos directly access karein */}
//                   {/* Video Section */}
//                   {step.videos?.length > 0 && (
//                     <div
//                       className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
//                       onClick={() =>
//                         setActiveVideo(
//                           `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
//                         )
//                       }
//                     >
//                       {/* Video Thumbnail (Preview) */}
//                       <video className="w-full h-full object-cover opacity-60">
//                         <source
//                           src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                         />
//                       </video>

//                       {/* Play Icon Layer */}
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                           <FaPlay className="text-white text-2xl" />
//                         </div>
//                       </div>
//                       <span className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
//                         Click to Play
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="flex-1">
//                   <p className="font-semibold text-lg text-gray-800 break-words mb-1">
//                     {step.title}
//                   </p>
//                   <p className="text-gray-600 break-words leading-relaxed">
//                     {step.instruction}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-500 p-4">
//               No instructions available for this part.
//             </div>
//           )}
//         </div>

//         <div className="mt-10 p-4 border-2 border-dashed border-gray-400 rounded-lg text-center bg-gray-50">
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
//             <div className="flex flex-col items-center">
//               <Barcode
//                 value={COMPLETE_BARCODE}
//                 width={2}
//                 height={50}
//                 fontSize={14}
//               />
//               <p className="mt-2 text-sm font-medium">Scan to Complete Order</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <Barcode
//                 value={SCRAP_BARCODE}
//                 width={2}
//                 height={50}
//                 fontSize={14}
//                 lineColor="red"
//               />
//               <p className="mt-2 text-sm font-medium text-red-600">
//                 Scan to Scrap Part
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#243C75]  bottom-0 w-full">
//         <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//             <div className="flex flex-col items-center">
//               <p className="text-sm md:text-base">Process</p>
//               <p className="text-sm md:text-base">{process?.processName}</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-green-500 text-sm md:text-base">Total Qty</p>
//               <p className="text-green-500 text-sm md:text-base">
//                 {jobData.scheduleQuantity}
//               </p>
//             </div>
//             <div className="flex flex-col items-center">
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
//             </div>
//           </div>
//           <div className="flex gap-2 md:gap-6  justify-center">
//             <div className="flex flex-col items-center text-white">
//               <p className="text-sm md:text-base font-semibold"> Employee</p>
//               <p className="text-sm md:text-base">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
//             </div>
//             <div className="flex flex-col items-center text-white">
//               <p className="text-sm md:text-base font-semibold"> Qty</p>
//               <p className="text-sm md:text-base">
//                 {jobData.employeeCompletedQty}
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-white">
//               <p className="text-sm md:text-base font-semibold">Cycle Time</p>
//               <p className="text-sm md:text-base">
//                 {formatCycleTime(jobData?.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
//           {/* Close Button: Pure screen par kahin bhi click karne se band ho jaye uske liye overlay wrapper */}
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>

//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             {/* Top Bar with Title and Close Button */}
//             <div className="absolute top-0 left-0 right-0 p-4 flex justify-end items-center bg-gradient-to-b from-black/70 to-transparent z-20">
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
//               >
//                 <IoClose size={30} />
//               </button>
//             </div>

//             {/* Actual Video Player */}
//             <div className="aspect-video w-full flex items-center justify-center">
//               <video
//                 src={activeVideo}
//                 controls
//                 autoPlay
//                 className="w-full h-full"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RunWithScan;

// import belt from "../../assets/belt-solid.png";
// import { IoClose, IoLogOutOutline } from "react-icons/io5";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import {
//   completeOrder,
//   scrapOrder,
//   stationLogin,
//   stationLogoutApi,
//   stationProcessDetail,
// } from "./https/productionResponseApi";
// import { useEffect, useState, useCallback } from "react";
// import Barcode from "react-barcode";
// import CommentBox from "./CommentBox";
// import { FaPlay } from "react-icons/fa";

// const BASE_URL = import.meta.env.VITE_SERVER_URL;

// interface Image {
//   imagePath: string;
// }
// interface Step {
//   id: string;
//   title: string;
//   instruction: string;
//   images: Image[];
//   videos?: { videoPath: string }[];
// }
// interface WorkInstruction {
//   steps: Step[];
// }
// interface Part {
//   partDescription: string;
//   partNumber: string;
//   WorkInstruction: WorkInstruction[];
//   process: {
//     processName: string;
//     machineName: string;
//   };
// }
// interface Order {
//   orderNumber: string;
//   productId?: string;
// }
// interface EmployeeInfo {
//   id: string;
//   firstName: string;
//   lastName: string;
// }
// interface Process {
//   processName: string;
//   machineName: string;
// }
// interface JobData {
//   productionId: string;
//   order_id: string;
//   part_id: string;
//   order_date: string;
//   delivery_date: string;
//   part: Part;
//   order: Order;
//   employeeInfo: EmployeeInfo;
//   process: Process;
//   quantity: number;
//   completedQuantity: number;
//   cycleTime: string;
//   type: string;
//   productId?: string;
//   order_type: string;
//   partNumber: string;
//   incomingJobs: any[];
//   workInstructionSteps: Step[];
//   employeeCompletedQty: number;
//   employeeScrapQty: number;
//   scheduleQuantity: number;
//   remainingQty: number;
//   scrapQuantity: number;
//   processId: string;
// }

// const formatDate = (dateString: string | undefined): string => {
//   if (!dateString) return "Not Available";
//   return new Date(dateString).toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatCycleTime = (dateString: string | undefined) => {
//   if (!dateString) return "N/A";
//   try {
//     const startTime = new Date(dateString);
//     if (isNaN(startTime.getTime())) return "Invalid Time";
//     const now = new Date();
//     const diffMs = now.getTime() - startTime.getTime();
//     const diffMinutes = Math.floor(diffMs / (1000 * 60));
//     return `${diffMinutes} min`;
//   } catch (error) {
//     return "N/A";
//   }
// };

// const RunWithScan = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);
//   const [isCompleting, setIsCompleting] = useState(false);

//   // --- CLIENT REQUIREMENT: Static Barcode Values ---
//   const COMPLETE_BARCODE = "COMPLETE";
//   const SCRAP_BARCODE = "SCRAP";

//   const fetchJobDetails = useCallback(
//     async (jobId: string | undefined) => {
//       if (!jobId) {
//         setLoading(false);
//         navigate("/station-login");
//         return;
//       }
//       try {
//         setLoading(true);
//         const stationUserId = localStorage.getItem("stationUserId");
//         const response = await stationProcessDetail(jobId, stationUserId);
//         const data = response?.data;
//         if (data) setJobData(data);
//       } catch (error: any) {
//         if (error?.status === 404) navigate("/station-login");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [navigate],
//   );

//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id, fetchJobDetails]);

//   const handleCompleteOrder = useCallback(async () => {
//     if (!jobData || isCompleting) return;
//     setIsCompleting(true);
//     try {
//       if (jobData.type === "product") {
//         const stationLoginData = {
//           processId: jobData.processId,
//           stationUserId: jobData.employeeInfo.id,
//           type: "run_schedule",
//         };
//         await stationLogin(stationLoginData);
//       }

//       await completeOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.order_type,
//         jobData.part_id,
//         jobData.employeeInfo.id,
//         jobData.productId || jobData.order.productId,
//         jobData.type,
//       );
//       fetchJobDetails(id);
//     } catch (error: any) {
//       fetchJobDetails(id);
//     } finally {
//       setIsCompleting(false);
//     }
//   }, [jobData, isCompleting, id, fetchJobDetails]);

//   const handleScrapOrder = useCallback(async () => {
//     if (!jobData) return;
//     try {
//       await scrapOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.order_type,
//         jobData.part_id,
//         jobData.employeeInfo.id,
//       );
//       fetchJobDetails(id);
//     } catch (error: any) {
//       console.error("Error scrapping part:", error);
//     }
//   }, [jobData, id, fetchJobDetails]);

//   // Scanner Logic for "COMPLETE" and "SCRAP"
//   useEffect(() => {
//     let scanned = "";
//     const handleKeyDown = (event: KeyboardEvent) => {
//       const target = event.target as HTMLElement;
//       if (["input", "textarea"].includes(target.tagName.toLowerCase())) return;

//       if (event.key === "Enter") {
//         if (scanned === COMPLETE_BARCODE) handleCompleteOrder();
//         else if (scanned === SCRAP_BARCODE) handleScrapOrder();
//         scanned = "";
//       } else if (event.key.length === 1) {
//         scanned += event.key;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleCompleteOrder, handleScrapOrder]);

//   const stationLogout = useCallback(async () => {
//     if (!jobData) return;
//     try {
//       const response = await stationLogoutApi(jobData.productionId);
//       if (response && response.status === 200) navigate("/station-login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   }, [jobData, navigate]);

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center font-bold">
//         Loading...
//       </div>
//     );

//   if (!jobData) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-600">
//         <p>No job data available.</p>
//         <button
//           onClick={() => navigate(-1)}
//           className="px-4 py-2 bg-[#243C75] text-white rounded-md"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const rows = [
//     {
//       status: "Current",
//       part: jobData.partNumber || "N/A",
//       date: jobData.order_date || "",
//     },
//   ];
//   if (jobData.incomingJobs && jobData.incomingJobs.length > 0) {
//     const nextJob = jobData.incomingJobs[0];
//     rows.push({
//       status: "Upcoming",
//       part: nextJob.partNumber || "N/A",
//       date: nextJob.scheudleDate || "No Date",
//     });
//   }

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* Header Section */}
//       <div className="bg-[#243C75] relative ">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={stationLogout}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={16} className="md:size-[20px]" />
//           </button>
//         </div>
//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col ">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full mb-8">
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white px-2">
//                   Process Name :
//                   <span className="text-md font-medium ml-2 uppercase">
//                     {jobData.process.processName} ({jobData.process.machineName}
//                     )
//                   </span>
//                 </p>
//               </div>
//               <img
//                 src={belt}
//                 alt="Belt icon"
//                 className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
//               />
//               <div className="absolute inset-0 flex items-center justify-center px-2 mt-5">
//                 <div className="bg-opacity-50 overflow-x-auto w-full">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead>
//                       <tr className="font-semibold">
//                         <th className="border border-white px-2 py-1">Part</th>
//                         <th className="border border-white px-2 py-1">
//                           Schedule date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, i) => (
//                         <tr key={i}>
//                           <td className="border border-white px-2 py-1">
//                             {row.part}
//                           </td>
//                           <td className="border border-white px-2 py-1">
//                             {formatDate(row.date)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
//             <p className="md:text-2xl font-bold uppercase">{`${jobData.employeeInfo?.firstName} ${jobData.employeeInfo?.lastName}`}</p>
//             <div className="flex flex-col gap-1">
//               <p className="text-sm">
//                 Date: {formatDate(jobData.delivery_date)}
//               </p>
//               <p className="text-sm">Qty: {jobData.employeeCompletedQty}</p>
//               <p className="text-sm font-semibold text-red-400">
//                 Scrap Qty: {jobData.employeeScrapQty}
//               </p>
//               <p className="text-sm">Type: {jobData.order_type}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto p-4 md:p-6 flex-grow">
//         <CommentBox employeeInfo={jobData.employeeInfo} />

//         {/* Instructions */}
//         <div className="py-4 flex flex-col gap-4">
//           {jobData.workInstructionSteps?.length > 0 ? (
//             jobData.workInstructionSteps.map((step, index) => (
//               <div
//                 key={step.id || index}
//                 className="flex flex-col md:flex-row gap-4 md:gap-10 items-start bg-white rounded-lg shadow-sm p-4 border border-gray-100"
//               >
//                 <div className="flex flex-wrap gap-3 flex-shrink-0">
//                   {step.images?.length > 0 && (
//                     <img
//                       className="rounded-md w-40 h-40 object-cover border"
//                       src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                       alt={step.title}
//                     />
//                   )}
//                   {step.videos && step.videos.length > 0 && (
//                     <div
//                       className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
//                       onClick={() =>
//                         setActiveVideo(
//                           `${BASE_URL}/uploads/workInstructionVideo/${step.videos![0].videoPath}`,
//                         )
//                       }
//                     >
//                       <video className="w-full h-full object-cover opacity-60">
//                         <source
//                           src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                         />
//                       </video>
//                       <div className="absolute inset-0 flex items-center justify-center">
//                         <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                           <FaPlay className="text-white text-2xl" />
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-semibold text-lg text-gray-800 mb-1 uppercase tracking-wide">
//                     {step.title}
//                   </p>
//                   <p className="text-gray-600 leading-relaxed">
//                     {step.instruction}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-500 p-4">
//               No instructions available.
//             </div>
//           )}
//         </div>

//         {/* --- STATIC BARCODE SECTION --- */}
//         <div className="mt-10 p-6 border-2 border-dashed border-blue-200 rounded-xl text-center bg-blue-50/30">
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
//             <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-blue-100">
//               <Barcode
//                 value={COMPLETE_BARCODE}
//                 width={2.5}
//                 height={60}
//                 fontSize={16}
//               />
//               <p className="mt-3 text-sm font-bold text-blue-700 uppercase tracking-widest">
//                 Scan to Complete
//               </p>
//             </div>
//             <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md border border-red-100">
//               <Barcode
//                 value={SCRAP_BARCODE}
//                 width={2.5}
//                 height={60}
//                 fontSize={16}
//                 lineColor="red"
//               />
//               <p className="mt-3 text-sm font-bold text-red-600 uppercase tracking-widest">
//                 Scan to Scrap
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Summary */}
//       <div className="bg-[#243C75] bottom-0 w-full mt-auto">
//         <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//           <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//             <div className="text-center">
//               <p className="text-xs opacity-70">Process</p>
//               <p className="font-semibold">{jobData.process.processName}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-green-400 text-xs opacity-70">Total Qty</p>
//               <p className="font-semibold text-green-400">
//                 {jobData.scheduleQuantity}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-green-400 text-xs opacity-70">Remaining</p>
//               <p className="font-semibold text-green-400">
//                 {jobData.remainingQty}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-red-400 text-xs opacity-70">Scrap</p>
//               <p className="font-semibold text-red-400">
//                 {jobData.scrapQuantity}
//               </p>
//             </div>
//           </div>
//           <div className="flex gap-6 justify-center text-white">
//             <div className="text-center">
//               <p className="text-xs opacity-70">Employee</p>
//               <p className="text-sm">{`${jobData.employeeInfo?.firstName} ${jobData.employeeInfo?.lastName}`}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs opacity-70">Completed</p>
//               <p className="text-sm font-bold">
//                 {jobData.employeeCompletedQty}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-xs opacity-70">Cycle Time</p>
//               <p className="text-sm">{formatCycleTime(jobData.cycleTime)}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Modal */}
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4">
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>
//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden z-10 shadow-2xl">
//             <button
//               onClick={() => setActiveVideo(null)}
//               className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full z-20"
//             >
//               <IoClose size={30} />
//             </button>
//             <video
//               src={activeVideo}
//               controls
//               autoPlay
//               className="w-full aspect-video"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RunWithScan;
// import belt from "../../assets/belt-solid.png";
// import { IoClose, IoLogOutOutline } from "react-icons/io5";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   stationLogin,
//   stationLogoutApi,
//   stationProcessDetail,
// } from "./https/productionResponseApi";
// import { useEffect, useState, useCallback, useRef } from "react";
// import Barcode from "react-barcode";
// import CommentBox from "./CommentBox";
// import { FaPlay } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from "../../utils/axiosInstance";

// const BASE_URL = import.meta.env.VITE_SERVER_URL;

// const RunWithScan = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeVideo, setActiveVideo] = useState<string | null>(null);
//   const [isCompleting, setIsCompleting] = useState(false);

//   const COMPLETE_BARCODE = "complete";
//   const SCRAP_BARCODE = "scrap";

//   const fetchJobDetails = useCallback(
//     async (jobId: string | undefined) => {
//       if (!jobId) {
//         setLoading(false);
//         navigate("/station-login");
//         return;
//       }
//       try {
//         setLoading(true);
//         const stationUserId = localStorage.getItem("stationUserId");
//         const response = await stationProcessDetail(jobId, stationUserId);
//         if (response?.data) setJobData(response.data);
//       } catch (error: any) {
//         if (error?.status === 404) navigate("/station-login");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [navigate],
//   );

//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id, fetchJobDetails]);

//   const handleScanComplete = useCallback(async () => {
//     if (!jobData || isCompleting) return;
//     setIsCompleting(true);
//     try {
//       await axiosInstance.post(`${BASE_URL}/api/admin/scan-complete/${id}`, {
//         orderId: jobData.order_id,
//         partId: jobData.part_id,
//         employeeId: jobData.employeeInfo.id,
//         order_type: jobData.order_type,
//       });
//       fetchJobDetails(id);
//     } catch (error) {
//       console.error("Complete Scan Failed:", error);
//       fetchJobDetails(id);
//     } finally {
//       setIsCompleting(false);
//     }
//   }, [jobData, id, isCompleting, fetchJobDetails]);

//   const handleScanScrap = useCallback(async () => {
//     if (!jobData) return;
//     try {
//       await axiosInstance.post(`${BASE_URL}/api/admin/scan-scrap/${id}`, {
//         orderId: jobData.order_id,
//         partId: jobData.part_id,
//         employeeId: jobData.employeeInfo.id,
//         order_type: jobData.order_type,
//       });
//       fetchJobDetails(id);
//     } catch (error) {
//       console.error("Scrap Scan Failed:", error);
//     }
//   }, [jobData, id, fetchJobDetails]);
//   const scanRef = useRef("");

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       const target = event.target as HTMLElement;

//       if (["input", "textarea"].includes(target.tagName.toLowerCase())) return;

//       if (event.key === "Enter") {
//         const scannedValue = scanRef.current.trim().toLowerCase();

//         console.log("Scanned:", scannedValue);

//         if (scannedValue === COMPLETE_BARCODE) {
//           handleScanComplete();
//         } else if (scannedValue === SCRAP_BARCODE) {
//           handleScanScrap();
//         }

//         scanRef.current = "";
//       } else if (event.key.length === 1) {
//         scanRef.current += event.key;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [handleScanComplete, handleScanScrap]);

//   const stationLogout = async () => {
//     if (!jobData) return;

//     try {
//       // ID ke saath-saath body mein data bhi bhejein
//       const logoutData = {
//         completedQuantity: jobData?.employeeCompletedQty,
//         scrapQuantity: jobData?.employeeScrapQty,
//       };

//       // Apni API function mein dusra argument (body) pass karein
//       const response = await stationLogoutApi(jobData.productionId, logoutData);

//       if (response && response.status === 200) {
//         localStorage.removeItem("stationUserId");
//         navigate("/station-login");
//       }
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   const formatDate = (d: any) =>
//     !d
//       ? "N/A"
//       : new Date(d).toLocaleDateString("en-US", {
//           month: "long",
//           day: "numeric",
//           year: "numeric",
//         });

//   const formatCycleTime = (dateString) => {
//     if (!dateString) return "N/A";

//     try {
//       const startTime = new Date(dateString);
//       if (isNaN(startTime.getTime())) {
//         return "Invalid Time";
//       }
//       const now = new Date();
//       const diffMs = now - startTime;
//       const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));
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

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   if (!jobData)
//     return <div className="text-center mt-20">No job data available.</div>;

//   const rows = [
//     {
//       status: "Current",
//       part: jobData.partNumber || "N/A",
//       date: jobData.order_date || "",
//     },
//   ];
//   if (jobData.incomingJobs?.length > 0) {
//     rows.push({
//       status: "Upcoming",
//       part: jobData.incomingJobs[0].partNumber || "N/A",
//       date: jobData.incomingJobs[0].scheudleDate || "",
//     });
//   }

//   return (
//     <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//       {/* Blue Header Section */}
//       <div className="bg-[#243C75] relative ">
//         <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//           <button
//             onClick={stationLogout}
//             className="text-xs md:text-sm font-semibold flex items-center gap-1"
//           >
//             Log out <IoLogOutOutline size={16} className="md:size-[20px]" />
//           </button>
//         </div>
//         <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col ">
//             <div className="relative w-full max-w-xl mx-auto">
//               <div className="w-full mb-8">
//                 <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white px-2">
//                   Process Name :
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
//                 <div className="bg-opacity-50 rounded-md overflow-x-auto w-full text-white">
//                   <table className="border border-white text-center w-full min-w-[280px]">
//                     <thead>
//                       <tr className="font-semibold  text-xs">
//                         <th className="border border-white px-2 py-1">Part</th>
//                         <th className="border border-white px-2 py-1">Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, i) => (
//                         <tr key={i}>
//                           <td className="border border-white px-2 py-1 text-xs md:text-sm">
//                             {row.part}
//                           </td>
//                           <td className="border border-white px-2 py-1 text-xs md:text-sm">
//                             {formatDate(row.date)}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
//             <p className="md:text-2xl">{`${jobData.employeeInfo?.firstName} ${jobData.employeeInfo?.lastName}`}</p>
//             <div className="flex flex-col gap-1 text-sm">
//               <p>Date: {formatDate(jobData.delivery_date)}</p>
//               <p>Qty: {jobData.employeeCompletedQty}</p>
//               <p>Scrap Qty: {jobData.employeeScrapQty}</p>
//               <p>Order Type: {jobData.order_type}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto p-4 md:p-6 flex-grow">
//         <CommentBox employeeInfo={jobData.employeeInfo} />

//         {/* Instructions */}
//         <div className="py-4 flex flex-col gap-4">
//           {jobData.workInstructionSteps?.map((step: any, index: number) => (
//             <div
//               key={index}
//               className="flex flex-col md:flex-row gap-4 md:gap-10 items-start bg-white rounded-lg shadow-sm p-4 border border-gray-100"
//             >
//               <div className="flex flex-wrap gap-3 flex-shrink-0">
//                 {step.images?.[0] && (
//                   <img
//                     className="rounded-md w-40 h-40 object-cover border"
//                     src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                     alt={step.title}
//                   />
//                 )}
//                 {step.videos?.[0] && (
//                   <div
//                     className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
//                     onClick={() =>
//                       setActiveVideo(
//                         `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
//                       )
//                     }
//                   >
//                     <video className="w-full h-full object-cover opacity-60">
//                       <source
//                         src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
//                       />
//                     </video>
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
//                         <FaPlay className="text-white text-2xl" />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="flex-1">
//                 <p className="font-semibold text-lg text-gray-800 mb-1">
//                   {step.title}
//                 </p>
//                 <p className="text-gray-600 leading-relaxed">
//                   {step.instruction}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Barcode Section (Original UI) */}
//         <div className="mt-10 p-4 border-2 border-dashed border-gray-400 rounded-lg text-center bg-gray-50">
//           <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
//             <div className="flex flex-col items-center">
//               <Barcode
//                 value={COMPLETE_BARCODE}
//                 width={2}
//                 height={50}
//                 fontSize={14}
//                 format="CODE128"
//               />
//               <p className="mt-2 text-sm font-medium">Scan to Complete Order</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <Barcode
//                 value={SCRAP_BARCODE}
//                 width={2}
//                 height={50}
//                 fontSize={14}
//                 lineColor="red"
//                 format="CODE128"
//               />
//               <p className="mt-2 text-sm font-medium text-red-600">
//                 Scan to Scrap Part
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Summary Bar (Original UI) */}
//       <div className="bg-[#243C75] bottom-0 w-full mt-auto">
//         <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
//           <div className="flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//             <div className="flex flex-col items-center">
//               <p className="text-xs">Process</p>
//               <p className="text-sm font-bold">
//                 {jobData.process?.processName}
//               </p>
//             </div>
//             <div className="flex flex-col items-center text-green-500">
//               <p className="text-xs">Total Qty</p>
//               <p className="text-sm font-bold">{jobData.scheduleQuantity}</p>
//             </div>
//             <div className="flex flex-col items-center text-green-500">
//               <p className="text-xs">Remaining</p>
//               <p className="text-sm font-bold">{jobData.remainingQty}</p>
//             </div>
//             <div className="flex flex-col items-center text-red-500">
//               <p className="text-xs">Scrap</p>
//               <p className="text-sm font-bold">{jobData.scrapQuantity}</p>
//             </div>
//           </div>
//           <div className="flex gap-6 justify-center">
//             <div className="flex flex-col items-center">
//               <p className="text-xs">Employee</p>
//               <p className="text-sm">{`${jobData.employeeInfo?.firstName} ${jobData.employeeInfo?.lastName}`}</p>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-xs">Qty</p>
//               <p className="text-sm font-bold">
//                 {jobData.employeeCompletedQty}
//               </p>
//             </div>
//             <div className="flex flex-col items-center">
//               <p className="text-xs">Cycle Time</p>
//               <p className="text-sm md:text-base font-bold text-white">
//                 {formatCycleTime(jobData.cycleTime)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Video Modal Popup */}
//       {activeVideo && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4">
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>
//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             <button
//               onClick={() => setActiveVideo(null)}
//               className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all z-20"
//             >
//               <IoClose size={30} />
//             </button>
//             <video
//               src={activeVideo}
//               controls
//               autoPlay
//               className="w-full aspect-video"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RunWithScan;
import belt from "../../assets/belt-solid.png";
import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  stationLogoutApi,
  stationProcessDetail,
} from "./https/productionResponseApi";
import { useEffect, useState, useCallback, useRef } from "react";
import Barcode from "react-barcode";
import CommentBox from "./CommentBox";
import { FaPlay } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const RunWithScan = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [jobData, setJobData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);

  const COMPLETE_BARCODE = "complete";
  const SCRAP_BARCODE = "scrap";

  const scanRef = useRef("");
  const lastKeyTime = useRef(Date.now());

  const fetchJobDetails = useCallback(
    async (jobId: string | undefined) => {
      if (!jobId) {
        setLoading(false);
        navigate("/station-login");
        return;
      }
      try {
        setLoading(true);
        const stationUserId = localStorage.getItem("stationUserId");
        const response = await stationProcessDetail(jobId, stationUserId);
        if (response?.data) setJobData(response.data);
      } catch (error: any) {
        if (error?.status === 404) navigate("/station-login");
      } finally {
        setLoading(false);
      }
    },
    [navigate],
  );

  useEffect(() => {
    fetchJobDetails(id);
  }, [id, fetchJobDetails]);

  const handleScanComplete = useCallback(async () => {
    if (!jobData || isCompleting) return;
    setIsCompleting(true);
    try {
      await axiosInstance.post(`${BASE_URL}/api/admin/scan-complete/${id}`, {
        orderId: jobData.order_id,
        partId: jobData.part_id,
        employeeId: jobData.employeeInfo.id,
        order_type: jobData.order_type,
      });
      fetchJobDetails(id);
    } catch (error) {
      console.error("Complete Scan Failed:", error);
    } finally {
      setIsCompleting(false);
    }
  }, [jobData, id, isCompleting, fetchJobDetails]);

  const handleScanScrap = useCallback(async () => {
    if (!jobData) return;
    try {
      await axiosInstance.post(`${BASE_URL}/api/admin/scan-scrap/${id}`, {
        orderId: jobData.order_id,
        partId: jobData.part_id,
        employeeId: jobData.employeeInfo.id,
        order_type: jobData.order_type,
      });
      fetchJobDetails(id);
    } catch (error) {
      console.error("Scrap Scan Failed:", error);
    }
  }, [jobData, id, fetchJobDetails]);

  // IMPROVED SCANNER LOGIC - Cleaning random digits
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["input", "textarea"].includes(target.tagName.toLowerCase())) return;

      const currentTime = Date.now();

      // Reset buffer if typing is too slow (indicates manual typing vs scanner)
      if (currentTime - lastKeyTime.current > 100) {
        scanRef.current = "";
      }
      lastKeyTime.current = currentTime;

      if (event.key === "Enter") {
        // Cleaning: Barcode scanner prefix/suffix aur random digits ko hatane ke liye regex
        // Hum sirf letters (a-z) check kar rahe hain kyunki commands 'complete' aur 'scrap' hain
        const rawValue = scanRef.current.toLowerCase();

        let processedValue = "";
        if (rawValue.includes(COMPLETE_BARCODE))
          processedValue = COMPLETE_BARCODE;
        else if (rawValue.includes(SCRAP_BARCODE))
          processedValue = SCRAP_BARCODE;

        console.log("Scanned Raw:", rawValue, "Processed:", processedValue);

        if (processedValue === COMPLETE_BARCODE) handleScanComplete();
        else if (processedValue === SCRAP_BARCODE) handleScanScrap();

        scanRef.current = "";
      } else if (event.key.length === 1) {
        scanRef.current += event.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleScanComplete, handleScanScrap]);

  const stationLogout = async () => {
    if (!jobData) return;
    try {
      const logoutData = {
        completedQuantity: jobData?.employeeCompletedQty,
        scrapQuantity: jobData?.employeeScrapQty,
      };
      const response = await stationLogoutApi(jobData.productionId, logoutData);
      if (response && response.status === 200) {
        localStorage.removeItem("stationUserId");
        navigate("/station-login");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const formatDate = (d: any) =>
    !d
      ? "N/A"
      : new Date(d).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

  const formatCycleTime = (dateString: any) => {
    if (!dateString) return "0 min";
    const startTime = new Date(dateString);
    if (isNaN(startTime.getTime())) return "0 min";
    const now = new Date();
    const totalMinutes = Math.max(
      0,
      Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60)),
    );
    return `${totalMinutes} min`;
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!jobData)
    return <div className="text-center mt-20">No job data available.</div>;

  const rows = [
    {
      part: jobData.partNumber || "10045",
      date: jobData.order_date || "February 1, 2026",
    },
  ];
  if (jobData.incomingJobs?.length > 0) {
    rows.push({
      part: jobData.incomingJobs[0].partNumber,
      date: jobData.incomingJobs[0].scheudleDate,
    });
  }

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
      {/* HEADER (Blue Section) */}
      <div className="bg-[#243C75] text-white p-4 relative min-h-[280px]">
        <div className="flex justify-end">
          <button
            onClick={stationLogout}
            className="flex items-center gap-1 text-sm font-semibold"
          >
            Log out <IoLogOutOutline size={20} />
          </button>
        </div>

        <div className="container mx-auto mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4">
          {/* Left: Process Name & Table */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold mb-6">
              Process Name : {jobData.process?.processName} (
              {jobData.process?.machineName})
            </h1>

            <div className="flex items-center gap-4 relative">
              <img
                src={belt}
                alt="Belt"
                className="w-24 absolute -left-2 top-0 opacity-40"
              />
              <div className="z-10 w-full max-w-lg ml-6">
                {/* <table className="w-full border border-white text-xs text-center">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="border border-white p-1">Part</th>
                      <th className="border border-white p-1">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i}>
                        <td className="border border-white p-1">{row.part}</td>
                        <td className="border border-white p-1">
                          {row.date === "N/A" ? "N/A" : formatDate(row.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "} */}
                <table className="border border-white text-white text-center w-full min-w-[280px]">
                  <thead className="sticky top-0 bg-[#243C75]">
                    <tr className="font-semibold">
                      <th className="border border-white px-2 py-1 text-xs sm:text-sm">
                        Part Number
                      </th>
                      <th className="border border-white px-2 py-1 text-xs sm:text-sm">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} className={i === 0 ? "bg-green-600/30" : ""}>
                        {" "}
                        {/* Current job ko highlight karne ke liye */}
                        <td className="border border-white px-2 py-1 text-xs sm:text-sm">
                          {row.part}
                        </td>
                        <td className="border border-white px-2 py-1 text-xs sm:text-sm">
                          {row.date === "N/A" ? "N/A" : formatDate(row.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Metadata Info */}
          <div className="flex flex-col md:items-end justify-center h-full space-y-4">
            <h2 className="text-2xl font-semibold">Shop floor</h2>
            <div className="text-xs space-y-1 text-left md:text-left min-w-[150px]">
              <p>
                <span className="opacity-70">Date:</span>{" "}
                {formatDate(jobData.delivery_date)}
              </p>
              <p>
                <span className="opacity-70">Qty:</span>{" "}
                {jobData.employeeCompletedQty}
              </p>
              <p>
                <span className="opacity-70">Scrap Qty:</span>{" "}
                {jobData.employeeScrapQty}
              </p>
              <p>
                <span className="opacity-70">Order Type:</span>{" "}
                {jobData.order_type}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto p-6 flex-grow">
        <CommentBox employeeInfo={jobData.employeeInfo} />

        <div className="mt-8 space-y-6">
          {jobData.workInstructionSteps?.map((step: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="flex gap-2">
                {step.images?.[0] && (
                  <img
                    src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
                    className="w-32 h-32 object-cover rounded shadow-sm"
                    alt=""
                  />
                )}
                {step.videos?.[0] && (
                  <div
                    className="relative w-32 h-32 bg-black rounded overflow-hidden cursor-pointer"
                    onClick={() =>
                      setActiveVideo(
                        `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
                      )
                    }
                  >
                    <video className="w-full h-full object-cover opacity-60">
                      <source
                        src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.5`}
                      />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaPlay className="text-white text-2xl" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-[#243C75]">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{step.instruction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* BARCODE SECTION */}
        <div className="mt-12 mb-10 p-8 border-2 border-dashed border-gray-300 rounded-xl bg-white">
          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center">
              <Barcode
                value={COMPLETE_BARCODE}
                width={1.5}
                height={50}
                fontSize={12}
              />
              <p className="mt-2 text-[10px] font-bold uppercase">
                Scan to Complete Order
              </p>
            </div>
            <div className="text-center">
              <Barcode
                value={SCRAP_BARCODE}
                width={1.5}
                height={50}
                fontSize={12}
                lineColor="red"
              />
              <p className="mt-2 text-[10px] font-bold uppercase text-red-600">
                Scan to Scrap Part
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-[#243C75] text-white p-3 text-[11px]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-8">
            <div className="text-center">
              <p className="opacity-60">Process</p>
              <p className="font-bold uppercase">
                {jobData.process?.processName}
              </p>
            </div>
            <div className="text-center text-green-400">
              <p className="opacity-60">Total Qty</p>
              <p className="font-bold">{jobData.scheduleQuantity}</p>
            </div>
            <div className="text-center text-green-400">
              <p className="opacity-60">Remaining</p>
              <p className="font-bold">{jobData.remainingQty}</p>
            </div>
            <div className="text-center text-red-400">
              <p className="opacity-60">Scrap</p>
              <p className="font-bold">{jobData.scrapQuantity}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <p className="opacity-60">Employee</p>
              <p className="font-bold">Shop floor</p>
            </div>
            <div className="text-center">
              <p className="opacity-60">Done</p>
              <p className="font-bold">{jobData.employeeCompletedQty}</p>
            </div>
            <div className="text-center">
              <p className="opacity-60">Cycle Time</p>
              <p className="font-bold">{formatCycleTime(jobData.cycleTime)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-white"
              onClick={() => setActiveVideo(null)}
            >
              <IoClose size={30} />
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RunWithScan;
