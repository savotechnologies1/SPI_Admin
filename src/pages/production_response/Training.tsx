import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  completeTraningApi,
  stationProcessDetail,
  updateStepTime,
} from "./https/productionResponseApi";
import CommentBox from "./CommentBox";
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
  id: string;
  steps: Step[];
}

interface Part {
  partDescription: string;
  WorkInstruction: WorkInstruction[];
}

interface Order {
  orderNumber: string;
  order_date: string;
  delivery_date: string;
  productQuantity: number;
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
  part: Part;
  order: Order;
  employeeInfo: EmployeeInfo;
  process: Process;
  quantity: number;
  completedQuantity: number;
  cycleTime: string;
}

const Training = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log("idid", id);
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const allSteps =
    jobData?.part?.WorkInstruction?.flatMap((wi) => wi.steps) || [];

  // Check if all steps are selected

  const handleStepClick = async (stepId: string) => {
    if (!jobData) return;

    // UI update
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      newSet.add(stepId);
      return newSet;
    });

    try {
      // Backend call
      await updateStepTime(jobData.productionId, stepId);
    } catch (error) {
      console.error("Failed to update step time", error);
    }
  };
  const fetchJobDetails = async (jobId: string | undefined) => {
    if (!jobId) {
      setLoading(false);
      navigate("/station-login");
      return;
    }
    console.log("jobIdjobId", jobId);
    const stationUserId = localStorage.getItem("stationUserId");
    try {
      setLoading(true);
      const response = await stationProcessDetail(jobId, stationUserId);
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

  const allCompleted =
    allSteps.length > 0 && completedSteps.size === allSteps.length;

  const handleCompleteOrder = async () => {
    if (!jobData) return;

    try {
      const response = await completeTraningApi(jobData.productionId);
      fetchJobDetails(id);
      if (response?.status === 200) {
        navigate("/station-login");
      }
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
    timeStr ? new Date(`1970-01-01T${timeStr}Z`).toLocaleTimeString() : "N/A";

  useEffect(() => {
    fetchJobDetails(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p>No any traning available.</p>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand"
        >
          Go Back to station login
        </button>
      </div>
    );
  }
  const formatCycleTime = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const startTime = new Date(dateString);
      if (isNaN(startTime.getTime())) {
        return "Invalid Time";
      }
      const now = new Date();
      const diffMs = now - startTime;
      const diffMinutes = Math.floor(diffMs / (1000 * 60));

      return `${diffMinutes} min`;
    } catch (error) {
      console.error("Could not format cycle time:", dateString, error);
      return "N/A";
    }
  };
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
  // const rows = [
  //   { part: part.partNumber, date: order_date },
  //   { part: upcommingParts, date: upcommingOrder },
  // ];
  const rows = [
    { part: part?.partNumber || part?.partDescription, date: order_date },
  ];
  return (
    <div className="bg-[#F5F6FA] min-h-screen flex flex-col">
      <div className="bg-[#243C75] relative">
        <div className="flex justify-end p-2 bg-[#17274C] text-white">
          <button
            onClick={handleLogout}
            className="text-xs md:text-sm font-semibold flex items-center gap-1"
          >
            Log out <IoLogOutOutline size={16} className="md:size-[20px]" />
          </button>
        </div>
        <div className="container p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full max-w-xl mx-auto">
            <div className="w-full  mb-8 sm:mb-8 md:mb-8">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold break-words leading-snug text-white px-2">
                Process Name :
                <span className="text-md font-medium">
                  {part?.process.processName || "No Available"}
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
                          {row.part}
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
          <div className="text-white flex gap-4 md:gap-20 flex-wrap justify-center">
            <div>
              <p className="md:text-2xl ">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
            </div>
            <div className="flex flex-col  gap-1 md:gap-2">
              <p className="text-sm md:text-base">
                Date: {formatDate(jobData.delivery_date)}
              </p>
              <p className=" text-sm md:text-base">
                Qty: {jobData.completedQty}
              </p>
              <p className=" text-sm md:text-base">
                Scrap Qty: {jobData.scrapQty}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-6 flex-grow">
        <CommentBox employeeInfo={employeeInfo} />

        <div className="py-4 flex flex-col gap-4">
          {allSteps.map((step, index) => (
            <div
              key={step.id || index}
              onClick={() => handleStepClick(step.id)} // Card click logic
              className={`flex flex-col md:flex-row gap-4 md:gap-20 items-center bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all
                ${
                  completedSteps.has(step.id)
                    ? "border-2 border-green-500 bg-green-50"
                    : "border-2 border-transparent"
                }
              `}
            >
              <div className="w-full md:w-auto">
                <img
                  className="rounded-md w-40 h-24 object-cover"
                  src={
                    step.images?.[0]
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
              {completedSteps.has(step.id) && (
                <div className="ml-auto text-green-600 font-bold">
                  ✓ Selected
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col items-center gap-3 mt-6">
          <button
            onClick={handleCompleteOrder}
            disabled={!allCompleted}
            className={`px-10 py-3 rounded-md font-bold transition-all ${
              allCompleted
                ? "bg-green-600 text-white cursor-pointer shadow-lg"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Complete Training
          </button>
        </div>
      </div>

      <div className="bg-[#243C75]  bottom-0 w-full">
        <div className="container mx-auto p-3 md:p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white flex gap-4 md:gap-10 items-center flex-wrap justify-center">
            <div className="flex flex-col items-center">
              <p className="text-sm md:text-base">Process</p>
              <p className="text-sm md:text-base">{process?.processName}</p>
            </div>
            {/* <div className="flex flex-col items-center">
              <p className="text-green-500 text-sm md:text-base">Total Qty</p>
              <p className="text-green-500 text-sm md:text-base">
                {jobData.quantity}
              </p>
            </div> */}
            {/* <div className="flex flex-col items-center">
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
            </div> */}
          </div>
          <div className="flex gap-2 md:gap-6  justify-center">
            <div className="flex flex-col items-center text-white">
              <p className="text-sm md:text-base font-semibold"> Employee</p>
              <p className="text-sm md:text-base">{`${employeeInfo?.firstName} ${employeeInfo?.lastName}`}</p>
            </div>
            {/* <div className="flex flex-col items-center text-white">
              <p className="text-sm md:text-base font-semibold"> Qty</p>
              <p className="text-sm md:text-base">{jobData.completedQty}</p>
            </div> */}
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

export default Training;
