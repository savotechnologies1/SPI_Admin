import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormikProvider, useFormik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import * as Yup from "yup";
import {
  addWorkinstructionInfo,
  selectProcessApi,
  selectProductApi,
} from "./https/workInstructionApi";

interface WorkInstructionStep {
  title: string;
  part: string;
  stepNumber: string;
  workInstruction: string;
  workInstructionImg: File[];
  workInstructionVideo: File | null;
}

interface FormValues {
  processId: string;
  part_id: string;
  steps: WorkInstructionStep[];
}

const AddWorkInstruction = () => {
  const instructionId = localStorage.getItem("instructionId") || "";
  const [productData, setProductData] = useState<any[]>([]);
  const [processData, setProcessData] = useState<any[]>([]);

  useEffect(() => {
    fetchProcess();
    selectProduct();
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

  const validationSchema = Yup.object().shape({
    processId: Yup.string().required("Process is required"),
    part_id: Yup.string().required("Product is required"),
    steps: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Title is required"),
          stepNumber: Yup.string().required("Step Number is required"),
          workInstruction: Yup.string().required("Instruction is required"),
        })
      )
      .min(1, "At least one step is required"),
  });

  const formik = useFormik<FormValues>({
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
    validationSchema,
    onSubmit: async (values) => {
      try {
        const workInstructionId = uuidv4().slice(0, 6);
        for (const step of values.steps) {
          const formData = new FormData();
          formData.append("workInstructionId", workInstructionId);
          formData.append("processId", values.processId);
          formData.append("part_id", values.part_id);
          formData.append("stepNumber", step.stepNumber);
          formData.append("title", step.title);
          formData.append("instruction", step.workInstruction);

          step.workInstructionImg.forEach((file) =>
            formData.append("workInstructionImg", file)
          );

          if (step.workInstructionVideo) {
            formData.append("workInstructionVideo", step.workInstructionVideo);
          }

          await addWorkinstructionInfo(formData);
        }
      } catch (error) {
        console.error(" Error submitting steps:", error);
      }
    },
  });

  const { values, setFieldValue, errors, touched } = formik;

  const handleMultipleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(e.target.files || []);
    setFieldValue(`steps.${index}.workInstructionImg`, files);
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">
        Add Work Instruction
      </h1>

      <FormikProvider value={formik}>
        <Form>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Process */}
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Process</label>
              <Select
                options={processData.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
                name="processId"
                className="mt-2"
                onChange={(selectedOption) =>
                  setFieldValue("processId", selectedOption?.value)
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
                styles={{
                  dropdownIndicator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                }}
              />
              {touched.processId && errors.processId && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.processId}
                </div>
              )}
            </div>

            {/* Product */}
            <div className="w-full sm:w-1/2">
              <label className="font-semibold">Select Product</label>
              <Select
                options={productData.map((item) => ({
                  value: item.id,
                  label: item.partNumber,
                }))}
                name="part_id"
                className="mt-2"
                onChange={(selectedOption) =>
                  setFieldValue("part_id", selectedOption?.value)
                }
                value={
                  productData
                    .map((item) => ({
                      value: item.id,
                      label: item.partNumber,
                    }))
                    .find((opt) => opt.value === values.part_id) || null
                }
                isClearable
                styles={{
                  dropdownIndicator: (base) => ({
                    ...base,
                    display: "none",
                  }),
                }}
              />
              {touched.part_id && errors.part_id && (
                <div className="text-red-500 text-sm mt-1">
                  {errors.part_id}
                </div>
              )}
            </div>
          </div>

          <FieldArray
            name="steps"
            render={(arrayHelpers) => (
              <>
                {values.steps.map((step, index) => (
                  <div
                    key={index}
                    className="mt-4 bg-white p-6 w-full rounded-2xl"
                  >
                    <h2 className="font-bold text-xl mb-6 text-black">
                      Work Instruction {index + 1}
                    </h2>

                    {/* Title & Step Number */}

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="w-full sm:w-1/2">
                        <label className="font-semibold">Select Part</label>
                        <Select
                          options={productData.map((item) => ({
                            value: item.id,
                            label: item.partNumber,
                          }))}
                          name="part_id"
                          className="mt-2"
                          onChange={(selectedOption) =>
                            setFieldValue("part_id", selectedOption?.value)
                          }
                          value={
                            productData
                              .map((item) => ({
                                value: item.id,
                                label: item.partNumber,
                              }))
                              .find((opt) => opt.value === values.part_id) ||
                            null
                          }
                          isClearable
                          styles={{
                            dropdownIndicator: (base) => ({
                              ...base,
                              display: "none",
                            }),
                          }}
                        />
                        {touched.part_id && errors.part_id && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.part_id}
                          </div>
                        )}
                      </div>
                      <div className="w-full md:w-1/2">
                        <label className="font-semibold">
                          Work Instruction Title
                        </label>
                        <Field
                          name={`steps.${index}.title`}
                          className="border py-3 px-4 rounded-md w-full mt-2"
                          placeholder="Enter title"
                        />
                        {touched.steps?.[index]?.title &&
                          errors.steps?.[index]?.title && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.steps[index].title}
                            </div>
                          )}
                      </div>

                      <div className="w-full md:w-1/2">
                        <label className="font-semibold">Step No.</label>
                        <Field
                          name={`steps.${index}.stepNumber`}
                          type="number"
                          className="border py-3 px-4 rounded-md w-full mt-2"
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
                    <div className="mb-6">
                      <label className="font-semibold">Work Instruction</label>
                      <Field
                        as="textarea"
                        name={`steps.${index}.workInstruction`}
                        rows={4}
                        className="border py-3 px-4 rounded-md w-full mt-2"
                        placeholder="Describe the instruction..."
                      />
                      {touched.steps?.[index]?.workInstruction &&
                        errors.steps?.[index]?.workInstruction && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.steps[index].workInstruction}
                          </div>
                        )}
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
