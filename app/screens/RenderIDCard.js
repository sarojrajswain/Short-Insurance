import React, { Component } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import HTML from "react-native-render-html";
import { Asset } from "expo-asset";
import AppButton from "../components/AppButton";
import GenerateID from "../components/IDCard";

const required = Asset.fromModule(require("../assets/IDCard.jpg"));

const html = `
      <div class="wrapper">
        <div class="flex-container">
          <div class="box two">
              <div class="innerone">Effective Date : 01/01/2010</div>
              <!-- <div class="middlePart"></div> -->
              <div class="innertwo">Expiration Date : 01/01/2021</div>
          </div>
          <div class="box one">
              <div class="innerone">PolicyNumber : POL0001</div>
              <!-- <div class="middlePart"></div> -->
              <div class="innertwo">Valid Throgh : 01/01/2021</div>
          </div>
          <div class="box three">
              <div class="innerone">Insured : Saroj Raj Swain</div>
              <!-- <div class="middlePart"></div> -->
              <div class="innertwo">Insured : Saroj Raj Swain</div>
          </div>
        </div>`;

export default function Demo() {
  const contentWidth = useWindowDimensions().width;

  const { generateIDCard } = GenerateID();
  const classesStyles = {
    author: {
      color: "#CA43AC",
    },
    div: {
      position: "relative",
      backgroundColor: "red",
      height: "100%",
    },
    wrapper: {
      width: "100%",
      height: "100%",
      // margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
    },

    // flex-container {
    //     height: 40%,
    //     text-align: center,
    //     display: flex,
    //     flex-direction: column,
    //     flex-wrap: wrap,
    //     justify-content: center,
    //     border-radius: 25px,
    //     padding: 20px,
    //     background-color: rgb(248, 247, 247),
    //     width: "100%",
    //     border-radius: 25px,
    //     border-style: dotted,
    //   }
    // .box{
    //     height: 100px,
    //     display: flex,
    //     flex:1,
    //     justify-content: space-evenly,
    //     align-items: center,
    // }
    // .one{
    //     background:red,
    // }
    // .middlePart{
    //     width:.33.33%,
    //     height: "100%",
    //     background-color: gray,
    // }
    // .innerone{
    //     padding-right: 5px,
    //     width: 50%,
    // }
    // .innertwo{
    //     width: 50%,
    // }
    // .two{
    //     background-color: green,
    // }
    // .three{
    //     background-color: yellow,
    // }
  };

  const tagsStyles = {
    h1: {
      color: "#6728C7",
      textAlign: "center",
      marginBottom: 10,
    },
    img: {
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 20,
    },

    html,
    body: {
      position: "relative",
      background: "white",
      height: "100%",
    },
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <HTML
        source={{ html: html }}
        contentWidth={contentWidth}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
      />
      <AppButton title="click" onPress={() => generateIDCard()} />
    </ScrollView>
  );
}
