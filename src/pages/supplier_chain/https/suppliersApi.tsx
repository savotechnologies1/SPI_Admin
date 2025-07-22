import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosError } from "axios";

export const addSupplier = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/add-supplier", apiData);
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

export const supplierList = async (page = 1, limit = 5, searchVal: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-supplier?page=${page}&limit=${limit}&search=${searchVal}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const supplierDetail = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/supplier-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editSupplier = async (data: object, id: string) => {
  try {
    const response = await axiosInstance.put(`/edit-supplier/${id}`, data);
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

export const deleteSupplier = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/delete-supplier/${id}`);
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

export const selectSupplier = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/select-supplier`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSupplierOrder = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/add-supplier-order", apiData);
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

export const supplierOrderListApi = async (
  page = 1,
  limit = 5,
  searchVal: string
) => {
  try {
    const response = await axiosInstance.get(
      `/supplier-order-list?page=${page}&limit=${limit}&search=${searchVal}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editSupplierOrder = async (id: string, data: object) => {
  try {
    const response = await axiosInstance.put(
      `/update-supplier-order/${id}`,
      data
    );
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

export const deleteSupplierOrder = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/delete-supplier-order/${id}`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
