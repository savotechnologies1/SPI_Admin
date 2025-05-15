import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { addWorkinstruction } from "./https/workInstructionApi";
// import { addWorkInstruction } from "./https/workInstructionApi";

// const AddWorkInstruction = () => {
//   const [part, setSelectedPart] = useState("");
//   const [stepNumber, setStepNumber] = useState("");
//   const [workInstruction, setWorkInstruction] = useState("");
//   const [mediaType, setMediaType] = useState("image");
//   const [videoFile, setVideoFile] = useState<File | null>(null);

//   const handleSaveInstruction = () => {
//     const data = {
//        part,
//       stepNumber,
//       workInstruction,
//       mediaType,
//       videoFile,
//     }
//     console.log("dslkkkkkkkkkkkkkkkkkkk", {
//     data
//     });
//      try {
//           // addWorkInstruction(data).then();
//         } catch (error: unknown) {
//           console.log("errorerror", error);
//         }
//   };

//   const handleAddMoreSteps = () => {
//     setSelectedPart("");
//     setStepNumber("");
//     setWorkInstruction("");
//     setMediaType("image");
//     setVideoFile(null);
//   };
//   return (
//     <div className="p-7">
//       <div>
//         {" "}
//         <h1 className="font-bold text-[20px] md:text-[24px] text-black">
//           Add Work Instruction
//         </h1>
//       </div>
//       <div className="flex justify-between mt-2 items-center">
//         <div className="flex gap-4 items-center ">
//           <p
//             className={`text-xs sm:text-[14px] text-black`}
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-xs sm:text-[14px] hover:cursor-pointer">
//             Work Instruction
//           </span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-xs sm:text-[14px] hover:cursor-pointer">
//             Add Work Instruction
//           </span>
//         </div>
//       </div>
//       <div className="mt-4 bg-white p-6 w-full rounded-2xl">
//         {/* First Row: Part Description and Step Number */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6">
//           {/* Select Part Description */}
//           <div className="w-full md:w-1/2">
//             <label className="font-semibold" htmlFor="part">
//               Part Description
//             </label>
//             <select
//               id="part"
//               value={part}
//               onChange={(e) => setSelectedPart(e.target.value)}
//               className="border py-4 px-4 rounded-md w-full mt-2"
//             >
//               <option value="">Select Part</option>
//               <option value="Part 1">Part 1</option>
//               <option value="Part 2">Part 2</option>
//               <option value="Part 3">Part 3</option>
//             </select>
//           </div>

//           {/* Step Number */}
//           <div className="w-full md:w-1/2">
//             <label className="font-semibold" htmlFor="stepNumber">
//               Step No.
//             </label>
//             <input
//               type="number"
//               id="stepNumber"
//               value={stepNumber}
//               onChange={(e) => setStepNumber(e.target.value)}
//               className="border py-4 px-4 rounded-md w-full mt-2"
//               placeholder="Enter step number"
//             />
//           </div>
//         </div>

//         {/* Second Row: Work Instruction */}
//         <div className="mb-6">
//           <label className="font-semibold" htmlFor="workInstruction">
//             Work Instruction (Describe Steps)
//           </label>
//           <textarea
//             id="workInstruction"
//             value={workInstruction}
//             onChange={(e) => setWorkInstruction(e.target.value)}
//             className="border py-4 px-4 rounded-md w-full mt-2"
//             placeholder="Describe the work instructions here..."
//             rows={6}
//           />
//         </div>

//         {/* Third Row: Image or Video Upload */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           {/* Image/Video Selection */}
//           <div className="w-full sm:w-1/2">
//             <label className="font-semibold" htmlFor="mediaType">
//               Image of Work Instruction
//             </label>
//             <input
//               type="file"
//               id="videoFile"
//               accept="video/mp4, video/mkv, video/mpeg4"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   setVideoFile(e.target.files[0]);
//                 }
//               }}
//               className="border py-4 px-4 rounded-md w-full mt-2"
//             />
//           </div>

//           {/* Upload Video */}

//           <div className="w-full sm:w-1/2">
//             <label className="font-semibold" htmlFor="videoFile">
//               Upload Video
//             </label>
//             <input
//               type="file"
//               id="videoFile1"
//               accept="video/mp4, video/mkv, video/mpeg4"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   setVideoFile(e.target.files[0]);
//                 }
//               }}
//               className="border py-4 px-4 rounded-md w-full mt-2"
//             />
//             <small className="text-red-700 mt-2 block">
//               We support MP4, MKV, MPEG4, etc.
//             </small>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex  gap-4">
//           {/* Save Work Instruction Button */}
//           <button
//             onClick={handleSaveInstruction}
//             className="bg-brand text-white px-5 py-3 rounded-lg"
//           >
//             Save Work Instruction
//           </button>
//         </div>
//       </div>
//       {/* Add More Steps Button */}
//       <button
//         onClick={handleAddMoreSteps}
//         className="bg-brand text-white px-5 py-3 rounded-lg mt-10"
//       >
//         Add More Steps
//       </button>
//     </div>
//   );
// };

// export default AddWorkInstruction;
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

  const instructionId = localStorage.getItem('instructionId')
  // Save individual step
  const handleSaveInstruction = async(index) => {
    const stepToSave = steps[index];
    const data = {
      ...stepToSave,instructionId
    }
    const response = await addWorkinstruction(data)
    console.log("Saving step", index, response);
    // Your API call or save logic here for stepToSave
  };

  return (
    <div>
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
          <div className="mb-6">
            <label className="font-semibold">Upload Video (Optional)</label>
            <input
              type="file"
              accept="video/mp4, video/mkv, video/mpeg4"
              onChange={(e) =>
                e.target.files && handleChange(index, "videoFile", e.target.files[0])
              }
              className="border py-4 px-4 rounded-md w-full mt-2"
            />
          </div>

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

