import React, { useState } from "react";
import { StyleSheet, Image, Alert } from "react-native";
import * as yup from "yup";

import Screen from "../components/Screen";
import { ErrorMessages, AppFormField, SubmitButton } from "../components/forms";
import AppForm from "../components/forms/AppForm";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";

const ValidationSchema = yup.object().shape({
  oldPassword: yup.string().required().min(4),
  newPassword: yup.string().required().min(4),
  confirmPassword:yup.string()
  .required()
  .oneOf([yup.ref("newPassword"), null])
  .label("Confirm Password"),
});

export default function ChangePassword({navigation}) {
  const auth = useAuth();
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    Alert.alert("Password Udpated Sucessfully","Password Update",[
        {
          text:"OK",
          onPress:()=> navigation.navigate("Account")
        }
      ])
  };
  return `<html>
          <body>
              <div style="display: flex; flex-wrap: wrap; flex-direction: column;">
                  <div>
                      Your ID Cards<br />
                      keep your id with you all the time.
                      keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.
                      keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.
                      keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.
                  </div>
                  <div style="flex: 1; align-self:center ;">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" style="width:200;height: 200;" />
                  </div>
                  <div style="display: flex;justify-content: space-around;">
                      <div style="margin: 0;">
                          <h2>NAME : SAROJ RAJ SWAIN</h2>
                          <h2>ADDRESS : 2521 FOREST HAVEN BLVD</h2>
                          <h2 style="padding-left: 30%;"> EDISON, NJ - 08817</h2>
                      </div>
                      <div>
                          <h2>POLICYNUMBER : POLDCDDG76767</h2>
                          <h2>NAME : SAROJ RAJ SWAIN</h2>
                          <h2>NAME : SAROJ RAJ SWAIN</h2>
                          <h2>NAME : SAROJ RAJ SWAIN</h2>
                      </div>
                  </div>
              </div>
              <br />        
          </body>
      </html>`;
  // <Screen style={styles.container}>
  //   <Image source={require("../assets/logo-red.png")} style={styles.logo} />
  //   <AppForm
  //     initialValues={{ oldPassword: "", newPassword: "", confirmPassword:"" }}
  //     onSubmit={handleSubmit}
  //     validationSchema={ValidationSchema}
  //   >
  //     <ErrorMessages
  //       error="Invalid Email and/or Password!"
  //       visible={loginFailed}
  //     />
  //     <AppFormField
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       icon="lock"
  //       name="oldPassword"
  //       placeholder="Old Password"
  //       secureTextEntry
  //       textContentType="password"
  //     />
  //     <AppFormField
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       icon="lock"
  //       name="newPassword"
  //       placeholder="New Password"
  //       secureTextEntry
  //       textContentType="password"
  //     />
  //     <AppFormField
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //       icon="lock"
  //       name="confirmPassword"
  //       placeholder="Confirm Password"
  //       textContentType="password"
  //     />
  //     <SubmitButton title="Update Password" />
  //   </AppForm>
  // </Screen>
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
