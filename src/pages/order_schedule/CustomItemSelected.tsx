import { useEffect, useState } from "react";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import bag from "../../assets/bag.png";
import img from "../../assets/stack_1.png";
import { toast } from "react-toastify";
import {
  scheduleCustomOrder,
  scheduleStockOrder,
} from "./https/schedulingApis";

type Item = {
  id: number;
  text: string;
  text1: string;
  text2: string;
  qty: number;
  inputQty: string;
  img: string;
  img1?: string;
};

// const CustomItemSelected = ({ items, isLoading }: CustomItemSelectedProps) => {
//   // State for the list of available items (left side)
//   const [availableItems, setAvailableItems] = useState<Item[]>([]);
//   // State for the items moved to the right side
//   const [selectedItems, setSelectedItems] = useState<Item[]>([]);

//   // Step 3: Use useEffect to update the local state whenever the 'items' prop changes
//   // This is crucial for syncing with new search results from the parent component.
//   useEffect(() => {
//     setAvailableItems([...items]); // Create a local, modifiable copy of the props
//   }, [items]);
//   console.log("availableItemsavailableItems", availableItems);

//   const addToSelected = (item: Item) => {
//     // Prevent duplicate entries
//     if (!selectedItems.find((i) => i.id === item.id)) {
//       setSelectedItems([...selectedItems, { ...item }]);
//     }
//   };

//   const removeItem = (index: number) => {
//     const updated = [...selectedItems];
//     updated.splice(index, 1);
//     setSelectedItems(updated);
//   };

//   const handleInputChange = (
//     index: number,
//     type: "inc" | "dec",
//     side: "left" | "right"
//   ) => {
//     const list = side === "right" ? [...selectedItems] : [...initialItems];
//     let qty = parseInt(list[index].inputQty) || 0;
//     if (type === "inc") qty++;
//     if (type === "dec" && qty > 0) qty--;
//     list[index].inputQty = qty.toString();
//     if (side === "right") setSelectedItems(list);
//   };

//   const handleSelectChange = (
//     index: number,
//     value: string,
//     side: "left" | "right"
//   ) => {
//     if (side === "right") {
//       const updated = [...selectedItems];
//       updated[index].text2 = value;
//       setSelectedItems(updated);
//     }
//   };

//   const renderItemCard = (
//     item: Item,
//     index: number,
//     side: "left" | "right"
//   ) => (
//     <div
//       key={item.id}
//       className="flex  items-center justify-between bg-white px-4 py-6 rounded-lg shadow-md"
//     >
//       {/* Image */}
//       <img src={item.img1} alt="bag" className="w-12 h-12 rounded" />

//       {/* Text Info */}
//       <div className="flex-1 px-4">
//         <p className=" text-sm 2xl:text-base font-bold">{item.text}</p>
//         <div className="flex items-center text-xs text-gray-600 mt-1 space-x-2">
//           <span>{item.text1}</span>
//           <span className="text-gray-400">|</span>
//           <select
//             className="border border-gray-300 rounded px-2 py-1 text-xs"
//             value={item.text2}
//             onChange={(e) => handleSelectChange(index, e.target.value, side)}
//           >
//             <option value="Thermoforming1">Thermoforming1</option>
//             <option value="Cutting1">Cutting1</option>
//             <option value="Assembly1">Assembly1</option>
//           </select>
//         </div>
//       </div>
//       <div className="space-y-2">
//         {/* Quantity Controls */}
//         <div className="flex  items-center space-x-2 border rounded-md ">
//           <button
//             className=" px-2 py-1 rounded text-sm"
//             onClick={() => handleInputChange(index, "dec", side)}
//           >
//             -
//           </button>
//           <span className="w-6 text-center text-sm">{item.inputQty}</span>
//           <button
//             className=" px-2 py-1 rounded text-sm"
//             onClick={() => handleInputChange(index, "inc", side)}
//           >
//             +
//           </button>
//         </div>

//         {/* Available Qty */}
//         <div className="text-xs text-gray-500 px-4 whitespace-nowrap">
//           Available: {item.qty}
//         </div>
//       </div>

//       {/* Icon */}
//       <div className="text-blue-500 hover:text-blue-600 cursor-pointer ml-2">
//         {side === "right" ? (
//           <FaTrashAlt
//             className="text-red-500   bg-red-100"
//             size={16}
//             onClick={() => removeItem(index)}
//           />
//         ) : (
//           <FaCartPlus
//             size={16}
//             onClick={() => addToSelected(item)}
//             title="Add to Selected"
//           />
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4">
//       {/* Left Column - All Items */}
//       <div>
//         <h2 className="font-semibold mb-4">
//           Custom orders avaiable to be scheduled
//         </h2>
//         <div className="space-y-4">
//           {initialItems.map((item, index) =>
//             renderItemCard(item, index, "left")
//           )}
//         </div>
//       </div>

//       {/* Right Column - Selected Items */}
//       <div>
//         <h2 className="font-semibold mb-4">
//           Custom orders selected to be scheduled
//         </h2>
//         {selectedItems.length === 0 ? (
//           <p className="text-gray-500 text-sm">No items selected.</p>
//         ) : (
//           <div className="space-y-4">
//             {selectedItems.map((item, index) =>
//               renderItemCard(item, index, "right")
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomItemSelected;

// const CustomItemSelected = ({ items, isLoading }: CustomItemSelectedProps) => {
//   const [availableItems, setAvailableItems] = useState<Item[]>([]);
//   const [selectedItems, setSelectedItems] = useState<Item[]>([]);

//   useEffect(() => {
//     // This correctly syncs the component's state with new props
//     // We also need to filter out items that have already been selected
//     const newAvailableItems = items.filter(
//       (item) => !selectedItems.find((selected) => selected.id === item.id)
//     );
//     setAvailableItems(newAvailableItems);
//   }, [items]); // This dependency array is correct

//   const addToSelected = (item: Item, index: number) => {
//     // Add the item to the right side
//     if (!selectedItems.find((i) => i.id === item.id)) {
//       setSelectedItems([...selectedItems, { ...item }]);
//     }
//     // Remove the item from the left side
//     const updatedAvailable = [...availableItems];
//     updatedAvailable.splice(index, 1);
//     setAvailableItems(updatedAvailable);
//   };

//   const removeItem = (itemToRemove: Item, index: number) => {
//     // Remove from the right side
//     const updatedSelected = [...selectedItems];
//     updatedSelected.splice(index, 1);
//     setSelectedItems(updatedSelected);

//     // Add it back to the left side (if it originated from the initial props)
//     if (items.find((i) => i.id === itemToRemove.id)) {
//       setAvailableItems([...availableItems, { ...itemToRemove }]);
//     }
//   };

//   const handleInputChange = (
//     index: number,
//     type: "inc" | "dec",
//     side: "left" | "right"
//   ) => {
//     // CHANGE 2: Fixed bug. It should modify `availableItems` state, not a stale copy.
//     const list = side === "right" ? [...selectedItems] : [...availableItems];
//     let currentInputQty = parseInt(list[index].inputQty) || 0;
//     const maxQty = list[index].qty; // Get the max available quantity

//     if (type === "inc" && currentInputQty < maxQty) {
//       currentInputQty++;
//     }
//     if (type === "dec" && currentInputQty > 1) {
//       // Typically you don't want to go below 1
//       currentInputQty--;
//     }

//     list[index].inputQty = currentInputQty.toString();

//     // Update the correct state
//     if (side === "right") {
//       setSelectedItems(list);
//     } else {
//       setAvailableItems(list); // This part was missing
//     }
//   };

//   const handleSelectChange = (
//     index: number,
//     value: string,
//     side: "left" | "right"
//   ) => {
//     const list = side === "right" ? [...selectedItems] : [...availableItems];
//     list[index].text2 = value;

//     if (side === "right") {
//       setSelectedItems(list);
//     } else {
//       setAvailableItems(list);
//     }
//   };
//   console.log("3222222222222", availableItems);

//   const renderItemCard = (
//     item: Item,
//     index: number,
//     side: "left" | "right"
//   ) => (
//     <div
//       key={item.id} // Use the unique string ID as the key
//       className="flex items-center justify-between bg-white px-4 py-6 rounded-lg shadow-md"
//     >
//       <img src={item.img1} alt="Product" className="w-12 h-12 rounded" />
//       <div className="flex-1 px-4">
//         <p className="text-sm 2xl:text-base font-bold">{item.orderNumber}</p>
//         <div className="flex items-center text-xs text-gray-600 mt-1 space-x-2">
//           <span>{item.text1}</span>
//           <span className="text-gray-400">|</span>
//           <select
//             className="border border-gray-300 rounded px-2 py-1 text-xs"
//             value={item.text2}
//             onChange={(e) => handleSelectChange(index, e.target.value, side)}
//           >
//             <option value="Thermoforming1">Thermoforming1</option>
//             <option value="Cutting1">Cutting1</option>
//             <option value="Assembly1">Assembly1</option>
//           </select>
//         </div>
//       </div>
//       <div className="space-y-2 text-center">
//         <div className="flex items-center space-x-2 border rounded-md">
//           <button
//             className="px-2 py-1 rounded text-sm"
//             onClick={() => handleInputChange(index, "dec", side)}
//           >
//             -
//           </button>
//           <span className="w-6 text-center text-sm">{item.inputQty}</span>
//           <button
//             className="px-2 py-1 rounded text-sm"
//             onClick={() => handleInputChange(index, "inc", side)}
//           >
//             +
//           </button>
//         </div>
//         <div className="text-xs text-gray-500 whitespace-nowrap">
//           Available: {item.qty}
//         </div>
//       </div>
//       <div className="text-blue-500 hover:text-blue-600 cursor-pointer ml-4">
//         {side === "right" ? (
//           <FaTrashAlt
//             className="text-red-500"
//             size={20}
//             onClick={() => removeItem(item, index)}
//           />
//         ) : (
//           <FaCartPlus
//             size={20}
//             onClick={() => addToSelected(item, index)}
//             title="Add to Selected"
//           />
//         )}
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="text-center p-10">
//         <p>Loading available orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4">
//       {/* Left Column - Available Items */}
//       <div>
//         <h2 className="font-semibold mb-4">
//           Custom orders available to be scheduled
//         </h2>
//         {availableItems.length === 0 ? (
//           <p className="text-gray-500 text-sm">No more items available.</p>
//         ) : (
//           <div className="space-y-4">
//             {/* CHANGE 3: Render from `availableItems` state, not the old hardcoded array */}
//             {availableItems.map((item, index) =>
//               renderItemCard(item, index, "left")
//             )}
//           </div>
//         )}
//       </div>

//       {/* Right Column - Selected Items */}
//       <div>
//         <h2 className="font-semibold mb-4">
//           Custom orders selected to be scheduled
//         </h2>
//         {selectedItems.length === 0 ? (
//           <p className="text-gray-500 text-sm">No items selected.</p>
//         ) : (
//           <div className="space-y-4">
//             {selectedItems.map((item, index) =>
//               renderItemCard(item, index, "right")
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CustomItemSelected;

// --- 1. Define TypeScript interfaces to match your API response ---

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
  // Add other part properties if needed
}

interface ProcessDetail {
  id: number;
  process: string; // This looks like an ID, e.g., "f2f45b"
  assignTo: string;
  totalTime: number;
  customOrderId: string;
}

// This is the main object from your API data array
interface CustomOrder {
  id: string;
  orderNumber: string;
  orderDate: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null; // Part can be null, which is important to handle
  processDetails: ProcessDetail[];
  // Add other properties from your API as needed
}

// This interface extends the API object with UI-specific state
interface SchedulableCustomOrder extends CustomOrder {
  scheduledQty: number;
  selectedProcessId: string; // To store the value from the process dropdown
}

interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}

// --- Interfaces for your API data ---
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
}

interface ProcessDetail {
  id: number;
  process: string;
}

interface CustomOrder {
  id: string;
  orderNumber: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null;
  processDetails: ProcessDetail[];
}

// --- Interface for the object used by the UI State ---
// This combines API data with UI-specific fields like inputQty
interface ItemForUI {
  id: string;
  img1: string; // For the left-side card UI
  orderNumber: string;
  text1: string;
  text2: string; // Selected process
  qty: number; // Max available quantity
  inputQty: string; // Quantity to schedule, as a string for the input
  allProcesses: ProcessDetail[]; // To populate the dropdown
  originalData: CustomOrder; // Keep the original data for the right-side table
}

interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}

// --- KEY CHANGE 1: Interfaces updated to match your latest API response ---
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
}

// This now matches the structure in your data
interface ProcessDetail {
  id: number;
  process: string;
  assignTo: string; // This is the sub-part number
  totalTime: number;
  customOrderId: string;
}

interface CustomOrder {
  id: string;
  orderNumber: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null; // The main part, can be null
  processDetails: ProcessDetail[]; // The list of sub-parts/processes
}

// This "View Model" interface remains the same, as it serves the UI well
interface ItemForUI {
  id: string;
  img1: string;
  orderNumber: string;
  text1: string;
  text2: string; // Selected process
  qty: number;
  inputQty: string;
  allProcesses: ProcessDetail[];
  originalData: CustomOrder; // Contains the rich data for the right-side table
}

interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}

// const CustomItemSelected = ({ items, isLoading }: CustomItemSelectedProps) => {
//   const [availableItems, setAvailableItems] = useState<ItemForUI[]>([]);
//   const [selectedItems, setSelectedItems] = useState<ItemForUI[]>([]);

//   useEffect(() => {
//     if (!items) return;

//     // Transform API data to the ItemForUI structure for the left-side cards
//     const transformedItems = items.map((apiItem) => ({
//       id: apiItem.id,
//       img1: "https://via.placeholder.com/150",
//       orderNumber: apiItem.orderNumber,
//       text1: apiItem.part?.partDescription || "Custom Assembly",
//       text2: apiItem.processDetails[0]?.process || "",
//       qty: apiItem.productQuantity,
//       inputQty: "1",
//       allProcesses: apiItem.processDetails,
//       originalData: apiItem,
//     }));

//     const newAvailable = transformedItems.filter(
//       (item) => !selectedItems.some((selected) => selected.id === item.id)
//     );
//     setAvailableItems(newAvailable);
//   }, [items]);

//   const addToSelected = (item: ItemForUI) => {
//     const qtyToSchedule = parseInt(item.inputQty, 10);
//     if (isNaN(qtyToSchedule) || qtyToSchedule <= 0) {
//       toast.error("Please enter a valid quantity.");
//       return;
//     }
//     if (qtyToSchedule > item.qty) {
//       toast.warn(`Cannot schedule more than the available ${item.qty}.`);
//       return;
//     }

//     setSelectedItems((prev) => [...prev, item]);
//     setAvailableItems((prev) => prev.filter((i) => i.id !== item.id));
//   };

//   const removeItem = (itemToRemove: ItemForUI) => {
//     setSelectedItems((prev) => prev.filter((i) => i.id !== itemToRemove.id));
//     setAvailableItems((prev) => [...prev, itemToRemove]);
//   };

//   const handleItemChange = (
//     index: number,
//     field: "inputQty" | "text2",
//     value: string,
//     side: "left" | "right"
//   ) => {
//     const list = side === "right" ? [...selectedItems] : [...availableItems];
//     const itemToUpdate = { ...list[index] };

//     if (field === "inputQty") {
//       const currentInputQty = parseInt(value, 10);
//       const maxQty = itemToUpdate.qty;
//       if (!isNaN(currentInputQty)) {
//         itemToUpdate.inputQty = Math.max(
//           1,
//           Math.min(currentInputQty, maxQty)
//         ).toString();
//       }
//     } else {
//       itemToUpdate.text2 = value;
//     }

//     list[index] = itemToUpdate;

//     if (side === "right") setSelectedItems(list);
//     else setAvailableItems(list);
//   };

//   // --- UI RENDERING ---

//   // Left-side card renderer - NO CHANGES
//   const renderAvailableItemCard = (item: ItemForUI, index: number) => (
//     <div
//       key={item.id}
//       className="flex items-center justify-between bg-white px-4 py-6 rounded-lg shadow-md"
//     >
//       <img src={item.img1} alt="Product" className="w-12 h-12 rounded" />
//       <div className="flex-1 px-4">
//         <p className="text-sm 2xl:text-base font-bold">{item.orderNumber}</p>
//         <div className="flex items-center text-xs text-gray-600 mt-1 space-x-2">
//           <span>{item.text1}</span>
//           <span className="text-gray-400">|</span>
//           <select
//             className="border border-gray-300 rounded px-2 py-1 text-xs"
//             value={item.text2}
//             onChange={(e) =>
//               handleItemChange(index, "text2", e.target.value, "left")
//             }
//           >
//             {item.allProcesses.length > 0 ? (
//               item.allProcesses.map((p) => (
//                 <option key={p.id} value={p.process}>
//                   {p.process}
//                 </option>
//               ))
//             ) : (
//               <option value="">No Process</option>
//             )}
//           </select>
//         </div>
//       </div>
//       <div className="space-y-2 text-center">
//         <div className="flex items-center space-x-2 border rounded-md">
//           <button
//             className="px-2 py-1"
//             onClick={() =>
//               handleItemChange(
//                 index,
//                 "inputQty",
//                 (parseInt(item.inputQty) - 1).toString(),
//                 "left"
//               )
//             }
//           >
//             -
//           </button>
//           <span className="w-6 text-center text-sm">{item.inputQty}</span>
//           <button
//             className="px-2 py-1"
//             onClick={() =>
//               handleItemChange(
//                 index,
//                 "inputQty",
//                 (parseInt(item.inputQty) + 1).toString(),
//                 "left"
//               )
//             }
//           >
//             +
//           </button>
//         </div>
//         <div className="text-xs text-gray-500 whitespace-nowrap">
//           Available: {item.qty}
//         </div>
//       </div>
//       <div className="text-blue-500 hover:text-blue-600 cursor-pointer ml-4">
//         <FaCartPlus
//           size={20}
//           onClick={() => addToSelected(item)}
//           title="Add to Selected"
//         />
//       </div>
//     </div>
//   );

//   if (isLoading) {
//     return (
//       <div className="text-center p-10">
//         <p>Loading available orders...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4">
//       {/* Left Column - Available Items */}
//       <div>
//         <h2 className="font-semibold mb-4 bg-[#CBCBCB] text-center p-2 rounded-md">
//           Custom orders available to be scheduled
//         </h2>
//         <div className="space-y-4">
//           {availableItems.length === 0 ? (
//             <p className="text-center text-gray-500 p-4 bg-white rounded-xl shadow">
//               No items available to schedule.
//             </p>
//           ) : (
//             availableItems.map((item, index) =>
//               renderAvailableItemCard(item, index)
//             )
//           )}
//         </div>
//       </div>

//       {/* Right Column - Selected Items */}
//       <div>
//         <h2 className="font-semibold mb-4 bg-[#CBCBCB] text-center p-2 rounded-md">
//           Custom orders selected to be scheduled
//         </h2>
//         <div className="space-y-4">
//           {selectedItems.length === 0 ? (
//             <p className="text-center text-gray-500 p-4 bg-white rounded-xl shadow">
//               No items selected yet.
//             </p>
//           ) : (
//             selectedItems.map((item) => (
//               // --- KEY CHANGE 2: Right side now renders a detailed table ---
//               <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <p className="font-semibold">{item.orderNumber}</p>
//                     <p className="text-sm text-gray-500">
//                       {item.originalData.customer.firstName}{" "}
//                       {item.originalData.customer.lastName}
//                     </p>
//                   </div>
//                   <button
//                     className="p-3 bg-red-100 rounded-full cursor-pointer hover:bg-red-200"
//                     onClick={() => removeItem(item)}
//                     title="Remove from Schedule"
//                   >
//                     <FaTrashAlt className="text-red-500" />
//                   </button>
//                 </div>

//                 <div className="overflow-x-auto border rounded-md">
//                   <table className="min-w-full text-sm text-left">
//                     <thead className="bg-gray-200">
//                       <tr>
//                         <th className="px-4 py-2 font-medium text-gray-700">
//                           Part / Component
//                         </th>
//                         <th className="px-4 py-2 font-medium text-gray-700">
//                           Description / Process
//                         </th>
//                         <th className="px-4 py-2 font-medium text-gray-700">
//                           Scheduled Qty
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {/* Row for the main part, if it exists */}
//                       {item.originalData.part && (
//                         <tr className="bg-gray-100 font-semibold border-b">
//                           <td className="px-4 py-2">
//                             {item.originalData.part.partNumber}
//                           </td>
//                           <td className="px-4 py-2">
//                             {} {item.originalData.part.partDescription}
//                           </td>
//                           <td className="px-4 py-2 font-medium">
//                             {(item.originalData.productQuantity || 0) *
//                               (item.originalData.part.minStock || 0)}
//                           </td>
//                         </tr>
//                       )}

//                       {/* Rows for each sub-part from processDetails */}
//                       {item.originalData.processDetails.map((process) => (
//                         <tr
//                           key={process.id}
//                           className="border-b hover:bg-gray-50"
//                         >
//                           <td className="px-4 py-2">{process.assignTo}</td>
//                           <td className="px-4 py-2">
//                             Process: {process.process}
//                           </td>
//                           <td className="px-4 py-2">{item.inputQty}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomItemSelected;

// Interfaces remain the same as they correctly model your data
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}
interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
}
interface ProcessDetail {
  id: number;
  process: string;
  assignTo: string;
  totalTime: number;
  customOrderId: string;
}
interface CustomOrder {
  id: string;
  orderNumber: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null;
  processDetails: ProcessDetail[];
}
interface ItemForUI {
  id: string;
  img1: string;
  orderNumber: string;
  text1: string;
  text2: string;
  qty: number;
  inputQty: string;
  allProcesses: ProcessDetail[];
  originalData: CustomOrder;
}
interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}
// ============================================================================
// 1. TYPE DEFINITIONS (Interfaces for your data)
// ============================================================================

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
}

interface ProcessDetail {
  id: number;
  process: string;
  assignTo: string;
  totalTime: number;
  customOrderId: string;
}

interface CustomOrder {
  id: string;
  orderNumber: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null;
  processDetails: ProcessDetail[];
}

// This interface is a "View Model" that adapts the API data for the UI
interface ItemForUI {
  id: string;
  img1: string;
  orderNumber: string;
  text1: string;
  text2: string; // Represents the selected process
  qty: number; // The maximum available quantity
  inputQty: string; // The quantity selected by the user in the input
  allProcesses: ProcessDetail[];
  originalData: CustomOrder; // Keep a reference to the original API object
}

// Props for the component
interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}

// ============================================================================
// 2. REACT COMPONENT
// ============================================================================

// ============================================================================
// 1. TYPE DEFINITIONS (Interfaces for your data)
// ============================================================================

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
}

interface ProcessDetail {
  id: number;
  process: string;
  assignTo: string;
  totalTime: number;
  customOrderId: string;
}

interface CustomOrder {
  id: string;
  orderNumber: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null;
  processDetails: ProcessDetail[];
}

interface ItemForUI {
  id: string;
  img1: string;
  orderNumber: string;
  text1: string;
  text2: string;
  qty: number;
  inputQty: string;
  allProcesses: ProcessDetail[];
  originalData: CustomOrder;
}

interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}

// ============================================================================
// 1. TYPES / INTERFACES (processDetails se judi cheezein hata di gayi hain)
// ============================================================================

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string | null;
  type: string;
  cost: number;
  quantityRequired: number;
  isParent: boolean;
  // ... baaki zaroori properties
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  // ... baaki properties
}

interface ApiItem {
  id: string;
  orderNumber: string;
  orderDate: string;
  shipDate: string;
  customer: Customer;
  productQuantity: number;
  productFamily: Part[];
  // processDetails yahan se hata diya gaya hai
}

interface ItemForUI {
  id: string;
  img1: string;
  orderNumber: string;
  text1: string; // Description
  qty: number; // Order Quantity
  originalData: ApiItem;
  // allProcesses aur text2 yahan se hata diye gaye hain
}

interface CustomItemSelectedProps {
  items: ApiItem[];
  isLoading: boolean;
}

// import { scheduleCustomOrder } from './api';

// ============================================================================
// 1. TYPES / INTERFACES (processDetails se judi cheezein hata di gayi hain)
// ============================================================================

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string | null;
  type: string;
  cost: number;
  quantityRequired: number;
  isParent: boolean;
  // ... baaki zaroori properties
}

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  // ... baaki properties
}

interface ApiItem {
  id: string;
  orderNumber: string;
  orderDate: string;
  shipDate: string;
  customer: Customer;
  productQuantity: number;
  productFamily: Part[];
  // processDetails yahan se hata diya gaya hai
}

interface ItemForUI {
  id: string;
  img1: string;
  orderNumber: string;
  text1: string; // Description
  qty: number; // Order Quantity
  originalData: ApiItem;
  // allProcesses aur text2 yahan se hata diye gaye hain
}

interface CustomItemSelectedProps {
  items: ApiItem[];
  isLoading: boolean;
}

const CustomItemSelected = ({ items, isLoading }: CustomItemSelectedProps) => {
  const [availableItems, setAvailableItems] = useState<ItemForUI[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemForUI[]>([]);
  let processName;
  useEffect(() => {
    if (!items) return;

    setAvailableItems((prevAvailableItems) => {
      const prevItemsMap = new Map(
        prevAvailableItems.map((item) => [item.id, item])
      );

      const newTransformedItems = items.map((apiItem) => {
        const existingItem = prevItemsMap.get(apiItem.id);
        const mainProduct =
          apiItem.productFamily?.find((p) => p.isParent) ||
          apiItem.productFamily?.[0];
        processName =
          mainProduct?.process?.processName || "No Process Specified";
        console.log("processNameprocessName", processName);

        // --- YAHAN BADLAV KIYA GAYA HAI ---
        // processDetails se juda logic (allProcesses, text2) hata diya gaya hai
        return {
          id: apiItem.id,
          img1: "https://via.placeholder.com/150",
          orderNumber: apiItem.orderNumber,
          text1: mainProduct?.partDescription || "Custom Assembly",
          qty: apiItem.productQuantity,
          originalData: apiItem,
          processName: processName,
        };
      });
      return newTransformedItems;
    });
  }, [items]);

  // `addToSelected` aur `removeItem` mein koi badlav ki zaroorat nahi hai
  const addToSelected = (itemToAdd: ItemForUI) => {
    const existingItemIndex = selectedItems.findIndex(
      (item) => item.id === itemToAdd.id
    );
    if (existingItemIndex > -1) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[existingItemIndex] = itemToAdd;
      setSelectedItems(updatedSelectedItems);
      toast.info(`Order ${itemToAdd.orderNumber} updated in the schedule.`);
    } else {
      setSelectedItems((prev) => [...prev, itemToAdd]);
      toast.success(`Order ${itemToAdd.orderNumber} added to the schedule.`);
    }
  };

  const removeItem = (itemToRemove: ItemForUI) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemToRemove.id));
    toast.warn(`Order ${itemToRemove.orderNumber} removed from schedule.`);
  };
  // const scheduleAllData = async () => {
  //   try {
  //     const payloads = selectedItems.flatMap((item) => {
  //       const productPayload = {
  //         order_id: item.id,
  //         orderDate: item.orderDate,
  //         delivery_date: item.deliveryDate,
  //         submitted_date: new Date(),
  //         customersId: item.customer.id,
  //         status: "new",
  //         quantity: item.scheduledQty,
  //         product_id: item.part.part_id,
  //         part_id: item.part.part_id,
  //         // type: item.part.type,
  //         type: "part",
  //       };

  //       const componentPayloads = item.part.components.map((comp) => ({
  //         order_id: item.id,
  //         orderDate: item.orderDate,
  //         delivery_date: item.deliveryDate,
  //         submitted_date: new Date(),
  //         customersId: item.customer.id,
  //         status: "new",
  //         quantity: item.scheduledQty,
  //         product_id: item.part.part_id,
  //         part_id: comp?.part?.part_id,
  //         type: "product",
  //       }));

  //       return [productPayload, ...componentPayloads];
  //     });

  //     console.log("Submitting all scheduled items with payload:", payloads);
  //     await scheduleStockOrder(payloads);
  //     setSelectedItems([]);
  //     setItemInputs({});
  //   } catch (error) {
  //     console.error("Failed to schedule all items:", error);
  //     toast.error(
  //       "An error occurred while scheduling the items. Please try again."
  //     );
  //   }
  // };
  // `scheduleAllData` mein koi badlav ki zaroorat nahi hai, yeh pehle se hi sahi hai
  const scheduleAllData = async () => {
    if (selectedItems.length === 0) {
      toast.warn("There are no items selected to schedule.");
      return;
    }
    try {
      const payloads = selectedItems.flatMap((item) => {
        const parentProduct = item.originalData.productFamily?.find(
          (p) => p.isParent
        );
        if (!parentProduct) return [];

        return item.originalData.productFamily.map((partInFamily) => ({
          order_id: item.originalData.id,
          orderDate: item.originalData.orderDate,
          delivery_date: item.originalData.shipDate,
          submitted_date: new Date(),
          customersId: item.originalData.customer.id,
          status: "new",
          quantity: item.originalData.productQuantity,
          product_id: parentProduct.part_id,
          part_id: partInFamily.part_id,
          type: partInFamily.type,
        }));
      });
      console.log("Payload for CUSTOM orders:", payloads);
      await scheduleCustomOrder(payloads);
    } catch (error) {
      console.error("Failed to schedule custom items:", error);
      toast.error("An error occurred while scheduling. Please try again.");
    }
  };

  const handleQuantityChange = (index: number, newQty: number) => {
    if (newQty < 1) return;
    setAvailableItems((prev) => {
      const newItems = [...prev];
      const originalData = {
        ...newItems[index].originalData,
        productQuantity: newQty,
      };
      newItems[index] = { ...newItems[index], originalData, qty: newQty };
      return newItems;
    });
  };

  const renderAvailableItemCard = (item: ItemForUI, index: number) => (
    <div
      key={item.id}
      className="flex items-center justify-between bg-white px-4 py-6 rounded-lg shadow-md"
    >
      <img
        src={item.img1 || "/placeholder.png"}
        alt="Product"
        className="w-12 h-12 rounded"
      />
      <div className="flex-1 px-4">
        <p className="text-sm 2xl:text-base font-bold">{item.orderNumber}</p>
        {/* --- YAHAN SE PROCESS DROPDOWN HATAYA GAYA HAI --- */}
        <div className="flex items-center text-xs text-gray-600 mt-2 space-x-2">
          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full font-medium">
            {item.processName}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(index, item.qty - 1)}
          className="px-2 py-1 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          -
        </button>
        <span className="w-10 text-center font-semibold">{item.qty}</span>
        <button
          onClick={() => handleQuantityChange(index, item.qty + 1)}
          className="px-2 py-1 border rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
        >
          +
        </button>
      </div>
      <div className="text-blue-500 hover:text-blue-600 cursor-pointer ml-4">
        <FaCartPlus
          size={24}
          onClick={() => addToSelected(item)}
          title="Add/Update in Schedule"
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="text-center p-10">
        <p>Loading available orders...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-end mb-6">
        <button
          className="px-6 py-2 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors shadow-lg"
          onClick={scheduleAllData}
        >
          Schedule All ({selectedItems.length})
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column: Available Items */}
        <div>
          <h2 className="font-semibold mb-4 bg-[#CBCBCB] text-center p-2 rounded-md">
            Custom orders available to be scheduled
          </h2>
          <div className="space-y-4">
            {availableItems.length === 0 && !isLoading ? (
              <p className="text-center text-gray-500 p-4 bg-white rounded-xl shadow">
                No items available to schedule.
              </p>
            ) : (
              availableItems.map((item, index) =>
                renderAvailableItemCard(item, index)
              )
            )}
          </div>
        </div>
        {/* Right Column: Selected Items (Ismein koi badlav ki zaroorat nahi thi) */}
        <div>
          <h2 className="font-semibold mb-4 bg-[#CBCBCB] text-center p-2 rounded-md">
            Custom orders selected to be scheduled
          </h2>
          <div className="space-y-4">
            {selectedItems.length === 0 ? (
              <p className="text-center text-gray-500 p-4 bg-white rounded-xl shadow">
                No items selected yet.
              </p>
            ) : (
              selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">{item.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {item.originalData.customer.firstName}{" "}
                        {item.originalData.customer.lastName}
                      </p>
                    </div>
                    <button
                      className="p-3 bg-red-100 rounded-full cursor-pointer hover:bg-red-200"
                      onClick={() => removeItem(item)}
                      title="Remove from Schedule"
                    >
                      <FaTrashAlt className="text-red-500" />
                    </button>
                  </div>
                  <div className="overflow-x-auto border rounded-md">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-4 py-2 font-medium text-gray-700">
                            Part / Component
                          </th>
                          <th className="px-4 py-2 font-medium text-gray-700">
                            Description
                          </th>
                          <th className="px-4 py-2 font-medium text-gray-700">
                            Total Qty
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.originalData.productFamily?.map((part) => (
                          <tr
                            key={part.part_id}
                            className={
                              part.isParent
                                ? "bg-gray-100 font-semibold"
                                : "border-b hover:bg-gray-50"
                            }
                          >
                            <td className="px-4 py-2">{part.partNumber}</td>
                            <td className="px-4 py-2">
                              {part.partDescription || "No Description"}
                            </td>
                            <td className="px-4 py-2">
                              {part.type === "product"
                                ? item.originalData.productQuantity *
                                  part.quantityRequired
                                : item.originalData.productQuantity *
                                  part.minStock}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomItemSelected;
