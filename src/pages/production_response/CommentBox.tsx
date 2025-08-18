import React, { useState } from "react";
import axios from "axios";
import { sendStationNotification } from "./https/productionResponseApi";

export default function CommentBox({ employeeInfo }) {
  console.log(employeeInfo);

  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle sending comment + image
  const handleSend = async () => {
    if (!comment && !image) {
      alert("Please enter a comment or choose an image.");
      return;
    }
    console.log("comment", comment, image);

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("employeeId", employeeInfo.id);
    if (image) {
      formData.append("PartEnquiryImg", image);
    }

    try {
      const res = await sendStationNotification(formData);
      console.log("Response:", res.data);

      // Reset fields
      setComment("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
      <input
        type="text"
        placeholder="Write your comments"
        className="border border-gray-400 py-2 px-4 rounded-md w-full placeholder-gray-400 bg-transparent text-sm md:text-base"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex gap-3 w-full md:w-auto items-center">
        {/* Image Upload Button */}
        <label className="bg-brand text-white px-4 md:px-8 py-2 rounded-sm text-sm md:text-base font-semibold cursor-pointer">
          Add Picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {/* Send Button */}
        <button
          className="bg-brand text-white px-4 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mt-3 md:mt-0">
          <img
            src={preview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-md border"
          />
        </div>
      )}
    </div>
  );
}
