import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { selectProcess } from "./https/schedulingApis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LaborForecastList = () => {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      processId: "",
    },
  });
  const [data, setData] = useState<any[]>([]);
  const [processData, setProcessData] = useState<any[]>([]);
  const getInventory = async (filters: any = {}) => {
    try {
      const startStr =
        filters.startDate instanceof Date
          ? filters.startDate.toISOString().split("T")[0]
          : filters.startDate;

      const endStr =
        filters.endDate instanceof Date
          ? filters.endDate.toISOString().split("T")[0]
          : filters.endDate;

      const res = await axios.get(`${BASE_URL}/api/admin/get-labour-forcast`, {
        params: {
          processId: filters.processId,
          startDate: startStr,
          endDate: endStr,
        },
      });

      const enrichedData = res.data.data.map((item: any) => {
        const cycleTime = parseFloat(item.cycleTime) || 0;
        const need = parseFloat(item.Need) || 0;
        return {
          ...item,
          Forecast: item.Forc || 0,
          ProdNeed: Math.max(need - (parseFloat(item.Available) || 0), 0),
          Hr_Need: parseFloat((need * cycleTime).toFixed(2)),
          cycleTime: cycleTime,
        };
      });

      setData(enrichedData);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  const onSubmit = (formData: any) => {
    getInventory(formData);
  };

  const handleForecastChange = (index: number, value: string) => {
    const numericForecast = parseInt(value) || 0;
    setData((prevData) => {
      const updatedData = [...prevData];
      const currentItem = updatedData[index];
      const hrNeed = +(numericForecast * (currentItem.cycleTime || 0)).toFixed(
        2,
      );
      updatedData[index] = {
        ...currentItem,
        Forecast: numericForecast,
        Hr_Need: hrNeed,
      };
      return updatedData;
    });
  };

  useEffect(() => {
    const fetchInit = async () => {
      const response = await selectProcess();
      setProcessData(Array.isArray(response) ? response : []);
      getInventory({ startDate: new Date(), endDate: new Date() });
    };
    fetchInit();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Process</label>
            <select
              {...register("processId")}
              className="border p-3 rounded-md w-full bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Process</option>
              {processData.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.processName || item.name}{" "}
                  {item.machineName ? `(${item.machineName})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Start Date</label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  className="w-full border p-3 rounded-md bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">End Date</label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  className="w-full border p-3 rounded-md bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <button
            type="submit"
            className="bg-[#052C89] text-white px-8 py-3 rounded-md font-bold hover:bg-blue-800 transition-colors"
          >
            Submit Filter
          </button>
          <p
            className="text-[#B71D18] font-semibold cursor-pointer hover:underline"
            onClick={() => window.location.reload()}
          >
            Reset
          </p>
        </div>
      </form>

      {data.some((item) => item.Forecast > 0) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-bold text-gray-800">
              Forecast Summary
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data
                .filter((item) => item.Forecast > 0)
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-blue-100 rounded-lg p-4 bg-blue-50/30"
                  >
                    <h3 className="font-bold text-gray-900">
                      {item.product_name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">
                      {item.sub_name}
                    </p>
                    <div className="text-sm space-y-1">
                      <p>
                        <span className="text-gray-500">Forecast:</span>{" "}
                        <span className="font-bold">{item.Forecast}</span>
                      </p>
                      <p>
                        <span className="text-gray-500">Hours Needed:</span>{" "}
                        <span className="font-bold text-blue-700">
                          {item.Hr_Need.toFixed(2)} hr
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full bg-white border-collapse">
          <thead>
            <tr className="border-b bg-[#F4F6F8] text-left text-[#637381]">
              <th className="px-4 py-4 text-xs font-bold uppercase">
                Product Tree
              </th>
              <th className="px-4 py-4 text-xs font-bold uppercase">
                Available
              </th>
              <th className="px-4 py-4 text-xs font-bold uppercase">Need</th>
              <th className="px-4 py-4 text-xs font-bold uppercase">
                Forc (Qty)
              </th>
              <th className="px-4 py-4 text-xs font-bold uppercase">Hr Need</th>
              <th className="px-4 py-4 text-xs font-bold uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className="border-b text-sm hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="font-bold text-gray-800">{item.product_name}</p>
                  <p className="text-gray-500 text-xs">
                    {item.sub_name} ({item.machineName})
                  </p>
                </td>
                <td className="px-4 py-4 text-blue-600 font-bold">
                  {item.Available}
                </td>
                <td className="px-4 py-4 text-orange-600 font-bold">
                  {item.Need}
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    value={item.Forecast}
                    onChange={(e) =>
                      handleForecastChange(index, e.target.value)
                    }
                    className="border rounded px-2 py-1 w-20 bg-yellow-50 focus:bg-white focus:ring-1 focus:ring-yellow-400 outline-none"
                  />
                </td>
                <td className="px-4 py-4 font-black text-gray-900">
                  {item.Hr_Need} hr
                </td>
                <td className="px-4 py-4">
                  <button className="bg-blue-600 text-white text-[10px] px-3 py-1 rounded hover:bg-blue-700 uppercase font-bold">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LaborForecastList;
