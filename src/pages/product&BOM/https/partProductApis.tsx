import { toast } from "react-toastify";
import axiosInstance from "../../../utils/axiosInstance";

export const createProductNumber= async (apiData:object) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axiosInstance.post("/create-product-number", apiData);
    if (response.status === 201) {
      toast.success(response.data.message);
    }
    return response;
  } catch (error) {
     toast.error(error.response.data.message);

  }
};
