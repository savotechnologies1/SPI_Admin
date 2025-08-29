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

// --- STEP 1: DEFINE STRICT TYPES ---

type Process = { id: string; name: string };
type Product = { id: string; partNumber: string };
type SelectOption = { value: string; label: string };

// Represents a file that already exists on the server
type ExistingFile = {
  id: string;
  name: string;
  preview: string;
  type: "image" | "video";
};

// A step can contain existing files or new files (File object)
type Step = {
  id?: string; // Existing steps have an ID
  title: string;
  part_id: string; // Assuming this might be needed
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

  // --- STEP 2: DATA FETCHING & TRANSFORMATION ---
  useEffect(() => {
    const fetchAllData = async () => {
      if (!id) return;
      try {
        // Fetch all data in parallel for better performance
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

          // Transform API response into the structure our form needs
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
              workInstructionVideo: step.workInstructionVideo?.length
                ? {
                    id: step.workInstructionVideo[0].id, // Assuming video has an ID
                    name: step.workInstructionVideo[0].name,
                    preview: `${BASE_URL}/uploads/workInstructionVideo/${step.workInstructionVideo[0]}`,
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
        // Optionally navigate away or show an error message
      }
    };

    fetchAllData();
  }, [id, BASE_URL]);

  // --- STEP 3: VALIDATION SCHEMA ---
  const validationSchema = Yup.object().shape({
    instructionTitle: Yup.string().required(
      "Work instruction title is required"
    ),
    processId: Yup.string().required("Process is required"),
    productId: Yup.string().required("Product is required"),
    steps: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Title is required"),
          stepNumber: Yup.number()
            .typeError("Step number must be a number")
            .required("Step number is required"),
          workInstruction: Yup.string()
            .min(10, "Instruction must be at least 10 characters")
            .required("Instruction is required"),
          workInstructionImg: Yup.array()
            .min(1, "At least one image is required")
            .required("Image is required"),
        })
      )
      .min(1, "At least one step is required"),
  });

  // --- STEP 4: FORMIK SETUP WITH OPTIMIZED SUBMISSION ---
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

      // Separate step metadata from files for a cleaner API
      const instructionStepsPayload = values.steps.map((step) => ({
        id: step.id, // For identifying existing steps to update
        stepNumber: step.stepNumber,
        title: step.title,
        workInstruction: step.workInstruction,
        // Send only the IDs of existing images that were not deleted
        existingImageIds: step.workInstructionImg
          .filter((img): img is ExistingFile => "id" in img)
          .map((img) => img.id),
      }));

      formData.append(
        "instructionSteps",
        JSON.stringify(instructionStepsPayload)
      );

      // Append only NEW files, associating them by index
      values.steps.forEach((step, index) => {
        // Append new images
        step.workInstructionImg.forEach((img) => {
          if (img instanceof File) {
            formData.append(
              `instructionSteps[${index}][workInstructionImgs]`,
              img
            );
          }
        });
        // Append new video if it exists
        if (step.workInstructionVideo instanceof File) {
          formData.append(
            `instructionSteps[${index}][workInstructionVideo]`,
            step.workInstructionVideo
          );
        }
      });

      try {
        const response = await editWorkInstruction(formData);
        if (response && response.status === 200) {
          navigate("/work-instructions-list");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  const { values, setFieldValue, errors, touched, handleSubmit } = formik;

  // --- STEP 5: OPTIMIZATIONS & HELPERS ---

  // Memoize select options to prevent re-computation
  const processOptions = useMemo<SelectOption[]>(
    () => processData.map((item) => ({ value: item.id, label: item.name })),
    [processData]
  );
  const productOptions = useMemo<SelectOption[]>(
    () =>
      productData.map((item) => ({ value: item.id, label: item.partNumber })),
    [productData]
  );

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    const urlsToRevoke: string[] = [];
    values.steps.forEach((step) => {
      step.workInstructionImg.forEach((file) => {
        if (file instanceof File) urlsToRevoke.push(URL.createObjectURL(file));
      });
      if (step.workInstructionVideo instanceof File) {
        urlsToRevoke.push(URL.createObjectURL(step.workInstructionVideo));
      }
    });
    return () => {
      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [values.steps]);

  // Smarter handler for deleting images
  const handleDeleteImg = async (
    fileOrId: File | ExistingFile,
    stepIndex: number
  ) => {
    try {
      if ("id" in fileOrId) {
        // It's an existing file, call API
        await deleteWorkInstructionImage(fileOrId.id);
      }
      // Whether new or existing, remove it from the form state
      const updatedImgs = values.steps[stepIndex].workInstructionImg.filter(
        (img) => img !== fileOrId
      );
      setFieldValue(`steps.${stepIndex}.workInstructionImg`, updatedImgs);
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const handleDeleteStep = async (
    stepId: string | undefined,
    stepIndex: number
  ) => {
    try {
      if (stepId) {
        // If the step exists on the server
        await deleteWorkInstructionSteps(stepId);
      }
      // Always remove the step from the UI
      const updatedSteps = values.steps.filter(
        (_, index) => index !== stepIndex
      );
      setFieldValue("steps", updatedSteps);
    } catch (error) {
      console.error("Failed to delete step:", error);
    }
  };

  if (!initialValues) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  // --- STEP 6: RENDER JSX ---
  return (
    <div className="p-4 sm:p-6 mt-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">
        Edit Work Instruction
      </h1>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          {/* Top Level Fields */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Work Instruction Title</label>
              <Field
                name="instructionTitle"
                className="border p-3 w-full rounded-md mt-1"
              />
              {touched.instructionTitle && errors.instructionTitle && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.instructionTitle}
                </div>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Process</label>
              <Select
                options={processOptions}
                value={
                  processOptions.find(
                    (opt) => opt.value === values.processId
                  ) || null
                }
                onChange={(opt) => setFieldValue("processId", opt?.value || "")}
                isClearable
              />
              {touched.processId && errors.processId && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.processId}
                </div>
              )}
            </div>
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Product</label>
              <Select
                options={productOptions}
                value={
                  productOptions.find(
                    (opt) => opt.value === values.productId
                  ) || null
                }
                onChange={(opt) => setFieldValue("productId", opt?.value || "")}
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
                {values.steps.map((step, index) => {
                  const stepErrors =
                    Array.isArray(errors.steps) && errors.steps[index]
                      ? (errors.steps[index] as FormikErrors<Step>)
                      : undefined;
                  const stepTouched =
                    Array.isArray(touched.steps) && touched.steps[index]
                      ? touched.steps[index]
                      : undefined;

                  const videoSrc = step.workInstructionVideo
                    ? "preview" in step.workInstructionVideo
                      ? step.workInstructionVideo.preview
                      : URL.createObjectURL(step.workInstructionVideo)
                    : null;

                  return (
                    <div
                      key={step.id || index}
                      className="bg-white p-6 mb-6 rounded-xl relative"
                    >
                      <div className="absolute top-4 right-4">
                        <FaTrash
                          className="text-red-500 cursor-pointer h-5 w-5"
                          onClick={() => handleDeleteStep(step.id, index)}
                        />
                      </div>
                      <h2 className="font-bold text-lg mb-4 text-black">
                        Work Instruction {index + 1}
                      </h2>
                      {/* Step Fields */}
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold">Title</label>
                          <Field
                            name={`steps.${index}.title`}
                            className="border p-3 w-full rounded-md mt-1"
                          />
                          {stepTouched?.title && stepErrors?.title && (
                            <div className="text-red-500 text-sm mt-1">
                              {stepErrors.title}
                            </div>
                          )}
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold">Step Number</label>
                          <Field
                            name={`steps.${index}.stepNumber`}
                            type="number"
                            className="border p-3 w-full rounded-md mt-1"
                          />
                          {stepTouched?.stepNumber &&
                            stepErrors?.stepNumber && (
                              <div className="text-red-500 text-sm mt-1">
                                {stepErrors.stepNumber}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="font-semibold">
                          Work Instruction
                        </label>
                        <Field
                          as="textarea"
                          name={`steps.${index}.workInstruction`}
                          rows={4}
                          className="border p-3 w-full rounded-md mt-1"
                        />
                        {stepTouched?.workInstruction &&
                          stepErrors?.workInstruction && (
                            <div className="text-red-500 text-sm mt-1">
                              {stepErrors.workInstruction}
                            </div>
                          )}
                      </div>

                      {/* File Uploads */}
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold block mb-2">
                            Upload Images
                          </label>
                          <label
                            htmlFor={`images-${index}`}
                            className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-gray-100 hover:bg-gray-200"
                          >
                            Click to add images
                          </label>
                          <input
                            id={`images-${index}`}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const newFiles = Array.from(e.target.files || []);
                              setFieldValue(
                                `steps.${index}.workInstructionImg`,
                                [...step.workInstructionImg, ...newFiles]
                              );
                            }}
                          />
                          {stepTouched?.workInstructionImg &&
                            typeof stepErrors?.workInstructionImg ===
                              "string" && (
                              <div className="text-red-500 text-sm mt-1">
                                {stepErrors.workInstructionImg}
                              </div>
                            )}
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {step.workInstructionImg.map((file, idx) => (
                              <div key={idx} className="relative w-20 h-20">
                                <img
                                  src={
                                    "preview" in file
                                      ? file.preview
                                      : URL.createObjectURL(file)
                                  }
                                  alt="upload-preview"
                                  className="w-full h-full object-cover rounded-md border"
                                />
                                <MdCancel
                                  className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full"
                                  size={20}
                                  onClick={() => handleDeleteImg(file, index)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold block mb-2">
                            Upload Video
                          </label>
                          <label
                            htmlFor={`video-${index}`}
                            className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-white hover:bg-gray-50"
                          >
                            {step.workInstructionVideo?.name ||
                              "Upload or Replace Video"}
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
                          {videoSrc && (
                            <div className="mt-2">
                              <video
                                key={videoSrc}
                                width="100%"
                                height="auto"
                                controls
                                preload="metadata"
                              >
                                <source src={videoSrc} type="video/mp4" />
                              </video>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

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
                    disabled={formik.isSubmitting}
                    className="bg-brand text-white px-5 py-3 rounded-lg disabled:bg-gray-400"
                  >
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
