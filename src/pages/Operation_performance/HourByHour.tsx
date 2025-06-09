import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import Thermoforming from '../productionLive/Thermoforming';
import CutTrim from '../productionLive/Cut$Trim';
import Sanding from '../productionLive/Sanding';
import Inspection from '../productionLive/Inspection';
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
const HourByHour = () => {
  return (
    <div>
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
  )
}

export default HourByHour
