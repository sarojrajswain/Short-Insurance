import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function CustomDateTimePicker({
  icon,
  name,
  placeholder,
  width = "100%",
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <React.Fragment>
      <TouchableWithoutFeedback
        onPress={() => {
          setDatePickerVisibility(true);
        }}
      >
        <View style={[styles.container]}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={defaultStyles.colors.medium}
            style={styles.icon}
          />
          {selectedDate ? (
            <AppText style={styles.text} name={name}>
              {selectedDate}
            </AppText>
          ) : (
            <AppText style={styles.placeholder} name={name}>
              {placeholder}
            </AppText>
          )}
          <MaterialCommunityIcons
            name="calendar"
            size={30}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        confirmTextIOS={"ok"}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    width: "100%",
    marginVertical: 10,
    padding: 15,
    borderRadius: 25,
    flexDirection: "row",
    borderColor: defaultStyles.colors.dark,
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
