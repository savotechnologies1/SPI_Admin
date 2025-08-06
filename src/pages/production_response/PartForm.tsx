import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { selectPartNamber } from "../product&BOM/https/partProductApis";

// === Mock API Function ===
// Isko aap apne real API call se replace kar sakte hain.
// Yeh ek dummy function hai jo parts ka data return karta hai.

// ==========================

const PartForm = () => {
  // Hardcoded supplier, yeh props se bhi aa sakta hai
  const supplier = "Cortez herring";

  // State to hold all parts data from API
  const [partData, setPartData] = useState<any[]>([]);
  // State to hold filtered suggestions for autocomplete
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Formik hook ka istemal
  const formik = useFormik({
    // 1. Form ke initial values define karein
    initialValues: {
      searchPart: "",
      supplier: supplier || "", // Initial supplier value set ho gayi
      returnQuantity1: "",
      scrapStatus1: "yes", // Default value
    },
    // 2. Submit hone par yeh function chalega
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      alert(JSON.stringify(values, null, 2));
      // Yahan aap API call karke data bhej sakte hain
    },
  });

  // 3. Component mount hone par API se parts ka data fetch karein
  useEffect(() => {
    (async () => {
      try {
        const parts = await selectPartNamber();
        setPartData(parts?.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []); // Empty dependency array, toh yeh sirf ek baar chalega

  // 4. Jab bhi 'searchPart' field mein kuch type ho, suggestions ko filter karein
  useEffect(() => {
    if (formik.values.searchPart) {
      const filteredSuggestions = partData.filter((part) =>
        part.part_number
          .toLowerCase()
          .includes(formik.values.searchPart.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Agar input khali hai toh suggestions bhi khali kar do
    }
  }, [formik.values.searchPart, partData]);

  // Suggestion par click karne ke liye handler
  const handleSuggestionClick = (part: any) => {
    // Formik ke 'searchPart' field ki value set karein
    formik.setFieldValue("searchPart", part.part_number);
    // Suggestions list ko hide kar dein
    setSuggestions([]);
  };

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit} className="">
        <div className="bg-white p-4">
          <label className="block font-semibold mb-1">
            Search Part For Update
          </label>
          {/* Autocomplete ke liye container ko relative banayein */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search part for update....."
              className="border py-3 px-4 rounded-md w-full text-gray-600 placeholder-black"
              // `register` ki jagah `getFieldProps`
              {...formik.getFieldProps("searchPart")}
            />
            {/* Agar suggestions hain toh unhe display karein */}
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {suggestions.map((part) => (
                  <li
                    key={part.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(part)}
                  >
                    {part.part_number} (Stock: {part.stock})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 bg-white p-4 ">
          <div>
            <label className="block font-semibold mb-1">Supplier</label>
            <input
              type="text"
              placeholder="Enter supplier"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("supplier")}
              disabled // Supplier fixed hai, isliye disable kar sakte hain
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 ">
          <div>
            <label className="block font-semibold mb-1">Return Quantity</label>
            <input
              type="number" // Type ko 'number' karna behtar hai
              placeholder="Enter Return Quantity"
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("returnQuantity1")}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Scrap Status</label>
            <select
              className="border py-3 px-4 rounded-md w-full text-gray-600"
              {...formik.getFieldProps("scrapStatus1")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-start bg-white p-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white text-md hover:bg-blue-800 transition rounded-md"
          >
            Save Scrap
          </button>
          <button
            type="button" // Type 'reset' ki jagah 'button' use karein aur onClick mein Formik ka reset function call karein
            onClick={() => formik.resetForm()}
            className="px-6 py-2 text-red-500 hover:text-red-700 transition rounded-md flex items-center"
          >
            <span className="text-lg mr-1">🔄</span> Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartForm;
