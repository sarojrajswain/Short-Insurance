import React from "react";
import { View, Text, StyleSheet, FlatList, ImageComponent } from "react-native";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";

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
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Saroj Raj swain"
          subtitle="saroj@gmail.com"
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
