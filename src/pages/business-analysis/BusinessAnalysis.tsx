import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";
import green from "../../assets/green.png";
import orange from "../../assets/orange.png";
import Tables from "./Tables";

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
const data_2 = [
  {
    num: "129",
    text: "Actual",
    img: green,
    shape: shape_2,
  },
  {
    num: "1",
    text: "Scrap",
    img: orange,
    shape: shape_3,
  },
];

const BusinessAnalysis = () => {
  return (
    <div className="p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Business Intelligence
      </h1>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
            Operational Performance:
          </span>

          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            25/11/2025 (3:19 PM)
          </span>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="font-semibold text-xl">Scrap</h1>
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

      <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
        {data_2.map((item) => (
          <div className="flex justify-between items-center bg-white  rounded-md  w-full">
            {" "}
            <div className="p-2">
              {" "}
              <p className="font-bold text-2xl">{item.num}</p>
              <p>{item.text}</p>
            </div>
            <div className="relative right-0">
              <img className="w-14" src={item.shape} alt="" />
              <div className="absolute right-2 top-4">
                <img src={item.img} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>

<Tables/>

    </div>
  );
};

export default BusinessAnalysis;
