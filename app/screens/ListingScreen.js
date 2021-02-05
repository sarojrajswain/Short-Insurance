import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

const listings = [
  {
    id: 1,
    policyNumber: "XYZ4344KHM",
    effectiveDate: "2020-01-01",
    expiryDate: "2020-30-12",
    vehicleDetail: "Honda Activa, 2015",
    image: require("../assets/Honda-Activa.jpg"),
    year: 2015,
  },
  {
    id: 2,
    policyNumber: "XYZ4344KHM",
    effectiveDate: "2020-01-01",
    expiryDate: "2020-30-12",
    vehicleDetail: "HeroHonda CBZ, 2019",
    image: require("../assets/hero-honda-cbz.jpg"),
    year: 2019,
  },
];
export default function ListingScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <FlatList
        style={styles.flatList}
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.policyNumber}
            subTitle={item.vehicleDetail}
            imageSource={item.image}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    padding: 20,
  },
  flatList: {
    height: "100%",
  },
});
