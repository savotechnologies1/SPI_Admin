import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import ItemSelected from "./ItemSelected";
import { searchStockOrder } from "./https/schedulingApis";
import { stockOrderShedule } from "../../utils/validation";
import {
  SearchResultItem,
  StockOrderScheduleInterface,
} from "../../utils/Interfaces";

const StockOrderScheduleForm = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async (
    values: StockOrderScheduleInterface,
    { setSubmitting }: FormikHelpers<StockOrderScheduleInterface>
  ) => {
    setIsLoading(true);
    try {
      const response = await searchStockOrder(values);
      setSearchResults(response.data || []);
    } catch (error) {
      console.error("Failed to search stock orders:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
        <Formik
          initialValues={{
            customerName: "",
            shipDate: "",
            partNumber: "",
          }}
          validationSchema={stockOrderShedule}
          onSubmit={handleSearchSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
                <div>
                  <label className="font-semibold">Customer Name</label>
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
                  <label className="font-semibold">Ship Date</label>
                  <Field
                    name="shipDate"
                    type="date"
                    className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
                  />
                  <ErrorMessage
                    name="shipDate"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="font-semibold">Part Number</label>
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
                  className="text-[#B71D18] text-sm hover:underline cursor-pointer"
                  onClick={() => {
                    resetForm();
                    setSearchResults([]);
                  }}
                >
                  Clear All
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Pass the search results to the ItemSelected component */}
      <ItemSelected availableItems={searchResults} isLoading={isLoading} />
    </>
  );
};

export default StockOrderScheduleForm;
