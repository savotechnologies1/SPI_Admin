import { useState } from "react";
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
import send from "../../assets/Send.png";
import { useNavigate } from "react-router-dom";
const ItemSelected = ({ availableItems, isLoading }: ItemSelectedProps) => {
  const [selectedItems, setSelectedItems] = useState<ScheduledItem[]>([]);
  const [itemInputs, setItemInputs] = useState<ItemInputState>({});

  console.log("selectedItemsselectedItems", selectedItems);

  const scheduleItem = (itemToAdd: SearchResultItem) => {
    const inputs = itemInputs[itemToAdd.id];
    console.log("itemToAdditemToAdd", itemToAdd);

    const qtyToSchedule = parseInt(inputs?.qty || "0", 10);
    const deliveryDate = inputs?.deliveryDate || new Date();

    if (isNaN(qtyToSchedule) || qtyToSchedule <= 0) {
      toast.error("Please enter a valid quantity to schedule.");
      return;
    }
    // if (qtyToSchedule > itemToAdd.productQuantity) {
    //   toast.warn(
    //     `Cannot schedule more than the available quantity of ${itemToAdd.productQuantity}.`
    //   );
    //   return;
    // }
    // if (selectedItems.some((item) => item.id === itemToAdd.id)) {
    //   toast.info("This item has already been added to the schedule.");
    //   return;
    // }
    const newScheduledItem: ScheduledItem = {
      ...itemToAdd,
      scheduledQty: qtyToSchedule,
      deliveryDate: deliveryDate,
    };

    setSelectedItems((prev) => [...prev, newScheduledItem]);

    setItemInputs((prev) => {
      const newInputs = { ...prev };
      delete newInputs[itemToAdd.id];
      return newInputs;
    });
  };
  const removeItem = (itemIdToRemove: string) => {
    setSelectedItems(
      selectedItems.filter((item) => item.id !== itemIdToRemove)
    );
  };
  const flattenBOM = (components, parentQty) => {
    let flatList = [];
    components?.forEach((comp) => {
      // Current component ki total required quantity calculate karein
      const currentTotalQty = parentQty * (comp.partQuantity || 1);

      // Is component ko list mein add karein
      flatList.push({
        ...comp,
        calculatedQty: currentTotalQty,
      });

      // Agar ye part khud ek product hai, toh iske andar ke parts bhi nikaalein (Recursion)
      if (comp.part?.type === "product" && comp.part.components?.length > 0) {
        const subComponents = flattenBOM(comp.part.components, currentTotalQty);
        flatList = [...flatList, ...subComponents];
      }
    });
    return flatList;
  };
  const updateScheduledDate = (itemId: string, date: Date) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemId ? { ...item, deliveryDate: date } : item
      )
    );
  };
  const navigate = useNavigate();
  const scheduleAllData = async () => {
    try {
      const payloads = selectedItems.flatMap((item) => {
        // 1. Main Product ka payload
        const productPayload = {
          order_id: item.id,
          orderDate: item.orderDate,
          delivery_date: item.deliveryDate,
          submitted_date: new Date(),
          customersId: item.customer.id,
          status: "new",
          quantity: item.scheduledQty,
          product_id: item.part.part_id,
          part_id: item.part.part_id,
          type: "part",
        };

        // 2. Saare nested components ko flatten karke payload mein convert karein
        const allNestedParts = flattenBOM(
          item.part.components,
          item.scheduledQty
        );

        const componentPayloads = allNestedParts.map((comp) => ({
          order_id: item.id,
          orderDate: item.orderDate,
          delivery_date: item.deliveryDate,
          submitted_date: new Date(),
          customersId: item.customer.id,
          status: "new",
          quantity: comp.calculatedQty, // Sahi calculated qty
          product_id: item.part.part_id,
          part_id: comp?.part?.part_id,
          type: comp?.part?.type === "product" ? "product" : "part",
        }));

        return [productPayload, ...componentPayloads];
      });

      const response = await scheduleStockOrder(payloads);
      navigate("/order-schedule-list");
      toast.success(response?.data.message);
      setSelectedItems([]);
      setItemInputs({});
    } catch (error) {
      console.error("Failed to schedule all items:", error);
      toast.error("An error occurred while scheduling.");
    }
  };
  console.log("selectedItemsselectedItems", selectedItems);
  const handleInputChange = (
    itemId: string,
    field: "qty" | "deliveryDate",
    value: string | Date
  ) => {
    setItemInputs((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        qty: field === "qty" ? (value as string) : prev[itemId]?.qty ?? "",
        deliveryDate:
          field === "deliveryDate"
            ? (value as Date)
            : prev[itemId]?.deliveryDate ?? new Date(),
      },
    }));
  };

  return (
    <div className="py-6">
      <div className="flex gap-4 justify-end items-center mb-5">
        <div className="bg-white p-2 rounded-3xl">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className="flex relative  ">
          <button
            className="py-2 px-10  border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer"
            onClick={scheduleAllData}
          >
            Schedule Order
          </button>
          <div className="absolute top-3 right-2 pl-2 ">
            <img src={send} alt="" />
          </div>
        </div>
      </div>
      {/* <div className="flex gap-4 justify-end items-center">
        <div className="bg-white p-2 rounded-3xl">
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className="flex justify-end">
          <div className="absolute top-3 right-2 pl-2 ">
            <img src={send} alt="" />
          </div>
          <button
            className="px-4 py-2 bg-blue-800 text-white text-sm rounded-md hover:bg-blue-900 transition my-4 "
            onClick={scheduleAllData}
          >
            All schedule
          </button>
        </div>
      </div> */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4">
            Stock orders available to schedule
          </h1>
          <div className="space-y-4">
            {isLoading && (
              <p className="text-center">Loading search results...</p>
            )}
            {!isLoading && availableItems.length === 0 && (
              <p className="text-center text-gray-500">
                No stock orders found. Use the form above to search.
              </p>
            )}

            {availableItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md flex justify-between items-start gap-4"
              >
                <div className="flex-1 space-y-3">
                  <p className="font-semibold text-base">
                    {item.part.partDescription}
                  </p>

                  <div className="flex items-center text-sm text-gray-600">
                    <span>{item.part.partNumber}</span>
                    {item.process && <span className="mx-2">|</span>}
                    {item.process && <span>{item.process}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p className="text-[#5A6774]">Inventory Qty:</p>
                    <span className="font-bold text-[#637381]  px-2 py-1 rounded-md">
                      10
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p className="text-[#5A6774]">Stock Order Qty:</p>
                    <span className="font-bold text-[#637381] bg-[#919EAB29] px-2 py-1 rounded-md">
                      {item.productQuantity}
                    </span>
                  </div>
                  <div>
                    <input
                      className="w-full sm:w-40 p-2 border rounded-md text-sm"
                      type="number"
                      placeholder="Enter Qty"
                      value={itemInputs[item.id]?.qty || ""}
                      onChange={(e) =>
                        handleInputChange(item.id, "qty", e.target.value)
                      }
                      min={0}
                      max={item.productQuantity}
                    />

                    {Number(itemInputs[item.id]?.qty) >
                      item.productQuantity && (
                      <p className="text-red-400 text-sm mt-1">
                        Enter quantity less than or equal to available stock (
                        {item.productQuantity})
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <button
                    className="px-4 py-2 bg-blue-800 text-white text-sm rounded-md hover:bg-blue-900 transition"
                    onClick={() => scheduleItem(item)}
                  >
                    Schedule Order
                  </button>

                  <div className="flex flex-col">
                    <label className="text-[#1C252E] text-sm text-right mb-1">
                      Delivery Date
                    </label>
                    <DatePicker
                      selected={itemInputs[item.id]?.deliveryDate || new Date()}
                      onChange={(date) =>
                        handleInputChange(item.id, "deliveryDate", date as Date)
                      }
                      dateFormat="dd MMM yyyy"
                      className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44 text-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        {/* <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4">
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
                key={item.id}
                className="p-4 bg-white shadow-md flex flex-col md:flex-row justify-between gap-4 md:items-center"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="font-semibold">{item.part.partDescription}</p>
                  <p className="text-sm">{item.part.partNumber}</p>
                  <p className="text-sm">
                    {item.part.components.map((data) => (
                      <div className="flex justify-between">
                        <p className="text-sm"> {data.part.partNumber}</p>
                        <p className="text-sm"> {data.part.partNumber}</p>
                      </div>
                    ))}
                  </p>
                  <p className="text-sm font-bold">
                    Scheduled Qty: {item.scheduledQty}
                  </p>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#1C252E] text-sm">
                    Delivery Date
                  </label>
                  <DatePicker
                    selected={item.deliveryDate}
                    onChange={(date) =>
                      updateScheduledDate(item.id, date as Date)
                    }
                    dateFormat="dd MMM yyyy"
                    className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44"
                  />
                </div>

                <button
                  className="p-3 bg-red-100 rounded-full cursor-pointer hover:bg-red-200"
                  onClick={() => removeItem(item.id)}
                >
                  <FaTrashAlt className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div> */}

        <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4">
            Stock orders selected to be scheduled
          </h1>
          <div className="space-y-4">
            {selectedItems.length === 0 && (
              <p className="text-center text-gray-500">
                No items scheduled yet.
              </p>
            )}
            {selectedItems.map((item) => (
              <div key={item.id} className="p-4  bg-white shadow-md ">
                <div className="flex justify-between mb-4">
                  {/* <p className="text-sm font-bold">
                    Scheduled Qty: {item.scheduledQty}
                  </p>{" "} */}
                  <div className="flex flex-col justify-between">
                    <label className="text-[#1C252E] text-sm">
                      Delivery Date
                    </label>
                    <DatePicker
                      selected={item.deliveryDate}
                      onChange={(date) =>
                        updateScheduledDate(item.id, date as Date)
                      }
                      dateFormat="dd MMM yyyy"
                      className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44"
                    />
                  </div>
                  <button
                    className=" rounded-full cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    <FaTrashAlt className="text-red-500 " />
                  </button>
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  {/* We start with a container for the table, maybe a div */}
                  <div className="flex-1 min-w-0">
                    {/* We no longer need the separate <p> tags here */}

                    {/* The main container for the table */}
                    <div className="overflow-x-auto border ">
                      <table className="min-w-full text-sm text-left">
                        {/* Table Head: Column titles, same as before */}
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="px-4 py-2 font-medium text-gray-700">
                              Product /Part
                            </th>
                            <th className="px-4 py-2 font-medium text-gray-700">
                              Description
                            </th>
                            <th className="px-4 py-2 font-medium text-gray-700">
                              Scheduled Quantity
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {/* Main Item Row */}
                          <tr className="bg-gray-50 font-semibold border-b">
                            <td className="px-4 py-2">
                              {item.part.partNumber}
                            </td>
                            <td className="px-4 py-2">
                              {item.part.partDescription}
                            </td>
                            <td className="px-4 py-2">
                              {item.scheduledQty || "-"}
                            </td>
                          </tr>

                          {/* Recursive Flattened Components Rows */}
                          {flattenBOM(
                            item.part.components,
                            item.scheduledQty || 0
                          )
                            .filter((data) => data?.part)
                            .map((data, idx) => (
                              <tr
                                key={`${data.part.partNumber}-${idx}`}
                                className="border-b hover:bg-gray-50"
                              >
                                <td className="px-4 py-2">
                                  {/* Agar nested hai toh indentation (padding) de sakte hain */}
                                  <span
                                    className={
                                      data.part.type === "product"
                                        ? "font-medium"
                                        : ""
                                    }
                                  >
                                    {data.part.partNumber}
                                  </span>
                                </td>
                                <td className="px-4 py-2">
                                  {data.part.partDescription}
                                </td>
                                <td className="px-4 py-2 font-medium">
                                  {data.calculatedQty}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
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
