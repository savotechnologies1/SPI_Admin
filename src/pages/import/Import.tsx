import React, { useState } from 'react'
import cloud from '../../assets/cloud_check.png'
const Import = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="flex  p-10  bg-gray-100 ">
    <div className="bg-white p-6 py-20 rounded-lg shadow-lg w-full  text-center items-center justify-center flex flex-col">
      <div>
      <img src={cloud} alt="" />
      </div>
      <p className="text-lg font-bold mt-2">Choose a file or drag & drop it here</p>
      <p className="text-gray-500 text-sm">JPEG, PNG, PDG, and MP4 formats, up to 50 MB</p>
      <label className="mt-8 block bg-brand text-white px-4 py-2 rounded-lg cursor-pointer">
        <input type="file" className="hidden" onChange={handleFileChange} />
        Browse File
      </label>
      {file && <p className="mt-2 text-gray-700 text-sm">Selected: {file.name}</p>}
    </div>
  </div>
     )
}

export default Import
