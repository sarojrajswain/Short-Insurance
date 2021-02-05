import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "./AppText";
import Icon from "./Icon";

export default function CatagoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={80}
        />
        <AppText style={styles.label}>{item.label}</AppText>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: "33%",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
