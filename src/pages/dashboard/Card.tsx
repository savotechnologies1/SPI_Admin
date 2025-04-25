import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  img: string;
  bgColor: string;
  overlay2: string;
  overlay21: string;
}

const Card: React.FC<CardProps> = ({ title, value, img, bgColor, overlay2, overlay21 }) => {
  return (
    <div className={`p-4 rounded-lg shadow bg-white  relative `}>
      <div className="flex flex-col  ">
        <div className="flex flex- justify-between  ">
          <div>
            <img src={img} alt="" />
          </div>

          <div className="space-y-2 text-end">
            <p className="text-sm ">from last month </p>
            <p
              className={`text-xs text-end inline-block px-4 py-2 rounded-md ${bgColor}`}
            >
              0.25%
            </p>
          </div>
        </div>

        <div className="items- text- space-y-">
          <h3 className="text-gray-700">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>

      <div className="absolute bottom-0 right-0">
        <img src={overlay2} alt="" />
      </div>
      <div className="absolute bottom-0 right-0">
        <img src={overlay21} alt="" />
      </div>
    </div>
  );
};

export default Card;
