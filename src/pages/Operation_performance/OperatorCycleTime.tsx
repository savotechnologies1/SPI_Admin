import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { time: "09:00", value: 70 },
  { time: "09:20", value: 87 },
  { time: "10:20", value: 82 },
  { time: "11:23", value: 70 },
  { time: "11:50", value: 54 },
  { time: "12:10", value: 45 },
  { time: "12:30", value: 20 },
  { time: "01:00", value: 98 },
  { time: "01:30", value: 59 },
  { time: "02:00", value: 73 },
  { time: "02:12", value: 15 },
  { time: "03:10", value: 74 }
];

const OperatorCycleTime = () => {
  return (
    <div className="p-2 md:p-4 bg-white rounded-xl shadow-md w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#00230F]">Operator Cycle Time</h2>
      <div className="w-full h-[250px] sm:h-[300px]">
      <ResponsiveContainer width="100%" height='100%'>
        <LineChart data={data}
         margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="time" 
             tick={{ fontSize: 12 }}
             tickMargin={10}
             interval={window.innerWidth < 768 ? 2 : 0}/>
          <YAxis 
           tick={{ fontSize: 12 }}
           tickMargin={10}/>
          <Tooltip 
            contentStyle={{
              fontSize: '12px',
              borderRadius: '8px',
              padding: '8px'
            }}/>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#6366F1", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      
    </div>
    </div>
  );
};

export default OperatorCycleTime;
