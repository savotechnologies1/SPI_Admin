import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import {
  SearchResultItem,
  ScheduledItem,
  ItemSelectedProps,
  ItemInputState,
} from "../../utils/Interfaces";
import { scheduleStockOrder } from "./https/schedulingApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

interface BOMComponent {
  partQuantity?: number;
  calculatedQty?: number;
  part?: {
    part_id: string;
    type: string;
    partNumber: string;
    partDescription: string;
    components?: BOMComponent[];
  };
}

const ItemSelected = ({ availableItems, isLoading }: ItemSelectedProps) => {
  const [selectedItems, setSelectedItems] = useState<ScheduledItem[]>([]);
  const [itemInputs, setItemInputs] = useState<ItemInputState>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const scheduleItem = (itemToAdd: SearchResultItem) => {
    const inputs = itemInputs[itemToAdd.id];
    const qtyToSchedule = parseInt(inputs?.qty || "0", 10);

    const shipDate =
      inputs?.shipDate ||
      (itemToAdd.shipDate ? new Date(itemToAdd.shipDate) : new Date());

    if (isNaN(qtyToSchedule) || qtyToSchedule <= 0) {
      toast.error("Please enter a valid quantity to schedule.");
      return;
    }

    const newScheduledItem: ScheduledItem = {
      ...itemToAdd,
      instanceId: `${itemToAdd.id}-${Date.now()}-${Math.random()}`,
      scheduledQty: qtyToSchedule,
      shipDate: shipDate,
    };

    setSelectedItems((prev) => [...prev, newScheduledItem]);

    setItemInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[itemToAdd.id];
      return newInputs;
    });
  };

  const removeItem = (instanceIdToRemove: string) => {
    setSelectedItems(
      selectedItems.filter((item) => item.instanceId !== instanceIdToRemove),
    );
  };

  const updateScheduledDate = (instanceId: string, date: Date | null) => {
    if (!date) return;
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === instanceId ? { ...item, shipDate: date } : item,
      ),
    );
  };

  const flattenBOM = (
    components: BOMComponent[] | undefined,
    parentQty: number,
  ): BOMComponent[] => {
    let flatList: BOMComponent[] = [];
    components?.forEach((comp) => {
      const currentTotalQty = parentQty * (comp.partQuantity || 1);
      flatList.push({ ...comp, calculatedQty: currentTotalQty });
      if (
        comp.part?.type === "product" &&
        comp.part.components &&
        comp.part.components.length > 0
      ) {
        const subComponents = flattenBOM(comp.part.components, currentTotalQty);
        flatList = [...flatList, ...subComponents];
      }
    });
    return flatList;
  };

  const formatLocalDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const scheduleAllData = async () => {
    if (selectedItems.length === 0) return;
    setLoading(true);
    try {
      const payloads = selectedItems.flatMap((item) => {
        const formattedDate = formatLocalDate(new Date(item.shipDate));

        const productPayload = {
          order_id: item.id,
          orderDate: item.orderDate,
          delivery_date: formattedDate,
          submitted_date: new Date(),
          customersId: item.customer.id,
          status: "new",
          quantity: item.scheduledQty,
          product_id: item.part.part_id,
          part_id: item.part.part_id,
          type: "part",
        };

        const allNestedParts = flattenBOM(
          item.part.components as BOMComponent[],
          item.scheduledQty || 0,
        );

        const componentPayloads = allNestedParts
          .filter((comp) => comp.part)
          .map((comp) => ({
            order_id: item.id,
            orderDate: item.orderDate,
            delivery_date: formattedDate,
            submitted_date: new Date(),
            customersId: item.customer.id,
            status: "new",
            quantity: comp.calculatedQty,
            product_id: item.part.part_id,
            part_id: comp.part?.part_id,
            type: comp.part?.type === "product" ? "product" : "part",
          }));

        return [productPayload, ...componentPayloads];
      });

      const response = await scheduleStockOrder(payloads);
      toast.success(response?.data.message || "Order Scheduled Successfully");
      setSelectedItems([]);
      setItemInputs({});
      navigate("/order-schedule-list");
    } catch (error) {
      console.error("Failed to schedule all items:", error);
      toast.error("An error occurred while scheduling.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    itemId: string,
    field: "qty" | "shipDate",
    value: string | Date | null,
  ) => {
    if (value === null) return;
    setItemInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="py-6">
      <div className="flex gap-4 justify-end items-center mb-5">
        <div className="bg-white p-2 rounded-3xl shadow-sm">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <button
          className={`py-2 px-10 border-gray-100 bg-brand text-white flex gap-2 items-center h-fit ${
            loading || selectedItems.length === 0
              ? "opacity-70 cursor-not-allowed"
              : "hover:cursor-pointer"
          }`}
          onClick={scheduleAllData}
          disabled={loading || selectedItems.length === 0}
        >
          {loading ? "Scheduling..." : "Schedule Order"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4 rounded">
            Stock orders available to schedule
          </h1>
          <div className="space-y-4">
            {(!Array.isArray(availableItems) || availableItems.length === 0) &&
              !isLoading && (
                <p className="text-center text-gray-500">
                  No stock orders found.
                </p>
              )}
            {Array.isArray(availableItems) &&
              availableItems.map((item) => {
                const displayDate =
                  itemInputs[item.id]?.shipDate ||
                  (item.shipDate ? new Date(item.shipDate) : new Date());
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-white shadow-md rounded-lg flex justify-between items-start gap-4 border border-gray-50"
                  >
                    <div className="flex-1 space-y-3">
                      <p className="font-semibold text-base">
                        {item.part.partDescription}
                      </p>
                      <div className="text-sm text-gray-600">
                        {item.part.partNumber}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <p className="text-[#5A6774]">Order Qty:</p>
                        <span className="font-bold text-[#637381] bg-gray-100 px-2 py-1 rounded">
                          {item.productQuantity}
                        </span>
                      </div>
                      <input
                        className="w-full sm:w-40 p-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-brand"
                        type="number"
                        placeholder="Enter Qty"
                        value={itemInputs[item.id]?.qty || ""}
                        onChange={(e) =>
                          handleInputChange(item.id, "qty", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <button
                        className="px-4 py-2 bg-blue-800 text-white text-sm rounded-md hover:bg-blue-900 transition"
                        onClick={() => scheduleItem(item)}
                      >
                        Schedule
                      </button>
                      <div className="flex flex-col">
                        <label className="text-xs text-right mb-1 text-gray-400 uppercase font-bold">
                          Ship Date
                        </label>
                        <DatePicker
                          selected={
                            displayDate instanceof Date
                              ? displayDate
                              : new Date(displayDate)
                          }
                          onChange={(date) =>
                            handleInputChange(item.id, "shipDate", date)
                          }
                          dateFormat="MM/dd/yyyy"
                          className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44 text-center outline-none"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4 rounded">
            Stock orders selected to be scheduled
          </h1>
          <div className="space-y-4">
            {selectedItems.length === 0 && (
              <p className="text-center text-gray-500">
                No items scheduled yet.
              </p>
            )}
            {selectedItems.map((item) => (
              <div
                key={item.instanceId}
                className="p-4 bg-white shadow-md rounded-lg border border-gray-100"
              >
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 uppercase font-bold mb-1">
                      Ship Date
                    </label>
                    <DatePicker
                      selected={item.shipDate}
                      onChange={(date) => updateScheduledDate(item.id, date)}
                      dateFormat="MM/dd/yyyy"
                      className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44 outline-none"
                    />
                  </div>
                  <button onClick={() => removeItem(item.instanceId)}>
                    <FaTrashAlt className="text-red-500 hover:text-red-700" />
                  </button>
                </div>
                <div className="overflow-x-auto border rounded-lg">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2">Part No.</th>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2 text-right">Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-50/30 font-semibold">
                        <td className="px-4 py-2">{item.part.partNumber}</td>
                        <td className="px-4 py-2">
                          {item.part.partDescription}
                        </td>
                        <td className="px-4 py-2 text-right">
                          {item.scheduledQty}
                        </td>
                      </tr>
                      {flattenBOM(
                        item.part.components as BOMComponent[],
                        item.scheduledQty || 0,
                      )
                        .filter((data) => data.part)
                        .map((data, idx) => (
                          <tr key={idx} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2">
                              {data.part?.partNumber}
                            </td>
                            <td className="px-4 py-2">
                              {data.part?.partDescription}
                            </td>
                            <td className="px-4 py-2 text-right font-medium">
                              {data.calculatedQty}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSelected;
