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
      await axiosInstance.post(
        `${BASE_URL}/api/admin/scan-complete/${jobData.productionId}`,
        {
          orderId: jobData.order_id,
          partId: jobData.part_id,
          employeeId: jobData.employeeInfo.id,
          order_type: jobData.order_type,
        },
      );
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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["input", "textarea"].includes(target.tagName.toLowerCase())) return;

      const currentTime = Date.now();

      if (currentTime - lastKeyTime.current > 100) {
        scanRef.current = "";
      }
      lastKeyTime.current = currentTime;
      if (event.key === "Enter") {
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

          <div className="flex flex-col md:items-end justify-center h-full space-y-4">
            <h2 className="text-2xl font-semibold">Shop floor</h2>
            <div className="text-xs space-y-1 text-left md:text-left min-w-[150px]">
              <p>
                <span className="opacity-70">Date:</span>
                {formatDate(jobData.delivery_date)}
              </p>
              <p>
                <span className="opacity-70">Qty:</span>
                {jobData.employeeCompletedQty}
              </p>
              <p>
                <span className="opacity-70">Scrap Qty:</span>
                {jobData.employeeScrapQty}
              </p>
              <p>
                <span className="opacity-70">Order Type:</span>
                {jobData.order_type}
              </p>
            </div>
          </div>
        </div>
      </div>

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
