import CycleTime from "./CycleTimeBar";
import ProcessTrends from "./ProcessTrends";

const ContinuousImprovement = () => {
  return (
    <div className="p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Continuous Improvement
      </h1>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
            Continuous Improvement
          </span>

          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            25/11/2025 - 20/02/2026
          </span>
        </div>
      </div>
      <div className="bg-white rounded-md mt-6 shadow-md">
        <CycleTime />
      </div>


      <div className="bg-white rounded-md mt-6 shadow-md">
        <ProcessTrends />
      </div>
    </div>
  );
};

export default ContinuousImprovement;
