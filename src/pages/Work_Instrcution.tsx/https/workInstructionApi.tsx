import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const workInstructionApi = async () => {
  // eslint-disable-next-line no-useless-catch
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
  } catch (error: unknown) {
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
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("87878", response);

    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const workInstructionList = async (page = 1, limit = 5) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(
      `/all-work-instructions?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editWorkInstruction = async (data: object, id) => {
  try {
    const response = await axiosInstance.put(`/update-work-instruction`, data, {
      headers: {
        // 'Content-Type': 'application/json',
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};

export const workInstructionDetail = async (id: string) => {
  // eslint-disable-next-line no-useless-catch
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
    return response.data;
  } catch (error: unknown) {
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

export const selectProductRelatedPartsApi = async (productId) => {
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
  } catch (error: unknown) {
    toast.error(error.response.data.message);
  }
};
