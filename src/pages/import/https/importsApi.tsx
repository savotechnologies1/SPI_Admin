import { AxiosError } from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
export const importApi = async (url: string, formData: FormData) => {
  try {
    const response = await axiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 200 || response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{
      message: string;
      errors?: string[];
    }>;

    if (axiosError.response) {
      // Don't toast here — handle in handleUpload
      return axiosError.response;
    } else {
      toast.error("Something went wrong");
    }
  }
};
