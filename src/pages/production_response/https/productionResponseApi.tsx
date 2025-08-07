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
  } catch (error: any) {
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

export const stationLogoutApi = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/station-logout/${id}`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const completeOrder = async (
  id: string,
  orderId: string,
  partId: string,
  employeeId: string,
  productId: string
) => {
  try {
    const response = await axiosInstance.put(`/complete-order/${id}`, {
      orderId,
      partId,
      employeeId,
      productId,
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

export const completeTraningApi = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/complete-traning/${id}`);

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

export const updateStepTime = async (productionId: string, stepId: string) => {
  try {
    const response = await axiosInstance.put(
      `/production-response/${productionId}/update-step-time`,
      { stepId }
    );

    if (response.status === 200) {
      toast.success("Step marked as completed.");
    }

    return response.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to update step.");
  }
};

export const scrapOrder = async (
  id: string,
  orderId: string,
  partId: string,
  employeeId: string
) => {
  try {
    const response = await axiosInstance.put(`/scrap-order/${id}`, {
      orderId,
      partId,
      employeeId,
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Something went wrong");
  }
};

export const processPartScan = async (
  productionId: string,
  scannedBarcode: string,
  employeeId: string
) => {
  const response = await axiosInstance.post(
    `/production/${productionId}/scan`,
    {
      barcode: scannedBarcode,
      employeeId: employeeId,
    }
  );
  return response.data;
};

export const ScrapEntryApi = async (userData: object) => {
  try {
    const response = await axiosInstance.post("/add-scrap-entry", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const allScrapEntries = async (page = 1, limit = 5) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-scrap-entry?page=${page}&limit=${limit}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
