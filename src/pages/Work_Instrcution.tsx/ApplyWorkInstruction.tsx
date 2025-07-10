// import { useEffect, useState } from "react";
// import { FaCircle } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import Select from "react-select";
// import {
//   selectProcessApi,
//   selectProductApi,
//   selectProductRelatedPartsApi,
// } from "./https/workInstructionApi";
// const ApplyWorkInstruction = () => {
//   const [formData, setFormData] = useState({
//     workInstruction: "",
//     process: "",
//     product: "",
//     part: "",
//   });
//   const [productData, setProductData] = useState<any[]>([]);
//   const [processData, setProcessData] = useState<any[]>([]);
//   const [partData, setPartData] = useState<any[]>([]);
//   useEffect(() => {
//     fetchProcess();
//     selectProduct();
//   }, []);

//   const fetchProcess = async () => {
//     try {
//       const response = await selectProcessApi();
//       setProcessData(response || []);
//     } catch (error) {
//       console.error("Failed to fetch process:", error);
//     }
//   };

//   const selectProduct = async () => {
//     try {
//       const response = await selectProductApi();
//       setProductData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch product:", error);
//     }
//   };
//   const selectPart = async () => {
//     try {
//       const response = await selectProductRelatedPartsApi(
//         formik.values.productId
//       );
//       console.log("Parts response:", response.data);
//       setPartData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch parts:", error);
//     }
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { id, value } = e.target;
//     setFormData((prev) => ({ ...prev, [id]: value }));
//   };

//   const handleSubmit = () => {
//     // Add your submission logic here
//   };

//   const breadcrumbs = [
//     { path: "/dashboardDetailes", label: "Dashboard" },
//     { label: "Work Instruction" },
//     { label: "Apply work instruction to different product/process" },
//   ];

//   return (
//     <div className="p-4 sm:p-6">
//       <div>
//         <h1 className="font-bold text-xl sm:text-2xl text-black">
//           Add Work Instruction
//         </h1>
//       </div>

//       {/* Breadcrumbs */}
//       <div className="flex items-center mt-2 gap-2">
//         {breadcrumbs.map((item, index) => (
//           <div key={index} className="flex items-center gap-2">
//             {item.path ? (
//               <NavLink
//                 to={item.path}
//                 className="text-xs sm:text-sm text-black hover:underline"
//               >
//                 {item.label}
//               </NavLink>
//             ) : (
//               <span className="text-xs sm:text-sm cursor-default">
//                 {item.label}
//               </span>
//             )}
//             {index < breadcrumbs.length - 1 && (
//               <FaCircle className="text-[6px] text-gray-500" />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Form */}
//       <div className="mt-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm">
//         {/* First Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div className="w-full sm:w-1/2">
//             <label className="font-semibold">Select Process</label>
//             <Select
//               options={processData.map((item) => ({
//                 value: item.id,
//                 label: item.name,
//               }))}
//               name="processId"
//               onChange={(selectedOption) =>
//                 setFieldValue("processId", selectedOption?.value || "")
//               }
//               value={
//                 processData
//                   .map((item) => ({
//                     value: item.id,
//                     label: item.name,
//                   }))
//                   .find((opt) => opt.value === values.processId) || null
//               }
//               isClearable
//             />
//             {touched.processId && errors.processId && (
//               <div className="text-red-500 text-sm mt-1">
//                 {errors.processId}
//               </div>
//             )}
//           </div>
//           <div>
//             <label
//               className="block font-semibold mb-2"
//               htmlFor="workInstruction"
//             >
//               Select Work Instruction
//             </label>
//             <select
//               id="workInstruction"
//               value={formData.workInstruction}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Select Work Instruction</option>
//               {[1, 2, 3].map((num) => (
//                 <option key={num} value={`Work Instruction ${num}`}>
//                   Work Instruction {num}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block font-semibold mb-2" htmlFor="process">
//               Select Process``
//             </label>
//             <select
//               id="process"
//               value={formData.process}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Select Process</option>
//               {[1, 2, 3].map((num) => (
//                 <option key={num} value={`Process ${num}`}>
//                   Process {num}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Second Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <label className="block font-semibold mb-2" htmlFor="product">
//               Select Product
//             </label>
//             <select
//               id="product"
//               value={formData.product}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Select Product</option>
//               {[1, 2, 3].map((num) => (
//                 <option key={num} value={`Product ${num}`}>
//                   Product {num}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block font-semibold mb-2" htmlFor="part">
//               Select Part
//             </label>
//             <select
//               id="part"
//               value={formData.part}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             >
//               <option value="">Select Part</option>
//               {[1, 2, 3].map((num) => (
//                 <option key={num} value={`Part ${num}`}>
//                   Part {num}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button
//           onClick={handleSubmit}
//           className="bg-brand text-white px-5 py-3 rounded-lg transition-colors"
//         >
//           Add Work Instruction
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ApplyWorkInstruction;
import { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import {
  selectProcessApi,
  selectProductApi,
  selectProductRelatedPartsApi,
  getAllWorkInstructionApi,
  applyWorkInstructionApi,
  // applyWorkInstructionApi,
} from "./https/workInstructionApi";

const ApplyWorkInstruction = () => {
  const [workInstructions, setWorkInstructions] = useState([]);
  const [productData, setProductData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [partData, setPartData] = useState([]);

  const [formData, setFormData] = useState({
    workInstructionId: "",
    processId: "",
    productId: "",
    partId: "",
  });

  useEffect(() => {
    fetchProcess();
    fetchProducts();
    fetchWorkInstructions();
  }, []);

  useEffect(() => {
    if (formData.productId) {
      fetchParts(formData.productId);
    }
  }, [formData.productId]);

  const fetchProcess = async () => {
    const res = await selectProcessApi();
    setProcessData(res || []);
  };

  const fetchProducts = async () => {
    const res = await selectProductApi();
    setProductData(res?.data || []);
  };

  const fetchParts = async (productId) => {
    const res = await selectProductRelatedPartsApi(productId);
    setPartData(res?.data || []);
  };

  const fetchWorkInstructions = async () => {
    const res = await getAllWorkInstructionApi();
    setWorkInstructions(res?.data || []);
  };

  const handleSelectChange = (selectedOption, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOption?.value || "",
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        workInstructionId: formData.workInstructionId,
        processId: formData.processId,
        productId: formData.productId,
        partId: formData.partId,
      };

      await applyWorkInstructionApi(payload);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const breadcrumbs = [
    { path: "/dashboardDetailes", label: "Dashboard" },
    { label: "Work Instruction" },
    { label: "Apply work instruction to different product/process" },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h1 className="font-bold text-xl sm:text-2xl text-black mb-2">
        Apply Work Instruction
      </h1>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-4">
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
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Work Instruction */}
          <div>
            <label className="font-semibold block mb-1">
              Select Work Instruction
            </label>
            <Select
              options={workInstructions.map((item) => ({
                value: item.id,
                label: item.title,
              }))}
              onChange={(opt) => handleSelectChange(opt, "workInstructionId")}
              isClearable
            />
          </div>

          {/* Process */}
          <div>
            <label className="font-semibold block mb-1">Select Process</label>
            <Select
              options={processData.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              onChange={(opt) => handleSelectChange(opt, "processId")}
              isClearable
            />
          </div>

          {/* Product */}
          <div>
            <label className="font-semibold block mb-1">Select Product</label>
            <Select
              options={productData.map((item) => ({
                value: item.id,
                label: item.partNumber,
              }))}
              onChange={(opt) => handleSelectChange(opt, "productId")}
              isClearable
            />
          </div>

          {/* Part */}
          <div>
            <label className="font-semibold block mb-1">Select Part</label>
            <Select
              options={partData.map((item) => ({
                value: item.part.part_id,
                label: item.part.partNumber,
              }))}
              onChange={(opt) => handleSelectChange(opt, "partId")}
              isClearable
            />
          </div>
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="bg-brand text-white px-5 py-3 rounded-lg"
          >
            Apply Work Instruction
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyWorkInstruction;
