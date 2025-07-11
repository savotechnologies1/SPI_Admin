import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { SearchResultItem, ScheduledItem, ItemSelectedProps, ItemInputState, } from "../../utils/Interfaces";


const ItemSelected = ({ availableItems, isLoading }: ItemSelectedProps) => {
  const [selectedItems, setSelectedItems] = useState<ScheduledItem[]>([]);
  const [itemInputs, setItemInputs] = useState<ItemInputState>({});



  const handleInputChange = (itemId: string, field: 'qty' | 'deliveryDate', value: string | Date) => {
    setItemInputs(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        qty: field === 'qty' ? (value as string) : prev[itemId]?.qty ?? '',
        deliveryDate: field === 'deliveryDate' ? (value as Date) : prev[itemId]?.deliveryDate ?? new Date(),
      }
    }));
  };


  const scheduleItem = (itemToAdd: SearchResultItem) => {
    const inputs = itemInputs[itemToAdd.id];
    const qtyToSchedule = parseInt(inputs?.qty || '0', 10);
    const deliveryDate = inputs?.deliveryDate || new Date();

    if (isNaN(qtyToSchedule) || qtyToSchedule <= 0) {
      toast.error("Please enter a valid quantity to schedule.");
      return;
    }
    if (qtyToSchedule > itemToAdd.productQuantity) {
      toast.warn(`Cannot schedule more than the available quantity of ${itemToAdd.productQuantity}.`);
      return;
    }
    if (selectedItems.some(item => item.id === itemToAdd.id)) {
      toast.info("This item has already been added to the schedule.");
      return;
    }

    const newScheduledItem: ScheduledItem = {
      ...itemToAdd,
      scheduledQty: qtyToSchedule,
      deliveryDate: deliveryDate,
    };
    setSelectedItems([...selectedItems, newScheduledItem]);
  };


  const removeItem = (itemIdToRemove: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemIdToRemove));
  };


  const updateScheduledDate = (itemId: string, date: Date) => {
    setSelectedItems(selectedItems.map(item =>
      item.id === itemId ? { ...item, deliveryDate: date } : item
    ));
  };


  return (
    <div className="py-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Left Section */}
        <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4">
            Stock orders available to schedule
          </h1>
          <div className="space-y-4">
            {isLoading && <p className="text-center">Loading search results...</p>}
            {!isLoading && availableItems.length === 0 && <p className="text-center text-gray-500">No stock orders found. Use the form above to search.</p>}

            {availableItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md flex justify-between items-start gap-4"
              >
                <div className="flex-1 space-y-3">
                  <p className="font-semibold text-base">{item.productDescription}</p>

                  <div className="flex items-center text-sm text-gray-600">
                    <span>{item.productNumber}</span>
                    {item.process && <span className="mx-2">|</span>}
                    {item.process && <span>{item.process}</span>}
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <p className="text-[#5A6774]">Available Qty:</p>
                    <span className="font-bold text-[#637381] bg-[#919EAB29] px-2 py-1 rounded-md">
                      {item.productQuantity}
                    </span>
                  </div>

                  <div>
                    <input
                      className="w-full sm:w-40 p-2 border rounded-md text-sm"
                      type="number"
                      placeholder="Enter Qty"
                      value={itemInputs[item.id]?.qty || ''}
                      onChange={(e) => handleInputChange(item.id, 'qty', e.target.value)}
                    />
                  </div>
                </div>

                {/* --- Right Column --- */}
                <div className="flex flex-col items-end gap-4">
                  <button
                    className="px-4 py-2 bg-blue-800 text-white text-sm rounded-md hover:bg-blue-900 transition"
                    onClick={() => scheduleItem(item)}
                  >
                    Schedule Order
                  </button>

                  <div className="flex flex-col">
                    <label className="text-[#1C252E] text-sm text-right mb-1">Delivery Date</label>
                    <DatePicker
                      selected={itemInputs[item.id]?.deliveryDate || new Date()}
                      onChange={(date) => handleInputChange(item.id, 'deliveryDate', date as Date)}
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
        <div className="bg-white rounded-xl p-4 shadow">
          <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold mb-4">
            Stock orders selected to be scheduled
          </h1>
          <div className="space-y-4">
            {selectedItems.length === 0 && <p className="text-center text-gray-500">No items scheduled yet.</p>}
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white shadow-md flex flex-col md:flex-row justify-between gap-4 md:items-center"
              >
                <div className="space-y-1 flex-1 min-w-0">
                  <p className="font-semibold">{item.productDescription}</p>
                  <p className="text-sm">{item.productNumber}</p>
                  <p className="text-sm font-bold">Scheduled Qty: {item.scheduledQty}</p>
                </div>

                <div className="flex flex-col">
                  <label className="text-[#1C252E] text-sm">Delivery Date</label>
                  <DatePicker
                    selected={item.deliveryDate}
                    onChange={(date) => updateScheduledDate(item.id, date as Date)}
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
        </div>
      </div>
    </div>
  );
};

export default ItemSelected;