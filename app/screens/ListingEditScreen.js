import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import * as Location from "expo-location";

import {
  // AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";

import Screen from "../components/Screen";
import Form from "../components/forms/AppForm";
import AppFormPicker from "../components/forms/AppFormPicker";
import CatagoryPickerItem from "../components/CatagoryPickerItem";
import AppImagePicker from "../components/forms/AppImagePicker";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { FlatList, ScrollView } from "react-native-gesture-handler";
// import useLocation from "../hooks/useLocation";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(5, "Please upload at-least five images"),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

export default function ListingEditScreen() {
  // const location = useLocation();
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
          }}
          onSubmit={(values) => console.log("location")}
          validationSchema={validationSchema}
        >
          <AppImagePicker name="images" />
          {/* <AppText style={{ color: colors.dark }}>Vehicle Details</AppText> */}
          <FormField
            maxLength={255}
            width="100%"
            name="title"
            placeholder="Vehicle Make"
          />

          <View style={styles.column}>
            <FormField
              maxLength={255}
              width={150}
              name="title"
              placeholder="Model"
            />
            <FormField
              maxLength={255}
              width={150}
              name="title"
              placeholder="Year"
            />
          </View>
          <View style={styles.column}>
            <FormField
              keyboardType="numeric"
              maxLength={8}
              name="price"
              placeholder="Price"
              width="45%"
            />
            <FormField
              keyboardType="numeric"
              name="color"
              placeholder="Color"
              width="45%"
            />
          </View>
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="chassisNumber"
            placeholder="Chassis Number"
            width="100%"
          />
          {/* <AppFormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          placeholder="Category"
          PickerItemComponent={CatagoryPickerItem}
          width="100%"
        /> */}
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Save" />
        </Form>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  column: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
