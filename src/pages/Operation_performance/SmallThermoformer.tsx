import PartTable from "./PartTable";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


const forming = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];
const coolingTime = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];
const vacPrestrech = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];

const SmallThermoformer = () => {
  return (
    <div>
      <div className=" bg-white rounded-lg shadow-md mt-6">
        <h1 className="text-xl font-semibold p-4">Small Thermoformer</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4  p-4">
          <div className="border rounded-md shadow-md">
            <PartTable />
          </div>
         <div className="bg-white shadow-md rounded-2xl p-2 md:p-4">
                   <h2 className=" md:text-lg font-medium mb-2">
                     Forming Temp by Time
                   </h2>
                   <ResponsiveContainer width="100%" height={300}>
                     <LineChart data={forming}>
                       <CartesianGrid stroke="#e0e0e0" />
                       <XAxis dataKey="name" fontSize={10} />
                       <YAxis fontSize={10} />
                       <Tooltip />
                       <Legend />
                       <Line
                         type="bumpX"
                         dataKey="2022"
                         stroke="#8884d8"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                       <Line
                         type="bumpX"
                         dataKey="2023"
                         stroke="#ff6b6b"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                       <Line
                         type="bumpX"
                         dataKey="2024"
                         stroke="#00bcd4"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                     </LineChart>
                   </ResponsiveContainer>
                 </div>
                 <div className="bg-white shadow-md rounded-2xl p-2 md:p-4">
                   <h2 className="md:text-lg font-medium mb-2">
                     Cooling Time & Cool Delay by Time
                   </h2>
                   <ResponsiveContainer width="100%" height={300}>
                     <LineChart data={coolingTime}>
                       <CartesianGrid stroke="#e0e0e0" />
                       <XAxis dataKey="name" fontSize={10} />
                       <YAxis />
                       <Tooltip />
                       <Legend />
                       <Line
                         type="bumpX"
                         dataKey="2022"
                         stroke="#8884d8"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                       <Line
                         type="bumpX"
                         dataKey="2023"
                         stroke="#ff6b6b"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                       <Line
                         type="bumpX"
                         dataKey="2024"
                         stroke="#00bcd4"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                     </LineChart>
                   </ResponsiveContainer>
                 </div>
                 <div className="bg-white shadow-md rounded-2xl p-2 md:p-4">
                   <h2 className="md:text-lg font-medium mb-2">
                     Vac Prestrech by Time{" "}
                   </h2>
                   <ResponsiveContainer width="100%" height={300}>
                     <LineChart data={vacPrestrech}>
                       <CartesianGrid stroke="#e0e0e0" />
                       <XAxis dataKey="name" fontSize={10} />
                       <YAxis />
                       <Tooltip />
                       <Legend />
                       <Line
                         type="bumpX"
                         dataKey="2022"
                         stroke="#8884d8"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                       <Line
                         type="bumpX"
                         dataKey="2023"
                         stroke="#ff6b6b"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                       <Line
                         type="bumpX"
                         dataKey="2024"
                         stroke="#00bcd4"
                         strokeWidth={2}
                         dot={{ r: 4 }}
                       />
                     </LineChart>
                   </ResponsiveContainer>
                 </div>
        </div>
      </div>
    </div>
  );
};

export default SmallThermoformer;
