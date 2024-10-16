// src/api.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/users",
  withCredentials: true, // Ensure cookies are sent with requests (for refresh tokens)
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axiosInstance.post("/refresh-token");
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
