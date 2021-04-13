import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import CheckBox from "react-native-check-box";
import defaultStyles from "../config/styles";
import _ from "lodash";
import AppText from "./AppText";
import ErrorMessages from "./forms/ErrorMessages";

export default function CustomCheckBox({ name, defaultValue }) {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const {
    setFieldTouched,
    touched,
    errors,
    values,
    setFieldValue,
  } = useFormikContext();

  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          checkedCheckBoxColor={defaultStyles.colors.primary}
          uncheckedCheckBoxColor={defaultStyles.colors.medium}
          onClick={() => {
            setToggleCheckBox(!toggleCheckBox);
            setFieldValue(name, !toggleCheckBox);
          }}
          isChecked={toggleCheckBox}
        />
        <AppText style={styles.checkBoxLabel}>
          I agree the terms and Conditions {toggleCheckBox ? "👍" : "👎"}
        </AppText>
      </View>
      <ErrorMessages
        error={_.get(errors, name)}
        visible={_.get(touched, name)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  checkBoxLabel: {
    color: defaultStyles.colors.medium,
    fontStyle: "italic",
  },
});
