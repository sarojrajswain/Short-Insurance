import React, { useState, useEffect } from "react";
import { Switch, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";
import CalendarPicker from "react-native-calendar-picker";
import AppText from "./AppText";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import _ from "lodash";

export default function CustomCalendarPicker({
  name,
  icon,
  placeholder,
  defaultValue,
}) {
  const { errors, setFieldValue, touched } = useFormikContext();
  const [isCalendarPickerVisible, setIsCalendarPickerVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [selectedDate = defaultValue, setSelectedDate] = useState();

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === "END_DATE") {
      setSelectedEndDate(date.toDate().toLocaleDateString());
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date.toDate().toLocaleDateString());
    }
    //console.log(selectedStartDate ? selectedStartDate.toString() : "");
    const selectedDate =
      date._d.getDate() +
      "/" +
      date._d.getMonth() +
      "/" +
      date._d.getFullYear();

    setSelectedDate(date.toDate().toLocaleDateString());
    setFieldValue(name, date.toDate().toLocaleDateString());
    setIsCalendarPickerVisible(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date.toDate().toLocaleDateString());
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
              {defaultValue}
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
          <CalendarPicker
            name={name}
            isVisible={isDatePickerVisible}
            onDateChange={onDateChange}
            previousTitle="Previous"
            nextTitle="Next"
            selectedStartDate={selectedDate ? selectedDate : defaultValue}
            initialDate={defaultValue}
            todayBackgroundColor="#e6ffe6"
            selectedDayColor="#66ff33"
            selectedDayTextColor="#000000"
            weekdays={["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]}
            months={[
              "January",
              "Febraury",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ]}
            scaleFactor={375}
            textStyle={{
              fontFamily: "Cochin",
              color: "#000000",
            }}
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
