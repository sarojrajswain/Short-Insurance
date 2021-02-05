import React from "react";
import { StyleSheet, Image } from "react-native";
import * as yup from "yup";

import Screen from "../components/Screen";
import { AppFormField, SubmitButton } from "../components/forms";
import AppForm from "../components/forms/AppForm";
const ValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});
export default function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={ValidationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          placeholder="email"
          keyboardType="email-address"
          textContentType="emailAddress"
          icon="email"
          name="email"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: "center",
    marginVertical: 40,
  },
});
