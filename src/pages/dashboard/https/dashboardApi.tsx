import axiosInstance from "../../../utils/axiosInstance";

export const checkTokenApi = async () => {
  try {
    const response = await axiosInstance.get(`/check-token`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dashBoardData = async (month = "") => {
  try {
    const response = await axiosInstance.get(`/dashboard-data`, {
      params: {
        month: month,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
