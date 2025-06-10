import { useState } from "react";
import { FaTrashAlt, FaCartPlus } from "react-icons/fa";
import bag from "../../assets/bag.png";
import img from "../../assets/stack_1.png";

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

const initialItems: Item[] = [
  {
    id: 1,
    text: "Aliquam a dui vel justo fringilla euismod id id enim.",
    text1: "Pass GMT800 Single",
    text2: "Thermoforming1",
    qty: 100,
    inputQty: "1",
    img: bag,
    img1: img,
  },
  {
    id: 2,
    text: "Aliquam a dui vel justo fringilla euismod id id enim.",
    text1: "Pass GMT800 Single",
    text2: "Cutting1",
    qty: 50,
    inputQty: "1",
    img: bag,
    img1: img,
  },
  {
    id: 3,
    text: "Aliquam a dui vel justo fringilla euismod id id enim.",
    text1: "Pass GMT800 Single",
    text2: "Assembly1",
    qty: 70,
    inputQty: "1",
    img: bag,
    img1: img,
  },
];

const CustomItemSelected = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const addToSelected = (item: Item) => {
    // Prevent duplicate entries
    if (!selectedItems.find((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, { ...item }]);
    }
  };

  const removeItem = (index: number) => {
    const updated = [...selectedItems];
    updated.splice(index, 1);
    setSelectedItems(updated);
  };

  const handleInputChange = (
    index: number,
    type: "inc" | "dec",
    side: "left" | "right"
  ) => {
    const list = side === "right" ? [...selectedItems] : [...initialItems];
    let qty = parseInt(list[index].inputQty) || 0;
    if (type === "inc") qty++;
    if (type === "dec" && qty > 0) qty--;
    list[index].inputQty = qty.toString();
    if (side === "right") setSelectedItems(list);
  };

  const handleSelectChange = (
    index: number,
    value: string,
    side: "left" | "right"
  ) => {
    if (side === "right") {
      const updated = [...selectedItems];
      updated[index].text2 = value;
      setSelectedItems(updated);
    }
  };

  const renderItemCard = (
    item: Item,
    index: number,
    side: "left" | "right"
  ) => (
    <div
      key={item.id}
      className="flex  items-center justify-between bg-white px-4 py-6 rounded-lg shadow-md"
    >
      {/* Image */}
      <img src={item.img1} alt="bag" className="w-12 h-12 rounded" />

      {/* Text Info */}
      <div className="flex-1 px-4">
        <p className=" text-sm 2xl:text-base font-bold">{item.text}</p>
        <div className="flex items-center text-xs text-gray-600 mt-1 space-x-2">
          <span>{item.text1}</span>
          <span className="text-gray-400">|</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            value={item.text2}
            onChange={(e) => handleSelectChange(index, e.target.value, side)}
          >
            <option value="Thermoforming1">Thermoforming1</option>
            <option value="Cutting1">Cutting1</option>
            <option value="Assembly1">Assembly1</option>
          </select>
        </div>
      </div>
<div className="space-y-2">
      {/* Quantity Controls */}
      <div className="flex  items-center space-x-2 border rounded-md ">
        <button
          className=" px-2 py-1 rounded text-sm"
          onClick={() => handleInputChange(index, "dec", side)}
        >
          -
        </button>
        <span className="w-6 text-center text-sm">{item.inputQty}</span>
        <button
          className=" px-2 py-1 rounded text-sm"
          onClick={() => handleInputChange(index, "inc", side)}
        >
          +
        </button>
      </div>

      {/* Available Qty */}
      <div className="text-xs text-gray-500 px-4 whitespace-nowrap">
        Available: {item.qty}
      </div>
      </div>

      {/* Icon */}
      <div className="text-blue-500 hover:text-blue-600 cursor-pointer ml-2">
        {side === "right" ? (
          <FaTrashAlt
            className="text-red-500   bg-red-100"
            size={16}
            onClick={() => removeItem(index)}
          />
        ) : (
          <FaCartPlus
            size={16}
            onClick={() => addToSelected(item)}
            title="Add to Selected"
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4">
      {/* Left Column - All Items */}
      <div>
        <h2 className="font-semibold mb-4">Custom orders avaiable to be scheduled</h2>
        <div className="space-y-4">
          {initialItems.map((item, index) =>
            renderItemCard(item, index, "left")
          )}
        </div>
      </div>

      {/* Right Column - Selected Items */}
      <div>
        <h2 className="font-semibold mb-4">Custom orders selected to be scheduled</h2>
        {selectedItems.length === 0 ? (
          <p className="text-gray-500 text-sm">No items selected.</p>
        ) : (
          <div className="space-y-4">
            {selectedItems.map((item, index) =>
              renderItemCard(item, index, "right")
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomItemSelected;
