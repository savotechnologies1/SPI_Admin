// import { useEffect } from "react";
// import { FaCircle } from "react-icons/fa";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import {
//   editWorkInstruction,
//   workInstructionDetail,
// } from "./https/workInstructionApi";
// import { useForm } from "react-hook-form";
// import delete_img from "../../assets/delete_1.png";

// type FormData = {
//   id: string;
//   part: string;
//   stepNumber: string;
//   workInstruction: string;
//   workInstructionImg: FileList;
//   workInstructionVideo: FileList;
// };

// const EditWorkInstruction = () => {
//   const { id } = useParams();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {
//       part: "",
//       stepNumber: "",
//       workInstruction: "",
//     },
//   });

//   const navigate = useNavigate();
//   const fetchProcessDetail = async () => {
//     try {
//       const response = await workInstructionDetail(id);
//       const data = response.data;
//       reset({
//         part: data.part,
//         stepNumber: data.stepNumber,
//         workInstruction: data.workInstruction,
//       });
//     } catch (error) {}
//   };

//   useEffect(() => {
//     fetchProcessDetail();
//   }, [id]);

//   const onSubmit = async (formData: FormData) => {
//     try {
//       const payload = {
//         part: formData.part,
//         stepNumber: formData.stepNumber,
//         workInstruction: formData.workInstruction,
//         workInstructionImg: formData.workInstructionImg?.[0] || null,
//         workInstructionVideo: formData.workInstructionVideo?.[0] || null,
//       };

//       const response = await editWorkInstruction(payload, id);
//       if (response.status === 201) {
//         navigate("/");
//       }
//     } catch (error) {
//       throw error;
//     }
//   };

//   const breadcrumbs = [
//     { path: "/dashboardDetailes", label: "Dashboard" },
//     { label: "Work Instruction" },
//     { label: "Edit Work Instruction" },
//   ];

//   return (
//     <div className="p-4 sm:p-6">
//       <div>
//         <h1 className="font-bold text-xl sm:text-2xl text-black">
//           Edit Work Instruction
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

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="mt-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm"
//       >
//         {/* First Row: Part and Step Number */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block font-semibold mb-2" htmlFor="part">
//               Part Description
//             </label>
//             <select
//               id="part"
//               {...register("part", { required: "Part is required" })}
//               className="w-full p-3 border rounded-md"
//             >
//               <option value="">Select Part</option>
//               {[1, 2, 3].map((num) => (
//                 <option key={num} value={`Part ${num}`}>
//                   Part {num}
//                 </option>
//               ))}
//             </select>
//             {errors.part && (
//               <p className="text-red-500 text-sm">{errors.part.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block font-semibold mb-2" htmlFor="stepNumber">
//               Step No.
//             </label>
//             <input
//               type="number"
//               id="stepNumber"
//               {...register("stepNumber", {
//                 required: "Step number is required",
//                 min: 1,
//               })}
//               className="w-full p-3 border rounded-md"
//               placeholder="Enter step number"
//             />
//             {errors.stepNumber && (
//               <p className="text-red-500 text-sm">
//                 {errors.stepNumber.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Work Instruction Textarea */}
//         <div className="mb-6">
//           <label className="block font-semibold mb-2" htmlFor="workInstruction">
//             Work Instruction (Describe Steps)
//           </label>
//           <textarea
//             id="workInstruction"
//             {...register("workInstruction", {
//               required: "Description is required",
//             })}
//             className="w-full p-3 border rounded-md"
//             placeholder="Describe the work instructions here..."
//             rows={6}
//           />
//           {errors.workInstruction && (
//             <p className="text-red-500 text-sm">
//               {errors.workInstruction.message}
//             </p>
//           )}
//         </div>

//         {/* File Uploads */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label
//               className="block font-semibold mb-2"
//               htmlFor="workInstructionImg"
//             >
//               Image of Work Instruction
//             </label>
//             <input
//               type="file"
//               id="workInstructionImg"
//               accept="image/*"
//               {...register("workInstructionImg")}
//               className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand hover:file:bg-blue-100"
//             />
//           </div>

//           <div>
//             <label
//               className="block font-semibold mb-2"
//               htmlFor="workInstructionVideo"
//             >
//               Upload Video
//             </label>
//             <input
//               type="file"
//               id="workInstructionVideo"
//               accept="video/mp4,video/mkv,video/mpeg4"
//               {...register("workInstructionVideo")}
//               className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-brand hover:file:bg-blue-100"
//             />
//             <small className="text-red-700 mt-2 block">
//               We support MP4, MKV, MPEG4, etc.
//             </small>
//           </div>
//         </div>

//         {/* Save Button */}
//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-brand text-white px-5  rounded-lg transition-colors"
//           >
//             Save
//           </button>
//           <div className="bg-[#FF5630] rounded-full p-2 cursor-pointer">
//             <img
//               className="w-[20px]"
//               src={delete_img}
//               alt="delete"
//               // onClick={handleDelete}
//             />
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditWorkInstruction;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormikProvider, useFormik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  editWorkInstruction,
  selectProcessApi,
  selectProductApi,
  selectProductRelatedPartsApi,
  workInstructionDetail,
} from "./https/workInstructionApi";

interface Step {
  title: string;
  part: string;
  stepNumber: string;
  workInstruction: string;
  workInstructionImg: File[] | string[]; // File for new, string for existing
  workInstructionVideo: File | string | null;
}

interface FormValues {
  processId: string;
  part_id: string;
  instructionTitle: string;
  steps: Step[];
}

// const EditWorkInstruction = () => {
//   const [initialValues, setInitialValues] = useState<any>(null);
//   const [processData, setProcessData] = useState<any[]>([]);
//   const [productData, setProductData] = useState<any[]>([]);
//   const { id } = useParams();
//   useEffect(() => {
//     fetchProcess();
//     selectProduct();
//     fetchWorkInstructionDetail();
//     const mockDetail = {
//       processId: "p1",
//       part_id: "prd1",
//       steps: [
//         {
//           title: "Step A",
//           part: "",
//           stepNumber: "1",
//           workInstruction: "Do step A work",
//           workInstructionImg: [],
//           workInstructionVideo: null,
//         },
//         {
//           title: "Step B",
//           part: "",
//           stepNumber: "2",
//           workInstruction: "Do step B work",
//           workInstructionImg: [],
//           workInstructionVideo: null,
//         },
//       ],
//     };

//     setInitialValues(mockDetail);
//   }, []);

//   const fetchProcess = async () => {
//     try {
//       const response = await selectProcessApi();
//       console.log("responseresponse", response);

//       setProcessData(response || []);
//     } catch (error) {
//       console.error("Failed to fetch process:", error);
//     }
//   };

//   const selectProduct = async () => {
//     try {
//       const response = await selectProductApi();
//       setProductData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     }
//   };

//   const fetchWorkInstructionDetail = async () => {
//     try {
//       const response = await workInstructionDetail(id);
//       console.log("responseresponse", response);

//       setInitialValues(response);
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     }
//   };
//   const validationSchema = Yup.object().shape({
//     processId: Yup.string().required("Process is required"),
//     part_id: Yup.string().required("Product is required"),
//     steps: Yup.array().of(
//       Yup.object().shape({
//         title: Yup.string().required("Title is required"),
//         stepNumber: Yup.string().required("Step Number is required"),
//         workInstruction: Yup.string().required("Instruction is required"),
//       })
//     ),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       console.log("Submitted values:", values);
//       alert("Work Instruction updated (mock)!");
//     },
//   });

//   const { values, setFieldValue, touched, errors } = formik;

//   if (!initialValues) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="font-bold text-xl mb-4 text-black">
//         Edit Work Instruction
//       </h1>
//       <FormikProvider value={formik}>
//         <Form>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             {/* Process Select */}
//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Select Process</label>
//               <Select
//                 options={processData.map((p) => ({
//                   value: p.id,
//                   label: p.name,
//                 }))}
//                 value={processData
//                   .map((p) => ({ value: p.id, label: p.name }))
//                   .find((opt) => opt.value === values?.processId)}
//                 onChange={(opt) => setFieldValue("processId", opt?.value)}
//               />
//               {touched.processId && errors.processId && (
//                 <div className="text-red-500 text-sm">{errors.processId}</div>
//               )}
//             </div>

//             {/* Product Select */}
//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Select Product</label>
//               <Select
//                 options={productData.map((p) => ({
//                   value: p.id,
//                   label: p.partNumber,
//                 }))}
//                 value={productData
//                   .map((p) => ({ value: p.id, label: p.partNumber }))
//                   .find((opt) => opt.value === values?.part_id)}
//                 onChange={(opt) => setFieldValue("part_id", opt?.value)}
//               />
//               {touched.part_id && errors.part_id && (
//                 <div className="text-red-500 text-sm">{errors.part_id}</div>
//               )}
//             </div>
//           </div>

//           {/* Steps */}
//           <FieldArray
//             name="steps"
//             render={() => (
//               <>
//                 {values?.steps.map((step, index) => (
//                   <div
//                     key={index}
//                     className="bg-white border p-6 mb-6 rounded-xl"
//                   >
//                     <h2 className="font-bold text-lg text-black mb-4">
//                       Step {index + 1}
//                     </h2>

//                     <label className="font-semibold">Title</label>
//                     <Field
//                       name={`steps.${index}.title`}
//                       className="border px-4 py-2 mt-1 rounded-md w-full"
//                       placeholder="Enter step title"
//                     />
//                     {errors.steps?.[index]?.title && (
//                       <div className="text-red-500 text-sm mt-1">
//                         {errors.steps[index]?.title}
//                       </div>
//                     )}

//                     <label className="font-semibold mt-4 block">
//                       Step Number
//                     </label>
//                     <Field
//                       name={`steps.${index}.stepNumber`}
//                       type="number"
//                       className="border px-4 py-2 mt-1 rounded-md w-full"
//                       placeholder="Enter step number"
//                     />

//                     <label className="font-semibold mt-4 block">
//                       Work Instruction
//                     </label>
//                     <Field
//                       as="textarea"
//                       name={`steps.${index}.workInstruction`}
//                       className="border px-4 py-2 mt-1 rounded-md w-full"
//                       rows={3}
//                       placeholder="Enter instruction"
//                     />

//                     {/* Image Upload (no actual upload here) */}
//                     <label className="block mt-4 font-semibold">
//                       Upload Images
//                     </label>
//                     <input type="file" multiple accept="image/*" disabled />

//                     {/* Video Upload (no actual upload here) */}
//                     <label className="block mt-4 font-semibold">
//                       Upload Video
//                     </label>
//                     <input type="file" accept="video/*" disabled />
//                   </div>
//                 ))}
//               </>
//             )}
//           />

//           {/* Submit */}
//           <div className="flex gap-4 mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg"
//             >
//               Update Instruction
//             </button>
//           </div>
//         </Form>
//       </FormikProvider>
//     </div>
//   );
// };

// export default EditWorkInstruction;

// const EditWorkInstruction = () => {
//   const [initialValues, setInitialValues] = useState<any>(null);
//   const [processData, setProcessData] = useState<any[]>([]);
//   const [productData, setProductData] = useState<any[]>([]);
//   const { id } = useParams();

//   useEffect(() => {
//     fetchProcess();
//     fetchProduct();
//     fetchWorkInstructionDetail();
//   }, []);

//   const fetchProcess = async () => {
//     const res = await selectProcessApi();
//     setProcessData(res || []);
//   };

//   const fetchProduct = async () => {
//     const res = await selectProductApi();
//     setProductData(res.data || []);
//   };

//   const fetchWorkInstructionDetail = async () => {
//     const res = await workInstructionDetail(id);
//     const transformedSteps = res.steps.map((step: any) => ({
//       id: step.id,
//       title: step.title,
//       stepNumber: step.stepNumber.toString(),
//       workInstruction: step.instruction,
//       workInstructionImg: step.images || [],
//       workInstructionVideo: step.video || null,
//     }));

//     setInitialValues({
//       processId: res.processId,
//       part_id: res.part_id,
//       steps: transformedSteps,
//     });
//   };

//   const validationSchema = Yup.object().shape({
//     processId: Yup.string().required("Process is required"),
//     part_id: Yup.string().required("Product is required"),
//     steps: Yup.array().of(
//       Yup.object().shape({
//         title: Yup.string().required("Title is required"),
//         stepNumber: Yup.string().required("Step Number is required"),
//         workInstruction: Yup.string().required("Instruction is required"),
//       })
//     ),
//   });

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         formData.append("processId", values.processId);
//         formData.append("part_id", values.part_id);

//         values.steps.forEach((step, index) => {
//           if (step.id) {
//             formData.append(`stepId`, step.id);
//           }

//           formData.append(`stepNumber`, step.stepNumber);
//           formData.append(`title`, step.title);
//           formData.append(`workInstruction`, step.workInstruction);

//           if (step.workInstructionImg) {
//             step.workInstructionImg.forEach((img) => {
//               if (typeof img !== "string") {
//                 formData.append(`workInstructionImg`, img);
//               }
//             });
//           }

//           if (
//             step.workInstructionVideo &&
//             typeof step.workInstructionVideo !== "string"
//           ) {
//             formData.append(`workInstructionVideo`, step.workInstructionVideo);
//           }
//         });

//         await editWorkInstruction(formData, id);
//       } catch (error) {
//         console.error("❌ Error updating steps:", error);
//       }
//     },
//   });

//   const { values, setFieldValue, touched, errors } = formik;

//   const handleImageChange = (e: any, index: number) => {
//     const files = Array.from(e.target.files || []);
//     const current = values.steps[index].workInstructionImg || [];
//     setFieldValue(`steps.${index}.workInstructionImg`, [...current, ...files]);
//   };

//   const handleVideoChange = (e: any, index: number) => {
//     const file = e.target.files?.[0];
//     if (file) setFieldValue(`steps.${index}.workInstructionVideo`, file);
//   };

//   if (!initialValues) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="p-6">
//       <h1 className="font-bold text-xl mb-4 text-black">
//         Edit Work Instruction
//       </h1>
//       <FormikProvider value={formik}>
//         <Form>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Select Process</label>
//               <Select
//                 options={processData.map((p) => ({
//                   value: p.id,
//                   label: p.name,
//                 }))}
//                 value={processData
//                   .map((p) => ({ value: p.id, label: p.name }))
//                   .find((opt) => opt.value === values?.processId)}
//                 onChange={(opt) => setFieldValue("processId", opt?.value)}
//               />
//               {touched.processId && errors.processId && (
//                 <div className="text-red-500 text-sm">{errors.processId}</div>
//               )}
//             </div>

//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Select Product</label>
//               <Select
//                 options={productData.map((p) => ({
//                   value: p.id,
//                   label: p.partNumber,
//                 }))}
//                 value={productData
//                   .map((p) => ({ value: p.id, label: p.partNumber }))
//                   .find((opt) => opt.value === values?.part_id)}
//                 onChange={(opt) => setFieldValue("part_id", opt?.value)}
//               />
//               {touched.part_id && errors.part_id && (
//                 <div className="text-red-500 text-sm">{errors.part_id}</div>
//               )}
//             </div>
//           </div>

//           <FieldArray
//             name="steps"
//             render={() => (
//               <>
//                 {values?.steps.map((step, index) => (
//                   <div
//                     key={index}
//                     className="bg-white border p-6 mb-6 rounded-xl"
//                   >
//                     <h2 className="font-bold text-lg text-black mb-4">
//                       Step {index + 1}
//                     </h2>

//                     <label className="font-semibold">Title</label>
//                     <Field
//                       name={`steps.${index}.title`}
//                       className="border px-4 py-2 mt-1 rounded-md w-full"
//                       placeholder="Enter step title"
//                     />

//                     <label className="font-semibold mt-4 block">
//                       Step Number
//                     </label>
//                     <Field
//                       name={`steps.${index}.stepNumber`}
//                       type="number"
//                       className="border px-4 py-2 mt-1 rounded-md w-full"
//                       placeholder="Enter step number"
//                     />

//                     <label className="font-semibold mt-4 block">
//                       Work Instruction
//                     </label>
//                     <Field
//                       as="textarea"
//                       name={`steps.${index}.workInstruction`}
//                       className="border px-4 py-2 mt-1 rounded-md w-full"
//                       rows={3}
//                       placeholder="Enter instruction"
//                     />

//                     <label className="block mt-4 font-semibold">
//                       Instruction Images
//                     </label>
//                     <div className="flex gap-2 flex-wrap">
//                       {step.workInstructionImg &&
//                         step.workInstructionImg.map((img: any, i: number) => {
//                           const src =
//                             typeof img === "string"
//                               ? `http://localhost:5173/uploads/${img}`
//                               : URL.createObjectURL(img);
//                           return (
//                             <img
//                               key={i}
//                               src={src}
//                               className="w-20 h-20 object-cover border rounded"
//                               alt="img"
//                             />
//                           );
//                         })}
//                     </div>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       onChange={(e) => handleImageChange(e, index)}
//                       className="mt-2"
//                     />

//                     <label className="block mt-4 font-semibold">
//                       Instruction Video
//                     </label>
//                     {step.workInstructionVideo && (
//                       <video
//                         controls
//                         className="w-40 mb-2 rounded border"
//                         src={
//                           typeof step.workInstructionVideo === "string"
//                             ? `http://localhost:5173/uploads/${step.workInstructionVideo}`
//                             : URL.createObjectURL(step.workInstructionVideo)
//                         }
//                       />
//                     )}
//                     <input
//                       type="file"
//                       accept="video/*"
//                       onChange={(e) => handleVideoChange(e, index)}
//                     />
//                   </div>
//                 ))}

//                 {/* ➕ Add New Step */}
//                 <button
//                   type="button"
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                   onClick={() =>
//                     setFieldValue("steps", [
//                       ...values.steps,
//                       {
//                         id: null,
//                         title: "",
//                         stepNumber: "",
//                         workInstruction: "",
//                         workInstructionImg: [],
//                         workInstructionVideo: null,
//                       },
//                     ])
//                   }
//                 >
//                   ➕ Add Step
//                 </button>
//               </>
//             )}
//           />

//           <div className="flex gap-4 mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg"
//             >
//               Update Instruction
//             </button>
//           </div>
//         </Form>
//       </FormikProvider>
//     </div>
//   );
// };

// export default EditWorkInstruction;

// const EditWorkInstruction = () => {
//   const { id } = useParams();
//   const [productData, setProductData] = useState<any[]>([]);
//   const [processData, setProcessData] = useState<any[]>([]);
//   const [partData, setPartData] = useState<any[]>([]);
//   const [workInstId, setWorkInstId] = useState("");

//   useEffect(() => {
//     fetchProcess();
//     selectProduct();
//     fetchWorkInstruction();
//   }, []);

//   const fetchProcess = async () => {
//     try {
//       const response = await selectProcessApi();
//       setProcessData(response || []);
//     } catch (error) {
//       console.error("Failed to fetch process:", error);
//     }
//   };

//   const selectProduct = async () => {
//     try {
//       const response = await selectProductApi();
//       setProductData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     }
//   };

//   const selectPart = async () => {
//     try {
//       const response = await selectProductRelatedPartsApi(
//         formik.values.productId
//       );
//       setPartData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch parts:", error);
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     processId: Yup.string().required("Process is required"),
//     productId: Yup.string().required("Product is required"),
//     instructionTitle: Yup.string().required("Instruction Title is required"),
//     steps: Yup.array()
//       .of(
//         Yup.object().shape({
//           part_id: Yup.string().required("Part is required"),
//           title: Yup.string().required("Title is required"),
//           stepNumber: Yup.string().required("Step Number is required"),
//           workInstruction: Yup.string().required("Instruction is required"),
//         })
//       )
//       .min(1, "At least one step is required"),
//   });

//   const formik = useFormik<FormValues>({
//     initialValues: {
//       processId: "",
//       productId: "",
//       instructionTitle: "",
//       steps: [
//         {
//           part_id: "",
//           title: "",
//           stepNumber: "",
//           workInstruction: "",
//           workInstructionImg: [],
//           workInstructionVideo: null,
//         },
//       ],
//     },
//     enableReinitialize: true,
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         const formData = new FormData();
//         formData.append("processId", values.processId);
//         formData.append("productId", values.productId);
//         formData.append("instructionTitle", values.instructionTitle);
//         formData.append("workInstructionId", workInstId); // 🟢 Required for edit API

//         const instructionSteps = values.steps.map((step) => ({
//           stepNumber: step.stepNumber,
//           title: step.title,
//           partId: step.part_id,
//           workInstruction: step.workInstruction,
//         }));

//         formData.append("instructionSteps", JSON.stringify(instructionSteps));

//         values.steps.forEach((step, i) => {
//           step.workInstructionImg.forEach((img) => {
//             formData.append(`instructionSteps[${i}][workInstructionImgs]`, img);
//           });

//           if (step.workInstructionVideo) {
//             formData.append(
//               `instructionSteps[${i}][workInstructionVideo]`,
//               step.workInstructionVideo
//             );
//           }
//         });

//         await editWorkInstruction(formData);
//         alert("✅ Work Instruction updated successfully!");
//       } catch (error) {
//         console.error("❌ Error while updating:", error);
//       }
//     },
//   });

//   const { values, setFieldValue, setValues, touched, errors } = formik;

//   const fetchWorkInstruction = async () => {
//     try {
//       if (!id) return;
//       const res = await workInstructionDetail(id);
//       setWorkInstId(res.workInstructionId);

//       const formattedSteps = res.steps.map((step) => ({
//         id: step.id,
//         title: step.title || "",
//         part_id: step.part_id || "",
//         stepNumber: step.stepNumber?.toString() || "",
//         workInstruction: step.instruction || "",
//         workInstructionImg: step.workInstructionImg || [],
//         workInstructionVideo: null, // uploaded again if needed
//       }));

//       setValues({
//         instructionTitle: res.instructionTitle || "",
//         processId: res.processId || "",
//         productId: res.productId || "",
//         steps: formattedSteps.length
//           ? formattedSteps
//           : formik.initialValues.steps,
//       });
//     } catch (error) {
//       console.error("❌ Failed to fetch instruction:", error);
//     }
//   };

//   const handleMultipleImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     const files = Array.from(e.target.files || []);
//     setFieldValue(`steps.${index}.workInstructionImg`, files);
//   };

//   useEffect(() => {
//     if (values.productId) {
//       selectPart();
//     }
//   }, [values.productId]);

//   // 🧠 Image src helper
//   const getImagePreviewSrc = (img: File | string) => {
//     return typeof img === "string"
//       ? `http://82.25.110.131:8080/uploads/partImages/${img}`
//       : URL.createObjectURL(img);
//   };
//   return (
//     <div className="p-4 sm:p-6">
//       <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">
//         Add Work Instruction
//       </h1>

//       <FormikProvider value={formik}>
//         <Form>
//           <div className="flex flex-col sm:flex-row gap-4 mb-6">
//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Work Instruction Title</label>
//               <Field
//                 name={`instructionTitle`}
//                 className="border p-3 w-full rounded-md mt-1"
//                 placeholder="Enter instructionTitle"
//               />
//               {touched.instructionTitle && errors.instructionTitle && (
//                 <div className="text-red-500 text-sm mt-1">
//                   {errors.instructionTitle}
//                 </div>
//               )}
//             </div>
//             {/* Process */}
//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Select Process</label>
//               <Select
//                 options={processData.map((item) => ({
//                   value: item.id,
//                   label: item.name,
//                 }))}
//                 name="processId"
//                 className="mt-2"
//                 onChange={(selectedOption) =>
//                   setFieldValue("processId", selectedOption?.value)
//                 }
//                 value={
//                   processData
//                     .map((item) => ({
//                       value: item.id,
//                       label: item.name,
//                     }))
//                     .find((opt) => opt.value === values.processId) || null
//                 }
//                 isClearable
//                 styles={{
//                   dropdownIndicator: (base) => ({
//                     ...base,
//                     display: "none",
//                   }),
//                 }}
//               />
//               {touched.processId && errors.processId && (
//                 <div className="text-red-500 text-sm mt-1">
//                   {errors.processId}
//                 </div>
//               )}
//             </div>

//             {/* Product */}
//             <div className="w-full sm:w-1/2">
//               <label className="font-semibold">Select Product</label>
//               <Select
//                 options={productData.map((item) => ({
//                   value: item.id,
//                   label: item.partNumber,
//                 }))}
//                 name="productId"
//                 onChange={(selectedOption) =>
//                   setFieldValue("productId", selectedOption?.value || "")
//                 }
//                 value={
//                   productData
//                     .map((item) => ({
//                       value: item.id,
//                       label: item.partNumber,
//                     }))
//                     .find((opt) => opt.value === values.productId) || null
//                 }
//                 isClearable
//               />
//               {touched.productId && errors.productId && (
//                 <div className="text-red-500 text-sm mt-1">
//                   {errors.productId}
//                 </div>
//               )}
//             </div>
//           </div>

//           <FieldArray
//             name="steps"
//             render={(arrayHelpers) => (
//               <>
//                 {values.steps.map((step, index) => (
//                   <div
//                     key={index}
//                     className="mt-4 bg-white p-6 w-full rounded-2xl"
//                   >
//                     <h2 className="font-bold text-xl mb-6 text-black">
//                       Work Instruction {index + 1}
//                     </h2>

//                     {/* Title & Step Number */}
//                     <div className="flex flex-col md:flex-row gap-4 mb-6">
//                       <div className="w-full md:w-1/2">
//                         <label className="font-semibold">Select Part</label>
//                         <Select
//                           options={partData.map((item) => ({
//                             value: item.part.part_id,
//                             label: item.part.partNumber,
//                           }))}
//                           name={`steps.${index}.part_id`}
//                           className="mt-2"
//                           onChange={(selectedOption) =>
//                             setFieldValue(
//                               `steps.${index}.part_id`,
//                               selectedOption?.value || ""
//                             )
//                           }
//                           value={
//                             partData
//                               .map((item) => ({
//                                 value: item.part.part_id,
//                                 label: item.part.partNumber,
//                               }))
//                               .find(
//                                 (opt) =>
//                                   opt.value === values.steps[index].part_id
//                               ) || null
//                           }
//                           isClearable
//                         />

//                         {touched.steps?.[index]?.part_id &&
//                           errors.steps?.[index]?.part_id && (
//                             <div className="text-red-500 text-sm mt-1">
//                               {errors.steps[index].part_id}
//                             </div>
//                           )}
//                       </div>

//                       <div className="w-full md:w-1/2">
//                         <label className="font-semibold">
//                           Work Instruction Title
//                         </label>
//                         <Field
//                           name={`steps.${index}.title`}
//                           className="border py-3 px-4 rounded-md w-full mt-2"
//                           placeholder="Enter title"
//                         />
//                         {touched.steps?.[index]?.title &&
//                           errors.steps?.[index]?.title && (
//                             <div className="text-red-500 text-sm mt-1">
//                               {errors.steps[index].title}
//                             </div>
//                           )}
//                       </div>

//                       <div className="w-full md:w-1/2">
//                         <label className="font-semibold">Step No.</label>
//                         <Field
//                           name={`steps.${index}.stepNumber`}
//                           type="number"
//                           className="border py-3 px-4 rounded-md w-full mt-2"
//                           placeholder="Enter step number"
//                         />
//                         {touched.steps?.[index]?.stepNumber &&
//                           errors.steps?.[index]?.stepNumber && (
//                             <div className="text-red-500 text-sm mt-1">
//                               {errors.steps[index].stepNumber}
//                             </div>
//                           )}
//                       </div>
//                     </div>

//                     {/* Instruction */}
//                     <div className="mb-6">
//                       <label className="font-semibold">Work Instruction</label>
//                       <Field
//                         as="textarea"
//                         name={`steps.${index}.workInstruction`}
//                         rows={4}
//                         className="border py-3 px-4 rounded-md w-full mt-2"
//                         placeholder="Describe the instruction..."
//                       />
//                       {touched.steps?.[index]?.workInstruction &&
//                         errors.steps?.[index]?.workInstruction && (
//                           <div className="text-red-500 text-sm mt-1">
//                             {errors.steps[index].workInstruction}
//                           </div>
//                         )}
//                     </div>

//                     {/* Image Upload */}
//                     <div className="mb-4">
//                       <label className="font-semibold block mb-2">
//                         Work Instruction Images (multiple)
//                       </label>
//                       <label
//                         htmlFor={`steps.${index}.workInstructionImg`}
//                         className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-[#919EAB33]"
//                       >
//                         Click to select images
//                       </label>
//                       <input
//                         id={`steps.${index}.workInstructionImg`}
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         className="hidden"
//                         onChange={(e) => handleMultipleImageChange(e, index)}
//                       />

//                       <div className="mt-2 flex flex-wrap gap-2">
//                         {step.workInstructionImg?.map((img, idx) => (
//                           <img
//                             key={idx}
//                             src={getImagePreviewSrc(img)}
//                             alt={`Uploaded ${idx}`}
//                             className="w-20 h-20 object-cover border rounded"
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <div className="mb-6">
//                       <label className="font-semibold block mb-2">
//                         Upload Video
//                       </label>
//                       <label
//                         htmlFor={`steps.${index}.workInstructionVideo`}
//                         className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-white hover:bg-gray-50"
//                       >
//                         {step.workInstructionVideo?.name || "Upload Video"}
//                       </label>
//                       <input
//                         id={`steps.${index}.workInstructionVideo`}
//                         type="file"
//                         accept="video/*"
//                         className="hidden"
//                         onChange={(e) =>
//                           setFieldValue(
//                             `steps.${index}.workInstructionVideo`,
//                             e.target.files?.[0] || null
//                           )
//                         }
//                       />
//                     </div>
//                   </div>
//                 ))}

//                 <div className="mt-6 flex gap-4">
//                   <button
//                     type="button"
//                     onClick={() =>
//                       arrayHelpers.push({
//                         title: "",
//                         part: "",
//                         stepNumber: "",
//                         workInstruction: "",
//                         workInstructionImg: [],
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
// };

// export default EditWorkInstruction;

const EditWorkInstruction = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [processData, setProcessData] = useState<any[]>([]);
  const [partData, setPartData] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>(null);
  useEffect(() => {
    fetchProcess();
    selectProduct();
    fetchWorkInstructionDetail();
  }, []);

  const fetchProcess = async () => {
    try {
      const response = await selectProcessApi();
      setProcessData(response || []);
    } catch (error) {
      console.error("Failed to fetch process:", error);
    }
  };

  const selectProduct = async () => {
    try {
      const response = await selectProductApi();
      setProductData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };
  const selectPart = async () => {
    try {
      console.log("Fetching parts for product:", formik.values.productId);
      const response = await selectProductRelatedPartsApi(
        formik.values.productId
      );
      console.log("Parts response:", response.data);
      setPartData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch parts:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    processId: Yup.string().required("Process is required"),
    productId: Yup.string().required("Product is required"),
    steps: Yup.array().of(
      Yup.object().shape({
        part_id: Yup.string().required("Part is required"),
        title: Yup.string().required("Title is required"),
        stepNumber: Yup.string().required("Step Number is required"),
        workInstruction: Yup.string().required("Instruction is required"),
      })
    ),
  });

  const fetchWorkInstructionDetail = async () => {
    try {
      const response = await workInstructionDetail(id);
      console.log("responseresponse", response);

      const formattedSteps = response.steps.map((step) => ({
        part_id: step.part_id || "",
        title: step.title || "",
        stepNumber: step.stepNumber?.toString() || "",
        workInstruction: step.instruction || "",
        workInstructionImg: step.workInstructionImg.map((img) => ({
          name: img,
          type: "image",
          preview: `http://82.25.110.131:8080/uploads/partImages/${img}`,
        })),
        workInstructionVideo: step.workInstructionVideo.length
          ? {
              name: step.workInstructionVideo[0],
              preview: `http://82.25.110.131:8080/uploads/partVideos/${step.workInstructionVideo[0]}`,
              type: "video",
            }
          : null,
      }));

      setInitialValues({
        processId: response.processId,
        productId: response.productId,
        instructionTitle: response.instructionTitle,
        steps: formattedSteps,
      });
    } catch (error) {
      console.error("Failed to fetch instruction:", error);
    }
  };

  const { id } = useParams();
  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: initialValues || {
      processId: "",
      productId: "",
      instructionTitle: "",
      steps: [
        {
          part_id: "",
          title: "",
          stepNumber: "",
          workInstruction: "",
          workInstructionImg: [],
          workInstructionVideo: null,
        },
      ],
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("processId", values.processId);
      formData.append("productId", values.productId);
      formData.append("instructionTitle", values.instructionTitle);
      formData.append("workInstructionId", id);

      const instructionSteps = values.steps.map((step) => ({
        stepNumber: step.stepNumber,
        title: step.title,
        partId: step.part_id,
        workInstruction: step.workInstruction,
      }));

      formData.append("instructionSteps", JSON.stringify(instructionSteps));

      values.steps.forEach((step, i) => {
        step.workInstructionImg.forEach((img) => {
          if (img instanceof File) {
            formData.append(`instructionSteps[${i}][workInstructionImgs]`, img);
          }
        });

        if (
          step.workInstructionVideo &&
          step.workInstructionVideo instanceof File
        ) {
          formData.append(
            `instructionSteps[${i}][workInstructionVideo]`,
            step.workInstructionVideo
          );
        }
      });

      await editWorkInstruction(formData);
      console.log("✅ Final Payload:", formData);
    },
  });

  const { values, setFieldValue, errors, touched } = formik;

  useEffect(() => {
    if (values.productId) {
      selectPart();
    }
  }, [values.productId]);

  // 🧠 Image src helper
  const getImagePreviewSrc = (img: File | string) => {
    return typeof img === "string"
      ? `http://82.25.110.131:8080/uploads/partImages/${img}`
      : URL.createObjectURL(img);
  };
  const handleMultipleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(e.target.files || []);

    const existingImgs = values.steps[index].workInstructionImg.filter(
      (img) => !(img instanceof File) // Keep only previously fetched images
    );

    const newImgs = files.map((file) => file); // Just store File directly

    setFieldValue(`steps.${index}.workInstructionImg`, [
      ...existingImgs,
      ...newImgs,
    ]);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">
        Add Work Instruction
      </h1>

      <FormikProvider value={formik}>
        <Form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Work Instruction Title</label>
              <Field
                name={`instructionTitle`}
                className="border p-3 w-full rounded-md mt-1"
                placeholder="Enter instructionTitle"
              />
              {touched.instructionTitle && errors.instructionTitle && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.instructionTitle}
                </div>
              )}
            </div>

            {/* Select Process */}

            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Process</label>
              <Select
                options={processData.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                name="processId"
                onChange={(selectedOption) =>
                  setFieldValue("processId", selectedOption?.value || "")
                }
                value={
                  processData
                    .map((item) => ({
                      value: item.id,
                      label: item.name,
                    }))
                    .find((opt) => opt.value === values.processId) || null
                }
                isClearable
              />
              {touched.processId && errors.processId && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.processId}
                </div>
              )}
            </div>

            {/* Select Product */}
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Product</label>
              <Select
                options={productData.map((item) => ({
                  value: item.id,
                  label: item.partNumber,
                }))}
                name="productId"
                onChange={(selectedOption) =>
                  setFieldValue("productId", selectedOption?.value || "")
                }
                value={
                  productData
                    .map((item) => ({
                      value: item.id,
                      label: item.partNumber,
                    }))
                    .find((opt) => opt.value === values.productId) || null
                }
                isClearable
              />
              {touched.productId && errors.productId && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.productId}
                </div>
              )}
            </div>
          </div>

          <FieldArray
            name="steps"
            render={(arrayHelpers) => (
              <>
                {values.steps.map((step, index) => (
                  <div key={index} className="bg-white p-6 mb-6 rounded-xl">
                    <h2 className="font-bold text-lg mb-4 text-black">
                      Work Instruction {index + 1}
                    </h2>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      {/* Part Select */}
                      <div className="w-full sm:w-1/2">
                        <label className="font-semibold">Select Part</label>
                        <Select
                          options={partData.map((item) => ({
                            value: item.part.part_id,
                            label: item.part.partNumber,
                          }))}
                          name={`steps.${index}.part_id`}
                          className="mt-2"
                          onChange={(selectedOption) =>
                            setFieldValue(
                              `steps.${index}.part_id`,
                              selectedOption?.value || ""
                            )
                          }
                          value={
                            partData
                              .map((item) => ({
                                value: item.part.part_id,
                                label: item.part.partNumber,
                              }))
                              .find(
                                (opt) =>
                                  opt.value === values.steps[index].part_id
                              ) || null
                          }
                          isClearable
                        />

                        {touched.steps?.[index]?.part_id &&
                          errors.steps?.[index]?.part_id && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.steps[index].part_id}
                            </div>
                          )}
                      </div>

                      {/* Title */}
                      <div className="w-full sm:w-1/2">
                        <label className="font-semibold">Title</label>
                        <Field
                          name={`steps.${index}.title`}
                          className="border p-3 w-full rounded-md mt-1"
                          placeholder="Enter title"
                        />
                        {touched.steps?.[index]?.title &&
                          errors.steps?.[index]?.title && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.steps[index].title}
                            </div>
                          )}
                      </div>

                      {/* Step Number */}
                      <div className="w-full sm:w-1/2">
                        <label className="font-semibold">Step Number</label>
                        <Field
                          name={`steps.${index}.stepNumber`}
                          type="number"
                          className="border p-3 w-full rounded-md mt-1"
                          placeholder="Enter step number"
                        />
                        {touched.steps?.[index]?.stepNumber &&
                          errors.steps?.[index]?.stepNumber && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.steps[index].stepNumber}
                            </div>
                          )}
                      </div>
                    </div>
                    {/* Instruction */}
                    <div className="mb-4">
                      <label className="font-semibold">Work Instruction</label>
                      <Field
                        as="textarea"
                        name={`steps.${index}.workInstruction`}
                        className="border p-3 w-full rounded-md mt-1"
                        placeholder="Write instruction"
                        rows={4}
                      />
                      {touched.steps?.[index]?.workInstruction &&
                        errors.steps?.[index]?.workInstruction && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.steps[index].workInstruction}
                          </div>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      {/* Upload Images */}
                      <div className="w-full sm:w-1/2">
                        <label className="font-semibold">Upload Images</label>

                        <label
                          htmlFor={`images-${index}`}
                          className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-[#919EAB33]"
                        >
                          Click to select images
                        </label>

                        <input
                          id={`images-${index}`}
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleMultipleImageChange(e, index)}
                        />

                        <div className="flex gap-2 mt-2 flex-wrap">
                          {step.workInstructionImg?.map((img, idx) => {
                            const src =
                              img instanceof File
                                ? URL.createObjectURL(img)
                                : img.preview ||
                                  `http://82.25.110.131:8080/uploads/partImages/${img.name}`;

                            return (
                              <img
                                key={idx}
                                src={src}
                                alt={`step-img-${idx}`}
                                className="w-20 h-20 object-cover rounded-md border"
                              />
                            );
                          })}
                        </div>
                      </div>

                      {/* Upload Video */}
                      <div className="w-full sm:w-1/2">
                        <label className="font-semibold block mb-2">
                          Upload Video
                        </label>

                        <label
                          htmlFor={`video-${index}`}
                          className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-white hover:bg-gray-50"
                        >
                          {step.workInstructionVideo?.name || "Upload Video"}
                        </label>

                        <input
                          id={`video-${index}`}
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
                  </div>
                ))}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        part_id: "",
                        title: "",
                        stepNumber: "",
                        workInstruction: "",
                        workInstructionImg: [],
                        workInstructionVideo: null,
                      })
                    }
                    className="bg-brand text-white px-5 py-3 rounded-lg"
                  >
                    + Add Step
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

export default EditWorkInstruction;
