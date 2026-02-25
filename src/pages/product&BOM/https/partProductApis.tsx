import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";
import axios from "axios";

export const createPartNumber = async (apiData: FormData | object) => {
  try {
    const response = await axiosInstance.post("/create-part-number", apiData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      toast.success(response.data.message || "Part created successfully!");
    }
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } else {
      toast.error("An unexpected error occurred");
    }
    throw error;
  }
};
export const updatePartNumber = async (id: string, apiData: object) => {
  try {
    const response = await axiosInstance.put(
      `/update-part-number/${id}`,
      apiData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      toast.error(
        (error as any).response?.data?.message || "An error occurred",
      );
    }
  }
};

export const updateProductNumber = async (apiData: object, id: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.put(
      `/update-product-number/${id}`,
      apiData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      toast.error(
        (error as any).response?.data?.message || "An error occurred",
      );
    }
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
      `/part-number-list?page=${page}&limit=${limit}`,
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
      apiData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    if (error && typeof error === "object" && "response" in error) {
      toast.error(
        (error as any).response?.data?.message || "An error occurred",
      );
    }
  }
};

export const getPartDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/part-number-detail/${id}`);

    return response.data;
  } catch (error) {}
};

export const bomList = async (
  page = 1,
  limit = 5,
  searchVal: string,
  selectedValue: string,
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/bom-data-list?page=${page}&limit=${limit}&search=${searchVal}&type=${selectedValue}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const productTree = async (page = 1, limit = 5, searchVal: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/get-product-tree?page=${page}&limit=${limit}&search=${searchVal}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPartNumberDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/get-part-detail/${id}`);

    return response.data;
  } catch (error) {}
};

export const getProductNumberDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/get-product-detail/${id}`);

    return response.data;
  } catch (error) {}
};

export const getProcessDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/get-process-detail/${id}`);

    return response.data;
  } catch (error) {}
};

export const deletePartNumber = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/delete-part-number/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteProductNumber = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/delete-product-number/${id}`);

    return response.data;
  } catch (error) {}
};

export const deleteProductPartNumber = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/delete-product-part/${id}`);

    return response.data;
  } catch (error) {
    console.error("Error deleting product part number", error);
    throw error;
  }
};

export const deleteProductImage = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/delete-part-image/${id}`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting product part number", error);
    throw error;
  }
};

export const deleteProductPartNumber1 = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/delete-product-part-number/${id}`,
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {}
};
