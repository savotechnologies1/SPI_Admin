import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ApplyWorkInstruction = () => {
  const [formData, setFormData] = useState({
    workInstruction: "",
    process: "",
    product: "",
    part: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    // Add your submission logic here
  };

  const breadcrumbs = [
    { path: "/dashboardDetailes", label: "Dashboard" },
    { label: "Work Instruction" },
    { label: "Apply work instruction to different product/process" },
  ];

  return (
    <div className="p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-xl sm:text-2xl text-black">
          Add Work Instruction
        </h1>
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center mt-2 gap-2">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.path ? (
              <NavLink
                to={item.path}
                className="text-xs sm:text-sm text-black hover:underline"
              >
                {item.label}
              </NavLink>
            ) : (
              <span className="text-xs sm:text-sm cursor-default">
                {item.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <FaCircle className="text-[6px] text-gray-500" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label
              className="block font-semibold mb-2"
              htmlFor="workInstruction"
            >
              Select Work Instruction
            </label>
            <select
              id="workInstruction"
              value={formData.workInstruction}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Work Instruction</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={`Work Instruction ${num}`}>
                  Work Instruction {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="process">
              Select Process``
            </label>
            <select
              id="process"
              value={formData.process}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Process</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={`Process ${num}`}>
                  Process {num}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2" htmlFor="product">
              Select Product
            </label>
            <select
              id="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Product</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={`Product ${num}`}>
                  Product {num}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Second Row */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2" htmlFor="product">
              Select Product
            </label>
            <select
              id="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Product</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={`Product ${num}`}>
                  Product {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="part">
              Select Part
            </label>
            <select
              id="part"
              value={formData.part}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Part</option>
              {[1, 2, 3].map((num) => (
                <option key={num} value={`Part ${num}`}>
                  Part {num}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-brand text-white px-5 py-3 rounded-lg transition-colors"
        >
          Add Work Instruction
        </button>
      </div>
    </div>
  );
};

export default ApplyWorkInstruction;
