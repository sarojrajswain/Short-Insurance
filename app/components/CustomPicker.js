import React, { useState } from "react";
import { View, StyleSheet, Modal, Button, FlatList, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Screen from "./Screen";
import PickerItem from "./PickerItem";
import { Picker } from "@react-native-community/picker";
import { useFormikContext } from "formik";
import ErrorMessages from "../components/forms/ErrorMessages";

export default function CustomPicker({
  icon,
  items,
  placeholder,
  selectedItem,
  onSelectItem,
  name,
  width = "100%",
  controlName,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [value, setValue] = useState(placeholder);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (itemValue) => {
    console.log(
      "name:" + name + " value:" + itemValue + " values :" + values[name]
    );
    setFieldValue("policy.risk.vechileType", itemValue);
    console.log("name:" + name + " value:" + itemValue + " value:" + value);
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => {
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
          {values[name] ? (
            <AppText style={styles.text} name={name}>
              {value}
            </AppText>
          ) : (
            <AppText style={styles.placeholder} name={name}>
              {placeholder}
              {value}
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
                  setValue(values[name]);
                  setModalVisible(false);
                }}
                title="ok"
              />
            </View>
          </View>
          <Picker
            name={name}
            style={{ width: "100%" }}
            //selectedValue={placeholder}
            onValueChange={(itemValue) => {
              setFieldValue(name, itemValue);
              console.log(
                "name:" +
                  name +
                  " itemValue:" +
                  itemValue +
                  " nameValues:" +
                  values?.name
              );
            }}
            onSelectItem={() => {
              setModalVisible(false);
            }}
          >
            <Picker.Item label="Select currency" value="" />
            {items.map((v) => {
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
      <ErrorMessages error={errors[name]} visible={touched[name]} />
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
