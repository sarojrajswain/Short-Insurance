import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "../../components/AppTextInput";
import ErrorMessages from "./ErrorMessages";
import _ from "lodash";

function AppFormField(
  {
    name,
    icon,
     width,
     placeholder,
     onSubmitEditing,
     returnKeyType,
     defaultValue,
     autoCapitalize,
     autoCorrect,
     secureTextEntry,
     textContentType,
     keyboardType,
  },
  ref
) {
  const { setFieldTouched,
    touched,
    errors,
    handleChange,
    values,} = useFormikContext();

  return (
    <>
      <AppTextInput
        name={name}
        onChangeText={handleChange(name)}
        onBlur={() => {
          setFieldTouched(name);
        }}
        width={width}
        icon={icon}
        ref={ref}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        keyboardType={keyboardType}
        name={name}
        placeholder={placeholder}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        defaultValue={defaultValue}
        ref={ref}
      />
      <ErrorMessages
        error={_.get(errors, name)}
        visible={_.get(touched, name)}
      />
    </>
  );
}

const forwardAppFormField = React.forwardRef(AppFormField);

export default forwardAppFormField;
