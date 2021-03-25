import React, { useState } from "react";
// import { Picker } from "@react-native-community/picker";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Switch,
  Modal,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Screen from "../components/Screen";
import { ErrorMessages, AppFormField, SubmitButton } from "../components/forms";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomCalendarPicker from "../components/CustomCalenderPicker";
import { ceil } from "lodash";
import colors from "../config/colors";

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
  { value: "2003", label: "2003", id: 4 },
  { value: "2004", label: "2004", id: 5 },
  { value: "2005", label: "2005", id: 6 },
  { value: "2006", label: "2006", id: 7 },
  { value: "2007", label: "2007", id: 8 },
  { value: "2008", label: "2008", id: 9 },
  { value: "2009", label: "2009", id: 10 },
  { value: "2010", label: "2010", id: 11 },
  { value: "2011", label: "2011", id: 12 },
  { value: "2012", label: "2012", id: 13 },
  { value: "2013", label: "2013", id: 14 },
  { value: "2014", label: "2014", id: 15 },
  { value: "2015", label: "2015", id: 16 },
  { value: "2016", label: "2016", id: 17 },
  { value: "2017", label: "2017", id: 18 },
  { value: "2018", label: "2018", id: 19 },
  { value: "2019", label: "2019", id: 20 },
  { value: "2020", label: "2020", id: 21 },
  { value: "2021", label: "2020", id: 22 },
];

const validationSchema = Yup.object().shape({
  policy: Yup.object().shape({
    limit: Yup.string().required().label("Coverage Limit"),
    areYouPartOfRiderClub: Yup.string().required().label("Student"),
    areYouStudent: Yup.string().required().label("Rider"),
    risk: Yup.object().shape({
      vehicleType: Yup.string().required().label("Vehicle Type"),
      make: Yup.string().required().label("Vehicle Make"),
      model: Yup.string().required().label("Vehicle Model"),
      year: Yup.number().required().label("Vehicle Year"),
    }),
  }),
});

function QuickQuote({ navigation }) {
  const quoteApi = useApi(policyApi.quotePreview);
  const [error, setError] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    setIsModalVisible(true);
    //navigation.navigate("Login");
  };

  return (
    <>
      <Screen style={styles.container}>
        <KeyboardAwareScrollView>
          <ScrollView>
            <AppForm
              initialValues={{
                policy: {
                  limit: "",
                  areYouStudent: 0,
                  areYouPartOfRiderClub: 0,
                  risk: {
                    vehicleType: "",
                    make: "",
                    model: "",
                    year: "",
                  },
                },
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessages error={error} visible={error} />
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
                  returnKeyType={"next"}
                  onSubmitEditing={() => {
                    console.log(this);
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
                />
              </View>
              <View style={{ flexDirection: "column" }}>
                <AppText style={{ color: defaultStyles.colors.dark }}>
                  Vehicle Year
                </AppText>
                <CustomPicker
                  placeholder="Select Year"
                  items={year}
                  name={"policy.risk.year"}
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
                <CustomSwitch name="policy.areYouPartOfRiderClub" />
              </View>
              <SubmitButton title="Check Premium" />
              <Modal
                visible={isModalVisible}
                transparent={true}
                animationType={"slide"}
              >
                <View style={styles.modal}>
                  <View style={styles.innerModal}>
                    <View style={styles.pickerButtons}>
                      <Button
                        onPress={() => setIsModalVisible(false)}
                        title="close"
                      />
                      {/* <Button
                          onPress={() => {
                            setIsModalVisible(false);
                          }}
                          title="ok"
                        /> */}
                    </View>
                    <View
                      style={{
                        padding: 20,
                        flex: 1,
                        justifyContent: "flex-end",
                        alignItems: "flex-end",
                      }}
                    >
                      <MaterialCommunityIcons
                        name="looks"
                        size={200}
                        style={{ alignSelf: "center" }}
                        color={colors.tomato}
                      />

                      <AppText>Your Estimated Premium is 100 INR</AppText>
                      <View style={styles.modalButton}>
                        <Button
                          onPress={() => {
                            setIsModalVisible(false);
                            navigation.navigate("Register");
                          }}
                          title="Click here"
                        ></Button>
                        <AppText>if you want to proceed!</AppText>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  innerModal: {
    borderRadius: 10,
    backgroundColor: "#ffffff",
    //marginTop: 300,
    //marginBottom: 300,
    height: 250,
    justifyContent: "center",
  },
  modalButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerButtons: {
    justifyContent: "space-between",
    flexDirection: "row",
    //alignItems: "center",
    //backgroundColor: "#eee",
  },
});

export default QuickQuote;
