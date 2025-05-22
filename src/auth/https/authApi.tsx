import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loginApi = async (userData: object) => {
  try {
    const response = await axiosInstance.post("/login", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const forgetPassword = async (data: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/forget-password", data);
    localStorage.setItem("email", response.data.email);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const otpVarify = async (data: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/validate-otp", data);
    localStorage.removeItem("email");
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (data: object) => {
  const token = localStorage.getItem("token");
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/reset-password", {
      ...data,
      token: token,
    });

    localStorage.removeItem("email");
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};
