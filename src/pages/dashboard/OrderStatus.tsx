import data from "../../components/Data/orderStatusData";
import client_icon from "../../assets/client.png";
import date_icon from "../../assets/date.png";
import calender from "../../assets/Calendar.png";
import bin from "../../assets/Bin.png";
import pencil from "../../assets/Pencil Icon.png";

// const OrderStatus = ({ orders }) => {
//   console.log("ordersordersorders", orders);

//   const getStatusClass = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "delivered":
//         return "bg-green-100 text-green-600";
//       case "cancelled":
//         return "bg-red-100 text-red-600";
//       case "pending":
//         return "bg-yellow-100 text-yellow-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };
//   return (
//     <div className=" py-6 bg-white rounded-lg">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
//         <div>
//           {" "}
//           <h1 className="text-xl font-semibold px-4  ">Orders Status</h1>
//         </div>
//         <div className="flex sm:flex-row  gap-2 items-center px-4">
//           <div className="border p-2 rounded-md border-black flex items-center gap-2">
//             <img src={calender} alt="" />
//             <select className="outline-none">
//               <option value="">Jan 2024</option>
//               <option value="">feb 2025</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto py-6">
//         <table className="w-full  bg-white">
//           <thead>
//             <tr className="border-b whitespace-nowrap">
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <input type="checkbox" />
//                   </p>
//                   <p> Process</p>
//                 </div>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img className="" src={client_icon} alt="" />
//                   </p>
//                   <p> Employee</p>
//                 </div>
//               </th>
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
//                     <img src="" alt="" />
//                   </p>
//                   <p>Status </p>
//                 </div>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img src="" alt="" />
//                   </p>
//                   <p>Country </p>
//                 </div>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <p> Total</p>
//               </th>
//               <th className="px-4 py-3 text-left font-medium">
//                 <p> </p>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className=" ">
//                 <td className="px-4 py-4">
//                   <div className="flex items-center">
//                     <div className=" mr-4">
//                       <input type="checkbox" />
//                     </div>
//                     <div>
//                       <p className="text-sm sm:text-base font- ">
//                         {item.orderId}
//                       </p>
//                     </div>
//                   </div>
//                 </td>

//                 <td className="px-4 py-4 text-sm sm:text-base  whitespace-nowrap">
//                   <p className="font-medium font-sm"> {item.name}</p>
//                   <p className="text-gray-600 text-[14px]"> {item.email}</p>
//                 </td>
//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   {item.date}
//                 </td>
//                 <td className="px-4 py-4">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
//                       item.status
//                     )}`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   {item.country}
//                 </td>
//                 <td className="px-4 py-4 text-sm sm:text-base  ">
//                   {item.total}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderStatus;

// import React, { useState } from "react";

// interface Order {
//   process: string;
//   employee: string;
//   email: string;
//   date: string;
//   status: string;
//   total: string;
//   // Assuming there's a country field based on your table header
//   country?: string;
// }

// interface OrderStatusProps {
//   orders: Order[];
//   onMonthChange: (month: string) => void; // Callback to send selected month to parent
// }

// const OrderStatus: React.FC<OrderStatusProps> = ({ orders, onMonthChange }) => {
//   const [selectedMonth, setSelectedMonth] = useState(""); // State to hold the selected month

//   console.log("ordersordersorders", orders);

//   const getStatusClass = (status: string) => {
//     switch (status?.toLowerCase()) {
//       case "completed": // Changed from 'delivered' to 'completed' based on your data
//         return "bg-green-100 text-green-600";
//       case "cancelled":
//         return "bg-red-100 text-red-600";
//       case "new": // Changed from 'pending' to 'new' based on your data
//         return "bg-yellow-100 text-yellow-600";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const handleMonthSelection = (
//     event: React.ChangeEvent<HTMLSelectElement>
//   ) => {
//     const month = event.target.value;
//     setSelectedMonth(month);
//     onMonthChange(month); // Call the prop function to send the month to the parent
//   };

//   // Helper to format date for display if needed, or just use item.date
//   const formatDateForDisplay = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className=" py-6 bg-white rounded-lg">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
//         <div>
//           <h1 className="text-xl font-semibold px-4  ">Orders Status</h1>
//         </div>
//         <div className="flex sm:flex-row  gap-2 items-center px-4">
//           <div className="border p-2 rounded-md border-black flex items-center gap-2">
//             <img src={calender} alt="" />
//             <select
//               className="outline-none"
//               onChange={handleMonthSelection}
//               value={selectedMonth}
//             >
//               <option value="">All Months</option>{" "}
//               {/* Added an option for all months */}
//               <option value="01">Jan</option>
//               <option value="02">Feb</option>
//               <option value="03">Mar</option>
//               <option value="04">Apr</option>
//               <option value="05">May</option>
//               <option value="06">Jun</option>
//               <option value="07">Jul</option>
//               <option value="08">Aug</option>
//               <option value="09">Sep</option>
//               <option value="10">Oct</option>
//               <option value="11">Nov</option>
//               <option value="12">Dec</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="overflow-x-auto py-6">
//         <table className="w-full  bg-white">
//           <thead>
//             <tr className="border-b whitespace-nowrap">
//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p> Process</p>
//                 </div>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <div className="flex gap-4 items-center">
//                   <p>
//                     <img className="" src={client_icon} alt="" />
//                   </p>
//                   <p> Employee</p>
//                 </div>
//               </th>
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
//                     {/* <img src="" alt="" /> */} {/* Removed empty img tag */}
//                   </p>
//                   <p>Status </p>
//                 </div>
//               </th>

//               <th className="px-4 py-3 text-left font-medium">
//                 <p> Total</p>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders?.map(
//               (
//                 item,
//                 index // Use 'orders' prop instead of 'data'
//               ) => (
//                 <tr key={index} className=" ">
//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     <p className="font-medium font-sm"> {item.process}</p>
//                   </td>
//                   <td className="px-4 py-4 text-sm sm:text-base  whitespace-nowrap">
//                     <p className="font-medium font-sm"> {item.employee}</p>
//                     <p className="text-gray-600 text-[14px]"> {item.email}</p>
//                   </td>
//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     {formatDateForDisplay(item.date)}
//                   </td>
//                   <td className="px-4 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${getStatusClass(
//                         item.status
//                       )}`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>

//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     {item.total}
//                   </td>
//                   <td className="px-4 py-4 text-sm sm:text-base  ">
//                     {/* You can add an action button or icon here */}
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OrderStatus;

import React from "react";

const OrderStatus = ({ orders }) => {
  console.log("ordersorders", orders);

  return (
    <div className="flex justify-between gap-4">
      {/* Open Orders */}
      <div className="bg-white rounded-lg shadow-md p-4 md:w-[100%] overflow-x-auto mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Open Orders (Total: {orders?.openOrders?.total || 0})
        </h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Order</th>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Qty</th>
            </tr>
          </thead>
          <tbody>
            {orders?.openOrders?.list?.length > 0 ? (
              orders.openOrders.list.map((item, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="py-2 px-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{item.order}</td>
                  <td className="py-2 px-4">{item.firstName}</td>
                  <td className="py-2 px-4">{item.lastName}</td>
                  <td className="py-2 px-4">{item.product || "-"}</td>
                  <td className="py-2 px-4">{item.qty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Fulfilled Orders */}
      <div className="bg-white rounded-lg shadow-md p-4 md:w-[100%] overflow-x-auto mt-6">
        <h2 className="text-lg font-semibold mb-4">
          Fulfilled Orders (Total: {orders?.fulfilledOrders?.total || 0})
        </h2>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm whitespace-nowrap">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Order</th>
              <th className="py-2 px-4 text-left">First Name</th>
              <th className="py-2 px-4 text-left">Last Name</th>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Qty</th>
            </tr>
          </thead>
          <tbody>
            {orders?.fulfilledOrders?.list?.length > 0 ? (
              orders.fulfilledOrders.list.map((item, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="py-2 px-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{item.order}</td>
                  <td className="py-2 px-4">{item.firstName}</td>
                  <td className="py-2 px-4">{item.lastName}</td>
                  <td className="py-2 px-4">{item.product || "-"}</td>
                  <td className="py-2 px-4">{item.qty}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatus;
