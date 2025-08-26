import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosError } from "axios";

export const addSupplier = async (apiData: object) => {
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
  try {
    const response = await axiosInstance.get(`/select-supplier`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSupplierOrder = async (apiData: object) => {
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

export const deleteSupplierInventory = async (id: string) => {
  try {
    const response = await axiosInstance.patch(
      `/delete-supplier-invetory/${id}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const sendSupplierEmailApi = async (id) => {
  try {
    const response = await axiosInstance.post(`/supplier-order-email`, {
      id: id,
    });
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const supplierOrderDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/get-supplier-order-detail/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateSupplierOrderStatus = async (
  id: string,
  quantity: string,
  part_id: string,
  status: string
) => {
  try {
    const response = await axiosInstance.patch(`/change-order-status/${id}`, {
      quantity: quantity,
      part_id: part_id,
      status: status,
    });
  } catch (error) {
    throw error;
  }
};
