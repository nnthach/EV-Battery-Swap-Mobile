import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  className = "",
}: CustomButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return disabled || loading
          ? "bg-blue-300"
          : "bg-blue-primary active:bg-blue-700";
      case "secondary":
        return disabled || loading
          ? "bg-gray-200"
          : "bg-gray-100 active:bg-gray-200";
      case "outline":
        return disabled || loading
          ? "bg-transparent border border-gray-300"
          : "bg-transparent border border-blue-600 active:bg-blue-50";
      default:
        return "bg-blue-600";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case "primary":
        return disabled || loading ? "text-white" : "text-white";
      case "secondary":
        return disabled || loading ? "text-gray-400" : "text-gray-700";
      case "outline":
        return disabled || loading ? "text-gray-400" : "text-blue-600";
      default:
        return "text-white";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return "py-2 px-3";
      case "medium":
        return "py-3 px-4";
      case "large":
        return "py-4 px-6";
      default:
        return "py-3 px-4";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        ${getVariantStyles()}
        ${getSizeStyles()}
        ${fullWidth ? "w-full" : ""}
        rounded-xl
        flex-row
        items-center
        justify-center
        ${disabled || loading ? "opacity-60" : ""}
        ${className}
      `.trim()}
      activeOpacity={0.8}
    >
      {loading ? (
        <View className="flex-row items-center">
          <ActivityIndicator
            size="small"
            color={variant === "primary" ? "white" : "#3b82f6"}
            className="mr-2"
          />
          <Text className={`${getTextStyles()} ${getTextSize()} font-medium`}>
            Loading...
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`${getTextStyles()} ${getTextSize()} font-medium`}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
