import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppText from "../AppText";

export default function ErrorMessages({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText>{error}</AppText>;
}
const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
