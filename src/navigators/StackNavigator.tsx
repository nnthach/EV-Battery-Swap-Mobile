import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StationDetailStack from "../screens/stack/StationDetailStack";
import AccountInformation from "../screens/stack/AccountInformation";
import HistoryScreen from "../screens/stack/HistoryScreen";
import MyBookingScreen from "../screens/stack/MyBookingScreen";
import TransactionHistoryScreen from "../screens/stack/TransactionHistoryScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StationDetail" component={StationDetailStack} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="MyBooking" component={MyBookingScreen} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen name="AccountInformation" component={AccountInformation} />
    </Stack.Navigator>
  );
}
