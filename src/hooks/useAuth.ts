import {
  fetchProfile,
  getToken,
  login as loginService,
  logoutService,
} from "@/src/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  logout,
  setError,
  setLoading,
  setUser,
} from "@/store/slices/authSlice";
import { useEffect } from "react";

import toast from "react-native-toast-message";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  // Auto fetch profile khi component mount nếu có token
  useEffect(() => {
    const initAuth = async () => {
      const token = await getToken();
      console.log("Auth init - Token exists:", !!token, "User exists:", !!user);

      if (token && !user && !isLoading) {
        dispatch(setLoading(true));
        try {
          console.log("Fetching user profile...");
          const userProfile = await fetchProfile();
          console.log("User profile fetched:", userProfile);
          dispatch(setUser(userProfile));
        } catch (error: any) {
          console.error("Auth init error:", error);
          dispatch(setError(error.message));
          // Nếu token không hợp lệ, logout
          dispatch(logout());
        } finally {
          dispatch(setLoading(false));
        }
      } else if (!token && user) {
        // Nếu không có token nhưng có user trong store, logout
        console.log("No token but user exists, logging out");
        dispatch(logout());
      } else if (!token && !user) {
        // Nếu không có token và không có user, set loading false
        dispatch(setLoading(false));
      }
    };

    initAuth();
  }, [dispatch, user, isLoading]); // Include dependencies to ensure proper updates

  // Function để kiểm tra auth status cho navigation
  const checkAuthStatus = async () => {
    try {
      const token = await getToken();
      return !!token;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return false;
    }
  };

  // Login function
  const login = async (formData: any) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const { user: userData } = await loginService(formData);

      dispatch(setUser(userData));
      toast.show({
        type: "success",
        text1: "Đăng nhập thành công!",
      });
      return userData;
    } catch (error: any) {
      dispatch(setError(error.message));
      toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Logout function
  const logoutUser = () => {
    logoutService();
    dispatch(logout());
    toast.show({
      type: "success",
      text1: "Đăng xuất thành công!",
    });
  };

  // Refresh profile
  const refreshProfile = async () => {
    if (!getToken()) return;

    dispatch(setLoading(true));
    try {
      const userProfile = await fetchProfile();
      dispatch(setUser(userProfile));
    } catch (error: any) {
      dispatch(setError(error.message));
      // Nếu refresh thất bại, có thể token hết hạn
      dispatch(logout());
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    user,
    isLoading,
    error,
    isAuthenticated: isAuthenticated || !!user,
    login,
    logout: logoutUser,
    refreshProfile,
    checkAuthStatus,
    hasToken: !!getToken(),
  };
};
