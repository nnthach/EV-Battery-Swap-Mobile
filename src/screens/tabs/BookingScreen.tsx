import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { RootStackParamList, Station } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function BookingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [stations] = useState<Station[]>([
    {
      id: "1",
      name: "Brewery Electric Motorcycle Repair",
      address:
        "Jl. Mega Kuningan Barat No.3, RW.2, Kuningan, Kuningan Timur, Jakarta Selatan",
      latitude: 10.7769,
      longitude: 106.7017,
      status: "available",
      batteryCount: 8,
      openTime: "Monday, 10:00 - 21:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 2,
    },
    {
      id: "2",
      name: "District 3 Station",
      address: "123 Vo Van Tan, District 3, Ho Chi Minh City",
      latitude: 10.7834,
      longitude: 106.6934,
      status: "occupied",
      batteryCount: 5,
      openTime: "Monday, 08:00 - 22:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 1,
    },
    {
      id: "3",
      name: "Binh Thanh Station",
      address: "456 Xo Viet Nghe Tinh, Binh Thanh, Ho Chi Minh City",
      latitude: 10.8008,
      longitude: 106.7122,
      status: "available",
      batteryCount: 12,
      openTime: "Monday, 06:00 - 23:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 3,
    },
    {
      id: "4",
      name: "Tan Binh Station",
      address: "789 Cong Hoa, Tan Binh, Ho Chi Minh City",
      latitude: 10.8142,
      longitude: 106.6438,
      status: "available",
      batteryCount: 7,
      openTime: "Monday, 07:00 - 21:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 2,
    },
    {
      id: "5",
      name: "Go Vap Station",
      address: "321 Nguyen Oanh, Go Vap, Ho Chi Minh City",
      latitude: 10.8376,
      longitude: 106.6676,
      status: "maintenance",
      batteryCount: 0,
      openTime: "Monday, 08:00 - 20:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 0,
    },
    {
      id: "6",
      name: "Thu Duc Station",
      address: "654 Vo Van Ngan, Thu Duc, Ho Chi Minh City",
      latitude: 10.8525,
      longitude: 106.7517,
      status: "available",
      batteryCount: 15,
      openTime: "Monday, 06:00 - 22:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      swappableBatteries: 4,
    },
  ]);
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      {/*header */}
      <View className="flex-row justify-between items-center bg-white px-6 pl-4">
        <Image
          source={require("@/assets/logoTextBlue.png")}
          style={{ height: 56, width: 120, resizeMode: "contain" }}
        />
        {/* <Entypo name="bell" size={24} color="#37b6fe" /> */}
      </View>

      <View className="flex-1 bg-blue-five">
        <View className="px-6 mt-6 pb-4">
          <View className="flex-row items-center bg-blue-five px-4 py-1 border-[0.5px] border-black rounded-full">
            {/* <Ionicons name="search-outline" size={24} color="#37b6fe" /> */}
            <TextInput
              placeholder="Search station..."
              placeholderTextColor="#9ca3af"
              className="ml-2 flex-1 text-base text-gray-700"
            />
          </View>
        </View>

        {/*Station list */}
        <ScrollView
          className="bg-blue-five px-6 pt-0"
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View className="gap-4">
            {stations.map((item) => (
              <View
                key={item.id}
                className="bg-white border-[0.5px] border-black p-6 rounded-xl"
              >
                <Text className="font-semibold text-xl">{item.name}</Text>

                <View className="flex-row items-center mb-2">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                  <Text className="text-green-600 text-sm font-medium">
                    Open
                  </Text>
                  <View className="w-2 h-2 bg-orange-500 rounded-full ml-4 mr-2" />
                  <Text className="text-orange-600 text-sm font-medium">
                    {item.swappableBatteries} Batteries Swappable
                  </Text>
                </View>

                <View className="flex-row gap-2 items-start my-4">
                  {/* <Ionicons name="location-outline" size={18} color="#374151" /> */}
                  <Text className="text-gray-700 flex-1">{item.address}</Text>
                </View>

                <View className="flex-row gap-2 items-start">
                  {/* <Ionicons name="time-outline" size={20} color="#374151" /> */}
                  <Text className="text-gray-700 flex-1">{item.openTime}</Text>
                </View>

                <View className="w-full h-[1px] bg-black my-6" />

                <View className="flex-row justify-between items-center">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("Stacks", {
                        screen: "StationDetail",
                        params: { stationId: "1" },
                      })
                    }
                  >
                    <Text className="text-blue-primary font-medium text-lg underline">
                      Station Detail
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className="bg-blue-primary rounded-full"
                    activeOpacity={0.8}
                  >
                    <Text className="text-white font-medium text-lg p-2 px-4 ">
                      Booking
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
