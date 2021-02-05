import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingDetailScreen from "../components/ListingDetailScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import ListingScreen from "../screens/ListingScreen";

const Stack = createStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Listings" component={ListingScreen} />
    <Stack.Screen
      name="ListingDetails"
      component={ListingDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
