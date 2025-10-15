import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackParamList } from "@/types";
import { LinearGradient } from "expo-linear-gradient";

type StationDetailRouteProp = RouteProp<StackParamList, "StationDetail">;

interface BatterySlot {
  id: number;
  level: number;
  label: string;
  swappable: boolean;
}

export default function StationDetailStack() {
  const route = useRoute<StationDetailRouteProp>();
  const { stationId } = route.params;
  const navigation = useNavigation();

  const batterySlots: BatterySlot[] = [
    { id: 1, level: 100, label: "Slot 1", swappable: true },
    { id: 2, level: 60, label: "Slot 2", swappable: true },
    { id: 3, level: 10, label: "Slot 3", swappable: false },
  ];

  const getBatteryColor = (level: number): string => {
    if (level >= 80) return "#22C55E";
    if (level >= 30) return "#F59E0B";
    return "#EF4444";
  };

  const station = {
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
  };

  const reviews = [
    {
      id: 1,
      name: "Nguyen Thach",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "2 days ago",
      rating: 5,
      comment:
        "Great service and friendly staff. The swapping process was fast and smooth!",
    },
    {
      id: 2,
      name: "Linh Tran",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "5 days ago",
      rating: 4,
      comment:
        "Good experience overall. The location is a bit hard to find, though.",
    },
  ];
  return (
    <View className="flex-1 bg-gray-200">
      {/*Image */}
      <View className="relative h-[400px]">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={[
            "rgba(0,0,0,0.7)", // trên tối
            "transparent", // giữa sáng
            "rgba(0,0,0,0.7)", // dưới tối
          ]}
          start={{ x: 0.5, y: 0 }} // bắt đầu từ trên giữa
          end={{ x: 0.5, y: 1 }} // kết thúc ở dưới giữa
          className="absolute top-0 left-0 right-0 bottom-0"
        />
        {/*Back */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center">
          <TouchableOpacity
            className="w-10 h-10 rounded-full bg-black/30 items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            {/* <Ionicons name="arrow-back" size={24} color="white" /> */}
          </TouchableOpacity>
        </View>

        {/*station status */}
        <View className="absolute top-[190px] left-6 flex-row gap-2">
          <View className="bg-white px-3 py-1.5 rounded-full flex-row items-center gap-1">
            <View className="w-2 h-2 rounded-full bg-green-500" />
            <Text className="text-sm font-medium">Open</Text>
          </View>
          <View className="bg-orange-500 px-3 py-1.5 rounded-full flex-row items-center gap-1">
            <Text className="text-sm font-medium text-white">
              ⚡ {station.swappableBatteries} Batteries Swappable
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1 bg-white rounded-3xl  px-5 py-4 -mt-48 mx-6 mb-6 overflow-hidden">
        {/*Info */}
        <ScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
        >
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            {station.name}
          </Text>

          {/*Address */}
          <View className="flex-row items-start gap-3 mb-4">
            {/* <Ionicons name="location-outline" size={18} color="#374151" /> */}
            <Text className="flex-1 text-gray-600 text-sm leading-5">
              {station.address}
            </Text>
          </View>

          {/*time */}
          <View className="flex-row items-center gap-3">
            {/* <Ionicons name="time-outline" size={20} color="#374151" /> */}
            <Text className="text-gray-900 text-sm">Monday, 10:00 - 21:00</Text>
          </View>

          {/*battery */}
          <View className="mt-6">
            <Text className="text-xs font-semibold text-gray-500 uppercase mb-2 tracking-wide">
              Batteries
            </Text>

            {batterySlots.map((slot, index) => (
              <View
                key={slot.id}
                className={`flex-row items-center justify-between py-4 ${
                  index < batterySlots.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="relative">
                    <View className="w-16 h-8 bg-gray-100 rounded-md overflow-hidden">
                      <View
                        style={{
                          width: `${slot.level}%`,
                          backgroundColor: getBatteryColor(slot.level),
                        }}
                        className="h-full"
                      />
                    </View>
                    <Text
                      className="absolute inset-0 text-center leading-8 text-xs font-bold"
                      style={{ color: slot.level < 30 ? "#fff" : "#000" }}
                    >
                      {slot.level}%
                    </Text>
                  </View>
                  <Text className="text-gray-900 font-medium">
                    {slot.label}
                  </Text>
                </View>

                {slot.swappable ? (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-gray-900 font-medium">Swappable</Text>
                    <View className="w-6 h-6 rounded-full bg-orange-500 items-center justify-center">
                      <Text className="text-white text-xs font-bold">⚡</Text>
                    </View>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-gray-400">Not Swappable</Text>
                    <View className="w-6 h-6 rounded-full bg-gray-200 items-center justify-center">
                      {/* <Info size={14} color="#9CA3AF" /> */}
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>

          {/*Review */}
          <View className="mt-6">
            <Text className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wide">
              Station Reviews
            </Text>

            {reviews.map((review) => (
              <View
                key={review.id}
                className="bg-gray-50 p-4 rounded-xl mb-3 border border-gray-100"
              >
                {/* Header avatar name rating */}
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-3">
                    <Image
                      source={{ uri: review.avatar }}
                      className="w-10 h-10 rounded-full"
                    />
                    <View>
                      <Text className="font-semibold text-gray-900">
                        {review.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {review.date}
                      </Text>
                    </View>
                  </View>

                  {/* Rating */}
                  <View className="flex-row items-center">
                    {[...Array(5)].map((_, i) => (
                      // <Ionicons
                      //   key={i}
                      //   name={i < review.rating ? "star" : "star-outline"}
                      //   size={16}
                      //   color="#FACC15"
                      // />
                      <Text key={i}>icon star</Text>
                    ))}
                  </View>
                </View>

                {/* Comment */}
                <Text className="text-gray-700 text-sm leading-5">
                  {review.comment}
                </Text>
              </View>
            ))}

            {/* Nút xem thêm */}
            <TouchableOpacity className="mt-2">
              <Text className="text-blue-500 font-medium text-center">
                View all reviews
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View className="px-5 pb-5 pt-1 bg-blue-primary border-t border-gray-100">
        <TouchableOpacity className="bg-blue-primary py-4 rounded-xl items-center">
          <Text className="text-white font-semibold text-lg">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
