// import belt from "../../assets/belt-solid.png";
// import { IoLogOutOutline } from "react-icons/io5";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import {
//   completeOrder,
//   scrapOrder,
//   stationLogoutApi,
//   stationProcessDetail,
// } from "./https/productionResponseApi";
// import { useEffect, useState } from "react";
// import CommentBox from "./CommentBox";
// import { FaPlay } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";
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
// interface WorkInstructionStep {
//   id: string;
//   title: string;
//   instruction: string;
//   images: { imagePath: string }[];
//   videos?: { videoPath: string }[];
// }
// interface JobData {
//   productionId: string;
//   order_id: string;
//   part_id: string;
//   order_date: string;
//   delivery_date: string;
//   upcommingOrder: string;
//   workInstructionSteps: WorkInstructionStep[];
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
//     const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));
//     if (totalMinutes >= 1440) {
//       const days = Math.floor(totalMinutes / 1440);
//       const remainingMinutesAfterDays = totalMinutes % 1440;
//       const hours = Math.floor(remainingMinutesAfterDays / 60);
//       const mins = remainingMinutesAfterDays % 60;

//       let result = `${days} day${days > 1 ? "s" : ""}`;
//       if (hours > 0) result += ` ${hours} hr`;
//       if (mins > 0) result += ` ${mins} min`;

//       return result;
//     } else if (totalMinutes >= 60) {
//       const hours = Math.floor(totalMinutes / 60);
//       const mins = totalMinutes % 60;

//       if (mins === 0) {
//         return `${hours} hr`;
//       } else {
//         return `${hours} hr ${mins} min`;
//       }
//     } else {
//       return `${totalMinutes} min`;
//     }
//   } catch (error) {
//     console.error("Could not format cycle time:", dateString, error);
//     return "N/A";
//   }
// };
// const RunSchedule = () => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();
//   const [jobData, setJobData] = useState<JobData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [noJob, setNoJob] = useState(false);
//   const [activeVideo, setActiveVideo] = useState(null);
//   const fetchJobDetails = async (jobId: string | undefined) => {
//     if (!jobId) {
//       setLoading(false);
//       return;
//     }
//     try {
//       setLoading(true);
//       const stationUserId = localStorage.getItem("stationUserId");
//       const response = await stationProcessDetail(jobId, stationUserId);

//       if (response?.data) {
//         setJobData(response.data);
//       }
//     } catch (error: any) {
//       localStorage.removeItem("stationUserId");
//       navigate("/station-login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id, navigate]);
//   const [isCompleting, setIsCompleting] = useState(false);
//   const handleCompleteOrder = async () => {
//     if (!jobData || isCompleting) return;
//     setIsCompleting(true);
//     try {
//       const stationUserId = jobData.employeeInfo?.id;
//       const adminName = "Admin";
//       const currentPartId = jobData.part_id || jobData.customPartId;
//       const parentProductId = jobData.order?.partId || jobData.productId;
//       await completeOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.order_type,
//         currentPartId,
//         stationUserId,
//         parentProductId,
//         jobData.partNumber,
//         jobData.employeeInfo.id,
//       );

//       fetchJobDetails(id);
//     } catch (error) {
//       console.error("Completion Error:", error);
//     } finally {
//       setIsCompleting(false);
//     }
//   };
//   const handleScrapOrder = async () => {
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
//       const status = error?.response?.status;
//       if (status === 400) {
//         console.warn("Order might be already completed. Refetching...");
//         fetchJobDetails(id);
//       } else {
//         console.error("Error completing order:", error);
//       }
//     }
//   };
//   const stationLogout = async () => {
//     if (!jobData) return;

//     try {
//       const logoutData = {
//         completedQuantity: jobData.employeeCompletedQty,
//         scrapQuantity: jobData.employeeScrapQty,
//       };

//       const response = await stationLogoutApi(jobData.productionId, logoutData);

//       if (response && response.status === 200) {
//         localStorage.removeItem("stationUserId");
//         navigate("/station-login");
//       }
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!jobData) return null;
//   const {
//     part,
//     order,
//     employeeInfo,
//     process,
//     upcommingParts,
//     upcommingOrder,
//     order_date,
//   } = jobData;
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
//                 <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
//                   <table className="border border-white text-white text-center w-full min-w-[280px]">
//                     <thead className="sticky top-0 bg-[#243C75]">
//                       <tr className="font-semibold">
//                         <th className="border border-white px-2 py-1 text-xs sm:text-sm">
//                           Part Number
//                         </th>
//                         <th className="border border-white px-2 py-1 text-xs sm:text-sm">
//                           Date
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {rows.map((row, i) => (
//                         <tr
//                           key={i}
//                           className={i === 0 ? "bg-green-600/30" : ""}
//                         >
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
//           {jobData.workInstructionSteps &&
//           jobData.workInstructionSteps.length > 0 ? (
//             jobData.workInstructionSteps.map((step, index) => (
//               <div
//                 key={step.id || index}
//                 className="flex flex-col md:flex-row gap-4 md:gap-10 items-start bg-white rounded-lg shadow-sm p-4 border border-gray-100"
//               >
//                 <div className="flex flex-wrap gap-3 flex-shrink-0">
//                   {step.images && step.images.length > 0 && (
//                     <img
//                       className="rounded-md w-40 h-40 object-cover border"
//                       src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
//                       alt={step.title}
//                     />
//                   )}

//                   {step.videos?.length > 0 && (
//                     <div
//                       className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
//                       onClick={() =>
//                         setActiveVideo(
//                           `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
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
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
//           <button
//             className="bg-brand text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto"
//             onClick={handleCompleteOrder}
//           >
//             Complete Order
//           </button>
//           <NavLink className="w-full sm:w-auto">
//             <button
//               className="bg-transparent text-brand px-4 py-2 font-semibold border-2 border-black rounded-md w-full"
//               onClick={handleScrapOrder}
//             >
//               Scrap
//             </button>
//           </NavLink>
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
//           <div
//             className="absolute inset-0"
//             onClick={() => setActiveVideo(null)}
//           ></div>

//           <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
//             <div className="absolute top-0 left-0 right-0 p-4 flex justify-end items-center bg-gradient-to-b from-black/70 to-transparent z-20">
//               <button
//                 onClick={() => setActiveVideo(null)}
//                 className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
//               >
//                 <IoClose size={30} />
//               </button>
//             </div>

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
// export default RunSchedule;
import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline, IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import {
  completeOrder,
  scrapOrder,
  stationLogoutApi,
  stationProcessDetail,
} from "./https/productionResponseApi";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { FaPlay } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

// --- Interfaces Sudhari Gayi Hain ---

interface Image {
  imagePath: string;
}

interface Video {
  videoPath: string;
}

interface WorkInstructionStep {
  id: string;
  title: string;
  instruction: string;
  images: Image[];
  videos?: Video[];
}

interface Process {
  processName: string;
  machineName?: string;
}

interface EmployeeInfo {
  id: string; // Added id
  fullName: string;
  lastName: string;

  firstName: string;
}

interface IncomingJob {
  partNumber: string;
  scheudleDate: string;
}

interface JobData {
  productionId: string;
  order_id: string;
  part_id: string;
  customPartId?: string; // Added
  productId?: string; // Added
  partNumber: string; // Added
  order_type: string; // Added
  order_date: string;
  delivery_date: string;
  employeeCompletedQty: number; // Added
  employeeScrapQty: number; // Added
  scheduleQuantity: number; // Added
  remainingQty: number; // Added
  scrapQuantity: number; // Added
  workInstructionSteps: WorkInstructionStep[];
  process: Process;
  cycleTime: string;
  employeeInfo: EmployeeInfo;
  order: {
    orderNumber: string;
    partId?: string;
  };
  part: {
    process?: Process;
  };
  incomingJobs?: IncomingJob[]; // Added
}

// --- Helper Functions ---

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Not Available";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const RunSchedule = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const formatCycleTime = (dateString: string | undefined | null) => {
    if (!dateString) return "N/A";

    try {
      const startTime = new Date(dateString);
      if (isNaN(startTime.getTime())) return "Invalid Time";

      const now = new Date();
      const diffMs = now.getTime() - startTime.getTime();
      const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

      if (totalMinutes >= 1440) {
        const days = Math.floor(totalMinutes / 1440);
        const remainingMinutesAfterDays = totalMinutes % 1440;
        const hours = Math.floor(remainingMinutesAfterDays / 60);
        const mins = remainingMinutesAfterDays % 60;
        let result = `${days} day${days > 1 ? "s" : ""}`;
        if (hours > 0) result += ` ${hours} hr`;
        if (mins > 0) result += ` ${mins} min`;
        return result;
      } else if (totalMinutes >= 60) {
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        return mins === 0 ? `${hours} hr` : `${hours} hr ${mins} min`;
      } else {
        return `${totalMinutes} min`;
      }
    } catch (error) {
      return "N/A";
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date()); // Har minute UI re-render hoga aur time update hoga
    }, 60000); // 60 seconds

    return () => clearInterval(timer);
  }, []);
  const fetchJobDetails = async (jobId: string | undefined) => {
    if (!jobId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const stationUserId = localStorage.getItem("stationUserId");
      const response = await stationProcessDetail(jobId, stationUserId || "");

      if (response?.data) {
        setJobData(response.data);
      }
    } catch (error) {
      console.error("Fetch error", error);
      localStorage.removeItem("stationUserId");
      navigate("/station-login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails(id);
  }, [id]);

  const handleCompleteOrder = async () => {
    if (!jobData || isCompleting) return;
    setIsCompleting(true);
    try {
      const stationUserId = jobData.employeeInfo.id;
      const currentPartId = jobData.part_id || jobData.customPartId || "";
      const parentProductId = jobData.order?.partId || jobData.productId || "";

      await completeOrder(
        jobData.productionId,
        jobData.order_id,
        jobData.order_type,
        currentPartId,
        stationUserId,
        parentProductId,
        jobData.partNumber,
        "Admin",
      );

      fetchJobDetails(id);
    } catch (error) {
      console.error("Completion Error:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  // const handleScrapOrder = async () => {
  //   if (!jobData) return;
  //   try {
  //     await scrapOrder(
  //       jobData.productionId,
  //       jobData.order_id,
  //       jobData.order_type,
  //       jobData.part_id,
  //       jobData.employeeInfo.id,
  //     );
  //     fetchJobDetails(id);
  //   } catch (error: any) {
  //     if (error?.response?.status === 400) {
  //       fetchJobDetails(id);
  //     } else {
  //       console.error("Error scrapping order:", error);
  //     }
  //   }
  // };
  // const handleScrapOrder = async () => {
  //   if (!jobData || isCompleting) return;

  //   try {
  //     const response = await scrapOrder(
  //       jobData.productionId,
  //       jobData.order_id,
  //       jobData.order_type,
  //       jobData.part_id,
  //       jobData.employeeInfo.id,
  //     );

  //     if (response?.data?.newProductionId) {
  //       // SUCCESS: Naye ID par navigate karein, isse useEffect automatically fresh data fetch karega
  //       navigate(`/run-schedule/${response.data.newProductionId}`, {
  //         replace: true,
  //       });
  //     } else {
  //       if (response?.data?.isJobFinished) {
  //         alert("Order Finished!");
  //         navigate("/station-process"); // Ya jahan aap bhejte hain
  //       } else {
  //         // Fallback agar ID nahi mili
  //         fetchJobDetails(id);
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Error scrapping order:", error);
  //     fetchJobDetails(id);
  //   }
  // };
  // const handleScrapOrder = async () => {
  //   if (!jobData) return;
  //   try {
  //     // 1. Scrap API call
  //     const response = await scrapOrder(
  //       jobData.productionId,
  //       jobData.order_id,
  //       jobData.order_type,
  //       jobData.part_id,
  //       jobData.employeeInfo.id,
  //     );

  //     if (response?.data?.isOrderFinished) {
  //       alert("Order finished!");
  //       navigate("/station-process");
  //     } else {
  //       // 2. TURANT TIMER RESET (Manual State Update)
  //       // fetchJobDetails ka wait karne se pehle timer ko 'now' par set kar dein
  //       setJobData((prev) =>
  //         prev
  //           ? {
  //               ...prev,
  //               cycleTime: new Date().toISOString(), // Fresh start time set kar diya
  //               employeeScrapQty: prev.employeeScrapQty + 1, // Scrap qty bhi UI mein update ho jayegi
  //             }
  //           : null,
  //       );

  //       // 3. Phir backend se latest data sync karein
  //       await fetchJobDetails(id);
  //     }
  //   } catch (error: any) {
  //     console.error("Error scrapping order:", error);
  //     fetchJobDetails(id);
  //   }
  // };

  const handleScrapOrder = async () => {
    if (!jobData) return;
    try {
      const response = await scrapOrder(
        jobData.productionId,
        jobData.order_id,
        jobData.order_type,
        jobData.part_id,
        jobData.employeeInfo.id,
      );
      if (response?.data?.isOrderFinished) {
        alert("Order Finished!");
        navigate("/station-process");
      } else {
        // !!! FIX: Turant timer ko 0 karne ke liye state manually update karein !!!
        setJobData((prev) =>
          prev
            ? {
                ...prev,
                // Naya time set kar do taaki calculation (Now - cycleTime) = 0 ho jaye
                cycleTime: new Date().toISOString(),
                employeeScrapQty: prev.employeeScrapQty + 1,
                productionId: response.data.newProductionId, // Naya ID jo backend se aaya
              }
            : null,
        );

        // Phir backend se latest data (Next Part Name, etc.) refresh karein
        await fetchJobDetails(id);
      }
    } catch (error: any) {
      console.error("Scrap Error:", error);
      fetchJobDetails(id);
    }
  };
  const stationLogout = async () => {
    if (!jobData) return;
    try {
      const logoutData = {
        completedQuantity: jobData.employeeCompletedQty,
        scrapQuantity: jobData.employeeScrapQty,
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!jobData) return null;

  const { part, employeeInfo, process } = jobData;

  const rows = [
    {
      status: "Current",
      part: jobData.partNumber || "N/A",
      date: jobData.order_date || "",
    },
  ];

  if (jobData.incomingJobs && jobData.incomingJobs.length > 0) {
    const nextJob = jobData.incomingJobs[0];
    rows.push({
      status: "Upcoming",
      part: nextJob.partNumber || "N/A",
      date: nextJob.scheudleDate || "No Date",
    });
  }

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
      <div className="bg-[#243C75] relative ">
        <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
          <button
            onClick={stationLogout}
            className="text-xs md:text-sm font-semibold flex items-center gap-1"
          >
            Log out
            <IoLogOutOutline size={16} className="md:size-[20px]" />
          </button>
        </div>
        <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col ">
            <div className="relative w-full max-w-xl mx-auto">
              <div className="w-full mb-8">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold break-words leading-snug text-white px-2">
                  Process Name :
                  <span className="text-md font-medium">
                    {" "}
                    {part?.process?.processName || process.processName} (
                    {part?.process?.machineName || process.machineName || "N/A"}
                    )
                  </span>
                </p>
              </div>

              <img
                src={belt}
                alt="Belt icon"
                className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
              />

              <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-3 md:px-4 mt-5">
                <div className="bg-opacity-50 rounded-md overflow-y-auto w-full max-h-[150px]">
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
                        <tr
                          key={i}
                          className={i === 0 ? "bg-green-600/30" : ""}
                        >
                          <td className="border border-white px-2 py-1 text-xs sm:text-sm">
                            {row.part}
                          </td>
                          <td className="border border-white px-2 py-1 text-xs sm:text-sm">
                            {row.date.includes("T")
                              ? formatDate(row.date)
                              : row.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
            <div>
              <p className="md:text-2xl ">{`${employeeInfo?.fullName} `}</p>
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <p className="text-sm md:text-base">
                Date: {formatDate(jobData.delivery_date)}
              </p>
              <p className="text-sm md:text-base">
                Qty: {jobData.employeeCompletedQty}
              </p>
              <p className="text-sm md:text-base">
                Scrap Qty: {jobData.employeeScrapQty}
              </p>
              <p className="text-sm md:text-base">
                Order Type: {jobData.order_type}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 flex-grow">
        <CommentBox employeeInfo={employeeInfo} />
        <div className="py-4 flex flex-col gap-4">
          {jobData.workInstructionSteps &&
          jobData.workInstructionSteps.length > 0 ? (
            jobData.workInstructionSteps.map((step, index) => (
              <div
                key={step.id || index}
                className="flex flex-col md:flex-row gap-4 md:gap-10 items-start bg-white rounded-lg shadow-sm p-4 border border-gray-100"
              >
                <div className="flex flex-wrap gap-3 flex-shrink-0">
                  {step.images && step.images.length > 0 && (
                    <img
                      className="rounded-md w-40 h-40 object-cover border"
                      src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
                      alt={step.title}
                    />
                  )}

                  {step.videos && step.videos.length > 0 && (
                    <div
                      className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
                      onClick={() =>
                        setActiveVideo(
                          `${BASE_URL}/uploads/workInstructionVideo/${step.videos![0].videoPath}`,
                        )
                      }
                    >
                      <video className="w-full h-full object-cover opacity-60">
                        <source
                          src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
                        />
                      </video>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/30 backdrop-blur-md p-3 rounded-full group-hover:scale-110 transition-transform">
                          <FaPlay className="text-white text-2xl" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800 break-words mb-1">
                    {step.title}
                  </p>
                  <p className="text-gray-600 break-words leading-relaxed">
                    {step.instruction}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 p-4">
              No instructions available.
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto"
            onClick={handleCompleteOrder}
            disabled={isCompleting}
          >
            {isCompleting ? "Processing..." : "Complete Order"}
          </button>
          <button
            className="bg-transparent text-black px-4 py-2 font-semibold border-2 border-black rounded-md w-full sm:w-auto"
            onClick={handleScrapOrder}
          >
            Scrap
          </button>
        </div>
      </div>

      <div className="bg-[#243C75] bottom-0 w-full text-white">
        <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 md:gap-10 items-center flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <p className="text-sm">Process</p>
              <p className="text-sm font-bold">{process.processName}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-green-500 text-sm">Total Qty</p>
              <p className="text-green-500 font-bold">
                {jobData.scheduleQuantity}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-green-500 text-sm">Remaining</p>
              <p className="text-green-500 font-bold">{jobData.remainingQty}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-sm">Scrap</p>
              <p className="text-red-500 font-bold">{jobData.scrapQuantity}</p>
            </div>
          </div>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col items-center">
              <p className="text-sm">Employee</p>
              <p className="text-sm font-bold">
                {employeeInfo.fullName
                  ? employeeInfo?.fullName
                  : employeeInfo?.firstName}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Qty</p>
              <p className="text-sm font-bold">
                {jobData.employeeCompletedQty}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">Cycle Time</p>
              <p className="text-sm font-bold">
                {formatCycleTime(jobData.cycleTime)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4">
          <div
            className="absolute inset-0"
            onClick={() => setActiveVideo(null)}
          ></div>
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden z-10">
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 text-white z-20"
            >
              <IoClose size={30} />
            </button>
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

export default RunSchedule;
