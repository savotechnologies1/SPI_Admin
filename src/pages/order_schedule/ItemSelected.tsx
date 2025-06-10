import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import bag from "../../assets/bag.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ItemType = {
  id: number;
  text: string;
  text1: string;
  text2: string;
  qty: string;
  place: string;
  bg: string;
  img: string;
};

const ItemSelected = () => {
  const [selectedItems, setSelectedItems] = useState<
    (ItemType & { deliveryDate: Date; inputQty: string })[]
  >([]);

  const availableItems: ItemType[] = [
    {
      id: 1,
      text: "Aliquam a dui vel justo fringilla euismod id id enim.",
      text1: "Pass GMT800 Single",
      text2: "Thermoforming2",
      qty: "5",
      place: "Enter Qty",
      bg: "#1D7BF50F",
      img: bag,
    },
    {
      id: 2,
      text: "Aliquam a dui vel justo fringilla euismod id id enim.",
      text1: "Pass GMT800 Single",
      text2: "Thermoforming2",
      qty: "5",
      place: "Enter Qty",
      bg: "#1D7BF50F",
      img: bag,
    },
    {
      id: 3,
      text: "Aliquam a dui vel justo fringilla euismod id id enim.",
      text1: "Pass GMT800 Single",
      text2: "Thermoforming2",
      qty: "5",
      place: "Enter Qty",
      bg: "#1D7BF50F",
      img: bag,
    },
  ];

  const addItem = (item: ItemType) => {
    const alreadyExists = selectedItems.some((i) => i.id === item.id);
    if (!alreadyExists) {
      setSelectedItems([
        ...selectedItems,
        { ...item, deliveryDate: new Date(), inputQty: "" },
      ]);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  const updateDeliveryDate = (index: number, date: Date) => {
    const updated = [...selectedItems];
    updated[index].deliveryDate = date;
    setSelectedItems(updated);
  };

  return (
  <div className="py-6">
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white rounded-xl p-4">
    {/* Left Section */}
    <div>
      <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold">
        Stock orders available to schedule
      </h1>
      <div className="space-y-4">
        {availableItems.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white shadow-md flex flex-col md:flex-row justify-between gap-4 md:items-center"
          >
            <div className="space-y-2 flex-1 min-w-0">
              <p className="font-semibold">{item.text}</p>
              <div className="flex flex-wrap gap-2 text-sm items-center text-[#1C252E]">
                <p>{item.text1}</p>
                <span>|</span>
                <p>{item.text2}</p>
              </div>
              <div className="flex flex-wrap gap-2 items-center text-sm">
                <p className="text-[#5A6774]">Available Qty :</p>
                <p className="font-bold text-[#637381] bg-[#919EAB29] px-2 py-1 rounded-md">
                  {item.qty}
                </p>
              </div>
              <input
                className="w-full sm:w-40 p-2 border-2 rounded-md text-sm text-[#5A6774]"
                type="text"
                placeholder={item.place}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-[#1C252E] text-sm">Delivery Date</label>
              <DatePicker
                selected={new Date()}
                onChange={() => {}}
                dateFormat="dd MMM yyyy"
                className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44"
              />
            </div>

            <div
              className="rounded-full p-2 cursor-pointer w-10 self-start"
              style={{ backgroundColor: item.bg }}
              onClick={() => addItem(item)}
            >
              <img src={item.img} alt="bag" className="w-full h-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Section */}
    <div>
      <h1 className="bg-[#CBCBCB] text-center p-2 font-semibold">
        Stock orders selected to be scheduled
      </h1>
      <div className="space-y-4">
        {selectedItems.map((item, index) => (
          <div
            key={item.id}
            className="p-4 bg-white shadow-md flex flex-col md:flex-row justify-between gap-4 md:items-center"
          >
            <div className="space-y-1 flex-1 min-w-0">
              <p className="font-semibold">{item.text}</p>
              <div className="flex flex-col gap-1 text-sm text-[#1C252E]">
                <p>{item.text1}</p>
                <p>{item.text2}</p>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-[#1C252E] text-sm">Delivery Date</label>
              <DatePicker
                selected={item.deliveryDate}
                onChange={(date) => updateDeliveryDate(index, date as Date)}
                dateFormat="dd MMM yyyy"
                className="border py-2 px-4 rounded-md font-semibold w-full sm:w-44"
              />
            </div>

            <div
              className="rounded-full p-2 cursor-pointer w-10 self-start"
              style={{ backgroundColor: item.bg }}
              onClick={() => removeItem(index)}
            >
              <FaTrashAlt className="text-red-500 w-full h-auto" />
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
