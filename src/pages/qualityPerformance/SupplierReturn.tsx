import data from "../../components/Data/customerReturnData";
import client_icon from "../../assets/client.png";
import date_icon from "../../assets/date.png";
import pin from "../../assets/pin.png";
import copy from "../../assets/copy.png";
import filter from "../../assets/byte_filter.png";
import fullscren from "../../assets/fullscreen.png";
import more from "../../assets/more.png";

// const SupplierReturn = () => {
//   return (
//     <div className=" py-6 bg-white rounded-lg">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
//         <div>
//           {" "}
//           <h1 className="text-xl font-semibold px-4  ">Supplier Return</h1>
//         </div>
//         {/* <div className="flex flex-col sm:flex-row  gap-2 items-center px-4">
//           <div className=" p-2  flex items-center gap-2">
//             <img src={pin} alt="" />
//             <img src={copy} alt="" />
//             <img src={filter} alt="" />
//             <img src={fullscren} alt="" />
//             <img className="rotate-90" src={more} alt="" />
//           </div>
//         </div> */}
//       </div>

//       <div className="overflow-x-auto py-6 ">
//         <table className="w-full  bg-white">
//           <thead>
//             <tr className="border-b ">
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img src={date_icon} alt="" />
//                   </p>
//                   <p> Date</p>
//                 </div>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img className="" src={client_icon} alt="" />
//                   </p>
//                   <p> Customer Name</p>
//                 </div>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <p>Part </p>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <p>Is Scrap</p>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <p> Defect</p>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <p>Qty </p>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className=" ">
//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   {item.date}
//                 </td>
//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   <p className="font-medium font-sm"> {item.name}</p>
//                 </td>

//                 <td className="px-4 py-4 ">{item.part}</td>
//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   {item.scrap}
//                 </td>

//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   {item.defect}
//                 </td>
//                 <td className="px-4 py-4 text-sm sm:text-base  ">{item.qty}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SupplierReturn;
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Don't forget to import the CSS

// import pin from '../assets/pin.svg';
// import copy from '../assets/copy.svg';
// import filter from '../assets/filter.svg';
// import fullscren from '../assets/fullscren.svg';
// import more from '../assets/more.svg';

// const SupplierReturn = () => {
//   const [startDate, setStartDate] = useState(new Date()); // Default to today
//   const [endDate, setEndDate] = useState(new Date()); // Default to today
//   const [supplierReturnData, setSupplierReturnData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Function to fetch data from your API
//   const fetchSupplierReturns = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Format dates to YYYY-MM-DD for API
//       const formattedStartDate = startDate.toISOString().split("T")[0];
//       const formattedEndDate = endDate.toISOString().split("T")[0];

//       // Construct URL with query parameters
//       const response = await fetch(
//         `http://localhost:8080/api/admin/supplier-return?startDate=${formattedStartDate}&endDate=${formattedEndDate}`
//         // You might need to adjust the base URL if your API is not on the same origin
//       );
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
//       setSupplierReturnData(result.data);
//     } catch (err) {
//       setError(err.message);
//       console.error("Failed to fetch supplier returns:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch data whenever startDate or endDate changes
//   useEffect(() => {
//     fetchSupplierReturns();
//   }, [startDate, endDate]); // Dependency array: re-run when these dates change

//   return (
//     <div className=" py-6 bg-white rounded-lg">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-4">
//         <div>
//           <h1 className="text-xl font-semibold ">Supplier Return</h1>
//         </div>
//         <div className="flex gap-4 items-center">
//           {/* Date Pickers */}
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             selectsStart
//             startDate={startDate}
//             endDate={endDate}
//             className="text-sm hover:cursor-pointer border rounded-md p-1"
//             dateFormat="dd/MM/yyyy"
//           />
//           <span>-</span>
//           <DatePicker
//             selected={endDate}
//             onChange={(date) => setEndDate(date)}
//             selectsEnd
//             startDate={startDate}
//             endDate={endDate}
//             minDate={startDate}
//             className="text-sm hover:cursor-pointer border rounded-md p-1"
//             dateFormat="dd/MM/yyyy"
//           />
//         </div>
//       </div>

//       <div className="overflow-x-auto py-6 ">
//         <table className="w-full  bg-white">
//           <thead>
//             <tr className="border-b ">
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img src={date_icon} alt="" />
//                   </p>
//                   <p> Date</p>
//                 </div>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img className="" src={client_icon} alt="" />
//                   </p>
//                   <p> Supplier Name</p> {/* Changed to Supplier Name */}
//                 </div>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <p>Part Number </p> {/* Changed from Part */}
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <p>Is Scrap</p>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <p> Quantity </p> {/* Changed from Defect to Quantity */}
//               </th>
//               {/* Removed Qty column as 'returnQuantity' seems more appropriate */}
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   Loading supplier returns...
//                 </td>
//               </tr>
//             )}
//             {error && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-red-500">
//                   Error: {error}
//                 </td>
//               </tr>
//             )}
//             {!loading && !error && supplierReturnData.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4">
//                   No supplier returns found for the selected date range.
//                 </td>
//               </tr>
//             )}
//             {!loading &&
//               !error &&
//               supplierReturnData.map((item) => (
//                 <tr key={item.id} className=" ">
//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     {new Date(item.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     <p className="font-medium font-sm">
//                       {item.supplier
//                         ? `${item.supplier.firstName || ""} ${
//                             item.supplier.lastName || ""
//                           }`.trim()
//                         : "N/A"}
//                     </p>
//                   </td>

//                   <td className="px-4 py-4 ">
//                     {item.PartNumber ? item.PartNumber.partNumber : "N/A"}
//                   </td>
//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     {item.scrapStatus ? "Yes" : "No"}
//                   </td>

//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     {item.returnQuantity || 0}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SupplierReturn;

const SupplierReturn = ({ data, loading, error }) => {
  return (
    <div className=" py-6 bg-white rounded-lg">
      <h2 className="text-lg font-semibold px-4">Supplier Return</h2>
      <div className="overflow-x-auto py-6 ">
        <table className="w-full  bg-white">
          <thead>
            <tr className="border-b ">
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Supplier Name</th>
              <th className="px-4 py-3 text-left font-medium">Part Number</th>
              <th className="px-4 py-3 text-left font-medium">Is Scrap</th>
              <th className="px-4 py-3 text-left font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Loading supplier returns...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-red-500">
                  Error: {error}
                </td>
              </tr>
            )}
            {!loading && !error && data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No supplier returns found for the selected date range.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              data.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.supplier
                      ? `${item.supplier.firstName || ""} ${
                          item.supplier.lastName || ""
                        }`.trim()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.PartNumber ? item.PartNumber.partNumber : "N/A"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.scrapStatus ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {item.returnQuantity || 0}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierReturn;
