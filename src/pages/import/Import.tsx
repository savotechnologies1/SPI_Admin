import React, { useRef, useState } from "react";
import { importApi } from "./https/importsApi";
import { toast } from "react-toastify";

type TemplateType = "process" | "part" | "product" | "employee" | "customer" | "supplier" | "";

interface ConflictChange {
  field: string;
  oldValue: any;
  newValue: any;
}

interface ConflictItem {
  productNumber: string;
  message: string;
  changes: ConflictChange[];
}

interface ConfirmationModalProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}
const processTemplate = [
  ["processName", "machineName", "cycleTime", "ratePerHour", "partFamily", "isProcessReq", "processDesc", "fileName"],
  ["Cut trim", "Cut trim Machine", "20 ", "30", "Cut trim Components", "TRUE", "Cut trim description", "process"],
  ["Molding", "Molding Machine", "10 ", "1.8", "Molding family", "FALSE", "This is molding prcess.", "process"],
];

const partTemplate = [
  ["partFamily", "partNumber", "partDescription", "type", "cost", "leadTime", "minStock", "availStock", "supplierOrderQty", "cycleTime", "processName", "processDesc", "processOrderRequired", "instructionRequired", "companyName", "fileName"],
  ["Cut trim Components", "PR-100", "PR-100 Description", "part", "20", "2", "2", "48", "50", "10", "Cut trim", "Cut trim description", "TRUE", "TRUE", "SPI Custom", "part"],
];

const productTemplate = [
  ["product_number", "partFamily", "product_description", "part_number", "part_qty", "cost", "leadTime", "supplierOrderQty", "companyName", "minStock", "availStock", "cycleTime", "processOrderRequired", "instructionRequired", "processName", "fileName"],
  ["PROD-100", "Assembly", "This is product 100", "par-101", "2", "500", "10", "50", "TechCorp", "5", "20", "60", "TRUE", "TRUE", "Assembly", "product"],
];

const employeeTemplate = [
  ["firstName", "lastName", "fullName", "email", "hourlyRate", "startDate", "shift", "pin", "role", "status", "processLogin", "fileName"],
  ["John", "Doe", "John Doe", "john.doe@example.com", "20", "01-01-2025", "day", "1234", "Shop_Floor", "active", "1", "employee"],
];

const customerTemplate = [
  ["firstName", "lastName", "email", "address", "billingTerms", "customerPhone", "fileName"],
  ["Alex", "Johnson", "alex.johnson@example.com", "123 Main Street", "30", "9876543210", "customer"],
];

const supplierTemplate = [
  ["firstName", "lastName", "email", "companyName", "address", "billingTerms", "fileName"],
  ["test", "test", "test@gmail.com", "test company", "test address", "5", "supplier"],
];

const Import: React.FC = () => {
  const [selected, setSelected] = useState<TemplateType>("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [conflictData, setConflictData] = useState<ConflictItem[] | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  const getTemplateData = () => {
    switch (selected) {
      case "process": return processTemplate;
      case "part": return partTemplate;
      case "product": return productTemplate;
      case "employee": return employeeTemplate;
      case "customer": return customerTemplate;
      case "supplier": return supplierTemplate;
      default: return [];
    }
  };

  const handleConflictDownload = (conflicts: ConflictItem[] | null) => {
    if (!conflicts || !conflicts.length) return;
    const headers = ["Product Number", "Field Name", "Old Value (DB)", "New Value (CSV)"].join(",");
    const rows = conflicts
      .flatMap((item) => {
        return item.changes.map((change) => {
          return [`"${item.productNumber}"`, `"${change.field}"`, `"${change.oldValue}"`, `"${change.newValue}"`].join(",");
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
    const csvContent = "data:text/csv;charset=utf-8," + ["S.No,Error"].join(",") + "\n" + errors.map((err, i) => `${i + 1},"${err}"`).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${selected}_import_errors.csv`;
    link.click();
  };

  const handleDownload = () => {
    const data = getTemplateData();
    if (!data.length) return;
    const csvContent = "data:text/csv;charset=utf-8," + data.map((row) => row.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `${selected}_template.csv`;
    link.click();
  };

  const handleUpload = async (isConfirmed: boolean = false) => {
    if (!file || !selected) {
      toast.error("Please select a template type and file first!");
      return;
    }

    setIsUploading(true);
    if (!isConfirmed) {
      setErrors([]);
      setConflictData(null);
    }

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
      const responseData = response?.data;
      const summary = responseData?.summary;

      if (response?.status === 409 && responseData?.requiresConfirmation) {
        const conflictMessages = responseData.conflicts ? responseData.conflicts.map((c: any) => c.message).join("\n\n") : "Changes detected.";
        setConfirmMessage(conflictMessages);
        setConflictData(responseData.conflicts);
        setShowConfirmModal(true);
        return;
      }

      if (summary?.errorCount > 0) {
        setErrors(summary.errors);
        toast.warning(`Imported ${summary.success} rows, but ${summary.errorCount} failed.`);
      } else {
        toast.success(responseData.message || "Upload successful.");
        setFile(null);
      }
    } catch (error: any) {
      const resp = error.response?.data;
      if (resp?.summary?.errors) setErrors(resp.summary.errors);
      toast.error(resp?.message || "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, message, onConfirm, onCancel }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border-t-4 border-blue-600">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-full mr-3">⚠️</span>
              Existing Data Found
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 whitespace-pre-line mb-6 max-h-64 overflow-y-auto border">
              {message}
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={() => handleConflictDownload(conflictData)} className="text-blue-600 text-sm font-semibold hover:underline">
                Download Conflict Detail (Excel)
              </button>
              <div className="flex justify-end gap-3 mt-2">
                <button onClick={onCancel} className="px-5 py-2 rounded-lg font-medium text-gray-600 hover:bg-gray-100">
                  No, Keep Old
                </button>
                <button onClick={onConfirm} className="px-5 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700">
                  Apply Changes
                </button>
              </div>
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
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Data Import</h1>
              <p className="text-gray-600">Import data via CSV files</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="grid grid-cols-2 gap-3 mb-6">
              {templateOptions.map((option) => (
                <button
                  key={option.id}
                  className={`p-4 rounded-lg border flex flex-col items-center transition-all ${selected === option.id ? "bg-blue-50 border-blue-500 text-blue-700" : "bg-gray-50"}`}
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
                  <h3 className="text-lg font-semibold capitalize">{selected} Template Preview</h3>
                  <button onClick={handleDownload} className="text-sm text-blue-600 font-medium">Download Template</button>
                </div>
                <div className="overflow-x-auto rounded-lg border">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        {getTemplateData()[0]?.map((col, i) => (
                          <th key={i} className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase border-b">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {getTemplateData().slice(1, 4).map((row, i) => (
                        <tr key={i} className="border-b">
                          {row.map((cell, j) => (
                            <td key={j} className="px-3 py-2 text-sm text-gray-700">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
              {/* Naya text jo browse button ke upar dikhega */}
              <p className="text-gray-500 mb-4">Only .csv files are supported. Please select a CSV file to upload.</p>
              
              <label className="cursor-pointer">
                <input type="file" className="hidden" accept=".csv" onChange={handleFileChange} />
                <div className="bg-blue-600 text-white px-5 py-2 rounded-lg inline-block font-medium">Browse Files</div>
              </label>
              
              {file && <p className="mt-4 text-blue-600 font-bold">{file.name}</p>}
          </div>
             <button
              onClick={() => handleUpload(false)}
              disabled={!file || !selected || isUploading}
              className={`mt-6 w-full py-3 rounded-lg font-medium text-white ${!file || !selected || isUploading ? "bg-gray-300" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isUploading ? "Processing..." : "Upload Data"}
            </button>

            {errors.length > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <button onClick={handleErrorDownload} className="text-red-600 text-sm font-bold underline">Download Error Report</button>
              </div>
            )}
          </div>
        </div>
        <ConfirmationModal
          open={showConfirmModal}
          message={confirmMessage}
          onConfirm={() => handleUpload(true)}
          onCancel={() => { setShowConfirmModal(false); toast.info("Cancelled"); }}
        />
      </div>
    </div>
  );
};

export default Import;