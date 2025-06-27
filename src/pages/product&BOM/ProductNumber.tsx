import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { PartContext } from "../../components/Context/PartContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import edit from "../../assets/edit.png";
import more from "../../assets/more.png";
import { createProductNumber } from "./https/partProductApis";
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
  const navigate = useNavigate();

  if (!partContext) {
    throw new Error("PartContext is undefined. Ensure the provider is set.");
  }

  const { addPart } = partContext;

  interface Part {
    partFamily: string;
    productNumber: string;
    description: string;
    cost: number;
    leadTime: number;
    availStock: string;
    orderQty: number;
    cycleTime: number;
    company?: string;
    minStock?: number;
    image?: File;
  }

  const {
    register: registerProduct,
    handleSubmit: handleProductSubmit,
    formState: { errors: productErrors },
  } = useForm<Part>();
  const {
    register: registerProcess,
    handleSubmit: handleProcessSubmit,
    formState: { errors: processErrors },
  } = useForm({
    defaultValues: {
      productNumber: "",
      qty: "",
      process: "",
      cycleTime: "",
      workInstruction: "",
    },
  });

  const onSubmitProduct = async (data: Part) => {
    addPart(data); // Save data in Context
    navigate("/product-tree"); // Redirect to table page
    // eslint-disable-next-line no-useless-catch
    // try {
    //   const response = await createProductNumber(data);
    //   console.log("responseresponseresponse", response);
    //   if (response?.status == 201) {
    //     // navigate("/employees");
    //   }
    // } catch (error: unknown) {
    //   throw error;
    // }
  };

  const onSubmitProcess = (data: any) => {};

  const filteredData = data.filter((item) =>
    item.partDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4 md:p-7">
      <div>
        <h1 className="font-bold text-[20px] md:text-[24px] text-black">
          Product Number
        </h1>
      </div>
      <div className="flex justify-between mt-2 items-center">
        <div className="flex gap-4 items-center ">
          <p className={`text-xs sm:text-[16px] text-black`}>
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

      {/* Product Form */}
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <form
          onSubmit={handleProductSubmit(onSubmitProduct)}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {/* Part Family */}
          <label className="block col-span-4 md:col-span-2">
            Part Family
            <select
              {...registerProduct("partFamily", {
                required: "Part Family is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Part Family</option>
              <option value="Cut Trim">Cut Trim</option>
              <option value="Metal">Metal</option>
              <option value="Plastic">Plastic</option>
            </select>
            {productErrors.partFamily && (
              <p className="text-red-500 text-xs">
                {productErrors.partFamily.message}
              </p>
            )}
          </label>

          {/* Part Number */}
          <label className="block col-span-4 md:col-span-2">
            Product Number
            <input
              type="text"
              {...registerProduct("productNumber", {
                required: "Product Number is required",
              })}
              placeholder="Enter Your Product Number"
              className="border p-2 rounded w-full"
            />
            {productErrors.productNumber && (
              <p className="text-red-500 text-xs">
                {productErrors.productNumber.message}
              </p>
            )}
          </label>

          {/* Description */}
          <label className="block col-span-4">
            Product Description
            <textarea
              {...registerProduct("description", {
                required: "Description is required",
              })}
              placeholder="Product Description"
              className="border p-2 rounded w-full"
            ></textarea>
            {productErrors.description && (
              <p className="text-red-500 text-xs">
                {productErrors.description.message}
              </p>
            )}
          </label>

          {/* Cost */}
          <label className="block col-span-4 md:col-span-1">
            Cost ($)
            <input
              type="number"
              {...registerProduct("cost", {})}
              placeholder="Enter Cost"
              className="border p-2 rounded w-full"
            />
            {productErrors.cost && (
              <p className="text-red-500 text-xs">
                {productErrors.cost.message}
              </p>
            )}
          </label>

          {/* Lead Time */}
          <label className="block col-span-4 md:col-span-1">
            Lead Time (Days)
            <input
              type="number"
              {...registerProduct("leadTime", {})}
              placeholder="Lead Time Days"
              className="border p-2 rounded w-full"
            />
            {productErrors.leadTime && (
              <p className="text-red-500 text-xs">
                {productErrors.leadTime.message}
              </p>
            )}
          </label>

          {/* Order Qty */}
          <label className="block col-span-4 md:col-span-1">
            Order Quantity by Supplier
            <input
              type="number"
              placeholder="Order Qty"
              {...registerProduct("orderQty", {})}
              className="border p-2 rounded w-full"
            />
            {productErrors.orderQty && (
              <p className="text-red-500 text-xs">
                {productErrors.orderQty.message}
              </p>
            )}
          </label>

          {/* Company */}
          <label className="block col-span-4 md:col-span-1">
            Company Name
            <input
              type="text"
              placeholder="Company"
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Minimum Stock */}
          <label className="block col-span-4 md:col-span-1">
            Minimum Stock
            <input
              type="number"
              placeholder="Minimum Stock"
              className="border p-2 rounded w-full"
            />
          </label>

          {/* Available Stock */}
          <label className="block col-span-4 md:col-span-1">
            Available Stock
            <input
              type="number"
              {...registerProduct("availStock", {})}
              placeholder="Available Stock"
              className="border p-2 rounded w-full"
            />
            {productErrors.availStock && (
              <p className="text-red-500 text-xs">
                {productErrors.availStock.message}
              </p>
            )}
          </label>

          {/* Cycle Time */}
          <label className="block col-span-4 md:col-span-1">
            Cycle Time
            <input
              type="number"
              placeholder="Cycle Time"
              className="border p-2 rounded w-full"
            />
            {productErrors.cycleTime && (
              <p className="text-red-500 text-xs">
                {productErrors.cycleTime.message}
              </p>
            )}
          </label>

          {/* Availability (Yes/No) */}
          <label className="block col-span-4 md:col-span-1">
            Process order required
            <select
              {...registerProduct("availStock", {
                required: "This field is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="100">Yes</option>
              <option value="500">No</option>
            </select>
          </label>

          <label className="border bg-gray-100 rounded p-2 md:p-4 text-sm cursor-pointer block text-center">
            <input
              type="file"
              className="hidden"
              {...registerProduct("image")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file state if needed
                }
              }}
            />
            Tap or Click to Add Picture
          </label>

          <div className="flex justify-between items-center col-span-4">
            <button
              type="submit"
              className="bg-brand text-white py-2 rounded px-4"
            >
              Add Product Number
            </button>

            <div className="bg-[#FF5630] p-3 rounded-full cursor-pointer">
              <RiDeleteBin6Line color="white" fontSize={18} />
            </div>
          </div>
        </form>
      </div>

      {/* Process Form */}
      <div className="mt-6 bg-white p-6 w-full rounded-2xl shadow-md">
        <p className="font-semibold text-lg mb-4">Bill of material table:</p>
        <form
          onSubmit={handleProcessSubmit(onSubmitProcess)}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <label className="block col-span-1">
            Part Number
            <input
              type="text"
              {...registerProcess("productNumber", {
                required: "Product Number is required",
              })}
              placeholder="#357445"
              className="border p-2 rounded w-full"
            />
            {processErrors.productNumber && (
              <p className="text-red-500 text-xs">
                {processErrors.productNumber.message}
              </p>
            )}
          </label>

          <label className="block col-span-1">
            Qty
            <input
              type="number"
              {...registerProcess("qty", { required: "Quantity is required" })}
              placeholder="356"
              className="border p-2 rounded w-full"
            />
            {processErrors.qty && (
              <p className="text-red-500 text-xs">
                {processErrors.qty.message}
              </p>
            )}
          </label>

          <label className="block col-span-1">
            Process
            <select
              {...registerProcess("process", {
                required: "Process is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Process</option>
              <option value="Cutting">Cutting</option>
              <option value="Molding">Molding</option>
              <option value="Assembly">Assembly</option>
            </select>
            {processErrors.process && (
              <p className="text-red-500 text-xs">
                {processErrors.process.message}
              </p>
            )}
          </label>

          <label className="block col-span-1">
            Cycle Time
            <input
              type="number"
              {...registerProcess("cycleTime", {
                required: "Cycle Time is required",
              })}
              placeholder="4000"
              className="border p-2 rounded w-full"
            />
            {processErrors.cycleTime && (
              <p className="text-red-500 text-xs">
                {processErrors.cycleTime.message}
              </p>
            )}
          </label>

          <label className="block col-span-1">
            Work Instruction
            <select
              {...registerProcess("workInstruction", {
                required: "Work Instruction is required",
              })}
              className="border p-2 rounded w-full"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {processErrors.workInstruction && (
              <p className="text-red-500 text-xs">
                {processErrors.workInstruction.message}
              </p>
            )}
          </label>

          <div className="flex justify-between items-center col-span-3 mt-2">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 rounded px-4"
            >
              Save Process
            </button>

            <div className="bg-[#FF5630] p-3 rounded-full cursor-pointer">
              <RiDeleteBin6Line color="white" fontSize={18} />
            </div>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={more} alt="" />
        </div>

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
