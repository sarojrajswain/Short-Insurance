import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
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

export default function AccountEditScreen({ navigation }) {
  const [error, setError] = useState();
  const { user } = useAuth();

  const getAccountApi = useApi(accountsApi.getAccount);
  const saveAccountApi = useApi(accountsApi.saveAccount);

  useEffect(() => {
    getAccountApi.request(user.email);
  }, []);

  const handleSubmit = async (accountDetails) => {
    console.log(getAccountApi.data);
    // console.log(accountDetails);
    // const result = await saveAccountApi.request(accountDetails);

    // if (!result.ok) {
    //   if (result.data) {
    //     setError(result.data);
    //   } else {
    //     setError("An unexpected error occurred.");
    //     console.log(result);
    //   }
    //   return;
    // }
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
        <KeyboardAwareScrollView>
          <ScrollView>
            <AppForm
              initialValues={{
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                gender: "",
                address: "",
                city: "",
                state: "",
                postalCode: "",
                driverLicense: "",
                phoneNo: "",
                email: "",
              }}
              onSubmit={handleSubmit}
              //      validationSchema={validationSchema}
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
                    getAccountApi.data ? getAccountApi.data.dateOfBirth : ""
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
                  placeholder="Postal Code"
                  name="postalCode"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.city : ""
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
                  placeholder="Phone Number"
                  name="phoneNo"
                  defaultValue={
                    getAccountApi.data ? getAccountApi.data.phoneNo : ""
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
        </KeyboardAwareScrollView>
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
