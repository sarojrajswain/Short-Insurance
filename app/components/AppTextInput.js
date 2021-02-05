import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

export default function AppTextInput({ icon, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={defaultStyles.colors.medium}
        style={styles.icon}
      />
      <TextInput
        placeholderTextColor={defaultStyles.colors.medium}
        style={defaultStyles.textInput}
        {...otherProps}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    borderColor: defaultStyles.colors.medium,
    borderWidth: 1,
    borderStyle: "solid",
  },

  icon: {
    marginRight: 10,
  },
});
