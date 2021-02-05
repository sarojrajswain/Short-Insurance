import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../config/colors";
import AppText from "./AppText";

export default function ListItem({
  title,
  subtitle,
  image,
  onPress,
  renderRightActions,
  IconComponent,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight onPress={onPress} underlayColor={colors.light}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailComponent}>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subtitle && (
              <AppText style={styles.subtitle} numberOfLines={2}>
                {subtitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            color={colors.medium}
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexDirection: "row",
    padding: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  subtitle: {
    color: "#6e6969",
  },
  detailComponent: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
});
