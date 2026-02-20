import React, { useState } from "react";
import CycleTime from "./CycleTimeBar";
import StepsBar from "./StepsBar";
import { useEffect } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const ContinuousImprovement = () => {
  const [parts, setParts] = useState<
    { part_id: string; partDescription: string }[]
  >([]);
  const [selected, setSelected] = useState<string>("");
  const [loadingParts, setLoadingParts] = useState(true);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      setLoadingParts(true);
      const res = await axios.get(`${BASE_URL}/api/admin/get-parts`);
      setParts(res.data);
      if (res.data.length > 0) setSelected(res.data[0].part_id);
    } catch (error) {
      console.error("Error fetching parts:", error);
    } finally {
      setLoadingParts(false);
    }
  };

  return (
    <div className="mt-10 px-4 sm:px-6 min-h-screen bg-gray-50 pb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 pt-5">
        Continuous Improvement
      </h2>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="w-full lg:w-[70%]">
          {selected && <CycleTime partId={selected} />}
        </div>
        <div className="w-full lg:w-[30%] bg-white p-4 sm:p-5 lg:p-6 rounded-xl shadow-sm border border-gray-200">
          <label
            htmlFor="part-select"
            className="block text-xs sm:text-sm font-bold mb-2 sm:mb-3 text-gray-600 uppercase tracking-wider"
          >
            Select Part Description
          </label>

          {loadingParts ? (
            <div className="flex items-center gap-2 text-blue-600">
              <FaSpinner className="animate-spin text-sm sm:text-base" />
              <span className="text-xs sm:text-sm">Loading parts...</span>
            </div>
          ) : (
            <select
              id="part-select"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="
              w-full
              p-2.5 sm:p-3
              bg-gray-50
              border border-gray-300
              text-gray-900
              text-xs sm:text-sm
              rounded-lg
              focus:ring-2 focus:ring-blue-500
              focus:outline-none
              transition-all
            "
            >
              <option value="" disabled>
                Choose a part...
              </option>

              {parts.map((part) => (
                <option key={part.part_id} value={part.part_id}>
                  {part.partDescription}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {selected && <StepsBar partId={selected} />}
    </div>
  );
};

export default ContinuousImprovement;
