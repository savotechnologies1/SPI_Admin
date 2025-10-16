import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const addEmployee = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/create-employee", apiData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const employeeList = async (
  page = 1,
  limit = 5,
  isShopFloor: string,
  searchVal: string,
  status = "" // 👈 Add status
) => {
  try {
    const response = await axiosInstance.get(
      `/all-employee?page=${page}&limit=${limit}&processLogin=${isShopFloor}&search=${searchVal}&status=${status}`
    );
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const employeeDetail = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/employee-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editEmployee = async (data: object, id: string) => {
  try {
    const response = await axiosInstance.put(`/edit-employee/${id}`, data);
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const deleteEmployee = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/delete-employee/${id}`);
    console.log("response222", response);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const sendEmailToTheEmployeeApi = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post(
      "/send-email-to-employee",
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

export const vacationList = async (
  page = 1,
  limit = 5,
  sortBy: string,
  search: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-vacation-request?page=${page}&limit=${limit}&sortBy=${sortBy}&search=${search}`
    );
    console.log("response.dataresponse.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const vacationReqDetail = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/vacation-req-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const vacationReqStatus = async (data: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.patch(
      `/change-vacation-request-status`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const allTimeClock = async (
  page: Number,
  limit: Number,
  filter: string,
  search: string
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-time-clock-list?page=${page}&limit=${limit}&filter=${filter}&search=${search}`
    );
    console.log("response.dataresponse.data", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendVacationReqStatus = async (data: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post(`/send-vacation-status`, data);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};
