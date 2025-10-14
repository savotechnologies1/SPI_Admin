// import React, { useState } from 'react'
// import cloud from '../../assets/cloud_check.png'
// const Import = () => {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };

//   return (
//     <div className="flex  p-10  bg-gray-100 ">
//     <div className="bg-white p-6 py-20 rounded-lg shadow-lg w-full  text-center items-center justify-center flex flex-col">
//       <div>
//       <img src={cloud} alt="" />
//       </div>
//       <p className="text-lg font-bold mt-2">Choose a file or drag & drop it here</p>
//       <p className="text-gray-500 text-sm">JPEG, PNG, PDG, and MP4 formats, up to 50 MB</p>
//       <label className="mt-8 block bg-brand text-white px-4 py-2 rounded-lg cursor-pointer">
//         <input type="file" className="hidden" onChange={handleFileChange} />
//         Browse File
//       </label>
//       {file && <p className="mt-2 text-gray-700 text-sm">Selected: {file.name}</p>}
//     </div>
//   </div>
//      )
// }

// export default Import

import React, { useState } from "react";
import axios from "axios";
import cloud from "../../assets/cloud_check.png";
import { importApi } from "./https/importsApi";
import { toast } from "react-toastify";

type TemplateType =
  | "process"
  | "part"
  | "product"
  | "employee"
  | "customer"
  | "supplier"
  | "";

const processTemplate = [
  [
    "processName",
    "machineName",
    "cycleTime",
    "ratePerHour",
    "partFamily",
    "isProcessReq",
    "processDesc",
    "type",
    "fileName",
  ],
  [
    "Drilling Process1",
    "CNC-Mill-42",
    "120 sec",
    "30.5",
    "Metal Components",
    "TRUE",
    "Precision drilling operation",
    "Machining",
    "process",
  ],
  [
    "Assembly1",
    "Line-A",
    "3600 sec",
    "1.8",
    "Final Products",
    "FALSE",
    "Final product assembly",
    "Assembly",
    "process",
  ],
];

const partTemplate = [
  [
    "partFamily",
    "partNumber",
    "partDescription",
    "type",
    "cost",
    "leadTime",
    "minStock",
    "availStock",
    "supplierOrderQty",
    "cycleTime(minutes)",
    "processName",
    "processDesc",
    "processOrderRequired",
    "instructionRequired",
    "companyName",
    "fileName",
  ],
  [
    "boiling",
    "42d000441121177",
    "aloo",
    "part",
    "20",
    "2",
    "2",
    "48",
    "50",
    "10",
    "boiling",
    "boiling",
    "TRUE",
    "0",
    "SPI Custom",
    "part",
  ],
  [
    "boiling",
    "shikha001",
    "aloo with lemon12",
    "part",
    "20",
    "2",
    "2",
    "48",
    "50",
    "10",
    "boiling",
    "boiling",
    "TRUE",
    "0",
    "SPI Custom",
    "part",
  ],
];
const productTemplate = [
  [
    "product_number",
    "part_number",
    "partFamily",
    "partDescription",
    "instructionRequired",
    "fileName",
  ],
  ["Product A", "Part A", "abc", "abc desc", "TRUE", "product"],
  ["Product B", "Part B", "abc", "abc desc", "FALSE", "product"],
];

// Employee Template
const employeeTemplate = [
  [
    "firstName",
    "lastName",
    "fullName",
    "email",
    "hourlyRate",
    "startDate",
    "shift",
    "pin",
    "role",
    "status",
    "processLogin",
    "fileName",
  ],
  [
    "Shop floor",
    "Test",
    "Shop floor trst",
    "test11@gmail.com",
    "23",
    "03-09-2025",
    "day",
    "42238",
    "Shop_Floor",
    "active",
    "1",
    "employee",
  ],
  [
    "frontline",
    "lastname",
    "frontline lastname",
    "te2st@gmail.com",
    "44",
    "04-09-2025",
    "day",
    "5454",
    "Frontline_Manager",
    "active",
    "1",
    "employee",
  ],
];

// Customer Template
const customerTemplate = [
  [
    "firstName",
    "lastName",
    "email",
    "address",
    "billingTerms",
    "customerPhone",
    "fileName",
  ],
  [
    "test",
    "test",
    "test@gmail.com",
    "117, peace point indore",
    "9977366963",
    "customer",
  ],
];

// Supplier Template
const supplierTemplate = [
  ["firstName", "lastName", "email", "address", "billingTerms", "fileName"],
  ["test", "test", "test@gmail.com", "test address", "5", "supplier"],
];

// const Import: React.FC = () => {
//   const [selected, setSelected] = useState<TemplateType>("");
//   const [file, setFile] = useState<File | null>(null);
//   const [errors, setErrors] = useState<string[]>([]); // ✅ Error state
//   // Template data return
//   const getTemplateData = () => {
//     switch (selected) {
//       case "process":
//         return processTemplate;
//       case "part":
//         return partTemplate;
//       case "product":
//         return productTemplate;
//       case "employee":
//         return employeeTemplate;
//       case "customer":
//         return customerTemplate;
//       case "supplier":
//         return supplierTemplate;
//       default:
//         return [];
//     }
//   };

//   // File change handler
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     }
//   };
//   const handleErrorDownload = () => {
//     if (!errors.length) return;

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       ["S.No,Error"].join(",") +
//       "\n" +
//       errors.map((err, i) => `${i + 1},"${err}"`).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = `${selected}_import_errors.csv`;
//     link.click();
//   };
//   // Download CSV template
//   const handleDownload = () => {
//     const data = getTemplateData();
//     if (!data.length) return;

//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       data.map((row) => row.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csvContent);
//     link.download = `${selected}_template.csv`;
//     link.click();
//   };

//   const handleUpload = async () => {
//     if (!file || !selected) {
//       alert("Please select a template type and file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("ImportFile", file);

//     try {
//       let url = "";
//       if (selected === "process") {
//         url = "process/import";
//       } else if (selected === "part") {
//         url = "parts/import";
//       } else if (selected === "product") {
//         url = "product-tree/import";
//       } else if (selected === "employee") {
//         url = "emp/import";
//       } else if (selected === "customer") {
//         url = "cust/import";
//       } else if (selected === "supplier") {
//         url = "supp/import";
//       }
//       const response = await importApi(url, formData);
//       console.log("responseresponse", response);

//       const summary = response?.data?.summary; // ✅ yaha se access karo

//       if (summary && summary.errorCount > 0 && summary.errors?.length) {
//         setErrors(summary.errors); // ✅ Save errors in state
//         alert("Some rows failed. Please download error file.");
//       } else {
//         setErrors([]);
//         alert("File uploaded successfully ✅");
//       }
//     } catch (error: any) {
//       console.error("Upload failed:", error);
//       alert(error.response?.data?.error || "Upload failed!");
//     }
//   };

//   console.log("errorserrors", errors);

//   return (
//     <>
//       <div className="p-6 mt-5">
//         <h2 className="text-2xl font-semibold mb-4">Import CSV</h2>

//         {/* Select options */}
//         <div className="flex gap-4 mb-6">
//           <button
//             className={`px-4 py-2 rounded-lg ${
//               selected === "process" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setSelected("process")}
//           >
//             Add Process
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${
//               selected === "part" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setSelected("part")}
//           >
//             Add Parts
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${
//               selected === "product" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setSelected("product")}
//           >
//             Add Product
//           </button>{" "}
//           <button
//             className={`px-4 py-2 rounded-lg ${
//               selected === "employee" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setSelected("employee")}
//           >
//             Add Employee
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${
//               selected === "customer" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setSelected("customer")}
//           >
//             Add Customer
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${
//               selected === "supplier" ? "bg-blue-600 text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setSelected("supplier")}
//           >
//             Add Supplier
//           </button>
//         </div>

//         {/* Template preview */}
//         {selected && (
//           <div className="bg-white shadow-md rounded-lg p-4">
//             <h3 className="text-lg font-semibold mb-3 capitalize">
//               {selected} Template
//             </h3>

//             <div className="overflow-x-auto">
//               <table className="min-w-full border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     {getTemplateData()[0]?.map((col, i) => (
//                       <th
//                         key={i}
//                         className="border px-3 py-2 text-left text-sm font-semibold"
//                       >
//                         {col}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {getTemplateData()
//                     .slice(1)
//                     .map((row, i) => (
//                       <tr key={i} className="odd:bg-gray-50">
//                         {row.map((cell, j) => (
//                           <td key={j} className="border px-3 py-2 text-sm">
//                             {cell}
//                           </td>
//                         ))}
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Download Button */}
//             <button
//               onClick={handleDownload}
//               className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//             >
//               Download Template
//             </button>
//           </div>
//         )}
//       </div>

//       {/* File Upload Section */}
//       <div className="flex p-10 bg-gray-100">
//         <div className="bg-white p-6 py-20 rounded-lg shadow-lg w-full text-center items-center justify-center flex flex-col">
//           {/* Browse File */}
//           <label className="mt-8 block bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
//             <input type="file" className="hidden" onChange={handleFileChange} />
//             Browse File
//           </label>
//           {file && (
//             <p className="mt-2 text-gray-700 text-sm">Selected: {file.name}</p>
//           )}

//           {/* Upload button */}
//           <button
//             onClick={handleUpload}
//             className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//           >
//             Submit CSV File
//           </button>

//           {/* ✅ Error download button */}
//           {errors.length > 0 && (
//             <button
//               onClick={handleErrorDownload}
//               className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//             >
//               Download Errors
//             </button>
//           )}
//         </div>
//       </div>
//       {/* <button
//         onClick={handleDownload}
//         className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
//       >
//         Error Download Template
//       </button> */}
//     </>
//   );
// };

// export default Import;

const Import: React.FC = () => {
  const [selected, setSelected] = useState<TemplateType>("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Template data return
  const getTemplateData = () => {
    switch (selected) {
      case "process":
        return processTemplate;
      case "part":
        return partTemplate;
      case "product":
        return productTemplate;
      case "employee":
        return employeeTemplate;
      case "customer":
        return customerTemplate;
      case "supplier":
        return supplierTemplate;
      default:
        return [];
    }
  };

  // File change handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleErrorDownload = () => {
    if (!errors.length) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["S.No,Error"].join(",") +
      "\n" +
      errors.map((err, i) => `${i + 1},"${err}"`).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${selected}_import_errors.csv`;
    link.click();
  };

  // Download CSV template
  const handleDownload = () => {
    const data = getTemplateData();
    if (!data.length) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      data.map((row) => row.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${selected}_template.csv`;
    link.click();
  };
  const handleUpload = async () => {
    if (!file || !selected) {
      alert("Please select a template type and file first!");
      return;
    }

    setIsUploading(true);
    setErrors([]); // Clear previous errors
    const formData = new FormData();
    formData.append("ImportFile", file);

    try {
      let url = "";
      if (selected === "process") {
        url = "process/import";
      } else if (selected === "part") {
        url = "parts/import";
      } else if (selected === "product") {
        url = "product-tree/import";
      } else if (selected === "employee") {
        url = "emp/import";
      } else if (selected === "customer") {
        url = "cust/import";
      } else if (selected === "supplier") {
        url = "supp/import";
      }

      const response = await importApi(url, formData);

      // Backend will return 201 on full success or 400 on any row fail (your logic)
      if (response?.status === 201) {
        toast.success(response.data.message || "Upload successful");
        setErrors([]);
      } else if (response?.status === 400 && response.data?.errors?.length) {
        setErrors(response.data.errors);
        toast.error("Upload failed due to validation errors");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please check your file and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const templateOptions = [
    { id: "process", label: "Add Process", icon: "⚙️" },
    { id: "part", label: "Add Parts", icon: "🔩" },
    { id: "product", label: "Add Product", icon: "📦" },
    { id: "employee", label: "Add Employee", icon: "👨‍💼" },
    { id: "customer", label: "Add Customer", icon: "🤝" },
    { id: "supplier", label: "Add Supplier", icon: "🚚" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-8">
      <div className="  p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Data Import</h1>
              <p className="text-gray-600">Import data via CSV files</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-gray-700">
              Select data type, download template, and upload your CSV file
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Template Selection */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Select Data Type
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {templateOptions.map((option) => (
                <button
                  key={option.id}
                  className={`p-4 rounded-lg border transition-all flex flex-col items-center justify-center ${
                    selected === option.id
                      ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelected(option.id as TemplateType)}
                >
                  <span className="text-2xl mb-1">{option.icon}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>

            {selected && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 capitalize">
                    {selected} Template Preview
                  </h3>
                  <button
                    onClick={handleDownload}
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Template
                  </button>
                </div>
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        {getTemplateData()[0]?.map((col, i) => (
                          <th
                            key={i}
                            className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white ">
                      {getTemplateData()
                        .slice(1, 4) // Show only first 3 rows for preview
                        .map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td
                                key={j}
                                className="px-3 py-2 text-sm text-gray-700"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      {getTemplateData().length > 4 && (
                        <tr>
                          <td
                            colSpan={getTemplateData()[0]?.length || 1}
                            className="px-3 py-2 text-sm text-center text-gray-500 bg-gray-50"
                          >
                            ... and {getTemplateData().length - 4} more rows
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - File Upload */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload CSV File
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 transition-colors hover:border-blue-400 hover:bg-blue-50">
              <div className="max-w-md mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>

                <p className="text-gray-600 mb-2">
                  upload your CSV file here, or click to browse
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  Supports CSV files only
                </p>

                <label className="mt-2 inline-block bg-blue-600 text-white px-5 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium">
                  <input
                    type="file"
                    className="hidden"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                  Browse Files
                </label>
              </div>
            </div>

            {file && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-blue-800 font-medium">{file.name}</span>
                <button
                  onClick={() => setFile(null)}
                  className="ml-auto text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!file || !selected || isUploading}
              className={`mt-6 w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center ${
                !file || !selected || isUploading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
              }`}
            >
              {isUploading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload Data
                </>
              )}
            </button>

            {/* Error Download Button */}
            {errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center text-red-800 mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">
                    Some rows failed to import
                  </span>
                </div>
                <p className="text-red-700 text-sm mb-3">
                  Please download the error report to see details
                </p>
                <button
                  onClick={handleErrorDownload}
                  className="flex items-center text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Error Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Import;
