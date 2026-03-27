import React, { useState, ChangeEvent } from "react";
import { sendStationNotification } from "./https/productionResponseApi";

interface EmployeeInfo {
  id: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

interface CommentBoxProps {
  employeeInfo: EmployeeInfo;
}

export default function CommentBox({ employeeInfo }: CommentBoxProps) {
  const [comment, setComment] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSend = async () => {
    if (!comment && !image) {
      alert("Please enter a comment or choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("comment", comment);
    formData.append("employeeId", employeeInfo.id);

    if (image) {
      formData.append("PartEnquiryImg", image);
    }

    try {
      await sendStationNotification(formData);
      setComment("");
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-6 p-4 border rounded-lg">
      <input
        type="text"
        placeholder="Write your comments"
        className="border border-gray-400 py-2 px-4 rounded-md w-full placeholder-gray-400 bg-transparent text-sm md:text-base"
        value={comment}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setComment(e.target.value)
        }
      />

      <div className="flex gap-3 w-full md:w-auto items-center">
        <label className="bg-brand text-white px-4 md:px-8 py-2 rounded-sm text-sm md:text-base font-semibold cursor-pointer whitespace-nowrap">
          Add Picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        <button
          className="bg-brand text-white px-4 py-2 rounded-sm text-sm md:text-base font-semibold w-full md:w-auto"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

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
