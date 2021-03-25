import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateQuote from "../screens/CreateQuote";
import ListingEditScreen from "../screens/ListingEditScreen";
import ListingScreen from "../screens/ListingScreen";

const Stack = createStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Policy" component={ListingScreen} />
    <Stack.Screen
      name="CreateQuote"
      component={CreateQuote}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
