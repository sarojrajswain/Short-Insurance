import React, {useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Switch } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../components/Screen";
import {ErrorMessages, AppFormField, SubmitButton } from "../components/forms";
import AppForm from "../components/forms/AppForm";
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
import CustomCheckBox from '../components/CustomCheckBox';
import useAuth from "../auth/useAuth";
import accountsApi from "../api/account";
import ActivityIndicator from "../components/ActivityIndicator";
import AppButton from "../components/AppButton";
import policy from "../api/policy";

const type = [
  { value: "2W", label: "2 Wheel", id: 1 },
  { value: "4W", label: "4 Wheel", id: 2 },
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
  policy: Yup.object().shape({
    effectiveDate:Yup.string().required().label("Effective Date"),
    expirationDate:Yup.string().required().label("Expiration Date"),
    limit: Yup.string().required().label("Coverage Limit"),    
    acceptTerms: Yup.bool().oneOf([true], "You Must Accept Terms & Conditions"),
    risk: Yup.object().shape({
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
  const quoteApi = useApi(policyApi.createQuote);
  const updateQuoteApi = useApi(policyApi.updateQuote);
  const getQuoteApi = useApi(policyApi.getQuote);

  const { user } = useAuth();
  const getAccountApi = useApi(accountsApi.getAccount);
  
  const [error, setError] = useState();

  const policyNumber = "POL-001232";

  const today = new Date();

  const currentDate = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();
  
  const inputs = {};
  const focusNextField = (id)=>{
    console.log(inputs);
    inputs[id].focus();
  }
  
  useEffect(() => {
    getAccountApi.request(user.email);
    getQuoteApi.request(policyNumber);
  }, []);

  const handleSubmit = async (quoteDetails) => {
    console.log(quoteDetails);
    quoteDetails.accountId=getAccountApi.data._id,
    
    quoteDetails.policy.policyNumber=policyNumber;
    quoteDetails.policy.premium=3222.22;
    quoteDetails.policy.risk.premium=3222.22;
    
    const result = getQuoteApi.data ? await updateQuoteApi.request(policyNumber, quoteDetails) : await quoteApi.request(quoteDetails);
    // const result = await quoteApi.request(quoteDetails);
    // const result = await updateQuoteApi.request(policyNumber, quoteDetails);
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
    navigation.navigate("Policy");
  };
  
  return (
    <>
    <ActivityIndicator visible={getQuoteApi.loading} />
      {getQuoteApi.error && (
        <>
          <AppText>Couldn't find details for the </AppText>
          <AppButton title="Retry" onPress={getQuoteApi.request} />
        </>
      )}
    <Screen style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView>
          <AppForm
            initialValues={{
              accountId:getQuoteApi.data ? getQuoteApi.data.accountId : "",
              policy: {
                acceptTerms:false,
                effectiveDate: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.effectiveDate : currentDate,
                expirationDate: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.expirationDate : currentDate,
                policyNumber: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.policyNumber : "",
                areYouStudent: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.areYouStudent : true,
                partOfRiderClub: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.partOfRiderClub : true,
                premium: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.premium : 0,
                limit:getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.limit : 5000,
                risk: {
                  vehicleType: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.vehicleType : "4W",
                  make: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.make : "",
                  model: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.model : "",
                  year: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.year : "",
                  color: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.color : "",
                  chacisNo: getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.chacisNo : "",
                  premium:getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.risk.premium : 0,
                },
              },
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <ErrorMessages error={error} visible={error} />
            <AppText name="policy.policyNumber" style={styles.policyHeader}>POL-001-0034</AppText>
            <View>
                <AppText style={{ color: defaultStyles.colors.dark }}>
                 Effective Date
                </AppText>
                <CustomCalendarPicker
                  placeholder="Effective Date (DD/MM/YYYY)"
                  name="policy.effectiveDate"
                  defaultValue={
                    getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.effectiveDate : currentDate
                  }
                />
            </View>
            <View>
                <AppText style={{ color: defaultStyles.colors.dark }}>
                 Expiration Date
                </AppText>
                <CustomCalendarPicker
                  placeholder="Expiration Date (DD/MM/YYYY)"
                  name="policy.expirationDate"
                  defaultValue={
                    getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.expirationDate : currentDate
                  }
                />
            </View>
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Type
              </AppText>
              <CustomSwitchSelector
                options={type}
                name="policy.risk.vehicleType"
                defaultValue={
                  getQuoteApi.data && getQuoteApi.data.policy && getQuoteApi.data.policy.risk ? getQuoteApi.data.policy.risk.vehicleType : ""
                }
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Make
              </AppText>
              <AppFormField
                placeholder="Vehicle Make"
                name="policy.risk.make"
                defaultValue={
                  getQuoteApi.data && getQuoteApi.data.policy && getQuoteApi.data.policy.risk ? getQuoteApi.data.policy.risk.make : ""
                }
                onSubmitEditing={() => {
                  focusNextField('two');
                }}
                returnKeyType={ "next" }
                ref={ input => {
                  inputs['one'] = input;
                }}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Model
              </AppText>
              <AppFormField
                placeholder="Vehicle Model"
                name="policy.risk.model"
                defaultValue={
                  getQuoteApi.data && getQuoteApi.data.policy && getQuoteApi.data.policy.risk ? getQuoteApi.data.policy.risk.model : ""
                }
                returnKeyType={ "done" }
                ref={ input => {
                  inputs['two'] = input;
                }}
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
                defaultValue={
                  getQuoteApi.data && getQuoteApi.data.policy && getQuoteApi.data.policy.risk ? getQuoteApi.data.policy.risk.year : ""
                }
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Color
              </AppText>
              <AppFormField
                placeholder="Vehicle Color"
                name="policy.risk.color"
                defaultValue={
                  getQuoteApi.data && getQuoteApi.data.policy && getQuoteApi.data.policy.risk ? getQuoteApi.data.policy.risk.color : ""
                }
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Chacis Number
              </AppText>
              <AppFormField
                placeholder="Chacis Number"
                name="policy.risk.chacisNo"
                defaultValue={
                  getQuoteApi.data && getQuoteApi.data.policy && getQuoteApi.data.policy.risk ? getQuoteApi.data.policy.risk.chacisNo : ""
                }
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Coverage Limit
              </AppText>
              <CustomSwitchSelector name="policy.limit" options={limit} />
            </View>
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
              <CustomSwitch name="policy.areYouStudent" 
              // defaultValue={
              //   getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.areYouStudent : false
              // }
              />
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
              <CustomSwitch name="policy.partOfRiderClub" 
              // defaultValue={
              //   getQuoteApi.data && getQuoteApi.data.policy ? getQuoteApi.data.policy.partOfRiderClub : false
              // }
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop:30
              }}
            >
              <CustomCheckBox name="policy.acceptTerms" />
              {/* <AppText style={{ color: defaultStyles.colors.dark }}>
                I agree the terms and conditions.
              </AppText> */}
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
  policyHeader:{
    alignSelf:"flex-end",
    marginBottom:10,
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
