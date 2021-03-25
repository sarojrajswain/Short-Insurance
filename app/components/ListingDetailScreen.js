import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import ListItem from "./ListItem";

export default function ListingDetailScreen({ route }) {
  const listing = route.params;
  return (
    <SafeAreaView>
    <View>
      <Image style={styles.image} source={listing.image} />
      <View style={styles.detailContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>{listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            title="saroj"
            subtitle="5 listing"
            image={require("../assets/mosh.jpg")}
          />
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  detailContainer: {
    padding: 20,
  },
  title: {
    color: colors.primary,
  },
  userContainer: {
    marginVertical: 40,
  },
  price: {
    color: colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});
