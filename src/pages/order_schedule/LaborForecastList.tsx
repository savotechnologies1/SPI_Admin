import { useEffect, useState } from "react";
import data from "../../components/Data/LaborData";
import ItemSelector from "./ItemSelector";
import { useForm } from "react-hook-form";
import axios from "axios";
const LaborForecastList = () => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<any[]>([]);

  const onSubmit = (formData: any) => {
    const forecastValues = data.reduce((acc, item, idx) => {
      acc[idx] = item.Forecast || 0;
      return acc;
    }, {} as Record<number, number>);

    const finalData = {
      ...formData,
      forecastValues,
    };
    console.log("Submitted:", finalData);
  };
  const handleForecastChange = (index: number, value: string) => {
    const numericForecast = parseInt(value) || 0;

    setData((prevData) => {
      const updatedData = [...prevData];
      const currentItem = updatedData[index];

      const available = currentItem.Available || 0;
      const cycleTime = parseFloat(currentItem.cycleTime) || 0; // already in hours

      const prodNeed = Math.max(numericForecast + available, 0);
      const hrNeed = +(prodNeed * cycleTime).toFixed(2); // round to 2 decimals

      updatedData[index] = {
        ...currentItem,
        Forecast: numericForecast,
        ProdNeed: prodNeed,
        Hr_Need: hrNeed,
      };

      return updatedData;
    });
  };

  const getInventory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/get-labour-forcast`);

      const enrichedData = res.data.data.map((item: any) => ({
        ...item,
        Forecast: 0,
        ProdNeed: item.ProdNeed,
        Hr_Need: item.Hr_Need,
        cycleTime: item.cycleTime || 0,
      }));

      setData(enrichedData);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form fields */}
          <div className="flex gap-2 flex-col">
            <div className="flex flex-col md:flex-row items-end gap-3 mb-4">
              <div className="flex flex-col w-full gap-2">
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
                  <span className="text-red-500 text-sm">
                    {errors.process.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-end gap-3 mb-4">
              <div className="w-full md:w-1/2">
                <label className="font-semibold">Start Date</label>
                <input
                  {...register("startDate", {
                    required: "Start date is required",
                  })}
                  type="date"
                  className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    {errors.startDate.message}
                  </span>
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
                  <span className="text-red-500 text-sm">
                    {errors.endDate.message}
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <label className="font-semibold">Forecast Hours</label>
                <input
                  {...register("hour", {
                    required: "Forecast hours are required",
                  })}
                  type="text"
                  placeholder="hour"
                  className="border py-3 px-4 rounded-md w-full placeholder-gray-600"
                />
                {errors.hour && (
                  <span className="text-red-500 text-sm">
                    {errors.hour.message}
                  </span>
                )}
              </div>

              <div>
                <p
                  className="text-[#B71D18] font-semibold cursor-pointer"
                  onClick={() => window.location.reload()}
                >
                  Reset
                </p>
              </div>
            </div>

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

        {/* Data table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="border-b bg-[#F4F6F8] text-left text-[#637381] whitespace-nowrap">
                {[
                  "Product Tree",
                  "Available",
                  "Need",
                  "Forc",
                  "Process Time (min)",
                  "Hr Need",
                  "Action",
                ].map((header, idx) => (
                  <th key={idx} className="px-3 py-2 text-sm font-medium">
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

                  <td className="px-3 py-2">{item.Available}</td>
                  <td className="px-3 py-2">{item.Need}</td>

                  <td className="px-3 py-2">
                    <input
                      type="number"
                      value={item.Forecast}
                      onChange={(e) =>
                        handleForecastChange(index, e.target.value)
                      }
                      className="border rounded-md px-2 py-1 w-20"
                      placeholder="Enter"
                    />
                  </td>

                  <td className="px-3 py-2">{item.cycleTime}</td>
                  <td className="px-3 py-2">
                    {/* ✅ This is now dynamic — not API value */}
                    {item.Hr_Need}
                  </td>

                  <td className="px-3 py-2">
                    <button
                      className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleUpdate(item, item.Forecast)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Forecast summary */}
        {data.some((item) => item.Forecast > 0) && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800">
                Forecast Summary
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data
                  .filter((item) => item.Forecast > 0)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {item.product_name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.sub_name}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Forecast:</span>
                          <span className="font-medium ml-1">
                            {item.Forecast}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Prod Need:</span>
                          <span className="font-medium ml-1">
                            {item.ProdNeed}
                          </span>
                        </div>
                        <div className="text-sm col-span-2">
                          <span className="text-gray-500">Hr Need:</span>
                          <span className="font-medium ml-1">
                            {item.Hr_Need.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LaborForecastList;
