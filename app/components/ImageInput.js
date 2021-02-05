import React, { useEffect } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

export default function ImageInput({ imageUri, onChangeImage }) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.getCameraPermissionsAsync();
    if (!granted) alert("you need to enable the permission and grant access");
  };
  useEffect(() => {
    requestPermission();
  }, []);

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure to Delete the image", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.image,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log("error reading an image", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={40}
            color={colors.medium}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.light,
    borderRadius: 15,
    alignItems: "center",
    height: 100,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
