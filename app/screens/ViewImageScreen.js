import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function ViewImageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name="close" size={35} color={colors.white} />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons name="close" size={35} color={colors.white} />
      </View>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={require("../assets/chair.jpg")}
      ></Image>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: colors.primary,
  },
  deleteIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: colors.secondary,
  },
});
export default ViewImageScreen;
