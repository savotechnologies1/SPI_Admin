import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const WorkInstruction = () => {
  const [selectedProcess, setSelectedProcess] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");


  const handleAddInstruction = () => {
   
    console.log("Process:", selectedProcess);
    console.log("Product:", selectedProduct);
   
  };
  return (
    <div className="p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
       Work Instruction
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[14px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px] hover:cursor-pointer">
            Work Instruction
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[14px] hover:cursor-pointer">
         select process & product
          </span>
        </div>
      </div>
      <div className="mt-4 bg-white p-6 w-full rounded-2xl">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Select Process */}
        <div className="w-full md:w-1/2">
          <label className="font-semibold" htmlFor="process">
            Select Process
          </label>
          <select
            id="process"
            value={selectedProcess}
            onChange={(e) => setSelectedProcess(e.target.value)}
            className="border py-4 px-4 rounded-md w-full mt-2"
          >
            <option value="">Select Process</option>
            <option value="Process 1">Process 1</option>
            <option value="Process 2">Process 2</option>
            <option value="Process 3">Process 3</option>
          </select>
        </div>

        {/* Select Product */}
        <div className="w-full md:w-1/2">
          <label className="font-semibold" htmlFor="product">
            Select Product
          </label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border py-4 px-4 rounded-md w-full mt-2"
          >
            <option value="">Select Product</option>
            <option value="Product 1">Product 1</option>
            <option value="Product 2">Product 2</option>
            <option value="Product 3">Product 3</option>
          </select>
        </div>
      </div>

      {/* Add Work Instruction Button */}
      <div className="mt-6 ">
        <button
          onClick={handleAddInstruction}
          className="bg-brand text-white px-5 py-3 rounded-lg"
        >
          Add Work Instruction
        </button>
      </div>
    </div>
    </div>
  );
};

export default WorkInstruction;
