import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeft,
  Clock,
  Battery,
  Zap,
  TrendingUp,
  MapPin,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type HistoryItem = {
  id: string;
  title: string;
  date: string;
  amount?: number;
  type?: "swap" | "topup";
};

const mockData: HistoryItem[] = [
  {
    id: "1",
    title: "Battery Swap at Station A",
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    amount: 0,
    type: "swap",
  },
  {
    id: "2",
    title: "Account Top-up",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    amount: 50,
    type: "topup",
  },
  {
    id: "3",
    title: "Battery Swap at Station B",
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    amount: 0,
    type: "swap",
  },
];

export default function HistoryScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState<HistoryItem[]>(mockData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setData([...mockData]);
    setRefreshing(false);
  }, []);

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
          <Text className="text-white text-lg font-bold">Usage History</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Content Card */}
          <View className="bg-white mt-8 mx-6 rounded-2xl p-5 shadow-sm">
            <Text className="text-blue-500 font-semibold mb-4 text-lg">
              Recent Activity
            </Text>

            {data.length === 0 ? (
              <View className="items-center py-12">
                <View className="bg-blue-50 rounded-full p-4 mb-3">
                  <Clock size={32} color="#3b82f6" />
                </View>
                <Text className="text-gray-600 font-medium">
                  No history yet
                </Text>
                <Text className="text-gray-400 mt-1 text-center text-sm">
                  Your usage history will appear here
                </Text>
              </View>
            ) : (
              <View className="space-y-3">
                {data.map((item) => {
                  const getItemIcon = () => {
                    if (item.type === "swap")
                      return <Battery size={20} color="#22c55e" />;
                    if (item.type === "topup")
                      return <Zap size={20} color="#f59e0b" />;
                    return <Clock size={20} color="#6B7280" />;
                  };

                  const getItemColor = () => {
                    if (item.type === "swap") return "bg-green-50";
                    if (item.type === "topup") return "bg-amber-50";
                    return "bg-gray-50";
                  };

                  return (
                    <TouchableOpacity key={item.id} activeOpacity={0.8}>
                      <View
                        className={`${getItemColor()} rounded-xl p-4 border border-gray-100 mb-3`}
                      >
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center flex-1">
                            <View className="bg-white rounded-full p-2 mr-3 shadow-sm">
                              {getItemIcon()}
                            </View>
                            <View className="flex-1">
                              <Text className="font-medium text-gray-800">
                                {item.title}
                              </Text>
                              <Text className="text-xs text-gray-500 mt-1">
                                {new Date(item.date).toLocaleDateString()} at{" "}
                                {new Date(item.date).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Text>
                            </View>
                          </View>
                          <View className="items-end">
                            {item.amount !== undefined && item.amount > 0 && (
                              <Text className="text-sm font-bold text-green-600">
                                +${item.amount}
                              </Text>
                            )}
                            {item.type === "swap" && (
                              <Text className="text-xs text-blue-600 font-medium">
                                Completed
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
