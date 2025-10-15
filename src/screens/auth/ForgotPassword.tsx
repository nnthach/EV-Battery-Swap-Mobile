import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types";
import { useNavigation } from "@react-navigation/native";

type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ForgotPasswordScreen() {
  const navigation = useNavigation<AppNavigationProp>();

  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
    otpCode: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

  const handleChange = (name: string, value: string) => {
    setForgotPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (forgotPasswordStep === 1) {
        console.log("step 1", forgotPasswordForm.email);
        setForgotPasswordStep(2);
        return;
      }

      console.log("step 2", forgotPasswordForm);
    } catch (error) {
      console.log("sign in err", error);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <LinearGradient colors={["#49AFF0", "white"]} className="flex-1">
        <SafeAreaView className="flex-1">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={0}
            className="flex-1"
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              {/*heading */}
              <View className="px-6">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="w-10 h-10 justify-center items-center bg-white rounded-full"
                >
                  {/* <Ionicons name="chevron-back" size={24} color="black" /> */}
                  <Text>Back</Text>
                </TouchableOpacity>
              </View>

              {/*Content */}
              <View className="flex-1 justify-end">
                <View className="h-[75%] bg-white items-center rounded-t-[30px]">
                  <Text className="font-semibold text-3xl mt-10 mb-4 text-blue-third">
                    {forgotPasswordStep === 1
                      ? "Receive OTP"
                      : "Reset Password"}
                  </Text>

                  {/*Form */}
                  <View className="w-[80%] gap-4 my-6">
                    {forgotPasswordStep === 1 ? (
                      <TextInput
                        className={`h-14 w-full px-4 pb-1 text-xl rounded-xl text-blue-four border border-gray-400`}
                        value={forgotPasswordForm.email}
                        placeholder="nnthach@gmail.com"
                        onChangeText={(text: string) =>
                          handleChange("email", text)
                        }
                      />
                    ) : (
                      <>
                        <TextInput
                          className={`h-14 w-full px-4 pb-1 text-xl rounded-xl text-blue-four border border-gray-400`}
                          value={forgotPasswordForm.otpCode}
                          placeholder="012345"
                          onChangeText={(text: string) =>
                            handleChange("otpCode", text)
                          }
                        />
                        <TextInput
                          className={`h-14 w-full px-4 pb-1 text-xl rounded-xl text-blue-four border border-gray-400`}
                          value={forgotPasswordForm.password}
                          placeholder="123456"
                          onChangeText={(text: string) =>
                            handleChange("password", text)
                          }
                          secureTextEntry
                        />
                        <TextInput
                          className={`h-14 w-full px-4 pb-1 text-xl rounded-xl text-blue-four border border-gray-400`}
                          value={forgotPasswordForm.confirmPassword}
                          placeholder="123456"
                          onChangeText={(text: string) =>
                            handleChange("confirmPassword", text)
                          }
                          secureTextEntry
                        />
                      </>
                    )}
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-blue-third p-3 w-[80%] rounded-full items-center"
                  >
                    <Text className="text-xl text-white font-medium">
                      {forgotPasswordStep === 1 ? "Send OTP" : "Reset Password"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
