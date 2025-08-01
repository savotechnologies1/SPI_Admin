import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline } from "react-icons/io5";
import step_1 from "../../assets/step_1.png";
import step_2 from "../../assets/step_2.png";
import step_3 from "../../assets/step_3.png";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  completeOrder,
  stationProcessDetail,
} from "./https/productionResponseApi";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const data = [
  {
    index: 1,
    img: step_1,
    title: "Step 1",
    decs: "Remove burn and sharp edges",
  },
  {
    index: 2,

    img: step_2,
    title: "Step 2",
    decs: "Inspect for Surface Finish Defects",
  },
  {
    index: 3,
    img: step_3,
    title: "Step 3",
    decs: "Packaged Products",
  },
];

// const Training = () => {
//   const navigate = useNavigate();

//   const [completedSteps, setCompletedSteps] = useState(new Set());
//   const handleStepClick = (stepIndex: unknown) => {
//     setCompletedSteps((prev) => new Set(prev).add(stepIndex));
//   };
//   // Check if all steps are completed
//   const allCompleted = completedSteps.size === data.length;

//   const handleLogout = () => {
//     navigate("/station-logout");
//   };

//   return (
//     <>
//       <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
//         {/* Header Section */}
//         <div className="bg-[#243C75] relative ">
//           {/* Logout Button */}
//           <div className="flex items-center gap-2 text-white bg-[#17274C] w-full justify-end p-2">
//             <button
//               onClick={handleLogout}
//               className="text-xs md:text-sm font-semibold flex items-center gap-1"
//             >
//               Log out
//               <IoLogOutOutline size={16} className="md:size-[20px]" />
//             </button>
//           </div>
//           <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="relative w-full md:w-auto">
//               <img className="w-24 md:w-40" src={belt} alt="Belt icon" />
//               {/* Text centered above image on all screens */}
//               <div className="text-white text-lg   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full  whitespace-nowrap flex justify-between">
//                 <div className="gap-2 flex flex-col">
//                   <p className="text-3xl 2xl:text-5xl font-semibold">
//                     {" "}
//                     tdriver GMT800 single
//                   </p>
//                   <div className="flex gap-4">
//                     <p className="md:text-xl font-semibold"> 1001</p>
//                     <p className=" "> january 13 ,2025</p>
//                   </div>
//                   <div className="flex gap-4">
//                     <p className="md:text-xl font-semibold "> 1002</p>
//                     <p className=""> March 13 ,2025</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
//               <div>
//                 <p className="md:text-xl "> january 13 ,2025</p>
//               </div>
//               <div>
//                 <p className="md:text-2xl "> Devon Lane</p>
//               </div>

//               <div className="flex flex-col  gap-1 md:gap-2">
//                 <p className="text-sm md:text-base">Date: january 17, 2025</p>
//                 <p className=" text-sm md:text-base">Qty: 20</p>
//                 <p className=" text-sm md:text-base">Scrap Qty: 2</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="container mx-auto p-4 md:p-6 flex-grow">
//           {/* Comment and Button Section */}
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
//             <input
//               type="text"
//               placeholder="Write your comments"
//               className="border border-gray-400 py-2 px-4 rounded-md w-full placeholder-gray-400 bg-transparent text-sm md:text-base"
//             />

//             <div className="flex gap-3 w-full ">
//               <button className="bg-brand text-white px-4 md:px-8 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto">
//                 Add Picture
//               </button>

//               <button className="bg-brand text-white px-4 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto">
//                 Send
//               </button>
//             </div>
//           </div>

//           {/* Steps Section */}
//           <div className="py-4 flex flex-col gap-4">
//             {data.map((item, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleStepClick(item.index)}
//                 className={`flex flex-col md:flex-row gap-4 md:gap-20 items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer
//     ${completedSteps.has(item.index) ? "border-2 border-green-500" : ""}
//   `}
//               >
//                 <div className="w-full md:w-auto">
//                   <img
//                     className="rounded-md w-full max-w-xs md:max-w-none"
//                     src={item.img}
//                     alt={item.title}
//                   />
//                 </div>
//                 <div className="text-center md:text-left">
//                   <p className="font-semibold text-lg">{item.title}</p>
//                   <p className="text-gray-600">{item.decs}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
//             <button
//               disabled={!allCompleted} // Disable if not all completed
//               className={`px-4 py-2 rounded-md text-sm md:text-base font-semibold w-full sm:w-auto
//                 ${
//                   allCompleted
//                     ? "bg-brand text-white cursor-pointer"
//                     : "bg-gray-400 text-gray-700 cursor-not-allowed"
//                 }
//               `}
//             >
//               Complete Order
//             </button>

//             <NavLink to="/scrap-entry" className="w-full sm:w-auto">
//               <button className="bg-transparent text-brand px-4 py-2 font-semibold border-2 border-black rounded-md w-full">
//                 Scrap
//               </button>
//             </NavLink>
//           </div>
//         </div>

//         {/* Footer Section */}
//         <div className="bg-[#243C75]  bottom-0 w-full">
//           <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
//             {/* Process & Inspection Section */}
//             <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
//               <div className="flex flex-col items-center">
//                 <p className="text-sm md:text-base">Process</p>
//                 <p className="text-sm md:text-base">Inspection</p>
//               </div>

//               <div className="flex flex-col items-center">
//                 <p className="text-green-500 text-sm md:text-base">Qty</p>
//                 <p className="text-green-500 text-sm md:text-base">20</p>
//               </div>

//               <div className="flex flex-col items-center">
//                 <p className="text-red-500 text-sm md:text-base">Scrap</p>
//                 <p className="text-red-500 text-sm md:text-base">2</p>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-2 md:gap-4  justify-center">
//               {/* <NavLink to="/current-status" className="w-full sm:w-auto">
//               <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
//                 Process
//               </button>
//             </NavLink>

//             <NavLink to="/live-production" className="w-full sm:w-auto">
//               <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
//                 Employee
//               </button>
//             </NavLink>

//             <NavLink to="/live-production" className="w-full sm:w-auto">
//               <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
//                 Count
//               </button>
//             </NavLink>

//             <NavLink to="/current-quality" className="w-full sm:w-auto">
//               <button className="bg-white text-black px-3 py-1 md:px-6 md:py-2 rounded-md shadow-md hover:bg-gray-200 transition text-xs md:text-sm">
//                 Cycle
//               </button>
//             </NavLink> */}
//               <div className="flex flex-col items-center text-white">
//                 <p className="text-sm md:text-base font-semibold"> Employee</p>
//                 <p className="text-sm md:text-base">Devon Lane</p>
//               </div>
//               <div className="flex flex-col items-center text-white">
//                 <p className="text-sm md:text-base font-semibold"> Qty</p>
//                 <p className="text-sm md:text-base"> 20</p>
//               </div>
//               <div className="flex flex-col items-center text-white">
//                 <p className="text-sm md:text-base font-semibold">Cycle Time</p>
//                 <p className="text-sm md:text-base">150</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Training;

const Training = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // fetch the training/job ID

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const handleStepClick = async (stepId: string, instructionId: string) => {
    setCompletedSteps((prev) => new Set(prev).add(stepId));

    const currentTime = new Date().toISOString();

    try {
      const response = await fetch(
        `/api/production-response/${jobData.productionId}/update-step-time`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stepId,
            instructionId,
            stepstartTime: currentTime,
            stepstartEnd: currentTime,
          }),
        }
      );

      const data = await response.json();
      console.log("Step time logged:", data);
    } catch (error) {
      console.error("Failed to send step timing:", error);
    }
  };

  // This function handles step click
  // const handleStepClick = async (stepId: string, instructionId: string) => {
  //   // Mark step as completed
  //   setCompletedSteps((prev) => new Set(prev).add(stepId));

  //   // Send or use the instructionId
  //   console.log("Clicked instruction ID:", stepId);

  //   // Optional: send to backend
  //   try {
  //     const response = await fetch("/api/send-instruction", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ stepId }),
  //     });

  //     const data = await response.json();
  //     console.log("Instruction ID sent successfully:", data);
  //   } catch (error) {
  //     console.error("Error sending instructionId:", error);
  //   }
  // };
  const fetchJobDetails = async (jobId: string | undefined) => {
    try {
      setLoading(true);
      const response = await stationProcessDetail(jobId);
      const data = response?.data;
      if (data) setJobData(data);
    } catch (error: any) {
      if (error?.status === 404) {
        navigate("/station-login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate("/station-logout");
  };

  const allCompleted = jobData?.part?.WorkInstruction?.every((wi) =>
    wi.steps.every((step) => completedSteps.has(step.id))
  );

  const handleCompleteOrder = async () => {
    try {
      const response = await completeOrder(
        jobData.productionId,
        jobData.order_id,
        jobData.part_id
      );
      fetchJobDetails(id);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        fetchJobDetails(id);
      } else {
        console.error("Error completing order:", error);
      }
    }
  };

  const formatDate = (date: string | undefined) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "N/A";

  const formatTime = (timeStr: string | undefined) =>
    timeStr ? new Date(timeStr).toLocaleTimeString() : "N/A";

  useEffect(() => {
    fetchJobDetails(id);
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (!jobData)
    return (
      <div className="min-h-screen flex justify-center items-center">
        No job data found.
      </div>
    );

  const { part, order, employeeInfo, process } = jobData;

  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-[#243C75] relative">
        <div className="flex justify-end p-2 bg-[#17274C] text-white">
          <button
            onClick={handleLogout}
            className="text-xs md:text-sm font-semibold flex items-center gap-1"
          >
            Log out <IoLogOutOutline size={16} className="md:size-[20px]" />
          </button>
        </div>
        <div className="container mx-auto p-4 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative w-full md:w-auto">
            <img className="w-24 md:w-40" src={belt} alt="Belt icon" />
            <div className="absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 items-center">
              <p className="text-3xl font-semibold">{part?.partDescription}</p>
              <p className="text-lg font-semibold">{order?.orderNumber}</p>
              <p className="text-sm">{formatDate(order?.order_date)}</p>
            </div>
          </div>

          <div className="text-white flex flex-col gap-2 justify-center text-center md:text-left">
            <p className="text-xl">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
            <p>Date: {formatDate(order?.delivery_date)}</p>
            <p>Qty: {order?.productQuantity}</p>
            <p>Scrap Qty: 0</p>
          </div>
        </div>
      </div>

      {/* Comment and Buttons */}
      <div className="container mx-auto p-4 md:p-6 flex-grow">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Write your comments"
            className="border border-gray-400 py-2 px-4 rounded-md w-full text-sm"
          />
          <div className="flex gap-3 w-full">
            <button className="bg-brand text-white px-4 py-2 rounded-sm w-full md:w-auto">
              Add Picture
            </button>
            <button className="bg-brand text-white px-4 py-2 rounded-sm w-full md:w-auto">
              Send
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {part?.WorkInstruction?.flatMap((wi) =>
            wi.steps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleStepClick(step.id, wi.id)}
                className={`flex flex-col md:flex-row items-center gap-4 p-4 bg-white shadow-sm rounded-lg cursor-pointer ${
                  completedSteps.has(step.id) ? "border-2 border-green-500" : ""
                }`}
              >
                <div className="w-full md:w-auto">
                  <img
                    className="rounded-md w-full max-w-xs"
                    src={
                      step.images?.[0]?.imagePath
                        ? `${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={step.title}
                  />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-lg">{step.title}</p>
                  <p className="text-gray-600">{step.instruction}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button
            onClick={handleCompleteOrder}
            disabled={!allCompleted}
            className={`px-4 py-2 rounded-md text-sm font-semibold w-full sm:w-auto ${
              allCompleted
                ? "bg-brand text-white cursor-pointer"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Complete Order
          </button>
          <NavLink to="/scrap-entry" className="w-full sm:w-auto">
            <button className="bg-transparent text-brand px-4 py-2 font-semibold border-2 border-black rounded-md w-full">
              Scrap
            </button>
          </NavLink>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#243C75] w-full">
        <div className="container mx-auto p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-white">
          <div className="flex gap-8 flex-wrap justify-center">
            <div className="text-center">
              <p>Process</p>
              <p>{process?.processName}</p>
            </div>
            <div className="text-center text-green-500">
              <p>Qty</p>
              <p>{jobData.quantity}</p>
            </div>
            <div className="text-center text-red-500">
              <p>Scrap</p>
              <p>0</p>
            </div>
          </div>
          <div className="flex gap-8 justify-center">
            <div className="text-center">
              <p className="font-semibold">Employee</p>
              <p>{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Qty</p>
              <p>{jobData.completedQuantity}</p>
            </div>
            <div className="text-center">
              <p className="font-semibold">Cycle Time</p>
              <p>{formatTime(jobData.cycleTime)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;
