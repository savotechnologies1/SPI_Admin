import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import img4 from "../../assets/green.png";
import img5 from "../../assets/yellow.png";
import img6 from "../../assets/orange.png";
import shape_1 from "../../assets/shape_1.png";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";
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

const forming = [
  { name: "Technology", "2022": 90, "2023": 40, "2024": 30 },
  { name: "Car Brands", "2022": 88, "2023": 80, "2024": 35 },
  { name: "Airlines", "2022": 40, "2023": 15, "2024": 42 },
  { name: "Energy", "2022": 90, "2023": 100, "2024": 38 },
  { name: "Technology", "2022": 20, "2023": 60, "2024": 45 },
];

const partsData = [
  { partNumber: "30024T", timeToDeliver: "0.00", qtyAvailable: "02" },
  { partNumber: "30025T", timeToDeliver: "1.25", qtyAvailable: "05" },
  { partNumber: "30026T", timeToDeliver: "0.50", qtyAvailable: "10" },
  { partNumber: "30027T", timeToDeliver: "2.00", qtyAvailable: "00" },
  { partNumber: "30028T", timeToDeliver: "0.75", qtyAvailable: "07" },
  { partNumber: "30029T", timeToDeliver: "3.00", qtyAvailable: "01" },
  { partNumber: "30030T", timeToDeliver: "0.20", qtyAvailable: "04" },
  { partNumber: "30031T", timeToDeliver: "1.10", qtyAvailable: "06" },
];
const data_2 = [
  {
    num: "1",
    text: "shift",
    img: img4,
    shape: shape_1,
  },
  {
    num: "129",
    text: "Actual",
    img: img5,
    shape: shape_2,
  },
  {
    num: "1",
    text: "Scrap",
    img: img6,
    shape: shape_3,
  },
  {
    num: "129",
    text: "Actual",
    img: img5,
    shape: shape_2,
  },
];

const Inventory = () => {
  return (
    <div className="">
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">Inventory</h1>
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

      <div className="flex flex-col md:flex-row  mt-6 gap-4  ">
        {data_2.map((item) => (
          <div className="flex justify-between items-center bg-white  rounded-md w-full">
            {" "}
            <div className="p-2">
              {" "}
              <p className="font-bold text-2xl">{item.num}</p>
              <p>{item.text}</p>
            </div>
            <div className="relative right-0">
              <img src={item.shape} alt="" />
              <div className="absolute right-4 top-6">
                {" "}
                <img src={item.img} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {" "}
        <div className="bg-white shadow-md rounded-2xl p-4">
          <h2 className="text-lg font-medium mb-2">Inventory Trans.</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={output}>
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey="2022"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                dataKey="2023"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-2xl p-4">
            <h2 className="text-lg font-medium mb-2"> Inventory Trans.</h2>
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

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Part Number</th>
                  <th className="px-4 py-3">Time to Deliver </th>
                  <th className="px-4 py-3">Qty. Available</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partsData.map((part, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{part.partNumber}</td>
                    <td className="px-4 py-2">{part.timeToDeliver}</td>
                    <td className="px-4 py-2">{part.qtyAvailable}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
