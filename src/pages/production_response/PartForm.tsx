import { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  ScrapEntryApi,
  selectPartNamber1,
} from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";
import { toast } from "react-toastify";

interface FormDataType {
  partFamily: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  leadTime: number;
  supplierOrderQty: number;
  companyName: string;
  minStock: number;
  availStock: number;
  cycleTime: string;
  processOrderRequired: string;
  instructionRequired: string;
  processId: string;
  processDesc: string;
  image: File[];
}

interface ProcessItem {
  id: string;
  name: string;
  partFamily: string;
  machineName?: string;
}

interface PartItem {
  part_id: string;
  process: {
    processName: string;
  };
  partNumber: string;
  partFamily: string;
  cost: number;
  cycleTime: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface Part {
  part_id: string;
  partNumber: string;
  partDescription: string;
  cost: number;
  availStock: number;
}

interface Supplier {
  id: string;
  name: string;
}

const PartForm = () => {
  const [partData, setPartData] = useState<Part[]>([]);
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [partSuggestions, setPartSuggestions] = useState<Part[]>([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState<Supplier[]>(
    [],
  );

  const formik = useFormik({
    initialValues: {
      type: "part",
      searchPart: "",
      partId: "",
      supplier: "",
      supplierId: "",
      returnQuantity: "",
      scrapStatus: " ",
      defectDesc: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Mapping values exactly to your Backend Controller keys
      const payload = {
        type: values.type,
        partId: values.partId,
        supplierId: values.supplierId || null,
        returnQuantity: Number(values.returnQuantity),
        scrapStatus: values.scrapStatus,
        defectDesc: values.defectDesc,
      };

      try {
        setSubmitting(true);
        const res = await ScrapEntryApi(payload);
        if (res) {
          resetForm();
          setPartSuggestions([]);
          setSupplierSuggestions([]);
        }
      } catch (error: any) {
        const errorMsg =
          error.response?.data?.message || "Internal server error";
        toast.error(errorMsg);
      } finally {
        setSubmitting(false);
      }
    },
  });

  // 1. Initial Data Load
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [partsRes, suppliersRes] = await Promise.all([
          selectPartNamber1(),
          selectSupplier(),
        ]);

        // Handle both formats: { data: [...] } OR direct array [...]
        const parts = Array.isArray(partsRes) ? partsRes : partsRes?.data || [];
        const suppliers = Array.isArray(suppliersRes)
          ? suppliersRes
          : suppliersRes?.data || [];

        setPartData(parts);
        setSupplierData(suppliers);

        console.log("Parts Loaded:", parts); // Debugging ke liye
      } catch (err) {
        console.error("Fetch Error:", err);
        toast.error("Failed to load parts or suppliers");
      }
    };
    loadInitialData();
  }, []);

  // 2. Real-time Part Filtering (Jaise hi type karein)
  useEffect(() => {
    const query = formik.values.searchPart.trim().toLowerCase();

    // Sirf tab filter karein jab input ho aur ID select na hui ho
    if (query && !formik.values.partId) {
      const filtered = partData.filter((p) =>
        p.partNumber?.toLowerCase().includes(query),
      );
      setPartSuggestions(filtered);
    } else {
      setPartSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, partData]);

  // 3. Real-time Supplier Filtering
  useEffect(() => {
    const query = formik.values.supplier.trim().toLowerCase();

    if (query && !formik.values.supplierId) {
      const filtered = supplierData.filter((s) =>
        s.name?.toLowerCase().includes(query),
      );
      setSupplierSuggestions(filtered);
    } else {
      setSupplierSuggestions([]);
    }
  }, [formik.values.supplier, formik.values.supplierId, supplierData]);

  return (
    <div className="p-6">
      <div className="">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          New Scrap Entry
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          autoComplete="off"
        >
          {/* PART SEARCH INPUT */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Search Part Number *
            </label>
            <input
              type="text"
              name="searchPart"
              placeholder="Start typing part number (e.g. part1)..."
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              value={formik.values.searchPart}
              onChange={(e) => {
                formik.setFieldValue("searchPart", e.target.value);
                formik.setFieldValue("partId", ""); // Clear ID while typing
              }}
            />
            {/* Part Suggestions Dropdown */}
            {partSuggestions.length > 0 && (
              <ul className="absolute z-[100] left-0 right-0 bg-white border-2 border-blue-100 rounded-lg mt-1 max-h-56 overflow-y-auto shadow-2xl">
                {partSuggestions.map((p) => (
                  <li
                    key={p.part_id}
                    className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b last:border-0 transition"
                    onClick={() => {
                      formik.setFieldValue("searchPart", p.partNumber);
                      formik.setFieldValue("partId", p.part_id);
                      setPartSuggestions([]);
                    }}
                  >
                    <div className="font-bold">{p.partNumber}</div>
                    <div className="text-xs opacity-80">
                      {p.partDescription} | Stock: {p.availStock}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* SUPPLIER SEARCH INPUT */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Supplier (Optional)
            </label>
            <input
              type="text"
              name="supplier"
              placeholder="Search supplier name..."
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              value={formik.values.supplier}
              onChange={(e) => {
                formik.setFieldValue("supplier", e.target.value);
                formik.setFieldValue("supplierId", "");
              }}
            />
            {/* Supplier Suggestions Dropdown */}
            {supplierSuggestions.length > 0 && (
              <ul className="absolute z-[100] left-0 right-0 bg-white border-2 border-green-100 rounded-lg mt-1 max-h-56 overflow-y-auto shadow-2xl">
                {supplierSuggestions.map((s) => (
                  <li
                    key={s.id}
                    className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b last:border-0 transition"
                    onClick={() => {
                      formik.setFieldValue("supplier", s.name);
                      formik.setFieldValue("supplierId", s.id);
                      setSupplierSuggestions([]);
                    }}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* RETURN QUANTITY & STATUS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Quantity to Scrap *
              </label>
              <input
                type="number"
                name="returnQuantity"
                placeholder="0"
                className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg outline-none focus:border-blue-500"
                value={formik.values.returnQuantity}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Update Stock (Scrap Status)
              </label>
              <select
                name="scrapStatus"
                className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg outline-none focus:border-blue-500 bg-white"
                value={formik.values.scrapStatus}
                onChange={formik.handleChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* DEFECT DESCRIPTION */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Defect Description / Reason
            </label>
            <textarea
              name="defectDesc"
              rows={3}
              placeholder="Why is this being scrapped?"
              className="w-full border-2 border-gray-200 py-3 px-4 rounded-lg outline-none focus:border-blue-500"
              value={formik.values.defectDesc}
              onChange={formik.handleChange}
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-between  items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={
                formik.isSubmitting ||
                !formik.values.partId ||
                !formik.values.returnQuantity
              }
              className="px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition disabled:bg-gray-400"
            >
              {formik.isSubmitting ? "Saving Entry..." : "Submit Scrap Entry"}
            </button>
            <button
              type="button"
              onClick={() => {
                formik.resetForm();
                setPartSuggestions([]);
                setSupplierSuggestions([]);
              }}
              className="py-4 px-8 border-2 border-red-500 text-red-500 font-bold rounded-lg hover:bg-red-50 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PartForm;
