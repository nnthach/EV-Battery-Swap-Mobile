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
  Package,
  CreditCard,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

type PackageType = "basic" | "premium" | "unlimited";

type PackagePurchase = {
  id: string;
  packageName: string;
  packageType: PackageType;
  price: number;
  swapsIncluded: number;
  validityDays: number;
  purchaseDate: string;
  expiryDate: string;
  status: "active" | "expired" | "pending";
  paymentMethod: string;
};

const mockPurchases: PackagePurchase[] = [
  {
    id: "1",
    packageName: "Premium Monthly",
    packageType: "premium",
    price: 29.99,
    swapsIncluded: 20,
    validityDays: 30,
    purchaseDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    expiryDate: new Date(Date.now() + 29 * 86400000).toISOString(), // 29 days from now
    status: "active",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    packageName: "Basic Weekly",
    packageType: "basic",
    price: 9.99,
    swapsIncluded: 5,
    validityDays: 7,
    purchaseDate: new Date(Date.now() - 10 * 86400000).toISOString(), // 10 days ago
    expiryDate: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago (expired)
    status: "expired",
    paymentMethod: "PayPal",
  },
  {
    id: "3",
    packageName: "Unlimited Quarterly",
    packageType: "unlimited",
    price: 79.99,
    swapsIncluded: 999,
    validityDays: 90,
    purchaseDate: new Date(Date.now() - 30 * 86400000).toISOString(), // 30 days ago
    expiryDate: new Date(Date.now() + 60 * 86400000).toISOString(), // 60 days from now
    status: "active",
    paymentMethod: "Credit Card",
  },
];

export default function TransactionHistoryScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState<PackagePurchase[]>(mockPurchases);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // TODO: replace with real API call
    await new Promise((r) => setTimeout(r, 800));
    setData([...mockPurchases]);
    setRefreshing(false);
  }, []);

  const getStatusIcon = (status: PackagePurchase["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle size={16} color="#22c55e" />;
      case "expired":
        return <XCircle size={16} color="#ef4444" />;
      case "pending":
        return <Clock size={16} color="#f59e0b" />;
      default:
        return <Clock size={16} color="#6b7280" />;
    }
  };

  const getStatusColor = (status: PackagePurchase["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";
      case "expired":
        return "bg-red-50 text-red-700 border-red-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPackageTypeColor = (type: PackageType) => {
    switch (type) {
      case "basic":
        return "#6b7280";
      case "premium":
        return "#3b82f6";
      case "unlimited":
        return "#7c3aed";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status: PackagePurchase["status"]) => {
    switch (status) {
      case "active":
        return "Active";
      case "expired":
        return "Expired";
      case "pending":
        return "Pending";
      default:
        return "Unknown";
    }
  };

  // Calculate stats
  const totalSpent = data.reduce((sum, item) => sum + item.price, 0);
  const activePackages = data.filter((item) => item.status === "active").length;

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
          <Text className="text-white text-lg font-bold">Package History</Text>
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
              Package Purchase History
            </Text>

            {/* Stats Summary */}
            <View className="flex-row gap-3 mb-6 p-4 bg-blue-50 rounded-xl">
              <View className="flex-1 items-center">
                <Text className="text-blue-600 font-bold text-xl">
                  ${totalSpent.toFixed(2)}
                </Text>
                <Text className="text-blue-500 text-sm">Total Spent</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-blue-600 font-bold text-xl">
                  {activePackages}
                </Text>
                <Text className="text-blue-500 text-sm">Active Plans</Text>
              </View>
            </View>

            {data.length === 0 ? (
              <View className="items-center py-12">
                <View className="bg-blue-50 rounded-full p-4 mb-3">
                  <Package size={32} color="#3b82f6" />
                </View>
                <Text className="text-gray-600 font-medium">
                  No purchases yet
                </Text>
                <Text className="text-gray-400 mt-1 text-center text-sm">
                  Your package purchase history will appear here
                </Text>
              </View>
            ) : (
              <View className="space-y-3">
                {data.map((item) => (
                  <TouchableOpacity key={item.id} activeOpacity={0.8}>
                    <View className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-3">
                      <View className="flex-row items-start justify-between mb-3">
                        <View className="flex-1">
                          <View className="flex-row items-center gap-2 mb-1">
                            <Package
                              size={18}
                              color={getPackageTypeColor(item.packageType)}
                            />
                            <Text className="font-semibold text-gray-900 text-base">
                              {item.packageName}
                            </Text>
                          </View>
                          <Text className="text-sm text-gray-500 mb-2">
                            {item.swapsIncluded} swaps • {item.validityDays}{" "}
                            days validity
                          </Text>
                        </View>
                        <View className="items-end">
                          <Text className="font-bold text-gray-900 text-lg">
                            ${item.price}
                          </Text>
                          <View
                            className={`px-2 py-1 rounded-full border mt-1 ${getStatusColor(item.status)}`}
                          >
                            <View className="flex-row items-center gap-1">
                              {getStatusIcon(item.status)}
                              <Text className="text-xs font-medium">
                                {getStatusText(item.status)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>

                      <View className="flex-row items-center justify-between pt-3 border-t border-gray-200">
                        <View>
                          <View className="flex-row items-center gap-1 mb-1">
                            <Calendar size={14} color="#9CA3AF" />
                            <Text className="text-xs text-gray-500">
                              Purchased
                            </Text>
                          </View>
                          <Text className="text-sm text-gray-700 font-medium">
                            {new Date(item.purchaseDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </Text>
                        </View>
                        <View>
                          <View className="flex-row items-center gap-1 mb-1">
                            <CreditCard size={14} color="#9CA3AF" />
                            <Text className="text-xs text-gray-500">
                              Payment
                            </Text>
                          </View>
                          <Text className="text-sm text-gray-700 font-medium">
                            {item.paymentMethod}
                          </Text>
                        </View>
                        {item.status === "active" && (
                          <View>
                            <Text className="text-xs text-gray-500 mb-1">
                              Expires
                            </Text>
                            <Text className="text-sm text-gray-700 font-medium">
                              {new Date(item.expiryDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </Text>
                          </View>
                        )}
                      </View>
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
