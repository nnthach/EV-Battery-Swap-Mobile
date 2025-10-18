import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/tabs/HomeScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import BookingScreen from "../screens/tabs/BookingScreen";
import StationScreen from "../screens/tabs/StationScreen";
import { Home, CalendarCheck, MapPin, User } from "lucide-react-native";

const Tab = createBottomTabNavigator();
export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") return <Home size={size} color={color} />;
          else if (route.name === "Booking")
            return <CalendarCheck size={size} color={color} />;
          else if (route.name === "Station")
            return <MapPin size={size} color={color} />;
          else if (route.name === "Profile")
            return <User size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Station" component={StationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* History moved to StackNavigator */}
    </Tab.Navigator>
  );
}
