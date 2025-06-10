import data from "../../components/Data/DailyScheduleData";
import { useForm } from "react-hook-form";

const DailyScheduleList = () => {
 

  interface FormData {
    date: string;
    process: string;
  }
  
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: { date: any; process: any; }) => {
    console.log("Selected Date:", data.date);
    console.log("Selected Process Name:", data.process);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="fle gap-2 flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
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
                <option value="">Select</option>
                <option value="Cortez">Cortez</option>
                <option value="Maverick">Maverick</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-brand text-white py-2 px-6 rounded-md mb-4"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border-collapse ">
          <thead>
            <tr className="border-b bg-[#F4F6F8] text-left text-[#637381] ">
              {[
                "Product Name",
                "Part",
                "Schedule Date ",
                "Delivery ",
                "Quantity ",
              ].map((header, index) => (
                <th key={index} className="px-3 py-2 text-sm font-medium whitespace-nowrap">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {data.map((item, index) => (
              <tr key={index} className="border-b text-sm">
                <td className="px-3 py-2 whitespace-nowrap">
                  <p>{item.product_name}</p>
                  <p>{item.sub_name}</p>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{item.part}</td>

                <td className="px-3 py-2 flex flex-col whitespace-nowrap">
                  {item.Schedule_Date}{" "}
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {item.Schedule_time}
                  </span>
                </td>

                <td className="px-3 py-2 whitespace-nowrap">{item.Delivery}</td>
                <td className="px-3 py-2 whitespace-nowrap">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyScheduleList;
