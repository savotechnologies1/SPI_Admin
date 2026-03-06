import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { selectProcess } from "./https/schedulingApis";
import DatePicker from "react-datepicker";

// const DailyScheduleList = () => {
//   interface FormData {
//     date: string;
//     process: string;
//   }

//   const { register, watch } = useForm<FormData>();
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [processes, setProcesses] = useState<
//     { id: string; processName: string; machineName: string }[]
//   >([]);
//   const watchedDate = watch("date");
//   const watchedProcess = watch("process");
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;
//   useEffect(() => {
//     const fetchProcesses = async () => {
//       const res = await selectProcess();
//       setProcesses(res || []);
//     };
//     fetchProcesses();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!watchedDate) return;

//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/daily-schedule-data`,
//           {
//             params: {
//               date: watchedDate,
//               process: watchedProcess || "",
//             },
//           },
//         );

//         if (res.data?.data) {
//           setData(
//             res.data.data.map((item: any) => ({
//               product_name:
//                 item.order?.product?.partNumber || item.part?.partNumber || "-",
//               sub_name: item.subName || "",
//               part: item.part?.process?.processName || "-",
//               machineName: item.part?.process?.machineName || "-",
//               Schedule_Date: item.scheduleQuantity
//                 ? new Date(item.order_date).toISOString().split("T")[0]
//                 : "-",
//               Schedule_time: item.scheduleQuantity
//                 ? new Date(item.order_date)
//                     .toISOString()
//                     .split("T")[1]
//                     .split(".")[0]
//                 : "-",
//               Delivery: item.delivery_date
//                 ? new Date(item.delivery_date).toISOString().split("T")[0]
//                 : "-",
//               quantity: item.quantity || "-",
//             })),
//           );
//         } else {
//           setData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching daily schedule:", error);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [watchedDate, watchedProcess]);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex flex-col md:flex-row gap-3 mb-4">
//         <div className="flex flex-col w-full md:w-1/2 gap-2">
//           <label className="font-semibold">Select Date</label>
//           <input
//             type="date"
//             {...register("date")}
//             className="border py-3 px-4 rounded-md placeholder-gray-600"
//           />
//         </div>

//         <div className="flex flex-col w-full md:w-1/2 gap-2">
//           <label className="font-semibold">Select Process Name</label>
//           <select
//             {...register("process")}
//             className="border py-3 px-4 rounded-md placeholder-gray-600"
//           >
//             <option value="">All</option>
//             {processes.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.processName} ( {p.machineName})
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border-collapse">
//           <thead>
//             <tr className="border-b bg-[#F4F6F8] text-left text-[#637381]">
//               {[
//                 "Product Name",
//                 "Process",
//                 "Schedule Date",
//                 "Delivery",
//                 "Quantity",
//               ].map((header, index) => (
//                 <th
//                   key={index}
//                   className="px-3 py-2 text-sm font-medium whitespace-nowrap"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-500">
//                   Loading...
//                 </td>
//               </tr>
//             ) : data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr key={index} className="border-b text-sm">
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     <p>{item.product_name}</p>
//                     <p className="text-xs text-gray-500">{item.sub_name} </p>
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     {item.part} ({item.machineName})
//                   </td>
//                   <td className="px-3 py-2 flex flex-col whitespace-nowrap">
//                     {item.Schedule_Date}
//                     <span className="text-xs text-gray-500">
//                       {item.Schedule_time}
//                     </span>
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     {item.Delivery}
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     {item.quantity}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-4 text-gray-500">
//                   No records found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DailyScheduleList;

// const DailyScheduleList = () => {
//   interface FormData {
//     date: string;
//     process: string;
//   }

//   // 🔥 आज की तारीख को YYYY-MM-DD फॉर्मेट में प्राप्त करने के लिए फंक्शन
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0];
//   };

//   const { register, watch, control } = useForm<FormData>({
//     defaultValues: {
//       date: getTodayDate(),
//       process: "",
//     },
//   });

//   const [inputType, setInputType] = useState("text");
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [processes, setProcesses] = useState<
//     { id: string; processName: string; machineName: string }[]
//   >([]);

//   const watchedDate = watch("date");
//   const watchedProcess = watch("process");
//   const BASE_URL = import.meta.env.VITE_SERVER_URL;

//   // ... (फेच प्रोसेस वाला useEffect वही रहेगा)
//   useEffect(() => {
//     const fetchProcesses = async () => {
//       // मान लेते हैं selectProcess कहीं से आ रहा है
//       const res = await selectProcess();
//       setProcesses(res || []);
//     };
//     fetchProcesses();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!watchedDate) return;

//       try {
//         setLoading(true);
//         const res = await axios.get(
//           `${BASE_URL}/api/admin/daily-schedule-data`,
//           {
//             params: {
//               date: watchedDate,
//               process: watchedProcess || "",
//             },
//           },
//         );

//         if (res.data?.data) {
//           setData(
//             res.data.data.map((item: any) => ({
//               product_name:
//                 item.order?.product?.partNumber || item.part?.partNumber || "-",
//               sub_name: item.subName || "",
//               part: item.part?.process?.processName || "-",
//               machineName: item.part?.process?.machineName || "-",
//               Schedule_Date: item.scheduleQuantity
//                 ? new Date(item.order_date).toISOString().split("T")[0]
//                 : "-",
//               Schedule_time: item.scheduleQuantity
//                 ? new Date(item.order_date)
//                     .toISOString()
//                     .split("T")[1]
//                     .split(".")[0]
//                 : "-",
//               Delivery: item.delivery_date
//                 ? new Date(item.delivery_date).toISOString().split("T")[0]
//                 : "-",
//               quantity: item.quantity || "-",
//             })),
//           );
//         } else {
//           setData([]);
//         }
//       } catch (error) {
//         console.error("Error fetching daily schedule:", error);
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [watchedDate, watchedProcess, BASE_URL]);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex flex-col md:flex-row gap-3 mb-4">
//         <div className="flex flex-col w-full md:w-1/2 gap-2">
//           <label className="font-semibold text-gray-700">Select Date</label>
//           <Controller
//             control={control}
//             name="date"
//             render={({ field }) => (
//               <DatePicker
//                 selected={field.value}
//                 onChange={(date) => field.onChange(date)}
//                 dateFormat="MM/dd/yyyy"
//                 placeholderText="MM/DD/YYYY"
//                 className="w-full border py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
//                 isClearable
//                 todayButton="Today"
//               />
//             )}
//           />
//         </div>

//         <div className="flex flex-col w-full md:w-1/2 gap-2">
//           <label className="font-semibold">Select Process Name</label>
//           <select
//             {...register("process")}
//             className="border py-3 px-4 rounded-md placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Processes</option>
//             {processes.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.name} ({p.machineName})
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border-collapse">
//           <thead>
//             <tr className="border-b bg-[#F4F6F8] text-left text-[#637381]">
//               {[
//                 "Product Name",
//                 "Process",
//                 "Schedule Date",
//                 "Delivery",
//                 "Quantity",
//               ].map((header, index) => (
//                 <th
//                   key={index}
//                   className="px-3 py-2 text-sm font-medium whitespace-nowrap"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan={5} className="text-center py-10">
//                   <div className="flex justify-center items-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//                     <span className="ml-2">Loading...</span>
//                   </div>
//                 </td>
//               </tr>
//             ) : data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50 text-sm">
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     <p className="font-medium text-gray-800">
//                       {item.product_name}
//                     </p>
//                     <p className="text-xs text-gray-500">{item.sub_name}</p>
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     {item.part}{" "}
//                     <span className="text-gray-400 text-xs">
//                       ({item.machineName})
//                     </span>
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     <div className="flex flex-col">
//                       <span>{item.Schedule_Date}</span>
//                       <span className="text-xs text-gray-400">
//                         {item.Schedule_time}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap font-medium text-orange-600">
//                     {item.Delivery}
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap font-bold">
//                     {item.quantity}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={5} className="text-center py-10 text-gray-400">
//                   No records found for this date.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DailyScheduleList;

// Helper function to format date to MM/DD/YYYY
const formatToMDY = (dateString: any) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

const DailyScheduleList = () => {
  interface FormData {
    date: Date | null; // Date object use karna behtar hai react-datepicker ke liye
    process: string;
  }

  const { register, watch, control } = useForm<FormData>({
    defaultValues: {
      date: new Date(), // Default aaj ki date
      process: "",
    },
  });

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processes, setProcesses] = useState<any[]>([]);

  const watchedDate = watch("date");
  const watchedProcess = watch("process");
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // Fetch Processes
  useEffect(() => {
    const fetchProcesses = async () => {
      try {
        // Aapka selectProcess API call yahan aayega
        // const res = await selectProcess();
        // setProcesses(res || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProcesses();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!watchedDate) return;

      try {
        setLoading(true);

        const year = watchedDate.getFullYear();
        const month = String(watchedDate.getMonth() + 1).padStart(2, "0");
        const day = String(watchedDate.getDate()).padStart(2, "0");
        const apiDate = `${year}-${month}-${day}`;

        const res = await axios.get(
          `${BASE_URL}/api/admin/daily-schedule-data`,
          {
            params: {
              date: apiDate,
              process: watchedProcess || "",
            },
          },
        );

        if (res.data?.data) {
          setData(
            res.data.data.map((item: any) => ({
              product_name:
                item.order?.product?.partNumber || item.part?.partNumber || "-",
              sub_name: item.subName || "",
              part: item.part?.process?.processName || "-",
              machineName: item.part?.process?.machineName || "-",
              // 🔥 Yahan MM/DD/YYYY format apply kiya gaya hai
              Schedule_Date: formatToMDY(item.order_date),
              Schedule_time: item.order_date
                ? new Date(item.order_date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "-",
              Delivery: formatToMDY(item.delivery_date),
              quantity: item.quantity || "-",
            })),
          );
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching daily schedule:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [watchedDate, watchedProcess, BASE_URL]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        {/* Date Picker Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <label className="font-semibold text-gray-700">
            Select Date (MM/DD/YYYY)
          </label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="MM/dd/yyyy" // 🔥 Input box mein format
                className="w-full border py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                isClearable
                placeholderText="Select Date"
              />
            )}
          />
        </div>

        {/* Process Select Section */}
        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <label className="font-semibold">Select Process Name</label>
          <select
            {...register("process")}
            className="border py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Processes</option>
            {processes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.processName} ({p.machineName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="border-b bg-[#F4F6F8] text-left text-[#637381]">
              {[
                "Product Name",
                "Process",
                "Schedule Date",
                "Delivery",
                "Quantity",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-2 text-sm font-medium whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-10">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50 text-sm">
                  <td className="px-3 py-2">
                    <p className="font-medium text-gray-800">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-gray-500">{item.sub_name}</p>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.part}{" "}
                    <span className="text-gray-400 text-xs">
                      ({item.machineName})
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium">{item.Schedule_Date}</span>{" "}
                      {/* MM/DD/YYYY */}
                      <span className="text-xs text-gray-400">
                        {item.Schedule_time}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap font-medium text-orange-600">
                    {item.Delivery} {/* MM/DD/YYYY */}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap font-bold">
                    {item.quantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyScheduleList;
