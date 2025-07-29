// import { useForm } from "react-hook-form";
// import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
// import logo from "../../assets/logo.png";
// import setting from "../../assets/settings_icon.png";
// import { NavLink, useNavigate } from "react-router-dom";

// const StationLogin = () => {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = (data: any) => {};

//   const navigate = useNavigate();

//   const RunSchedule = () => {
//     navigate("/run-schedule");
//   };
//   const RunWithScrap = () => {
//     navigate("/run-with-scan");
//   };
//   const Training = () => {
//     navigate("/training");
//   };

//   return (
//     <>
//       <div className="bg-[#F5F6FA]">
//         <div className="justify-between flex flex-row items-center px-4 py-2">
//           <div className="flex items-center gap-3">
//             <div className="relative group">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="text-gray-600 hover:text-black"
//               >
//                 <FaArrowLeft size={20} />
//               </button>
//               <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 w-62 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition">
//                 Back to dashboard
//               </div>
//             </div>

//             <img className="w-[126px]" src={logo} alt="Logo" />
//           </div>

//           <div className="flex items-center gap-2">
//             <img src={setting} alt="Settings" />
//             <p className="font-semibold text-sm">Need Help?</p>
//           </div>
//         </div>
//         <div className="min-h-screen  flex items-center justify-center">
//           <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
//             <h1 className="text-2xl font-bold text-center mb-6">
//               Station / Process Login
//             </h1>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               {/* Station */}
//               <div>
//                 <label className="block text-gray-700 font-medium">
//                   Station
//                 </label>
//                 <select
//                   {...register("station", { required: true })}
//                   className="w-full mt-1 p-3 border rounded-md"
//                 >
//                   <option value="">Select Process Name</option>
//                   <option value="Cut Trim">Cut Trim</option>
//                   <option value="Inspection">Inspection</option>
//                   <option value="Packaging">Packaging</option>
//                 </select>
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-gray-700 font-medium">Name</label>
//                 <select
//                   {...register("name", { required: true })}
//                   className="w-full mt-1 p-3 border rounded-md"
//                 >
//                   <option value="">No Selection</option>
//                   <option value="John Doe">John Doe</option>
//                   <option value="Jane Smith">Jane Smith</option>
//                   <option value="Alice Brown">Alice Brown</option>
//                 </select>
//               </div>

//               {/* Buttons */}
//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={RunSchedule}
//                   className="w-full bg-brand text-white py-2 rounded-md  transition"
//                 >
//                   Run Schedule
//                 </button>

//                 <div className="flex justify-between ">
//                   <button
//                     onClick={RunWithScrap}
//                     type="button"
//                     className="w-full bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white py-2  rounded-md  transition"
//                   >
//                     Run With Scan
//                   </button>

//                   <button
//                     onClick={Training}
//                     type="button"
//                     className="w-full bg-gradient-to-r from-[#FFAC82] to-[#FF5630] text-white py-2 rounded-md  transition ml-2"
//                   >
//                     Training
//                   </button>
//                 </div>
//                 <NavLink to="/scrap-entry">
//                   <button
//                     type="button"
//                     className="w-full flex items-center justify-center border border-gray-300 py-2 mt-6 rounded-md hover:bg-gray-100 transition font-bold"
//                   >
//                     Scrap Entry <FaChevronRight className="ml-2 " />
//                   </button>
//                 </NavLink>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StationLogin;

import { useFormik } from "formik";
import * as Yup from "yup";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import logo from "../../assets/logo.png";
import setting from "../../assets/settings_icon.png";
import { NavLink, useNavigate } from "react-router-dom";

const StationLogin = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [processList, partList] = await Promise.all([
  //         selectProcess(),
  //         partNumberList(currentPage, rowsPerPage),
  //       ]);
  //       setProcessData(processList);
  //       setPartData(partList.data);
  //       setTotalPages(partList.pagination?.totalPages || 1);
  //     } catch (error) {
  //       toast.error("Failed to fetch data");
  //     }
  //   };
  //   fetchData();
  // }, [currentPage]);

  const formik = useFormik({
    initialValues: {
      station: "",
      name: "",
    },
    // validationSchema: Yup.object({
    //   station: Yup.string().required("Station is required"),
    //   name: Yup.string().required("Name is required"),
    // }),
    onSubmit: (values) => {
      navigate("/run-schedule");
      console.log("Form Submitted", values);
      // You can also do conditional navigation based on station or name here
    },
  });

  const RunSchedule = () => {
    navigate("/run-schedule");
  };
  const RunWithScrap = () => {
    navigate("/run-with-scan");
  };
  const Training = () => {
    navigate("/training");
  };

  return (
    <div className="bg-[#F5F6FA]">
      {/* Header */}
      <div className="justify-between flex flex-row items-center px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-black"
            >
              <FaArrowLeft size={20} />
            </button>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 w-62 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition">
              Back to dashboard
            </div>
          </div>
          <img className="w-[126px]" src={logo} alt="Logo" />
        </div>
        <div className="flex items-center gap-2">
          <img src={setting} alt="Settings" />
          <p className="font-semibold text-sm">Need Help?</p>
        </div>
      </div>

      {/* Main Form */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">
            Station / Process Login
          </h1>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Station Field */}
            <div>
              <label className="block text-gray-700 font-medium">Station</label>
              <select
                name="station"
                value={formik.values.station}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 p-3 border rounded-md"
              >
                <option value="">Select Process Name</option>
                <option value="Cut Trim">Cut Trim</option>
                <option value="Inspection">Inspection</option>
                <option value="Packaging">Packaging</option>
              </select>
              {formik.touched.station && formik.errors.station && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.station}
                </p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <select
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full mt-1 p-3 border rounded-md"
              >
                <option value="">No Selection</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Alice Brown">Alice Brown</option>
              </select>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full bg-brand text-white py-2 rounded-md transition"
              >
                Run Schedule
              </button>

              <div className="flex justify-between">
                <button
                  onClick={RunWithScrap}
                  type="button"
                  className="w-full bg-gradient-to-r from-[#5BE49B] to-[#00A76F] text-white py-2 rounded-md transition"
                >
                  Run With Scan
                </button>

                <button
                  onClick={Training}
                  type="button"
                  className="w-full bg-gradient-to-r from-[#FFAC82] to-[#FF5630] text-white py-2 rounded-md transition ml-2"
                >
                  Training
                </button>
              </div>

              <NavLink to="/scrap-entry">
                <button
                  type="button"
                  className="w-full flex items-center justify-center border border-gray-300 py-2 mt-6 rounded-md hover:bg-gray-100 transition font-bold"
                >
                  Scrap Entry <FaChevronRight className="ml-2 " />
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StationLogin;
