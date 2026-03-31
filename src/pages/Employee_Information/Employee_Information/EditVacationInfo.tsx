// // import { FaCircle } from "react-icons/fa";
// // import { NavLink, useNavigate, useParams } from "react-router-dom";
// // import { useForm } from "react-hook-form";
// // import {
// //   deleteEmployee,
// //   editEmployee,
// //   vacationReqDetail,
// // } from "../https/EmployeeApis";
// // import { useEffect } from "react";

// // type FormData = {
// //   firstName: string;
// //   lastName: string;
// //   fullName: string;
// //   email: string;
// //   startDate: string;
// //   endDate: string;
// //   hours: number;
// //   notes: string;
// //   status: string;
// // };

// // const EditVacationInfo = () => {
// //   const { register, handleSubmit, reset } = useForm<FormData>();
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const onSubmit = async (data: FormData) => {
// //     console.log("Form Submitted:", data);
// //     try {
// //       const response = await editEmployee(data, id);
// //       if (response?.status == 200) {
// //         navigate("/employees");
// //       }
// //     } catch (error: unknown) {
// //       throw error;
// //     }
// //   };
// //   const fetchProcessDetail = async () => {
// //     try {
// //       const response = await vacationReqDetail(id);
// //       const data = response.data;

// //       reset({
// //         firstName: data.employee.firstName,
// //         lastName: data.employee.lastName,
// //         fullName: data.employee.fullName,
// //         email: data.employee.email,
// //         startDate: data.startDate.slice(0, 10),
// //         endDate: data.endDate.slice(0, 10),
// //         hours: data.hours,
// //         notes: data.notes || "",
// //         status: data.status,
// //       });
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   useEffect(() => {
// //     fetchProcessDetail();
// //   }, [id]);

// //   const handleDelete = async () => {
// //     try {
// //       const response = await deleteEmployee(id);
// //       if (response?.status == 200) {
// //         navigate("/employees");
// //       }
// //     } catch (error: unknown) {
// //       console.log("errorerror", error);
// //     }
// //   };
// //   return (
// //     <div className="p-4 md:p-7">
// //       <div>
// //         <div className="flex flex-col sm:flex-row justify-between gap-4">
// //           <div>
// //             <h1 className="font-bold text-xl md:text-2xl text-black">
// //               Edit Vacation Information
// //             </h1>
// //           </div>
// //         </div>

// //         <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
// //           <p
// //             className={`text-sm md:text-base text-black`}
// //             onClick={() => "dashboardDetailes"}
// //           >
// //             <NavLink to={"/dashboardDetailes"}>Dashboard</NavLink>
// //           </p>
// //           <span>
// //             <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
// //           </span>
// //           <span className="text-sm md:text-base hover:cursor-pointer">
// //             Employees
// //           </span>
// //           <span>
// //             <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
// //           </span>
// //           <span className="text-sm md:text-base hover:cursor-pointer">
// //             Edit Employee
// //           </span>
// //         </div>
// //       </div>

// //       <form
// //         onSubmit={handleSubmit(onSubmit)}
// //         className="bg-white p-6 rounded-xl shadow-md max-w-xl  mt-4 space-y-4"
// //       >
// //         <div>
// //           <label className="font-semibold block mb-1">Employee Name</label>
// //           <div className="flex gap-2">
// //             <input
// //               {...register("firstName")}
// //               placeholder="First Name"
// //               className="w-1/2 border px-4 py-2 rounded-md"
// //             />
// //             <input
// //               {...register("lastName")}
// //               placeholder="Last Name"
// //               className="w-1/2 border px-4 py-2 rounded-md"
// //             />
// //           </div>
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">Employee Full Name</label>
// //           <input
// //             {...register("fullName")}
// //             placeholder="Full Name"
// //             className="w-full border px-4 py-2 rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">Employee Email</label>
// //           <input
// //             {...register("email")}
// //             placeholder="Employee Email"
// //             className="w-full border px-4 py-2 rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">Start Date</label>
// //           <input
// //             type="date"
// //             {...register("startDate")}
// //             className="w-full border px-4 py-2 rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">End Date</label>
// //           <input
// //             type="date"
// //             {...register("endDate")}
// //             className="w-full border px-4 py-2 rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">Hours</label>
// //           <input
// //             type="text"
// //             {...register("hours")}
// //             placeholder="1"
// //             className="w-full border px-4 py-2 rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">Note</label>
// //           <input
// //             type="text"
// //             {...register("notes")}
// //             className="w-full border px-4 py-2 rounded-md"
// //           />
// //         </div>

// //         <div>
// //           <label className="font-semibold block mb-1">Status</label>
// //           <select
// //             {...register("status")}
// //             className="w-full border px-4 py-2 rounded-md text-gray-600"
// //           >
// //             <option value="">Status</option>
// //             <option value="PENDING">Pending</option>
// //             <option value="ACTIVE">Active</option>
// //             <option value="BANNED">Banned</option>
// //             <option value="REJECTED">Rejected</option>
// //           </select>
// //         </div>
// //         <div className="flex justify-end pt-2">
// //           <button
// //             type="submit"
// //             className="bg-brand text-white px-4 py-2 rounded-md"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default EditVacationInfo;
// import React, { useEffect } from "react";
// import { FaCircle } from "react-icons/fa";
// import { NavLink, useNavigate, useParams } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import {
//   deleteEmployee,
//   editEmployee,
//   vacationReqDetail,
// } from "../https/EmployeeApis";

// // 1. Define the interface for the API response
// interface VacationDetailResponse {
//   employee: {
//     firstName: string;
//     lastName: string;
//     fullName: string;
//     email: string;
//   };
//   startDate: string;
//   endDate: string;
//   hours: number;
//   notes?: string;
//   status: string;
// }

// type FormData = {
//   firstName: string;
//   lastName: string;
//   fullName: string;
//   email: string;
//   startDate: string;
//   endDate: string;
//   hours: number;
//   notes: string;
//   status: string;
// };

// const EditVacationInfo: React.FC = () => {
//   const { register, handleSubmit, reset } = useForm<FormData>();
//   const { id } = useParams<{ id: string }>(); // Explicitly type the param
//   const navigate = useNavigate();

//   const onSubmit = async (data: FormData) => {
//     if (!id) return; // Guard clause for undefined id
//     try {
//       const response = await editEmployee(data, id);
//       if (response?.status === 200) {
//         navigate("/employees");
//       }
//     } catch (error: unknown) {
//       console.error("Submit error:", error);
//     }
//   };

//   const fetchProcessDetail = async () => {
//     if (!id) return; // Guard clause
//     try {
//       const response = await vacationReqDetail(id);
//       // Cast the response data to our interface
//       const data = response.data as VacationDetailResponse;

//       reset({
//         firstName: data.employee.firstName,
//         lastName: data.employee.lastName,
//         fullName: data.employee.fullName,
//         email: data.employee.email,
//         startDate: data.startDate.slice(0, 10),
//         endDate: data.endDate.slice(0, 10),
//         hours: data.hours,
//         notes: data.notes || "",
//         status: data.status,
//       });
//     } catch (error) {
//       console.log("Fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProcessDetail();
//   }, [id]);

//   const handleDelete = async () => {
//     if (!id) return;
//     try {
//       const response = await deleteEmployee(id);
//       if (response?.status === 200) {
//         navigate("/employees");
//       }
//     } catch (error: unknown) {
//       console.log("Delete error:", error);
//     }
//   };

//   return (
//     <div className="p-4 md:p-7">
//       <div>
//         <div className="flex flex-col sm:flex-row justify-between gap-4">
//           <h1 className="font-bold text-xl md:text-2xl text-black">
//             Edit Vacation Information
//           </h1>
//           <button
//             onClick={handleDelete}
//             className="text-red-500 hover:text-red-700 text-sm font-semibold"
//           >
//             Delete Request
//           </button>
//         </div>

//         <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2">
//           <NavLink
//             to="/dashboardDetailes"
//             className="text-sm md:text-base text-black"
//           >
//             Dashboard
//           </NavLink>
//           <span>
//             <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//           </span>
//           <span className="text-sm md:text-base hover:cursor-pointer">
//             Employees
//           </span>
//           <span>
//             <FaCircle className="text-[4px] md:text-[6px] text-gray-500" />
//           </span>
//           <span className="text-sm md:text-base hover:cursor-pointer text-gray-400">
//             Edit Employee
//           </span>
//         </div>
//       </div>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded-xl shadow-md max-w-xl mt-4 space-y-4"
//       >
//         <div>
//           <label className="font-semibold block mb-1">Employee Name</label>
//           <div className="flex gap-2">
//             <input
//               {...register("firstName")}
//               placeholder="First Name"
//               className="w-1/2 border px-4 py-2 rounded-md"
//             />
//             <input
//               {...register("lastName")}
//               placeholder="Last Name"
//               className="w-1/2 border px-4 py-2 rounded-md"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Employee Full Name</label>
//           <input
//             {...register("fullName")}
//             placeholder="Full Name"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Employee Email</label>
//           <input
//             {...register("email")}
//             placeholder="Employee Email"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//         </div>

//         <div className="flex gap-4">
//           <div className="w-1/2">
//             <label className="font-semibold block mb-1">Start Date</label>
//             <input
//               type="date"
//               {...register("startDate")}
//               className="w-full border px-4 py-2 rounded-md"
//             />
//           </div>
//           <div className="w-1/2">
//             <label className="font-semibold block mb-1">End Date</label>
//             <input
//               type="date"
//               {...register("endDate")}
//               className="w-full border px-4 py-2 rounded-md"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Hours</label>
//           <input
//             type="number"
//             {...register("hours", { valueAsNumber: true })} // Important for number types
//             placeholder="1"
//             className="w-full border px-4 py-2 rounded-md"
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Note</label>
//           <textarea
//             {...register("notes")}
//             className="w-full border px-4 py-2 rounded-md"
//             rows={3}
//           />
//         </div>

//         <div>
//           <label className="font-semibold block mb-1">Status</label>
//           <select
//             {...register("status")}
//             className="w-full border px-4 py-2 rounded-md text-gray-600"
//           >
//             <option value="">Status</option>
//             <option value="PENDING">Pending</option>
//             <option value="ACTIVE">Active</option>
//             <option value="BANNED">Banned</option>
//             <option value="REJECTED">Rejected</option>
//           </select>
//         </div>

//         <div className="flex justify-end pt-2">
//           <button
//             type="submit"
//             className="bg-brand text-white px-8 py-2 rounded-md hover:bg-opacity-90 transition"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditVacationInfo;
import React, { useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  vacationReqDetail,
  editEmployee, // Isko apne Vacation Update API se replace karein agar alag hai
  deleteEmployee,
} from "../https/EmployeeApis";

// Form Types
type FormData = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  startDate: Date | null;
  endDate: Date | null;
  hours: number;
  notes: string;
  status: string;
};

const EditVacationInfo: React.FC = () => {
  const { register, handleSubmit, reset, control } = useForm<FormData>();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const fetchProcessDetail = async () => {
    if (!id) return;
    try {
      const response = await vacationReqDetail(id);
      const data = response.data;

      // Prefilling Logic
      reset({
        firstName: data.employee.firstName,
        lastName: data.employee.lastName,
        fullName: data.employee.fullName,
        email: data.employee.email,
        // String date ko Date object mein convert karna zaroori hai picker ke liye
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        hours: data.hours,
        notes: data.notes || "",
        status: data.status, // Ensure API value matches option values (e.g., "APPROVED")
      });
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProcessDetail();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    if (!id) return;
    
    // API ko data bhejte waqt wapis string format (YYYY-MM-DD) mein convert karein
    const payload = {
      ...data,
      startDate: data.startDate?.toISOString().split('T')[0],
      endDate: data.endDate?.toISOString().split('T')[0],
    };

    try {
      const response = await editEmployee(payload, id);
      if (response?.status === 200) {
        navigate("/employees");
      }
    } catch (error: unknown) {
      console.error("Submit error:", error);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      const response = await deleteEmployee(id);
      if (response?.status === 200) navigate("/employees");
    } catch (error: unknown) {
      console.log("Delete error:", error);
    }
  };

  return (
    <div className="p-4 md:p-7">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="font-bold text-xl md:text-2xl text-black">
          Edit Vacation Information
        </h1>
        <button onClick={handleDelete} className="text-red-500 hover:text-red-700 text-sm font-semibold">
          Delete Request
        </button>
      </div>

      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center mt-2 gap-1 md:gap-2 mb-4">
        <NavLink to="/dashboardDetailes" className="text-sm md:text-base text-black">Dashboard</NavLink>
        <span><FaCircle className="text-[4px] text-gray-500" /></span>
        <span className="text-sm md:text-base">Employees</span>
        <span><FaCircle className="text-[4px] text-gray-500" /></span>
        <span className="text-sm md:text-base text-gray-400">Edit Vacation</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md max-w-xl space-y-4">
        
        {/* Name Fields */}
        <div>
          <label className="font-semibold block mb-1">Employee Name</label>
          <div className="flex gap-2">
            <input {...register("firstName")} className="w-1/2 border px-4 py-2 rounded-md bg-gray-50" readOnly />
            <input {...register("lastName")} className="w-1/2 border px-4 py-2 rounded-md bg-gray-50" readOnly />
          </div>
        </div>

        {/* Email & Full Name */}
        <div>
          <label className="font-semibold block mb-1">Employee Full Name</label>
          <input {...register("fullName")} className="w-full border px-4 py-2 rounded-md bg-gray-50" readOnly />
        </div>

        <div>
          <label className="font-semibold block mb-1">Employee Email</label>
          <input {...register("email")} className="w-full border px-4 py-2 rounded-md bg-gray-50" readOnly />
        </div>

        {/* Date Fields (Using react-datepicker for MM/DD/YYYY) */}
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="font-semibold block mb-1">Start Date</label>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MM/dd/yyyy"
                  className="w-full border px-4 py-2 rounded-md"
                  placeholderText="MM/DD/YYYY"
                />
              )}
            />
          </div>
          <div className="w-1/2">
            <label className="font-semibold block mb-1">End Date</label>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="MM/dd/yyyy"
                  className="w-full border px-4 py-2 rounded-md"
                  placeholderText="MM/DD/YYYY"
                />
              )}
            />
          </div>
        </div>

        {/* Hours */}
        <div>
          <label className="font-semibold block mb-1">Hours</label>
          <input type="number" {...register("hours")} className="w-full border px-4 py-2 rounded-md" />
        </div>

        {/* Notes */}
        <div>
          <label className="font-semibold block mb-1">Note</label>
          <textarea {...register("notes")} className="w-full border px-4 py-2 rounded-md" rows={3} />
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold block mb-1">Status</label>
          <select {...register("status")} className="w-full border px-4 py-2 rounded-md text-gray-600">
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option> {/* API says "APPROVED", so must have this option */}
            <option value="ACTIVE">Active</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        <div className="flex justify-end pt-2">
          <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVacationInfo;