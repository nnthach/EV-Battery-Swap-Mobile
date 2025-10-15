// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const InputField = ({
  type = "text",
  keyboardType,
  label,
  secureTextEntry,
  openSelect,
  setOpenSelect,
  isLoading,
  data,
  setUserProfile,
  userProfile,
  name,
  value,
  ...props
}: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  return (
    <View className="gap-1">
      <Text className="text-purple-primary text-xl">{label}</Text>
      {type == "text" && (
        <View className="bg-white h-14 rounded-xl border border-blue-50">
          <TextInput
            className="h-full w-full px-4 pb-1 text-xl text-black "
            placeholderTextColor="#718EBF50"
            keyboardType={keyboardType || "default"}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={(text) =>
              setUserProfile((prev: any) => ({
                ...prev,
                [name]: text,
              }))
            }
            {...props}
          />
        </View>
      )}

      {type == "select" && (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={setOpenSelect}
            className="relative"
            disabled={isLoading}
          >
            <View className="z-0 bg-white h-14 px-2 rounded-xl border border-blue-50 flex-row w-full justify-between items-center">
              <Text>{value ? value : `Select ${label}`}</Text>
              {/* <MaterialIcons
                name="keyboard-arrow-down"
                size={26}
                color="#57298D"
              /> */}
            </View>
          </TouchableOpacity>
          {openSelect && data?.length >= 1 && (
            <View className="shadow-custom absolute top-24 z-10 w-full max-h-[250px] rounded-xl border border-gray-400 overflow-hidden">
              <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
              >
                {data?.map((item: any, index: number) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setUserProfile((prev: any) => ({
                        ...prev,
                        [name]: item.label,
                      }));
                      setOpenSelect(false);
                    }}
                    key={index}
                    className="bg-white p-4"
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </>
      )}

      {type === "date" && (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setDatePickerVisibility(true)}
          >
            <View className="bg-white h-14 px-4 rounded-xl border border-blue-50 flex-row w-full justify-between items-center">
              <Text>{value ? value : `Select ${label}`}</Text>
              {/* <MaterialIcons name="calendar-today" size={22} color="#57298D" /> */}
            </View>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              setDatePickerVisibility(false);
              setUserProfile((prev: any) => ({
                ...prev,
                [name]: date.toISOString().split("T")[0], // yyyy-mm-dd
              }));
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </>
      )}
    </View>
  );
};

export default InputField;
