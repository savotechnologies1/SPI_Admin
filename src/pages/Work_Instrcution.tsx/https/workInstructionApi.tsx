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

export const addWorkInstruction = async (data: object) => {
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
