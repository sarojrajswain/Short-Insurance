import React from "react";
import { View, Text } from "react-native";
import ImageInputList from "../ImageInputList";
import ErrorMessages from "./ErrorMessages";
import { useFormikContext } from "formik";

export default function AppImagePicker({ name }) {
  const { errors, setFieldValue, values, touched } = useFormikContext();
  const imageUris = values[name];
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
      <ErrorMessages error={errors[name]} visible={touched[name]} />
    </>
  );
}
