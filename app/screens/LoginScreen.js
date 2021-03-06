import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import * as yup from "yup";

import Screen from "../components/Screen";
import { ErrorMessages, AppFormField, SubmitButton } from "../components/forms";
import AppForm from "../components/forms/AppForm";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import Buttons from "../components/AppButton";
import colors from "../config/colors";

const ValidationSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(4),
});

export default function LoginScreen({ navigation }) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    console.log(result);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data);
  };
  return (
    <Screen style={styles.container}>
      <Image source={require("../assets/logo-red.png")} style={styles.logo} />
      <AppForm
        initialValues={{ email: "", password: "" }}
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
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Login" />
        <Buttons
          title="Forget Password"
          color=""
          style={{
            fontSize: 15,
            color: colors.medium,
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("ForgetPassword")}
        />
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
