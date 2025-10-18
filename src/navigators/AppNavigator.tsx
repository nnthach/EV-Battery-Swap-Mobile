import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import AuthNavigator from "./AuthNavigator";
import StackNavigator from "./StackNavigator";
import { RootStackParamList } from "@/types";
import { fetchProfile, getToken } from "@/src/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      if (token) {
        const user = await fetchProfile();
        dispatch(setUser(user));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log("Không thể tự động đăng nhập:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Tabs" : "Auth"}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Tabs" component={TabsNavigator} />
      <Stack.Screen name="Stacks" component={StackNavigator} />
    </Stack.Navigator>
  );
}
