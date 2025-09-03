import { NavLink } from "react-router-dom";
import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import CustomerReturn from "./CustomerReturn";
import SupplierReturn from "./SupplierReturn";
import ScrapBar from "./ScrapBar";
import MultiLineChart from "./MultiLineChart";

const data_1 = [
  {
    num: "1",
    text: "shift",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
  {
    num: "129",
    text: "Actual",
    img: img2,
    scrap: scrap_2,
    scrap_img: customer_return,
    increase: "+200",
    bgColor: "bg-green-50",
    textColor: "text-green-500",
  },
  {
    num: "1",
    text: "Scrap",
    img: img3,
    scrap: scrap_3,
    scrap_img: supplier_return,
    increase: "+200",
    bgColor: "bg-brand-50",
    textColor: "text-green-500",
  },
];

const CurrentQuality = () => {
  return (
    <div>
      <div className="p-7">
        <div>
          <h1 className="font-bold text-[20px] md:text-[24px] text-black">
            Current Quality Performance
          </h1>
        </div>
        <div className="flex justify-between mt-2 items-center">
          <div className="flex gap-4 items-center ">
            <p className={`text-sm  text-black font-semibold`}>
              <NavLink to={"/dashboardDetailes"}>Quality Performance :</NavLink>
            </p>

            <span className="text-xs  hover:cursor-pointer">25/08/2024</span>
            <span>-</span>
            <span className="text-xs  hover:cursor-pointer">25/11/2025</span>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="font-semibold text-xl">Scrap</h1>
          <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
            {data_1.map((item) => (
              <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border">
                <div className="flex items-center gap-2">
                  <div>
                    <img className="w-[40px]" src={item.scrap_img} alt="" />
                  </div>
                  <div className="">
                    <p className="text-sm text-gray-600">{item.text}</p>
                    <p className="font-bold text-xl">{item.num}</p>
                  </div>
                </div>
                <div>
                  <img src={item.scrap} alt="" />
                </div>
                <div className="text-sm text-gray-600">
                  Increase by
                  <span
                    className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
                  >
                    {item.increase}
                  </span>
                  this week
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 
        <div className="mt-6">
          <CustomerReturn />
        </div>
        <div className="mt-6">
          <SupplierReturn />
        </div> */}
        <div className="mt-6 bg-white rounded-md shadow-sm">
          <ScrapBar />
        </div>

        <div className=" bg-white p-4 mt-6 ">
          <div className="mt-6 bg-white rounded-md shadow  ">
            <MultiLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentQuality;
