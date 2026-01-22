import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  selecEmployeeProcessApi,
  stationLogin,
} from "./https/productionResponseApi";
import { toast } from "react-toastify";

type SubmitType = "run_schedule" | "run_with_scan" | "training";
const StationLogin = () => {
  const navigate = useNavigate();
  const [emoloyeeProcess, setEmployeeProcess] = useState<any | null>(null);
  const submitTypeRef = useRef<SubmitType>("run_schedule");

  useEffect(() => {
    fetchEmployeeProcess();
  }, []);

  const fetchEmployeeProcess = async () => {
    try {
      const response = await selecEmployeeProcessApi();
      setEmployeeProcess(response || null);
    } catch (error) {
      toast.error("Failed to fetch login data");
      console.error("Failed to fetch process:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      processId: "",
      stationUserId: "",
    },
    validationSchema: Yup.object({
      processId: Yup.string().required("Station/Process is required"),
      stationUserId: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      const type = submitTypeRef.current;
      const selectedProcess = emoloyeeProcess?.processOverviews?.find(
        (p: any) => p.processId === values.processId,
      );
      const partId = selectedProcess?.nextJob?.partId || null;
      const data = {
        processId: values.processId,
        stationUserId: values.stationUserId,
        type: type,
        partId: partId,
      };

      try {
        const response = await stationLogin(data);
        if (response && response.status === 200) {
          localStorage.setItem("stationUserId", values.stationUserId);
          toast.success("Login Successful!");
          switch (type) {
            case "run_schedule":
              navigate(`/run-schedule/${values.processId}`);
              break;
            case "run_with_scan":
              navigate(`/run-with-scan/${values.processId}`);
              break;
            case "training":
              navigate(`/training/${values.processId}`);
              break;
            default:
              navigate("/");
          }
        }
      } catch (error) {
        toast.error(
          "An unexpected error occurred. Please check your connection.",
        );
      }
    },
  });

  return (
    <div className="bg-[#F5F6FA]">
      <div className="justify-between flex flex-row items-center px-4 py-2"></div>
      <button
        type="button"
        onClick={() => navigate("/dashboardDetailes")}
        className="flex items-center justify-start ml-7 py-2 rounded-md hover:bg-gray-100 transition font-bold w-auto"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Station / Process Login
          </h1>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Station</label>
              <select
                name="processId"
                value={formik.values.processId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 p-3 border rounded-md ${
                  formik.touched.processId && formik.errors.processId
                    ? "border-red-500"
                    : ""
                }`}
              >
                <option value="">Select Process Name</option>
                {emoloyeeProcess && emoloyeeProcess.processOverviews ? (
                  emoloyeeProcess.processOverviews.map((process: any) => (
                    <option key={process.processId} value={process.processId}>
                      {`${process.processName}`} ({`${process.machineName}`})
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading...
                  </option>
                )}
              </select>
              {formik.touched.processId && formik.errors.processId && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.processId}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <select
                id="stationUserId"
                name="stationUserId"
                value={formik.values.stationUserId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 p-3 border rounded-md ${
                  formik.touched.stationUserId && formik.errors.stationUserId
                    ? "border-red-500"
                    : ""
                }`}
              >
                <option value="">Select a User</option>
                {emoloyeeProcess && emoloyeeProcess.stationUsers ? (
                  emoloyeeProcess.stationUsers.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {`${user.name} (${user.email})`}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    Loading...
                  </option>
                )}
              </select>
              {formik.touched.stationUserId && formik.errors.stationUserId && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.stationUserId}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-3 pt-4">
              <button
                type="submit"
                onClick={() => (submitTypeRef.current = "run_schedule")}
                className="w-full bg-brand text-white py-2 rounded-md transition"
              >
                Run Schedule
              </button>

              <div className="flex justify-between gap-2">
                <button
                  type="submit"
                  onClick={() => (submitTypeRef.current = "run_with_scan")}
                  className="w-full bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white py-2 rounded-md transition"
                >
                  Run With Scan
                </button>

                <button
                  type="submit"
                  onClick={() => (submitTypeRef.current = "training")}
                  className="w-full bg-gradient-to-r from-[#FFAC82] to-[#FF5630] text-white py-2 rounded-md transition"
                >
                  Training
                </button>
              </div>

              <NavLink to="/scrap-entry">
                <button
                  type="button"
                  className="w-full flex items-center justify-center border border-gray-300 py-2 mt-6 rounded-md hover:bg-gray-100 transition font-bold"
                >
                  Scrap Entry <FaChevronRight className="ml-2 " />
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StationLogin;
