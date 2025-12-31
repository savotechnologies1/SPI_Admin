import { useContext, useEffect, useState } from "react";
import { PartContext } from "../../components/Context/PartContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircle, FaEdit, FaTrash } from "react-icons/fa";
import edit from "../../assets/edit_icon.png";
import add from "../../assets/add.png";
import { bomList, deletePartNumber } from "./https/partProductApis";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// export default function PartTable() {
//   const partContext = useContext(PartContext);

//   if (!partContext) {
//     throw new Error(
//       "PartContext is undefined. Ensure it is properly provided."
//     );
//   }
//   const navigate = useNavigate();

//   const handleClick = (id, type) => {
//     if (type === "part") {
//       console.log("333");

//       navigate(`/edit-part/${id}`);
//     } else {
//       console.log("3243");

//       navigate(`/edit-product/${id}`);
//     }
//   };
//   const [customerData, setCustomerData] = useState<CustomerItem[]>([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchVal, setSearchVal] = useState("");
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);

//   const [selectedValue, setSelectedValue] = useState("all");
//   const handleChange = (e) => {
//     try {
//       setSearchVal(e.target.value);
//     } catch (error) {
//       throw error;
//     }
//   };
//   const rowsPerPage = 5;

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };
//   const fetchCustomerList = async (page = 1) => {
//     try {
//       const response = await bomList(
//         page,
//         rowsPerPage,
//         searchVal,
//         selectedValue
//       );
//       setCustomerData(response.data);
//       setTotalPages(response.pagination?.totalPages || 1);
//     } catch (error) {
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchCustomerList(currentPage);
//   }, [currentPage, searchVal, selectedValue]);
//   const handleDelete = async (id: string) => {
//     try {
//       deletePartNumber(id).then();
//       await new Promise((r) => setTimeout(r, 500));
//       await fetchCustomerList(currentPage);
//     } catch (error: unknown) {
//       throw error;
//     }
//   };

//   const handleSelectChange = (event) => {
//     const newValue = event.target.value;
//     setSelectedValue(newValue);

//     console.log("A new option was selected:", selectedValue);
//   };
//   return (
//     <div className="p-4 mt-5">
//       <div className="flex justify-between mt-8">
//         {" "}
//         <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
//           Browse BOM
//         </h1>
//         <div className="flex relative">
//           <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
//             <NavLink to="/partform">
//               <span className="">New Part Number</span>
//             </NavLink>
//           </button>
//           <div className="absolute top-3 left-2">
//             <img src={add} alt="" className="w-4 h-4" />
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-between  items-center">
//         <div className="flex gap-2 items-center ">
//           <p
//             className={`text-[14px] text-black`}
//             onClick={() => "dashboardDetailes"}
//           >
//             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
//           </p>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer">
//             product and Bom
//           </span>
//           <span>
//             <FaCircle className="text-[6px] text-gray-500" />
//           </span>
//           <span className="text-[14px] hover:cursor-pointer"> Browse bom</span>
//         </div>
//       </div>
//       <div className="flex justify-end">
//         <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
//           <select
//             id="work-instruction-filter"
//             className="border w-full md:w-2/3 px-3 py-2 rounded-md"
//             value={selectedValue}
//             onChange={handleSelectChange}
//           >
//             <option value="">All</option>
//             <option value="part">All parts</option>
//             <option value="product">All products</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search by part number..."
//             className="border w-full md:w-3/3 px-3 py-2 rounded-md"
//             value={searchVal}
//             onChange={(e) => handleChange(e)}
//           />
//         </div>
//       </div>
//       <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse  border-gray-300">
//             <thead className="bg-gray-200">
//               <tr className="whitespace-nowrap">
//                 <th className="border p-2 font-semibold text-gray-600">
//                   Part Number
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600">
//                   Part Family
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600">
//                   Part Description
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600">Cost</th>
//                 <th className="border p-2 font-semibold text-gray-600">
//                   LeadTimeDays
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600">
//                   order qty.
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600">
//                   Minimum qty
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600">
//                   Available qty
//                 </th>
//                 <th className="border p-2 font-semibold text-gray-600"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {customerData.map((part, index) => (
//                 <tr key={index} className="hover:bg-gray-100 text-center">
//                   <td className="border-b border-dashed p-2">
//                     {part.partNumber}
//                   </td>
//                   <td className="border-b border-dashed p-2">
//                     {part.partFamily}
//                   </td>
//                   <td className="border-b border-dashed p-2">
//                     {part.partDescription}
//                   </td>
//                   <td className="border-b border-dashed p-2">${part.cost}</td>
//                   <td className="border-b border-dashed p-2">
//                     {part.leadTime} Days
//                   </td>
//                   <td className="border-b border-dashed p-2">
//                     {part.supplierOrderQty}
//                   </td>
//                   <td className="border-b border-dashed p-2">
//                     {part.minStock}
//                   </td>
//                   <td className="border-b border-dashed p-2">
//                     {part.availStock}
//                   </td>
//                   <td className="flex items-center gap-4 border-b border-dashed p-2">
//                     <img
//                       src={edit}
//                       alt="Edit"
//                       onClick={() => handleClick(part.part_id, part.type)}
//                       className="w-4 h-4 md:w-5 md:h-5"
//                     />

//                     <button className="text-brand hover:underline">
//                       <FaTrash
//                         className="text-red-500 cursor-pointer"
//                         onClick={() => setConfirmDeleteId(part.part_id)}
//                       />
//                       {confirmDeleteId === part.part_id && (
//                         <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
//                           <div className="bg-white p-6 rounded-xl shadow-lg">
//                             <h2 className="text-lg font-semibold mb-4">
//                               Are you sure?
//                             </h2>
//                             <p className="mb-4">
//                               Do you really want to delete this part?
//                             </p>
//                             <div className="flex justify-end space-x-3">
//                               <button
//                                 className="px-4 py-2 bg-gray-300 rounded"
//                                 onClick={() => setConfirmDeleteId(null)}
//                               >
//                                 Cancel
//                               </button>
//                               <button
//                                 className="px-4 py-2 bg-red-500 text-white rounded"
//                                 onClick={async () => {
//                                   await handleDelete(confirmDeleteId);
//                                   setConfirmDeleteId(null);
//                                 }}
//                               >
//                                 Delete
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="flex flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2 ">
//         <p className="text-xs md:text-sm text-gray-600">
//           Page {currentPage} of {totalPages}
//         </p>

//         <div className="flex gap-2">
//           <button
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//             className={`p-1 md:p-2 rounded ${
//               currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             <FontAwesomeIcon icon={faArrowLeft} />
//           </button>

//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className={`p-1 md:p-2 rounded ${
//               currentPage === totalPages
//                 ? "opacity-50 cursor-not-allowed"
//                 : "hover:bg-gray-300"
//             }`}
//           >
//             <FontAwesomeIcon icon={faArrowRight} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// Define the data type for clarity and type safety
interface PartData {
  part_id: string;
  partNumber: string;
  partFamily: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty: number;
  minStock: number;
  availStock: number;
  type: string;
}

export default function PartTable() {
  const partContext = useContext(PartContext);
  if (!partContext) {
    throw new Error(
      "PartContext is undefined. Ensure it is properly provided."
    );
  }
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState<PartData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const rowsPerPage = 10;

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const fetchCustomerList = async (page: number) => {
    try {
      const response = await bomList(
        page,
        rowsPerPage,
        searchVal,
        selectedValue
      );
      setCustomerData(response.data);
      setTotalPages(response.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePartNumber(id);
      if (response.status === 200) {
        toast.success(response.data.message);
        await new Promise((r) => setTimeout(r, 500));
        await fetchCustomerList(currentPage);
      }
    } catch (error: unknown) {
      console.error("Failed to delete part:", error);
      toast.error("Failed to delete part. Please try again.");
    }
  };

  // Re-fetch data whenever pagination, search, or filter values change
  useEffect(() => {
    fetchCustomerList(currentPage);
  }, [currentPage, searchVal, selectedValue]);

  const handleClick = (id: string, type: string) => {
    if (type === "part") {
      navigate(`/edit-part/${id}`);
    } else {
      navigate(`/edit-product/${id}`);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="p-4 mt-5">
      <div className="flex justify-between mt-8">
        <h1 className="font-semibold text-[20px] md:text-[24px] text-black">
          Browse BOM
        </h1>
        <div className="relative">
          <button className="py-2 px-7 rounded-lg border-gray-100 bg-brand text-white flex gap-1 items-center h-fit hover:cursor-pointer">
            <NavLink to="/partform">
              <span>New Part Number</span>
            </NavLink>
          </button>
          <div className="absolute top-3 left-2">
            <img src={add} alt="" className="w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <NavLink to="/dashboardDetailes" className="text-[14px] text-black">
            Dashboard
          </NavLink>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">
            Product and BOM
          </span>
          <span>
            <FaCircle className="text-[6px] text-gray-500" />
          </span>
          <span className="text-[14px] hover:cursor-pointer">Browse BOM</span>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          {/* <select
            id="work-instruction-filter"
            className="border w-full md:w-2/3 px-3 py-2 rounded-md"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="all">All</option>
            <option value="part">All parts</option>
            <option value="product">All products</option>
          </select> */}
          <input
            type="text"
            placeholder="Search by part number..."
            className="border w-full md:w-3/3 px-3 py-2 rounded-md"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
      </div>
      <div className="mx-auto p-6 bg-white shadow-lg rounded-lg mt-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border-gray-300">
            <thead className="bg-gray-200">
              <tr className="whitespace-nowrap">
                <th className="border p-2 font-semibold text-gray-600">
                  Part Number
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Part Family
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Part Description
                </th>
                <th className="border p-2 font-semibold text-gray-600">Cost</th>
                <th className="border p-2 font-semibold text-gray-600">
                  LeadTimeDays
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Order Qty.
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Minimum Qty
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Available Qty
                </th>
                <th className="border p-2 font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {customerData.length > 0 ? (
                customerData.map((part) => (
                  <tr
                    key={part.part_id}
                    className="hover:bg-gray-100 text-center md:text-center break-words"
                  >
                    <td className="border-b border-dashed p-2 max-w-[120px] truncate md:break-words">
                      {part.partNumber}
                    </td>
                    <td className="border-b border-dashed p-2 max-w-[150px] truncate md:break-words">
                      {part.partFamily}
                    </td>
                    <td className="border-b border-dashed p-2 max-w-[200px] break-words">
                      {part.partDescription || "—"}
                    </td>
                    <td className="border-b border-dashed p-2">${part.cost}</td>
                    <td className="border-b border-dashed p-2">
                      {part.leadTime
                        ? `${part.leadTime} ${
                            part.leadTime > 1 ? "days" : "day"
                          }`
                        : "Not Available"}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {part.supplierOrderQty}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {part.minStock}
                    </td>
                    <td className="border-b border-dashed p-2">
                      {part.availStock}
                    </td>
                    <td className="border-b border-dashed p-2 text-center">
                      <div className="flex items-center justify-center space-x-2 md:space-x-4">
                        <img
                          src={edit}
                          alt="Edit"
                          onClick={() => handleClick(part.part_id, part.type)}
                          className="w-5 h-5 md:w-6 md:h-6 cursor-pointer"
                        />
                        <FaTrash
                          className="text-red-500 w-5 h-5 md:w-6 md:h-6 cursor-pointer"
                          onClick={() => setDeleteTargetId(part.part_id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="text-center py-4 text-sm text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal (Rendered once) */}
      {deleteTargetId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-4">Do you really want to delete this part?</p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setDeleteTargetId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={async () => {
                  await handleDelete(deleteTargetId);
                  setDeleteTargetId(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row justify-between items-center bg-white py-2 px-2 md:px-4 gap-2 ">
        <p className="text-xs md:text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`p-1 md:p-2 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-1 md:p-2 rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
