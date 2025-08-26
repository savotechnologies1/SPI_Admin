import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const updateProfile = async (
  data: object,
  profileImg: string,
  file: boolean
) => {
  try {
    const response = await axiosInstance.put(
      "/profile-update",
      {
        ...data,
        profileImg,
      },
      file === true
        ? {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        : {
            headers: {
              "Content-Type": "application/json",
            },
          }
    );
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/profile-detail");

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosInstance.put("/delete-profile-image");
    if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
