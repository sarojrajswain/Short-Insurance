import React from "react";
import { View, Text } from "react-native";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessages from "./ErrorMessages";

export default function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, touched, errors, handleChange } = useFormikContext();
  return (
    <>
      <AppTextInput
        // autoCapitalize="none"
        // placeholder="email"
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        {...otherProps}
        // keyboardType="email-address"
        // textContentType="emailAddress"
        // icon="email"
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}
