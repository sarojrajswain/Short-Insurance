import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";
import DatePicker from "react-native-datepicker";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import _ from "lodash";

export default function CustomDatePicker({
  name,
  icon,
  placeholder,
  defaultValue,
}) {
  const { errors, setFieldValue, touched } = useFormikContext();
  const [isCalendarPickerVisible, setIsCalendarPickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate, setSelectedDate] = useState("2016-05-15");

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
    setFieldValue(name, date);
    setIsCalendarPickerVisible(false);
  };

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
          setIsCalendarPickerVisible(true);
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
              {defaultValue ? defaultValue : placeholder}
            </AppText>
          )}
          <MaterialCommunityIcons
            name="calendar"
            size={30}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      {isCalendarPickerVisible ? (
        <View>
          <DatePicker
            name={name}
            visible={isDatePickerVisible}
            style={{ width: 20 }}
            mode="date"
            date={selectedDate}
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={onDateChange}
            hideText="true"
          />
          <ErrorMessages
            error={_.get(errors, name)}
            visible={_.get(touched, name)}
          />
        </View>
      ) : null}
    </React.Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#FFFFFF",
    //marginTop: 100,
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
