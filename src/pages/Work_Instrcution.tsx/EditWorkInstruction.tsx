import { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  editWorkInstruction,
  workInstructionDetail,
} from "./https/workInstructionApi";
import { useForm } from "react-hook-form";

type FormData = {
  id: string;
  part: string;
  stepNumber: string;
  workInstruction: string;
  workInstructionImg: FileList;
  workInstructionVideo: FileList;
};

const EditWorkInstruction = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      part: "",
      stepNumber: "",
      workInstruction: "",
    },
  });

  const navigate = useNavigate();
  const fetchProcessDetail = async () => {
    try {
      const response = await workInstructionDetail(id);
      const data = response.data;
      reset({
        part: data.part,
        stepNumber: data.stepNumber,
        workInstruction: data.workInstruction,
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetchProcessDetail();
  }, [id]);

  const onSubmit = async (formData: FormData) => {
    try {
      const payload = {
        part: formData.part,
        stepNumber: formData.stepNumber,
        workInstruction: formData.workInstruction,
        workInstructionImg: formData.workInstructionImg?.[0] || null,
        workInstructionVideo: formData.workInstructionVideo?.[0] || null,
      };

      const response = await editWorkInstruction(payload, id);
      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log("edit work instruction errror ", error);
    }
  };

  const breadcrumbs = [
    { path: "/dashboardDetailes", label: "Dashboard" },
    { label: "Work Instruction" },
    { label: "Edit Work Instruction" },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-xl sm:text-2xl text-black">
          Edit Work Instruction
        </h1>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center mt-2 gap-2">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.path ? (
              <NavLink
                to={item.path}
                className="text-xs sm:text-sm text-black hover:underline"
              >
                {item.label}
              </NavLink>
            ) : (
              <span className="text-xs sm:text-sm cursor-default">
                {item.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <FaCircle className="text-[6px] text-gray-500" />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm"
      >
        {/* First Row: Part and Step Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2" htmlFor="part">
              Part Description
            </label>
            <select
              id="part"
              {...register("part", { required: "Part is required" })}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Part</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={`Part ${num}`}>
                  Part {num}
                </option>
              ))}
            </select>
            {errors.part && (
              <p className="text-red-500 text-sm">{errors.part.message}</p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="stepNumber">
              Step No.
            </label>
            <input
              type="number"
              id="stepNumber"
              {...register("stepNumber", {
                required: "Step number is required",
                min: 1,
              })}
              className="w-full p-3 border rounded-md"
              placeholder="Enter step number"
            />
            {errors.stepNumber && (
              <p className="text-red-500 text-sm">
                {errors.stepNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Work Instruction Textarea */}
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="workInstruction">
            Work Instruction (Describe Steps)
          </label>
          <textarea

            id="workInstruction"
            {...register("workInstruction", {
              required: "Description is required",
            })}
            className="w-full p-3 border rounded-md"
            placeholder="Describe the work instructions here..."
            rows={6}
          />
          {errors.workInstruction && (
            <p className="text-red-500 text-sm">
              {errors.workInstruction.message}
            </p> 
          )}
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              className="block font-semibold mb-2"
              htmlFor="workInstructionImg"
            >
              Image of Work Instruction
            </label>
            <input
              type="file"
              id="workInstructionImg"
              accept="image/*"
              {...register("workInstructionImg")}
              className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label
              className="block font-semibold mb-2"
              htmlFor="workInstructionVideo"
            >
              Upload Video
            </label>
            <input
              type="file"
              id="workInstructionVideo"
              accept="video/mp4,video/mkv,video/mpeg4"
              {...register("workInstructionVideo")}
              className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand hover:file:bg-blue-100"
            />
            <small className="text-red-700 mt-2 block">
              We support MP4, MKV, MPEG4, etc.
            </small>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-brand text-white px-5 py-3 rounded-lg transition-colors"
        >
          Save 
        </button>
      </form>
    </div>
  );
};

export default EditWorkInstruction;

