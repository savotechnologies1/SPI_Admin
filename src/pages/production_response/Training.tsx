import { IoClose, IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  completeTraningApi,
  stationTrainingProcessDetail,
  updateStepTime,
} from "./https/productionResponseApi";
import belt from "../../assets/belt-solid.png";
import { FaPlay, FaSpinner } from "react-icons/fa";
const BASE_URL =
  (import.meta as any).env.VITE_SERVER_URL || "http://localhost:5000";

interface Image {
  imagePath: string;
}

interface Video {
  videoPath: string;
}

interface Step {
  id: string;
  title: string;
  instruction: string;
  images: Image[];
  videos?: Video[];
  stepNumber: number;
}

interface JobData {
  productionId: string;
  processName: string;
  employeeName: string;
  partNumber: string;
  cycleTime: string;
  workInstructionSteps: Step[];
  incomingJobs?: Array<{ partNumber: string }>;
  process?: {
    machineName: string;
  };
}

const Training = () => {
  const navigate = useNavigate();
  const { id: processId } = useParams<{ id: string }>();

  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const getUserId = (): string | null => {
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

  const formatDisplayDate = (dateString: string | undefined): string => {
    if (!dateString) return "Not Available";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatCycleTime = (dateString: string | undefined) => {
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

  const fetchJobDetails = useCallback(async () => {
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
        localStorage.removeItem("stationUserId");
        navigate("/station-login");
        return;
      }

      if (response?.data) {
        setJobData(response.data);
        setCompletedSteps(new Set());
        window.scrollTo(0, 0);
      } else {
        navigate("/station-login");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      navigate("/station-login");
    } finally {
      setLoading(false);
    }
  }, [processId, stationUserId, navigate]);

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

  const handleCompleteTraining = async () => {
    if (!jobData?.productionId || !processId || !stationUserId) return;

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
  }, [fetchJobDetails]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-2xl text-blue-600" />
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
                          {formatDisplayDate(new Date().toISOString())}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white px-2 py-1 text-xs sm:text-sm font-bold">
                          {incomingPart}
                        </td>
                        <td className="text-xs font-mono font-bold px-2 py-0.5 rounded">
                          Not Available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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

      <div className="container mx-auto p-4 md:p-6 flex-grow max-w-6xl">
        <div className="py-4 flex flex-col gap-4">
          {allSteps.map((step, index) => (
            <div
              key={step.id || index}
              onClick={() => handleStepClick(step.id)}
              className={`flex flex-col md:flex-row gap-4 md:gap-6 items-start bg-white rounded-lg shadow-sm p-4 border-2 transition-all cursor-pointer
                ${completedSteps.has(step.id) ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-blue-500"}
              `}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full font-bold 
                ${completedSteps.has(step.id) ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"}`}
              >
                {index + 1}
              </div>

              <div className="flex flex-wrap gap-3 flex-shrink-0">
                {step.images && step.images.length > 0 && (
                  <img
                    className="rounded-md w-32 h-32 md:w-40 md:h-40 object-cover border shadow-sm"
                    src={`${BASE_URL}/uploads/workInstructionImg/${step.images[0].imagePath}`}
                    alt={step.title}
                  />
                )}
                {step.videos && step.videos.length > 0 && (
                  <div
                    className="relative w-32 h-32 md:w-40 md:h-40 bg-black rounded-md overflow-hidden group border"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (step.videos) {
                        setActiveVideo(
                          `${BASE_URL}/uploads/workInstructionVideo/${step.videos[0].videoPath}`,
                        );
                      }
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
