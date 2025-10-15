import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StationDetailStack from "../screens/stack/StationDetailStack";
import { NavigatorScreenParams } from "@react-navigation/native";
import { StackParamList } from "@/types";

const Stack = createNativeStackNavigator( );

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StationDetail" component={StationDetailStack} />
    </Stack.Navigator>
  );
}
