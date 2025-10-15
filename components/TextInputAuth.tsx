import { Text, TextInput, View } from "react-native";

function TextInputAuth({
  focusedField,
  setFocusedField,
  name,
  label,
  value,
  onChangeText,
  error,
  customLeftCSSOnblur = "left-4",
  customLeftCSSOnfocus = "left-4",
  ...props
}: any) {
  const isFocused = focusedField === name;
  return (
    <>
      <View
        className={`relative border ${
          error
            ? "border-red-500"
            : isFocused
            ? "border-blue-four"
            : "border-gray-200"
        } rounded-xl h-14 `}
      >
        <TextInput
          className={`h-full w-full px-4 pb-1 text-xl text-blue-four`}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocusedField(name)}
          onBlur={() => setFocusedField(null)}
          textAlignVertical="center"
          {...props}
        />
        <Text
          className={`absolute transition-all duration-200 ease-in-out left-4
            ${
              isFocused || value
                ? "-top-3 scale-90 text-blue-four bg-white px-1"
                : "top-1/2 -translate-y-1/2 scale-100 text-gray-400 bg-white"
            }`}
        >
          {label}
        </Text>
      </View>

      {error && (
        <Text className="text-red-500 text-sm mt-[-14px]">{error}</Text>
      )}
    </>
  );
}

export default TextInputAuth;
