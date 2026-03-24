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
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
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
interface WorkInstructionStep {
  id: string;
  title: string;
  instruction: string;
  images: { imagePath: string }[];
  videos?: { videoPath: string }[];
}
interface JobData {
  productionId: string;
  order_id: string;
  part_id: string;
  order_date: string;
  delivery_date: string;
  upcommingOrder: string;
  workInstructionSteps: WorkInstructionStep[];
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

const formatCycleTime = (dateString) => {
  if (!dateString) return "N/A";

  try {
    const startTime = new Date(dateString);
    if (isNaN(startTime.getTime())) {
      return "Invalid Time";
    }

    const now = new Date();
    const diffMs = now - startTime;

    // Total minutes nikaalein
    const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

    // 1. Agar 24 ghante (1440 min) se zyada hai
    if (totalMinutes >= 1440) {
      const days = Math.floor(totalMinutes / 1440);
      const remainingMinutesAfterDays = totalMinutes % 1440;
      const hours = Math.floor(remainingMinutesAfterDays / 60);
      const mins = remainingMinutesAfterDays % 60;

      let result = `${days} day${days > 1 ? "s" : ""}`;
      if (hours > 0) result += ` ${hours} hr`;
      if (mins > 0) result += ` ${mins} min`;

      return result;
    }

    // 2. Agar 1 ghante (60 min) se zyada hai
    else if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;

      if (mins === 0) {
        return `${hours} hr`;
      } else {
        return `${hours} hr ${mins} min`;
      }
    }

    // 3. Agar sirf minutes hain
    else {
      return `${totalMinutes} min`;
    }
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
  const [activeVideo, setActiveVideo] = useState(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const formatTotalDuration = (startTimeString: string | undefined) => {
    if (!startTimeString) return "0 min";

    try {
      const start = new Date(startTimeString).getTime();
      const now = new Date().getTime();
      const diffMs = now - start;
      const totalMinutes = Math.max(0, Math.floor(diffMs / (1000 * 60)));

      if (totalMinutes < 60) {
        return `${totalMinutes} min`;
      } else {
        const hours = Math.floor(totalMinutes / 60);
        const remainingMinutes = totalMinutes % 60;

        return remainingMinutes > 0
          ? `${hours} hr ${remainingMinutes} min`
          : `${hours} hr`;
      }
    } catch (error) {
      return "N/A";
    }
  };
  useEffect(() => {
    if (!jobData?.cycleTime) {
      setElapsedTime("00:00:00");
      return;
    }

    const timer = setInterval(() => {
      const start = new Date(jobData.cycleTime).getTime();
      const now = new Date().getTime();
      const diffInSeconds = Math.max(0, Math.floor((now - start) / 1000));

      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;

      const formatted =
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

      setElapsedTime(formatted);
    }, 1000);

    return () => clearInterval(timer);
  }, [jobData?.cycleTime]);

  const fetchJobDetails = async (jobId: string | undefined) => {
    if (!jobId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const stationUserId = localStorage.getItem("stationUserId");
      const response = await stationProcessDetail(jobId, stationUserId);

      if (response?.data) {
        setJobData(response.data);
      }
    } catch (error: any) {
      console.error("Fetch Error:", error);

      // AGAR KOI BHI ERROR AAYE (400 - Child pending, ya 404 - No Job)
      // Toh seedha logout karke bhej do login page par
      localStorage.removeItem("stationUserId"); // User ID clear karein
      navigate("/station-login"); // Login page par bhej dein
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchJobDetails(id);
  }, [id, navigate]);

  const [isCompleting, setIsCompleting] = useState(false);
  const handleCompleteOrder = async () => {
    if (!jobData || isCompleting) return;
    setIsCompleting(true);
    try {
      const stationUserId = jobData.employeeInfo?.id;
      const currentPartId = jobData.part_id || jobData.customPartId;
      const parentProductId = jobData.order?.partId || jobData.productId;

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
  const {
    part,
    order,
    employeeInfo,
    process,
    upcommingParts,
    upcommingOrder,
    order_date,
  } = jobData;

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
        <div className="container  p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative flex flex-col ">
            {/* Process name */}

            {/* Belt image and table container */}
            <div className="relative w-full max-w-xl mx-auto">
              <div className="w-full  mb-8 sm:mb-8 md:mb-8">
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold break-words leading-snug text-white px-2">
                  Process Name :
                  <span className="text-md font-medium">
                    {part?.process?.processName || jobData.process.processName}{" "}
                    ({" "}
                    {part?.process?.machineName || jobData.process.machineName})
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

                  {step.videos?.length > 0 && (
                    <div
                      className="relative w-40 h-40 bg-black rounded-md overflow-hidden cursor-pointer group border"
                      onClick={() =>
                        setActiveVideo(
                          `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
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
                      <span className="absolute bottom-2 left-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded">
                        Click to Play
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
              No instructions available for this part.
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

              <p className="text-sm md:text-base font-bold text-white">
                {formatCycleTime(jobData?.cycleTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {activeVideo && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
          <div
            className="absolute inset-0"
            onClick={() => setActiveVideo(null)}
          ></div>

          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl z-10">
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-end items-center bg-gradient-to-b from-black/70 to-transparent z-20">
              <button
                onClick={() => setActiveVideo(null)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
              >
                <IoClose size={30} />
              </button>
            </div>

            <div className="aspect-video w-full flex items-center justify-center">
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
        </div>
      )}
    </div>
  );
};
export default RunSchedule;
