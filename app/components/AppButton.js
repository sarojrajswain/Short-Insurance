import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import colors from "../config/colors";

function AppButton({ title, onPress, color = "blue", style }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 25,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.white,
  },
});
export default AppButton;
