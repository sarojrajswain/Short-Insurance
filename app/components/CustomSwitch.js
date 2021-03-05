import React from "react";
import { Switch, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";

export default function CustomSwitch({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const handleChange = (itemValue) => {
    setFieldValue(name, itemValue);
  };

  return (
    <React.Fragment>
      <Switch value={values[name]} onValueChange={handleChange}></Switch>
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
