import axiosInstance from "../../../utils/axiosInstance";

export const checkTokenApi = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get(`/check-token`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
