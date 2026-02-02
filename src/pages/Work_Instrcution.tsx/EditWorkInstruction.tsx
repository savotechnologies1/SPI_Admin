import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FormikProvider,
  useFormik,
  Field,
  FieldArray,
  Form,
  FormikErrors,
} from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {
  deleteWorkInstructionImage,
  deleteWorkInstructionSteps,
  editWorkInstruction,
  selectProcessApi,
  selectProductApi,
  workInstructionDetail,
} from "./https/workInstructionApi";

// --- TYPES ---
type Process = { id: string; name: string };
type Product = { id: string; partNumber: string };
type SelectOption = { value: string; label: string };

type ExistingFile = {
  id: string;
  name: string;
  preview: string;
  type: "image" | "video";
};

type Step = {
  id?: string;
  title: string;
  part_id: string;
  stepNumber: string;
  workInstruction: string;
  workInstructionImg: Array<ExistingFile | File>;
  workInstructionVideo: ExistingFile | File | null;
};

type FormValues = {
  processId: string;
  productId: string;
  instructionTitle: string;
  steps: Step[];
};

const EditWorkInstruction = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [processData, setProcessData] = useState<Process[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues | null>(null);
  const [type, setType] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        const [processResponse, productResponse, instructionResponse] =
          await Promise.all([
            selectProcessApi(),
            selectProductApi(),
            workInstructionDetail(id),
          ]);

        setProcessData(processResponse || []);
        setProductData(productResponse?.data || []);

        if (instructionResponse) {
          setType(instructionResponse.type);

          const formattedSteps: Step[] = instructionResponse.steps.map(
            (step: any) => ({
              id: step.id,
              part_id: step.part_id || "",
              title: step.title || "",
              stepNumber: step.stepNumber?.toString() || "",
              workInstruction: step.instruction || "",
              workInstructionImg: step.workInstructionImg.map(
                (img: any): ExistingFile => ({
                  id: img.id,
                  name: img.name,
                  type: "image",
                  preview: `${BASE_URL}/uploads/workInstructionImg/${img.name}`,
                })
              ),
              // FIX 1: Accessing .name instead of the whole object
              workInstructionVideo: step.workInstructionVideo?.length > 0
                ? {
                    id: step.workInstructionVideo[0].id,
                    name: step.workInstructionVideo[0].name,
                    preview: `${BASE_URL}/uploads/workInstructionVideo/${step.workInstructionVideo[0].name}`,
                    type: "video",
                  }
                : null,
            })
          );

          setInitialValues({
            processId: instructionResponse.processId,
            productId: instructionResponse.productId,
            instructionTitle: instructionResponse.instructionTitle,
            steps: formattedSteps,
          });
        }
      } catch (error) {
        console.error("Failed to fetch work instruction details:", error);
      }
    };

    fetchAllData();
  }, [id, BASE_URL]);

  const validationSchema = Yup.object().shape({
    instructionTitle: Yup.string().required("Work instruction title is required"),
    processId: Yup.string().required("Process is required"),
    productId: Yup.string().required("Product is required"),
    steps: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        stepNumber: Yup.number().typeError("Must be a number").required("Required"),
        workInstruction: Yup.string().min(10, "Min 10 chars").required("Required"),
        workInstructionImg: Yup.array().min(1, "At least one image is required"),
      })
    ),
  });

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: initialValues || {
      processId: "",
      productId: "",
      instructionTitle: "",
      steps: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("workInstructionId", id!);
      formData.append("processId", values.processId);
      formData.append("productId", values.productId);
      formData.append("instructionTitle", values.instructionTitle);
      formData.append("type", type);

      const instructionStepsPayload = values.steps.map((step) => ({
        id: step.id,
        stepNumber: step.stepNumber,
        title: step.title,
        workInstruction: step.workInstruction,
        existingImageIds: step.workInstructionImg
          .filter((img): img is ExistingFile => "id" in img)
          .map((img) => img.id),
      }));

      formData.append("instructionSteps", JSON.stringify(instructionStepsPayload));

      values.steps.forEach((step, index) => {
        step.workInstructionImg.forEach((img) => {
          if (img instanceof File) {
            formData.append(`instructionSteps[${index}][workInstructionImgs]`, img);
          }
        });
        if (step.workInstructionVideo instanceof File) {
          formData.append(`instructionSteps[${index}][workInstructionVideo]`, step.workInstructionVideo);
        }
      });

      try {
        const response = await editWorkInstruction(formData);
        if (response?.status === 200) navigate("/work-instructions-list");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const { values, setFieldValue, errors, touched, handleSubmit } = formik;

  const processOptions = useMemo(() => processData.map((item) => ({ value: item.id, label: item.name })), [processData]);
  const productOptions = useMemo(() => productData.map((item) => ({ value: item.id, label: item.partNumber })), [productData]);

  const handleDeleteImg = async (fileOrId: File | ExistingFile, stepIndex: number) => {
    if ("id" in fileOrId) await deleteWorkInstructionImage(fileOrId.id);
    const updatedImgs = values.steps[stepIndex].workInstructionImg.filter((img) => img !== fileOrId);
    setFieldValue(`steps.${stepIndex}.workInstructionImg`, updatedImgs);
  };

  const handleDeleteStep = async (stepId: string | undefined, stepIndex: number) => {
    if (stepId) await deleteWorkInstructionSteps(stepId);
    const updatedSteps = values.steps.filter((_, index) => index !== stepIndex);
    setFieldValue("steps", updatedSteps);
  };

  if (!initialValues) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 mt-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">Edit Work Instruction</h1>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Work Instruction Title</label>
              <Field name="instructionTitle" className="border p-3 w-full rounded-md mt-1" />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Process</label>
              <Select
                options={processOptions}
                value={processOptions.find((opt) => opt.value === values.processId) || null}
                onChange={(opt) => setFieldValue("processId", opt?.value || "")}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Product</label>
              <Select
                options={productOptions}
                value={productOptions.find((opt) => opt.value === values.productId) || null}
                onChange={(opt) => setFieldValue("productId", opt?.value || "")}
              />
            </div>
          </div>

          <FieldArray
            name="steps"
            render={(arrayHelpers) => (
              <>
                {values.steps.map((step, index) => {
                  const stepErrors = (errors.steps?.[index] as FormikErrors<Step>) || {};
                  const stepTouched = touched.steps?.[index] || {};

                  // FIX 2: Correct Video Source logic (No Hooks inside loop)
                  const videoSrc = step.workInstructionVideo
                    ? step.workInstructionVideo instanceof File
                      ? URL.createObjectURL(step.workInstructionVideo)
                      : (step.workInstructionVideo as ExistingFile).preview
                    : null;

                  return (
                    <div key={step.id || index} className="bg-white p-6 mb-6 rounded-xl relative">
                      <div className="absolute top-4 right-4">
                        <FaTrash className="text-red-500 cursor-pointer h-5 w-5" onClick={() => handleDeleteStep(step.id, index)} />
                      </div>
                      <h2 className="font-bold text-lg mb-4 text-black">Work Instruction {index + 1}</h2>
                      
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold">Title</label>
                          <Field name={`steps.${index}.title`} className="border p-3 w-full rounded-md mt-1" />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold">Step Number</label>
                          <Field name={`steps.${index}.stepNumber`} type="number" className="border p-3 w-full rounded-md mt-1" />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="font-semibold">Work Instruction</label>
                        <Field as="textarea" name={`steps.${index}.workInstruction`} rows={4} className="border p-3 w-full rounded-md mt-1" />
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Images Section */}
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold block mb-2">Upload Images</label>
                          <input
                            type="file" multiple accept="image/*" className="hidden" id={`images-${index}`}
                            onChange={(e) => {
                              const newFiles = Array.from(e.target.files || []);
                              setFieldValue(`steps.${index}.workInstructionImg`, [...step.workInstructionImg, ...newFiles]);
                            }}
                          />
                          <label htmlFor={`images-${index}`} className="block w-full cursor-pointer border rounded-md p-3 text-center bg-gray-100 hover:bg-gray-200">
                            Click to add images
                          </label>
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {step.workInstructionImg.map((file, idx) => (
                              <div key={idx} className="relative w-20 h-20">
                                <img src={"preview" in file ? file.preview : URL.createObjectURL(file)} className="w-full h-full object-cover rounded-md border" />
                                <MdCancel className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full" size={20} onClick={() => handleDeleteImg(file, index)} />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Video Section */}
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold block mb-2">Upload Video (Optional)</label>
                          <input
                            type="file" accept="video/*" className="hidden" id={`video-${index}`}
                            onChange={(e) => setFieldValue(`steps.${index}.workInstructionVideo`, e.target.files?.[0] || null)}
                          />
                          <label htmlFor={`video-${index}`} className="block w-full cursor-pointer border rounded-md p-3 text-center bg-white hover:bg-gray-50">
                            {step.workInstructionVideo?.name || "Upload or Replace Video"}
                          </label>

                          {videoSrc && (
                            <div className="mt-2">
                              <video key={videoSrc} width="100%" controls preload="metadata">
                                <source src={videoSrc} type="video/mp4" />
                              </video>
                              {/* Fix: Click to open video in new tab if needed */}
                              <a href={videoSrc} target="_blank" rel="noreferrer" className="text-blue-500 text-sm mt-1 block underline">
                                View Full Video
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => arrayHelpers.push({ title: "", stepNumber: "", workInstruction: "", workInstructionImg: [], workInstructionVideo: null })} className="bg-brand text-white px-5 py-3 rounded-lg">
                    + Add Step
                  </button>
                  <button type="submit" disabled={formik.isSubmitting} className="bg-brand text-white px-5 py-3 rounded-lg disabled:bg-gray-400">
                    {formik.isSubmitting ? "Saving..." : "Save Instructions"}
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