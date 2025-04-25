import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import PieChart from "./PieChart";
import Thermoforming from "./Thermoforming";
import CutTrim from "./Cut$Trim";
import Sanding from "./Sanding";
import Inspection from "./Inspection";
import shape_1 from "../../assets/shape_1.png";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";
const data_1 = [
  {
    num: "1",
    text: "shift",
    img: img1,
    shape: shape_1,
  },
  {
    num: "129",
    text: "Actual",
    img: img2,
    shape: shape_2,
  },
  {
    num: "1",
    text: "Scrap",
    img: img3,
    shape: shape_3,
  },
];

const LiveProductionGoal = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between w-full  gap-4">
        <div className="xl:w-[70%] flex flex-col justify-between ">
          <div>
            <h1 className="font-bold text-2xl mt-4">
              Live Production Goal Board
            </h1>
          </div>
          <div>
            <h1>Hour By Hour</h1>
            <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
              {data_1.map((item) => (
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
          </div>
        </div>
        <div className="xl:w-[30%] ">
          <PieChart />
        </div>
      </div>

      <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <div className="bg-white">
          <Thermoforming />
        </div>
        <div className="bg-white">
          <CutTrim />
        </div>
        <div className="bg-white">
          <Sanding />
        </div>
        <div className="bg-white">
          <Inspection />
        </div>
      </div>
    </div>
  );
};

export default LiveProductionGoal;
