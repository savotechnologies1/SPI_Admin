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

export const dashBoardData = async (month = "") => {
  // Default to empty string for no filter
  try {
    const response = await axiosInstance.get(`/dashboard-data`, {
      params: {
        month: month, // Send the month parameter to the backend
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
