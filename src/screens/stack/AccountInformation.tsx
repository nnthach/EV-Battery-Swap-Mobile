import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import Toast from "react-native-toast-message";
import { User } from "@/types";
import { Camera, ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "@/types";
import { updateProfile } from "@/src/services/authService";
import { uploadImageToCloudinary } from "@/src/config/cloudinary";
import ImagePickerModal from "@/src/components/ImagePickerModal";

export default function AccountInformation() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [showPickerOptions, setShowPickerOptions] = useState(false);
  const placeholderInitial =
    (user?.fullName ?? "").trim().split(" ").pop()?.[0]?.toUpperCase() ?? "";

  const onSave = async () => {
    try {
      setIsSaving(true);

      let avatarUrl = avatar;
      if (avatar && avatar.startsWith("file://")) {
        // upload now to cloudinary if user didn't upload earlier
        avatarUrl = await uploadImageToCloudinary({ uri: avatar });
      }

      const payload: Partial<User> = {
        fullName,
        email,
        phone,
        avatar: avatarUrl,
      };

      await updateProfile(payload);
      if (!user) {
        // no local user to update — bail out or fetch user/me before saving
        return;
      }

      const updatedUser: User = {
        ...user,
        fullName,
        avatar: avatarUrl,
      };

      dispatch(setUser(updatedUser));
      Toast.show({ type: "success", text1: "Profile updated" });
    } catch (error: any) {
      console.log("update profile err", error);
      Toast.show({ type: "error", text1: error?.message || "Update failed" });
    } finally {
      setIsSaving(false);
    }
  };

  const pickImage = async () => {
    setShowPickerOptions(true);
  };

  // modal handled by ImagePickerModal component
  return (
    <LinearGradient colors={["#49AFF0", "white"]} className="flex-1">
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Header */}
        <View className="px-4 pt-4 pb-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full bg-white/20"
          >
            <ArrowLeft size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">
            Account Information
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View className="items-center mt-6">
            <View className="w-28 h-28 rounded-full bg-white overflow-hidden items-center justify-center">
              {avatar ? (
                <Image source={{ uri: avatar }} className="w-full h-full" />
              ) : (
                <Text className="text-5xl font-bold text-blue-500">
                  {placeholderInitial}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={pickImage}
              className="mt-3 flex-row items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full"
            >
              <Camera size={18} color="white" />
              <Text className="text-white font-medium">Change photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="bg-white mt-8 mx-6 rounded-2xl p-5 shadow-sm">
            <Text className="text-blue-500 font-semibold mb-1">Full name</Text>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Your name"
              className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
            />

            <Text className="text-blue-500 font-semibold mb-1">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
              selectTextOnFocus={false}
              placeholder="you@example.com"
              className="border border-gray-200 rounded-xl px-4 py-3 mb-4"
            />

            <Text className="text-blue-500 font-semibold mb-1">Phone</Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              editable={false}
              selectTextOnFocus={false}
              keyboardType="phone-pad"
              placeholder="(+84) 123 456 789"
              className="border border-gray-200 rounded-xl px-4 py-3"
            />
          </View>
        </ScrollView>

        {/* Fixed Save Button */}
        <View className="absolute bottom-14 left-6 right-6">
          <TouchableOpacity
            onPress={onSave}
            disabled={isSaving}
            activeOpacity={0.85}
            className="overflow-hidden rounded-2xl shadow-lg"
          >
            <LinearGradient
              colors={["#0ea5e9", "#0284c7"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="py-4 items-center rounded-2xl"
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-bold text-lg">
                  Save changes
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <ImagePickerModal
          visible={showPickerOptions}
          onClose={() => setShowPickerOptions(false)}
          onPick={(uri: string) => {
            // show selected image immediately; actual upload happens on Save
            setAvatar(uri);
          }}
        />

        {/* no immediate uploading overlay; upload happens when user taps Save */}
      </SafeAreaView>
    </LinearGradient>
  );
}
