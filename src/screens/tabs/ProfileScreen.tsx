import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItem = {
  id: number;
  title: string;
  bgColor: string;
  textColor: string;
  // iconName: MaterialIconName; // type an toàn cho icon
  iconColor: string;
  onPress?: () => void;
};
export default function ProfileScreen() {
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Account Information",
      bgColor: "bg-green-200",
      textColor: "text-green-500",
      // iconName: "person-outline",
      iconColor: "#22c55e",
    },
    {
      id: 2,
      title: "Usage History",
      bgColor: "bg-blue-200",
      textColor: "text-blue-500",
      // iconName: "history",
      iconColor: "#3b82f6",
    },
    {
      id: 3,
      title: "My Booking",
      bgColor: "bg-yellow-200",
      textColor: "text-yellow-500",
      // iconName: "calendar-month",
      iconColor: "#eab308",
    },
    {
      id: 4,
      title: "Transaction History",
      bgColor: "bg-purple-200",
      textColor: "text-purple-500",
      // iconName: "attach-money",
      iconColor: "#a855f7",
    },
    {
      id: 5,
      title: "Logout",
      bgColor: "bg-red-200",
      textColor: "text-red-500",
      // iconName: "logout",
      iconColor: "#ef4444",
      onPress: () => {
        // logout();
      },
    },
  ];
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
            {/* <Entypo name="bell" size={24} color="white" /> */}
          </View>

          {/*User */}
          <View className="justify-center items-center mt-4 gap-2">
            <View className="bg-gray-50 w-28 h-28 rounded-full">
              <Image />
            </View>
            <Text className="text-white text-2xl font-medium">
              Nguyen Ngoc Thach
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
                        {/* <MaterialIcons
                          name={item.iconName}
                          size={28}
                          color={item.iconColor}
                        /> */}
                      </View>
                      <Text className={`${item.textColor} font-medium text-xl`}>
                        {item.title}
                      </Text>
                    </View>

                    {/* Right */}
                    {/* <MaterialIcons
                      name="keyboard-arrow-right"
                      size={28}
                      color="gray"
                    /> */}
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
