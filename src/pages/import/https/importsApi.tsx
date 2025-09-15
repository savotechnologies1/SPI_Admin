import { AxiosError } from "axios";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";

export const importApi = async (url: string, formData: FormData) => {
  try {
    console.log("formDataformData", formData);

    const response = await axiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("responseresponse", response);

    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
