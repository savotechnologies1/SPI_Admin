import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const addProcess = async (userData: object) => {
  try {
    const response = await axiosInstance.post("/add-process", userData);
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const processList = async (page = 1, limit = 5) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-process?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const processDetail = async (id:string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/get-process-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editProcess = async (userData: object, id: string) => {
  try {
    const response = await axiosInstance.put(`/edit-process/${id}`, userData);
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const deleteProcess = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/delete-process/${id}`);
    console.log("response222", response);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};
