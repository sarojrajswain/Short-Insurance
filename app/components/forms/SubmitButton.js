import React from "react";
import { useFormikContext } from "formik";
import Buttons from "../AppButton";

export default function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return <Buttons title={title} onPress={handleSubmit} />;
}
