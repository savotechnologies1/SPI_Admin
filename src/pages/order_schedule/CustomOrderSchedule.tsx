// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
// import { searchCustomOrder, searchStockOrder } from "./https/schedulingApis";
// import { stockOrderShedule } from "../../utils/validation";
// import {
//   SearchResultItem,
//   StockOrderScheduleInterface,
// } from "../../utils/Interfaces";
// import CustomItemSelected from "./CustomItemSelected";

// const CustomOrderSchedule = () => {
//   const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(() => {
//     const loadInitialData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await searchCustomOrder({});
//         setSearchResults(response.data || []);
//       } catch (error) {
//         console.error("Initial load failed:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadInitialData();
//   }, []);

//   const handleSearchSubmit = async (
//     values: StockOrderScheduleInterface,
//     { setSubmitting }: FormikHelpers<StockOrderScheduleInterface>,
//   ) => {
//     setIsLoading(true);
//     try {
//       const response = await searchCustomOrder(values);
//       setSearchResults(response.data || []);
//     } catch (error) {
//       console.error("Failed to search stock orders:", error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-5 mt-5">
//       <h1 className="font-semibold text-[20px] md:text-[24px] text-black pb-5">
//         Custom Order Schedule
//       </h1>
//       <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
//         <Formik
//           initialValues={{
//             customerName: "",
//             shipDate: "",
//             partNumber: "",
//           }}
//           validationSchema={stockOrderShedule}
//           onSubmit={handleSearchSubmit}
//         >
//           {({ isSubmitting, resetForm }) => (
//             <Form>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
//                 <div>
//                   <label className="font-semibold">Customer Name</label>
//                   <Field
//                     name="customerName"
//                     type="text"
//                     placeholder="Enter Customer Name"
//                     className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
//                   />
//                   <ErrorMessage
//                     name="customerName"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Ship Date</label>
//                   <Field
//                     name="shipDate"
//                     type="date"
//                     className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
//                   />
//                   <ErrorMessage
//                     name="shipDate"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 <div>
//                   <label className="font-semibold">Part Number</label>
//                   <Field
//                     name="partNumber"
//                     type="text"
//                     placeholder="Enter Part Number"
//                     className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-white px-6 justify-between items-center">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-800 text-white text-md hover:bg-blue-900 transition disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Searching..." : "Search Custom Orders"}
//                 </button>

//                 <button
//                   type="button"
//                   className="text-[#B71D18] text-sm hover:underline cursor-pointer"
//                   onClick={() => {
//                     resetForm();
//                     setSearchResults([]);
//                   }}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       <CustomItemSelected items={searchResults} isLoading={false} />
//     </div>
//   );
// };

// export default CustomOrderSchedule;
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { searchCustomOrder } from "./https/schedulingApis";
import { stockOrderShedule } from "../../utils/validation";
import {
  SearchResultItem,
  StockOrderScheduleInterface,
} from "../../utils/Interfaces";
import CustomItemSelected from "./CustomItemSelected";

// 1. DatePicker और CSS इम्पोर्ट करें
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const CustomOrderSchedule = () => {
//   const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // 2. हेल्पर फंक्शन: लोकल डेट को बिना टाइमजोन बदले YYYY-MM-DD स्ट्रिंग बनाने के लिए
//   const formatLocalDate = (date: Date | null) => {
//     if (!date) return "";
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`;
//   };

//   // 3. डेटा लोड करने के लिए एक कॉमन फंक्शन
//   const fetchOrders = async (params: any = {}) => {
//     setIsLoading(true);
//     try {
//       const response = await searchCustomOrder(params);
//       setSearchResults(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch custom orders:", error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders({}); // शुरुआती लोड
//   }, []);

//   const handleSearchSubmit = async (
//     values: StockOrderScheduleInterface,
//     {
//       setSubmitting,
//     }:
//       | FormikHelpers<StockOrderScheduleInterface>
//       | { setSubmitting: (v: boolean) => void },
//   ) => {
//     const formattedValues = {
//       ...values,
//       shipDate: values.shipDate ? formatLocalDate(values.shipDate as any) : "",
//     };
//     await fetchOrders(formattedValues);
//     if (setSubmitting) setSubmitting(false);
//   };

//   return (
//     <div className="p-5 mt-5">
//       <h1 className="font-semibold text-[20px] md:text-[24px] text-black pb-5">
//         Custom Order Schedule
//       </h1>
//       <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
//         <Formik
//           initialValues={{
//             customerName: "",
//             shipDate: null, // Date object के लिए null रखें
//             partNumber: "",
//           }}
//           validationSchema={stockOrderShedule}
//           onSubmit={handleSearchSubmit}
//         >
//           {({ isSubmitting, resetForm, setFieldValue, values }) => (
//             <Form>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
//                 {/* Customer Name */}
//                 <div>
//                   <label className="font-semibold block mb-2">
//                     Customer Name
//                   </label>
//                   <Field
//                     name="customerName"
//                     type="text"
//                     placeholder="Enter Customer Name"
//                     className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
//                   />
//                 </div>

//                 {/* Ship Date with MM/DD/YYYY and Clear Logic */}
//                 <div>
//                   <label className="font-semibold block mb-2">Ship Date</label>
//                   <div className="datepicker-wrapper">
//                     <DatePicker
//                       selected={values.shipDate as any}
//                       onChange={(date) => {
//                         setFieldValue("shipDate", date);
//                         // अगर 'x' बटन दबाकर डेट क्लियर की गई है (date null है)
//                         if (date === null) {
//                           // बाकी फॉर्म डेटा (name, partNumber) के साथ तुरंत सर्च करें
//                           handleSearchSubmit({ ...values, shipDate: null }, {
//                             setSubmitting: () => {},
//                           } as any);
//                         }
//                       }}
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="MM/DD/YYYY"
//                       isClearable // क्रॉस आइकॉन दिखाएगा
//                       className="border py-3 px-4 rounded-md w-full placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-800"
//                       wrapperClassName="w-full"
//                     />
//                   </div>
//                   <ErrorMessage
//                     name="shipDate"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 {/* Part Number */}
//                 <div>
//                   <label className="font-semibold block mb-2">
//                     Part Number
//                   </label>
//                   <Field
//                     name="partNumber"
//                     type="text"
//                     placeholder="Enter Part Number"
//                     className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-4 mt-4 bg-white px-6 justify-between items-center">
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-800 text-white text-md hover:bg-blue-900 transition disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? "Searching..." : "Search Custom Orders"}
//                 </button>

//                 <button
//                   type="button"
//                   className="text-[#B71D18] text-sm hover:underline cursor-pointer font-semibold"
//                   onClick={() => {
//                     resetForm();
//                     fetchOrders({}); // Clear All करने पर सारा डेटा रिफ्रेश करें
//                   }}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       {/* Results - link to actual isLoading state */}
//       <CustomItemSelected items={searchResults} isLoading={isLoading} />

//       <style>{`
//         .react-datepicker-wrapper {
//           display: block !important;
//           width: 100% !important;
//         }
//         .react-datepicker__close-icon::after {
//           background-color: #637381;
//           font-size: 18px;
//         }
//       `}</style>
//     </div>
//   );
// };

import "react-datepicker/dist/react-datepicker.css";

const CustomOrderSchedule = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Date Format Helper
  const formatLocalDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 2. Common Fetch Function
  const fetchOrders = async (params: any = {}) => {
    setIsLoading(true);
    console.log("API calling with params:", params); // चेक करने के लिए कि क्या जा रहा है
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
    fetchOrders({}); // Initial Load
  }, []);

  const handleSearchSubmit = async (
    values: any,
    { setSubmitting }: FormikHelpers<any>,
  ) => {
    console.log("Form Submitted with values:", values);

    const formattedValues = {
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
        <Formik
          initialValues={{
            customerName: "",
            shipDate: null, // DatePicker के लिए null रखना ज़रूरी है
            partNumber: "",
          }}
          // अगर सर्च नहीं चल रही, तो नीचे दी गई लाइन को अस्थायी रूप से कमेंट करके देखें
          // validationSchema={stockOrderShedule}
          onSubmit={handleSearchSubmit}
        >
          {({ isSubmitting, resetForm, setFieldValue, values, errors }) => {
            // DEBUG: अगर बटन क्लिक करने पर कुछ नहीं हो रहा, तो ये कंसोल में एरर दिखाएगा
            if (Object.keys(errors).length > 0) {
              console.log("Validation Errors:", errors);
            }

            return (
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

                  {/* Ship Date */}
                  <div>
                    <label className="font-semibold block mb-2">
                      Ship Date
                    </label>
                    <div className="datepicker-wrapper">
                      <DatePicker
                        selected={values.shipDate}
                        onChange={(date) => {
                          setFieldValue("shipDate", date);
                          if (date === null) {
                            fetchOrders({}); // 'x' क्लिक करने पर रिफ्रेश
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

                  {/* Part Number */}
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
                    type="submit" // सुनिश्चित करें कि type submit है
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

      {/* isLoading को यहाँ पास करना न भूलें */}
      <CustomItemSelected items={searchResults} isLoading={isLoading} />

      <style>{`
        .react-datepicker-wrapper { display: block !important; width: 100% !important; }
      `}</style>
    </div>
  );
};
export default CustomOrderSchedule;
