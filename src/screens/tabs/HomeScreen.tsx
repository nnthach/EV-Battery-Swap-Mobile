import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const flatListRef = useRef<FlatList>(null);
  const { width } = Dimensions.get("window");
  const imgBannerList = [
    require("@/assets/bannerHome/banner1.jpg"),
    require("@/assets/bannerHome/banner2.jpg"),
    require("@/assets/bannerHome/banner3.jpg"),
    require("@/assets/bannerHome/banner4.png"),
  ];

  const featureList = [
    {
      label: "Swap Battery",
      // icon: <MaterialIcons name="qr-code-scanner" size={34} color="white" />,
    },
    {
      label: "Booking",
      // icon: <MaterialIcons name="calendar-month" size={34} color="white" />,
    },
    {
      label: "Support",
      // icon: <MaterialIcons name="headphones" size={34} color="white" />,
    },
    {
      label: "History",
      // icon: <MaterialIcons name="history" size={34} color="white" />,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imgBannerList.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);
  return (
    <LinearGradient colors={["#49AFF0", "white"]} className="flex-1">
      <SafeAreaView edges={["top"]} className="flex-1">
        <ScrollView
          className="px-6"
          contentContainerStyle={{ paddingBottom: 90 }}
        >
          {/*header */}
          <View className="flex-row justify-between items-center">
            <Image
              source={require("@/assets/logoTextWhite.png")}
              style={{ height: 56, width: 120, resizeMode: "contain" }}
            />
            {/* <Entypo name="bell" size={24} color="white" /> */}
          </View>

          {/*Banner */}
          <View className="bg-black w-full h-[200px] rounded-2xl my-6 overflow-hidden">
            <FlatList
              ref={flatListRef}
              data={imgBannerList}
              keyExtractor={(_, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image
                  source={item}
                  style={{
                    width: width - 40,
                    height: 200,
                  }}
                  resizeMode="cover"
                />
              )}
            />
          </View>

          {/*Feature */}
          <View className="flex-row flex-wrap">
            {featureList.map((item, index) => (
              <View key={index} className="w-1/3 items-center mb-6">
                <View className="bg-blue-four rounded-full w-16 h-16 items-center justify-center">
                  {/* {item.icon} */}
                  <Text>icon</Text>
                </View>
                <Text className="text-white font-semibold">{item.label}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
