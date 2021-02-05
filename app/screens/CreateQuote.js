import React, { useState } from "react";
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

const validationSchema = Yup.object().shape({
  vehicleType: Yup.string().required().label("Vehicle Type"),
  vehicleMake: Yup.string().required().label("Vehicle Make"),
  vehicleModel: Yup.string().required().label("Vehicle Model"),
  vehicleYear: Yup.string().required().label("Vehicle Year"),
  purchaseYear: Yup.string().required().label("Purchase Year"),
  coverageLimit: Yup.string().required().label("Coverage Limit"),
  student: Yup.string().required().label("Student"),
  rider: Yup.string().required().label("Rider"),
});

export default function CreateQuote(props) {
  const [country, setCountry] = useState("uk");
  const [isEnabled, setIsEnabled] = useState(false);
  const rupeeSymbol = "\u20B9";

  return (
    <Screen style={styles.container}>
      <KeyboardAwareScrollView>
        <ScrollView>
          <AppForm
            initialValues={{
              vehicleType: "",
              vehicleMake: "",
              vehicleModel: "",
              vehicleYear: "",
              purchaseYear: "",
              coverageLimit: "",
              student: "",
              rider: "",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
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
            <View>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Type
              </AppText>
              <SwitchSelector
                name="vehicleType"
                style={styles.switchSelector}
                initial={0}
                onPress={(value) => console.log(value)}
                textColor={defaultStyles.colors.tomato} //'#7a44cf'
                selectedColor={"white"}
                buttonColor={"purple"}
                borderColor={"purple"}
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
              <AppFormField placeholder="Vehicle Make" name="vehicleMake" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Model
              </AppText>
              <AppFormField placeholder="Vehicle Model" name="vehicleModel" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Vehicle Year
              </AppText>
              <AppFormField placeholder="Vehicle Year" name="vehicleYear" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Purchase Year
              </AppText>
              <AppFormField placeholder="Purchase Year" name="purchaseYear" />
            </View>
            <View style={{ flexDirection: "column" }}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Coverage Limit
              </AppText>
              <SwitchSelector
                name="coverageLimit"
                style={styles.switchSelector}
                style={{ paddingVertical: 10 }}
                height={50}
                initial={0}
                onPress={(value) => console.log(value)}
                textColor={defaultStyles.colors.medium} //'#7a44cf'
                selectedColor={defaultStyles.colors.light}
                buttonColor={defaultStyles.colors.secondary}
                borderColor={"purple"}
                options={[
                  { label: rupeeSymbol + "2,500", value: "2.5k" }, //images.feminino = require('./path_to/assets/img/feminino.png')
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
                name="student"
                style={{ paddingVertical: 10 }}
                height={50}
                width="50%"
                initial={0}
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
            <View style={""}>
              <AppText style={{ color: defaultStyles.colors.dark }}>
                Are you part of Rider Club ?
              </AppText>
              <SwitchSelector
                style={{ paddingVertical: 10 }}
                initial={0}
                height={50}
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

            <Switch
              activeText={"On"}
              inActiveText={"Off"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setIsEnabled((previousState) => !previousState)
              }
              value={isEnabled}
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // style for inner animated circle for what you (may) be rendering inside the circle
            />

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
