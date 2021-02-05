import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import ListItem from "../components/ListItem";
import Constants from "expo-constants";
import Screen from "../components/Screen";
import ListItemSeparator from "../components/ListItemSeparator";
import ListingDetailScreen from "../components/ListingDetailScreen";
import ListItemDeleteItem from "../components/ListItemDeleteItem";

const initialMessages = [
  {
    id: 1,
    title: "saroj",
    description: "D1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "saroj",
    description: "D1",
    image: require("../assets/mosh.jpg"),
  },
];
export default function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);
  const handleDelete = (message) => {
    const newMessage = messages.filter((m) => m.id !== message.id);
    setMessages(newMessage);
  };
  return (
    <Screen>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subtitle={item.description}
            image={item.image}
            onPress={() => console.log("Message selected", item)}
            renderRightActions={() => (
              <ListItemDeleteItem onPress={() => handleDelete(item)} />
            )}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 3,
              title: "saroj Raj",
              description: "D1",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({});
