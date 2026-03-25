import { useState, useEffect } from "react";
import axios from "axios";
import img2 from "../../assets/green.png";
import img3 from "../../assets/orange.png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";

const CurrentStatus = () => {
  const [selected, setSelected] = useState<string>("");
  const [processData, setProcessData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const calculateMinutesFromTarget = (target: number) => {
    return target > 0 ? 60 / target : 0;
  };

  const aggregateData = (data: any[]) => {
    const map = new Map();

    data.forEach((item) => {
      if (!map.has(item.processName)) {
        map.set(item.processName, {
          processName: item.processName,
          machineName: item.machineName || "N/A",
          scheduled: 0,
          actual: 0,
          scrap: 0,
          targetPerHour: item.targetPerHour || 0,
          parts: [],
        });
      }
      const entry = map.get(item.processName);

      entry.scheduled += Number(item.scheduled || 0);
      entry.actual += Number(item.actual || 0);
      entry.scrap += Number(item.scrap || 0);
      entry.parts.push({
        process: item.processName,
        desc: item.partDescription,
        machine: item.machineName,
      });
    });

    return Array.from(map.values()).map((entry) => {
      const efficiency =
        entry.targetPerHour > 0
          ? ((entry.actual / entry.targetPerHour) * 100).toFixed(1) + "%"
          : "0%";

      const productivity =
        entry.scheduled > 0
          ? (((entry.actual - entry.scrap) / entry.scheduled) * 100).toFixed(
              1,
            ) + "%"
          : "0%";

      return {
        ...entry,
        efficiency,
        productivity,
        avgCycleTimeValue: calculateMinutesFromTarget(entry.targetPerHour),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/admin/current-status-overview`,
        );
        if (res.data && res.data.details) {
          const transformed = aggregateData(res.data.details);
          setProcessData(transformed);
          if (transformed.length > 0) setSelected(transformed[0].processName);
        }
      } catch (err) {
        console.error("Error fetching process data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSelect = (station: string) => {
    setSelected(station);
  };

  const currentProcess = processData.find((p) => p.processName === selected);
  if (loading)
    return <p className="p-6 text-center font-semibold">Loading data...</p>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Current Status of Each Process
          </h1>
          <p className="font-semibold text-base text-gray-500">
            Deep Dive - {currentProcess?.machineName}
          </p>
        </div>
      </div>

      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex-1 flex justify-between items-center bg-white rounded-md shadow p-5 border-l-4 border-blue-500">
          <div>
            <p className="font-bold text-3xl">{currentProcess?.actual || 0}</p>
            <p className="text-gray-600">Actual Production</p>
          </div>
          <div className="relative">
            <img className="w-16 opacity-20" src={shape_2} alt="" />
            <img className="absolute right-2 top-4 w-8" src={img2} alt="" />
          </div>
        </div>

        <div className="flex-1 flex justify-between items-center bg-white rounded-md shadow p-5 border-l-4 border-red-500">
          <div>
            <p className="font-bold text-3xl">{currentProcess?.scrap || 0}</p>
            <p className="text-gray-600">Total Scrap</p>
          </div>
          <div className="relative">
            <img className="w-16 opacity-20" src={shape_3} alt="" />
            <img className="absolute right-2 top-4 w-8" src={img3} alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white p-6 rounded-md shadow flex flex-col gap-6">
          <div className="text-center">
            <h2 className="font-bold text-xl text-brand">
              {currentProcess?.processName}
            </h2>
            <p className="text-sm text-gray-400">
              {currentProcess?.machineName}
            </p>
          </div>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="font-bold text-2xl text-green-600">
                {currentProcess?.efficiency || "0%"}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                Efficiency
              </p>
            </div>
            <div className="text-center">
              <p className="font-bold text-2xl text-blue-600">
                {currentProcess?.productivity || "0%"}
              </p>
              <p className="text-gray-500 text-xs uppercase tracking-wider">
                Productivity
              </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white p-6 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Stations & Machines
          </h2>
          <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
            {processData.map((p, index) => (
              <div
                key={index}
                className={`flex flex-col cursor-pointer p-3 rounded-md transition-all ${
                  selected === p.processName
                    ? "bg-[#0F2B36] text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => handleSelect(p.processName)}
              >
                <span className="font-bold text-sm">{p.processName}</span>
                <span
                  className={`text-[11px] ${selected === p.processName ? "text-gray-300" : "text-gray-500"}`}
                >
                  Machine: {p.machineName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Parts Completed</h2>
          <div className="overflow-x-auto overflow-y-auto max-h-[300px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-2 px-4 text-left">Process</th>
                  <th className="py-2 px-4 text-left">Machine</th>
                  <th className="py-2 px-4 text-left">Parts</th>
                </tr>
              </thead>
              <tbody>
                {currentProcess?.parts?.map((item: any, index: number) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{item.process}</td>
                    <td className="py-2 px-4 text-gray-500">{item.machine}</td>
                    <td className="py-2 px-4 font-mono">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Avg Cycle Time (Min)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  name: selected,
                  avgCycle: currentProcess?.avgCycleTimeValue || 0,
                },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar
                dataKey="avgCycle"
                fill="#4664C2"
                barSize={40}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default CurrentStatus;
