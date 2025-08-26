import axiosInstance from "../../../../utils/axiosInstance";

export const employeeAllTimeLine = async () => {
  try {
    const response = await axiosInstance.get(`/all-employee-timeline`);
    return response;
  } catch (error) {
    throw error;
  }
};
