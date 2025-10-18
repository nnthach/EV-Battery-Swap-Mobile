// import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Station } from "../../types/index";
import CustomButton from "./CustomButton";

interface StationBookingBottomSheetProps {
  station: Station | null;
  userLocation: [number, number] | null;
  minutes: number;
  seconds: number;
  onGoogleMap: () => void;
  onGetDirections: (station: Station) => void;
  onClose: () => void;
  isLoadingRoute?: boolean;
  routeInfo?: {
    distance: string;
    duration: string;
  } | null;
}

export default function StationBookingBottomSheet({
  station,
  userLocation,
  minutes,
  seconds,
  onGoogleMap,
  onGetDirections,
  onClose,
  isLoadingRoute = false,
  routeInfo = null,
}: StationBookingBottomSheetProps) {
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [isLoadingCancel, setIsLoadingCancel] = useState(false);

  if (!station) return null;

  const handleGetDirections = async () => {
    setIsLoadingDirections(true);
    try {
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onGetDirections(station);
    } finally {
      setIsLoadingDirections(false);
    }
  };

  const handleGoogleMap = async () => {
    setIsLoadingCancel(true);
    try {
      // Simulate loading time
      await new Promise((resolve) => setTimeout(resolve, 800));
      onGoogleMap();
    } finally {
      setIsLoadingCancel(false);
    }
  };

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl">
      <View className="p-6 pb-28">
        {/* Close Button */}
        <TouchableOpacity
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full items-center justify-center"
          onPress={onClose}
        >
          {/* <Ionicons name="close" size={20} color="#6b7280" /> */}
        </TouchableOpacity>
        {/* Route Info / Pickup Timer */}
        <View className="mb-6">
          {routeInfo && (
            <>
              <View className="flex-row justify-center gap-10 items-center">
                <View className="items-center">
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                    {/* <Ionicons name="location" size={20} color="#3b82f6" /> */}
                  </View>
                  <Text className="text-xs text-gray-500 mb-1">
                    Khoảng Cách
                  </Text>
                  <Text className="text-lg font-bold text-gray-900">
                    {routeInfo.distance}
                  </Text>
                </View>
                <View className="items-center">
                  <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                    {/* <Ionicons name="time" size={20} color="#22c55e" /> */}
                  </View>
                  <Text className="text-xs text-gray-500 mb-1">
                    Thời Gian Ước Tính
                  </Text>
                  <Text className="text-lg font-bold text-gray-900">
                    {routeInfo.duration}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Station Image and Status */}
        <View className="flex-row mb-4">
          <Image
            source={{ uri: station.image }}
            className="w-20 h-20 rounded-lg mr-4"
          />
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
              <Text className="text-green-600 text-sm font-medium">Open</Text>
              <View className="w-2 h-2 bg-orange-500 rounded-full ml-4 mr-2" />
              <Text className="text-orange-600 text-sm font-medium">
                {station.swappableBatteries} Batteries Swappable
              </Text>
            </View>
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {station.name}
            </Text>
          </View>
        </View>

        {/* Address */}
        <View className="flex-row items-start mb-3">
          {/* <Ionicons name="location-outline" size={20} color="#6b7280" /> */}
          <Text className="flex-1 text-gray-600 text-sm ml-2">
            {station.address}
          </Text>
        </View>

        {/* Opening Hours */}
        <View className="flex-row items-center mb-6">
          {/* <Ionicons name="time-outline" size={20} color="#6b7280" /> */}
          <Text className="text-gray-600 text-sm ml-2">{station.openTime}</Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <CustomButton
            title="Google Maps"
            onPress={handleGoogleMap}
            variant="primary"
            loading={isLoadingCancel}
            disabled={isLoadingDirections || isLoadingRoute}
            icon={
              !isLoadingCancel ? (
                // <Ionicons name={"map"} size={16} color="white" />
                <Text>icon here</Text>
              ) : undefined
            }
            fullWidth
            className="flex-1"
          />
          <CustomButton
            title={"Tra Cứu"}
            onPress={handleGetDirections}
            variant="secondary"
            loading={isLoadingDirections || isLoadingRoute}
            disabled={isLoadingCancel}
            icon={
              !isLoadingDirections && !isLoadingRoute ? (
                <Text>icon here</Text>
              ) : // <Ionicons name={"search"} size={16} color="grey" />
              undefined
            }
            fullWidth
            className="flex-1"
          />
        </View>
      </View>
    </View>
  );
}
