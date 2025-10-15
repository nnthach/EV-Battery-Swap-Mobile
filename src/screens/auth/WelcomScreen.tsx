import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function WelcomScreen() {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={["#49AFF0", "white"]} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <View className=" flex-1 justify-center items-center">
            <View className="w-64 h-64 rounded-full overflow-hidden">
              <Image
                source={require("@/assets/logo.png")}
                className="w-full h-full object-contain"
              />
            </View>
          </View>
          <View className="w-full items-center mt-auto gap-4 mb-10">
            <TouchableOpacity
              onPress={() => navigation.navigate("SignIn" as never)}
              className="bg-blue-third p-2 w-[80%] rounded-full items-center"
            >
              <Text className="text-xl text-white font-medium">Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp" as never)}
              className="bg-blue-third p-2 w-[80%] rounded-full items-center"
            >
              <Text className="text-xl text-white font-medium">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
