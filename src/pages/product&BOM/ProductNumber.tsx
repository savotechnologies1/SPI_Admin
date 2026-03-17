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
  getProcessDetail,
  selectPartNamber,
  selectProcess,
} from "./https/partProductApis";
import { toast } from "react-toastify";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";

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
  processOrderRequired: boolean;
  instructionRequired: boolean;
  processId: string;
  processDesc?: string;
}

const ProductNumber = () => {
  const partContext = useContext(PartContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Part>();
  const processId = watch("processId");
  const [processData, setProcessData] = useState<any[]>([]);
  const [partData, setPartData] = useState<any[]>([]);
  const [bomEntries, setBomEntries] = useState<any[]>([
    {
      partNumber: "",
      qty: "",
      process: "",
      cycleTime: "",
      workInstruction: "",
      isSaved: false,
    },
  ]);

  const processOrderRequired = watch("processOrderRequired");
  const isProcessRequired = processOrderRequired === true || "true";
  const [suggestions, setSuggestions] = useState<{ [index: number]: string[] }>(
    {},
  );
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredSuppliers = suppliers.filter((s) =>
    s.companyName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await selectSupplier();
        setSuppliers(res);
      } catch (err) {
        throw err;
      }
    };
    fetchSuppliers();
  }, []);

  const { addPart } = partContext || {};
  const handleRemoveImage = (index: number) => {
    if (!selectedImages) return;

    const imageArray = Array.from(selectedImages);
    imageArray.splice(index, 1);

    const updatedFileList = new DataTransfer();
    imageArray.forEach((file) => updatedFileList.items.add(file));

    setSelectedImages(updatedFileList.files);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [processList] = await Promise.all([selectProcess()]);
        setProcessData(processList);
      } catch (error) {}
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProcessDetail = async () => {
      if (!processId) return setValue("processDesc", "");
      try {
        const res = await getProcessDetail(processId);
        setValue("processDesc", res.data?.processDesc || "");
      } catch (err) {
        setValue("processDesc", "");
        toast.error("Failed to fetch process description");
      }
    };
    fetchProcessDetail();
  }, [processId, setValue]);
  useEffect(() => {
    (async () => {
      try {
        const process = await selectProcess();
        const parts = await selectPartNamber();
        setProcessData(process);
        setPartData(parts?.data || []);
      } catch (err) {
        throw err;
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
    setBomEntries(updated);

    if (field === "partNumber") {
      const filtered = partData
        .filter((item) =>
          item.partNumber.toLowerCase().includes(value.toLowerCase()),
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
      updated[index].qty = partDetail.minStock?.toString() || "";

      setBomEntries(updated);
      setSuggestions((prev) => ({ ...prev, [index]: [] }));
    } catch (error) {
      throw error;
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
        workInstruction: "",
        isSaved: false,
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
      workInstruction: "",
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
    const hasUnsavedBOM = bomEntries.some(
      (entry) =>
        !entry.isSaved &&
        (entry.partNumber.trim() !== "" ||
          entry.qty !== "" ||
          entry.process !== ""),
    );
    if (hasUnsavedBOM) {
      toast.error(
        "Please save the BOM entries before adding the product number.",
      );
      return;
    }
    const savedBOMs = bomEntries.filter((entry) => entry.isSaved);
    if (savedBOMs.length === 0) {
      toast.error("At least one BOM entry must be saved.");
      return;
    }

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
      if (response?.status === 200) {
        navigate("/product-tree");
        toast.success("Product created successfully !");
      }

      if (addPart)
        addPart({
          partNumber: data.productNumber,
          partFamily: data.partFamily,
          productNumber: data.productNumber,
          description: data.partDescription,
          cost: data.cost,
          leadTime: data.leadTime,
          availableStock: String(data.availStock || 0),
          orderQty: data.supplierOrderQty || 0,
          cycleTime: data.cycleTime || 0,
        });
    } catch (err) {
      throw err;
    }
  };
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (selectedImages && selectedImages.length > 0) {
      const imageUrls = Array.from(selectedImages).map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewImages(imageUrls);

      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
      };
    } else {
      setPreviewImages([]);
    }
  }, [selectedImages]);

  useEffect(() => {
    if (!isProcessRequired) {
      setValue("processId", "");
      setValue("processDesc", "");
    }
  }, [isProcessRequired, setValue]);
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
        <NavLink to="/product-tree" className="hover:underline">
          <span>Product and BOM</span>
        </NavLink>
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
                {item.partFamily} ( {item.machineName})
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
            defaultValue={0}
            {...register("supplierOrderQty", {
              valueAsNumber: true,
            })}
            placeholder="Order Qty"
            className="border p-2 rounded w-full"
          />
          {errors.supplierOrderQty && (
            <p className="text-red-500 text-xs">
              {errors.supplierOrderQty.message}
            </p>
          )}
        </label>
        <div className="col-span-4 md:col-span-1 relative">
          <label className="block mb-1">Company Name</label>
          <input type="hidden" {...register("companyName")} />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search Supplier..."
            autoComplete="off"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
              if (e.target.value === "") setValue("companyName", "");
            }}
            onFocus={() => setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-brand focus:outline-none"
          />

          {showDropdown && searchTerm && filteredSuppliers.length > 0 && (
            <ul className="absolute z-[100] w-full bg-white border border-gray-300 rounded shadow-xl mt-1 max-h-40 overflow-y-auto">
              {filteredSuppliers.map((s) => (
                <li
                  key={s.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-0"
                  onMouseDown={() => {
                    setSearchTerm(s.companyName);
                    setValue("companyName", s.id);
                    setShowDropdown(false);
                  }}
                >
                  {s.companyName}
                </li>
              ))}
            </ul>
          )}

          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">Company is required</p>
          )}
        </div>
        <label className="col-span-4 md:col-span-1">
          Minimum Stock
          <input
            type="number"
            {...register("minStock", {
              valueAsNumber: true,
              required: "Minimum stock is required",
            })}
            placeholder="Minimum Stock"
            className="border p-2 rounded w-full"
          />
          {errors.minStock && (
            <p className="text-red-500 text-xs">{errors.minStock.message}</p>
          )}
        </label>
        <label className="col-span-4 md:col-span-1">
          Available Stock
          <input
            type="number"
            {...register("availStock", {
              valueAsNumber: true,
            })}
            placeholder="Available Stock"
            className="border p-2 rounded w-full"
          />
          {errors.availStock && (
            <p className="text-red-500 text-xs">{errors.availStock.message}</p>
          )}
        </label>
        <div className="col-span-4 md:col-span-1">
          <label>Cycle Time (minutes)</label>
          <div className="flex gap-2">
            <input
              {...register("cycleTime", {
                required: "Cycle time is required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Only positive integers are allowed",
                },
                validate: (value: any) =>
                  (value !== undefined &&
                    value !== null &&
                    String(value).trim() !== "") ||
                  "Cycle time is required",
              })}
              type="text"
              inputMode="numeric"
              placeholder="Enter time"
              onKeyDown={(e) => {
                if (["e", "E", "+", "-", ".", ","].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="border p-2 rounded w-full"
            />
          </div>
          {(errors.cycleTime || errors.cycleTime) && (
            <p className="text-red-500 text-sm">
              {errors.cycleTime?.message || errors.cycleTime?.message}
            </p>
          )}
        </div>
        <div className="col-span-4 md:col-span-1">
          <label>Process Order Required</label>
          <select
            {...register("processOrderRequired", {
              required: "Please select Yes or No",
            })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.processOrderRequired && (
            <p className="text-red-500 text-sm">
              {errors.processOrderRequired.message}
            </p>
          )}
        </div>
        {isProcessRequired && (
          <>
            <div className="col-span-4 md:col-span-1">
              <label>Process</label>
              <select
                {...register("processId", {
                  required: "Process is required",
                })}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Process</option>
                {processData.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ( {item.machineName})
                  </option>
                ))}
              </select>
              {errors.processId && (
                <p className="text-red-500 text-sm">
                  {errors.processId.message}
                </p>
              )}
            </div>
          </>
        )}
        <div className="col-span-4 md:col-span-1">
          <label>Work Instruction </label>
          <select
            {...register("instructionRequired", {
              required: "Please select Yes or No",
            })}
            className="border p-2 rounded w-full"
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.instructionRequired && (
            <p className="text-red-500 text-sm">
              {errors.instructionRequired.message}
            </p>
          )}
        </div>
        {previewImages.length > 0 && (
          <div className="col-span-4 flex gap-3 flex-wrap mt-2">
            {previewImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`preview-${idx}`}
                  className="w-24 h-24 object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
                >
                  ✕
                </button>
              </div>
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
                  <label className="text-sm font-medium">Part Number</label>
                  <input
                    type="text"
                    value={entry.partNumber}
                    disabled={entry.isSaved}
                    onChange={(e) =>
                      handleBOMChange(index, "partNumber", e.target.value)
                    }
                    className="border p-2 rounded w-full mt-1"
                    placeholder="Enter Part Number"
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

                <div>
                  <label className="text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    value={entry.qty}
                    disabled={entry.isSaved}
                    onChange={(e) =>
                      handleBOMChange(index, "qty", e.target.value)
                    }
                    placeholder="Enter Qty"
                    className="border p-2 rounded w-full mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Process</label>
                  <input
                    type="text"
                    value={entry.process}
                    disabled={entry.isSaved}
                    onChange={(e) =>
                      handleBOMChange(index, "process", e.target.value)
                    }
                    placeholder="Enter Process"
                    className="border p-2 rounded w-full mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Cycle Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={entry.cycleTime}
                    disabled={entry.isSaved}
                    onChange={(e) =>
                      handleBOMChange(index, "cycleTime", e.target.value)
                    }
                    placeholder="Enter Cycle Time"
                    className="border p-2 rounded w-full mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Work Instruction
                  </label>
                  <select
                    value={entry.workInstruction}
                    disabled={entry.isSaved}
                    onChange={(e) =>
                      handleBOMChange(index, "workInstruction", e.target.value)
                    }
                    className="border p-2 rounded w-full mt-1"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
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
            disabled={bomEntries.some((e) => !e.isSaved && e.partNumber !== "")}
            className={`mt-6 py-2 px-6 rounded ${
              bomEntries.some((e) => !e.isSaved && e.partNumber !== "")
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand text-white"
            }`}
          >
            Add Product Number
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductNumber;
