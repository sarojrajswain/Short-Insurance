import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ImageInput from "./ImageInput";

export default function ImageInputList({
  imageUris = [],
  onAddImage,
  onRemoveImage,
}) {
  const scrollView = useRef();
  return (
    <ScrollView
      horizontal={true}
      ref={scrollView}
      onContentSizeChange={() => scrollView.current.scrollToEnd()}
    >
      <View style={styles.container}>
        {imageUris.map((uri) => (
          <View style={styles.image} key={uri}>
            <ImageInput
              imageUri={uri}
              onChangeImage={() => onRemoveImage(uri)}
            />
          </View>
        ))}
        <ImageInput onChangeImage={(uri) => onAddImage(uri)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  image: {
    marginRight: 10,
    marginBottom: 30,
  },
});
