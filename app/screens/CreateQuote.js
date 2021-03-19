import React, { useState } from "react";
// import { Picker } from "@react-native-community/picker";
import { View, StyleSheet, KeyboardAvoidingView, Switch } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../components/Screen";
import { AppFormField, SubmitButton } from "../components/forms";
import AppForm from "../components/forms/AppForm";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";
import defaultStyles from "../config/styles";
import * as Yup from "yup";
import AppText from "../components/AppText";
import policyApi from "../api/policy";
import useApi from "../hooks/useApi";
import CustomPicker from "../components/CustomPicker";
import CustomSwitch from "../components/CustomSwitch";
import CustomSwitchSelector from "../components/CustomSwitchSelector";
import CustomCalendarPicker from "../components/CustomCalenderPicker";

const type = [
  { value: "2", label: "2 Wheel", id: 1 },
  { value: "4", label: "4 Wheel", id: 2 },
];

const limit = [
  { value: "5000", label: "\u20B9" + "5000", id: 1 },
  { value: "10000", label: "\u20B9" + "10000", id: 2 },
];

const year = [
  { value: "2000", label: "2000", id: 1 },
  { value: "2001", label: "2001", id: 2 },
  { value: "2002", label: "2002", id: 3 },
];

const validationSchema = Yup.object().shape({
  dob: Yup.string().required(),
  policy: Yup.object().shape({
    partOfRiderClub: Yup.string().required().label("Student"),
    areYouStudent: Yup.string().required().label("Rider"),
    risk: Yup.object().shape({
      limit: Yup.string().required().label("Coverage Limit"),
      vehicleType: Yup.string().required().label("Vehicle Type"),
      make: Yup.string().required().label("Vehicle Make"),
      model: Yup.string().required().label("Vehicle Model"),
      year: Yup.number().required().label("Vehicle Year"),
      color: Yup.string().required().label("Vehicle Color"),
      chacisNo: Yup.string().required().label("Chacis Number"),
    }),
  }),
});

function CreateQuote({ navigation }) {
  const quoteApi = useApi(policyApi.quotePreview);

  const handleSubmit = async (quoteDetails) => {
    console.log(quoteDetails);
    const result = await quoteApi.request(quoteDetails);
    //console.log(result);
    if (!result.ok) {
      if (result.data) {
        setError(result.data);
      } else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    navigation.navigate("Login");
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView>
        <ScrollView>
          <AppForm
            initialValues={{
              dob: "",
              policy: {
                areYouStudent: 0,
                partOfRiderClub: 0,
                risk: {
                  limit: "",
                  vehicleType: "",
                  make: "",
                  model: "",
                  year: "",
                  color: "",
                  chacisNo: "",
                },
              },
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Type
              </AppText>
              <CustomSwitchSelector
                options={type}
                name="policy.risk.vehicleType"
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Make
              </AppText>
              <AppFormField
                placeholder="Vehicle Make"
                name="policy.risk.make"
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Model
              </AppText>
              <AppFormField
                placeholder="Vehicle Model"
                name="policy.risk.model"
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Year
              </AppText>
              <CustomPicker
                placeholder="Year"
                items={year}
                name={"policy.risk.year"}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Color
              </AppText>
              <AppFormField
                placeholder="Vehicle Color"
                name="policy.risk.color"
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Chacis Number
              </AppText>
              <AppFormField
                placeholder="Chacis Number"
                name="policy.risk.chacisNo"
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Coverage Limit
              </AppText>
              <CustomSwitchSelector name="policy.risk.limit" options={limit} />
            </View>
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Date of Birth
              </AppText>

              <CustomCalendarPicker name="dob" placeholder="dd/mm/yyyy" />
            </View>
            {/* <CustomDateTimePicker name="dob" placeholder="Date of Birth" /> */}
            <View
              style={{
                marginVertical: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Are you a Student ?
              </AppText>
              <CustomSwitch name="policy.areYouStudent" />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Are you part of rider club ?
              </AppText>
              <CustomSwitch name="policy.partOfRiderClub" />
            </View>
            <SubmitButton title="Check Premium" />
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
  switchSelector: {
    padding: 10,
    color: defaultStyles.colors.primary,
  },
  dropDownItemStyle: {
    justifyContent: "flex-start",
    fontSize: 10,
    padding: 5,
    borderRadius: 49,
    textTransform: "capitalize",
  },
  dropDownContainerStyle: {
    backgroundColor: defaultStyles.colors.light,
    fontSize: 30,
    height: "5%",
  },
  dropDownStyle: {
    width: "100%",
    backgroundColor: defaultStyles.colors.light,
    borderColor: defaultStyles.colors.medium,
    borderWidth: 1,
    borderStyle: "solid",
  },
});

export default CreateQuote;
