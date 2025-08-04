import belt from "../../assets/belt-solid.png";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  completeTraningApi,
  stationProcessDetail,
  updateStepTime,
} from "./https/productionResponseApi";
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

  const [jobData, setJobData] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleStepClick = async (stepId: string) => {
    if (!jobData) return;

    setCompletedSteps((prev) => new Set(prev).add(stepId));

    try {
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

  const allCompleted =
    jobData?.part?.WorkInstruction?.every((wi) =>
      wi.steps.every((step) => completedSteps.has(step.id))
    ) ?? false;

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
      <div className="min-h-screen flex justify-center items-center">
        No job data found.
      </div>
    );
  }

  const formatCycleTime = (dateString) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Invalid Time";
      }
      return date.toLocaleTimeString("en-US");
    } catch (error) {
      console.error("Could not format cycle time:", dateString, error);
      return "N/A";
    }
  };
  const { part, order, employeeInfo, process, upcommingOrder } = jobData;

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
        <div className="container mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-auto">
            <img className="w-24 md:w-40" src={belt} alt="Belt icon" />
            <div className="text-white text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full whitespace-nowrap flex justify-between">
              <div className="gap-2 flex flex-col">
                <p className="text-3xl 2xl:text-5xl font-semibold">
                  {part?.partDescription || "No Description"}
                </p>
                <div className="flex gap-4">
                  <p className="md:text-xl font-semibold">
                    {order?.orderNumber}
                  </p>
                  <p className=" ">{formatDate(jobData.order_date)}</p>
                </div>
                <div className="flex gap-4">
                  <p className="md:text-xl font-semibold ">Upcoming : </p>
                  <p className="">{formatDate(upcommingOrder)}</p>
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

        <div className="flex flex-col gap-4">
          {part?.WorkInstruction?.flatMap((wi) =>
            wi.steps.map((step) => (
              <div
                key={step.id}
                onClick={() => handleStepClick(step.id)}
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
            Complete Training
          </button>
          <NavLink to="/scrap-entry" className="w-full sm:w-auto">
            <button className="bg-transparent text-brand px-4 py-2 font-semibold border-2 border-black rounded-md w-full">
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
                {jobData.quantity}
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
              <p className="text-sm md:text-base">{jobData.completedQty}</p>
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

export default Training;
