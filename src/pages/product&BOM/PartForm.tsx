import { useContext, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { RiDeleteBin6Line } from "react-icons/ri";

const PartForm = () => {
  const context = useContext(PartContext);

  if (!context) {
    throw new Error("PartContext must be used within a PartProvider");
  }

  const { addPart } = context;
  const navigate = useNavigate();

  const [partFormData, setPartFormData] = useState({
    partFamily: "",
    partNumber: "",
    description: "",
    cost: "",
    leadTime: "",
    orderQty: "",
    company: "",
    minStock: "",
    availableStock: "",
    cycleTime: "",
    processOrder: "Yes",
    image: File || null,
  });

  const [processStepFormData, setProcessStepFormData] = useState({
    // Create relevant fields for process step
    partFamily: "",
    partNumber: "",
    description: "",
    cost: "",
    leadTime: "",
    orderQty: "",
    company: "",
    minStock: "",
    availableStock: "",
    cycleTime: "",
    processOrder: "Yes",
    image: File || null,
  });
  const handlePartFormChange = (e: any) => {
    const { name, value } = e.target;
    setPartFormData({ ...partFormData, [name]: value });
  };

  const handleProcessStepChange = (e: any) => {
    const { name, value } = e.target;
    setProcessStepFormData({ ...processStepFormData, [name]: value });
  };

  const handleSubmitPartForm = (e: any) => {
    e.preventDefault();
    addPart({
      ...partFormData,
      cost: parseFloat(partFormData.cost),
      leadTime: parseInt(partFormData.leadTime, 10),
      orderQty: parseInt(partFormData.orderQty, 10),
      cycleTime: parseInt(partFormData.cycleTime, 10),
    });
    navigate("/part-table");
  };

  const handleSubmitProcessStep = (e: any) => {
    e.preventDefault();
    // Add your own logic here
    console.log("Process Step Data:", processStepFormData);
  };
  return (
    <div className="p-4 md:p-7">
      <div>
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-black">
          Part Number
        </h1>
      </div>

      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
        <p className="text-xs sm:text-sm md:text-base text-black">
          <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
        </p>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-xs sm:text-sm md:text-base hover:cursor-pointer">
          product and Bom
        </span>
        <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
        <span className="text-xs sm:text-sm md:text-base hover:cursor-pointer">
          Edit Part Number
        </span>
      </div>

      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmitPartForm}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Part Family */}
          <label className="block col-span-4 md:col-span-2">
            Part Family
            <select
              name="partFamily"
              value={partFormData.partFamily}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Part Family</option>
              <option value="Cut Trim">Cut Trim</option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
            </select>
          </label>

          {/* Part Number */}
          <label className="block col-span-4 md:col-span-2">
            Part Number
            <input
              type="text"
              name="partNumber"
              placeholder="Enter Part Number"
              value={partFormData.partNumber}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Description */}
          <label className="block col-span-4">
            Meta Description
            <textarea
              name="description"
              placeholder="Meta Description"
              value={partFormData.description}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full"
            ></textarea>
          </label>

          {/* Cost */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">Cost ($)</label>
            <input
              type="number"
              name="cost"
              placeholder="Enter Cost"
              value={partFormData.cost}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Lead Time */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Lead Time (Days)
            </label>
            <input
              type="number"
              name="leadTime"
              placeholder="Lead Time Days"
              value={partFormData.leadTime}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Order Qty */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Order Quantity
            </label>
            <input
              type="number"
              name="orderQty"
              placeholder="Order Qty"
              value={partFormData.orderQty}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Company */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={partFormData.company}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Minimum Stock */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Minimum Stock
            </label>
            <input
              type="number"
              name="minStock"
              placeholder="Minimum Stock"
              value={partFormData.minStock}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Available Stock */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Available Stock
            </label>
            <input
              type="number"
              name="availableStock"
              placeholder="Available Stock"
              value={partFormData.availableStock}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Cycle Time */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Cycle Time
            </label>
            <input
              type="number"
              name="cycleTime"
              placeholder="Cycle Time"
              value={partFormData.cycleTime}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            />
          </div>

          {/* Availability (Yes/No) */}
          <div className="col-span-4 md:col-span-1">
            <label className="block text-sm md:text-base mb-1">
              Process order required
            </label>
            <select
              name="processOrder"
              value={partFormData.processOrder}
              onChange={handlePartFormChange}
              className="border p-2 rounded w-full text-sm md:text-base"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <label className="border bg-gray-100 rounded p-4 text-sm cursor-pointer block text-center">
            {partFormData.image ? (
              <span className="text-gray-700">{partFormData.image.name}</span>
            ) : (
              "Tap or Click to Add Picture"
            )}
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setPartFormData((prev: any) => ({ ...prev, image: file }));
                }
              }}
            />
          </label>

          <div className="flex  justify-between items-center  col-span-4">
            <button
              type="submit"
              className=" bg-brand text-white py-2 rounded px-4"
            >
              Add Part Number
            </button>

            <div className="bg-[#FF5630]  p-3 rounded-full cursor-pointer">
              <RiDeleteBin6Line color="white " fontSize={18} />
            </div>
          </div>
        </form>
      </div>

      <div className="">
        <h1 className="font-bold text-lg">Process step table</h1>
        <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
          <form
            onSubmit={handleSubmitProcessStep}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Part Family */}
            <label className="block col-span-4 md:col-span-2">
              Part Family
              <select
                name="partFamily"
                value={partFormData.partFamily}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Part Family</option>
                <option value="Cut Trim">Cut Trim</option>
                <option value="Metal">Metal</option>
                <option value="Plastic">Plastic</option>
              </select>
            </label>

            {/* Part Number */}
            <label className="block  col-span-4 md:col-span-2">
              Part Number
              <input
                type="text"
                name="partNumber"
                placeholder="Enter Part Number"
                value={partFormData.partNumber}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Description */}
            <label className="block col-span-4">
              Meta Description
              <textarea
                name="description"
                placeholder="Meta Description"
                value={partFormData.description}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              ></textarea>
            </label>

            {/* Cost */}
            <label className="block col-span-4 md:col-span-1">
              Cost ($)
              <input
                type="number"
                name="cost"
                placeholder="Enter Cost"
                value={partFormData.cost}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Lead Time */}
            <label className="block col-span-4 md:col-span-1">
              Lead Time (Days)
              <input
                type="number"
                name="leadTime"
                placeholder="Lead Time Days"
                value={partFormData.leadTime}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Order Qty */}
            <label className="block col-span-4 md:col-span-1">
              Order Quantity by Supplier
              <input
                type="number"
                name="orderQty"
                placeholder="Order Qty"
                value={partFormData.orderQty}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Company */}
            <label className="block col-span-4 md:col-span-1">
              Company Name
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={partFormData.company}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Minimum Stock */}
            <label className="block col-span-4 md:col-span-1">
              Minimum Stock
              <input
                type="number"
                name="minStock"
                placeholder="Minimum Stock"
                value={partFormData.minStock}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Available Stock */}
            <label className="block col-span-4 md:col-span-1">
              Available Stock
              <input
                type="number"
                name="availableStock"
                placeholder="Available Stock"
                value={partFormData.availableStock}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Cycle Time */}
            <label className="block col-span-4 md:col-span-1">
              Cycle Time
              <input
                type="number"
                name="cycleTime"
                placeholder="Cycle Time"
                value={partFormData.cycleTime}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              />
            </label>

            {/* Availability (Yes/No) */}
            <label className="block col-span-4 md:col-span-1">
              Process order required
              <select
                name="availableStock"
                value={partFormData.availableStock}
                onChange={handleProcessStepChange}
                className="border p-2 rounded w-full"
              >
                <option value="100">Yes</option>
                <option value="500">No</option>
              </select>
            </label>

            <label className="border bg-gray-100 rounded p-2 md:p-4 text-sm cursor-pointer block text-center ">
              {partFormData.image ? (
                <span className="text-gray-700">{partFormData.image.name}</span>
              ) : (
                "Tap or Click to Add Picture"
              )}
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPartFormData((prev: any) => ({ ...prev, image: file }));
                  }
                }}
              />
            </label>

            <div className="flex  justify-between items-center  col-span-4">
              <button
                type="submit"
                className=" bg-brand text-white py-2 rounded px-4"
              >
                Add Part Number
              </button>

              <div className="bg-[#FF5630]  p-3 rounded-full cursor-pointer">
                <RiDeleteBin6Line color="white " fontSize={18} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartForm;
