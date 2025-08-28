// import { toast } from "react-toastify";
// import axiosInstance from "../../../utils/axiosInstance";

// export const addProcess = async (userData: object) => {
//   try {
//     const response = await axiosInstance.post("/add-process", userData);
//     if (response.status === 201) {
//       toast.success(response.data.message);
//     }
//     return response;
//   } catch (error: unknown) {
//     toast.error(error.response.data.message);
//   }
// };

// export const processList = async (page = 1, limit = 5, searchVal: string) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axiosInstance.get(
//       `/all-process?page=${page}&limit=${limit}&search=${searchVal}`
//     );

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const processDetail = async (id: string) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axiosInstance.get(`/get-process-detail/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const editProcess = async (userData: object, id: string) => {
//   try {
//     const response = await axiosInstance.put(`/edit-process/${id}`, userData);
//     if (response.status === 201) {
//       toast.success(response.data.message);
//     }
//     return response;
//   } catch (error: unknown) {
//     toast.error(error.response.data.message);
//   }
// };

// export const deleteProcess = async (id: string) => {
//   try {
//     const response = await axiosInstance.put(`/delete-process/${id}`);
//     if (response.status === 200) {
//       toast.success(response.data.message);
//     }
//     return response;
//   } catch (error: unknown) {
//     toast.error(error.response.data.message);
//   }
// };

// import { toast } from "react-toastify";
// import axiosInstance from "../../../utils/axiosInstance";
// import { AxiosResponse } from "axios";

// interface ProcessData {
//   processName: string;
//   machineName: string;
//   partFamily: string;
//   processDesc: string;
//   cycleTime: number;
//   ratePerHour: number;
//   isProcessReq: boolean;
// }

// interface ApiResponse<T> {
//   message: string;
//   data: T;
//   pagination?: {
//     totalPages: number;
//     currentPage: number;
//   };
// }

// export const addProcess = async (
//   userData: ProcessData
// ): Promise<AxiosResponse<ApiResponse<ProcessData>> | undefined> => {
//   try {
//     const response: AxiosResponse<ApiResponse<ProcessData>> =
//       await axiosInstance.post("/add-process", userData);
//     if (response.status === 201) {
//       toast.success(response.data.message);
//     }
//     return response;
//   } catch (error: unknown) {
//     toast.error(error.response.data.message);
//   }
// };

// export const processList = async (
//   page = 1,
//   limit = 5,
//   searchVal: string
// ): Promise<ApiResponse<ProcessData[]>> => {
//   try {
//     const response: AxiosResponse<ApiResponse<ProcessData[]>> =
//       await axiosInstance.get(
//         `/all-process?page=${page}&limit=${limit}&search=${searchVal}`
//       );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
// export const processDetail = async (
//   id: string
// ): Promise<ApiResponse<ProcessData>> => {
//   try {
//     const response: AxiosResponse<ApiResponse<ProcessData>> =
//       await axiosInstance.get(`/get-process-detail/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const editProcess = async (
//   payload: ProcessData,
//   id: string
// ): Promise<AxiosResponse<ApiResponse<ProcessData>> | undefined> => {
//   try {
//     const response: AxiosResponse<ApiResponse<ProcessData>> =
//       await axiosInstance.put(`/edit-process/${id}`, payload);
//     if (response.status === 200) {
//       toast.success(response.data.message);
//     }
//     return response;
//   } catch (error: any) {
//     toast.error(error.response.data.message);
//   }
// };

// // 6. Delete process
// export const deleteProcess = async (
//   id: string
// ): Promise<AxiosResponse<ApiResponse<null>> | undefined> => {
//   try {
//     const response: AxiosResponse<ApiResponse<null>> = await axiosInstance.put(
//       `/delete-process/${id}`
//     );
//     if (response.status === 200) {
//       toast.success(response.data.message);
//     }
//     return response;
//   } catch (error: any) {
//     toast.error(error.response.data.message);
//   }
// };
// processApi.ts
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosResponse } from "axios";

// Corrected ProcessData interface to match the payload in EditProcess.tsx
interface ProcessData {
  processName: string;
  machineName: string;
  partFamily: string;
  processDesc: string;
  cycleTime: string; // Changed to string
  ratePerHour: number;
  isProcessReq: boolean;
}

interface ApiResponse<T> {
  message: string;
  data: T;
  pagination?: {
    totalPages: number;
    currentPage: number;
  };
}

export const addProcess = async (
  userData: ProcessData
): Promise<AxiosResponse<ApiResponse<ProcessData>> | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<ProcessData>> =
      await axiosInstance.post("/add-process", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    // Catch as 'any' for simpler error handling of response.data.message
    toast.error(error.response.data.message);
  }
};

export const processList = async (
  page = 1,
  limit = 5,
  searchVal: string
): Promise<ApiResponse<ProcessData[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProcessData[]>> =
      await axiosInstance.get(
        `/all-process?page=${page}&limit=${limit}&search=${searchVal}`
      );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const processDetail = async (
  id: string
): Promise<AxiosResponse<ApiResponse<ProcessData>>> => {
  // Return AxiosResponse as well
  try {
    const response: AxiosResponse<ApiResponse<ProcessData>> =
      await axiosInstance.get(`/get-process-detail/${id}`);
    return response; // Return the full response, not just data, to match EditProcess.tsx expectation
  } catch (error) {
    throw error;
  }
};

export const editProcess = async (
  payload: ProcessData,
  id: string
): Promise<AxiosResponse<ApiResponse<ProcessData>> | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<ProcessData>> =
      await axiosInstance.put(`/edit-process/${id}`, payload);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

// 6. Delete process
export const deleteProcess = async (
  id: string
): Promise<AxiosResponse<ApiResponse<null>> | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await axiosInstance.put(
      `/delete-process/${id}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
