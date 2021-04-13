import React, { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Alert, KeyboardAvoidingView } from "react-native";
import * as Yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import { AppFormField, ErrorMessages } from "../components/forms";
import "yup-phone";
import CustomSwitchSelector from "../components/CustomSwitchSelector";
import CustomCalendarPicker from "../components/CustomCalenderPicker";
import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import accountsApi from "../api/account";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import CustomDatePicker from '../components/CustomDatePicker';

export default function AccountEditScreen({ navigation }) {
  const [error, setError] = useState();
  const { user } = useAuth();

  const getAccountApi = useApi(accountsApi.getAccount);
  const saveAccountApi = useApi(accountsApi.saveAccount);
  const updateAccountApi = useApi(accountsApi.updateAccount);

  useEffect(() => {
    getAccountApi.request(user.email);
  }, []);

  const handleSubmit = async (accountDetails) => {

    console.log(accountDetails);
    
    let result=null;

    console.log(getAccountApi.data);
    result = getAccountApi.data ? await updateAccountApi.request(getAccountApi.data._id, accountDetails) : await saveAccountApi.request(accountDetails);
    
    if (!result.ok) {
      if (result.data) {
        setError(result.data.firstName);
      } else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    Alert.alert("Account info updated sucessfully!", "Message",[
      {
        "text":"OK",
        onPress:()=>navigation.navigate('Account')
      }
    ])
  };

  const phoneSchema = Yup.string().phone("IN").required().label("Phone Number");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required().label("First Name"),
    lastName: Yup.string().required().label("Last Name"),
    dateOfBirth: Yup.string().required().label("Date of Birth"),
    gender: Yup.string().required().label("Gender"),
    address: Yup.string().required().label("Address"),
    city: Yup.string().required().label("City"),
    state: Yup.string().required().label("State"),
    postalCode: Yup.number().required().label("Postal Code"),
    driverLicense: Yup.string().required().label("Driver License Number"),
    phoneNo: phoneSchema,
    email: Yup.string().required().email().label("Email Address"),
  });

  return (
    <>
      <ActivityIndicator visible={getAccountApi.loading} />
      {getAccountApi.error && (
        <>
          <AppText>Couldn't find details for the </AppText>
          <AppButton title="Retry" onPress={getAccountApi.request} />
        </>
      )}
      <Screen style={styles.container}>
        <KeyboardAvoidingView  behavior="padding">
          <ScrollView>
            <AppForm
              initialValues={{
                firstName: getAccountApi.data ? getAccountApi.data.firstName : "",
                lastName: getAccountApi.data ? getAccountApi.data.lastName : "",
                dateOfBirth: getAccountApi.data ? getAccountApi.data.dateOfBirth : "",
                gender: getAccountApi.data ? getAccountApi.data.gender : "",
                address: getAccountApi.data ? getAccountApi.data.address : "",
                city: getAccountApi.data ? getAccountApi.data.city : "",
                state: getAccountApi.data ? getAccountApi.data.state : "",
                postalCode: getAccountApi.data ? getAccountApi.data.postalCode : "",
                driverLicense: getAccountApi.data ? getAccountApi.data.driverLicense : "",
                phoneNo: getAccountApi.data ? getAccountApi.data.phoneNo : "",
                email: getAccountApi.data ? getAccountApi.data.email : "",
              }}
              onSubmit={handleSubmit}
              //validationSchema={validationSchema}
            >
              <ErrorMessages error={error} visible={error} />
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  First Name
                </AppText> */}
                <AppFormField
                  placeholder="First Name"
                  name="firstName"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.firstName : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Last Name
                </AppText> */}
                <AppFormField
                  placeholder="Last Name"
                  name="lastName"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.lastName : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Date of Birth
                </AppText> */}
                <CustomCalendarPicker
                  placeholder="Date of Birth (DD/MM/YYYY)"
                  name="dateOfBirth"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.dateOfBirth : "01/01/2020"
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Gender
                </AppText> */}
                <CustomSwitchSelector
                  placeholder="Gender"
                  name="gender"
                  options={[
                    { label: "Male", value: "M" },
                    { label: "Female", value: "F" },
                  ]}
                  defaultValue={()=> console.log('hi'),
                    getAccountApi.data ? getAccountApi.data.gender : "M"
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Address
                </AppText> */}
                <AppFormField
                  placeholder="Address"
                  name="address"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.address : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  City
                </AppText> */}
                <AppFormField
                  placeholder="City"
                  name="city"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.city : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  State
                </AppText> */}
                <AppFormField
                  placeholder="State"
                  name="state"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.state : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Postal Code
                </AppText> */}
                <AppFormField
                  keyboardType="numeric"
                  placeholder="Postal Code"
                  name="postalCode"
                  defaultValue={
                    getAccountApi.data ? String(getAccountApi.data.postalCode) : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Driver License
                </AppText> */}
                <AppFormField
                  placeholder="Driver License"
                  name="driverLicense"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.driverLicense : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Phone Number
                </AppText> */}
                <AppFormField
                  keyboardType="numeric"
                  placeholder="Phone Number"
                  name="phoneNo"
                  defaultValue={
                    getAccountApi.data ? String(getAccountApi.data.phoneNo) : ""
                  }
                />
              </View>
              <View>
                {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                  Email
                </AppText> */}
                <AppFormField
                  placeholder="Email"
                  name="email"
                  defaultValue={user.email}
                />
              </View>
              <SubmitButton title="Save" />
            </AppForm>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    color: "red",
    padding: 10,
  },
});
