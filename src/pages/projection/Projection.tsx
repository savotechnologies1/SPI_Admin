import React, { useState } from "react";
import img1 from "../../assets/green.png";
import img2 from "../../assets/yellow.png";
import img3 from "../../assets/orange.png";
import scrap_1 from "../../assets/scrap_1.png";
import scrap_2 from "../../assets/scrap_2.png";
import scrap_3 from "../../assets/scrap_3.png";
import scrap_cost from "../../assets/scrap_cost.png";
import customer_return from "../../assets/customer_return.png";
import supplier_return from "../../assets/supplier_return.png";
import shape_2 from "../../assets/shape_2.png";
import shape_3 from "../../assets/shape_3.png";
import green from "../../assets/green.png";
import orange from "../../assets/orange.png";
import FormingTemp from "../Operation_performance/Forming_temp";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";

const data_1 = [
  {
    num: "$5,00,000",
    text: "Scrap Cost",
    img: img1,
    scrap: scrap_1,
    scrap_img: scrap_cost,
    increase: "-$10k",
    bgColor: "bg-orange-50",
    textColor: "text-red-500",
  },
  {
    num: "01",
    text: "Customer Return",
    img: img2,
    scrap: scrap_2,
    scrap_img: customer_return,
    increase: "+200",
    bgColor: "bg-green-50",
    textColor: "text-green-500",
  },
  {
    num: "15,000",
    text: "Supplier Return",
    img: img3,
    scrap: scrap_3,
    scrap_img: supplier_return,
    increase: "+200",
    bgColor: "bg-blue-50",
    textColor: "text-green-500",
  },
];
const data_2 = [
  {
    num: "129",
    text: "Actual",
    img: green,
    shape: shape_2,
  },
  {
    num: "1",
    text: "Scrap",
    img: orange,
    shape: shape_3,
  },
];

const sampleData = [
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "Jerome",
    "Last Name": "McCoy",
    "Product Qty": "0",
  },
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "McCoy",
    "Last Name": "diann",

    "Product Qty": "0",
  },
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "Black",
    "Last Name": "diann",

    "Product Qty": "0",
  },
  {
    Date: "25/02/2025",
    Order: "159678",
    Qty: "01",
    "First Name": "McCoy",
    "Last Name": "diann",

    "Product Qty": "0",
  },
];

const columnsManual = [
  "Date",
  "Order",
  "First Name",
  "Last Name",
  "Product Qty",
  "Qty",
];

const Projection = () => {
   const [data, setData] = useState([
      {
        id: 1,
        partNumber: "10001",
        desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
        qty: 2560,
        stock: 2001,
        cost: 14.92,
        leadTime: "320 days",
        partFamily: "part 01"
      },
      {
        id: 2,
        partNumber: "10001",
        desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
        supplier: "Darrell Steward",
        qty: 2560,
        stock: 2001,
        cost: 14.92,
        leadTime: "320 days",
          partFamily: "part 01"

      },
      {
        id: 3,
        partNumber: "10001",
        desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
        supplier: "Robert Fox",
        qty: 2560,
        stock: 2001,
        cost: 14.92,
        leadTime: "320 days",
          partFamily: "part 01"

      },
      {
        id: 4,
        partNumber: "10001",
        desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
        supplier: "Marvin McKin",
        qty: 2560,
        stock: 2001,
        cost: 14.92,
        leadTime: "320 days",
          partFamily: "part 01"

      },
      {
        id: 4,
        partNumber: "10001",
        desc: "24'x96' Virgin ABS, black smooth/smooth 070 sheet",
        supplier: "Marvin McKin",
        qty: 2560,
        stock: 2001,
        cost: 14.92,
        leadTime: "320 days",
          partFamily: "part 01"

      },
    ]);
  
    const [editingRow, setEditingRow] = useState(null);
    const [editedData, setEditedData] = useState({
      qty: "",
      stock: "",
      cost: "",
    });
  
    // Handle Edit Click
    const handleEditClick = (index:any) => {
      setEditingRow(index);
      setEditedData({
        qty: data[index].qty.toString(),
        stock: data[index].stock.toString(),
        cost: data[index].cost.toString(),
      });
    };
  
    // Handle Change in Input Fields
    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setEditedData((prev) => ({ ...prev, [name]: value }));
    };
  
    // Save the Updated Data
    const handleUpdate = (index:any) => {
      const updatedData = [...data];
      updatedData[index] = {
        ...updatedData[index],
        qty: Number(editedData.qty),
        stock: Number(editedData.stock),
        cost: Number(editedData.cost),
      };
      setData(updatedData);
      setEditingRow(null);
    };
  
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;
    const totalPages = Math.ceil(data.length / rowsPerPage);
  
   
    const goToPreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    const goToNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  return (
    <div className="p-7">
      <h1 className="font-bold text-[20px] md:text-[24px] text-black">
        Projection
      </h1>

      <div className="mt-6">
        <h1 className="font-semibold text-xl">Inventory</h1>
        <div className="flex flex-col md:flex-row  mt-2 gap-4  ">
          {data_1.map((item) => (
            <div className="flex flex-col justify-between  bg-white  rounded-md w-full p-2 gap-2 border bg-gradient-to-l from-[#FFF7ED]">
              {" "}
              <div className="flex items-center gap-2">
                <div>
                  <img className="w-[40px]" src={item.scrap_img} alt="" />
                </div>
                <div className="">
                  {" "}
                  <p className="text-sm text-gray-600">{item.text}</p>
                  <p className="font-bold text-xl">{item.num}</p>
                </div>
              </div>
              <div>
                <img src={item.scrap} alt="" />
              </div>
              <div className="text-sm text-gray-600">
                Increase by{" "}
                <span
                  className={`font-semibold rounded-md text-xs  ${item.textColor} ${item.bgColor}`}
                >
                  {" "}
                  {item.increase}
                </span>{" "}
                this week
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row  mt-6 gap-4  ">
        {data_2.map((item) => (
          <div className="flex justify-between items-center bg-white  rounded-md  w-full">
            {" "}
            <div className="p-2">
              {" "}
              <p className="font-bold text-2xl">{item.num}</p>
              <p>{item.text}</p>
            </div>
            <div className="relative right-0">
              <img className="w-14" src={item.shape} alt="" />
              <div className="absolute right-2 top-4">
                <img src={item.img} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row mt-6 gap-4">
        <div className="bg-white  rounded-2xl p-4 w-full md:w-1/2">
          <h3 className="text-lg font-semibold mb-3">Cash Flow Needed</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {columnsManual.map((col, i) => (
                    <th
                      key={i}
                      className="px-2 py-2 border text-[#637381] text-xs"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, i) => (
                  <tr key={i} className="even:bg-gray-50">
                    {columnsManual.map((col, j) => (
                      <td key={j} className="px-3 py-2  text-[14px]">
                        {row[col as keyof typeof row]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border rounded-md shadow-md w-full  md:w-1/2">
            <FormingTemp />
          </div>
      </div>


       <div className="bg-white p-2 mt-6 rounded-xl overflow-x-auto   ">
        <h1 className="font-semibold p-2">Cash Flow  Schedule</h1>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm whitespace-nowrap">
                    <th className="text-left p-3">Part Number</th>
                    <th className="text-left p-3">Part Family</th>
                    <th className="text-left p-3">Part Desc</th>
                    <th className="text-left p-3">Cost </th>
                    <th className="text-left p-3">LeadTimeDays</th>
                    <th className="text-left p-3">Available Stock</th>
                    <th className="text-left p-3">order qty</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <tr className="border-b hover:bg-gray-50 text-sm">
                        <td className="p-3">{item.partNumber}</td>
                        <td className="p-3 whitespace-nowrap xl:whitespace-normal">{item.partFamily}</td>
                        <td className="p-3 whitespace-nowrap xl:whitespace-normal">{item.desc}</td>
                        <td className="p-3">{item.cost}</td>
                        <td className="p-3">{item.leadTime}</td>
                        <td className="p-3">{item.stock}</td>
                        <td className="p-3">{item.qty}</td>
                        <td className="p-3 flex items-center gap-4">
                          {/* Edit Icon */}
                          <FiEdit2
                            onClick={() => handleEditClick(index)}
                            className="text-black  cursor-pointer text-lg"
                            title="Quick Edit"
                          />
                          {/* More Icon */}
                          <BsThreeDotsVertical
                            className="text-black hover:text-black cursor-pointer text-lg"
                            title="More Options"
                          />
                        </td>
                      </tr>
      
                      {/* Editable Row */}
                      {editingRow === index && (
                        <tr className="bg-gray-50 ">
                          <td colSpan={5} className="p-3 font-semibold text-gray-600">
                            {item.desc}
                          </td>
                          <td className="p-3">
                            <div>
                              <label className="font-semibold text-xs">
                                order qty{" "}
                              </label>
      
                              <input
                                type="number"
                                name="qty"
                                value={editedData.qty}
                                onChange={handleChange}
                                className="border px-3 py-2 rounded-md w-full"
                                placeholder="Quantity"
                              />
                            </div>
                          </td>
                        
                          <td className="p-3">
                            <div>
                              <label className="font-semibold text-xs">
                                Current Stock{" "}
                              </label>
                              <input
                                type="number"
                                name="cost"
                                value={editedData.cost}
                                onChange={handleChange}
                                className="border px-3 py-2 rounded-md w-full"
                                placeholder="Cost"
                              />
                            </div>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleUpdate(index)}
                              className="bg-brand text-white px-3 py-1 rounded-md  transition"
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
      
              {/* Pagination */}
              <div className="flex justify-between items-center mt-4 p-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`md:px-2 md:py-2 rounded-md ${
                    currentPage === 1 ? "bg-gray-300" : "bg-brand text-white"
                  }`}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 md:py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-300"
                      : "bg-brand text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
    </div>
  );
};

export default Projection;
