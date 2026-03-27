import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { customOrderValidation } from "../../utils/validation.tsx";
import { FaTrash } from "react-icons/fa";
import {
  CustomerInterface,
  ProductNumberInterface,
  PartNumberInterface,
  processInterface,
} from "./../../utils/Interfaces.tsx";
import {
  addCustomOrder,
  selectCustomer,
  selectProductNumber,
  selectPartNumber,
  selectProcess,
  getProductParts,
} from "./https/schedulingApis";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import DatePicker from "react-datepicker";
const initialProcess = { totalTime: "", processId: "", part: "" };

const generateNewOrderNumber = () => Date.now().toString();
interface BOMEntry {
  partNumber: string;
  partId?: string;
  qty: number | string;
  process: string;
  processId?: string;
  cycleTime: number | string;
  workInstruction?: string;
  instructionRequired?: string;
  isSaved: boolean;
}

const CustomOrderForm = () => {
  const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
  const [productList, setProductList] = useState<ProductNumberInterface[]>([]);
  const [partList, setPartList] = useState<PartNumberInterface[]>([]);
  const [processList, setProcessList] = useState<processInterface[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null,
  );
  const [singleUnitCost, setSingleUnitCost] = useState<number | null>(null);
  const [inventoryList, setInventoryList] = useState<any[]>([]);
  const [bomEntries, setBomEntries] = useState<BOMEntry[]>([
    {
      partNumber: "",
      qty: "",
      process: "",
      cycleTime: "",
      instructionRequired: "",
      isSaved: false,
    },
  ]);
  const [suggestions, setSuggestions] = useState<{
    [key: number]: PartNumberInterface[];
  }>({});
  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const getSystemLocalDate = () => {
    return new Date().toLocaleDateString("en-CA");
  };
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchPartNumber();
    fetchProcess();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await selectCustomer();
      setCustomerList(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error("Failed to fetch customers.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await selectProductNumber();
      setProductList(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error("Failed to fetch products.");
    }
  };

  const fetchPartNumber = async () => {
    try {
      const response = await selectPartNumber();
      setPartList(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error("Failed to fetch part numbers.");
    }
  };

  const fetchProcess = async () => {
    try {
      const response = await selectProcess();
      setProcessList(Array.isArray(response) ? response : []);
    } catch (error) {
      toast.error("Failed to fetch processes.");
    }
  };

  const navigate = useNavigate();
  const initialFormValues = {
    orderNumber: generateNewOrderNumber(),
    orderDate: getSystemLocalDate(),
    shipDate: "",
    customerId: "",
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    productId: "",
    part_id: "",
    cost: "",
    totalCost: "",
    productQuantity: "",
    newParts: [initialProcess],
  };

  const handleDeleteBOM = (index: number) => {
    const updated = bomEntries.filter((_, i) => i !== index);
    setBomEntries(updated);
  };

  const handleBOMChange = (
    index: number,
    field: keyof BOMEntry,
    value: any,
  ) => {
    const updatedBOM = [...bomEntries];
    updatedBOM[index] = { ...updatedBOM[index], [field]: value };
    setBomEntries(updatedBOM);

    if (field === "partNumber") {
      if (value.length > 0) {
        const filtered = partList.filter((p) =>
          p.partNumber.toLowerCase().includes(value.toLowerCase()),
        );
        setSuggestions((prev) => ({ ...prev, [index]: filtered }));
      } else {
        setSuggestions((prev) => ({ ...prev, [index]: [] }));
      }
    }
  };

  const handleSuggestionClick = (index: number, selectedPart: any) => {
    const updatedBOM = [...bomEntries];
    const pId = selectedPart.processId || selectedPart.process?.id || "";

    updatedBOM[index] = {
      ...updatedBOM[index],
      partNumber: selectedPart.partNumber,
      partId: selectedPart.part_id,
      processId: pId,
      cycleTime: selectedPart.cycleTime || "",
      qty: "1",
      instructionRequired: selectedPart.instructionRequired ? "Yes" : "No",
    };

    setBomEntries(updatedBOM);
    setSuggestions((prev) => ({ ...prev, [index]: [] }));
  };
  const handleDeleteInventoryItem = (index: number) => {
    const updatedList = inventoryList.filter((_, i) => i !== index);
    setInventoryList(updatedList);
  };

  const handleUpdateInventoryItem = (
    index: number,
    field: string,
    value: any,
  ) => {
    const updatedList = [...inventoryList];

    if (field === "processId") {
      const selectedProcess = processList.find((p) => p.id === value);
      updatedList[index].processId = value;
      updatedList[index].process = {
        ...updatedList[index].process,
        id: value,
        processName: selectedProcess?.name || "",
      };
    } else {
      updatedList[index][field] = value;
    }

    setInventoryList(updatedList);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      <div className="p-4 bg-white rounded-2xl border shadow-md">
        <Formik
          initialValues={initialFormValues}
          validationSchema={customOrderValidation}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const productParts = inventoryList.map((item) => ({
                partId: item.part_id,
                partNumber: item.partNumber,
                qty: item.qty,
                processId: item.processId || item.process?.id || "",
                totalTime: item.cycleTime,
                instructionRequired:
                  item.instructionRequired === "Yes" ||
                  item.instructionRequired === true,
              }));

              const manualParts = bomEntries
                .filter((item) => item.partId)
                .map((item) => ({
                  partId: item.partId,
                  partNumber: item.partNumber,
                  qty: item.qty,
                  processId: item.processId,
                  totalTime: item.cycleTime,
                  instructionRequired: item.instructionRequired === "Yes",
                }));

              const combinedBOM = [...productParts, ...manualParts];

              const finalData = {
                ...values,
                bomList: combinedBOM,
              };

              const res = await addCustomOrder(finalData);

              if (res && res.status === 201) {
                toast.success("Custom Order Created!");
                resetForm();
                setInventoryList([]);
                setBomEntries([
                  {
                    partNumber: "",
                    qty: "",
                    process: "",
                    cycleTime: "",
                    instructionRequired: "",
                    isSaved: false,
                  },
                ]);
                navigate("/custom-order-schedule");
              }
            } catch (error) {
              toast.error("Error creating order");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, setFieldValue, errors, touched, isSubmitting }) => {
            const handleCustomerSelectChange = (
              e: React.ChangeEvent<HTMLSelectElement>,
            ) => {
              const value = e.target.value;
              if (value === "new") {
                const tempId = crypto.randomUUID();
                setFieldValue("customerId", tempId);
                setSelectedCustomerId(null);
                setFieldValue("customerName", "");
                setFieldValue("customerEmail", "");
                setFieldValue("customerPhone", "");
              } else if (value) {
                const selected = customerList.find((c) => c.id === value);
                if (selected) {
                  setFieldValue("customerId", selected.id);
                  setSelectedCustomerId(selected.id);
                  setFieldValue("customerName", selected.name);
                  setFieldValue("customerEmail", selected.email);
                  setFieldValue("customerPhone", selected.customerPhone);
                }
              } else {
                setFieldValue("customerId", "");
                setSelectedCustomerId(null);
                setFieldValue("customerName", "");
                setFieldValue("customerEmail", "");
                setFieldValue("customerPhone", "");
              }
            };

            const handleProductSelectChange = async (
              e: React.ChangeEvent<HTMLSelectElement>,
            ) => {
              const selectedProductId = e.target.value;
              setFieldValue("productId", selectedProductId);

              if (selectedProductId) {
                const selected = productList.find(
                  (p) => p.productId === selectedProductId,
                );
                if (selected) {
                  setSingleUnitCost(selected.cost);
                  setFieldValue("cost", selected.cost.toFixed(2));
                  setFieldValue("productQuantity", 1);
                  setFieldValue("totalCost", selected.cost.toFixed(2));
                }

                try {
                  const partsData = await getProductParts(selectedProductId);
                  if (partsData && partsData.length > 0) {
                    const formattedParts = partsData.map((part: any) => ({
                      ...part,
                      processId: part.processId || part.process?.id || "",
                      qty: part.partQuantity || 1,
                      instructionRequired: part.instructionRequired
                        ? "Yes"
                        : "No",
                    }));
                    setInventoryList(formattedParts);
                  }
                } catch (error) {
                  console.error("Error fetching parts:", error);
                }
              } else {
                setInventoryList([]);
              }
            };
            const handleQuantityChange = (
              e: React.ChangeEvent<HTMLInputElement>,
            ) => {
              const quantityStr = e.target.value;
              setFieldValue("productQuantity", quantityStr);
              const newQuantity = Number(quantityStr);
              if (singleUnitCost !== null && newQuantity >= 1) {
                const totalCost = singleUnitCost * newQuantity;
                setFieldValue("totalCost", totalCost.toFixed(2));
              } else {
                setFieldValue("totalCost", "");
              }
            };

            return (
              <Form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6">
                  <div>
                    <label className="font-semibold">Order Number</label>
                    <Field
                      name="orderNumber"
                      type="text"
                      readOnly
                      className="border py-3 px-4 rounded-md w-full bg-gray-100 h-[50px] outline-none"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold mb-1">Order Date</label>
                    <div className="relative w-full">
                      <DatePicker
                        selected={
                          values.orderDate ? new Date(values.orderDate) : null
                        }
                        onChange={(date) =>
                          setFieldValue(
                            "orderDate",
                            date ? date.toLocaleDateString("en-CA") : "",
                          )
                        }
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/DD/YYYY"
                        wrapperClassName="w-full"
                        className="border py-3 px-4 rounded-md w-full placeholder-gray-600 outline-none h-[50px] border-gray-300"
                      />
                    </div>
                    <ErrorMessage
                      name="orderDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-semibold mb-1">Ship Date</label>
                    <div className="relative w-full">
                      <DatePicker
                        selected={
                          values.shipDate ? new Date(values.shipDate) : null
                        }
                        onChange={(date) =>
                          setFieldValue(
                            "shipDate",
                            date ? date.toLocaleDateString("en-CA") : "",
                          )
                        }
                        dateFormat="MM/dd/yyyy"
                        placeholderText="MM/DD/YYYY"
                        wrapperClassName="w-full"
                        className={`border py-3 px-4 rounded-md w-full placeholder-gray-600 outline-none h-[50px] ${
                          touched.shipDate && errors.shipDate
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="shipDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6">
                  <div>
                    <label className="font-semibold">Select Customer</label>
                    <select
                      name="customerId"
                      value={
                        customerList.some((c) => c.id === values.customerId)
                          ? values.customerId
                          : ""
                      }
                      onChange={handleCustomerSelectChange}
                      className={`border px-2 py-3 rounded-md w-full ${
                        touched.customerId && errors.customerId
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <option value="">Select a customer</option>
                      <option value="new">➕ Add New Customer</option>
                      {customerList.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="customerId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Customer Name</label>
                    <Field
                      name="customerName"
                      readOnly={selectedCustomerId !== null}
                      placeholder="Enter Customer Name"
                      className={`border py-3 px-4 rounded-md w-full ${
                        selectedCustomerId !== null ? "bg-gray-100" : ""
                      } ${
                        touched.customerName && errors.customerName
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="customerName"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Customer Email</label>
                    <Field
                      name="customerEmail"
                      type="email"
                      readOnly={selectedCustomerId !== null}
                      placeholder="Enter Customer Email"
                      className={`border py-3 px-4 rounded-md w-full ${
                        selectedCustomerId !== null ? "bg-gray-100" : ""
                      } ${
                        touched.customerEmail && errors.customerEmail
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="customerEmail"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Customer Phone</label>
                    <Field
                      name="customerPhone"
                      readOnly={selectedCustomerId !== null}
                      placeholder="Enter Customer Phone"
                      className={`border py-3 px-4 rounded-md w-full ${
                        selectedCustomerId !== null ? "bg-gray-100" : ""
                      } ${
                        touched.customerPhone && errors.customerPhone
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="customerPhone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
                  <div>
                    <label className="font-semibold">Product Number</label>
                    <select
                      name="productId"
                      value={values.productId}
                      onChange={handleProductSelectChange}
                      className={`border px-2 py-3 rounded-md w-full ${
                        touched.productId && errors.productId
                          ? "border-red-500"
                          : ""
                      }`}
                    >
                      <option value="">Select a product</option>
                      {productList.map((p) => (
                        <option key={p.productId} value={p.productId}>
                          {p.partNumber}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage
                      name="productId"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Unit Cost</label>
                    <p className="border py-3 px-4 rounded-md w-full bg-gray-100 min-h-[48px] flex items-center">
                      {singleUnitCost !== null
                        ? `$${singleUnitCost.toFixed(2)}`
                        : ""}
                    </p>
                  </div>
                  <div>
                    <label className="font-semibold">Product Quantity</label>
                    <Field
                      name="productQuantity"
                      type="number"
                      placeholder="Quantity"
                      onChange={handleQuantityChange}
                      min="1"
                      className={`border py-3 px-4 rounded-md w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                        touched.productQuantity && errors.productQuantity
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="productQuantity"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Total Cost</label>
                    <Field
                      name="totalCost"
                      readOnly
                      placeholder="Total Cost"
                      className="border py-3 px-4 rounded-md w-full bg-gray-100"
                    />
                    <ErrorMessage
                      name="totalCost"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="col-span-4 mt-6 px-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Assign Part Number
                  </h3>

                  {bomEntries.map((entry, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-50 border p-4 rounded-lg mb-4 shadow-sm relative"
                        ref={(el) => (inputRefs.current[index] = el)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-semibold text-blue-800">
                            Part #{index + 1}
                          </p>
                          <button
                            type="button"
                            onClick={() => handleDeleteBOM(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <RiDeleteBin6Line size={20} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                          <div className="relative">
                            <label className="text-sm font-medium text-gray-600">
                              Part Number
                            </label>
                            <input
                              type="text"
                              value={entry.partNumber}
                              onChange={(e) =>
                                handleBOMChange(
                                  index,
                                  "partNumber",
                                  e.target.value,
                                )
                              }
                              className="border p-2 rounded w-full mt-1"
                              placeholder="Search part..."
                            />

                            {suggestions[index]?.length > 0 && (
                              <ul className="absolute z-50 bg-white border rounded w-full max-h-48 overflow-y-auto shadow-xl mt-1">
                                {suggestions[index].map((part) => (
                                  <li
                                    key={part.part_id || (part as any).id}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm border-b"
                                    onClick={() =>
                                      handleSuggestionClick(index, part)
                                    }
                                  >
                                    <span className="font-bold">
                                      {part.partNumber}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Quantity
                            </label>
                            <input
                              type="number"
                              value={entry.qty}
                              onChange={(e) =>
                                handleBOMChange(index, "qty", e.target.value)
                              }
                              className="border p-2 rounded w-full mt-1"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Process
                            </label>
                            <select
                              value={entry.processId || ""}
                              onChange={(e) =>
                                handleBOMChange(
                                  index,
                                  "processId",
                                  e.target.value,
                                )
                              }
                              className="border p-2 rounded w-full mt-1 bg-white"
                            >
                              <option value="">Select Process</option>
                              {processList.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name} ({p.machineName})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Cycle Time
                            </label>
                            <input
                              type="number"
                              value={entry.cycleTime}
                              onChange={(e) =>
                                handleBOMChange(
                                  index,
                                  "cycleTime",
                                  e.target.value,
                                )
                              }
                              className="border p-2 rounded w-full mt-1"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Instruction
                            </label>
                            <select
                              value={entry.instructionRequired}
                              onChange={(e) =>
                                handleBOMChange(
                                  index,
                                  "instructionRequired",
                                  e.target.value,
                                )
                              }
                              className="border p-2 rounded w-full mt-1"
                            >
                              <option value="">Select</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-white px-6 mt-4">
                  <h3 className="text-lg font-semibold mb-2 border-b pb-2">
                    Order Processes
                  </h3>
                  <FieldArray name="newParts">
                    {({ push, remove }) => (
                      <div>
                        {values.newParts.map((_, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 p-4 border rounded-md relative"
                          >
                            <div className="md:col-span-1">
                              <label className="font-semibold">
                                Total Time (minutes)
                              </label>
                              <Field
                                name={`newParts[${index}].totalTime`}
                                min="1"
                                type="number"
                                placeholder="e.g., 65"
                                className="border py-3 px-4 rounded-md w-full"
                              />
                              <ErrorMessage
                                name={`newParts[${index}].totalTime`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="font-semibold">
                                Select Process
                              </label>
                              <Field
                                as="select"
                                name={`newParts[${index}].processId`}
                                className="border px-2 py-3 rounded-md w-full"
                              >
                                <option value="">Select Process</option>
                                {processList.map((p) => (
                                  <option key={p.id} value={p.id}>
                                    {p.name} ({p.machineName})
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name={`newParts[${index}].processId`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <label className="font-semibold">
                                Part Number
                              </label>
                              <Field
                                name={`newParts[${index}].part`}
                                type="text"
                                placeholder="Enter Part Number"
                                className="border py-3 px-4 rounded-md w-full"
                              />
                              <ErrorMessage
                                name={`newParts[${index}].part`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="md:col-span-1 flex justify-end items-start pt-2 h-full">
                              {values.newParts.length > 1 && (
                                <FaTrash
                                  onClick={() => remove(index)}
                                  className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
                                  title="Remove Process"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push(initialProcess)}
                          className="bg-brand text-white p-2 text-sm rounded-md px-4 py-2  hover:bg-blue-800"
                        >
                          + Add
                        </button>
                        <div className="mt-4 border rounded-lg overflow-hidden shadow-sm">
                          <div className="bg-gray-100 p-3 font-bold border-b flex justify-between items-center">
                            <span>Product Parts </span>
                          </div>
                          <table className="min-w-full bg-white text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left">
                                  Part Number
                                </th>
                                <th className="px-4 py-2 text-left w-24">
                                  Qty
                                </th>
                                <th className="px-4 py-2 text-left">Process</th>
                                <th className="px-4 py-2 text-left w-32">
                                  Cycle Time (min)
                                </th>
                                <th className="px-4 py-2 text-center">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {inventoryList.length > 0 ? (
                                inventoryList.map((item, idx) => (
                                  <tr
                                    key={idx}
                                    className="border-t hover:bg-gray-50"
                                  >
                                    <td className="px-4 py-2 font-medium">
                                      {item.partNumber}
                                    </td>

                                    <td className="px-4 py-2">
                                      <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) =>
                                          handleUpdateInventoryItem(
                                            idx,
                                            "qty",
                                            e.target.value,
                                          )
                                        }
                                        className="border rounded px-2 py-1 w-full focus:outline-blue-500"
                                      />
                                    </td>

                                    <td className="px-4 py-2">
                                      <select
                                        value={
                                          item.processId ||
                                          item.process?.id ||
                                          ""
                                        }
                                        onChange={(e) =>
                                          handleUpdateInventoryItem(
                                            idx,
                                            "processId",
                                            e.target.value,
                                          )
                                        }
                                        className="border rounded px-2 py-1 w-full focus:outline-blue-500 bg-white"
                                      >
                                        <option value="">Select Process</option>
                                        {processList.map((p) => (
                                          <option key={p.id} value={p.id}>
                                            {p.name || p.processName} (
                                            {p.machineName})
                                          </option>
                                        ))}
                                      </select>
                                    </td>

                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={item.cycleTime}
                                        onChange={(e) =>
                                          handleUpdateInventoryItem(
                                            idx,
                                            "cycleTime",
                                            e.target.value,
                                          )
                                        }
                                        className="border rounded px-2 py-1 w-full focus:outline-blue-500"
                                      />
                                    </td>

                                    <td className="px-4 py-2 text-center">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteInventoryItem(idx)
                                        }
                                        className="text-red-500 hover:text-red-700 p-1"
                                      >
                                        <RiDeleteBin6Line size={18} />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td
                                    colSpan={5}
                                    className="px-4 py-10 text-center text-gray-400 italic"
                                  >
                                    No components found. Please select a
                                    product.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>

                <div className="mt-6 p-6 border-t">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand text-white text-md hover:bg-blue-800 transition  rounded-md disabled:bg-gray-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Custom Order"}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default CustomOrderForm;
