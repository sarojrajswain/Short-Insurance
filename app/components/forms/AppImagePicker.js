import React from "react";
import { View, Text } from "react-native";
import ImageInputList from "../ImageInputList";
import ErrorMessages from "./ErrorMessages";
import { useFormikContext } from "formik";
import _ from 'lodash';

export default function AppImagePicker({ name }) {
  const { errors, setFieldValue, values, touched } = useFormikContext();
  const imageUris = _.get(values,name);
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessages
          error={_.get(errors, name)}
          visible={_.get(touched, name)}
        />
    </>
  );
}
