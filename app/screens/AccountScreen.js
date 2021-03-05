import React from "react";
import { View, Text, StyleSheet, FlatList, ImageComponent } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";

const manyItems = [
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundcolor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];
export default function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={user.email}
          subtitle={user.email}
          image={require("../assets/Saroj.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={manyItems}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              subtitle={item.subtitle}
              ImageComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundcolor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
          keyExtractor={(item) => item.title}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      ></ListItem>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
