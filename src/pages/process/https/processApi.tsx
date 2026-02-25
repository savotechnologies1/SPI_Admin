import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosResponse } from "axios";
interface ProcessData {
  processName: string;
  machineName: string;
  partFamily: string;
  processDesc: string;
  cycleTime: string;
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
  userData: ProcessData,
): Promise<AxiosResponse<ApiResponse<ProcessData>> | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<ProcessData>> =
      await axiosInstance.post("/add-process", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const processList = async (
  page = 1,
  limit = 5,
  searchVal: string,
): Promise<ApiResponse<ProcessData[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProcessData[]>> =
      await axiosInstance.get(
        `/all-process?page=${page}&limit=${limit}&search=${searchVal}`,
      );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const processDetail = async (
  id: string,
): Promise<AxiosResponse<ApiResponse<ProcessData>>> => {
  try {
    const response: AxiosResponse<ApiResponse<ProcessData>> =
      await axiosInstance.get(`/get-process-detail/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editProcess = async (
  id: string,
  payload: ProcessData,
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

export const deleteProcess = async (
  id: string,
): Promise<AxiosResponse<ApiResponse<null>> | undefined> => {
  try {
    const response: AxiosResponse<ApiResponse<null>> = await axiosInstance.put(
      `/delete-process/${id}`,
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
