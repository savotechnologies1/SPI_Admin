import * as Yup from "yup";
import { useEffect, useMemo, useState } from "react";
import {
  FormikProvider,
  useFormik,
  Form,
  Field,
  FieldArray,
  FormikErrors,
} from "formik";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  addWorkinstructionInfo,
  selectProcessApi,
  selectProductApi,
} from "./https/workInstructionApi";
import { toast } from "react-toastify";

// Define strict types for API data and form state
type Process = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  partNumber: string;
};

type Step = {
  title: string;
  stepNumber: string;
  partId: string; // This was missing but used in logic
  workInstruction: string;
  workInstructionImg: File[];
  workInstructionVideo: File | null;
};

type FormValues = {
  processId: string;
  productId: string;
  instructionTitle: string;
  steps: Step[];
};

// A helper type for react-select options for better readability
type SelectOption = {
  value: string;
  label: string;
};

const AddWorkInstruction = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [processData, setProcessData] = useState<Process[]>([]);
  const navigate = useNavigate();

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const processResponse = await selectProcessApi();
        setProcessData(processResponse || []);

        const productResponse = await selectProductApi();
        setProductData(productResponse.data || []);
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      }
    };
    fetchInitialData();
  }, []);

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
            .integer("Step number must be an integer")
            .positive("Step number must be positive")
            .required("Step number is required"),
          workInstruction: Yup.string()
            .min(10, "Instruction must be at least 10 characters")
            .max(2000, "Instruction cannot exceed 2000 characters")
            .required("Instruction is required"),
          workInstructionImg: Yup.array()
            .min(1, "At least one image is required")
            .required("Image is required"),
          // Video is optional, so no validation needed unless specified
        })
      )
      .min(1, "At least one step is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      processId: "",
      productId: "",
      instructionTitle: "",
      steps: [
        {
          title: "",
          stepNumber: "",
          partId: "",
          workInstruction: "",
          workInstructionImg: [],
          workInstructionVideo: null,
        },
      ],
    },
    validationSchema,

    onSubmit: async (values) => {
      const formData = new FormData();

      // Append top-level fields
      formData.append("processId", values.processId);
      formData.append("productId", values.productId);
      formData.append("instructionTitle", values.instructionTitle);

      // Prepare step metadata (without files) to be sent as a JSON string
      const instructionStepsMetadata = values.steps.map((step) => ({
        stepNumber: step.stepNumber,
        title: step.title,
        partId: step.partId,
        workInstruction: step.workInstruction,
      }));
      formData.append(
        "instructionSteps",
        JSON.stringify(instructionStepsMetadata)
      );

      // Append files separately, associating them by index.
      // The backend will need to match these files to the corresponding step from the JSON data.
      values.steps.forEach((step, index) => {
        step.workInstructionImg.forEach((imgFile) => {
          // A common pattern is to name the field based on the step index
          formData.append(
            `instructionSteps[${index}][workInstructionImgs]`,
            imgFile
          );
        });

        if (step.workInstructionVideo) {
          formData.append(
            `instructionSteps[${index}][workInstructionVideo]`,
            step.workInstructionVideo
          );
        }
      });

      try {
        const response = await addWorkinstructionInfo(formData);
        if (response && response.status === 201) {
          navigate("/work-instructions-list");
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const { values, setFieldValue, errors, touched } = formik;

  const processOptions = useMemo<SelectOption[]>(
    () => processData.map((item) => ({ value: item.id, label: item.name })),
    [processData]
  );

  const productOptions = useMemo<SelectOption[]>(
    () =>
      productData.map((item) => ({ value: item.id, label: item.partNumber })),
    [productData]
  );

  useEffect(() => {
    const urlsToRevoke: string[] = [];
    values.steps.forEach((step) => {
      step.workInstructionImg.forEach((file) => {
        const url = URL.createObjectURL(file);
        urlsToRevoke.push(url);
      });
      if (step.workInstructionVideo) {
        const url = URL.createObjectURL(step.workInstructionVideo);
        urlsToRevoke.push(url);
      }
    });

    return () => {
      urlsToRevoke.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [values.steps]);

  return (
    <div className="p-4 sm:p-6 mt-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">
        Add Work Instruction
      </h1>
      <FormikProvider value={formik}>
        <Form>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Work Instruction Title</label>
              <Field
                name="instructionTitle"
                className="border p-3 w-full rounded-md mt-1"
                placeholder="Enter instruction title"
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
                onChange={(option) =>
                  setFieldValue("processId", option?.value || "")
                }
                value={
                  processOptions.find(
                    (opt) => opt.value === values.processId
                  ) || null
                }
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
                onChange={(option) =>
                  setFieldValue("productId", option?.value || "")
                }
                value={
                  productOptions.find(
                    (opt) => opt.value === values.productId
                  ) || null
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
                {values.steps.map((step, index) => {
                  // Safely access errors and touched status for a specific step
                  const stepErrors =
                    Array.isArray(errors.steps) && errors.steps[index]
                      ? (errors.steps[index] as FormikErrors<Step>)
                      : undefined;
                  const stepTouched =
                    Array.isArray(touched.steps) && touched.steps[index]
                      ? touched.steps[index]
                      : undefined;

                  return (
                    <div key={index} className="bg-white p-6 mb-6 rounded-xl">
                      <h2 className="font-bold text-lg mb-4 text-black">
                        Work Instruction {index + 1}
                      </h2>
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold">Title</label>
                          <Field
                            name={`steps.${index}.title`}
                            className="border p-3 w-full rounded-md mt-1"
                            placeholder="Enter title"
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
                            min="1"
                            step="1"
                            className="border p-3 w-full rounded-md mt-1"
                            placeholder="Enter step number"
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
                          className="border p-3 w-full rounded-md mt-1"
                          placeholder="Write instruction"
                          rows={4}
                        />
                        {stepTouched?.workInstruction &&
                          stepErrors?.workInstruction && (
                            <div className="text-red-500 text-sm mt-1">
                              {stepErrors.workInstruction}
                            </div>
                          )}
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold block mb-2">
                            Upload Images
                          </label>
                          <label
                            htmlFor={`steps.${index}.workInstructionImg`}
                            className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-white hover:bg-gray-50"
                          >
                            Upload Images
                          </label>
                          <input
                            id={`steps.${index}.workInstructionImg`}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              setFieldValue(
                                `steps.${index}.workInstructionImg`,
                                Array.from(e.target.files || [])
                              )
                            }
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
                              <div key={idx} className="relative">
                                <img
                                  src={URL.createObjectURL(file)}
                                  className="w-20 h-20 object-cover rounded-md"
                                  alt={`step-img-${idx}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updatedImgs =
                                      step.workInstructionImg.filter(
                                        (_, i) => i !== idx
                                      );
                                    setFieldValue(
                                      `steps.${index}.workInstructionImg`,
                                      updatedImgs
                                    );
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold block mb-2">
                            Upload Video (Optional)
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
                          {step.workInstructionVideo && (
                            <div className="relative inline-block mt-2">
                              <video
                                src={URL.createObjectURL(
                                  step.workInstructionVideo
                                )}
                                controls
                                preload="metadata"
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "150px",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setFieldValue(
                                    `steps.${index}.workInstructionVideo`,
                                    null
                                  )
                                }
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
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
                        partId: "",
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
                    disabled={formik.isSubmitting}
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

export default AddWorkInstruction;
