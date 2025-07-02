import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { data } from "react-router-dom";

export const createPartNumber = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/create-part-number", apiData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const selectProcess = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/select-process`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const partNumberList = async (page = 1, limit = 5) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/part-number-list?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selectPartNamber = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/select-part-number`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProductNumber = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post(
      "/create-product-number",
      apiData
    );
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getPartDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/part-number-detail/${id}`);

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
