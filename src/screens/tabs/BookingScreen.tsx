import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useMemo, useState } from "react";
import { RootStackParamList, Station } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useQuery from "@/src/hooks/useQuery";
import { useDebounce } from "@/src/hooks/useDebounce";
import useFetchList from "@/src/hooks/useFetchList";
import { getAllPublicStationListAPI } from "@/src/services/stationService";
import { LinearGradient } from "expo-linear-gradient";
import {
  Search,
  MapPin,
  Clock,
  Battery,
  ChevronRight,
  Bell,
} from "lucide-react-native";

interface QueryParams {
  page: number;
  limit: number;
  search: string;
  order: string;
}
export default function BookingScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { query, updateQuery, resetQuery } = useQuery<QueryParams>({
    page: 1,
    limit: 100,
    search: "",
    order: "asc",
  });

  const debouncedSearch = useDebounce(query.search, 1500);
  const debouncedQuery = useMemo(
    () => ({ ...query, search: debouncedSearch }),
    [debouncedSearch]
  );

  // fetch all station
  const { data: stationList = [], loading } = useFetchList<
    Station[],
    QueryParams
  >(getAllPublicStationListAPI, debouncedQuery);

  const handleSearch = (data: string) => {
    updateQuery({ search: data });
  };

  return (
    <View className="flex-1 bg-gray-50">
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Header with Gradient */}
        <LinearGradient colors={["#0ea5e9", "#0284c7"]} className="pb-8">
          <View className="flex-row justify-between items-center px-6 pt-2">
            <View>
              <Text className="text-white/80 text-lg">Find your nearest</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                Charging Station
              </Text>
            </View>
            <TouchableOpacity className="bg-white/20 p-2 rounded-full">
              <Bell size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center bg-white rounded-3xl px-4 py-2 shadow-lg">
              <Search size={22} color="#0ea5e9" strokeWidth={2.5} />
              <TextInput
                value={query.search}
                onChangeText={(text) => handleSearch(text)}
                placeholder="Search by station name or location..."
                placeholderTextColor="#94a3b8"
                className="ml-3 flex-1 text-base text-gray-800"
              />
            </View>
          </View>
        </LinearGradient>

        {/* Station List */}
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#0ea5e9" />
            <Text className="text-gray-500 mt-4">Loading stations...</Text>
          </View>
        ) : (
          <ScrollView
            className="flex-1 mt-2"
            contentContainerStyle={{ paddingBottom: 30 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="px-6 gap-5 pt-2">
              {stationList.length === 0 ? (
                <View className="items-center justify-center py-20">
                  <MapPin size={48} color="#cbd5e1" />
                  <Text className="text-gray-400 mt-4 text-base">
                    No stations found
                  </Text>
                </View>
              ) : (
                stationList.map((item, index) => (
                  <View
                    key={item?.id}
                    className="bg-white rounded-3xl shadow-sm overflow-hidden"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    {/* Station Header */}
                    <View className="px-5 pt-5 pb-4">
                      <View className="flex-row justify-between items-start mb-3">
                        <View className="flex-1 pr-3">
                          <Text className="font-bold text-xl text-gray-800 leading-6">
                            {item?.name}
                          </Text>
                        </View>
                        <View className="bg-emerald-50 px-3 py-1.5 rounded-full">
                          <View className="flex-row items-center">
                            <View className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5" />
                            <Text className="text-emerald-700 text-xs font-semibold">
                              OPEN
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Battery Info */}
                      <View className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl px-4 py-3 mb-4">
                        <View className="flex-row items-center">
                          <View className="bg-sky-500 p-2 rounded-lg">
                            <Battery size={20} color="white" fill="white" />
                          </View>
                          <View className="ml-3 flex-1">
                            <Text className="text-sky-900 font-bold text-lg">
                              {item?.swappableBatteries || 0} Batteries
                            </Text>
                            <Text className="text-sky-600 text-xs">
                              Available for swap
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Location */}
                      <View className="flex-row items-start mb-3">
                        <View className="bg-gray-100 p-2 rounded-lg">
                          <MapPin size={16} color="#64748b" />
                        </View>
                        <Text className="text-gray-600 text-sm flex-1 ml-3 leading-5">
                          {item?.address}
                        </Text>
                      </View>

                      {/* Opening Hours */}
                      <View className="flex-row items-start">
                        <View className="bg-gray-100 p-2 rounded-lg">
                          <Clock size={16} color="#64748b" />
                        </View>
                        <Text className="text-gray-600 text-sm ml-3">
                          {item?.openTime || "Mon - Sun, 10:00 AM - 9:00 PM"}
                        </Text>
                      </View>
                    </View>

                    {/* Divider */}
                    <View className="h-px bg-gray-100 mx-5" />

                    {/* Action Buttons */}
                    <View className="px-5 py-4 flex-row gap-3">
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() =>
                          navigation.navigate("Stacks", {
                            screen: "StationDetail",
                            params: { stationId: item?.id },
                          })
                        }
                        className="flex-1 bg-gray-50 rounded-xl flex-row justify-center items-center"
                      >
                        <Text className="text-gray-700 font-semibold text-base mr-1">
                          Details
                        </Text>
                        <ChevronRight size={18} color="#374151" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="flex-1 rounded-xl"
                        activeOpacity={0.8}
                        style={{
                          backgroundColor: "#0ea5e9",
                        }}
                      >
                        <LinearGradient
                          colors={["#0ea5e9", "#0284c7"]}
                          className="rounded-xl py-3.5 flex-row justify-center items-center"
                          start={{ x: 0, y: 0 }}
                          end={{ x: 1, y: 0 }}
                          style={{
                            borderRadius: 12,
                          }}
                        >
                          <Text className="text-white font-bold text-base">
                            Book Now
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}
