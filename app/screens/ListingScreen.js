import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet ,Alert} from "react-native";
import Card from "../components/Card";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";
import policyApi from "../api/policy";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import AppText from "../components/AppText";
import {useIsFocused} from '@react-navigation/native';

const listings = [
  {
    id: 1,
    policyNumber: "XYZ4344KHM",
    effectiveDate: "2020-01-01",
    expiryDate: "2020-30-12",
    vehicleDetail: "Honda Activa, 2015",
    image: require("../assets/Honda-Activa.jpg"),
    year: 2015,
  },
  {
    id: 2,
    policyNumber: "XYZ4344KHM",
    effectiveDate: "2020-01-01",
    expiryDate: "2020-30-12",
    vehicleDetail: "HeroHonda CBZ, 2019",
    image: require("../assets/hero-honda-cbz.jpg"),
    year: 2019,
  },
];
export default function ListingScreen({ navigation }) {
  const getAllQuoteApi = useApi(policyApi.getAllQuote);
  const isFocused = useIsFocused();

  useEffect(() => {
    
      getAllQuoteApi.request();;
    
  }, [isFocused]);

  const test = () =>  {
    console.log(getAllQuoteApi.data);
  };;
  return (
    <>
      {(getAllQuoteApi && getAllQuoteApi.data.length === 0) ? (
        <>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:'50%',flexDirection:'row',flexWrap:'wrap'}}>
          <AppText>No policy associated with your account.</AppText>
            {/*  */}
              <Button title="click here" onPress={() =>  navigation.navigate(routes.QUOTE_DETAILS)}/><AppText> to buy a new policy !</AppText>
            {/* </View> */}
          </View>
          </View>
        </>
      ): (
        <Screen style={styles.screen}>
          <FlatList
            style={styles.flatList}
            data={getAllQuoteApi.data}
            keyExtractor={(policy) =>  policy._id}
            renderItem={({ item }) => (
              <Card
                title={item.policy.policyNumber}
                subTitle={item.policy.risk.make + ' ' + item.policy.risk.model}
                imageSource={require("../assets/Honda-Activa.jpg")}
                onPress={() => navigation.navigate(routes.QUOTE_DETAILS, item)}
              />
            )}
          />
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    paddingTop: '50%',
    padding:20,
  },
  flatList: {
    height: "100%",
  },
  card:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    
  }
});
