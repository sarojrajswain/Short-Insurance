import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={(styles.view, style)}>{children}</View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  screen: {
    //paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
