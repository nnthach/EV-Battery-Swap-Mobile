import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import {
  useRoute,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { StackParamList } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { getStationByIdAPI } from "@/src/services/stationService";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Battery,
  Zap,
  Star,
  Info,
  Phone,
  Navigation as NavigationIcon,
} from "lucide-react-native";

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
  console.log("stationid", stationId);

  const fetchStationDetail = async () => {
    try {
      const res = await getStationByIdAPI(stationId);
      console.log("get station detail res", res.data);
    } catch (error) {
      console.log("get station detail err", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchStationDetail();
    }, [])
  );

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
    <View className="flex-1 bg-white">
      {/* Hero Image Section */}
      <View className="relative h-72">
        <Image
          source={{
            uri: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.8)"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute top-0 left-0 right-0 bottom-0"
        />

        {/* Header Buttons */}
        <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center">
          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-white/90 items-center justify-center shadow-lg"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeft size={22} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity className="w-11 h-11 rounded-full bg-white/90 items-center justify-center shadow-lg">
            <Phone size={20} color="#1f2937" strokeWidth={2.5} />
          </TouchableOpacity>
        </View>

        {/* Station Name & Status */}
        <View className="absolute bottom-5 left-5 right-5">
          <Text className="text-white text-2xl font-bold mb-2">
            {station.name}
          </Text>
          <View className="flex-row items-center gap-2">
            <View className="bg-emerald-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">OPEN NOW</Text>
            </View>
            <View className="bg-white/20 backdrop-blur px-3 py-1 rounded-full flex-row items-center gap-1">
              <Zap size={12} color="#fbbf24" fill="#fbbf24" />
              <Text className="text-white text-xs font-semibold">
                {station.swappableBatteries} Available
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView
        className="flex-1 bg-gray-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Quick Info Section */}
        <View className="bg-white px-5 py-5">
          {/* Quick Stats Cards */}
          <View className="flex-row gap-3 mb-5">
            <View className="flex-1 bg-sky-50 rounded-2xl p-4 items-center">
              <View className="bg-sky-500 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Battery size={24} color="white" fill="white" />
              </View>
              <Text className="text-sky-900 font-bold text-xl">
                {station.swappableBatteries}
              </Text>
              <Text className="text-sky-600 text-xs text-center">
                Batteries Ready
              </Text>
            </View>

            <View className="flex-1 bg-emerald-50 rounded-2xl p-4 items-center">
              <View className="bg-emerald-500 w-12 h-12 rounded-full items-center justify-center mb-2">
                <Star size={24} color="white" fill="white" />
              </View>
              <Text className="text-emerald-900 font-bold text-xl">4.5</Text>
              <Text className="text-emerald-600 text-xs text-center">
                Rating
              </Text>
            </View>
          </View>

          {/* Address */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-3">
            <View className="flex-row items-start gap-3">
              <View className="bg-sky-100 p-2 rounded-lg mt-0.5">
                <MapPin size={18} color="#0ea5e9" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs font-semibold mb-1">
                  LOCATION
                </Text>
                <Text className="text-gray-800 text-sm leading-5">
                  {station.address}
                </Text>
              </View>
              <TouchableOpacity className="bg-sky-500 w-10 h-10 rounded-full items-center justify-center">
                <NavigationIcon size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Opening Hours */}
          <View className="bg-gray-50 rounded-2xl p-4">
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-lg">
                <Clock size={18} color="#f97316" />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs font-semibold mb-1">
                  OPENING HOURS
                </Text>
                <Text className="text-gray-800 text-sm font-medium">
                  Monday - Sunday, 10:00 AM - 9:00 PM
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Battery Status Section */}
        <View className="bg-white mt-2 px-5 py-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Battery Status
            </Text>
            <View className="bg-sky-50 px-3 py-1 rounded-full">
              <Text className="text-sky-700 text-xs font-semibold">
                {batterySlots.filter((s) => s.swappable).length} Available
              </Text>
            </View>
          </View>

          {batterySlots.map((slot, index) => (
            <View
              key={slot.id}
              className={`flex-row items-center justify-between py-3.5 ${
                index < batterySlots.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <View className="flex-row items-center gap-3 flex-1">
                {/* Battery Icon with Level */}
                <View className="relative w-14">
                  <View className="w-14 h-8 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <View
                      style={{
                        width: `${slot.level}%`,
                        backgroundColor: getBatteryColor(slot.level),
                      }}
                      className="h-full"
                    />
                  </View>
                  <Text
                    className="absolute inset-0 text-center leading-8 text-[11px] font-bold"
                    style={{ color: slot.level < 30 ? "#fff" : "#000" }}
                  >
                    {slot.level}%
                  </Text>
                </View>
                <Text className="text-gray-800 font-semibold text-base">
                  {slot.label}
                </Text>
              </View>

              {slot.swappable ? (
                <View className="bg-emerald-50 px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
                  <Zap size={14} color="#10b981" fill="#10b981" />
                  <Text className="text-emerald-700 font-semibold text-xs">
                    Ready
                  </Text>
                </View>
              ) : (
                <View className="bg-gray-100 px-3 py-1.5 rounded-full flex-row items-center gap-1.5">
                  <Info size={14} color="#9ca3af" />
                  <Text className="text-gray-500 font-medium text-xs">
                    Charging
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Reviews Section */}
        <View className="bg-white mt-2 px-5 py-5">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-gray-900">Reviews</Text>
            <TouchableOpacity>
              <Text className="text-sky-500 font-semibold text-sm">
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {reviews.map((review) => (
            <View key={review.id} className="bg-gray-50 p-4 rounded-2xl mb-3">
              {/* Header avatar name rating */}
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center gap-3">
                  <Image
                    source={{ uri: review.avatar }}
                    className="w-11 h-11 rounded-full border-2 border-white"
                  />
                  <View>
                    <Text className="font-bold text-gray-900 text-base">
                      {review.name}
                    </Text>
                    <Text className="text-xs text-gray-500">{review.date}</Text>
                  </View>
                </View>

                {/* Rating */}
                <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-lg">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      color="#fbbf24"
                      fill={i < review.rating ? "#fbbf24" : "transparent"}
                    />
                  ))}
                </View>
              </View>

              {/* Comment */}
              <Text className="text-gray-600 text-sm leading-5 mt-1">
                {review.comment}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 border-t border-gray-100">
        <TouchableOpacity className="overflow-hidden rounded-2xl shadow-lg">
          <LinearGradient
            colors={["#0ea5e9", "#0284c7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="py-4 items-center"
          >
            <Text className="text-white font-bold text-lg">
              Book This Station
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
