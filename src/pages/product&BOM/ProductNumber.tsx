import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, NavLink } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PartContext } from "../../components/Context/PartContext";
import { Plus } from "lucide-react";
import {
  createProductNumber,
  getPartDetail,
  selectPartNamber,
  selectProcess,
} from "./https/partProductApis";

const ProductNumber = () => {
  const partContext = useContext(PartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [bomError, setBomError] = useState("");
  const navigate = useNavigate();

  if (!partContext) {
    throw new Error("PartContext is undefined. Ensure the provider is set.");
  }

  const { addPart } = partContext;
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const partNumberOptions = [
    "P-12345",
    "P-22346",
    "P-32347",
    "ABC-9876",
    "XYZ-1111",
    "P-55555",
  ];
  interface Part {
    partFamily: string;
    productNumber: string;
    partDescription: string;
    cost: number;
    leadTime: number;
    availStock: string;
    orderQty: number;
    cycleTime: number;
    companyName?: string;
    minStock?: number;
    image?: File;
    productNumber1: number;
    qty: number;
    process: string;
    workInstruction: string;
    partNumber: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Part>();
  const [processData, setProcessData] = useState([]);
  const [bomEntries, setBomEntries] = useState([
    {
      productNumber: "",
      qty: "",
      process: "",
      cycleTime: "",
      workInstruction: "",
    },
  ]);
  const [savedBOMs, setSavedBOMs] = useState<any[]>([]);

  // const handleBOMChange = (index: number, field: string, value: string) => {
  //   const updated = [...bomEntries];
  //   updated[index][field] = value;
  //   setBomEntries(updated);
  // };

  const handleAddBOMRow = () => {
    setBomEntries([
      ...bomEntries,
      {
        partNumber: "",
        qty: "",
        process: "",
        cycleTime: "",
        workInstruction: "",
      },
    ]);
  };

  const handleSaveBOMs = () => {
    const validEntries = bomEntries.filter(
      (entry) =>
        entry.partNumber.trim() !== "" &&
        entry.qty !== "" &&
        entry.process.trim() !== ""
    );

    if (validEntries.length === 0) {
      setBomError("At least one complete BOM part is required.");
      return;
    }

    setSavedBOMs([...savedBOMs, ...validEntries]);
    setBomEntries([
      {
        partNumber: "",
        qty: "",
        process: "",
        processId: "",
        cycleTime: "",
        workInstruction: "",
      },
    ]);
    setBomError("");
  };

  const handleDeleteBOM = (index: number) => {
    const updated = [...savedBOMs];
    updated.splice(index, 1);
    setSavedBOMs(updated);
  };

  const onSubmitProduct = async (data: Part) => {
    if (savedBOMs.length === 0) {
      setBomError("At least one BOM part is required before submitting.");
      return;
    }

    const allData = {
      ...data,
      parts: savedBOMs,
    };
    console.log("allDataallData", allData);
    await createProductNumber(allData);
    addPart(allData);

    // navigate("/product-tree");
  };

  const fetchProcessList = async (page = 1) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await selectProcess();
      setProcessData(response);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchProcessList();
  }, []);
  const [partData, setPartData] = useState<any[]>([]);

  const fetchPartNumber = async () => {
    try {
      const response = await selectPartNamber();
      setPartData(response?.data || []);
    } catch (error) {
      console.error("Error fetching part numbers:", error);
    }
  };

  useEffect(() => {
    fetchProcessList();
    fetchPartNumber();
  }, []);
  const [suggestions, setSuggestions] = useState<{ [index: number]: string[] }>(
    {}
  );

  const handleBOMChange = (index: number, field: string, value: string) => {
    const updated = [...bomEntries];
    updated[index][field] = value;

    if (field === "partNumber") {
      const filtered = partData
        .filter((item) =>
          item.partNumber.toLowerCase().includes(value.toLowerCase())
        )
        .map((item) => item.partNumber);

      setSuggestions((prev) => ({ ...prev, [index]: filtered }));
    }

    setBomEntries(updated);
  };
  const handleSuggestionClick = async (index: number, value: string) => {
    const updated = [...bomEntries];
    updated[index].partNumber = value;

    try {
      const response = await getPartDetail(value); // API call
      const partDetail = response.data;
      console.log("partDetailpartDetail", partDetail);

      updated[index].part_id = partDetail.part_id || "";
      updated[index].process = partDetail.process?.processName || "";
      updated[index].processId =
        partDetail.processId || partDetail.process?.id || "";
      updated[index].cycleTime = partDetail.cycleTime?.toString() || "";
      updated[index].qty = partDetail.supplierOrderQty?.toString() || "";

      setBomEntries(updated);
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
    } catch (error) {
      console.error("Failed to fetch part details", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      inputRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target as Node)) {
          setSuggestions((prev) => ({ ...prev, [index]: [] }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Product Number
      </h1>

      {/* Breadcrumb */}
      <div className="flex gap-4 items-center mt-2 text-sm text-gray-700">
        <NavLink to="/dashboardDetailes" className="hover:underline">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px]" />
        <span>Product and BOM</span>
        <FaCircle className="text-[6px]" />
        <span>Product Number</span>
      </div>

      {/* Form Start */}
      <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
        <form
          onSubmit={handleSubmit(onSubmitProduct)}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {/* Product Fields */}
          <label className="block col-span-4 md:col-span-2">
            Part Family
            <select
              {...register("partFamily")}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Part Family</option>
              {processData.map((item) => (
                <option key={item.id} value={item.partFamily}>
                  {item.partFamily}
                </option>
              ))}
            </select>
          </label>

          <label className="col-span-2">
            Product Number
            <input
              type="text"
              {...register("productNumber", {
                required: "Product Number is required",
              })}
              placeholder="Enter Product Number"
              className="border p-2 rounded w-full"
            />
            {errors.productNumber && (
              <p className="text-red-500 text-xs">
                {errors.productNumber.message}
              </p>
            )}
          </label>

          <label className="col-span-4">
            Description
            <textarea
              {...register("partDescription", {
                required: "Description is required",
              })}
              className="border p-2 rounded w-full"
              placeholder="Product Description"
            />
            {errors.partDescription && (
              <p className="text-red-500 text-xs">
                {errors.partDescription.message}
              </p>
            )}
          </label>

          <input
            type="number"
            step="0.01"
            {...register("cost", { valueAsNumber: true })}
            placeholder="Cost ($)"
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            step="1" // ensures only integer input
            {...register("leadTime", { valueAsNumber: true })}
            placeholder="Lead Time (Days)"
            className="border p-2 rounded w-full"
          />

          <input
            type="number"
            {...register("orderQty")}
            placeholder="Order Qty"
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            {...register("companyName")}
            placeholder="Company"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            step="1" // ensures only integer input
            {...register("minStock", { valueAsNumber: true })}
            placeholder="Minimum Stock"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            step="1" // ensures only integer input
            {...register("availStock", { valueAsNumber: true })}
            placeholder="Available Stock"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            step="1" // ensures only integer input
            {...register("cycleTime", { valueAsNumber: true })}
            placeholder="Cycle Time"
            className="border p-2 rounded w-full"
          />

          <label className="col-span-4 cursor-pointer bg-gray-100 border rounded p-4 text-center">
            <input type="file" {...register("image")} className="hidden" />
            Tap or Click to Add Picture
          </label>

          {/* BOM Section */}
          <div className="col-span-4 mt-4">
            <p className="font-semibold text-lg mb-2">Bill of Material (BOM)</p>
            {bomEntries.map((entry, index) => (
              <div key={index} className="bg-gray-50 border p-4 rounded mb-4">
                <p className="font-semibold mb-2">Part #{index + 1}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={entry.partNumber}
                      onChange={(e) =>
                        handleBOMChange(index, "partNumber", e.target.value)
                      }
                      placeholder="Part Number"
                      className="border p-2 rounded w-full"
                    />
                    {suggestions[index]?.length > 0 && (
                      <ul className="absolute z-10 bg-white border rounded w-full max-h-40 overflow-y-auto shadow-md">
                        {suggestions[index].map((item, i) => (
                          <li
                            key={i}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(index, item)}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <input
                    type="number"
                    value={entry.qty}
                    onChange={(e) =>
                      handleBOMChange(index, "qty", e.target.value)
                    }
                    placeholder="Qty"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    value={entry.process}
                    onChange={(e) =>
                      handleBOMChange(index, "process", e.target.value)
                    }
                    placeholder="Process"
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="number"
                    value={entry.cycleTime}
                    onChange={(e) =>
                      handleBOMChange(index, "cycleTime", e.target.value)
                    }
                    placeholder="Cycle Time"
                    className="border p-2 rounded w-full"
                  />
                  <select
                    value={entry.workInstruction}
                    onChange={(e) =>
                      handleBOMChange(index, "workInstruction", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                  >
                    <option value="">Work Instruction</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            ))}

            {/* BOM Actions */}
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={handleAddBOMRow}
                className="bg-blue-800 text-white px-4 py-2 rounded flex"
              >
                <Plus fontSize={16} /> Add More
              </button>
              <button
                type="button"
                onClick={handleSaveBOMs}
                className="bg-green-600 text-white px-4 py-2 rounded flex"
              >
                Save BOM
              </button>
            </div>
            {bomError && <p className="text-red-500 mt-2">{bomError}</p>}
          </div>
          <div className="col-span-4 mt-4">
            {savedBOMs.length > 0 && (
              <div className="mt-6 bg-white p-6 rounded-2xl shadow-md">
                <h2 className="font-semibold mb-4">Saved BOM Entries</h2>
                <table className="w-full text-sm border">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="p-2">Process</th>
                      <th className="p-2">Part Number</th>
                      <th className="p-2">Cycle Time</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {savedBOMs.map((row, index) => (
                      <tr key={index} className="border-t text-center">
                        <td className="p-2">{row.process}</td>
                        <td className="p-2">{row.productNumber}</td>
                        <td className="p-2">{row.cycleTime}</td>
                        <td className="p-2">
                          <button
                            onClick={() => handleDeleteBOM(index)}
                            className="text-red-600"
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {/* Final Submit */}
          <div className="col-span-4 flex justify-end">
            <button
              type="submit"
              className="mt-6 bg-brand text-white py-2 px-6 rounded"
            >
              Add Product Number
            </button>
          </div>
        </form>
      </div>

      {/* BOM Table Preview */}
    </div>
  );
};

export default ProductNumber;
