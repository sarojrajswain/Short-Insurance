import React from "react";
import { View, Text } from "react-native";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessages from "./ErrorMessages";
import _ from "lodash";

export default function AppFormField({ name, width, ...otherProps }) {
  const {
    setFieldTouched,
    touched,
    errors,
    handleChange,
    values,
  } = useFormikContext();

  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        onBlur={() => {
          setFieldTouched(name);
        }}
        width={width}
        {...otherProps}
        // keyboardType="email-address"
        // textContentType="emailAddress"
        // icon="email"
      />
      <ErrorMessages
        error={_.get(errors, name)}
        visible={_.get(touched, name)}
      />
    </>
  );
}
