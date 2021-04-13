import React, { useEffect, useState } from "react";
import { Switch, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";
import _ from 'lodash';
import colors from "../config/colors";

export default function CustomSwitch({ name, defaultValue }) {
  const { errors, setFieldValue, touched,  values } = useFormikContext();
  
  return (
    <React.Fragment>
      <Switch
      style={styles.switch}
        name={name}
        value={_.get(values,name)}
        onValueChange={(value) => {
          setFieldValue(name, value);
        }}
        trackColor={{ false: colors.white, true: colors.blue}}
        thumbColor={_.get(values,name) ? colors.white : colors.blue}
        ios_backgroundColor={colors.light}
      ></Switch>
      {/* <ErrorMessages error={errors[name]} visible={touched[name]} /> */}
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
  switch:{
    backgroundColor:"green",
    borderRadius:15
    
  }
});
