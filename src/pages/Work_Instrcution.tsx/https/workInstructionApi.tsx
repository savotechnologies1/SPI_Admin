import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const workInstructionApi = async () => {
  try {
    const response = await axiosInstance.get(`/work-process`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addWorkInstruction = async (data: object) => {
  try {
    const response = await axiosInstance.post("/create-work-instruction", data);
    localStorage.setItem("instructionId", response.data.instructionId);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const addWorkinstructionInfo = async (data: object) => {
  try {
    const response = await axiosInstance.post(
      "/create-work-instruction-detail",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const workInstructionList = async (
  page = 1,
  limit = 5,
  selectedValue: string,
  search: string,
  type: string
) => {
  try {
    const response = await axiosInstance.get(
      `/all-work-instructions?page=${page}&limit=${limit}&type=${selectedValue}&search=${search}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editWorkInstruction = async (data: object) => {
  try {
    const response = await axiosInstance.put(`/update-work-instruction`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const workInstructionDetail = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/work-instruction-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkInstruction = async (id: string, type: string) => {
  try {
    const response = await axiosInstance.put(
      `/delete-work-instruction/${id}?type=${type}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const deleteWorkInstructionSteps = async (id: string) => {
  try {
    const response = await axiosInstance.put(
      `/delete-work-instruction-step/${id}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
export const deleteWorkInstructionImage = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/delete-work-instruction-image/${id}`
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const selectProcessApi = async () => {
  try {
    const response = await axiosInstance.get(`/select-instruction-process`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const selectProductApi = async () => {
  try {
    const response = await axiosInstance.get(`/get-instructin-parts`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const selectProductInfoApi = async () => {
  try {
    const response = await axiosInstance.get(`/select-product-info`);
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const selectProductRelatedPartsApi = async (productId: string) => {
  try {
    const response = await axiosInstance.get(
      `/product-related-parts?productId=${productId}`
    );

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const getAllWorkInstructionApi = async () => {
  try {
    const response = await axiosInstance.get(`/select-work-instruction-title`);

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const applyWorkInstructionApi = async (data: object) => {
  try {
    const response = await axiosInstance.post("/apply-work-instruction", data);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
