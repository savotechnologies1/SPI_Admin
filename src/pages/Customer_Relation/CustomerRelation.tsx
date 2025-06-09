import Tables from "./Tables";

const CustomerRelation = () => {
  return (
    <div className="p-2 md:p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Customer Relations
      </h1>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <span className="text-xs sm:text-[18px] font-bold hover:cursor-pointer">
            Sales:
          </span>

          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            25/11/2025 - 20/02/2026
          </span>
        </div>
      </div>
      <Tables/>
    </div>
  );
};

export default CustomerRelation;
