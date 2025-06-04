import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosError } from "axios";

export const addSupplier = async (apiData:object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/add-supplier", apiData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  }  catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};


export const supplierList = async (page = 1, limit = 5) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-supplier?page=${page}&limit=${limit}`
    );
    console.log('response.dataresponse.data',response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const customerList = async (page = 1, limit = 5,searchVal: string) => {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const response = await axiosInstance.get(
//       `/all-customer-list?page=${page}&limit=${limit}&search=${searchVal}`
//     );
//     console.log('response.dataresponse.data',response.data)
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const supplierDetail = async (id:string) => {
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
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  }  catch (error: unknown) {
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
    console.log("response222", response);
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

// export const deleteCustomer = async (id: string) => {
//   try {
//     const response = await axiosInstance.put(`/delete-customer/${id}`);
//     console.log("response222", response);
//     if (response.status === 201) {
//       toast.success(response.data.message);
//     }
//     return response.data;
//   } catch (error: unknown) {
//     toast.error(error.response.data.message);
//   }
// };