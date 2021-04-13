import React, { useState } from "react";
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
  const [caption,  setCaption] = useState(items[0].label);

  return (
    <>
      <AppPicker
        items={items}
        width={width}
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        onSelectItem={(item) => {
          setFieldValue(name, item.value);
          setCaption(item.label);
        }}
        placeholder={placeholder}
        selectedItem={_.get(values, name)}
        selectedLabel={caption}
      />
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
