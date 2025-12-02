import { useEffect, useState } from "react";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import bag from "../../assets/bag.png";
import img from "../../assets/stack_1.png";
import { toast } from "react-toastify";
import {
  scheduleCustomOrder,
  scheduleStockOrder,
} from "./https/schedulingApis";
import { useNavigate } from "react-router-dom";

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
  orderDate: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null;
  processDetails: ProcessDetail[];
}

interface SchedulableCustomOrder extends CustomOrder {
  scheduledQty: number;
  selectedProcessId: string;
}

interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}

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
  const navigate = useNavigate();
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
      // toast.info(`Order ${itemToAdd.orderNumber} updated in the schedule.`);
    } else {
      setSelectedItems((prev) => [...prev, itemToAdd]);
      toast.success(`Order ${itemToAdd.orderNumber} added to the schedule.`);
    }
  };

  const removeItem = (itemToRemove: ItemForUI) => {
    setSelectedItems((prev) => prev.filter((i) => i.id !== itemToRemove.id));
    toast.warn(`Order ${itemToRemove.orderNumber} removed from schedule.`);
  };

  const scheduleAllData = async () => {
    if (selectedItems.length === 0) {
      toast.warn("There are no items selected to schedule.");
      return;
    }

    // ✅ Step 1: Check for components with invalid minStock
    const invalidMinStockItems = selectedItems.filter((item) =>
      item.originalData.productFamily?.some(
        (part) =>
          part.type === "product" &&
          (part.minStock === 0 || part.minStock === undefined)
      )
    );

    if (invalidMinStockItems.length > 0) {
      toast.error(
        "Some components have minimum quantity set to 0. Please set it to at least 1 before scheduling."
      );
      return;
    }

    // ✅ Step 2: Check for any item that would result in totalQty = 0
    const itemsWithZeroQty = selectedItems.filter((item) =>
      item.originalData.productFamily?.some((part) => {
        const isProduct = part.type === "product";
        const multiplier = isProduct ? part.quantityRequired : part.minStock;
        const totalQty = item.originalData.productQuantity * (multiplier || 0);
        return totalQty === 0;
      })
    );

    // if (itemsWithZeroQty.length > 0) {
    //   toast.error(
    //     "One or more items have total quantity 0. Please fix the quantities before scheduling."
    //   );
    //   return;
    // }

    // ✅ Step 3: Proceed to schedule
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
      const response = await scheduleCustomOrder(payloads);
      if (response.status === 201) {
        navigate("/order-schedule-list");
      }
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
      {/* <img
        src={item.img1 || "/placeholder.png"}
        alt="Product"
        className="w-12 h-12 rounded"
      /> */}
      <div className="flex-1 px-4">
        <p className="text-sm 2xl:text-base font-bold">{item.orderNumber}</p>
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
    <div className="p-4 mt-5">
      <div className="flex justify-end mb-6">
        <button
          className="px-6 py-2 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 transition-colors shadow-lg"
          onClick={scheduleAllData}
        >
          Schedule All ({selectedItems.length})
        </button>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
        <div>
          <h2 className="font-semibold mb-4 bg-[#CBCBCB] text-center p-2 rounded-md">
            Custom orders selected to be scheduled
          </h2>
          {/* <div className="space-y-4">
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
                        {item.originalData.customer.firstName}
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
          </div> */}
          <div className="space-y-4">
            {selectedItems.length === 0 ? (
              <p className="text-center text-gray-500 p-4 bg-white rounded-xl shadow">
                No items selected yet.
              </p>
            ) : (
              selectedItems.map((item) => {
                // 1. MERGING LOGIC: Create a combined list
                // Pehle saare standard parts le lete hain
                let mergedParts = [...(item.originalData.productFamily || [])];

                // Ab custom parts ko check karte hain
                item.originalData.customPart?.forEach((customItem) => {
                  // Check karte hain agar ye part pehle se mergedList mein hai (Matching by PartNumber or Part_ID)
                  const existingIndex = mergedParts.findIndex(
                    (p) => p.partNumber === customItem.partNumber // Ya phir: p.part_id === customItem.part_id
                  );

                  if (existingIndex > -1) {
                    // REPLACE: Agar match mila, toh us index par customItem daal do (Flagging it as custom)
                    mergedParts[existingIndex] = {
                      ...customItem,
                      isCustomSource: true,
                    };
                  } else {
                    // ADD: Agar match nahi mila, toh list mein add kar do
                    mergedParts.push({ ...customItem, isCustomSource: true });
                  }
                });

                return (
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
                        <thead className="bg-gray-100 border-b">
                          <tr>
                            <th className="px-4 py-2 font-bold text-gray-700">
                              Part / Component
                            </th>
                            <th className="px-4 py-2 font-bold text-gray-700">
                              Description / Process
                            </th>
                            <th className="px-4 py-2 font-bold text-gray-700">
                              Total Qty
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {mergedParts.length === 0 ? (
                            <tr>
                              <td
                                colSpan={3}
                                className="px-4 py-4 text-center text-gray-400 italic"
                              >
                                No parts details found.
                              </td>
                            </tr>
                          ) : (
                            mergedParts.map((part, idx) => {
                              // Logic to determine Quantity per unit based on source
                              // Standard parts use 'quantityRequired' or 'minStock'
                              // Custom parts usually use 'quantity'
                              const qtyPerUnit = part.isCustomSource
                                ? part.quantity
                                : part.type === "product"
                                ? part.quantityRequired
                                : part.minStock;

                              const finalTotalQty =
                                item.originalData.productQuantity *
                                (qtyPerUnit || 1);

                              return (
                                <tr
                                  key={part.part_id || part.id || idx} // Fallback key if IDs are messy
                                  className={
                                    part.isParent
                                      ? "bg-blue-50 font-semibold text-blue-800"
                                      : part.isCustomSource
                                      ? "hover:bg-gray-50" // Highlight replaced/custom parts
                                      : "hover:bg-gray-50"
                                  }
                                >
                                  <td className="px-4 py-2 flex items-center gap-2">
                                    {part.partNumber}
                                  </td>
                                  <td className="px-4 py-2">
                                    {part.partDescription ||
                                      part.process?.processName ||
                                      part.processName ||
                                      "-"}
                                  </td>
                                  <td className="px-4 py-2 font-medium">
                                    {finalTotalQty}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomItemSelected;
