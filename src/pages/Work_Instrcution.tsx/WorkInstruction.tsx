import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  workInstructionApi,
  selectProcessApi,
  selectProductApi,
} from "./https/workInstructionApi";

const WorkInstruction = () => {
  const [processData, setProcessData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetchProcess();
    selectProduct();
    workProcess();
  }, []);

  const fetchProcess = async () => {
    try {
      const response = await selectProcessApi();
      setProcessData(response || []);
    } catch (error) {
      console.error("Failed to fetch process:", error);
    }
  };

  const workProcess = async () => {
    try {
      const response = await workInstructionApi();
      setProcessData(response.processData || []);
    } catch (error) {
      console.error("Work process fetch failed:", error);
    }
  };
  const selectProduct = async () => {
    try {
      const response = await selectProductApi();
      setProductData(response.data || []);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Work Instruction
        </h1>
      </div>

      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p className={`text-xs sm:text-[14px] text-black`}>
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px]">Work Instruction</span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px]">
            Select process & product
          </span>
        </div>
      </div>

      <div className="mt-4 bg-white p-6 w-full rounded-2xl">
        <Formik
          initialValues={{ process: "", product: "" }}
          validate={(values) => {
            const errors: any = {};
            if (!values.process) errors.process = "Process is required";
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            // try {
            //   console.log("valllllllllllueeeeeeeeee", values);
            //   const response: any = await addWorkInstruction({
            //     processId: values.process,
            //     productId: values.product,
            //   });
            //   console.log("responseresponse", response.data.data.processId);
            //   if (response.status === 201) {
            //     navigate("/add-work-instruction");
            //   }
            // } catch (error) {
            //   console.error("Error adding instruction:", error);
            // } finally {
            //   setSubmitting(false);
            // }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="w-full md:w-1/2">
                  <label className="font-semibold" htmlFor="process">
                    Select Process
                  </label>
                  <Field
                    as="select"
                    name="process"
                    className="border py-4 px-4 rounded-md w-full mt-2"
                  >
                    <option value="">Select Process</option>
                    {processData.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        ` {item.name} ({item.machineName})`
                      </option>
                    ))}
                  </Field>
                  {errors.process && touched.process && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.process}
                    </p>
                  )}
                </div>

                <div className="w-full md:w-1/2">
                  <label className="font-semibold" htmlFor="product">
                    Select Product
                  </label>
                  <Field
                    as="select"
                    name="product"
                    className="border py-4 px-4 rounded-md w-full mt-2"
                  >
                    <option value="">Select Product</option>
                    {productData.map((item: any) => (
                      <option key={item.value} value={item.value}>
                        {item.productNumber}
                      </option>
                    ))}
                  </Field>
                  {errors.product && touched.product && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.product}
                    </p>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WorkInstruction;
