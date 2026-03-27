import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import axios, { AxiosError, AxiosResponse } from "axios";

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "An unexpected error occurred";
  }
  return "An unexpected error occurred";
};

export const selecEmployeeProcessApi = async () => {
  try {
    const response = await axiosInstance.get(
      `/select-schedule-employee-process`,
    );
    return response.data;
  } catch (error) {
    console.error(getErrorMessage(error));
  }
};

export const stationLogin = async (userData: Record<string, any>) => {
  try {
    const response = await axiosInstance.post("/station-login", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const stationProcessDetail = async (
  id: string,
  stationUserId: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/get-schedule-process-information/${id}?stationUserId=${stationUserId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const stationTrainingProcessDetail = async (
  id: string,
  stationUserId: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/get-training-schedule/${id}?stationUserId=${stationUserId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const traningStatus = async (data: {
  stationUserId: string;
  processId: string;
  productId: string;
}) => {
  try {
    const response = await axiosInstance.get(`/trainig-status`, {
      params: {
        stationUserId: data.stationUserId,
        processId: data.processId,
        productId: data.productId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const stationLogoutApi = async (
  id: string,
  logoutData: Record<string, any>,
) => {
  try {
    const response = await axiosInstance.post(`/station-logout/${id}`, {
      logoutData,
    });
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const completeOrder = async (
  id: string,
  orderId: string,
  order_type: string,
  partId: string,
  employeeId: string,
  productId: string,
  type: string,
  completedBy: string,
) => {
  try {
    const response = await axiosInstance.put(`/complete-order/${id}`, {
      orderId,
      order_type,
      partId,
      employeeId,
      productId,
      type,
      completedBy,
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const selectPartNamber1 = async () => {
  try {
    const response = await axiosInstance.get(`/select-parts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selectProductNamber1 = async () => {
  try {
    const response = await axiosInstance.get(`/select-products`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const completeScanOrder = async (
  id: string,
  orderId: string,
  order_type: string,
  partId: string,
  employeeId: string,
  productId: string,
  type: string,
  completedBy: string,
) => {
  try {
    const response = await axiosInstance.put(`/scan-complete/${id}`, {
      orderId,
      order_type,
      partId,
      employeeId,
      productId,
      type,
      completedBy,
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const completeTraningApi = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/complete-traning/${id}`);

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const updateStepTime = async (data: {
  productionId: string;
  stepId: string;
}) => {
  try {
    const response = await axiosInstance.post(
      `/production-response/update-step-time`,
      data,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const scrapOrder = async (
  id: string,
  orderId: string,
  order_type: string,
  partId: string,
  employeeId: string,
) => {
  try {
    const response = await axiosInstance.put(`/scrap-order/${id}`, {
      orderId,
      order_type,
      partId,
      employeeId,
    });

    if (response.status === 201) {
      toast.success(response.data.message);
    }

    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const processPartScan = async (
  productionId: string,
  scannedBarcode: string,
  employeeId: string,
) => {
  try {
    const response = await axiosInstance.post(
      `/production/${productionId}/scan`,
      {
        barcode: scannedBarcode,
        employeeId: employeeId,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const ScrapEntryApi = async (userData: Record<string, any>) => {
  try {
    const response = await axiosInstance.post("/add-scrap-entry", userData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
    throw error;
  }
};

export const allScrapEntries = async (
  page = 1,
  limit = 5,
  selectedValue: string,
  debouncedSearchVal: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/all-scrap-entry?page=${page}&limit=${limit}&filterScrap=${selectedValue}&search=${debouncedSearchVal}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selectPartNamber = async () => {
  try {
    const response = await axiosInstance.get(`/select-schedule-part-number`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const selectProductNumber = async () => {
  try {
    const response = await axiosInstance.get(`/select-schedule-product-number`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      toast.error(error.response.data.message);
    }
    return [];
  }
};

export const scrapEntryDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/scrap-entry-detail/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateScrapEntry = async (
  id: string,
  data: Record<string, any>,
) => {
  try {
    const response = await axiosInstance.put(`/update-scrap-entry/${id}`, data);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const sendStationNotification = async (data: FormData) => {
  try {
    const response = await axiosInstance.post(`/send-notification`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};

export const deleteScrapEntry = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/delete-scrap-entry/${id}`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error));
  }
};
