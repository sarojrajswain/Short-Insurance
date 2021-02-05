import React from "react";
import { useFormikContext } from "formik";

import AppPicker from "../AppPicker";
import ErrorMessages from "./ErrorMessages";

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
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
