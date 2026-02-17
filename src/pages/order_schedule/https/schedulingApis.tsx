import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const addStockOrder = async (apiData: object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/create-stock-order", apiData);
    console.log("responseresponse", response);

    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.log("errorerror", error);
    toast.error(axiosError.response?.data?.message || "An error occurred");
  }
};

export const selectCustomer = async () => {
  try {
    const response = await axiosInstance.get(
      `/select-customer-for-stock-order`,
    );
    const data = response.data?.data ?? response.data ?? [];
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Failed to fetch customers.");
    }
    return [];
  }
};

export const selectProductNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/select-product-number-for-stock`,
    );
    // Handle both { data: [...] } and [...] response formats
    const data = response.data?.data ?? response.data ?? [];
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Failed to fetch product numbers.");
    }
    return [];
  }
};

export const selectPartNumber = async () => {
  try {
    const response = await axiosInstance.get(
      `/select-part-number-for-custom-order`,
    );
    // Handle both { data: [...] } and [...] response formats
    const data = response.data?.data ?? response.data ?? [];
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Failed to fetch part numbers.");
    }
    return [];
  }
};

export const getProductParts = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/product-parts/${id}`);
    // Handle both { data: [...] } and [...] response formats
    const data = response.data?.data ?? response.data ?? [];
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Failed to fetch part numbers.");
    }
    return [];
  }
};
export const selectProcess = async () => {
  try {
    const response = await axiosInstance.get(`/select-process`);
    // Handle both { data: [...] } and [...] response formats
    const data = response.data?.data ?? response.data ?? [];
    return Array.isArray(data) ? data : [];
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("Failed to fetch processes.");
    }
    return [];
  }
};
export const addCustomOrder = async (apiData: object) => {
  try {
    const response = await axiosInstance.post("/add-custom-orders", apiData);
    console.log("responseresponse", response);

    return response;
  } catch (err: unknown) {
    const axiosError = err as AxiosError<{ message: string }>;
    console.log("errorerrorerror", err);
    console.log("999999errerrerrerrerr", axiosError.response?.data?.message);
    const msg = axiosError.response?.data?.message || "Something went wrong";
    toast.error(axiosError.response?.data?.message);
    return null;
  }
};

export const searchStockOrder = async (searchParams: object) => {
  try {
    console.log("searchParams", searchParams);

    const response = await axiosInstance.get("/search-stock-order", {
      params: searchParams,
    });

    console.log("responseresponseresponse", response.data.message);

    // Check if response.data has a data property (common API pattern)
    const data = response.data?.data ?? response.data ?? [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("An error occurred while searching for stock orders.");
    }
    return [];
  }
};

export const searchCustomOrder = async (searchParams: object) => {
  try {
    console.log("searchParams", searchParams);

    const response = await axiosInstance.get("/search-custom-order", {
      params: searchParams,
    });
    return response.data || [];
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("An error occurred while searching for stock orders.");
    }
    return [];
  }
};
export const scheduleStockOrder = async (apiData: object) => {
  try {
    const response = await axiosInstance.post("/stock-order-schedule", apiData);
    console.log("response.statusresponse.status", response.data.message);

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

export const scheduleCustomOrder = async (apiData: object) => {
  try {
    const response = await axiosInstance.post(
      "/custom-order-schedule",
      apiData,
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

export const scheduleStockOrderListApi = async (
  page = 1,
  limit = 5,
  type: string,
  searchTerm: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/stock-order-schedule-list?page=${page}&limit=${limit}&order_type=${type}&search=${searchTerm}`,
    );
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response?.data?.message) {
      toast.error(axiosError.response.data.message);
    } else {
      toast.error("An error occurred while searching for stock orders.");
    }
    return [];
  }
};
export const validateQty = async (productId: string, quantity: number) => {
  try {
    const res = await fetch(
      "http://localhost:5000/api/validate-stock-quantity",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("API error:", error);
    alert("Something went wrong.");
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
    const axiosError = error as AxiosError<{ message: string }>;
    toast.error(axiosError.response?.data?.message || "An error occurred");
  }
};

export const deleteScheduleOrder = async (id: string, orderId: string) => {
  try {
    console.log("orderIdorderId", orderId);
    const response = await axiosInstance.delete(
      `/delete-schedule-order/${id}?orderId=${orderId}`,
    );
    console.log("response222", response);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    console.log("errorerror", error);
    toast.error(axiosError.response?.data?.message);
  }
};
