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

// ========================================================================
// MOCK DATA & INTERFACES (Replace with your actual imports and API calls)
// ========================================================================

// --- Interfaces ---
interface CustomerInterface {
  id: string;
  name: string;
  email: string;
  customerPhone: string;
}
interface ProductNumberInterface {
  productId: string;
  partNumber: string;
  cost: number;
}
interface PartNumberInterface {
  part_id: string;
  partNumber: string;
}
interface processInterface {
  id: string;
  name: string;
}

const generateNewOrderNumber = () => Date.now().toString();

const initialProcess = { totalTime: "", processId: "", part: "" };

// const CustomOrderForm = () => {
//   const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
//   const [productList, setProductList] = useState<ProductNumberInterface[]>([]);
//   const [partList, setPartList] = useState<PartNumberInterface[]>([]);
//   const [processList, setProcessList] = useState<processInterface[]>([]);

//   const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
//     null
//   );

//   const [singleUnitCost, setSingleUnitCost] = useState<number | null>(null);

//   useEffect(() => {
//     fetchCustomers();
//     fetchProducts();
//     fetchPartNumber();
//     fetchProcess();
//   }, []);

//   const fetchCustomers = async () => {
//     try {
//       const response = await selectCustomer();
//       setCustomerList(response || []);
//     } catch (error) {
//       console.error("Error fetching customers:", error);
//       toast.error("Failed to fetch customers.");
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await selectProductNumber();
//       setProductList(response || []);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       toast.error("Failed to fetch products.");
//     }
//   };

//   const fetchPartNumber = async () => {
//     try {
//       const response = await selectPartNumber();
//       setPartList(response || []);
//     } catch (error) {
//       console.error("Error fetching part numbers:", error);
//       toast.error("Failed to fetch part numbers.");
//     }
//   };

//   const fetchProcess = async () => {
//     try {
//       const response = await selectProcess();
//       setProcessList(response || []);
//     } catch (error) {
//       console.error("Error fetching processes:", error);
//       toast.error("Failed to fetch processes.");
//     }
//   };

//   const navigate = useNavigate();
//   const initialFormValues = {
//     orderNumber: generateNewOrderNumber(),
//     orderDate: new Date().toISOString().split("T")[0],
//     shipDate: "",
//     customerId: "",
//     customerName: "",
//     customerEmail: "",
//     customerPhone: "",
//     productId: "",
//     part_id: "",
//     cost: "",
//     totalCost: "",
//     productQuantity: "",
//     newParts: [initialProcess],
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//       />
//       <div className="p-4 bg-white rounded-2xl border shadow-md">
//         <Formik
//           initialValues={initialFormValues}
//           validationSchema={customOrderValidation}
//           onSubmit={async (values, { setSubmitting, resetForm }) => {
//             try {
//               // Filter out empty process entries
//               const filteredParts = values.newParts.filter((p) => {
//                 return (
//                   (p.processId && p.processId !== "") ||
//                   (p.part && p.part.trim() !== "") ||
//                   (p.totalTime && Number(p.totalTime) > 0)
//                 );
//               });

//               const finalData = {
//                 ...values,
//                 newParts: filteredParts,
//               };

//               await addCustomOrder(finalData);

//               resetForm({
//                 values: {
//                   ...initialFormValues,
//                   orderNumber: generateNewOrderNumber(),
//                 },
//               });

//               navigate("/custom-order-schedule");
//               setSelectedCustomerId(null);
//               setSingleUnitCost(null);
//             } catch (error) {
//               console.error("Submission error:", error);
//             } finally {
//               setSubmitting(false);
//             }
//           }}
//         >
//           {({ values, setFieldValue, errors, touched, isSubmitting }) => {
//             const handleCustomerSelectChange = (
//               e: React.ChangeEvent<HTMLSelectElement>
//             ) => {
//               const value = e.target.value;
//               if (value === "new") {
//                 const tempId = crypto.randomUUID();
//                 setFieldValue("customerId", tempId);
//                 setSelectedCustomerId(null);
//                 setFieldValue("customerName", "");
//                 setFieldValue("customerEmail", "");
//                 setFieldValue("customerPhone", "");
//               } else if (value) {
//                 const selected = customerList.find((c) => c.id === value);
//                 if (selected) {
//                   setFieldValue("customerId", selected.id);
//                   setSelectedCustomerId(selected.id);
//                   setFieldValue("customerName", selected.name);
//                   setFieldValue("customerEmail", selected.email);
//                   setFieldValue("customerPhone", selected.customerPhone);
//                 }
//               } else {
//                 setFieldValue("customerId", "");
//                 setSelectedCustomerId(null);
//                 setFieldValue("customerName", "");
//                 setFieldValue("customerEmail", "");
//                 setFieldValue("customerPhone", "");
//               }
//             };

//             const handleProductSelectChange = (
//               e: React.ChangeEvent<HTMLSelectElement>
//             ) => {
//               const selectedProductId = e.target.value;
//               setFieldValue("productId", selectedProductId);
//               if (selectedProductId) {
//                 const selected = productList.find(
//                   (p) => p.productId === selectedProductId
//                 );
//                 if (selected) {
//                   const unitCost = selected.cost;
//                   const quantity = 1; // Default quantity to 1
//                   setSingleUnitCost(unitCost);
//                   setFieldValue("cost", unitCost.toFixed(2));
//                   setFieldValue("productQuantity", quantity);
//                   setFieldValue("totalCost", (unitCost * quantity).toFixed(2));
//                 }
//               } else {
//                 setSingleUnitCost(null);
//                 setFieldValue("cost", "");
//                 setFieldValue("productQuantity", "");
//                 setFieldValue("totalCost", "");
//               }
//             };

//             const handlePartSelectChange = (
//               e: React.ChangeEvent<HTMLSelectElement>
//             ) => {
//               setFieldValue("part_id", e.target.value);
//             };

//             const handleQuantityChange = (
//               e: React.ChangeEvent<HTMLInputElement>
//             ) => {
//               const quantityStr = e.target.value;
//               setFieldValue("productQuantity", quantityStr);
//               const newQuantity = Number(quantityStr);
//               if (singleUnitCost !== null && newQuantity >= 1) {
//                 const totalCost = singleUnitCost * newQuantity;
//                 setFieldValue("totalCost", totalCost.toFixed(2));
//               } else {
//                 setFieldValue("totalCost", "");
//               }
//             };

//             return (
//               <Form>
//                 {/* Order Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
//                   <div>
//                     <label className="font-semibold">Order Number</label>
//                     <Field
//                       name="orderNumber"
//                       type="text"
//                       readOnly
//                       className="border py-3 px-4 rounded-md w-full bg-gray-100"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Order Date</label>
//                     <Field
//                       name="orderDate"
//                       type="date"
//                       className="border py-3 px-4 rounded-md w-full"
//                     />
//                     <ErrorMessage
//                       name="orderDate"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Ship Date</label>
//                     <Field
//                       name="shipDate"
//                       type="date"
//                       className={`border py-3 px-4 rounded-md w-full ${
//                         touched.shipDate && errors.shipDate
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="shipDate"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 {/* Customer Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 bg-white px-6">
//                   <div>
//                     <label className="font-semibold">Select Customer</label>
//                     <select
//                       name="customerId"
//                       value={
//                         customerList.some((c) => c.id === values.customerId)
//                           ? values.customerId
//                           : ""
//                       }
//                       onChange={handleCustomerSelectChange}
//                       className={`border px-2 py-3 rounded-md w-full ${
//                         touched.customerId && errors.customerId
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     >
//                       <option value="">Select a customer</option>
//                       <option value="new">➕ Add New Customer</option>
//                       {customerList.map((c) => (
//                         <option key={c.id} value={c.id}>
//                           {c.name}
//                         </option>
//                       ))}
//                     </select>
//                     <ErrorMessage
//                       name="customerId"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Customer Name</label>
//                     <Field
//                       name="customerName"
//                       readOnly={selectedCustomerId !== null}
//                       placeholder="Enter Customer Name"
//                       className={`border py-3 px-4 rounded-md w-full ${
//                         selectedCustomerId !== null ? "bg-gray-100" : ""
//                       } ${
//                         touched.customerName && errors.customerName
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="customerName"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Customer Email</label>
//                     <Field
//                       name="customerEmail"
//                       type="email"
//                       readOnly={selectedCustomerId !== null}
//                       placeholder="Enter Customer Email"
//                       className={`border py-3 px-4 rounded-md w-full ${
//                         selectedCustomerId !== null ? "bg-gray-100" : ""
//                       } ${
//                         touched.customerEmail && errors.customerEmail
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="customerEmail"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Customer Phone</label>
//                     <Field
//                       name="customerPhone"
//                       readOnly={selectedCustomerId !== null}
//                       placeholder="Enter Customer Phone"
//                       className={`border py-3 px-4 rounded-md w-full ${
//                         selectedCustomerId !== null ? "bg-gray-100" : ""
//                       } ${
//                         touched.customerPhone && errors.customerPhone
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="customerPhone"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 {/* Product Details */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 bg-white px-6 ">
//                   <div>
//                     <label className="font-semibold">Product Number</label>
//                     <select
//                       name="productId"
//                       value={values.productId}
//                       onChange={handleProductSelectChange}
//                       className={`border px-2 py-3 rounded-md w-full ${
//                         touched.productId && errors.productId
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     >
//                       <option value="">Select a product</option>
//                       {productList.map((p) => (
//                         <option key={p.productId} value={p.productId}>
//                           {p.partNumber}
//                         </option>
//                       ))}
//                     </select>
//                     <ErrorMessage
//                       name="productId"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Unit Cost</label>
//                     <p className="border py-3 px-4 rounded-md w-full bg-gray-100 min-h-[48px] flex items-center">
//                       {singleUnitCost !== null
//                         ? `$${singleUnitCost.toFixed(2)}`
//                         : ""}
//                     </p>
//                   </div>
//                   <div>
//                     <label className="font-semibold">Product Quantity</label>
//                     <Field
//                       name="productQuantity"
//                       type="number"
//                       placeholder="Quantity"
//                       onChange={handleQuantityChange}
//                       min="1"
//                       className={`border py-3 px-4 rounded-md w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
//                         touched.productQuantity && errors.productQuantity
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     />
//                     <ErrorMessage
//                       name="productQuantity"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label className="font-semibold">Total Cost</label>
//                     <Field
//                       name="totalCost"
//                       readOnly
//                       placeholder="Total Cost"
//                       className="border py-3 px-4 rounded-md w-full bg-gray-100"
//                     />
//                     <ErrorMessage
//                       name="totalCost"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 {/* Part Number Field */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 bg-white px-6">
//                   <div className="col-span-1">
//                     <label className="font-semibold">
//                       {" "}
//                       Assign To Part Number
//                     </label>
//                     <select
//                       name="part_id"
//                       value={values.part_id}
//                       onChange={handlePartSelectChange}
//                       className={`border px-2 py-3 rounded-md w-full ${
//                         touched.part_id && errors.part_id
//                           ? "border-red-500"
//                           : ""
//                       }`}
//                     >
//                       <option value="">Select a part number</option>
//                       {partList.map((p) => (
//                         <option key={p.part_id} value={p.part_id}>
//                           {p.partNumber}
//                         </option>
//                       ))}
//                     </select>
//                     <ErrorMessage
//                       name="part_id"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>
//                 </div>

//                 {/* --- Process Details --- */}
//                 <div className="bg-white px-6 mt-4">
//                   <h3 className="text-lg font-semibold mb-2 border-b pb-2">
//                     Order Processes
//                   </h3>
//                   <FieldArray name="newParts">
//                     {({ push, remove }) => (
//                       <div>
//                         {values.newParts.map((_, index) => (
//                           <div
//                             key={index}
//                             className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4 p-4 border rounded-md relative"
//                           >
//                             <div className="md:col-span-1">
//                               <label className="font-semibold">
//                                 Total Time (minutes)
//                               </label>
//                               <Field
//                                 name={`newParts[${index}].totalTime`}
//                                 min="1"
//                                 type="number"
//                                 placeholder="e.g., 65"
//                                 className="border py-3 px-4 rounded-md w-full"
//                               />
//                               <ErrorMessage
//                                 name={`newParts[${index}].totalTime`}
//                                 component="div"
//                                 className="text-red-500 text-sm"
//                               />
//                             </div>
//                             <div className="md:col-span-1">
//                               <label className="font-semibold">
//                                 Select Process
//                               </label>
//                               <Field
//                                 as="select"
//                                 name={`newParts[${index}].processId`}
//                                 className="border px-2 py-3 rounded-md w-full"
//                               >
//                                 <option value="">Select Process</option>
//                                 {processList.map((p) => (
//                                   <option key={p.id} value={p.id}>
//                                     {p.name}
//                                   </option>
//                                 ))}
//                               </Field>
//                               <ErrorMessage
//                                 name={`newParts[${index}].processId`}
//                                 component="div"
//                                 className="text-red-500 text-sm"
//                               />
//                             </div>
//                             <div className="md:col-span-1">
//                               <label className="font-semibold">
//                                 Part Number
//                               </label>
//                               <Field
//                                 name={`newParts[${index}].part`}
//                                 type="text"
//                                 placeholder="Enter Part Number"
//                                 className="border py-3 px-4 rounded-md w-full"
//                               />
//                               <ErrorMessage
//                                 name={`newParts[${index}].part`}
//                                 component="div"
//                                 className="text-red-500 text-sm"
//                               />
//                             </div>
//                             <div className="md:col-span-1 flex justify-end items-start pt-2 h-full">
//                               {values.newParts.length > 1 && (
//                                 <FaTrash
//                                   onClick={() => remove(index)}
//                                   className="text-red-500 cursor-pointer hover:text-red-700 text-xl"
//                                   title="Remove Process"
//                                 />
//                               )}
//                             </div>
//                           </div>
//                         ))}
//                         <button
//                           type="button"
//                           onClick={() => push(initialProcess)}
//                           className="bg-brand text-white p-2 text-sm rounded-md hover:bg-blue-800"
//                         >
//                           + Add
//                         </button>
//                       </div>
//                     )}
//                   </FieldArray>
//                 </div>

//                 {/* Submit Button */}
//                 <div className="mt-6 p-6">
//                   <button
//                     type="submit"
//                     className="px-6 py-2 bg-brand text-white text-md font-semibold rounded-md hover:bg-green-700 transition disabled:bg-gray-400"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Creating..." : "Create Custom Order"}
//                   </button>
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </>
//   );
// };
import { RiDeleteBin6Line } from "react-icons/ri";
import { Plus } from "lucide-react";

interface BOMEntry {
  partNumber: string;
  qty: number | string;
  process: string;
  cycleTime: number | string;
  workInstruction: string;
  isSaved: boolean;
}

const CustomOrderForm = () => {
  const [customerList, setCustomerList] = useState<CustomerInterface[]>([]);
  const [productList, setProductList] = useState<ProductNumberInterface[]>([]);
  const [partList, setPartList] = useState<PartNumberInterface[]>([]);
  const [processList, setProcessList] = useState<processInterface[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
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

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchPartNumber();
    fetchProcess();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await selectCustomer();
      setCustomerList(response || []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers.");
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await selectProductNumber();
      setProductList(response || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  const fetchPartNumber = async () => {
    try {
      const response = await selectPartNumber();
      setPartList(response || []);
    } catch (error) {
      console.error("Error fetching part numbers:", error);
      toast.error("Failed to fetch part numbers.");
    }
  };

  const fetchProcess = async () => {
    try {
      const response = await selectProcess();
      setProcessList(response || []);
    } catch (error) {
      console.error("Error fetching processes:", error);
      toast.error("Failed to fetch processes.");
    }
  };

  const navigate = useNavigate();
  const initialFormValues = {
    orderNumber: generateNewOrderNumber(),
    orderDate: new Date().toISOString().split("T")[0],
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
  const handleAddBOMRow = () => {
    setBomEntries([
      ...bomEntries,
      {
        partNumber: "",
        qty: "",
        process: "",
        cycleTime: "",
        instructionRequired: "",
        isSaved: false,
      },
    ]);
  };

  const handleDeleteBOM = (index: number) => {
    const updated = bomEntries.filter((_, i) => i !== index);
    setBomEntries(updated);
  };

  // Handle inputs in BOM fields
  const handleBOMChange = (
    index: number,
    field: keyof BOMEntry,
    value: any
  ) => {
    const updatedBOM = [...bomEntries];
    updatedBOM[index] = { ...updatedBOM[index], [field]: value };
    setBomEntries(updatedBOM);

    if (field === "partNumber") {
      if (value.length > 0) {
        const filtered = partList.filter((p) =>
          p.partNumber.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions((prev) => ({ ...prev, [index]: filtered }));
      } else {
        setSuggestions((prev) => ({ ...prev, [index]: [] }));
      }
    }
  };
  const STATIC_PRODUCT_LIST = [
    { id: "P001", name: "Steel Plate - Grade A", category: "Raw Material", price: "$45.00" },
    { id: "P002", name: "Aluminum Rod 10mm", category: "Extrusion", price: "$12.50" },
    { id: "P003", name: "Copper Wire spool", category: "Electrical", price: "$85.00" },
    { id: "P004", name: "Bolts M8 x 50mm", category: "Fasteners", price: "$0.50" },
  ];
  const handleSuggestionClick = (index: number, selectedPart: any) => {
    const updatedBOM = [...bomEntries];

    // 1. Pehle API se aaya hua process name nikalen
    const apiProcessName = selectedPart.process?.processName;

    // 2. processList (jo aapne fetch ki hai) mein se wo process dhundein jiska naam match karta ho
    const matchingProcess = processList.find(
      (p) => p.name?.toLowerCase() === apiProcessName?.toLowerCase()
    );

    // 3. Agar match mil gaya to uski ID use karein, nahi to khaali chhodein
    const pId = matchingProcess ? matchingProcess.id : "";

    updatedBOM[index] = {
      ...updatedBOM[index],
      partNumber: selectedPart.partNumber,
      partId: selectedPart.part_id,
      processId: pId, // Ab yahan ID sahi jayegi to dropdown select ho jayega
      cycleTime: selectedPart.cycleTime || "",
      qty: "1",
      // Backend se false aa raha hai, hume "No" chahiye dropdown ke liye
      instructionRequired:
        selectedPart.instructionRequired === true ? "Yes" : "No",
    };

    setBomEntries(updatedBOM);
    setSuggestions((prev) => ({ ...prev, [index]: [] }));
  };

  const handleBOMProcessChange = (index: number, processId: string) => {
    const updatedBOM = [...bomEntries];
    updatedBOM[index] = { ...updatedBOM[index], processId: processId };
    setBomEntries(updatedBOM);
  };
  const handleSaveBOMs = () => {
    const updated = bomEntries.map((entry) => ({ ...entry, isSaved: true }));
    setBomEntries(updated);
    toast.success("BOM Entries Saved locally");
  };
  const handleDeleteInventoryItem = (index: number) => {
  // Confirm karein ki list update ho rahi hai
  const updatedList = inventoryList.filter((_, i) => i !== index);
  setInventoryList(updatedList);
  
  // Note: Agar aapne manually niche wale section (Assign Part Number) mein bhi same item rakha hai 
  // toh use delete karne ki zarurat nahi jab tak user khud na chahe.
};

  // 2. Update Function: Kisi bhi field (qty, cycleTime etc) ko update karne ke liye
  const handleUpdateInventoryItem = (index: number, field: string, value: any) => {
    const updatedList = [...inventoryList];

    // Agar nested object (process) update karna hai
    if (field === 'processName') {
      updatedList[index].process = { ...updatedList[index].process, processName: value };
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
          validationSchema={customOrderValidation} // Uncomment if you have validation
          // onSubmit={async (values, { setSubmitting, resetForm }) => {
          //   try {
          //     const formattedBOM = bomEntries
          //       .filter((item) => item.partId && item.partId !== "") // Sirf valid parts lein
          //       .map((item) => ({
          //         partId: item.partId,
          //         qty: item.qty,
          //         processId: item.processId,
          //         totalTime: item.cycleTime,
          //         // aur jo fields backend ko chahiye
          //       }));

          //     const finalData = {
          //       ...values,
          //       bomList: formattedBOM,
          //     };

          //     const res = await addCustomOrder(finalData);
          //     console.log("resresr1111111111111111111111es");
          //     resetForm({
          //       values: {
          //         ...initialFormValues,
          //         orderNumber: generateNewOrderNumber(),
          //       },
          //     });
          //     if (res.status === 201) {
          //       toast.success(res.data.message);

          //       navigate("/custom-order-schedule");
          //     }
          //     setSelectedCustomerId(null);
          //     setSingleUnitCost(null);
          //   } catch (error) {
          //     console.error("Submission error:", error);
          //   } finally {
          //     setSubmitting(false);
          //   }
          // }}


    onSubmit={async (values, { setSubmitting, resetForm }) => {
  try {
    // A. Table (inventoryList) mein jo items bache hain unhe map karein
    const productParts = inventoryList.map((item) => ({
      partId: item.part_id,
      partNumber: item.partNumber,
      qty: item.qty,
      processId: item.processId || item.process?.id || "",
      totalTime: item.cycleTime,
      instructionRequired: item.instructionRequired === "Yes" || item.instructionRequired === true,
    }));

    // B. Manual entries (Assign Part Number section) se valid data lein
    const manualParts = bomEntries
      .filter((item) => item.partId) // Sirf wo jisme part select kiya gaya ho
      .map((item) => ({
        partId: item.partId,
        partNumber: item.partNumber,
        qty: item.qty,
        processId: item.processId,
        totalTime: item.cycleTime,
        instructionRequired: item.instructionRequired === "Yes",
      }));

    // C. Dono ko combine karein (Ab is list mein deleted items nahi honge)
    const combinedBOM = [...productParts, ...manualParts];

    const finalData = {
      ...values,
      bomList: combinedBOM, // Backend ko filter ki hui final list jayegi
    };

    const res = await addCustomOrder(finalData);
    
    if (res.status === 201) {
      toast.success("Custom Order Created!");
      resetForm();
      setInventoryList([]); // Form clear hone par list reset
      setBomEntries([{ partNumber: "", qty: "", process: "", cycleTime: "", instructionRequired: "", isSaved: false }]);
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
              e: React.ChangeEvent<HTMLSelectElement>
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

            // const handleProductSelectChange = (
            //   e: React.ChangeEvent<HTMLSelectElement>
            // ) => {
            //   const selectedProductId = e.target.value;
            //   setFieldValue("productId", selectedProductId);
            //   if (selectedProductId) {
            //     const selected = productList.find(
            //       (p) => p.productId === selectedProductId
            //     );
            //     if (selected) {
            //       const unitCost = selected.cost;
            //       const quantity = 1; // Default quantity to 1
            //       setSingleUnitCost(unitCost);
            //       setFieldValue("cost", unitCost.toFixed(2));
            //       setFieldValue("productQuantity", quantity);
            //       setFieldValue("totalCost", (unitCost * quantity).toFixed(2));
            //     }
            //   } else {
            //     setSingleUnitCost(null);
            //     setFieldValue("cost", "");
            //     setFieldValue("productQuantity", "");
            //     setFieldValue("totalCost", "");
            //   }
            // };

         const handleProductSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  const selectedProductId = e.target.value;
  setFieldValue("productId", selectedProductId);

  if (selectedProductId) {
    // Existing Cost Logic...
    const selected = productList.find((p) => p.productId === selectedProductId);
    if (selected) {
       setSingleUnitCost(selected.cost);
       setFieldValue("cost", selected.cost.toFixed(2));
       setFieldValue("productQuantity", 1);
       setFieldValue("totalCost", selected.cost.toFixed(2));
    }

    try {
      const partsData = await getProductParts(selectedProductId);
      if (partsData && partsData.length > 0) {
        // Data format set karna taaki update aur delete smoothly chalein
        const formattedParts = partsData.map((part: any) => ({
          ...part,
          // Process ID ko top level par rakhna asaan hota hai update ke liye
          processId: part.process?.id || "", 
          instructionRequired: part.instructionRequired ? "Yes" : "No"
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
            const handlePartSelectChange = (
              e: React.ChangeEvent<HTMLSelectElement>
            ) => {
              setFieldValue("part_id", e.target.value);
            };

            const handleQuantityChange = (
              e: React.ChangeEvent<HTMLInputElement>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 ">
                  <div>
                    <label className="font-semibold">Order Number</label>
                    <Field
                      name="orderNumber"
                      type="text"
                      readOnly
                      className="border py-3 px-4 rounded-md w-full bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Order Date</label>
                    <Field
                      name="orderDate"
                      type="date"
                      className="border py-3 px-4 rounded-md w-full"
                    />
                    <ErrorMessage
                      name="orderDate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-semibold">Ship Date</label>
                    <Field
                      name="shipDate"
                      type="date"
                      className={`border py-3 px-4 rounded-md w-full ${touched.shipDate && errors.shipDate
                          ? "border-red-500"
                          : ""
                        }`}
                    />
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
                      className={`border px-2 py-3 rounded-md w-full ${touched.customerId && errors.customerId
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
                      className={`border py-3 px-4 rounded-md w-full ${selectedCustomerId !== null ? "bg-gray-100" : ""
                        } ${touched.customerName && errors.customerName
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
                      className={`border py-3 px-4 rounded-md w-full ${selectedCustomerId !== null ? "bg-gray-100" : ""
                        } ${touched.customerEmail && errors.customerEmail
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
                      className={`border py-3 px-4 rounded-md w-full ${selectedCustomerId !== null ? "bg-gray-100" : ""
                        } ${touched.customerPhone && errors.customerPhone
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
                      className={`border px-2 py-3 rounded-md w-full ${touched.productId && errors.productId
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
                      className={`border py-3 px-4 rounded-md w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${touched.productQuantity && errors.productQuantity
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

                {/* Inside your Formik return, find the Assign Part Number section */}
                <div className="col-span-4 mt-6 px-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
                    Assign Part Number
                  </h3>

                  {bomEntries.map((entry, index) => {
                    // 'entry' is defined STARTING HERE
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
                          {/* 1. Part Number Search */}
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
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded w-full mt-1"
                              placeholder="Search part..."
                            />

                            {/* Suggestions Dropdown */}
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

                          {/* 2. Quantity */}
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

                          {/* 3. Process Dropdown - Correctly linked to entry.processId */}
                          <div>
                            <label className="text-sm font-medium text-gray-600">
                              Process
                            </label>
                            <select
                              value={entry.processId || ""} // Yeh entry.processId se match karega
                              onChange={(e) =>
                                handleBOMChange(
                                  index,
                                  "processId",
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded w-full mt-1 bg-white"
                            >
                              <option value="">Select Process</option>
                              {processList.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* 4. Cycle Time */}
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
                                  e.target.value
                                )
                              }
                              className="border p-2 rounded w-full mt-1"
                            />
                          </div>

                          {/* 5. Instruction */}
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
                                  e.target.value
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
                    // 'entry' becomes undefined AFTER THIS LINE
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
                                    {p.name}
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
                            <span>Product Components (Editable)</span>
                            {/* <span className="text-xs font-normal text-gray-500">Changes here only affect this order</span> */}
                          </div>
                          <table className="min-w-full bg-white text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-2 text-left">Part Number</th>
                                <th className="px-4 py-2 text-left w-24">Qty</th>
                                <th className="px-4 py-2 text-left">Process</th>
                                <th className="px-4 py-2 text-left w-32">Cycle Time (min)</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {inventoryList.length > 0 ? (
                                inventoryList.map((item, idx) => (
                                  <tr key={idx} className="border-t hover:bg-gray-50">
                                    {/* Part Number - Read Only or Editable */}
                                    <td className="px-4 py-2 font-medium">
                                      {item.partNumber}
                                    </td>

                                    {/* Quantity - Editable */}
                                    <td className="px-4 py-2">
                                      <input
                                        type="number"
                                        value={item.qty}
                                        onChange={(e) => handleUpdateInventoryItem(idx, 'qty', e.target.value)}
                                        className="border rounded px-2 py-1 w-full focus:outline-blue-500"
                                      />
                                    </td>

                                    {/* Process Name - Editable */}
                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={item.process?.processName || ""}
                                        onChange={(e) => handleUpdateInventoryItem(idx, 'processName', e.target.value)}
                                        className="border rounded px-2 py-1 w-full focus:outline-blue-500"
                                      />
                                    </td>

                                    {/* Cycle Time - Editable */}
                                    <td className="px-4 py-2">
                                      <input
                                        type="text"
                                        value={item.cycleTime}
                                        onChange={(e) => handleUpdateInventoryItem(idx, 'cycleTime', e.target.value)}
                                        className="border rounded px-2 py-1 w-full focus:outline-blue-500"
                                      />
                                    </td>

                                    {/* Delete Action */}
                                    <td className="px-4 py-2 text-center">
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteInventoryItem(idx)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        title="Delete Row"
                                      >
                                        <RiDeleteBin6Line size={18} />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={5} className="px-4 py-10 text-center text-gray-400 italic">
                                    No components found. Please select a product.
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
