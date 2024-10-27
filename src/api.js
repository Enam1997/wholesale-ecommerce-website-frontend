// src/api.js
import axios from "axios";

export const baseURLLink = "http://localhost:5000/api/v1";
export const imageBaseURLLink = "http://localhost:5000/uploads";

export const productImageLink = (imageLink) =>
  `${imageBaseURLLink}/product-images/${imageLink}`;

export const homePageSliderImageLink = (imageLink) =>
  `${imageBaseURLLink}/home-slider-images/${imageLink}`;

export const categoryImageLink = (imageLink) =>
  `${imageBaseURLLink}/category-images/${imageLink}`;

const axiosInstance = axios.create({
  baseURL: baseURLLink,
  withCredentials: true, // Ensure cookies are sent with requests (for refresh tokens)
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.post("/users/refresh-token");
        const newToken = data.accessToken;

        // Store new token and retry original request
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        localStorage.setItem("accessToken", newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        window.location.href = "/login"; // Redirect to login if token refresh fails
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
