import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import Buttons from "../components/AppButton";
import colors from "../config/colors";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.background}
      source={require("../assets/motorcycle_bg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo-red.png")} />
        {/* <Text style={styles.tagLine}>See what you want to sell</Text> */}
        <Buttons
          title="Click Here for a Quick Quote"
          color=""
          style={{
            fontSize: 15,
            color: colors.grey,
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("QuickQuote")}
        />
      </View>
      <View style={styles.butonsContainer}>
        <Buttons title="Login" onPress={() => navigation.navigate("Login")} />
        <Buttons
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  butonsContainer: {
    padding: 10,
    width: "100%",
  },
  logoContainer: {
    top: "5%",
    position: "absolute",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
  },
  tagLine: {
    fontWeight: "600",
    fontSize: 25,
    paddingVertical: 10,
  },
});
export default WelcomeScreen;
