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
  filterKey,
  valueKey,
  captionKey,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [caption, setCaption] = useState(items[0].label);
  const key = _.get(values, filterKey);

  return (
    <>
      <AppPicker
        valueKey={valueKey}
        searchKey={filterKey}
        captionKey={captionKey}
        filterKey={key}
        items={items}
        width={width}
        numberOfColumns={numberOfColumns}
        PickerItemComponent={PickerItemComponent}
        onSelectItem={(item) => {
          // setFieldValue(name, item.value);
          // setCaption(item.label);
          setFieldValue(name, item[valueKey]);
          setCaption(item[captionKey]);
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
