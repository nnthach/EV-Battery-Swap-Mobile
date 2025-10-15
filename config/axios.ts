import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import toast from "react-native-toast-message";
// Tạo instance chung

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting token:", error);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Xử lý lỗi chung (401, 403, 500...)
    if (error.response?.status === 401) {
      toast.show({
        type: "error",
        text1: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      });
      // Có thể redirect về /login hoặc refresh token
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
