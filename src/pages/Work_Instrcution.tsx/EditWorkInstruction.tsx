import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikProvider, useFormik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import {
  deleteWorkInstructionImage,
  deleteWorkInstructionSteps,
  editWorkInstruction,
  selectProcessApi,
  selectProductApi,
  workInstructionDetail,
} from "./https/workInstructionApi";
import { MdCancel } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
interface Step {
  title: string;
  part: string;
  stepNumber: string;
  workInstruction: string;
  workInstructionImg: File[] | string[];
  workInstructionVideo: File | string | null;
}

interface FormValues {
  processId: string;
  part_id: string;
  instructionTitle: string;
  steps: Step[];
}
interface FormValues {
  processId: string;
  productId: string;
  instructionTitle: string;
  steps: Array<{
    title: string;
    stepNumber: string;
    workInstruction: string;
    workInstructionImg: any[];
    workInstructionVideo: any;
  }>;
}

const EditWorkInstruction = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const [processData, setProcessData] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [type, setType] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_SERVER_URL;
  useEffect(() => {
    if (id) {
      fetchProcess();
      selectProduct();
      fetchWorkInstructionDetail();
    }
  }, [id]);

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

  const fetchWorkInstructionDetail = async () => {
    try {
      const response = await workInstructionDetail(id);
      setType(response.type);

      const formattedSteps = response.steps.map((step: any) => ({
        id: step.id || "",
        part_id: step.part_id || "",
        title: step.title || "",
        stepNumber: step.stepNumber?.toString() || "",
        workInstruction: step.instruction || "",
        workInstructionImg: step.workInstructionImg.map((img: any) => ({
          name: img.name,
          id: img.id,
          type: "image",
          preview: `${BASE_URL}/uploads/workInstructionImg/${img.name}`,
        })),
        workInstructionVideo: step.workInstructionVideo.length
          ? {
              name: step.workInstructionVideo[0],
              preview: `${BASE_URL}/uploads/workInstructionVideo/${step.workInstructionVideo[0]}`,
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

  const formik = useFormik<FormValues>({
    enableReinitialize: true,
    initialValues: initialValues || {
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
      const formData = new FormData();
      formData.append("processId", values.processId);
      formData.append("productId", values.productId);
      formData.append("instructionTitle", values.instructionTitle);
      formData.append("workInstructionId", id!);
      formData.append("type", type);
      const instructionSteps = values.steps.map((step) => {
        const existingImageIds = step.workInstructionImg
          .filter((img) => !(img instanceof File))
          .map((img) => img.id);
        return {
          stepNumber: step.stepNumber,
          title: step.title,
          workInstruction: step.workInstruction,
          existingImageIds,
        };
      });

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
      const response = await editWorkInstruction(formData);
      if (response.status === 200) {
        navigate("/work-instructions-list");
      }
    },
  });

  const { values, setFieldValue, errors, touched } = formik;

  const handleMultipleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = Array.from(e.target.files || []);
    const existingImgs = values.steps[index].workInstructionImg.filter(
      (img) => !(img instanceof File)
    );
    const newImgs = files.map((file) => {
      return {
        name: file.name,
        file,
        preview: URL.createObjectURL(file),
        type: "image",
      };
    });

    setFieldValue(`steps.${index}.workInstructionImg`, [
      ...existingImgs,
      ...newImgs,
    ]);
  };

  const handleDeleteImg = async (imageId: string, stepIndex: number) => {
    try {
      await deleteWorkInstructionImage(imageId);
      const updatedImgs = values.steps[stepIndex].workInstructionImg.filter(
        (img) => img.id !== imageId
      );
      setFieldValue(`steps.${stepIndex}.workInstructionImg`, updatedImgs);
    } catch (error) {
      throw error;
    }
  };
  const handleDeleteStep = async (id: string) => {
    if (!id) return;
    try {
      await deleteWorkInstructionSteps(id);
    } catch (error) {
      console.error(error);
    }
  };

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-4">
        Edit Work Instruction
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
                    .map((item) => ({ value: item.id, label: item.name }))
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
                      value: item?.id,
                      label: item?.partNumber,
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
                {values.steps.map((step, index) => {
                  let videoSrc = null;
                  if (step.workInstructionVideo) {
                    if (step.workInstructionVideo instanceof File) {
                      videoSrc = URL.createObjectURL(step.workInstructionVideo);
                    } else if (step.workInstructionVideo.preview) {
                      videoSrc = step.workInstructionVideo.preview;
                    }
                  }

                  return (
                    <div key={index} className="bg-white p-6 mb-6 rounded-xl">
                      <h2 className="font-bold text-lg mb-4 text-black">
                        {" "}
                        Work Instruction {index + 1}{" "}
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
                                {" "}
                                {errors.steps[index].title as string}{" "}
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
                                {errors.steps[index].stepNumber as string}
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
                        {touched.steps?.[index]?.workInstruction &&
                          errors.steps?.[index]?.workInstruction && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.steps[index].workInstruction as string}
                            </div>
                          )}
                      </div>

                      <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="w-full sm:w-1/2">
                          <label className="font-semibold">Upload Images</label>
                          <label
                            htmlFor={`images-${index}`}
                            className="block w-full cursor-pointer border rounded-md p-3 text-center text-sm bg-[#919EAB33]"
                          >
                            {" "}
                            Click to select images{" "}
                          </label>
                          <input
                            id={`images-${index}`}
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleMultipleImageChange(e, index)
                            }
                          />
                          <div className="flex gap-2 mt-2 flex-wrap">
                            {step.workInstructionImg?.map((img, idx) => {
                              const src =
                                img instanceof File
                                  ? URL.createObjectURL(img)
                                  : img.preview;
                              return (
                                <div
                                  key={img.id || idx}
                                  className="relative w-20 h-20"
                                >
                                  <img
                                    src={src}
                                    alt={`step-img-${idx}`}
                                    className=" object-cover rounded-md border"
                                  />
                                  {!(img instanceof File) && (
                                    <MdCancel
                                      className="absolute -top-2 -right-2 cursor-pointer text-red-600 bg-white rounded-full"
                                      size={20}
                                      onClick={() =>
                                        handleDeleteImg(img.id, index)
                                      }
                                    />
                                  )}
                                </div>
                              );
                            })}
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
                            <video width="100%" height="auto" controls>
                              <source src={`videoSrc`} type="video/mp4" />
                            </video>
                          )}
                        </div>
                      </div>
                      <FaTrash
                        className="text-red-500 cursor-pointer h-7"
                        onClick={() => handleDeleteStep(step.id)}
                      />
                    </div>
                  );
                })}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      arrayHelpers.push({
                        id: "",
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
