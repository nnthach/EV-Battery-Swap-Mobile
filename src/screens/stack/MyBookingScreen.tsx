import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

type BookingItem = {
  id: string;
  stationName: string;
  address: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  batteryLevel?: number;
};

const mockBookings: BookingItem[] = [
  {
    id: "1",
    stationName: "EV Station Central",
    address: "123 Main St, District 1",
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    timeSlot: "14:00 - 14:30",
    status: "confirmed",
    batteryLevel: 15,
  },
  {
    id: "2",
    stationName: "Power Hub Downtown",
    address: "456 Business Ave, District 3",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    timeSlot: "09:30 - 10:00",
    status: "completed",
    batteryLevel: 5,
  },
  {
    id: "3",
    stationName: "Quick Swap Plaza",
    address: "789 Shopping Mall, District 7",
    date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    timeSlot: "16:00 - 16:30",
    status: "pending",
    batteryLevel: 25,
  },
];

export default function MyBookingScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState<BookingItem[]>(mockBookings);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setData([...mockBookings]);
    setRefreshing(false);
  }, []);

  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={20} color="#22c55e" />;
      case "completed":
        return <CheckCircle size={20} color="#3b82f6" />;
      case "pending":
        return <AlertCircle size={20} color="#f59e0b" />;
      case "cancelled":
        return <XCircle size={20} color="#ef4444" />;
      default:
        return <Clock size={20} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-700 border-green-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  return (
    <LinearGradient colors={["#49AFF0", "white"]} className="flex-1">
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-white/20"
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">My Bookings</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3b82f6"]}
              tintColor="#3b82f6"
            />
          }
        >
          {/* Content Card */}
          <View className="bg-white mt-8 mx-6 rounded-2xl p-5 shadow-sm">
            <Text className="text-blue-500 font-semibold mb-4 text-lg">
              Your Bookings
            </Text>

            {data.length === 0 ? (
              <View className="items-center py-12">
                <View className="bg-blue-50 rounded-full p-4 mb-3">
                  <Calendar size={32} color="#3b82f6" />
                </View>
                <Text className="text-gray-600 font-medium">
                  No bookings yet
                </Text>
                <Text className="text-gray-400 mt-1 text-center text-sm">
                  Start by booking a battery swap at your nearest station
                </Text>
              </View>
            ) : (
              <View className="space-y-3">
                {data.map((item) => (
                  <TouchableOpacity key={item.id} activeOpacity={0.8}>
                    <View className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                          <Text className="font-semibold text-gray-900 text-base mb-1">
                            {item.stationName}
                          </Text>
                          <View className="flex-row items-center gap-1 mb-2">
                            <MapPin size={14} color="#9CA3AF" />
                            <Text className="text-sm text-gray-500 flex-1">
                              {item.address}
                            </Text>
                          </View>
                        </View>
                        <View
                          className={`px-3 py-1 rounded-full border ${getStatusColor(item.status)}`}
                        >
                          <View className="flex-row items-center gap-1">
                            {getStatusIcon(item.status)}
                            <Text className="text-xs font-medium">
                              {getStatusText(item.status)}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                          <Calendar size={16} color="#6b7280" />
                          <Text className="text-sm text-gray-700 font-medium">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                          <Clock size={16} color="#6b7280" />
                          <Text className="text-sm text-gray-700 font-medium">
                            {item.timeSlot}
                          </Text>
                        </View>
                      </View>

                      {item.batteryLevel !== undefined && (
                        <View className="flex-row items-center justify-between mt-3 pt-3 border-t border-gray-200">
                          <Text className="text-sm text-gray-600">
                            Current Battery
                          </Text>
                          <Text className="text-sm font-semibold text-gray-800">
                            {item.batteryLevel}%
                          </Text>
                        </View>
                      )}

                      {item.status === "confirmed" && (
                        <View className="flex-row gap-3 mt-3">
                          <TouchableOpacity className="flex-1 bg-red-50 border border-red-200 rounded-lg py-2 items-center">
                            <Text className="text-red-600 font-medium text-sm">
                              Cancel
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity className="flex-1 bg-blue-50 border border-blue-200 rounded-lg py-2 items-center">
                            <Text className="text-blue-600 font-medium text-sm">
                              Reschedule
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
