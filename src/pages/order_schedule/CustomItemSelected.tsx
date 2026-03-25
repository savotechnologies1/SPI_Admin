import { useEffect, useState } from "react";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { scheduleCustomOrder } from "./https/schedulingApis";
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
  email?: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
}

interface ProcessDetail {
  id: number;
  process: string;
  processName?: string;
  assignTo?: string;
  totalTime?: number;
  customOrderId?: string;
}

interface BOMEntry {
  id?: string;
  partNumber?: string;
  partId?: string;
  processName?: string;
  qty?: number;
  cycleTime?: number;
}

interface CustomOrder {
  id: string;
  orderNumber: string;
  orderDate?: string;
  shipDate?: string;
  productQuantity: number;
  customer: Customer;
  part: Part | null;
  product?: Part;
  processDetails: ProcessDetail[];
  bomList?: BOMEntry[];
}

interface SchedulableCustomOrder extends CustomOrder {
  scheduledQty: number;
  selectedProcessId: string;
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
  processName?: string;
}

interface CustomItemSelectedProps {
  items: CustomOrder[];
  isLoading: boolean;
}
const CustomItemSelected = ({ items, isLoading }: CustomItemSelectedProps) => {
  const [availableItems, setAvailableItems] = useState<ItemForUI[]>([]);
  const [selectedItems, setSelectedItems] = useState<ItemForUI[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!items) {
      setAvailableItems([]);
      return;
    }

    // जब भी items (search results) बदलेंगे, available list अपडेट होगी
    const newTransformedItems = items.map((apiItem) => {
      // BOM list में से पहली प्रोसेस निकालें (डिस्प्ले के लिए)
      const processName =
        apiItem.bomList?.[0]?.processName || "Multiple Processes";

      return {
        id: apiItem.id,
        img1: "https://via.placeholder.com/150",
        orderNumber: apiItem.orderNumber,
        // अगर product object है तो उसकी description लें
        text1: apiItem.product?.partDescription || "Custom Order",
        text2: processName,
        qty: apiItem.productQuantity || 1,
        inputQty: "1",
        allProcesses: apiItem.processDetails || [],
        originalData: apiItem,
        processName: processName,
      };
    });

    setAvailableItems(newTransformedItems);
  }, [items]); // ← यह Dependency बहुत ज़रूरी है
  const addToSelected = (itemToAdd: ItemForUI) => {
    const existingItemIndex = selectedItems.findIndex(
      (item) => item.id === itemToAdd.id,
    );
    if (existingItemIndex > -1) {
      const updatedSelectedItems = [...selectedItems];
      updatedSelectedItems[existingItemIndex] = itemToAdd;
      setSelectedItems(updatedSelectedItems);
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

    try {
      const payloads = selectedItems.flatMap((item) => {
        const bomParts = item.originalData.bomList || [];

        return bomParts.map((part: any) => ({
          order_id: item.originalData.id,
          customPartId: part.id,
          part_id: part.source === "Library" ? part.partId : null,
          delivery_date: item.originalData.shipDate,
          status: "new",
          quantity: item.qty * (part.qty || 1),
          type: part.source === "Library" ? "Existing" : "New",
        }));
      });

      if (payloads.length === 0) {
        toast.error("No components found to schedule.");
        return;
      }

      const response = await scheduleCustomOrder(payloads);
      if (response && (response.status === 201 || response.status === 200)) {
        toast.success("Orders scheduled successfully!");
        navigate("/order-schedule-list");
      }
    } catch (error: any) {
      console.error("Failed to schedule custom items:", error);
      toast.error(error.response?.data?.message || "An error occurred.");
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
                renderAvailableItemCard(item, index),
              )
            )}
          </div>
        </div>
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
                  className="p-4 bg-white shadow-md rounded-lg mb-4"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">{item.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        {item.originalData.customer?.firstName}{" "}
                        {item.originalData.customer?.lastName}
                      </p>
                    </div>

                    <button
                      className="p-3 bg-red-100 rounded-full cursor-pointer hover:bg-red-200"
                      onClick={() => removeItem(item)}
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
                        {item.originalData.product && (
                          <tr className="bg-blue-50 border-b font-semibold">
                            <td className="px-4 py-2 ">
                              {item.originalData.product.partNumber}
                            </td>
                            <td className="px-4 py-2">
                              {item.originalData.product.partDescription || "-"}
                            </td>
                            <td className="px-4 py-2 ">{item.qty}</td>
                          </tr>
                        )}

                        {item.originalData.bomList?.map(
                          (part: any, idx: number) => (
                            <tr
                              key={part.id || idx}
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="px-4 py-2  ">{part.partNumber}</td>
                              <td className="px-4 py-2 text-gray-600">
                                {part.partDescription ||
                                  part.processName ||
                                  "-"}
                              </td>
                              <td className="px-4 py-2 font-medium">
                                {item.qty * (part.qty || 1)}
                              </td>
                            </tr>
                          ),
                        )}
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
