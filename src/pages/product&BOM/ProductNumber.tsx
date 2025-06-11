import { useContext, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import edit from "../../assets/edit.png";
import more from "../../assets/more.png";

const data = [
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
  {
    process: "Cut Trim",
    partDesc: "24×96” Virgin ABS, black smooth/ smooth 070 sheet",
    cycleTime: "40 min",
    totalCycle: "40 min",
  },
];

const ProductNumber = () => {
  const partContext = useContext(PartContext);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addPart(formData); // Save data in Context
    navigate("/product-tree"); // Redirect to table page
    console.log("Submitted Form Data:", formData);
  };

  const [processFormData, setProcessFormData] = useState({
    partNumber: "",
    qty: "",
    process: "",
    cycleTime: "",
    workInstruction: "",
  });

  const handleChange1 = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProcessFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Process Form Data:", processFormData);
  };
  const filteredData = data.filter((item) =>
    item.partDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4; // Change this as needed
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
            onClick={() => "dashboardDetailes"}
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
            Product Number
          </span>
        </div>
      </div>
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
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
              value={formData.productNumber}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Description */}
          <label className="block col-span-4">
            Product Description
            <textarea
              name="description"
              placeholder="Product Description"
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
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <p className="font-semibold text-lg mb-4">Bill of material table:</p>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First row: 3 columns */}
          <label className="block col-span-1">
            Product Number
            <input
              type="text"
              name="partNumber"
              placeholder="#357445"
              value={processFormData.partNumber}
              onChange={handleChange1}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-1">
            Qty
            <input
              type="number"
              name="qty"
              placeholder="356"
              value={processFormData.qty}
              onChange={handleChange1}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-1">
            Process
            <select
              name="process"
              value={processFormData.process}
              onChange={handleChange1}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Process</option>
              <option value="Cutting">Cutting</option>
              <option value="Molding">Molding</option>
              <option value="Assembly">Assembly</option>
            </select>
          </label>

          {/* Second row: 2 columns */}
          <label className="block col-span-1">
            Cycle Time
            <input
              type="number"
              name="cycleTime"
              placeholder="4000"
              value={processFormData.cycleTime}
              onChange={handleChange1}
              className="border p-2 rounded w-full"
            />
          </label>

          <label className="block col-span-1">
            Work Instruction
            <select
              name="workInstruction"
              value={processFormData.workInstruction}
              onChange={handleChange1}
              className="border p-2 rounded w-full"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </label>

          {/* Save Button + Trash Icon full width */}
          <div className="flex justify-between items-center col-span-3 mt-2">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-900 text-white py-2 rounded px-4"
            >
              Save Process
            </button>

            <div className="bg-[#FF5630]  p-3 rounded-full cursor-pointer">
              <RiDeleteBin6Line color="white " fontSize={18} />
            </div>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
        {/* Search bar */}
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={more} alt="" />
        </div>

        {/* Table */}
        <table className="text-sm w-full">
          <thead className="bg-[#F4F6F8] text-left text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Process</th>
              <th className="px-4 py-3 font-medium">Product Description</th>
              <th className="px-4 py-3 font-medium">Cycle Time</th>
              <th className="px-4 py-3 font-medium">Total Cycle Time</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-dashed border-gray-200"
              >
                <td className="px-4 py-4">{item.process}</td>
                <td className="px-4 py-4">
                  {item.partDesc.split("/")[0]} <br />/
                  {item.partDesc.split("/")[1]}
                </td>
                <td className="px-4 py-4">{item.cycleTime}</td>
                <td className="px-4 py-4">{item.totalCycle}</td>
                <td className="px-4 py-4 flex items-center gap-4">
                  <button>
                    <img className="" src={edit} alt="Edit" />
                  </button>
                  <button>
                    <img src={more} alt="More" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end items-center py-4 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductNumber;
