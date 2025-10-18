import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPick: (uri: string) => void;
};

export default function ImagePickerModal({ visible, onClose, onPick }: Props) {
  // no uploading here; return local uri to parent and let parent upload on Save

  const pickFromLibrary = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Toast.show({
          type: "error",
          text1: "Permission required to access photos",
        });
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        const uri =
          result.assets && result.assets.length > 0
            ? result.assets[0].uri
            : undefined;
        if (uri) {
          // return local uri to parent; parent will upload on Save
          onPick(uri);
          onClose();
        }
      }
    } catch (error) {
      console.log("pick image err", error);
    }
  };

  const takePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Toast.show({ type: "error", text1: "Camera permission is required" });
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        const uri =
          result.assets && result.assets.length > 0
            ? result.assets[0].uri
            : undefined;
        if (uri) {
          onPick(uri);
          onClose();
        }
      }
    } catch (error) {
      console.log("take photo err", error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={takePhoto}
            style={{ paddingVertical: 12, alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickFromLibrary}
            style={{ paddingVertical: 12, alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Choose from Library
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={{ paddingVertical: 12, alignItems: "center" }}
          >
            <Text style={{ fontSize: 16, color: "#ef4444" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {/* no uploading overlay here - parent will handle upload on Save */}
      </TouchableOpacity>
    </Modal>
  );
}
