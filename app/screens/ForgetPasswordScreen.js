import React, { useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import * as yup from "yup";

import Screen from "../components/Screen";
import { ErrorMessages, AppFormField, SubmitButton } from "../components/forms";
import AppForm from "../components/forms/AppForm";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const ValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  newPassword: yup.string().required().min(4),
  confirmPassword:yup.string()
  .required()
  .oneOf([yup.ref("newPassword"), null])
  .label("Confirm Password"),
});

export default function ForgetPasswordScreen({navigation}) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    Alert.alert("Password Udpated Sucessfully","Password Update",[
      {
        text:"OK",
        onPress:()=> navigation.navigate("LoginScreen")
      }
    ])
  };
  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      <AppForm
        initialValues={{ email: "", newPassword: "", confirmPassword:"" }}
        onSubmit={handleSubmit}
        validationSchema={ValidationSchema}
      >
        <ErrorMessages
          error="Invalid Email and/or Password!"
          visible={loginFailed}
        />
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
          name="newPassword"
          placeholder="New Password"
          secureTextEntry
          textContentType="password"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder="Confirm Password"
          textContentType="password"
        />
        <SubmitButton title="Update Password" />
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
