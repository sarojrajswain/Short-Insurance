import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessages from "./ErrorMessages";
import _ from "lodash";

function AppFormPicker({
  items,
  name,
  PickerItemComponent,
  numberOfColumns,
  width,
  placeholder,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        width={width}
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        onSelectItem={(item) => setFieldValue(name, item.value)}
        placeholder={placeholder}
        selectedItem={_.get(values, name)}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
