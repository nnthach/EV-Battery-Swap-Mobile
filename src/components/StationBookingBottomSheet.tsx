import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { X, MapPin, Clock, Map, Search, Navigation } from "lucide-react-native";
import { Station } from "../../types/index";
import CustomButton from "./CustomButton";

interface StationBookingBottomSheetProps {
  station: Station | null;
  userLocation: [number, number] | null;
  minutes: number;
  seconds: number;
  distance?: string;
  duration?: number;
  isCountdownActive?: boolean;
  onGoogleMap: () => void;
  onGetDirections: (station: Station) => void;
  onBooking: (station: Station) => void;
  onClose: () => void;
}

export default function StationBookingBottomSheet({
  station,
  userLocation,
  minutes,
  seconds,
  distance,
  duration,
  isCountdownActive = false,
  onGoogleMap,
  onGetDirections,
  onBooking,
  onClose,
}: StationBookingBottomSheetProps) {
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [isLoadingMaps, setIsLoadingMaps] = useState(false);
  const [isLoadingBooking, setIsLoadingBooking] = useState(false);
  const [showBookingButton, setShowBookingButton] = useState(false);

  // Remove countdown timer effect since we're simplifying the logic

  // Show booking button if we have route info or if it was already shown
  const shouldShowBookingButton = showBookingButton || (distance && duration);

  const handleGetDirections = async () => {
    if (!station) return;

    setIsLoadingDirections(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onGetDirections(station);
      // Change button to booking after getting directions
      setShowBookingButton(true);
    } finally {
      setIsLoadingDirections(false);
    }
  };

  const handleGoogleMap = async () => {
    setIsLoadingMaps(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onGoogleMap();
    } finally {
      setIsLoadingMaps(false);
    }
  };

  const handleBooking = async () => {
    if (!station) return;

    setIsLoadingBooking(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onBooking(station);
    } finally {
      setIsLoadingBooking(false);
    }
  };

  if (!station) return null;

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl">
      <View className="p-6 pb-2">
        {/* Close Button */}
        <TouchableOpacity
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full items-center justify-center z-10"
          onPress={onClose}
        >
          <X size={20} color="#6b7280" />
        </TouchableOpacity>

        {/* Remove countdown timer UI since we're simplifying */}

        {/* Route Info */}
        {distance && duration && (
          <View className="mb-6 px-4">
            <View className="flex-row justify-around items-center">
              <View className=" flex-row gap-4 items-center">
                <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mb-2">
                  <MapPin size={18} color="#3b82f6" />
                </View>

                <Text className="text-lg font-bold text-gray-900">
                  {distance} km
                </Text>
              </View>

              <View className="w-px h-16 bg-gray-300" />

              <View className="items-center flex-row gap-4">
                <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mb-2">
                  <Clock size={18} color="#22c55e" />
                </View>
                <Text className="text-lg font-bold text-gray-900">
                  {duration} phút
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Station Image and Status */}
        <View className="flex-row mb-4">
          <Image
            source={{ uri: station.image }}
            className="w-20 h-20 rounded-lg mr-4"
          />
          <View className="flex-1">
            <View className="flex-row items-center mb-2 flex-wrap">
              <View className="flex-row items-center mr-3">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
                <Text className="text-green-600 text-xs font-medium">
                  Đang Mở
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-1.5" />
                <Text className="text-orange-600 text-xs font-medium">
                  {station.swappableBatteries} Pin Có Thể Đổi
                </Text>
              </View>
            </View>
            <Text
              className="text-base font-bold text-gray-900 mb-1"
              numberOfLines={2}
            >
              {station.name}
            </Text>
          </View>
        </View>

        {/* Address */}
        <View className="flex-row items-start mb-3 bg-gray-50 p-3 rounded-lg">
          <MapPin size={18} color="#6b7280" />
          <Text className="flex-1 text-gray-700 text-sm ml-2">
            {station.address}
          </Text>
        </View>

        {/* Opening Hours */}
        <View className="flex-row items-center mb-6 bg-gray-50 p-3 rounded-lg">
          <Clock size={18} color="#6b7280" />
          <Text className="text-gray-700 text-sm ml-2 font-medium">
            {station.openTime}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <CustomButton
            title="Google Maps"
            onPress={handleGoogleMap}
            variant="primary"
            loading={isLoadingMaps}
            disabled={isLoadingDirections || isLoadingBooking}
            icon={!isLoadingMaps ? <Map size={18} color="white" /> : undefined}
            fullWidth
            className="flex-1"
          />

          {!shouldShowBookingButton ? (
            <CustomButton
              title="Chỉ Đường"
              onPress={handleGetDirections}
              variant="secondary"
              loading={isLoadingDirections}
              disabled={isLoadingMaps || isLoadingBooking || isCountdownActive}
              icon={
                !isLoadingDirections ? (
                  <Search size={18} color="#3b82f6" />
                ) : undefined
              }
              fullWidth
              className="flex-1"
            />
          ) : (
            <CustomButton
              title={isCountdownActive ? "Đã Đặt Chỗ" : "Đặt Ngay"}
              onPress={handleBooking}
              variant="secondary"
              loading={isLoadingBooking}
              disabled={
                isLoadingMaps || isLoadingDirections || isCountdownActive
              }
              icon={
                !isLoadingBooking ? (
                  <Navigation size={18} color="#3b82f6" />
                ) : undefined
              }
              fullWidth
              className="flex-1"
            />
          )}
        </View>
      </View>
    </View>
  );
}
