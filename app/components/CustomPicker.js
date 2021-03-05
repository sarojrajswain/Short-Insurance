import React, { useState } from "react";
import { View, StyleSheet, Modal, Button, FlatList, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import { Picker } from "@react-native-community/picker";

export default function CustomPicker({
  icon,
  items,
  placeholder,
  numberOfColumns = 1,
  PickerItemComponent = PickerItem,
  selectedItem,
  onSelectItem,
  width = "100%",
  controlName,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [fieldValue, setFieldValue] = useState();
  const [pickerValue, setPickerValue] = useState("");

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("items: " + items.currencies[0].country);
          setModalVisible(true);
        }}
      >
        <View style={[styles.container, { width }]}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
          {fieldValue ? (
            <AppText style={styles.text} name={controlName}>
              {fieldValue}
            </AppText>
          ) : (
            <AppText style={styles.placeholder} name={controlName}>
              {placeholder}
            </AppText>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        style={{ width: "100%", height: 200, backgroundColor: "yellow" }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerButtons}>
              <Button onPress={() => setModalVisible(false)} title="close" />
              <Button
                onPress={() => {
                  setFieldValue(pickerValue);
                  setModalVisible(false);
                }}
                title="ok"
              />
            </View>
          </View>
          <Picker
            name={controlName}
            value=""
            style={{ width: "100%" }}
            selectedValue={pickerValue}
            onValueChange={(itemValue) => setPickerValue(itemValue)}
          >
            <Picker.Item label="Select currency" value="" />
            {items.currencies.map((v) => {
              return (
                <Picker.Item label={v.label} value={v.value} key={v.value} />
              );
            })}
          </Picker>
        </View>
        {/* <Screen>
          <Button onPress={() => setModalVisible(false)} title="close" />
          
        </Screen> */}
      </Modal>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    marginVertical: 10,
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
  },
  text: {
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  modalContainer: {
    position: "absolute",
    backgroundColor: "red",
    width: "100%",
    top: 450,
    //flex: 1,
    //justifyContent: "flex-end",
    //alignItems: "flex-end",
  },
  pickerContainer: {
    height: 50,
    width: "100%",
    justifyContent: "flex-end",
  },
  pickerButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    //alignItems: "center",
    //backgroundColor: "#eee",
  },
});
