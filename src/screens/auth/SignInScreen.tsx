import { View, Text } from "react-native";
import React, { useState } from "react";
import { LoginForm } from "@/types";

export default function SignInScreen() {
  const [signInForm, setSignInForm] = useState<LoginForm>({
    usernameOrEmail: "",
    password: "",
  });
  return (
    <View>
      <Text>SignInScreen</Text>
    </View>
  );
}
