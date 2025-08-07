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

interface Part {
  partFamily: string;
  productNumber: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty?: number;
  cycleTime?: number;
  availStock?: number;
  companyName?: string;
  minStock?: number;
}

const ProductNumber = () => {
  const partContext = useContext(PartContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Part>();

  const [processData, setProcessData] = useState([]);
  const [partData, setPartData] = useState<any[]>([]);
  const [savedBOMs, setSavedBOMs] = useState<any[]>([]);
  const [bomEntries, setBomEntries] = useState([
    {
      partNumber: "",
      qty: "",
      process: "",
      cycleTime: "",
      workInstruction: "",
      isSaved: false, // NEW
    },
  ]);

  const [suggestions, setSuggestions] = useState<{ [index: number]: string[] }>(
    {}
  );
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  const { addPart } = partContext || {};

  // Fetch process list and parts
  useEffect(() => {
    (async () => {
      try {
        const process = await selectProcess();
        const parts = await selectPartNamber();
        setProcessData(process);
        setPartData(parts?.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      inputRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target as Node)) {
          setSuggestions((prev) => ({ ...prev, [index]: [] }));
        }
      });
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
  };

  const handleSuggestionClick = async (index: number, value: string) => {
    const updated = [...bomEntries];
    updated[index].partNumber = value;

    try {
      const response = await getPartDetail(value);
      const partDetail = response.data;

      updated[index].part_id = partDetail.part_id || "";
      updated[index].process = partDetail.process?.processName || "";
      updated[index].processId = partDetail.process?.id || "";
      updated[index].cycleTime = partDetail.cycleTime?.toString() || "";
      updated[index].qty = partDetail.availStock?.toString() || "";

      setBomEntries(updated);
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
    } catch (error) {
      console.error("Failed to fetch part details", error);
    }
  };

  const handleAddBOMRow = () => {
    setBomEntries([
      ...bomEntries,
      {
        partNumber: "",
        qty: "",
        process: "",
        cycleTime: "",
        workInstruction: false,
      },
    ]);
  };
  const handleSaveBOMs = () => {
    const updated = [...bomEntries];
    let saved = false;

    const validated = updated.map((entry) => {
      if (!entry.isSaved && entry.partNumber && entry.qty && entry.process) {
        saved = true;
        return { ...entry, isSaved: true };
      }
      return entry;
    });

    validated.push({
      partNumber: "",
      qty: "",
      process: "",
      cycleTime: "",
      workInstruction: false,
      isSaved: false,
    });

    setBomEntries(validated);
  };

  const handleDeleteBOM = (index: number) => {
    const updated = [...bomEntries];
    updated.splice(index, 1);
    setBomEntries(updated);
  };

  const onSubmitProduct = async (data: Part) => {
    const savedBOMs = bomEntries.filter((entry) => entry.isSaved);

    const formData = new FormData();

    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined) formData.append(key, String(val));
    });

    if (selectedImages) {
      Array.from(selectedImages).forEach((file) => {
        formData.append("partImages", file);
      });
    }

    formData.append("parts", JSON.stringify(savedBOMs));

    try {
      const response = await createProductNumber(formData);
      if (response?.status === 201) {
        navigate("/product-tree");
      }

      if (addPart) addPart(data);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (selectedImages && selectedImages.length > 0) {
      const imageUrls = Array.from(selectedImages).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(imageUrls);

      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewImages([]);
    }
  }, [selectedImages]);
  return (
    <div className="p-4 md:p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Product Number
      </h1>
      <div className="flex gap-4 items-center mt-2 text-sm text-gray-700">
        <NavLink to="/dashboardDetailes" className="hover:underline">
          Dashboard
        </NavLink>
        <FaCircle className="text-[6px]" />
        <span>Product and BOM</span>
        <FaCircle className="text-[6px]" />
        <span>Product Number</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitProduct)}
        className="mt-6 bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <label className="col-span-4 md:col-span-2">
          Part Family
          <select
            {...register("partFamily")}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Part Family</option>
            {processData.map((item: any) => (
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
            className="border p-2 rounded w-full"
            placeholder="Enter Product Number"
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
        <label className="col-span-4 md:col-span-1">
          Cost
          <input
            type="number"
            step="0.01"
            {...register("cost", { valueAsNumber: true })}
            placeholder="Cost ($)"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="col-span-4 md:col-span-1">
          Lead Time (Days)
          <input
            type="number"
            {...register("leadTime", { valueAsNumber: true })}
            placeholder="Lead Time (Days)"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="col-span-4 md:col-span-1">
          Order Quantity by Supplier
          <input
            type="number"
            {...register("supplierOrderQty", { valueAsNumber: true })}
            placeholder="Order Qty"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="col-span-4 md:col-span-1">
          Company Name
          <input
            type="text"
            {...register("companyName")}
            placeholder="Company"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="col-span-4 md:col-span-1">
          Minimum Stock
          <input
            type="number"
            {...register("minStock", { valueAsNumber: true })}
            placeholder="Minimum Stock"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="col-span-4 md:col-span-1">
          Available Stock
          <input
            type="number"
            {...register("availStock", { valueAsNumber: true })}
            placeholder="Available Stock"
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="col-span-4 md:col-span-1">
          Cycle Time
          <input
            type="number"
            {...register("cycleTime", { valueAsNumber: true })}
            placeholder="Cycle Time"
            className="border p-2 rounded w-full"
          />
        </label>
        {/* <label className="block col-span-4 md:col-span-2 cursor-pointer border bg-gray-100 p-4 rounded text-center">
          <input
            type="file"
            className="hidden"
            multiple
            onChange={(e) => setSelectedImages(e.target.files)}
          />
          {selectedImages?.length
            ? `${selectedImages.length} image(s) selected`
            : "Tap or Click to Add Pictures"}
        </label> */}

        {previewImages.length > 0 && (
          <div className="col-span-4 flex gap-3 flex-wrap mt-2">
            {previewImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`preview-${idx}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <label className="block col-span-4 md:col-span-2 cursor-pointer border bg-gray-100 p-4 rounded text-center">
          <input
            type="file"
            className="hidden"
            multiple
            accept="image/*"
            onChange={(e) => setSelectedImages(e.target.files)}
          />
          <div>
            {selectedImages?.length
              ? `${selectedImages.length} image(s) selected`
              : "Tap or Click to Add Pictures"}
          </div>
        </label>

        {/* BOM Section */}
        <div className="col-span-4 mt-4">
          <p className="font-semibold text-lg mb-2">Bill of Material (BOM)</p>
          {bomEntries.map((entry, index) => (
            <div
              key={index}
              className="bg-gray-50 border p-4 rounded mb-4"
              ref={(el) => (inputRefs.current[index] = el)}
            >
              <p className="font-semibold mb-2">Part #{index + 1}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    value={entry.partNumber}
                    disabled={entry.isSaved}
                    onChange={(e) =>
                      handleBOMChange(index, "partNumber", e.target.value)
                    }
                    className="border p-2 rounded w-full"
                    placeholder="Part Number"
                  />
                  {!entry.isSaved && suggestions[index]?.length > 0 && (
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
                  disabled={entry.isSaved}
                  onChange={(e) =>
                    handleBOMChange(index, "qty", e.target.value)
                  }
                  placeholder="Qty"
                  className="border p-2 rounded w-full"
                />

                <input
                  type="text"
                  value={entry.process}
                  disabled={entry.isSaved}
                  onChange={(e) =>
                    handleBOMChange(index, "process", e.target.value)
                  }
                  placeholder="Process"
                  className="border p-2 rounded w-full"
                />

                <input
                  type="number"
                  value={entry.cycleTime}
                  disabled={entry.isSaved}
                  onChange={(e) =>
                    handleBOMChange(index, "cycleTime", e.target.value)
                  }
                  placeholder="Cycle Time"
                  className="border p-2 rounded w-full"
                />

                <select
                  value={entry.workInstruction}
                  disabled={entry.isSaved}
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

              {entry.isSaved && (
                <div className="mt-2 text-right">
                  <button
                    type="button"
                    onClick={() => handleDeleteBOM(index)}
                    className="text-red-600 text-sm flex items-center gap-1"
                  >
                    <RiDeleteBin6Line size={16} /> Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={handleAddBOMRow}
              className="bg-blue-800 text-white px-4 py-2 rounded flex items-center gap-2"
            >
              <Plus size={16} /> Add More
            </button>
            <button
              type="button"
              onClick={handleSaveBOMs}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save BOM
            </button>
          </div>
        </div>
        {bomEntries.filter((row) => row.isSaved).length > 0 && (
          <div className="col-span-4 mt-4 bg-white p-6 rounded-2xl shadow-md">
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
                {bomEntries
                  .map((row, index) => ({ ...row, index }))
                  .filter((row) => row.isSaved)
                  .map((row) => (
                    <tr key={row.index} className="border-t text-center">
                      <td className="p-2">{row.process}</td>
                      <td className="p-2">{row.partNumber}</td>
                      <td className="p-2">{row.cycleTime}</td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDeleteBOM(row.index)}
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
  );
};

export default ProductNumber;
