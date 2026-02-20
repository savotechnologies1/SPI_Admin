import React, { useRef, useState } from "react";

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
    "fileName",
  ],
  [
    "Cut trim",
    "Cut trim Machine",
    "20 ",
    "30",
    "Cut trim Components",
    "TRUE",
    "Cut trim description",
    "process",
  ],
  [
    "Molding",
    "Molding Machine",
    "10 ",
    "1.8",
    "Molding family",
    "FALSE",
    "This is molding prcess.",
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
    "cycleTime",
    "processName",
    "processDesc",
    "processOrderRequired",
    "instructionRequired",
    "companyName",
    "fileName",
  ],
  [
    "Cut trim Components",
    "PR-100",
    "PR-100 Description",
    "part",
    "20",
    "2",
    "2",
    "48",
    "50",
    "10",
    "Cut trim",
    "Cut trim description",
    "TRUE",
    "0",
    "SPI Custom",
    "part",
  ],
  [
    "Molding family",
    "PR-101",
    "PR-101 Description",
    "part",
    "20",
    "2",
    "2",
    "48",
    "50",
    "10",
    "Molding",
    "This is molding prcess.",
    "TRUE",
    "0",
    "SPI Custom",
    "part",
  ],
];
const productTemplate = [
  [
    "product_number",
    "partFamily",
    "product_description",
    "part_number",
    "part_qty",
    "cost",
    "leadTime",
    "supplierOrderQty",
    "companyName",
    "minStock",
    "availStock",
    "cycleTime",
    "processOrderRequired",
    "instructionRequired",
    // "isProductSchedule",
    "processName",
    "fileName",
  ],
  [
    "PROD-100",
    "Assembly",
    "This is product 100",
    "par-101",
    "2",
    "500",
    "10",
    "50",
    "TechCorp",
    "5",
    "20",
    "60",
    "TRUE",
    "TRUE",
    "Assembly",
    "product",
  ],
  [
    "PROD-101",
    "Assembly",
    "This is product 101",
    "par-102",
    "2",
    "500",
    "10",
    "50",
    "TechCorp",
    "5",
    "20",
    "60",
    "TRUE",
    "TRUE",
    "Assembly",
    "product",
  ],
];

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
    "John",
    "Doe",
    "John Doe",
    "john.doe@example.com",
    "20",
    "01-01-2025",
    "day",
    "1234",
    "Shop_Floor",
    "active",
    "1",
    "employee",
  ],
  [
    "Jane",
    "Smith",
    "Jane Smith",
    "jane.smith@example.com",
    "25",
    "05-01-2025",
    "night",
    "5678",
    "Frontline_Manager",
    "inactive",
    "0",
    "employee",
  ],
];
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
    "Alex",
    "Johnson",
    "alex.johnson@example.com",
    "123 Main Street  New York",
    "30",
    "9876543210",
    "customer",
  ],
  [
    "Maria",
    "Williams",
    "maria.williams@example.com",
    "45 Sunset Avenue California",
    "15",
    "9123456789",
    "customer",
  ],
];

// Supplier Template
const supplierTemplate = [
  [
    "firstName",
    "lastName",
    "email",
    "companyName",
    "address",
    "billingTerms",
    "fileName",
  ],
  [
    "test",
    "test",
    "test@gmail.com",
    "test company",
    "test address",
    "5",
    "supplier",
  ],
];

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
  const handleConflictDownload = (conflicts) => {
    if (!conflicts || !conflicts.length) return;
    const headers = [
      "Product Number",
      "Field Name",
      "Old Value (DB)",
      "New Value (CSV)",
    ].join(",");
    const rows = conflicts
      .flatMap((item) => {
        return item.changes.map((change) => {
          return [
            `"${item.productNumber}"`,
            `"${change.field}"`,
            `"${change.oldValue}"`,
            `"${change.newValue}"`,
          ].join(",");
        });
      })
      .join("\n");

    const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `Product_Import_Conflicts.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
  const hasConfirmedRef = useRef(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const handleConfirm = () => {
    setShowConfirmModal(false);
    handleUpload(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    toast.info("Import cancelled by user.");
  };

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

  const [conflictData, setConflictData] = useState(null);
  const handleUpload = async (isConfirmed: boolean = false) => {
    if (!file || !selected) {
      toast.error("Please select a template type and file first!");
      return;
    }

    setIsUploading(true);
    if (!isConfirmed) setErrors([]);

    const formData = new FormData();
    formData.append("ImportFile", file);
    if (isConfirmed) formData.append("confirmChanges", "true");

    try {
      let url = "";
      if (selected === "process") url = "process/import";
      else if (selected === "part") url = "parts/import";
      else if (selected === "product") url = "product-tree/import";
      else if (selected === "employee") url = "emp/import";
      else if (selected === "customer") url = "cust/import";
      else if (selected === "supplier") url = "supp/import";

      const response = await importApi(url, formData);
      const summary = response?.data?.summary;
      const responseData = response?.data;
      if (response?.status === 409 && responseData?.requiresConfirmation) {
        const conflictMessages = responseData.conflicts
          ? responseData.conflicts.map((c: any) => c.message).join("\n\n")
          : "Changes detected in existing products.";
        setConfirmMessage(conflictMessages);
        setShowConfirmModal(true);
        setIsUploading(false);
        setConflictData(responseData.conflicts);
        return;
      }
      if (summary?.errorCount > 0) {
        setErrors(summary.errors);
        toast.warning(
          `Imported ${summary.success} rows, but ${summary.errorCount} rows failed.`,
        );
      } else {
        toast.success(response.data.message || "Product Upload successful.");
        setFile(null);
      }
    } catch (error: any) {
      const responseData = error.response?.data;
      const status = error.response?.status;
      if (responseData?.summary?.errors) {
        setErrors(responseData.summary.errors);
        toast.error(responseData.message || "Import failed due to errors.");
      } else {
        toast.error(
          responseData?.message || "Upload failed. Please check your file.",
        );
      }
    } finally {
      setIsUploading(false);
    }
  };
  const ConfirmationModal = ({ open, message, onConfirm, onCancel }) => {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border-t-4 border-blue-600">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">
                ⚠️
              </span>
              Existing Data Found
            </h2>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line mb-6 max-h-64 overflow-y-auto border">
              {message}
            </div>

            <p className="text-sm text-gray-500 mb-6 italic">
              * Clicking "Apply Changes" will overwrite the values in the
              database.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleConflictDownload(conflictData)}
                className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
              >
                Download Conflict Detail (Excel)
              </button>
              <button
                onClick={onCancel}
                className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100 transition-all"
              >
                No, Keep Old
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
                        .slice(1, 4)
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
              onClick={(e) => {
                e.preventDefault();
                handleUpload(false);
              }}
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
            {conflictData && (
              <div className="bg-yellow-100 p-4 border-l-4 border-yellow-500 my-4">
                <p className="font-bold">Conflicts Found!</p>
                <p>Database aur CSV ke values me farq hai.</p>
                <button
                  onClick={() => handleConflictDownload(conflictData)}
                  className="bg-blue-600 text-white px-4 py-2 mt-2 rounded"
                >
                  Download Excel
                </button>
              </div>
            )}
          </div>
        </div>
        <ConfirmationModal
          open={showConfirmModal}
          message={confirmMessage}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default Import;
