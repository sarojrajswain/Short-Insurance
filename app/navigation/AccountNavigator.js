import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MessagesScreen from "../screens/MessagesScreen";
import AccountScreen from "../screens/AccountScreen";
import AccountEditScreen from "../screens/AccountEditScreen";
import IDCard from "../screens/IDCard";

const Stack = createStackNavigator();
const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen name="AccountEdit" component={AccountEditScreen} />
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="IDCard" component={IDCard} />
  </Stack.Navigator>
);

export default AccountNavigator;
