import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

function AppTextInput(
  {
    value,
    icon,
    width = "100%",
    name,
    placeholder,
    style,
    onSubmitEditing,
    returnKeyType,
    onChangeText,
    onBlur,
    defaultValue,
    autoCapitalize,
    autoCorrect,
    secureTextEntry,
    textContentType,
    keyboardType,
    onChange,
  },
  ref
) {
  return (
    <View style={[styles.container, { width }]}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={defaultStyles.colors.medium}
        style={styles.icon}
      />
      <TextInput
        onChange={onChange}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        width={width}
        ref={ref}
        name={name}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        textContentType={textContentType}
        keyboardType={keyboardType}
        placeholder={placeholder}
        style={defaultStyles.textInput}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        defaultValue={defaultValue}
        ref={ref}
      />
    </View>
  );
}

const forwaredInput = React.forwardRef(AppTextInput);

export default forwaredInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    marginVertical: 10,
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    borderColor: defaultStyles.colors.medium,
    borderWidth: 1,
    borderStyle: "solid",
  },
  textInput: {
    color: "grey",
    fontSize: 18,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
});
