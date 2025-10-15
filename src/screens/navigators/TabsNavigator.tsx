import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../tabs/HomeScreen";
import ProfileScreen from "../tabs/ProfileScreen";

const Tab = createBottomTabNavigator();
export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        // tabBarIcon: ({ color, size }) => {
        //   let iconName: keyof typeof Ionicons.glyphMap = "home";
        //   if (route.name === "Home") iconName = "home";
        //   else if (route.name === "Profile") iconName = "person";
        //   else if (route.name === "Settings") iconName = "settings";
        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
