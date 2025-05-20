import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { addWorkinstruction } from "./https/workInstructionApi";

export default function AddWorkInstruction() {
  const [steps, setSteps] = useState([
    { part: "", stepNumber: "", workInstruction: "", videoFile: null },
  ]);

  const handleChange = (index, field, value) => {
    const newSteps = [...steps];
    newSteps[index][field] = value;
    setSteps(newSteps);
  };

  const handleAddMoreSteps = () => {
    setSteps([
      ...steps,
      { part: "", stepNumber: "", workInstruction: "", videoFile: null },
    ]);
  };

  const instructionId = localStorage.getItem("instructionId");
  const handleSaveInstruction = async (index) => {
    const stepToSave = steps[index];
    const data = {
      ...stepToSave,
      instructionId,
    };
    const response = await addWorkinstruction(data);
    console.log(response?.status);
  };
  const breadcrumbs = [
    { path: "/dashboardDetailes", label: "Dashboard" },
    { label: "Work Instruction" },
    { label: "Add Work Instruction" },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-xl sm:text-2xl text-black">
          Add Work Instruction
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

      {steps.map((step, index) => (
        <div key={index} className="mt-4 bg-white p-6 w-full rounded-2xl">
          {/* Part and Step Number */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-1/2">
              <label className="font-semibold">Part Description</label>
              <select
                value={step.part}
                onChange={(e) => handleChange(index, "part", e.target.value)}
                className="border py-4 px-4 rounded-md w-full mt-2"
              >
                <option value="">Select Part</option>
                <option value="Part 1">Part 1</option>
                <option value="Part 2">Part 2</option>
                <option value="Part 3">Part 3</option>
              </select>
            </div>
            <div className="w-full md:w-1/2">
              <label className="font-semibold">Step No.</label>
              <input
                type="number"
                value={step.stepNumber}
                onChange={(e) =>
                  handleChange(index, "stepNumber", e.target.value)
                }
                className="border py-4 px-4 rounded-md w-full mt-2"
                placeholder="Enter step number"
              />
            </div>
          </div>

          {/* Work Instruction */}
          <div className="mb-6">
            <label className="font-semibold">Work Instruction</label>
            <textarea
              value={step.workInstruction}
              onChange={(e) =>
                handleChange(index, "workInstruction", e.target.value)
              }
              className="border py-4 px-4 rounded-md w-full mt-2"
              placeholder="Describe the work instruction here..."
              rows={6}
            />
          </div>

          {/* Media Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block font-semibold mb-2" htmlFor="imageFile">
                Image of Work Instruction
              </label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                onChange={(e) =>
                  e.target.files &&
                  handleChange(index, "workInstructionImg", e.target.files[0])
                }
                className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand hover:file:bg-blue-100"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2" htmlFor="videoFile">
                Upload Video
              </label>
              <input
                type="file"
                id="videoFile"
                accept="video/mp4,video/mkv,video/mpeg4"
                onChange={(e) =>
                  e.target.files &&
                  handleChange(index, "workInstructionVideo", e.target.files[0])
                }
                className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand hover:file:bg-blue-100"
              />
              <small className="text-red-700 mt-2 block">
                We support MP4, MKV, MPEG4, etc.
              </small>
            </div>
          </div>
          {/* <div className="mb-6">
            <label className="font-semibold">Upload Video (Optional)</label>
            <input
              type="file"
              accept="video/mp4, video/mkv, video/mpeg4"
              onChange={(e) =>
                e.target.files && handleChange(index, "workInstructionVideo", e.target.files[0])
              }
              className="border py-4 px-4 rounded-md w-full mt-2"
            />
          </div> */}

          {/* Save button only for this step */}
          <button
            onClick={() => handleSaveInstruction(index)}
            className="bg-brand text-white px-5 py-3 rounded-lg"
          >
            Save Instruction
          </button>
        </div>
      ))}

      {/* Add More Steps button */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleAddMoreSteps}
          className="bg-gray-500 text-white px-5 py-3 rounded-lg"
        >
          Add More Steps
        </button>
      </div>
    </div>
  );
}
