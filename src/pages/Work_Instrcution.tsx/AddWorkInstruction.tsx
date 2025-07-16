import * as Yup from "yup";
import { useEffect, useState } from "react";
import { FormikProvider, useFormik, Form, Field, FieldArray } from "formik";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import {
  addWorkinstructionInfo,
  selectProcessApi,
  selectProductApi,
} from "./https/workInstructionApi";

type Step = {
  title: string;
  stepNumber: string;
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

const AddWorkInstruction = () => {
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
    productId: Yup.string().required("Product is required"),
    steps: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        stepNumber: Yup.string().required("Step Number is required"),
        workInstruction: Yup.string().required("Instruction is required"),
      })
    ),
  });

  const navigate = useNavigate();
  const formik = useFormik<FormValues>({
    initialValues: {
      processId: "",
      productId: "",
      instructionTitle: "",
      steps: [
        {
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
      try {
        const formData = new FormData();
        formData.append("processId", values.processId);
        formData.append("productId", values.productId);
        formData.append("instructionTitle", values.instructionTitle);

        const instructionSteps = values.steps.map((step) => ({
          stepNumber: step.stepNumber,
          title: step.title,
          partId: step.part_id,
          workInstruction: step.workInstruction,
        }));

        formData.append("instructionSteps", JSON.stringify(instructionSteps));

        values.steps.forEach((step, i) => {
          step.workInstructionImg.forEach((img) => {
            formData.append(`instructionSteps[${i}][workInstructionImgs]`, img);
          });

          if (step.workInstructionVideo) {
            formData.append(
              `instructionSteps[${i}][workInstructionVideo]`,
              step.workInstructionVideo
            );
          }
        });

        const response = await addWorkinstructionInfo(formData);
        if (response.status === 200) {
          navigate("/work-instructions-list");
          console.log("Final Payload:", formData);
        }
      } catch (error) {
        console.error("Error while creating payload:", error);
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
                          onChange={(e) => handleMultipleImageChange(e, index)}
                        />

                        <div className="flex gap-2 mt-2">
                          {step.workInstructionImg?.map((file, idx) => (
                            <img
                              key={idx}
                              src={URL.createObjectURL(file)}
                              className="w-20 h-20 object-cover rounded-md"
                              alt={`step-img-${idx}`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Video Upload */}
                      <div className="w-full sm:w-1/2">
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

                    {/* Video Upload */}
                  </div>
                ))}

                <div className="flex  justify-end gap-4">
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

export default AddWorkInstruction;
