// axiosConfig.js
import axios from "axios";
import { API_URL } from "./config/apiConfig";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo")).access
      : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Comment out
      // originalRequest._retry = true; 

      // try {
      //   const refreshToken = JSON.parse(
      //     localStorage.getItem("userInfo")
      //   ).refresh;
      //   const response = await axiosInstance.post("/api/token/refresh/", {
      //     refresh: refreshToken,
      //   });

      //   localStorage.setItem(
      //     "userInfo",
      //     JSON.stringify({
      //       ...JSON.parse(localStorage.getItem("userInfo")),
      //       access: response.data.access,
      //     })
      //   );

      //   axiosInstance.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${response.data.access}`;
      //   originalRequest.headers[
      //     "Authorization"
      //   ] = `Bearer ${response.data.access}`;

      //   return axiosInstance(originalRequest);
      // } catch (refreshError) {
      //   localStorage.removeItem("userInfo");
      //   window.location.href = "/login";
      //   return Promise.reject(refreshError);
      // }

      // Directly handle expired token scenario
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance as axios };
