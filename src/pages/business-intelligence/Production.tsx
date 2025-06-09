import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
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
  {
    num: "01",
    text: "Customer Return",
    img: img2,
    scrap: scrap_2,
    scrap_img: customer_return,
    increase: "+200",
    bgColor: "bg-green-50",
    textColor: "text-green-500",
  },
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
  {
    num: "15,000",
    text: "Supplier Return",
    img: img3,
    scrap: scrap_3,
    scrap_img: supplier_return,
    increase: "+200",
    bgColor: "bg-blue-50",
    textColor: "text-green-500",
  },
];

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

const Production = () => {
  return (
    <div className="">
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Production</h1>
        <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
          {data_1.map((item) => (
            <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
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

      <div className="mt-6">
        {" "}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-medium mb-2">Vac Prestrech by Time </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={output}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey="2022"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                dataKey="2023"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className=" mt-6  ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Manual Line Chart */}
          <div className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-lg font-medium mb-2">Forming Temp by Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={forming}>
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

          {/* Machine Chart */}
          <div className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-lg font-medium mb-2">
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
        </div>
      </div>
    </div>
  );
};

export default Production;
