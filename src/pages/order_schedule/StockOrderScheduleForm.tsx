import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import ItemSelected from "./ItemSelected";
import { searchStockOrder } from "./https/schedulingApis";
import { stockOrderShedule } from "../../utils/validation";
import {
  SearchResultItem,
  StockOrderScheduleInterface,
} from "../../utils/Interfaces";

// const StockOrderScheduleForm = () => {
//   const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await searchStockOrder({});

//         setSearchResults(response || []);
//       } catch (error) {
//         console.error("Failed to fetch initial stock orders:", error);
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, []);

//   const handleSearchSubmit = async (
//     values: StockOrderScheduleInterface,
//     { setSubmitting }: FormikHelpers<StockOrderScheduleInterface>,
//   ) => {
//     setIsLoading(true);
//     try {
//       const response = await searchStockOrder(values);
//       setSearchResults(response || []);
//     } catch (error) {
//       console.error("Failed to search stock orders:", error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
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
//               {/* Form Fields */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
//                 {/* Customer Name */}
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
//                   {isSubmitting ? "Searching..." : "Search Stock Orders"}
//                 </button>

//                 <button
//                   type="button"
//                   className="text-[#B71D18] text-sm hover:underline cursor-pointer"
//                   onClick={() => {
//                     resetForm();
//                     // Re-fetch data instead of clearing
//                     searchStockOrder({}).then((response) => {
//                       setSearchResults(response || []);
//                     });
//                   }}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       {/* Results */}
//       <ItemSelected availableItems={searchResults} isLoading={isLoading} />
//     </>
//   );
// };

// 1. DatePicker और CSS इम्पोर्ट करें
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const StockOrderScheduleForm = () => {
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await searchStockOrder({});
//         setSearchResults(response || []);
//       } catch (error) {
//         console.error("Failed to fetch initial stock orders:", error);
//         setSearchResults([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);
//   const formatLocalDate = (date: Date) => {
//     if (!date) return null;
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const day = String(date.getDate()).padStart(2, "0");
//     return `${year}-${month}-${day}`; // यह हमेशा "2026-03-08" देगा
//   };
//   const handleSearchSubmit = async (
//     values: any,
//     { setSubmitting }: FormikHelpers<any>,
//   ) => {
//     setIsLoading(true);

//     // 2. API भेजने से पहले Date को YYYY-MM-DD फॉर्मेट में बदलें
//     const formattedValues = {
//       ...values,
//       shipDate: values.shipDate ? formatLocalDate(values.shipDate) : "",
//     };

//     try {
//       const response = await searchStockOrder(formattedValues);
//       setSearchResults(response || []);
//     } catch (error) {
//       console.error("Failed to search stock orders:", error);
//       setSearchResults([]);
//     } finally {
//       setIsLoading(false);
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <div className="p-4 bg-white rounded-2xl border shadow-md mb-6">
//         <Formik
//           initialValues={{
//             customerName: "",
//             shipDate: null, // Date object के लिए null रखें
//             partNumber: "",
//           }}
//           // validationSchema={stockOrderShedule}
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
//                   <ErrorMessage
//                     name="customerName"
//                     component="div"
//                     className="text-red-500 text-sm mt-1"
//                   />
//                 </div>

//                 {/* 3. Updated Ship Date with React Datepicker */}
//                 <div>
//                   <label className="font-semibold block mb-2">Ship Date</label>
//                   <div className="datepicker-wrapper">
//                     <DatePicker
//                       selected={values.shipDate}
//                       onChange={(date) => setFieldValue("shipDate", date)}
//                       dateFormat="MM/dd/yyyy" // Month/Day/Year फॉर्मेट
//                       placeholderText="MM/DD/YYYY"
//                       isClearable
//                       className="border py-3 px-4 rounded-md w-full placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                       // Wrapper को full width बनाने के लिए
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
//                   {isSubmitting ? "Searching..." : "Search Stock Orders"}
//                 </button>

//                 <button
//                   type="button"
//                   className="text-[#B71D18] text-sm hover:underline cursor-pointer font-semibold"
//                   onClick={() => {
//                     resetForm();
//                     searchStockOrder({}).then((response) => {
//                       setSearchResults(response || []);
//                     });
//                   }}
//                 >
//                   Clear All
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>

//       <ItemSelected availableItems={searchResults} isLoading={isLoading} />

//       {/* 4. ज़रुरत पड़ने पर CSS को index.css में डाल दें या यहाँ style टैग में */}
//       <style>{`
//         .react-datepicker-wrapper {
//           display: block !important;
//           width: 100% !important;
//         }
//       `}</style>
//     </>
//   );
// };

import "react-datepicker/dist/react-datepicker.css";

const StockOrderScheduleForm = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // हेल्पर फंक्शन: डेट को फॉर्मेट करने के लिए
  const formatLocalDate = (date: Date | null) => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // डेटा फेच करने के लिए कॉमन फंक्शन
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
    fetchOrders({}); // शुरुआती लोड पर सारा डेटा
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

                {/* Ship Date with Cross Icon logic */}
                <div>
                  <label className="font-semibold block mb-2">Ship Date</label>
                  <div className="datepicker-wrapper">
                    <DatePicker
                      selected={values.shipDate}
                      onChange={(date) => {
                        setFieldValue("shipDate", date);

                        // अगर 'x' बटन दबाकर डेट क्लियर की गई है (date is null)
                        if (date === null) {
                          // तुरंत सर्च कॉल करें बिना डेट फ़िल्टर के, बाकी फ़ील्ड्स (name, part) के साथ
                          handleSearchSubmit({ ...values, shipDate: null }, {
                            setSubmitting: () => {},
                          } as any);
                        }
                      }}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      isClearable // यह क्रॉस 'x' बटन दिखाता है
                      className="border py-3 px-4 rounded-md w-full placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                    fetchOrders({}); // Clear All पर सारा डेटा
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
        /* क्रॉस बटन को सही जगह दिखाने के लिए */
        .react-datepicker__close-icon::after {
          background-color: #637381;
          font-size: 18px;
        }
      `}</style>
    </>
  );
};

export default StockOrderScheduleForm;
