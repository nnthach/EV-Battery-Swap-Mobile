import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Clock, EvCharger } from "lucide-react-native";

interface CountdownModalProps {
  visible: boolean;
  duration?: number; // duration in minutes from route calculation
  stationName?: string; // name of the booked station
  onClose: () => void;
  onTimeUp: () => void;
}

export default function CountdownModal({
  visible,
  duration,
  stationName,
  onClose,
  onTimeUp,
}: CountdownModalProps) {
  // Default to 30 minutes if duration is undefined
  const totalMinutes = Math.max((duration || 30) + 30, 30);

  const [timeLeft, setTimeLeft] = useState({
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
    seconds: 0,
  });

  useEffect(() => {
    if (!visible) {
      setTimeLeft({
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60,
        seconds: 0,
      });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Time's up
          onTimeUp();
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible, totalMinutes, onTimeUp]);

  if (!visible) return null;

  return (
    <View className="absolute top-24 left-4 right-4 z-50" pointerEvents="none">
      <View className="bg-blue-500 rounded-2xl p-5 shadow-xl border-l-4 border-blue-300">
        <View className="flex-row items-center justify-center">
          <View className="w-12 h-12 bg-blue-400 rounded-full items-center justify-center mr-4 shadow-md">
            <Clock size={22} color="white" />
          </View>
          <View className="flex-1">
            {stationName && (
              <Text
                className="text-white text-sm font-semibold mb-1"
                numberOfLines={1}
              >
                {stationName}
              </Text>
            )}
            <Text className="text-blue-100 text-sm font-medium mb-1">
              Thời gian đặt chỗ còn lại
            </Text>
            <Text className="text-white text-2xl font-bold tracking-wider">
              {String(timeLeft.hours || 0).padStart(2, "0")}:
              {String(timeLeft.minutes || 0).padStart(2, "0")}:
              {String(timeLeft.seconds || 0).padStart(2, "0")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
