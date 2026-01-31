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
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return "Invalid Time";
//     }
//     return date.toLocaleTimeString("en-US");
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

//   const fetchJobDetails = async (jobId: string | undefined) => {
//     if (!jobId) {
//       setLoading(false);
//       navigate("/station-login");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await stationProcessDetail(jobId);
//       const data = response?.data;
//       if (data) {
//         setJobData(data);
//       }
//     } catch (error: any) {
//       if (error?.status === 404) {
//         navigate("/station-login");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchJobDetails(id);
//   }, [id, navigate]);
//   console.log("jobDatajobData", jobData);

//   const handleCompleteOrder = async () => {
//     if (!jobData) return;
//     console.log(
//       "jobData.employeeInfojobData.employeeInfo",
//       jobData.employeeInfo
//     );
//     console.log("jobDatajobData", jobData);

//     try {
//       await completeOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.part_id,
//         jobData.employeeInfo?.id,
//         jobData.order.partId
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
//   const handleScrapOrder = async () => {
//     if (!jobData) return;
//     console.log("jobData.employeeInfojobData.employeeInfo", jobData);

//     try {
//       await scrapOrder(
//         jobData.productionId,
//         jobData.order_id,
//         jobData.part_id,
//         jobData.employeeInfo.id
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
//       const response = await stationLogoutApi(jobData.productionId);
//       if (response && response.status === 200) {
//         navigate("/station-login");
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   if (!jobData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         No job data available.
//       </div>
//     );
//   }

//   const { part, order, employeeInfo, process, upcommingOrder } = jobData;

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
//         <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="relative w-full md:w-auto">
//             <img className="w-24 md:w-40" src={belt} alt="Belt icon" />
//             <div className="text-white text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap flex justify-between">
//               <div className="gap-2 flex flex-col">
//                 <p className="text-3xl 2xl:text-5xl font-semibold">
//                   {part?.partDescription || "No Description"}
//                 </p>
//                 <div className="flex gap-4">
//                   <p className="md:text-xl font-semibold">
//                     {order?.orderNumber}
//                   </p>
//                   <p className=" ">{formatDate(jobData.order_date)}</p>
//                 </div>
//                 <div className="flex gap-4">
//                   <p className="md:text-xl font-semibold ">Upcoming : </p>
//                   <p className="">{formatDate(upcommingOrder)}</p>
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
//         <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Write your comments"
//             className="border border-gray-400 py-2 px-4 rounded-md w-full placeholder-gray-400 bg-transparent text-sm md:text-base"
//           />
//           <div className="flex gap-3 w-full ">
//             <button className="bg-brand text-white px-4 md:px-8 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto">
//               Add Picture
//             </button>
//             <button className="bg-brand text-white px-4 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto">
//               Send
//             </button>
//           </div>
//         </div>

//         <div className="py-4 flex flex-col gap-4">
//           {part.WorkInstruction && part.WorkInstruction.length > 0 ? (
//             part.WorkInstruction.flatMap(
//               (instructionSet) => instructionSet.steps
//             ).map((step, index) => (
//               <div
//                 key={step.id || index}
//                 className="flex flex-col md:flex-row gap-4 md:gap-20 items-center bg-white rounded-lg shadow-sm p-4"
//               >
//                 <div className="w-full md:w-auto">
//                   <img
//                     className="rounded-md w-full max-w-xs md:max-w-none"
//                     src={
//                       step.images && step.images.length > 0
//                         ? `${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`
//                         : "https://via.placeholder.com/150"
//                     }
//                     alt={step.title}
//                   />
//                 </div>
//                 <div className="text-center md:text-left">
//                   <p className="font-semibold text-lg">{step.title}</p>
//                   <p className="text-gray-600">{step.instruction}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center text-gray-500 p-4">
//               No work instructions available for this part.
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
//                 {jobData.scrapQty}
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
//               <p className="text-sm md:text-base">{jobData.completedQty}</p>
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
//     </div>
//   );
// };

// export default RunSchedule;

import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  completeOrder,
  scrapOrder,
  stationLogin,
  stationLogoutApi,
  stationProcessDetail,
} from "./https/productionResponseApi";
import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import { toast } from "react-toastify";
import { FaPlay } from "react-icons/fa"; // Play icon ke liye
import { IoClose } from "react-icons/io5"; // Close icon ke liye
const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface Image {
  imagePath: string;
}

interface Step {
  id: string;
  title: string;
  instruction: string;
  images: Image[];
}

interface WorkInstruction {
  steps: Step[];
}

interface Part {
  partDescription: string;
  WorkInstruction: WorkInstruction[];
}

interface Order {
  orderNumber: string;
}

interface EmployeeInfo {
  firstName: string;
  lastName: string;
}

interface Process {
  processName: string;
}

interface JobData {
  productionId: string;
  order_id: string;
  part_id: string;
  order_date: string;
  delivery_date: string;
  upcommingOrder: string;
  part: Part;
  order: Order;
  employeeInfo: EmployeeInfo;
  process: Process;
  quantity: number;
  completedQuantity: number;
  cycleTime: string;
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "Not Available";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// const formatCycleTime = (dateString) => {
//   if (!dateString) return "N/A";

//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) {
//       return "Invalid Time";
//     }
//     return date.toLocaleTimeString("en-US");
//   } catch (error) {
//     console.error("Could not format cycle time:", dateString, error);
//     return "N/A";
//   }
// };
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
const RunSchedule = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [noJob, setNoJob] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null); // Video URL store karne ke liye
  const fetchJobDetails = async (jobId: string | undefined) => {
    if (!jobId) {
      setLoading(false);
      // navigate("/station-login");
      return;
    }
    try {
      setLoading(true);
      const stationUserId = localStorage.getItem("stationUserId");
      const response = await stationProcessDetail(jobId, stationUserId);
      const data = response?.data;
      if (data) {
        setJobData(data);
      }
    } catch (error: any) {
      console.log("errorerror", error.response.data.message);
      if (error?.status === 404) {
        navigate("/station-login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails(id);
  }, [id, navigate]);
  console.log("jobDatajobData", jobData);

  // const handleCompleteOrder = async () => {
  //   if (!jobData) return;
  //   console.log(
  //     "jobData.employeeInfojobData.employeeInfo",
  //     jobData.employeeInfo
  //   );

  //   try {
  //     await completeOrder(
  //       jobData.productionId,
  //       jobData.order_id,
  //       jobData.part_id,
  //       jobData.employeeInfo.id,
  //       jobData.order.partId
  //     );
  //     fetchJobDetails(id);
  //   } catch (error: any) {
  //     const status = error?.response?.status;
  //     if (status === 400) {
  //       console.warn("Order might be already completed. Refetching...");
  //       fetchJobDetails(id);
  //     } else {
  //       console.error("Error completing order:", error);
  //     }
  //   }
  // };
  const [isCompleting, setIsCompleting] = useState(false);
  // const handleCompleteOrder = async () => {
  //   if (!jobData || isCompleting) return;
  //   setIsCompleting(true);
  //   try {
  //     if (jobData.type === "product") {
  //       const stationLoginData = {
  //         processId: jobData.processId,
  //         stationUserId: jobData.employeeInfo.id,
  //         type: "run_schedule",
  //       };

  //       const loginRes = await stationLogin(stationLoginData);
  //       if (loginRes?.status !== 200) {
  //         console.error("Station login failed");
  //         setIsCompleting(false);
  //         return;
  //       }
  //       console.log("Station login successful!");
  //     }

  //     console.log("jobDatajobData", jobData);
  //     let productId = null;
  //     if (jobData.type === "product") {
  //       productId = jobData.productId || jobData.order.productId;
  //     }

  //     await completeOrder(
  //       jobData.productionId,
  //       jobData.order_id,
  //       jobData.order_type,
  //       jobData.part_id,
  //       jobData.employeeInfo.id,
  //       jobData?.productId || jobData?.order?.productId,
  //       jobData.type || "part",
  //       `Admin`,
  //     );
  //     fetchJobDetails(id);
  //   } catch (error: any) {
  //     const status = error?.response?.status;
  //     if (status === 400) {
  //       console.warn("Order might be already completed. Refetching...");
  //       fetchJobDetails(id);
  //     } else {
  //       console.error("Error completing order:", error);
  //     }
  //   } finally {
  //     setIsCompleting(false);
  //   }
  // };
const handleCompleteOrder = async () => {
  if (!jobData || isCompleting) return;
  setIsCompleting(true);
  try {
    // 1. Define the variables clearly
    const stationUserId = jobData.employeeInfo?.id;
    const adminName = "Admin";
    const currentPartId = jobData.part_id || jobData.customPartId;
    const parentProductId = jobData.order?.partId || jobData.productId;

    // 2. Call the function with arguments in the EXACT order defined in completeOrder
    await completeOrder(
      jobData.productionId, // Arg 1: id (This goes into the URL /complete-order/${id})
      jobData.order_id,     // Arg 2: orderId
      jobData.order_type,   // Arg 3: order_type
      currentPartId,        // Arg 4: partId
      stationUserId,        // Arg 5: employeeId
      parentProductId,      // Arg 6: productId
      jobData.partNumber,   // Arg 7: type (Sending the Part Number string here)
      adminName             // Arg 8: completedBy
    );

    fetchJobDetails(id);
  } catch (error) {
    console.error("Completion Error:", error);
  } finally {
    setIsCompleting(false);
  }
};
  const handleScrapOrder = async () => {
    if (!jobData) return;
    try {
      await scrapOrder(
        jobData.productionId,
        jobData.order_id,
        jobData.order_type,
        jobData.part_id,
        jobData.employeeInfo.id,
      );
      fetchJobDetails(id);
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 400) {
        console.warn("Order might be already completed. Refetching...");
        fetchJobDetails(id);
      } else {
        console.error("Error completing order:", error);
      }
    }
  };
  const stationLogout = async () => {
    if (!jobData) return;

    try {
      const response = await stationLogoutApi(jobData.productionId);
      if (response && response.status === 200) {
        localStorage.removeItem("stationUserId");
        navigate("/station-login");
      }
    } catch (error) {
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // if (noJob) {
  //   return (
  //     <div className="min-h-screen flex flex-col items-center justify-center gap-4">
  //       <p>No job data available.</p>

  //       <button
  //         onClick={() => navigate(-1)}
  //         className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand"
  //       >
  //         Go Back to station login
  //       </button>
  //     </div>
  //   );
  // }

  const {
    part,
    order,
    employeeInfo,
    process,
    upcommingParts,
    upcommingOrder,
    order_date,
  } = jobData;
  console.log("partpart", jobData);
   const rows = [
  { part: jobData.partNumber || "N/A", date: order_date },
];

  // Agar upcoming order ka data hai, tabhi doosri row add karein
  if (upcommingOrder && upcommingParts) {
    rows.push({
      part: upcommingParts,
      date: upcommingOrder,
    });
  }

  // Agar upcoming order ka data hai, tabhi doosri row add karein
  if (upcommingOrder && upcommingParts) {
    rows.push({
      part: upcommingParts,
      date: upcommingOrder,
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
        <div className="container  p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col ">
            {/* Process name */}

            {/* Belt image and table container */}
            <div className="relative w-full max-w-xl mx-auto">
              <div className="w-full  mb-8 sm:mb-8 md:mb-8">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold break-words leading-snug text-white px-2">
                  Process Name :
                  <span className="text-md font-medium">
                    {part?.process?.processName ||jobData.process.processName} ({" "}
                    {part?.process?.machineName ||jobData.process.machineName})
                  </span>
                </p>
              </div>

              <img
                src={belt}
                alt="Belt icon"
                className="w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
              />

              {/* Table overlay on image */}
              <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-3 md:px-4 mt-5">
                <div className=" bg-opacity-50 rounded-md overflow-x-auto w-full">
                  <table className="border border-white text-white text-center w-full min-w-[280px]">
                    <thead>
                      <tr className="font-semibold">
                        <th className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
                          Part
                        </th>
                        <th className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
                          Schedule date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i}>
                          <td className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
                            {row.part}{" "}
                            {/* Yahan sirf row.part likhein, description alag se mat likhein */}
                          </td>
                          <td className="border border-white px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm md:text-base">
                            {formatDate(row.date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="absolute inset-0 flex items-center justify-center px-3 md:px-6">
              <div className="text-white text-center max-w-sm md:max-w-md space-y-3">
                <p className="text-lg md:text-2xl font-semibold break-words leading-snug">
                  {part?.process.processName || "No Aavailable"}
                </p>
                <div className="flex justify-center gap-3 md:gap-6 text-sm md:text-lg">
                  <p className="font-semibold">{order?.orderNumber}</p>
                  <p>{formatDate(jobData.order_date)}</p>
                </div>

                <div className="flex justify-center gap-3 md:gap-6 text-sm md:text-lg">
                  <p className="font-semibold">Upcoming</p>
                  <p>{formatDate(upcommingOrder)}</p>
                </div>
              </div>
            </div> */}

          <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
            <div>
              <p className="md:text-2xl ">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
            </div>
            <div className="flex flex-col  gap-1 md:gap-2">
              <p className="text-sm md:text-base">
                Date: {formatDate(jobData.delivery_date)}
              </p>
              <p className=" text-sm md:text-base">
                Qty: {jobData.employeeCompletedQty}
              </p>
              <p className=" text-sm md:text-base">
                Scrap Qty: {jobData.employeeScrapQty}
              </p>
              <p className=" text-sm md:text-base">
                Order Type: {jobData.order_type}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 flex-grow">
        <CommentBox employeeInfo={employeeInfo} />

        <div className="py-4 flex flex-col gap-4">
          {part?.WorkInstruction && part?.WorkInstruction.length > 0 ? (
            part?.WorkInstruction.flatMap(
              (instructionSet) => instructionSet.steps,
            ).map((step, index) => (
              <div
                key={step.id || index}
                className="flex flex-col md:flex-row gap-4 md:gap-10 items-start bg-white rounded-lg shadow-sm p-4 border border-gray-100"
              >
                {/* MEDIA SECTION */}
                <div className="flex flex-wrap gap-3 flex-shrink-0">
                  {/* IMAGE */}
                  {step.images?.length > 0 && (
                    <img
                      className="rounded-md w-40 h-40 object-cover border"
                      src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
                      alt={step.title}
                    />
                  )}

                  {step.videos?.length > 0 && (
                    <div
                      className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
                      onClick={() =>
                        setActiveVideo(
                          `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
                        )
                      }
                    >
                      <video className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity">
                        <source
                          src={`${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}#t=0.1`}
                        />
                      </video>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full group-hover:scale-110 transition-transform">
                          <FaPlay className="text-white text-xl" />
                        </div>
                      </div>
                      <span className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
                        Video Instruction
                      </span>
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

          {/* VIDEO MODAL */}
          {activeVideo && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
              <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl">
                {/* Close Button */}
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
                >
                  <IoClose size={28} />
                </button>

                {/* Video Player */}
                <div className="aspect-video w-full">
                  <video
                    src={activeVideo}
                    controls
                    autoPlay
                    className="w-full h-full"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Click outside to close */}
              <div
                className="absolute inset-0 -z-10"
                onClick={() => setActiveVideo(null)}
              ></div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            className="bg-brand text-white px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto"
            onClick={handleCompleteOrder}
          >
            Complete Order
          </button>
          <NavLink className="w-full sm:w-auto">
            <button
              className="bg-transparent text-brand px-4 py-2 font-semibold border-2 border-black rounded-md w-full"
              onClick={handleScrapOrder}
            >
              Scrap
            </button>
          </NavLink>
        </div>
      </div>
      <div className="bg-[#243C75]  bottom-0 w-full">
        <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <p className="text-sm md:text-base">Process</p>
              <p className="text-sm md:text-base">{process?.processName}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-green-500 text-sm md:text-base">Total Qty</p>
              <p className="text-green-500 text-sm md:text-base">
                {jobData.scheduleQuantity}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-green-500 text-sm md:text-base">
                Remaining Qty
              </p>
              <p className="text-green-500 text-sm md:text-base">
                {jobData.remainingQty}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-red-500 text-sm md:text-base">Scrap</p>
              <p className="text-red-500 text-sm md:text-base">
                {" "}
                {jobData.scrapQuantity}
              </p>
            </div>
          </div>
          <div className="flex gap-2 md:gap-6  justify-center">
            <div className="flex flex-col items-center text-white">
              <p className="text-sm md:text-base font-semibold"> Employee</p>
              <p className="text-sm md:text-base">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
            </div>
            <div className="flex flex-col items-center text-white">
              <p className="text-sm md:text-base font-semibold"> Qty</p>
              <p className="text-sm md:text-base">
                {jobData.employeeCompletedQty}
              </p>
            </div>
            <div className="flex flex-col items-center text-white">
              <p className="text-sm md:text-base font-semibold">Cycle Time</p>
              <p className="text-sm md:text-base">
                {formatCycleTime(jobData?.cycleTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RunSchedule;
