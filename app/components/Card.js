import React from "react";
import { Image, View, StyleSheet } from "react-native";
import AppText from "./AppText";

import colors from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
function Card({ title, subTitle, imageSource, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={imageSource} />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>Policy Number : {title}</AppText>
          <AppText style={styles.subTitle}>Vehicle info : {subTitle}</AppText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
    height: "100%",
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  subTitle: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  title: {
    marginBottom: 7,
  },
});
export default Card;
