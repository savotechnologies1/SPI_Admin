import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const EditWorkInstruction = () => {
  const [formData, setFormData] = useState({
    part: "",
    stepNumber: "",
    workInstruction: "",
    imageFile: null as File | null,
    videoFile: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageFile' | 'videoFile') => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [field]: e.target.files![0] }));
    }
  };

  const handleSaveInstruction = () => {
    console.log("Saved data:", formData);
    // Add your save logic here
  };

  const breadcrumbs = [
    { path: "/dashboardDetailes", label: "Dashboard" },
    { label: "Work Instruction" },
    { label: "Add Work Instruction" }
  ];

  return (
    <div className="p-4 sm:p-6">
      <div>
        <h1 className="font-bold text-xl sm:text-2xl text-black">
          Edit Work Instruction
        </h1>
      </div>
      
      {/* Breadcrumbs */}
      <div className="flex items-center mt-2 gap-2">
        {breadcrumbs.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {item.path ? (
              <NavLink 
                to={item.path} 
                className="text-xs sm:text-sm text-black hover:underline"
              >
                {item.label}
              </NavLink>
            ) : (
              <span className="text-xs sm:text-sm cursor-default">
                {item.label}
              </span>
            )}
            {index < breadcrumbs.length - 1 && (
              <FaCircle className="text-[6px] text-gray-500" />
            )}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="mt-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
        {/* First Row: Part and Step Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2" htmlFor="part">
              Part Description
            </label>
            <select
              id="part"
              value={formData.part}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Part</option>
              {[1, 2, 3].map(num => (
                <option key={num} value={`Part ${num}`}>
                  Part {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="stepNumber">
              Step No.
            </label>
            <input
              type="number"
              id="stepNumber"
              value={formData.stepNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter step number"
              min="1"
            />
          </div>
        </div>

        {/* Work Instruction Textarea */}
        <div className="mb-6">
          <label className="block font-semibold mb-2" htmlFor="workInstruction">
            Work Instruction (Describe Steps)
          </label>
          <textarea
            id="workInstruction"
            value={formData.workInstruction}
            onChange={handleChange}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe the work instructions here..."
            rows={6}
          />
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2" htmlFor="imageFile">
              Image of Work Instruction
            </label>
            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'imageFile')}
              className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2" htmlFor="videoFile">
              Upload Video
            </label>
            <input
              type="file"
              id="videoFile"
              accept="video/mp4,video/mkv,video/mpeg4"
              onChange={(e) => handleFileChange(e, 'videoFile')}
              className="w-full p-3 border rounded-md file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <small className="text-red-700 mt-2 block">
              We support MP4, MKV, MPEG4, etc.
            </small>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveInstruction}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition-colors"
        >
          Save Updated Work Instruction
        </button>
      </div>
    </div>
  );
};

export default EditWorkInstruction;