import React from "react";
import { Switch, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";
import SwitchSelector from "react-native-switch-selector";

export default function CustomSwitchSelector({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const handleChange = (itemValue) => {
    setFieldValue(name, itemValue);
  };

  options = [
    { label: "Yes", value: "True" }, //images.feminino = require('./path_to/assets/img/feminino.png')
    { label: "No", value: "False" }, //images.masculino = require('./path_to/assets/img/masculino.png')
  ];

  return (
    <React.Fragment>
      <SwitchSelector
        name={name}
        style={{ paddingVertical: 10 }}
        initial={1}
        height={60}
        onPress={(value) => setFieldValue(name, value)}
        //value={values[name]}
        textColor={defaultStyles.colors.medium} //'#7a44cf'
        selectedColor={defaultStyles.colors.light}
        buttonColor={defaultStyles.colors.green}
        borderColor={"purple"}
        options={options}
      />
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
