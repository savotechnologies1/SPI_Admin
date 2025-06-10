import data from "../../components/Data/LaborData";
import ItemSelector from "./ItemSelector";
import { useForm } from "react-hook-form";

const LaborForecastList = () => {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data: any) => {
    console.log("Data:", data);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 flex-col">
        {/* First Row */}
        <div className="flex flex-col md:flex-row items-end gap-3 mb-4">
          <div className="flex flex-col w-full  gap-2">
            <label className="font-semibold">Select Process</label>
            <select
              {...register("process", { required: "Process is required" })}
              className="border py-3 px-4 rounded-md placeholder-gray-600"
            >
              <option value="">Select Process</option>
              <option value="sending">Sending</option>
              <option value="cut_trim">Cut Trim</option>
            </select>
            {errors.process && (
              <span className="text-red-500 text-sm">{errors.process?.message?.toString()}</span>
            )}
          </div>

          {/* <span className="text-sm font-semibold text-gray-600">OR</span> */}

          {/* <div className="flex flex-col w-full md:w-1/2 gap-2">
            <select
              {...register("address", { required: "Address is required" })}
              className="border py-3 px-4 rounded-md placeholder-gray-600"
            >
              <option value="99">99 - ‘06 Silverado / Sierra cab 4 - Door</option>
            </select>
            {errors.address && (
              <span className="text-red-500 text-sm">{String(errors.address.message)}</span>
            )}
          </div> */}
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row items-end gap-3 mb-4">
          <div className="w-full md:w-1/2">
            <label className="font-semibold">Start Date</label>
            <input
              {...register("startDate", { required: "Start date is required" })}
              type="date"
              className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
            />
            {errors.startDate && (
              <span className="text-red-500 text-sm">{String(errors.startDate.message)}</span>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="font-semibold">End Date</label>
            <input
              {...register("endDate", { required: "End date is required" })}
              type="date"
              className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
            />
            {errors.endDate && (
              <span className="text-red-500 text-sm">{String(errors.endDate.message)}</span>
            )}
          </div>

          <div className="w-full md:w-1/2">
            <label className="font-semibold">Forecast Hours</label>
            <input
              {...register("hour", { required: "Forecast hours are required" })}
              type="text"
              placeholder="hour"
              className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
            />
            {errors.hour && (
              <span className="text-red-500 text-sm">{String(errors.hour.message)}</span>
            )}
          </div>

          <div>
            <p
              className="text-[#B71D18] font-semibold cursor-pointer"
              onClick={() => window.location.reload()} // Quick reset for now
            >
              Reset
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-brand text-white text-sm px-4 py-2 rounded-md mb-4"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
        {/* Table Wrapper for Responsive Scrolling */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="border-b bg-[#F4F6F8] text-left text-[#637381] whitespace-nowrap">
                {[
                  "Product Tree",
                  "Avialable  ",
                  "Need ",
                  "Forc ",
                  "Prod Need",
                  "Hr Need",
                ].map((header, index) => (
                  <th key={index} className="px-3 py-2 text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <p>{item.product_name}</p>
                    <p>{item.sub_name}</p>
                  </td>

                  <td className="px-3 py-2 flex flex-col">{item.Available}</td>

                  <td className="px-3 py-2">{item.Need}</td>
                  <td className="px-3 py-2">{item.Forc}</td>
                  <td className="px-3 py-2">{item.ProdNeed}</td>
                  <td className="px-3 py-2">{item.Hr_Need}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-end py-2 text-sm cursor-pointer">view All</p>
      </div>
      <div>
        <ItemSelector />
      </div>
    </>
  );
};

export default LaborForecastList;



