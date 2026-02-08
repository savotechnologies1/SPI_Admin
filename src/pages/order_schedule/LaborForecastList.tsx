import { useEffect, useState } from "react";
import data from "../../components/Data/LaborData";
import ItemSelector from "./ItemSelector";
import { useForm } from "react-hook-form";
import axios from "axios";
import { selectProcess } from "./https/schedulingApis";
const LaborForecastList = () => {
 const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const {
    register,
    handleSubmit,
    watch, // User ke input "hour" ko watch karne ke liye
    formState: { errors },
  } = useForm();

  const [data, setData] = useState<any[]>([]);
  const [processData, setProcessData] = useState([]);

  // Filtered Data Fetch karne ke liye
  const getInventory = async (filters: any = {}) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/get-labour-forcast`, {
        params: {
          processId: filters.processId,
          startDate: filters.startDate,
          endDate: filters.endDate,
          forecastHours: filters.hour, // Header se liya gaya Forecast Hour
        },
      });

      // API se aaye hue data ko process karna
      const enrichedData = res.data.data.map((item: any) => {
        const cycleTime = parseFloat(item.cycleTime) || 0;
        const need = parseFloat(item.Need) || 0;
        const available = parseFloat(item.Available) || 0;

        // Auto-calculate values based on header "Forecast Hours"
        // 1. Hr_Need: Need Qty ko poora karne ke liye kitne ghante chahiye
        const hrNeedValue = (need * cycleTime).toFixed(2);
        
        // 2. Forc: Header ke 'hour' input mein kitni qty ban sakti hai (API se aa rahi hai)
        return {
          ...item,
          Forecast: item.Forc || 0, // Backend ne Forc calculate karke bheja hai
          ProdNeed: Math.max(need - available, 0),
          Hr_Need: parseFloat(hrNeedValue),
          cycleTime: cycleTime,
        };
      });

      setData(enrichedData);
    } catch (error) {
      console.error("Error fetching forecast data", error);
    }
  };

  // Submit button click hone par filter apply honge
  const onSubmit = (formData: any) => {
    getInventory(formData);
  };

  const handleForecastChange = (index: number, value: string) => {
    const numericForecast = parseInt(value) || 0;

    setData((prevData) => {
      const updatedData = [...prevData];
      const currentItem = updatedData[index];

      const cycleTime = currentItem.cycleTime || 0;
      
      // Agar user table ke andar "Forc" change karta hai, toh Hr_Need uske mutabik update hoga
      // Calculation: Forecast Qty * Cycle Time
      const hrNeed = +(numericForecast * cycleTime).toFixed(2);

      updatedData[index] = {
        ...currentItem,
        Forecast: numericForecast,
        Hr_Need: hrNeed,
      };

      return updatedData;
    });
  };

  const fetchProcessList = async () => {
    try {
      const response = await selectProcess();
      setProcessData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProcessList();
    getInventory(); // Initial load
  }, []);


  return (
    <>
      <div className="p-4 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 flex-col">
            <div className="flex flex-col md:flex-row items-end gap-3 mb-4">
              <div className="flex flex-col w-full gap-2">
                <label className="font-semibold">Process</label>
                <select
                  {...register("processId")}
                  className="border p-3 rounded-md w-full"
                >
                  <option value="">Select Process</option>
                  {processData.map((item: any) => (
                    <option key={item.id} value={item.id}>
                      {item.name} ({item.machineName})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-end gap-3 mb-4">
              <div className="w-full md:w-1/2">
                <label className="font-semibold">Start Date</label>
                <input
                  {...register("startDate")}
                  type="date"
                  className="border py-3 px-4 rounded-md w-full"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="font-semibold">End Date</label>
                <input
                  {...register("endDate")}
                  type="date"
                  className="border py-3 px-4 rounded-md w-full"
                />
              </div>

              <div className="w-full md:w-1/2">
                <label className="font-semibold">Forecast Hours (per unit)</label>
                <input
                  {...register("hour")}
                  type="number"
                  placeholder="e.g. 8"
                  className="border py-3 px-4 rounded-md w-full"
                />
              </div>

              <div>
                <p
                  className="text-[#B71D18] font-semibold cursor-pointer pb-3"
                  onClick={() => window.location.reload()}
                >
                  Reset
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-[#052C89] text-white text-sm px-6 py-3 rounded-md mb-4 font-bold"
              >
                Submit Filter
              </button>
            </div>
          </div>
        </form>
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
                            {item.ProdNeed} qty
                          </span>
                        </div>
                        <div className="text-sm col-span-2">
                          <span className="text-gray-500">Hr Need:</span>
                          <span className="font-medium ml-1">
                            {item.Hr_Need.toFixed(2)} hr
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
        {/* Data table */}
         <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="border-b bg-[#F4F6F8] text-left text-[#637381]">
                <th className="px-3 py-4 text-sm font-medium">Product Tree</th>
                <th className="px-3 py-4 text-sm font-medium">Available</th>
                <th className="px-3 py-4 text-sm font-medium">Need</th>
                <th className="px-3 py-4 text-sm font-medium">Forc (Qty)</th>
                <th className="px-3 py-4 text-sm font-medium">Process Time (hr)</th>
                <th className="px-3 py-4 text-sm font-medium">Hr Need</th>
                <th className="px-3 py-4 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b text-sm hover:bg-gray-50">
                  <td className="px-3 py-3">
                    <p className="font-bold">{item.product_name}</p>
                    <p className="text-gray-500 text-xs">{item.sub_name}</p>
                  </td>
                  <td className="px-3 py-3 text-blue-600 font-medium">{item.Available}</td>
                  <td className="px-3 py-3 text-orange-600 font-medium">{item.Need}</td>
                  <td className="px-3 py-3">
                    <input
                      type="number"
                      value={item.Forecast}
                      onChange={(e) => handleForecastChange(index, e.target.value)}
                      className="border rounded-md px-2 py-1 w-24 bg-yellow-50 focus:bg-white"
                    />
                  </td>
                  <td className="px-3 py-3 text-gray-500">{item.cycleTime} hr</td>
                  <td className="px-3 py-3 font-bold text-gray-800">
                    {item.Hr_Need} hr
                  </td>
                  <td className="px-3 py-3">
                    <button className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded shadow-sm">
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Forecast summary */}
  
      </div>
    </>
  );
};

export default LaborForecastList;
