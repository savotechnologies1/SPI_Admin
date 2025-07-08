// export default function AddWorkInstruction() {
//   const [steps, setSteps] = useState([
//     { part: "", stepNumber: "", workInstruction: "", videoFile: null },
//   ]);
//   const [fileName, setFileName] = useState("");
//   const [videoFileName, setVideoFileName] = useState("");

//   const handleChange = (index, field, value) => {
//     const newSteps = [...steps];
//     newSteps[index][field] = value;
//     setSteps(newSteps);
//   };
//   const [dataFromChild, setDataFromChild] = useState("");
//   const handleChildData = (data: SetStateAction<string>) => {
//     setDataFromChild(data); // Save the data received from child
//   };
//   console.log("dataFromChilddataFromChild111", dataFromChild);

//   const handleAddMoreSteps = () => {
//     setSteps([
//       ...steps,
//       { part: "", stepNumber: "", workInstruction: "", videoFile: null },
//     ]);
//   };

//   const instructionId = localStorage.getItem("instructionId");
//   const handleSaveInstruction = async (index) => {
//     const stepToSave = steps[index];
//     const data = {
//       ...stepToSave,
//       instructionId,
//     };

//     console.log("979797", data);
//   };
//   const breadcrumbs = [
//     { path: "/dashboardDetailes", label: "Dashboard" },
//     { label: "Work Instruction" },
//     { label: "Add Work Instruction" },
//   ];
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setFileName(file.name);
//       handleChange(index, "workInstructionImg", file);
//     }
//   };

//   const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setVideoFileName(file.name);
//       handleChange(index, "workInstructionVideo", file);
//     }
//   };
//   return (
//     <div className="p-4 sm:p-6">
//       <WorkInstruction sendDataToParent={handleChildData} />
//       <div>
//         <h1 className="font-bold text-xl sm:text-2xl text-black">
//           Add Work Instruction
//         </h1>
//       </div>

//       {/* Breadcrumbs */}
//       <div className="flex items-center mt-2 gap-2">
//         {breadcrumbs.map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             {item.path ? (
//               <NavLink
//                 to={item.path}
//                 className="text-xs sm:text-sm text-black hover:underline"
//               >
//                 {item.label}
//               </NavLink>
//             ) : (
//               <span className="text-xs sm:text-sm cursor-default">
//                 {item.label}
//               </span>
//             )}
//             {index < breadcrumbs.length - 1 && (
//               <FaCircle className="text-[6px] text-gray-500" />
//             )}
//           </div>
//         ))}
//       </div>

//       {steps.map((step, index) => (
//         <div key={index} className="mt-4 bg-white p-6 w-full rounded-2xl">
//           {/* Part and Step Number */}
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="w-full md:w-1/2">
//               <label className="font-semibold">Part Description</label>
//               <select
//                 value={step.part}
//                 onChange={(e) => handleChange(index, "part", e.target.value)}
//                 className="border py-4 px-4 rounded-md w-full mt-2"
//               >
//                 <option value="">Select Part</option>
//                 <option value="Part 1">Part 1</option>
//                 <option value="Part 2">Part 2</option>
//                 <option value="Part 3">Part 3</option>
//               </select>
//             </div>
//             <div className="w-full md:w-1/2">
//               <label className="font-semibold">Step No.</label>
//               <input
//                 type="number"
//                 value={step.stepNumber}
//                 onChange={(e) =>
//                   handleChange(index, "stepNumber", e.target.value)
//                 }
//                 className="border py-4 px-4 rounded-md w-full mt-2"
//                 placeholder="Enter step number"
//               />
//             </div>
//           </div>

//           {/* Work Instruction */}
//           <div className="mb-6">
//             <label className="font-semibold">Work Instruction</label>
//             <textarea
//               value={step.workInstruction}
//               onChange={(e) =>
//                 handleChange(index, "workInstruction", e.target.value)
//               }
//               className="border py-4 px-4 rounded-md w-full mt-2"
//               placeholder="Describe the work instruction here..."
//               rows={6}
//             />
//           </div>

//           {/* Media Upload */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block font-semibold mb-2" htmlFor="imageFile">
//                 Image of Work Instruction
//               </label>
//               <div>
//                 <label
//                   htmlFor="imageFile"
//                   className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm text-gray-800 bg-[#919EAB33] border-gray-300"
//                 >
//                   {fileName ? fileName : "Tap or click to Add Picture or video"}
//                 </label>
//                 <input
//                   type="file"
//                   id="imageFile"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block font-semibold mb-2" htmlFor="videoFile">
//                 Upload Video
//               </label>
//               <div>
//                 <label
//                   htmlFor="videoFile"
//                   className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm text-gray-600 bg-white hover:bg-gray-50"
//                 >
//                   {videoFileName ? videoFileName : " Upload Video or Picture"}
//                 </label>
//                 <input
//                   type="file"
//                   id="videoFile"
//                   accept="video/mp4,video/mkv,video/mpeg4"
//                   onChange={handleVideoChange}
//                   className="hidden"
//                 />
//               </div>
//               <small className="text-red-700 mt-2 block">
//                 We support MP4, MKV, MPEG4, etc.
//               </small>
//             </div>
//           </div>
//           {/* <div className="mb-6">
//             <label className="font-semibold">Upload Video (Optional)</label>
//             <input
//               type="file"
//               accept="video/mp4, video/mkv, video/mpeg4"
//               onChange={(e) =>
//                 e.target.files && handleChange(index, "workInstructionVideo", e.target.files[0])
//               }
//               className="border py-4 px-4 rounded-md w-full mt-2"
//             />
//           </div> */}

//           {/* Save button only for this step */}
//         </div>
//       ))}
//       <button
//         onClick={() => handleSaveInstruction(index)}
//         className="bg-brand text-white px-5 py-3 rounded-lg"
//       >
//         Add/Edit Instruction
//       </button>
//       {/* Add More Steps button */}
//       <div className="flex gap-4 mt-4">
//         <button
//           onClick={handleAddMoreSteps}
//           className="bg-brand text-white px-5 py-3 rounded-lg"
//         >
//           Add More Steps
//         </button>
//       </div>
//     </div>
//   );
// }
import { useFormik, FieldArray, FormikProvider, Form, Field } from "formik";
import { WorkInstructions } from "../../utils/Interfaces";
import WorkInstruction from "./WorkInstruction";
import { useEffect, useState } from "react";
import { selectPartNamber } from "../product&BOM/https/partProductApis";
import {
  addWorkinstructionInfo,
  selectProcessApi,
  selectProductApi,
  selectProductRelatedPartsApi,
} from "./https/workInstructionApi";
import { v4 as uuidv4 } from "uuid";

// export default function AddWorkInstruction() {
//   const instructionId = localStorage.getItem("instructionId") || "";
//   const [dataFromChild, setDataFromChild] = useState("");

//   const handleChildData = (data: string) => {
//     setDataFromChild(data);
//   };

//   const breadcrumbs = [
//     { path: "/dashboardDetailes", label: "Dashboard" },
//     { label: "Work Instruction" },
//     { label: "Add Work Instruction" },
//   ];

//   const formik = useFormik({
//     initialValues: {
//       steps: [
//         {
//           part: "",
//           stepNumber: "",
//           workInstruction: "",
//           workInstructionImg: null,
//           workInstructionVideo: null,
//         },
//       ],
//     },
//     onSubmit: async (values) => {
//       const stepsWithInstructionId = values.steps.map((step) => ({
//         ...step,
//         instructionId,
//       }));

//       console.log("Final Submission:", stepsWithInstructionId);

//       // You can handle your API request here
//     },
//   });

//   const { values, handleChange, setFieldValue } = formik;

//   return (
//     <div className="p-4 sm:p-6">
//       <WorkInstruction sendDataToParent={handleChildData} />

//       {/* Breadcrumbs */}
//       <div>
//         <h1 className="font-bold text-xl sm:text-2xl text-black">
//           Add Work Instruction
//         </h1>
//       </div>
//       <div className="flex items-center mt-2 gap-2">
//         {breadcrumbs.map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             {item.path ? (
//               <NavLink
//                 to={item.path}
//                 className="text-xs sm:text-sm text-black hover:underline"
//               >
//                 {item.label}
//               </NavLink>
//             ) : (
//               <span className="text-xs sm:text-sm cursor-default">
//                 {item.label}
//               </span>
//             )}
//             {index < breadcrumbs.length - 1 && (
//               <FaCircle className="text-[6px] text-gray-500" />
//             )}
//           </div>
//         ))}
//       </div>

//       <FormikProvider value={formik}>
//         <Form>
//           <FieldArray
//             name="steps"
//             render={(arrayHelpers) => (
//               <>
//                 {values.steps.map((step, index) => (
//                   <div
//                     key={index}
//                     className="mt-4 bg-white p-6 w-full rounded-2xl"
//                   >
//                     {/* Part and Step No. */}
//                     <div className="flex flex-col md:flex-row gap-4 mb-6">
//                       <div className="w-full md:w-1/2">
//                         <label className="font-semibold">
//                           Part Description
//                         </label>
//                         <Field
//                           as="select"
//                           name={`steps.${index}.part`}
//                           className="border py-4 px-4 rounded-md w-full mt-2"
//                         >
//                           <option value="">Select Part</option>
//                           <option value="Part 1">Part 1</option>
//                           <option value="Part 2">Part 2</option>
//                           <option value="Part 3">Part 3</option>
//                         </Field>
//                       </div>
//                       <div className="w-full md:w-1/2">
//                         <label className="font-semibold">Step No.</label>
//                         <Field
//                           type="number"
//                           name={`steps.${index}.stepNumber`}
//                           placeholder="Enter step number"
//                           className="border py-4 px-4 rounded-md w-full mt-2"
//                         />
//                       </div>
//                     </div>

//                     {/* Work Instruction */}
//                     <div className="mb-6">
//                       <label className="font-semibold">Work Instruction</label>
//                       <Field
//                         as="textarea"
//                         name={`steps.${index}.workInstruction`}
//                         rows={6}
//                         placeholder="Describe the work instruction here..."
//                         className="border py-4 px-4 rounded-md w-full mt-2"
//                       />
//                     </div>

//                     {/* Media Upload */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//                       <div>
//                         <label className="block font-semibold mb-2">
//                           Image of Work Instruction
//                         </label>
//                         <label
//                           htmlFor={`steps.${index}.workInstructionImg`}
//                           className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm text-gray-800 bg-[#919EAB33] border-gray-300"
//                         >
//                           {values.steps[index].workInstructionImg
//                             ? values.steps[index].workInstructionImg.name
//                             : "Tap or click to Add Picture"}
//                         </label>
//                         <input
//                           id={`steps.${index}.workInstructionImg`}
//                           type="file"
//                           accept="image/*"
//                           className="hidden"
//                           onChange={(e) =>
//                             setFieldValue(
//                               `steps.${index}.workInstructionImg`,
//                               e.target.files?.[0] || null
//                             )
//                           }
//                         />
//                       </div>

//                       <div>
//                         <label className="block font-semibold mb-2">
//                           Upload Video
//                         </label>
//                         <label
//                           htmlFor={`steps.${index}.workInstructionVideo`}
//                           className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm text-gray-600 bg-white hover:bg-gray-50"
//                         >
//                           {values.steps[index].workInstructionVideo
//                             ? values.steps[index].workInstructionVideo.name
//                             : "Upload Video"}
//                         </label>
//                         <input
//                           id={`steps.${index}.workInstructionVideo`}
//                           type="file"
//                           accept="video/mp4,video/mkv,video/mpeg4"
//                           className="hidden"
//                           onChange={(e) =>
//                             setFieldValue(
//                               `steps.${index}.workInstructionVideo`,
//                               e.target.files?.[0] || null
//                             )
//                           }
//                         />
//                         <small className="text-red-700 mt-2 block">
//                           We support MP4, MKV, MPEG4, etc.
//                         </small>
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 {/* Buttons */}
//                 <div className="mt-6 flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       arrayHelpers.push({
//                         part: "",
//                         stepNumber: "",
//                         workInstruction: "",
//                         workInstructionImg: null,
//                         workInstructionVideo: null,
//                       })
//                     }
//                     className="bg-brand text-white px-5 py-3 rounded-lg"
//                   >
//                     Add More Steps
//                   </button>

//                   <button
//                     type="submit"
//                     className="bg-brand text-white px-5 py-3 rounded-lg"
//                   >
//                     Save Instructions
//                   </button>
//                 </div>
//               </>
//             )}
//           />
//         </Form>
//       </FormikProvider>
//     </div>
//   );
// }

interface FormValues {
  steps: WorkInstructions[];
}

const AddWorkInstruction = () => {
  const instructionId = localStorage.getItem("instructionId") || "";
  const [dataFromChild, setDataFromChild] = useState("");
  const [partData, setPartData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProcess();
    selectProduct();
    // you can fetch processData and productData here if needed
  }, []);
  const fetchProcess = async () => {
    try {
      const response = await selectProcessApi();
      setProcessData(response || []);
    } catch (error) {
      console.error("Failed to fetch process:", error);
    }
  };
  console.log("productDataproductDataproductData", productData);

  const handleChildData = (data: string) => {
    setDataFromChild(data);
  };
  const selectProduct = async () => {
    try {
      const response = await selectProductApi();
      console.log("099009responseresponse", response.data);

      setProductData(response.data || []);
    } catch (error) {
      throw error;
    }
  };

  const formik = useFormik({
    initialValues: {
      processId: "",
      part_id: "",
      steps: [
        {
          title: "",
          part: "",
          stepNumber: "",
          workInstruction: "",
          workInstructionImg: [],
          workInstructionVideo: null,
        },
      ],
    },
    onSubmit: async (values) => {
      try {
        console.log("valuesvalues", values);

        const workInstructionId = uuidv4().slice(0, 6);

        for (const step of values.steps) {
          const formData = new FormData();

          formData.append("workInstructionId", workInstructionId);
          formData.append("processId", values.processId);
          formData.append("part_id", values.part_id);
          formData.append("stepNumber", step.stepNumber);
          formData.append("title", step.title);
          formData.append("instruction", step.workInstruction);

          step.workInstructionImg.forEach((file) => {
            formData.append("workInstructionImg", file);
          });

          if (step.workInstructionVideo) {
            formData.append("workInstructionVideo", step.workInstructionVideo);
          }

          await addWorkinstructionInfo(formData);
        }
      } catch (error) {
        console.error("❌ Error submitting steps:", error);
      }
    },
  });

  const { values, setFieldValue } = formik;

  const handleMultipleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(e.target.files || []);
    setFieldValue(`steps.${index}.workInstructionImg`, files);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black">
        Work Instruction One
      </h1>

      <FormikProvider value={formik}>
        <Form>
          {/* ✅ Common Fields */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Process</label>
              <Field
                as="select"
                name="processId"
                className="border py-3 px-4 rounded-md w-full mt-2"
              >
                <option value="">Select Process</option>
                {processData.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Field>
            </div>

            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Product</label>
              <Field
                as="select"
                name="part_id"
                className="border py-3 px-4 rounded-md w-full mt-2"
              >
                <option value="">Select Product</option>
                {productData.map((item: any) => (
                  <option key={item.value} value={item.id}>
                    {item.partNumber}
                  </option>
                ))}
              </Field>
            </div>
          </div>

          {/* ✅ Steps FieldArray */}
          <FieldArray
            name="steps"
            render={(arrayHelpers) => (
              <>
                {values.steps.map((step, index) => (
                  <div
                    key={index}
                    className="mt-4 bg-white p-6 w-full rounded-2xl"
                  >
                    {/* Title, Step Number */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="w-full md:w-1/2">
                        <label className="font-semibold">
                          Work Instruction Title
                        </label>
                        <Field
                          type="text"
                          name={`steps.${index}.title`}
                          className="border py-3 px-4 rounded-md w-full mt-2"
                          placeholder="Enter title"
                        />
                      </div>

                      <div className="w-full md:w-1/2">
                        <label className="font-semibold">Step No.</label>
                        <Field
                          type="number"
                          name={`steps.${index}.stepNumber`}
                          className="border py-3 px-4 rounded-md w-full mt-2"
                          placeholder="Enter step number"
                        />
                      </div>
                    </div>

                    {/* Select Part */}
                    {/* <div className="mb-6">
                      <label className="font-semibold">Select Part</label>
                      <Field
                        as="select"
                        name={`steps.${index}.part`}
                        className="border py-3 px-4 rounded-md w-full mt-2"
                      >
                        <option value="">-- Select Part --</option>
                        {partData.map((part) => (
                          <option key={part.id} value={part.id}>
                            {part.name}
                          </option>
                        ))}
                      </Field>
                    </div> */}

                    {/* Work Instruction Text */}
                    <div className="mb-6">
                      <label className="font-semibold">Work Instruction</label>
                      <Field
                        as="textarea"
                        name={`steps.${index}.workInstruction`}
                        rows={4}
                        className="border py-3 px-4 rounded-md w-full mt-2"
                        placeholder="Describe the instruction..."
                      />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="font-semibold block mb-2">
                        Work Instruction Images (multiple)
                      </label>
                      <label
                        htmlFor={`steps.${index}.workInstructionImg`}
                        className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-[#919EAB33]"
                      >
                        Click to select images
                      </label>
                      <input
                        id={`steps.${index}.workInstructionImg`}
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleMultipleImageChange(e, index)}
                      />

                      <div className="mt-2 flex flex-wrap gap-2">
                        {step.workInstructionImg?.map((file, idx) => (
                          <img
                            key={idx}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${idx}`}
                            className="w-20 h-20 object-cover rounded-md border"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Video Upload */}
                    <div className="mb-6">
                      <label className="font-semibold block mb-2">
                        Upload Video
                      </label>
                      <label
                        htmlFor={`steps.${index}.workInstructionVideo`}
                        className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-white hover:bg-gray-50"
                      >
                        {step.workInstructionVideo?.name || "Upload Video"}
                      </label>
                      <input
                        id={`steps.${index}.workInstructionVideo`}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) =>
                          setFieldValue(
                            `steps.${index}.workInstructionVideo`,
                            e.target.files?.[0] || null
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                {/* Add / Submit Buttons */}
                <div className="mt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        title: "",
                        part: "",
                        stepNumber: "",
                        workInstruction: "",
                        workInstructionImg: [],
                        workInstructionVideo: null,
                      })
                    }
                    className="bg-brand text-white px-5 py-3 rounded-lg"
                  >
                    Add More Steps
                  </button>

                  <button
                    type="submit"
                    className="bg-brand text-white px-5 py-3 rounded-lg"
                  >
                    Save Instructions
                  </button>
                </div>
              </>
            )}
          />
        </Form>
      </FormikProvider>
    </div>
  );
};

export default AddWorkInstruction;
