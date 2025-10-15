import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import AuthNavigator from "./AuthNavigator";
import StackNavigator from "./StackNavigator";
import { RootStackParamList } from "@/types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Stacks"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
