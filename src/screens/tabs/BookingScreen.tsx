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
import useQuery from "@/hooks/useQuery";
import { useDebounce } from "@/hooks/useDebounce";
import useFetchList from "@/hooks/useFetchList";
import { getAllPublicStationListAPI } from "@/services/stationService";

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
        {/*Search */}
        <View className="px-6 mt-6 pb-4">
          <View className="flex-row items-center bg-blue-five px-4 py-1 border-[0.5px] border-black rounded-full">
            {/* <Ionicons name="search-outline" size={24} color="#37b6fe" /> */}
            <TextInput
              value={query.search}
              onChangeText={(text) => handleSearch(text)}
              placeholder="Search station..."
              placeholderTextColor="#9ca3af"
              className="ml-2 flex-1 text-base text-gray-700"
            />
          </View>
        </View>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            className="bg-blue-five px-6 pt-0"
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <View className="gap-4">
              {stationList.map((item) => (
                <View
                  key={item?.id}
                  className="bg-white border-[0.5px] border-black p-6 rounded-xl"
                >
                  <Text className="font-semibold text-xl">{item?.name}</Text>

                  <View className="flex-row items-center mb-2">
                    <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <Text className="text-green-600 text-sm font-medium">
                      Open
                    </Text>
                    <View className="w-2 h-2 bg-orange-500 rounded-full ml-4 mr-2" />
                    <Text className="text-orange-600 text-sm font-medium">
                      {item?.swappableBatteries} Batteries Swappable
                    </Text>
                  </View>

                  <View className="flex-row gap-2 items-start my-4">
                    {/* <Ionicons name="location-outline" size={18} color="#374151" /> */}
                    {/* <MapPin /> */}
                    <Text className="text-gray-700 flex-1">
                      {item?.address}
                    </Text>
                  </View>

                  <View className="flex-row gap-2 items-start">
                    {/* <Ionicons name="time-outline" size={20} color="#374151" /> */}
                    <Text className="text-gray-700 flex-1">
                      {item?.openTime || "Monday, 10:00 - 21:00"}
                    </Text>
                  </View>

                  <View className="w-full h-[1px] bg-black my-6" />

                  <View className="flex-row justify-between items-center">
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        navigation.navigate("Stacks", {
                          screen: "StationDetail",
                          params: { stationId: item?.id },
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
        )}
        {/*Station list */}
      </View>
    </SafeAreaView>
  );
}
