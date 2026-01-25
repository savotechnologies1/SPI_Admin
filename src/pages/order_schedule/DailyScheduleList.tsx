import data from "../../components/Data/DailyScheduleData";
import { useForm } from "react-hook-form";

// const DailyScheduleList = () => {
//   interface FormData {
//     date: string;
//     process: string;
//   }

//   const { register, handleSubmit } = useForm<FormData>();

//   const onSubmit = (data: { date: any; process: any }) => {
//     console.log("Selected Date:", data.date);
//     console.log("Selected Process Name:", data.process);
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="fle gap-2 flex-col">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
//             <div className="flex flex-col w-full md:w-1/2 gap-2">
//               <label className="font-semibold">Select Date</label>
//               <input
//                 type="date"
//                 {...register("date")}
//                 className="border py-3 px-4 rounded-md placeholder-gray-600"
//               />
//             </div>

//             <div className="flex flex-col w-full md:w-1/2 gap-2">
//               <label className="font-semibold">Select Process Name</label>
//               <select
//                 {...register("process")}
//                 className="border py-3 px-4 rounded-md placeholder-gray-600"
//               >
//                 <option value="">Select</option>
//                 <option value="Cortez">Cortez</option>
//                 <option value="Maverick">Maverick</option>
//               </select>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-brand text-white py-2 px-6 rounded-md mb-4"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       <div className="overflow-x-auto ">
//         <table className="min-w-full bg-white border-collapse ">
//           <thead>
//             <tr className="border-b bg-[#F4F6F8] text-left text-[#637381] ">
//               {[
//                 "Product Name",
//                 "Process",
//                 "Schedule Date ",
//                 "Delivery ",
//                 "Quantity ",
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
//           <tbody className="">
//             {data.map((item, index) => (
//               <tr key={index} className="border-b text-sm">
//                 <td className="px-3 py-2 whitespace-nowrap">
//                   <p>{item.product_name}</p>
//                   <p>{item.sub_name}</p>
//                 </td>
//                 <td className="px-3 py-2 whitespace-nowrap">{item.part}</td>

//                 <td className="px-3 py-2 flex flex-col whitespace-nowrap">
//                   {item.Schedule_Date}{" "}
//                   <span className="text-xs text-gray-500 whitespace-nowrap">
//                     {item.Schedule_time}
//                   </span>
//                 </td>

//                 <td className="px-3 py-2 whitespace-nowrap">{item.Delivery}</td>
//                 <td className="px-3 py-2 whitespace-nowrap">{item.quantity}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DailyScheduleList;

import { useEffect, useState } from "react";
import axios from "axios";
import { selectProcess } from "./https/schedulingApis";

// const DailyScheduleList = () => {
//   interface FormData {
//     date: string;
//     process: string;
//   }

//   const { register, handleSubmit } = useForm<FormData>();
//   const [data, setData] = useState<any[]>([]); // state to hold API data
//   const [loading, setLoading] = useState(false);

//   const onSubmit = async (formData: FormData) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         "http://localhost:8080/api/admin/daily-schedule-data",
//         {
//           params: {
//             date: formData.date,
//             process: formData.process,
//           },
//         }
//       );
//       console.log("resres", res);

//       if (res.data?.data) {
//         setData(
//           res.data.data.map((item: any) => ({
//             product_name:
//               item.order?.product?.partNumber ||
//               item.order?.part?.partNumber ||
//               "-",
//             sub_name: item.order?.subName || "",
//             part: item.part?.process || "-",
//             Schedule_Date: item.Schedule_Date?.split("T")[0] || "-",
//             Schedule_time: item.Schedule_time || "-",
//             Delivery: item.Delivery || "-",
//             quantity: item.quantity || "-",
//           }))
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching daily schedule:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//       <div className="flex gap-2 flex-col">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
//             <div className="flex flex-col w-full md:w-1/2 gap-2">
//               <label className="font-semibold">Select Date</label>
//               <input
//                 type="date"
//                 {...register("date")}
//                 className="border py-3 px-4 rounded-md placeholder-gray-600"
//               />
//             </div>

//             <div className="flex flex-col w-full md:w-1/2 gap-2">
//               <label className="font-semibold">Select Process Name</label>
//               <select
//                 {...register("process")}
//                 className="border py-3 px-4 rounded-md placeholder-gray-600"
//               >
//                 <option value="">Select</option>
//                 <option value="Cortez">Cortez</option>
//                 <option value="Maverick">Maverick</option>
//               </select>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-brand text-white py-2 px-6 rounded-md mb-4"
//           >
//             {loading ? "Loading..." : "Submit"}
//           </button>
//         </form>
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
//             {data.length > 0 ? (
//               data.map((item, index) => (
//                 <tr key={index} className="border-b text-sm">
//                   <td className="px-3 py-2 whitespace-nowrap">
//                     <p>{item.product_name}</p>
//                     <p>{item.sub_name}</p>
//                   </td>
//                   <td className="px-3 py-2 whitespace-nowrap">{item.part}</td>
//                   <td className="px-3 py-2 flex flex-col whitespace-nowrap">
//                     {item.Schedule_Date}
//                     <span className="text-xs text-gray-500 whitespace-nowrap">
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

const DailyScheduleList = () => {
  interface FormData {
    date: string;
    process: string;
  }

  const { register, watch } = useForm<FormData>();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [processes, setProcesses] = useState<
    { id: string; processName: string }[]
  >([]);

  const watchedDate = watch("date");
  const watchedProcess = watch("process");
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  // Fetch process list on mount
  useEffect(() => {
    const fetchProcesses = async () => {
      const res = await selectProcess();
      setProcesses(res || []);
    };
    fetchProcesses();
  }, []);

  // Fetch schedule whenever date or process changes
  useEffect(() => {
    const fetchData = async () => {
      if (!watchedDate) return;

      try {
        setLoading(true);
        const res = await axios.get(
          `${BASE_URL}/api/admin/daily-schedule-data`,
          {
            params: {
              date: watchedDate,
              process: watchedProcess || "", // send selected process
            },
          }
        );

        if (res.data?.data) {
          setData(
            res.data.data.map((item: any) => ({
              product_name:
                item.order?.product?.partNumber ||
                item.part?.partNumber ||
                "-",
              sub_name: item.subName || "",
              part: item.part?.process?.processName || "-",
              machineName: item.part?.process?.machineName || "-",
              Schedule_Date: item.scheduleQuantity
                ? new Date(item.order_date).toISOString().split("T")[0]
                : "-",
              Schedule_time: item.scheduleQuantity
                ? new Date(item.order_date)
                    .toISOString()
                    .split("T")[1]
                    .split(".")[0]
                : "-",
              Delivery: item.delivery_date
                ? new Date(item.delivery_date).toISOString().split("T")[0]
                : "-",
              quantity: item.quantity || "-",
            }))
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
  }, [watchedDate, watchedProcess]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Filter Form */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <label className="font-semibold">Select Date</label>
          <input
            type="date"
            {...register("date")}
            className="border py-3 px-4 rounded-md placeholder-gray-600"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/2 gap-2">
          <label className="font-semibold">Select Process Name</label>
          <select
            {...register("process")}
            className="border py-3 px-4 rounded-md placeholder-gray-600"
          >
            <option value="">All</option>
            {processes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (  {p.machineName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schedule Table */}
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
              ].map((header, index) => (
                <th
                  key={index}
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
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <p>{item.product_name}</p>
                    <p className="text-xs text-gray-500">{item.sub_name} </p>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{item.part} ({item.machineName})</td>
                  <td className="px-3 py-2 flex flex-col whitespace-nowrap">
                    {item.Schedule_Date}
                    <span className="text-xs text-gray-500">
                      {item.Schedule_time}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.Delivery}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {item.quantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No records found
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
