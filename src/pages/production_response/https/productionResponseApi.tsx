import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const selecEmployeeProcessApi = async () => {
  try {
    const response = await axiosInstance.get(
      `/select-schedule-employee-process`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const stationLogin = async (userData: object) => {
  try {
    const response = await axiosInstance.post("/station-login", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const stationProcessDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/get-schedule-process-information/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeOrder = async (id: string, data: string) => {
  try {
    console.log("datadata", data);

    const response = await axiosInstance.put(`/complete-order/${id}`, {
      orderId: data,
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};
