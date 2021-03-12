import React, { useState } from "react";
import { View, StyleSheet, Modal, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import { useFormikContext } from "formik";
import ErrorMessages from "../components/forms/ErrorMessages";
import NumberFormat from "react-number-format";
import _ from "lodash";

export default function CustomPicker({
  icon,
  items,
  placeholder,
  name,
  width = "100%",
}) {
  const { errors, setFieldValue, touched } = useFormikContext();
  const [pickerValue, setPickerValue] = useState(placeholder);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);

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
          {pickerValue ? (
            // <NumberFormat
            //   thousandSeparator={true}
            //   thousandsGroupStyle="lakh"
            //   displayType={"text"}
            //   prefix={"₹"}
            //   value={123456789}
            //   renderText={(formattedvalue) => (
            //     <AppText style={styles.text}>{formattedvalue}</AppText>
            //   )}
            // />
            <AppText style={styles.text} name={name}>
              {pickerValue}
            </AppText>
          ) : (
            <AppText style={styles.placeholder} name={name}>
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
      <View style={styles.viewContainer} visible={modalVisible}>
        <Modal
          visible={modalVisible}
          animationType="fade"
          transparent={true}
          style={{ width: "100%", backgroundColor: "yellow" }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.pickerContainer}>
              <View style={styles.pickerButtons}>
                <Button onPress={() => setModalVisible(false)} title="close" />
                <Button
                  onPress={() => {
                    setPickerValue(selectedValue);
                    setModalVisible(false);
                  }}
                  title="ok"
                />
              </View>
            </View>
            <Picker
              name={name}
              style={{ width: "100%" }}
              selectedValue={selectedValue}
              onSelectItem={(item) => setFieldValue(name, item)}
              onValueChange={(itemValue) => {
                console.log(itemValue);
                setFieldValue(name, itemValue);
                setSelectedValue(itemValue);
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
        <ErrorMessages
          error={_.get(errors, name)}
          visible={_.get(touched, name)}
        />
      </View>
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
  },
  container: {
    backgroundColor: defaultStyles.colors.white,
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
