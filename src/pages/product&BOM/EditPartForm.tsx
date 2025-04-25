import  { useContext, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { RiDeleteBin6Line } from "react-icons/ri";

const EditPartForm = () => {
  const partContext = useContext(PartContext);

  if (!partContext) {
    throw new Error("PartContext is undefined. Ensure the provider is set.");
  }

  const { addPart } = partContext;
  const navigate = useNavigate();

  interface Part {
    partFamily: string;
    partNumber: string;
    description: string;
    cost: number;
    leadTime: number;
    availableStock: string;
    orderQty: number;
    cycleTime: number;
    company?: string;
    minStock?: number;
    image?: File;
  }

  const [formData, setFormData] = useState<Part>({
      partFamily: "",
      partNumber: "",
      description: "",
      cost: 0,
      leadTime: 0,
      availableStock: "",
      orderQty: 0,
      cycleTime: 0,
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    addPart(formData); // Save data in Context
    navigate("/part-table"); // Redirect to table page
    console.log("Submitted Form Data:", formData);
  };
  return (
    <div className="p-4 md:p-7">
      <div>
        {" "}
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Product Number
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p
            className={`text-xs sm:text-[16px] text-black`}
            onClick={() => ("dashboardDetailes")}
          >
            <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
          </p>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
            product and Bom
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-xs sm:text-[16px] hover:cursor-pointer">
          Add Product Number
          </span>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Part Family */}
          <label className="block col-span-4 md:col-span-2">
            Part Family
            <select
              name="partFamily"
              value={formData.partFamily}
              onChange={handleChange}
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
            Product Number
            <input
              type="text"
              name="productNumber"
              placeholder="Enter Your Product Number"
              value={formData.partNumber}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Description */}
          <label className="block col-span-4">
            Part Description
            <textarea
              name="description"
              placeholder="Meta Description"
              value={formData.description}
              onChange={handleChange}
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
              value={formData.cost}
              onChange={handleChange}
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
              value={formData.leadTime}
              onChange={handleChange}
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
              value={formData.orderQty}
              onChange={handleChange}
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
              value={formData.company}
              onChange={handleChange}
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
              value={formData.minStock}
              onChange={handleChange}
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
              value={formData.availableStock}
              onChange={handleChange}
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
              value={formData.cycleTime}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Availability (Yes/No) */}
          <label className="block col-span-4 md:col-span-1">
          Process order required
            <select
              name="availableStock"
              value={formData.availableStock}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="100">Yes</option>
              <option value="500">No</option>
            </select>
          </label>

          <label className="border bg-gray-100 rounded p-2 md:p-4 text-sm cursor-pointer block text-center">
            {formData.image ? (
              <span className="text-gray-700">{formData.image.name}</span>
            ) : (
              "Tap or Click to Add Picture"
            )}
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFormData((prev) => ({ ...prev, image: file }));
                }
              }}
            />
          </label>
          <div className="flex  justify-between items-center  col-span-4">
            <button
              type="submit"
              className=" bg-brand text-white py-2 rounded px-4"
            >
              Add Product Number
            </button>

            <div className="bg-[#FF5630]  p-3 rounded-full cursor-pointer">
              <RiDeleteBin6Line color="white " fontSize={18} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPartForm;
