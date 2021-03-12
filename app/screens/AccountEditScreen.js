import React from "react";
import { View, StyleSheet } from "react-native";
import * as Yup from "yup";
import AppTextInput from "../components/AppTextInput";
import SubmitButton from "../components/forms/SubmitButton";
import Screen from "../components/Screen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ScrollView } from "react-native-gesture-handler";
import AppForm from "../components/forms/AppForm";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import { AppFormField } from "../components/forms";
import "yup-phone";
import CustomSwitchSelector from "../components/CustomSwitchSelector";
import CustomCalendarPicker from "../components/CustomCalenderPicker";
import CustomPicker from "../components/CustomPicker";

export default function AccountEditScreen({ navigation }) {
  const handleSubmit = async (accountDetails) => {
    console.log(accountDetails);
  };

  const phoneSchema = Yup.string().phone("IN").required().label("Phone Number");

  const validationSchema = Yup.object().shape({
    account: Yup.object().shape({
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
    }),
  });

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView>
        <ScrollView>
          <AppForm
            initialValues={{
              account: {
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
              },
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                First Name
              </AppText>
              <AppFormField placeholder="First Name" name="account.firstName" />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Last Name
              </AppText>
              <AppFormField placeholder="Last Name" name="account.lastName" />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Date of Birth
              </AppText>
              <CustomCalendarPicker
                placeholder="dd/mm/yyyy"
                name="account.dateOfBirth"
              />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Gender
              </AppText>
              <CustomSwitchSelector
                placeholder="Gender"
                name="account.gender"
                options={[
                  { label: "Male", value: "M" },
                  { label: "Female", value: "F" },
                ]}
              />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Address
              </AppText>
              <AppFormField placeholder="Address" name="account.address" />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                City
              </AppText>
              <AppFormField placeholder="City" name="account.city" />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                State
              </AppText>
              <AppFormField placeholder="State" name="account.state" />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Postal Code
              </AppText>
              <AppFormField
                placeholder="Postal Code"
                name="account.postalCode"
              />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Driver License
              </AppText>
              <AppFormField
                placeholder="Driver License"
                name="account.driverLicense"
              />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Phone Number
              </AppText>
              <AppFormField placeholder="Phone Number" name="account.phoneNo" />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Email
              </AppText>
              <AppFormField placeholder="Email" name="account.email" />
            </View>
            <SubmitButton title="Save" />
          </AppForm>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    color: "red",
    padding: 10,
  },
});
