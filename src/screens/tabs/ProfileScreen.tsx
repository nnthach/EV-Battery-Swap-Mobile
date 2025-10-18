import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  UserCircle,
  History,
  CalendarCheck,
  DollarSign,
  LogOut,
  ChevronRight,
  Bell,
} from "lucide-react-native";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";

type MenuItem = {
  id: number;
  title: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
  iconColor: string;
  onPress?: () => void;
};
export default function ProfileScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Account Information",
      bgColor: "bg-green-200",
      textColor: "text-green-500",
      icon: <UserCircle size={28} color="#22c55e" />,
      iconColor: "#22c55e",
      onPress: () =>
        navigation.navigate("Stacks", {
          screen: "AccountInformation",
        } as never),
    },
    {
      id: 2,
      title: "Usage History",
      bgColor: "bg-blue-200",
      textColor: "text-blue-500",
      icon: <History size={28} color="#3b82f6" />,
      iconColor: "#3b82f6",
      onPress: () =>
        navigation.navigate("Stacks", {
          screen: "History",
        } as never),
    },
    {
      id: 3,
      title: "My Booking",
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-500",
      icon: <CalendarCheck size={28} color="#eab308" />,
      iconColor: "#eab308",
      onPress: () =>
        navigation.navigate("Stacks", {
          screen: "MyBooking",
        } as never),
    },
    {
      id: 4,
      title: "Transaction History",
      bgColor: "bg-purple-200",
      textColor: "text-purple-500",
      icon: <DollarSign size={28} color="#a855f7" />,
      iconColor: "#a855f7",
      onPress: () =>
        navigation.navigate("Stacks", {
          screen: "TransactionHistory",
        } as never),
    },
    {
      id: 5,
      title: "Logout",
      bgColor: "bg-red-200",
      textColor: "text-red-500",
      icon: <LogOut size={28} color="#ef4444" />,
      iconColor: "#ef4444",
      onPress: () => {
        // logout();
      },
    },
  ];
  const { user } = useSelector((state: RootState) => state.auth);

  const lastInitial =
    (user?.fullName ?? "").trim().split(" ").pop()?.[0]?.toUpperCase() ?? "";

  return (
    <LinearGradient colors={["#49AFF0", "white"]} className="flex-1">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/*heading */}
          <View className="px-6 flex-row justify-between items-center">
            <Image
              source={require("@/assets/logoTextWhite.png")}
              style={{ height: 56, width: 120, resizeMode: "contain" }}
            />
            <Bell size={24} color="white" />
          </View>

          {/*User */}
          <View className="justify-center items-center mt-4 gap-2">
            <View className="bg-gray-50 w-28 h-28 rounded-full overflow-hidden justify-center items-center">
              {user?.avatar ? (
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-5xl font-bold text-blue-500">
                  {lastInitial}
                </Text>
              )}
            </View>
            <Text className="text-white text-2xl font-medium">
              {user?.fullName}
            </Text>
          </View>

          {/*Content */}
          <View className="flex-1 justify-end">
            {/*Main content */}
            <View className="h-[95%] bg-white px-6 rounded-t-[30px]">
              <Text className="font-semibold text-xl mt-10 mb-4 text-blue-third">
                Account Overview
              </Text>

              {/*List */}
              <View className="gap-2">
                {menuItems.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.6}
                    className="flex-row justify-between items-center py-3"
                    onPress={item.onPress}
                  >
                    {/* Left */}
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`${item.bgColor} rounded-full w-12 h-12 items-center justify-center`}
                      >
                        {item.icon}
                      </View>
                      <Text className={`${item.textColor} font-medium text-xl`}>
                        {item.title}
                      </Text>
                    </View>

                    {/* Right */}
                    <ChevronRight size={28} color="gray" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
