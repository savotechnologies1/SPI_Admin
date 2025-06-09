import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";

const stepsData = [
  { name: "Sanding", first: 9, second: 0 },
  { name: "Inspection", first: 6, second: 0 },
  { name: "CutTrim", first: 7, second: 0 },
  { name: "Termoforming", first: 0, second: 9 },
  { name: "Technology", first: 0, second: 9 },
];

const manualData = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];
const machineData = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];

export default function ProcessTrends() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
        Process Trends (Thermoforming)
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Steps Bar Chart */}
        <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-3 md:p-4">
          <h2 className="text-base md:text-lg font-medium mb-2">Steps</h2>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stepsData}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={window.innerWidth < 768 ? 10 : 12}
                  tickMargin={window.innerWidth < 768 ? 5 : 10}
                />
                <YAxis
                  fontSize={window.innerWidth < 768 ? 10 : 12}
                  label={{
                    value: "Scrap Qty",
                    angle: -90,
                    position: "insideLeft",
                    fontSize: window.innerWidth < 768 ? 12 : 14,
                  }}
                />
                <Tooltip 
                  contentStyle={{
                    fontSize: '12px',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Bar 
                  dataKey="first" 
                  fill="#D64550" 
                  barSize={window.innerWidth < 768 ? 30 : 40} 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="second" 
                  fill="#E68F96" 
                  barSize={window.innerWidth < 768 ? 30 : 40} 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Manual Line Chart */}
        <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-3 md:p-4">
          <h2 className="text-base md:text-lg font-medium mb-2">Manual</h2>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={manualData}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={window.innerWidth < 768 ? 10 : 12}
                  tickMargin={window.innerWidth < 768 ? 5 : 10}
                />
                <YAxis 
                  fontSize={window.innerWidth < 768 ? 10 : 12}
                />
                <Tooltip 
                  contentStyle={{
                    fontSize: '12px',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: window.innerWidth < 768 ? '10px' : '0'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="2022"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="2023"
                  stroke="#ff6b6b"
                  strokeWidth={2}
                  dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="2024"
                  stroke="#00bcd4"
                  strokeWidth={2}
                  dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Machine Chart */}
        <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-3 md:p-4 lg:col-span-2">
          <h2 className="text-base md:text-lg font-medium mb-2">Machine</h2>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={machineData}>
                <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={window.innerWidth < 768 ? 10 : 12}
                  tickMargin={window.innerWidth < 768 ? 5 : 10}
                />
                <YAxis 
                  fontSize={window.innerWidth < 768 ? 10 : 12}
                />
                <Tooltip 
                  contentStyle={{
                    fontSize: '12px',
                    borderRadius: '8px',
                    padding: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: window.innerWidth < 768 ? '10px' : '0'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="2022"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="2023"
                  stroke="#ff6b6b"
                  strokeWidth={2}
                  dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="2024"
                  stroke="#00bcd4"
                  strokeWidth={2}
                  dot={{ r: window.innerWidth < 768 ? 3 : 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}