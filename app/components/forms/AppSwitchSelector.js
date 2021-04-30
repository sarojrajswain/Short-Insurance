import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessages from "./ErrorMessages";
import _ from "lodash";
import CustomSwitchSelector from "../CustomSwitchSelector";

function AppSwitchSelector({ name, options, defaultValue }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  let initialValue;

  return (
    <>
      <CustomSwitchSelector
        name={name}
        options={options}
        initialValue={initialValue}
        onPress={(value) => {
          console.log(defaultValue);
          setFieldValue(name, value);
        }}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppSwitchSelector;
