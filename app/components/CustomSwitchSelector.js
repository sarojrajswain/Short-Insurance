import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import ErrorMessages from "./forms/ErrorMessages";
import defaultStyles from "../config/styles";
import SwitchSelector from "react-native-switch-selector";
import _ from "lodash";
import colors from "../config/colors";

export default function CustomSwitchSelector({ name, options, defaultValue}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const defaultIndex = parseInt(_.findIndex(options,{value: defaultValue}));

  
const i = defaultValue;
  return (
    <React.Fragment>
      <SwitchSelector
        style={styles.container}
        name={name}
        style={{ paddingVertical: 10 }}
        //initial={parseInt(_.findIndex(options,{value: i}))}
        initial={0}
        height={60}
        onPress={(value) => 
          {
            console.log(value)
            setFieldValue(name, value)
          }
          }
        //value={values[name]}
        textColor={defaultStyles.colors.medium} //'#7a44cf'
        selectedColor={defaultStyles.colors.light}
        buttonColor={colors.blue}
        borderColor={"purple"}
        options={options}
      />
      <ErrorMessages
        error={_.get(errors, name)}
        visible={_.get(touched, name)}
      />
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
