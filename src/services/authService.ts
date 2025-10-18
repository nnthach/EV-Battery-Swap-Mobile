import axiosClient from "@/src/config/axios";
import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

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

    // success toast
    try {
      Toast.show({ type: "success", text1: "Đăng nhập thành công" });
    } catch (e) {
      // ignore toast errors
    }

    return { token, user };
  } catch (error: any) {
    try {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
      });
    } catch (e) {}
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
      phone: backendUser.phone,
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

export const updateProfile = async (
  payload: Partial<Pick<User, "fullName" | "avatar">>
): Promise<void> => {
  try {
    const body: any = {};
    if (payload.fullName !== undefined) body.fullName = payload.fullName;
    if (payload.avatar !== undefined) body.avatar = payload.avatar;

    const res = await axiosClient.patch("user/update-profile", body);

    try {
      Toast.show({ type: "success", text1: "Cập nhật hồ sơ thành công" });
    } catch (e) {}

    return;
  } catch (error: any) {
    try {
      Toast.show({
        type: "error",
        text1: "Cập nhật hồ sơ thất bại",
      });
    } catch (e) {}
    throw new Error(error?.message || "Failed to update profile");
  }
};

export const uploadAvatar = async (fileUri: string): Promise<string> => {
  try {
    // Backend expected multipart/form-data at 'user/upload-avatar'
    const form = new FormData();
    // @ts-ignore - React Native file object
    form.append("file", {
      uri: fileUri,
      name: `avatar_${Date.now()}.jpg`,
      type: "image/jpeg",
    });

    const res = await axiosClient.post("user/upload-avatar", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // assume response contains { url: string }
    return res.data.url;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to upload avatar");
  }
};
