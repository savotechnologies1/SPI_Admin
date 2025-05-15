import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const workInstructionApi = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/work-process`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addWork = async (data: object) => {
  console.log('datadata',data)
  try {
    const response = await axiosInstance.post("/add-work", data);
    console.log("response222", response);
    localStorage.setItem("instructionId",response.data.instructionId)
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};


export const addWorkinstruction = async (data: object) => {
  console.log('datadata',data)
  try {
    const response = await axiosInstance.post("/add-work-instruction", data);
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};


export const workInstructionList = async (page = 1, limit = 5) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/work-instruction-list?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

