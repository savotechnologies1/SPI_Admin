import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const updateProfile = async (
  data: object,
  profileImg: string,
  file: boolean
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    console.log(
      "profileImgprofileImgprofileImgprofileImgprofileImgprofileImg",
      file
    );
    const response = await axiosInstance.put(
      "/profile-update",
      {
        ...data,
        profileImg,
      },
      file === true
        ? {
            headers: {
              // 'Content-Type': 'application/json',
              "Content-Type": "multipart/form-data",
            },
          }
        : {
            headers: {
              "Content-Type": "application/json",
            },
          }
    );
    console.log("response222", response);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getProfile = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.get("/profile-detail");
   
    return response.data;
  } catch (error) {
    throw error
  }
};

export const deleteProfile = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.put("/profile-delete");
      if (response.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    
  }
};
