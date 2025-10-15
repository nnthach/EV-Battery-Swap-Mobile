import axiosClient from "@/config/axios";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login = async (
  formData: any
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axiosClient.post("auth/login", {
      usernameOrEmail: formData.usernameOrEmail,
      password: formData.password,
    });
    const token = response.data.access_token;

    await AsyncStorage.setItem("token", token);

    const user = await fetchProfile();

    return { token, user };
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getToken = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};

export const fetchProfile = async (): Promise<User> => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Không tìm thấy token");
    }

    const res = await axiosClient.get("user/me");

    const backendUser = res.data;

    const user: User = {
      id: backendUser.id,
      username: backendUser.username,
      email: backendUser.email,
      fullName: backendUser.fullName,
      avatar: backendUser.avatar,
      role: backendUser.role,
    };

    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutService = async () => {
  await AsyncStorage.removeItem("token");
};
