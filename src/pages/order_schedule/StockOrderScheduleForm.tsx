import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import ItemSelected from "./ItemSelected";
import { searchStockOrder } from "./https/schedulingApis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

const StockOrderScheduleForm = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const formatLocalDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const fetchOrders = async (filters: any) => {
    setIsLoading(true);
    try {
      const response = await searchStockOrder(filters);
      setSearchResults(response || []);
    } catch (error) {
      console.error("Failed to fetch stock orders:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders({});
  }, []);

  const handleSearchSubmit = async (
    values: any,
    {
      setSubmitting,
    }: FormikHelpers<any> | { setSubmitting: (v: boolean) => void },
  ) => {
    const formattedValues = {
      ...values,
      shipDate: values.shipDate ? formatLocalDate(values.shipDate) : "",
    };
    await fetchOrders(formattedValues);
    if (setSubmitting) setSubmitting(false);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
        <Formik
          initialValues={{
            customerName: "",
            shipDate: null,
            partNumber: "",
          }}
          onSubmit={handleSearchSubmit}
        >
          {({ isSubmitting, resetForm, setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
                {/* Customer Name */}
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
                  <label className="font-semibold block mb-2">Ship Date</label>
                  <div className="datepicker-wrapper">
                    <DatePicker
                      selected={values.shipDate}
                      onChange={(date) => {
                        setFieldValue("shipDate", date);
                        if (date === null) {
                          handleSearchSubmit({ ...values, shipDate: null }, {
                            setSubmitting: () => {},
                          } as any);
                        }
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      isClearable
                      className="border py-3 px-4 rounded-md w-full placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                  {isSubmitting ? "Searching..." : "Search Stock Orders"}
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
          )}
        </Formik>
      </div>

      <ItemSelected availableItems={searchResults} isLoading={isLoading} />

      <style>{`
        .react-datepicker-wrapper {
          display: block !important;
          width: 100% !important;
        }
   
        .react-datepicker__close-icon::after {
          background-color: #637381;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default StockOrderScheduleForm;
