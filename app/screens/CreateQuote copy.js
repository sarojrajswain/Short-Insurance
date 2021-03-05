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
//import { Switch } from "react-native-switch";
import SwitchSelector from "react-native-switch-selector";
import AppText from "../components/AppText";
import policyApi from "../api/policy";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import { Formik } from "formik";

const make = {
  currencies: [
    { country: "UK", value: "GBP", label: "Pound", id: 1 },
    { country: "EU", value: "EUR", label: "Euro", id: 2 },
    { country: "USA", value: "USD", label: "USD Dollar", id: 3 },
  ],
  currentLabel: "Select your currency",
  currency: "",
};

const model = {
  currencies: [
    { country: "UK", value: "GBP", label: "Pound", id: 1 },
    { country: "EU", value: "EUR", label: "Euro", id: 2 },
    { country: "USA", value: "USD", label: "USD Dollar", id: 3 },
  ],
  currentLabel: "Select your currency",
  currency: "",
};

const year = {
  currencies: [
    { country: "UK", value: "GBP", label: "Pound", id: 1 },
    { country: "EU", value: "EUR", label: "Euro", id: 2 },
    { country: "USA", value: "USD", label: "USD Dollar", id: 3 },
  ],
  currentLabel: "Select your currency",
  currency: "",
};

const validationSchema = Yup.object().shape({
  //vehicleType: Yup.string().required().label("Vehicle Type"),
  "policy.risk.make": Yup.string().required().label("Vehicle Make"),
  // vehicleModel: Yup.string().required().label("Vehicle Model"),
  // vehicleYear: Yup.string().required().label("Vehicle Year"),
  // coverageLimit: Yup.string().required().label("Coverage Limit"),
  // student: Yup.string().required().label("Student"),
  // rider: Yup.string().required().label("Rider"),
});

function CreateQuote({ navigation }) {
  const [vehicleType, setVehicleType] = useState("4");
  // const [country, setCountry] = useState("uk");
  // const [isEnabled, setIsEnabled] = useState(false);
  const rupeeSymbol = "\u20B9";
  const quoteApi = useApi(policyApi.quotePreview);
  const [error, setError] = useState();

  const handleSubmit = async (quoteDetails) => {
    const result = await quoteApi.request(quoteDetails);
    console.log(result);
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
              vType: "",
              vehicleType: "4",
              policy: {
                limit: "5000",
                areYouStudent: "false",
                riderClub: "false",
                risk: {
                  //vehicleType: "4",
                  make: "",
                  model: "",
                  year: "",
                  color: "",
                  chacisNo: "",
                },
              },
            }}
            onSubmit={handleSubmit}
            //validationSchema={validationSchema}
          >
            {/* <DropDownPicker
              placeholder="Select Vehicle Type"
              name="vehicleType"
              items={[
                { label: "Two Wheel", value: "2W" },
                { label: "Four Wheel", value: "4W" },
              ]}
              labelStyle={{
                fontSize: 16,
                textAlign: "left",
                color: "#000",
                textTransform: "capitalize",
              }}
              itemStyle={styles.dropDownItemStyle}
              defaultValue=""
              onChangeItem={(item) => setCountry(item.value)}
              containerStyle={styles.dropDownContainerStyle}
              style={styles.dropDownStyle}
              dropDownStyle={styles.dropDownStyle}
            /> */}
            {/* <Picker
              selectedValue="java"
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }
            >
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker> */}

            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Type
              </AppText>
              <SwitchSelector
                name="vehicleType"
                style={styles.switchSelector}
                height={60}
                width={"50%"}
                initial={1}
                onPress={(value) => {
                  setVehicleType(value);
                  console.log(value);
                }}
                textColor={defaultStyles.colors.medium} //'#7a44cf'
                selectedColor={defaultStyles.colors.light}
                buttonColor={defaultStyles.colors.secondary}
                options={[
                  { label: "Two Wheel", value: "2" }, //images.feminino = require('./path_to/assets/img/feminino.png')
                  { label: "Four Wheel", value: "4" }, //images.masculino = require('./path_to/assets/img/masculino.png')
                ]}
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
              <AppFormField
                placeholder="Vehicle Year"
                name="policy.risk.year"
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
              <SwitchSelector
                name="policy.limit"
                style={styles.switchSelector}
                style={{ paddingVertical: 10 }}
                height={60}
                initial={0}
                onPress={(value) => console.log(value)}
                textColor={defaultStyles.colors.medium} //'#7a44cf'
                selectedColor={defaultStyles.colors.light}
                buttonColor={defaultStyles.colors.secondary}
                borderColor={"purple"}
                options={[
                  { label: rupeeSymbol + "5,000", value: "5k" }, //images.masculino = require('./path_to/assets/img/masculino.png')
                  { label: rupeeSymbol + "10,000", value: "10k" },
                ]}
              />
            </View>

            <View style={""}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Are you a Student ?
              </AppText>
              <SwitchSelector
                name="policy.areYouStudent"
                style={{ paddingVertical: 10 }}
                height={60}
                width="50%"
                initial={1}
                onPress={(value) => console.log(value)}
                textColor={defaultStyles.colors.medium} //'#7a44cf'
                selectedColor={defaultStyles.colors.light}
                buttonColor={defaultStyles.colors.secondary}
                borderColor={"purple"}
                options={[
                  { label: "Yes", value: "True" }, //images.feminino = require('./path_to/assets/img/feminino.png')
                  { label: "No", value: "False" }, //images.masculino = require('./path_to/assets/img/masculino.png')
                ]}
              />
            </View>
            <View style={""}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Are you part of Rider Club ?
              </AppText>
              <SwitchSelector
                name="policy.riderClub"
                style={{ paddingVertical: 10 }}
                initial={1}
                height={60}
                onPress={(value) => console.log(value)}
                textColor={defaultStyles.colors.medium} //'#7a44cf'
                selectedColor={defaultStyles.colors.light}
                buttonColor={defaultStyles.colors.green}
                borderColor={"purple"}
                options={[
                  { label: "Yes", value: "True" }, //images.feminino = require('./path_to/assets/img/feminino.png')
                  { label: "No", value: "False" }, //images.masculino = require('./path_to/assets/img/masculino.png')
                ]}
              />
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
