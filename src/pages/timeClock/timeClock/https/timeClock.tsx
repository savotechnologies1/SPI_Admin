import axiosInstance from "../../../../utils/axiosInstance";

export const employeeAllTimeLine = async (
  page = 1,
  limit = 5,
  filter: string,
  searchVal: string
) => {
  try {
    const response = await axiosInstance.get(
      `/all-employee-timeline?page=${page}&limit=${limit}&filter=${filter}&search=${searchVal}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};
