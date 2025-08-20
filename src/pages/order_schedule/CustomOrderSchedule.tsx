// import { NavLink } from "react-router-dom";
// import { FaCircle } from "react-icons/fa";

// import CustomOrderScheduleForm from "./CustomOrderScheduleForm";

// const CustomOrderSchedule = () => {
//   return (
//     <div className="p-4">
//       <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4 md:mb-0  ">
//         <div>
//           {" "}
//           <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//             Custom Order Schedule
//           </h1>
//         </div>
//         <div>
//           <button className="py-2 px-10  border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
//             <NavLink to=""> Schedule Custom Order</NavLink>
//           </button>
//         </div>
//       </div>
//       <div className="flex justify-between  items-center">
//         <div className="flex gap-2 items-center ">
//           <p
//             className={`text-[14px] text-black`}
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             Order Schedule
//           </span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             Custom Order Schedule
//           </span>
//         </div>
//       </div>

//         <div className="py-6">
//         <CustomOrderScheduleForm />
//       </div>

//     </div>
//   );
// };

// export default CustomOrderSchedule;

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import ItemSelected from "./ItemSelected";
import { searchCustomOrder, searchStockOrder } from "./https/schedulingApis";
import { stockOrderShedule } from "../../utils/validation";
import {
  SearchResultItem,
  StockOrderScheduleInterface,
} from "../../utils/Interfaces";
import CustomItemSelected from "./CustomItemSelected";

const CustomOrderSchedule = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = async (
    values: StockOrderScheduleInterface,
    { setSubmitting }: FormikHelpers<StockOrderScheduleInterface>
  ) => {
    setIsLoading(true);
    try {
      const response = await searchCustomOrder(values);
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
    <div className="p-5">
      <h1 className="font-semibold text-[20px] md:text-[24px] text-black pb-5">
        Custom Order Schedule
      </h1>
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
                  {isSubmitting ? "Searching..." : "Search Custom Orders"}
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

      <CustomItemSelected items={searchResults} isLoading={false} />
    </div>
  );
};

export default CustomOrderSchedule;
