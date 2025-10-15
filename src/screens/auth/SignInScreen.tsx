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
  Image,
} from "react-native";
import React, { useState } from "react";
import { LoginForm, RootStackParamList } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;
export default function SignInScreen() {
  const navigation = useNavigation<AppNavigationProp>();

  const handleChange = (name: string, value: string) => {
    setSignInForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [signInForm, setSignInForm] = useState<LoginForm>({
    usernameOrEmail: "",
    password: "",
  });

  const handleSubmit = async () => {
    try {
      // const user = await login(signInForm);
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
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
                  <Text>back</Text>
                </TouchableOpacity>
              </View>
              {/*Content */}
              <View className="flex-1 justify-end">
                <View className="h-[75%] bg-white items-center rounded-t-[30px]">
                  <Text className="font-semibold text-3xl mt-10 mb-4 text-blue-third">
                    Welcome Back
                  </Text>

                  {/*Form */}
                  <View className="w-[80%] gap-4 my-6">
                    <TextInput
                      className={`h-14 w-full px-4 pb-1 text-xl rounded-xl text-blue-four border border-gray-400`}
                      value={signInForm.usernameOrEmail}
                      placeholder="nnthach"
                      onChangeText={(text: string) =>
                        handleChange("usernameOrEmail", text)
                      }
                    />
                    <TextInput
                      className={`h-14 w-full px-4 pb-1 text-xl rounded-xl text-blue-four border border-gray-400`}
                      value={signInForm.password}
                      placeholder="123456"
                      onChangeText={(text: string) =>
                        handleChange("password", text)
                      }
                      secureTextEntry
                    />
                  </View>

                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="bg-blue-third p-3 w-[80%] rounded-full items-center"
                  >
                    <Text className="text-xl text-white font-medium">
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ForgotPassword" as never)
                    }
                  >
                    <Text className="text-right text-lg text-blue-third mt-4">
                      Forgot password?
                    </Text>
                  </TouchableOpacity>

                  {/*other gg */}
                  <View className="flex-row items-center justify-center my-10 w-[80%] overflow-hidden">
                    <View className=" w-full h-[1px] bg-gray-200" />
                    <Text className="bg-white text-gray-300 px-2">
                      Or sign in with
                    </Text>
                    <View className=" w-full h-[1px] bg-gray-200" />
                  </View>

                  {/* Button login gg */}
                  <View className="w-[80%]">
                    <TouchableOpacity className="border border-gray-300 w-full p-3 rounded-full items-center justify-center flex-row gap-2">
                      <Image
                        source={require("@/assets/google.png")}
                        className="w-6 h-6"
                      />
                      <Text className="text-xl font-medium">Google</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
