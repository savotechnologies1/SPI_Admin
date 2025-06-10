import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const ItemSelector = () => {
  const availableItems = [
    {
      id: 1,
      name: "(S) Driven GMT800 EXT",
      qty: 5,
      forecast: "100",
      hours: 91,
      avl: 4,
      need: 2,
    },
    {
      id: 2,
      name: "(M) Thermoform Alpha",
      qty: 3,
      forecast: "80",
      hours: 67,
      avl: 3,
      need: 1,
    },
    {
      id: 3,
      name: "(L) Heated Press BETA",
      qty: 7,
      forecast: "60",
      hours: 75,
      avl: 5,
      need: 2,
    },
  ];

  const [selectedItems, setSelectedItems] = useState<
    {
      id: number;
      name: string;
      forecast: string;
      hours: number;
      avl: number;
      need: number;
    }[]
  >([]);

  const addItem = (item: {
    id: number;
    name: string;
    forecast: string;
    hours: number;
    avl: number;
    need: number;
  }) => {
    const alreadyExists = selectedItems.some((i) => i.id === item.id);
    if (!alreadyExists) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(updatedItems);
  };

  return (
    <div className="py-6 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-xl p-4">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available Items:</h2>
          <div className="space-y-4">
            {availableItems.map((item) => {
              const alreadyAdded = selectedItems.some((i) => i.id === item.id);
              return (
                <div
                  key={item.id}
                  className="hover:bg-brand hover:text-white p-4 rounded-lg shadow-sm flex justify-between items-center border"
                >
                  <div>
                    <p className="font-semibold hover:text-white">
                      {item.name}
                    </p>
                    <p className="text-sm hover:text-white">
                      Qty Available: {item.qty}
                    </p>
                  </div>
                  <button
                    onClick={() => addItem(item )}
                    disabled={alreadyAdded}
                    className={`text-xl items-center ${
                      alreadyAdded
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:text-white"
                    }`}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Selected Items:</h2>
          <div className="space-y-4">
            {selectedItems.map(
              ({ id, name, forecast, hours, avl, need }, index) => (
                <div
                  key={id}
                  className="p-2 rounded-lg shadow-sm border border-dashed flex flex-col sm:flex-row justify-between items-center gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">{name}</p>
                    <div className="flex text-sm text-gray-500 space-x-4">
                      <p>Avl: {avl}</p>
                      <p>Need: {need}</p>
                      <p>Forecast: {forecast}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                    <div className="bg-brand text-white px-4 py-2 rounded-lg">
                      {hours} Hrs
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSelector;
