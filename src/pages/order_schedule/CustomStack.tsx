import  { FC, useState } from "react";

interface custom {
  max?: number;
  text: string;
  text1: string;
  process1: string;
  process2: string;
  img: string;
  img_1: string;
  qty?: string;
  del_date?: string;
}
const CustomStack: FC<custom> = ({max=6, text, text1, process1, process2, img, img_1}) => {
  const [count, setCount] = useState(3);
  const [selectedProcess, setSelectedProcess] = useState(process1);
   const processOptions = [process1 , process2];

  const increment = () => {
    if (count < max) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  return (
    <div className="flex flex-col py-4 gap-4 ">
      {/* <Link to="/custom-details"> */}{" "}
      <div
        className="p-4 bg-white   shadow-m  flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
      >
        <div className="flex flex-col sm:flex-row gap-2  items-center w-full md:w-auto sm:gap-4  ">
          <div>
            <img
              className="w-16 h-16 bg-cover rounded-lg object-cover"
              src={img_1}
              alt=""
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-base sm:text-lg">{text}</p>
            <div className="flex gap-2 items-center justify-center sm:justify-start">
              <p className="text-xs sm:text-base text-[#1C252E]">
                {text1}
              </p>
              <span className="text-gray-300">|</span>
               <select
                className="text-xs sm:text-base text-[#1C252E] border border-gray-300 rounded px-2 py-1"
                value={selectedProcess}
                onChange={(e) => setSelectedProcess(e.target.value)}
              >
                {processOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center border rounded px-2 py-1">
            <button onClick={decrement} className="px-2 text-lg">
              −
            </button>
            <span className="px-3 font-medium">{count}</span>
            <button onClick={increment} className="px-2 text-lg">
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">Available: {max}</span>
        </div>
        <div className="bg-[#FFF8F8] rounded-full p-2 cursor-pointer">
          <img src={img} alt="" />
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default CustomStack;
