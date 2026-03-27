import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { searchCustomOrder } from "./https/schedulingApis";
import { SearchResultItem } from "../../utils/Interfaces";
import CustomItemSelected from "./CustomItemSelected";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  customerName: string;
  shipDate: Date | null;
  partNumber: string;
}

interface SearchParams {
  customerName?: string;
  partNumber?: string;
  shipDate?: string;
}

const CustomOrderSchedule: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatLocalDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchOrders = async (params: SearchParams = {}) => {
    setIsLoading(true);
    try {
      const response = await searchCustomOrder(params);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("API Error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders({});
  }, []);

  const handleSearchSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>,
  ) => {
    const formattedValues: SearchParams = {
      customerName: values.customerName || "",
      partNumber: values.partNumber || "",
      shipDate: values.shipDate ? formatLocalDate(values.shipDate) : "",
    };

    await fetchOrders(formattedValues);
    setSubmitting(false);
  };

  return (
    <div className="p-5 mt-5">
      <h1 className="font-semibold text-[20px] md:text-[24px] text-black pb-5">
        Custom Order Schedule
      </h1>

      <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
        <Formik<FormValues>
          initialValues={{
            customerName: "",
            shipDate: null,
            partNumber: "",
          }}
          onSubmit={handleSearchSubmit}
        >
          {({ isSubmitting, resetForm, setFieldValue, values, errors }) => {
            if (Object.keys(errors).length > 0) {
              console.log("Validation Errors:", errors);
            }

            return (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
                  <div>
                    <label className="font-semibold block mb-2">
                      Customer Name
                    </label>
                    <Field
                      name="customerName"
                      type="text"
                      placeholder="Enter Customer Name"
                      className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
                    />
                    <ErrorMessage
                      name="customerName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold block mb-2">
                      Ship Date
                    </label>
                    <div className="datepicker-wrapper">
                      <DatePicker
                        selected={values.shipDate}
                        onChange={(date: Date | null) => {
                          setFieldValue("shipDate", date);
                          if (date === null) {
                            fetchOrders({});
                          }
                        }}
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/DD/YYYY"
                        isClearable
                        className="border py-3 px-4 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-800"
                        wrapperClassName="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-2">
                      Part Number
                    </label>
                    <Field
                      name="partNumber"
                      type="text"
                      placeholder="Enter Part Number"
                      className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-white px-6 justify-between items-center">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-800 text-white text-md hover:bg-blue-900 transition disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Searching..." : "Search Custom Orders"}
                  </button>

                  <button
                    type="button"
                    className="text-[#B71D18] text-sm hover:underline cursor-pointer font-semibold"
                    onClick={() => {
                      resetForm();
                      fetchOrders({});
                    }}
                  >
                    Clear All
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>

      <CustomItemSelected items={searchResults} isLoading={isLoading} />

      <style>{`
        .react-datepicker-wrapper { display: block !important; width: 100% !important; }
      `}</style>
    </div>
  );
};

export default CustomOrderSchedule;
