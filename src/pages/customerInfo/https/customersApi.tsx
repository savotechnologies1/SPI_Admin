import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const addCustomer = async (apiData:object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/create-customer", apiData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
     toast.error(error.response.data.message);

  }
};


export const customerList = async (page = 1, limit = 5,searchVal: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-customer-list?page=${page}&limit=${limit}&search=${searchVal}`
    );
    console.log('response.dataresponse.data',response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerDetail = async (id:string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/get-customer-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editCustomer = async (data: object, id: string) => {
  try {
    const response = await axiosInstance.put(`/edit-customer-detail/${id}`, data);
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};


export const deleteCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/delete-customer/${id}`);
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};