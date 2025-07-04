import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosError } from "axios";

export const addStockOrder = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/create-stock-order", apiData);
    if (response.status === 201) {
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

export const selectCustomer = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/select-customer`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
