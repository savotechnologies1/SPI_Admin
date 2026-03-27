// import React, { useState } from "react";
// import {
//   sendVacationReqStatus,
// } from "../https/EmployeeApis";
// type Props = { employeeId: string; isOpen: boolean; onClose: () => void };

// const VacationReqModel = ({ employeeId, isOpen, onClose, status }: Props) => {
//   const [email, setEmail] = useState("");
//   const [generatedPassword, setGeneratedPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isCopied, setIsCopied] = useState(false);
//   const closeModal = () => {
//     onClose();
//     setEmail("");
//     setGeneratedPassword("");
//     setShowPassword(false);
//     setIsCopied(false);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = { id: employeeId, email, status: status };
//     console.log({ id: employeeId, email, status: status });
//     await sendVacationReqStatus(data);
//     closeModal();
//   };
//   if (!isOpen) return null;
//   return (
//     <div className="flex justify-center items-center min-h-screen mt-5">
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold text-gray-800">
//               Register Account
//             </h2>
//             <button
//               onClick={closeModal}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//                 placeholder="your@email.com"
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="status"
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Status
//               </label>
//               <input
//                 type="status"
//                 id="status"
//                 value={status}
//                 readOnly
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//                 placeholder="your@email.com"
//               />
//             </div>

//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className={`w-full py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700`}
//               >
//                 Register
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default VacationReqModel;
import React, { useState } from "react";
import { sendVacationReqStatus } from "../https/EmployeeApis";

// 1. Added 'status' to the Props definition
type Props = {
  employeeId: string;
  isOpen: boolean;
  onClose: () => void;
  status: string;
};

const VacationReqModel = ({ employeeId, isOpen, onClose, status }: Props) => {
  const [email, setEmail] = useState("");

  // Removed unused state variables (generatedPassword, showPassword, isCopied)
  // as they were not used in your JSX and could cause "unused variable" warnings.

  const closeModal = () => {
    onClose();
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { id: employeeId, email, status: status };
      console.log("Sending data:", data);
      await sendVacationReqStatus(data);
      closeModal();
    } catch (error) {
      console.error("Error sending vacation status:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Send Status Notification
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Employee Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              placeholder="employee@company.com"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Request Status
            </label>
            <input
              type="text" // Fixed: Changed from "status" (invalid) to "text"
              id="status"
              value={status}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VacationReqModel;
