import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import add from "../../assets/add.png";

interface WorkInstructionItem {
  id: string;
  imageUrl: string;
  name: string;
  partDesc: string;
  stepNumber: string;
  description: string;
  submitDate: string;
  statusColor: string; 
}

const mockData: WorkInstructionItem[] = [
  {
    id: "1",
    imageUrl: "/avatar1.jpg",
    name: "John Smith",
    partDesc: "Cut Trim",
    stepNumber: "Step 1",
    description: "Remove burn and sharp edges",
    submitDate: "18/09/2016",
    statusColor: "green",
  },
  {
    id: "2",
    imageUrl: "/avatar2.jpg",
    name: "Emily Johnson",
    partDesc: "Cut Trim",
    stepNumber: "Step 2",
    description: "Remove burn and sharp edges",
    submitDate: "12/06/2020",
    statusColor: "yellow",
  },
  {
    id: "3",
    imageUrl: "/avatar3.jpg",
    name: "Michael Brown",
    partDesc: "Cut Trim",
    stepNumber: "Step 3",
    description: "Remove burn and sharp edges",
    submitDate: "15/08/2017",
    statusColor: "red",
  },
  {
    id: "4",
    imageUrl: "/avatar4.jpg",
    name: "Sarah Wilson",
    partDesc: "Cut Trim",
    stepNumber: "Step 4",
    description: "Remove burn and sharp edges",
    submitDate: "07/05/2016",
    statusColor: "gray",
  },
  {
    id: "5",
    imageUrl: "/avatar5.jpg",
    name: "David Lee",
    partDesc: "Cut Trim",
    stepNumber: "Step 5",
    description: "Remove burn and sharp edges",
    submitDate: "28/10/2012",
    statusColor: "green",
  },
];



const WorkInstructionList: React.FC = () => {
  const [openOptionsIndex, setOpenOptionsIndex] = useState<number | null>(null);
  const rowsPerPage = 4;
  const currentPage = 2;

  const toggleOptions = (index: number) => {
    setOpenOptionsIndex((prev) => (prev === index ? null : index));
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-200 text-green-700";
      case "yellow":
        return "bg-yellow-200 text-yellow-800";
      case "red":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  const navigate = useNavigate ();
const handleEdit = (id:string) =>{
  navigate(`/edit-work-instruction/${id}`);
}

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
    <div className="flex justify-between">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black mb-2">
        List of Work Instruction
      </h1>
  
          <div className="flex relative">
            <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
              <NavLink to="/add-work-instruction">
                <span className="">New Work Instruction</span>
              </NavLink>
            </button>
            <div className="absolute top-3 left-2">
              <img src={add} alt="" className="w-4 h-4" />
            </div>
          </div>
      </div>
      <div className="flex gap-2 items-center text-sm text-gray-500">
        <NavLink to="/dashboardDetailes">Dashboard</NavLink>
        <FaCircle className="text-[6px]" />
        <span>Work Instruction</span>
        <FaCircle className="text-[6px]" />
        <span>List of Work Instruction</span>
      </div>

      <div className="bg-white p-4 mt-6 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <select className="border w-full md:w-1/3 px-3 py-2 rounded-md">
            <option>Project Cordinator</option>
          </select>
          
          <input
            type="text"
            placeholder="Search..."
            className="border w-full md:w-2/3 px-3 py-2 rounded-md"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3">Name & Email</th>
                <th className="px-4 py-3">Part Desc</th>
                <th className="px-4 py-3">Steps Numbers</th>
                <th className="px-4 py-3">Work Instruction Description</th>
                <th className="px-4 py-3">Submit Date</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <img
                      src={item.imageUrl}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{item.name}</span>
                  </td>
                  <td className="px-4 py-3">{item.partDesc}</td>
                  <td className="px-4 py-3">{item.stepNumber}</td>
                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getColorClass(
                        item.statusColor
                      )}`}
                    >
                      {item.submitDate}
                    </span>
                  </td>
                  <td className="px-4 py-3 relative flex items-center gap-4">
                    <FiEdit2

                        onClick={()=>handleEdit(item.id)}

                      className="cursor-pointer text-lg"
                      title="Quick edit"
                    />
                    <BsThreeDotsVertical
                      className="cursor-pointer text-lg"
                      onClick={() => toggleOptions(index)}
                    />
                    {openOptionsIndex === index && (
                      <div className="absolute right-0 mt-8 w-32 bg-white border border-gray-200 rounded shadow-md z-10">
                        <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Edit
                        </button>
                        <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <span>Rows per page: 5</span>
          <span>
            {rowsPerPage * (currentPage - 1) + 1} - {rowsPerPage * currentPage} of 11
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkInstructionList;


