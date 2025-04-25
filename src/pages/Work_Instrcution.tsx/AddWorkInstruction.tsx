import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AddWorkInstruction = () => {
  const [selectedPart, setSelectedPart] = useState("");
  const [stepNumber, setStepNumber] = useState("");
  const [workInstruction, setWorkInstruction] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleSaveInstruction  = () => {
    console.log({
      selectedPart,
      stepNumber,
      workInstruction,
      mediaType,
      videoFile,
    });
  };

  const handleAddMoreSteps = () => {
    setSelectedPart("");
    setStepNumber("");
    setWorkInstruction("");
    setMediaType("image");
    setVideoFile(null);
  };
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Add Work Instruction
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px] hover:cursor-pointer">
            Work Instruction
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px] hover:cursor-pointer">
            Add Work Instruction
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl">
      {/* First Row: Part Description and Step Number */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Select Part Description */}
        <div className="w-full md:w-1/2">
          <label className="font-semibold" htmlFor="part">
            Part Description
          </label>
          <select
            id="part"
            value={selectedPart}
            onChange={(e) => setSelectedPart(e.target.value)}
            className="border py-4 px-4 rounded-md w-full mt-2"
          >
            <option value="">Select Part</option>
            <option value="Part 1">Part 1</option>
            <option value="Part 2">Part 2</option>
            <option value="Part 3">Part 3</option>
          </select>
        </div>

        {/* Step Number */}
        <div className="w-full md:w-1/2">
          <label className="font-semibold" htmlFor="stepNumber">
            Step No.
          </label>
          <input
            type="number"
            id="stepNumber"
            value={stepNumber}
            onChange={(e) => setStepNumber(e.target.value)}
            className="border py-4 px-4 rounded-md w-full mt-2"
            placeholder="Enter step number"
          />
        </div>
      </div>

      {/* Second Row: Work Instruction */}
      <div className="mb-6">
        <label className="font-semibold" htmlFor="workInstruction">
          Work Instruction (Describe Steps)
        </label>
        <textarea
          id="workInstruction"
          value={workInstruction}
          onChange={(e) => setWorkInstruction(e.target.value)}
          className="border py-4 px-4 rounded-md w-full mt-2"
          placeholder="Describe the work instructions here..."
          rows={6}
        />
      </div>

      {/* Third Row: Image or Video Upload */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Image/Video Selection */}
        <div className="w-full sm:w-1/2">
          <label className="font-semibold" htmlFor="mediaType">
          Image of Work Instruction
          </label>
          <input
              type="file"
              id="videoFile"
              accept="video/mp4, video/mkv, video/mpeg4"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setVideoFile(e.target.files[0]);
                }
              }}
              className="border py-4 px-4 rounded-md w-full mt-2"
            />
        </div>

        {/* Upload Video */}
    
          <div className="w-full sm:w-1/2">
            <label className="font-semibold" htmlFor="videoFile">
              Upload Video
            </label>
            <input
              type="file"
              id="videoFile1"
              accept="video/mp4, video/mkv, video/mpeg4"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setVideoFile(e.target.files[0]);
                }
              }}
              className="border py-4 px-4 rounded-md w-full mt-2"
            />
            <small className="text-red-700 mt-2 block">
              We support MP4, MKV, MPEG4, etc.
            </small>
          </div>
      
      </div>

      {/* Action Buttons */}
      <div className="flex  gap-4">
        {/* Save Work Instruction Button */}
        <button
          onClick={handleSaveInstruction}
          className="bg-brand text-white px-5 py-3 rounded-lg"
        >
          Save Work Instruction
        </button>

       
      </div>
    </div>
     {/* Add More Steps Button */}
     <button
          onClick={handleAddMoreSteps}
          className="bg-brand text-white px-5 py-3 rounded-lg mt-10"
        >
          Add More Steps
        </button>
    </div>
  );
};

export default AddWorkInstruction;
