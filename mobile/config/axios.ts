import { HOST_API } from "@/config/config-global";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export const endPoints = {
  getApartments: "/apartments/",
};
