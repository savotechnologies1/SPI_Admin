import img1 from "../../assets/green.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_cost from "../../assets/scrap_cost.png";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data_1 = [
  {
    num: "$5,00,000",
    text: "Scrap Cost",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
];

const costing = [{ name: "Cost", part1: 60, part2: 40 }];

const output = [
  { name: "Figma", "2022": 90, "2023": 30 },
  { name: "Sketch", "2022": 40, "2023": 30 },
  { name: "XD", "2022": 110, "2023": 20 },
  { name: "PS", "2022": 80, "2023": 30 },
  { name: "AI", "2022": 70, "2023": 35 },
  { name: "coreIDR", "2022": 20, "2023": 60 },
  { name: "InDesign", "2022": 110, "2023": 90 },
  { name: "Canva", "2022": 150, "2023": 45 },
  { name: "Webflow", "2022": 40, "2023": 10 },
  { name: "Affinity", "2022": 120, "2023": 70 },
  { name: "Marker", "2022": 170, "2023": 65 },
  { name: "MarkFigmaer", "2022": 20, "2023": 60 },
];

const FixedCost = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Fixed Cost</h2>

      <div className="flex gap-4 w-full">
        <div className="mt-4">
          <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
            {data_1.map((item) => (
              <div className="flex flex-col justify-between  bg-white w-[200px]  rounded-md  p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
                {" "}
                <div className="flex items-center gap-2">
                  <div>
                    <img className="w-[40px]" src={item.scrap_img} alt="" />
                  </div>
                  <div className="">
                    {" "}
                    <p className="text-sm text-gray-600">{item.text}</p>
                    <p className="font-bold text-xl">{item.num}</p>
                  </div>
                </div>
                <div>
                  <img src={item.scrap} alt="" />
                </div>
                <div className="text-sm text-gray-600">
                  Increase by{" "}
                  <span
                    className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
                  >
                    {" "}
                    {item.increase}
                  </span>{" "}
                  this week
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-4 mt-6 w-full">
          <div className="flex justify-between mb-6">
            <h1 className="fonr-semibold">Fixed Cost</h1>
            <div>cost</div>
          </div>
          <ResponsiveContainer width="100%" height={50}>
            <BarChart layout="vertical" width={500} height={20} data={costing}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" hide />
              <Bar dataKey="part1" stackId="a" fill="#052C89" />
              <Bar dataKey="part2" stackId="a" fill="#2ECC71" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-2xl p-4 mt-6">
        <h2 className="text-lg font-semibold mb-2">Cost vs Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            data={output}
          >
            <CartesianGrid stroke="#e0e0e0" />
            <XAxis dataKey="name" fontSize={10} />
            <YAxis
              label={{
                value: "Scrap Qty",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Bar dataKey="2022" fill="#D64550" stackId="a" barSize={40} />
            <Bar dataKey="2023" fill="#E68F96" stackId="a" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FixedCost;
