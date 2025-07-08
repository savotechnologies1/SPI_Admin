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
    if (response.status === 201) {
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
    const response = await axiosInstance.put(
      `/update-work-instruction/${id}`,
      data,
      {
        headers: {
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
    const response = await axiosInstance.get(`/get-work-detail/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorkInstruction = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/delete-work-instruction/${id}`);
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
export const selectProductRelatedPartsApi = async () => {
  try {
    const response = await axiosInstance.get(`/product-related-parts`);

    return response.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};
