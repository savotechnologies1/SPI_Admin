import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  scrapEntryDetail,
  selectPartNamber1,
  updateScrapEntry,
} from "./https/productionResponseApi";
import { selectSupplier } from "../supplier_chain/https/suppliersApi";
import { FaArrowLeft, FaCircle } from "react-icons/fa";
import { toast } from "react-toastify";

interface Part {
  id: string;
  part_id?: string;
  partNumber: string;
  availStock?: number;
}

interface Supplier {
  id: string;
  name?: string;
  companyName?: string;
}

interface FormValues {
  searchPart: string;
  partId: string;
  supplier: string;
  supplierId: string;
  returnQuantity: string;
  scrapStatus: string;
  type: string;
  defectDesc: string;
}

const EditPartScrapEntry: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [partData, setPartData] = useState<Part[]>([]);
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const [partSuggestions, setPartSuggestions] = useState<Part[]>([]);
  const [supplierSuggestions, setSupplierSuggestions] = useState<Supplier[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const formik = useFormik<FormValues>({
    initialValues: {
      searchPart: "",
      partId: "",
      supplier: "",
      supplierId: "",
      returnQuantity: "",
      scrapStatus: "yes",
      type: "part",
      defectDesc: "",
    },
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      if (!id) return;

      const payload = {
        type: "part",
        partId: values.partId,
        supplierId: values.supplierId || null,
        returnQuantity: Number(values.returnQuantity),
        scrapStatus: values.scrapStatus === "yes",
        defectDesc: values.defectDesc,
      };

      try {
        setSubmitting(true);
        const response = await updateScrapEntry(id, payload);
        if (
          (response && response.status === 200) ||
          (response && response.status === 201)
        ) {
          toast.success("Scrap entry updated successfully");
          navigate("/scrap-entries");
        }
      } catch (error: any) {
        console.error("Update failed:", error);
        toast.error(error.response?.data?.message || "Update failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const [partsRes, suppliersRes, detailRes] = await Promise.all([
          selectPartNamber1(),
          selectSupplier(),
          scrapEntryDetail(id),
        ]);

        const allParts: Part[] = Array.isArray(partsRes)
          ? partsRes
          : partsRes?.data || [];
        const allSuppliers: Supplier[] = Array.isArray(suppliersRes)
          ? suppliersRes
          : suppliersRes?.data || [];

        setPartData(allParts);
        setSupplierData(allSuppliers);

        const entryData = detailRes.data.data;
        if (entryData) {
          formik.setValues({
            searchPart: entryData.PartNumber?.partNumber || "",
            partId: entryData.partId || "",
            supplier:
              entryData.supplier?.name || entryData.supplier?.companyName || "",
            supplierId: entryData.supplierId || "",
            returnQuantity: entryData.returnQuantity?.toString() || "",
            scrapStatus: entryData.scrapStatus === true ? "yes" : "no",
            type: entryData.type || "part",
            defectDesc: entryData.defectDesc || "",
          });
        }
      } catch (error) {
        toast.error("Failed to load details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  useEffect(() => {
    const query = formik.values.searchPart.trim().toLowerCase();
    if (query && !formik.values.partId) {
      const filtered = partData.filter((p) =>
        p.partNumber?.toLowerCase().includes(query),
      );
      setPartSuggestions(filtered);
    } else {
      setPartSuggestions([]);
    }
  }, [formik.values.searchPart, formik.values.partId, partData]);

  useEffect(() => {
    const query = formik.values.supplier.trim().toLowerCase();
    if (query && !formik.values.supplierId) {
      const filtered = supplierData.filter((s) => {
        const name = s.name || s.companyName || "";
        return name.toLowerCase().includes(query);
      });
      setSupplierSuggestions(filtered);
    } else {
      setSupplierSuggestions([]);
    }
  }, [formik.values.supplier, formik.values.supplierId, supplierData]);

  if (isLoading)
    return <div className="p-10 text-center font-bold">Loading Details...</div>;

  return (
    <div className="py-4 px-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition font-medium mb-4"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="flex gap-2 items-center mb-6">
        <NavLink
          to="/scrap-entries"
          className="text-[14px] text-blue-600 hover:underline"
        >
          Scrap Entries
        </NavLink>
        <FaCircle className="text-[6px] text-gray-500" />
        <span className="text-[14px] text-gray-500">Edit Part Scrap Entry</span>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="space-y-4"
        autoComplete="off"
      >
        <h1 className="font-bold text-2xl text-black mb-4">
          Edit Part Scrap Entry
        </h1>

        <div className="bg-white p-4 relative border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Part Number *</label>
          <input
            type="text"
            placeholder="Search part number..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.searchPart}
            onChange={(e) => {
              formik.setFieldValue("searchPart", e.target.value);
              formik.setFieldValue("partId", "");
            }}
          />
          {partSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {partSuggestions.map((p) => (
                <li
                  key={p.part_id || p.id}
                  className="p-3 hover:bg-blue-600 hover:text-white cursor-pointer border-b"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    formik.setFieldValue("searchPart", p.partNumber);
                    formik.setFieldValue("partId", p.part_id || p.id);
                    setPartSuggestions([]);
                  }}
                >
                  <div className="font-bold">{p.partNumber}</div>
                  <div className="text-xs">Stock: {p.availStock || 0}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-4 relative border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Supplier</label>
          <input
            type="text"
            placeholder="Search supplier..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            value={formik.values.supplier}
            onChange={(e) => {
              formik.setFieldValue("supplier", e.target.value);
              formik.setFieldValue("supplierId", "");
            }}
          />
          {supplierSuggestions.length > 0 && (
            <ul className="absolute z-50 left-4 right-4 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-2xl">
              {supplierSuggestions.map((s) => (
                <li
                  key={s.id}
                  className="p-3 hover:bg-green-600 hover:text-white cursor-pointer border-b"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    formik.setFieldValue("supplier", s.name || s.companyName);
                    formik.setFieldValue("supplierId", s.id);
                    setSupplierSuggestions([]);
                  }}
                >
                  {s.name || s.companyName}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <label className="block font-semibold mb-1">
              Return Quantity *
            </label>
            <input
              type="number"
              className="border py-3 px-4 rounded-md w-full text-gray-600 focus:outline-blue-500"
              {...formik.getFieldProps("returnQuantity")}
            />
          </div>
          <div className="bg-white p-4 border rounded-md shadow-sm">
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              className="border py-3 px-4 rounded-md w-full text-gray-600 bg-white"
              {...formik.getFieldProps("scrapStatus")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 border rounded-md shadow-sm">
          <label className="block font-semibold mb-1">Defect Description</label>
          <textarea
            rows={3}
            placeholder="Describe why this is being scrapped..."
            className="border py-3 px-4 rounded-md w-full text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            {...formik.getFieldProps("defectDesc")}
          />
        </div>

        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-md border">
          <button
            type="submit"
            disabled={
              formik.isSubmitting ||
              !formik.values.partId ||
              !formik.values.returnQuantity
            }
            className="px-10 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-800 transition shadow-md disabled:bg-gray-400"
          >
            {formik.isSubmitting ? "Updating..." : "Update Scrap Entry"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/scrap-entries")}
            className="px-10 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition rounded-md font-bold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPartScrapEntry;
