import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Button, Modal, StyleSheet, Switch, View } from "react-native";
import { AppLoading } from "expo";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import AuthNavigator from "./app/navigation/AuthNavigation";
import AppNavigator from "./app/navigation/AppNavigator";
import Screen from "./app/components/Screen";
import AppText from "./app/components/AppText";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  // useEffect(() => {
  //   console.log("user:" + user);
  //   restoreUser();
  // }, []);

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => {
          setIsReady(true);
        }}
      />
    );
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
      {/* <Switch
        value={isNew}
        onValueChange={(newValue) => setIsNew(newValue)}
      ></Switch> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
