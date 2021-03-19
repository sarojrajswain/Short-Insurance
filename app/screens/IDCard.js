import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

export default function GenerateID() {
  const name = "Saroj Raj swain";

  //  const manipResult = await ImageManipulator.manipulateAsync(localURI, [], { base64: true });

  async function execute() {
    // <html>
    //   <header>
    //     <title>welcome</title>
    //   </header>
    //   <body>

    //   </body>
    // </html>
    const html = `<html>
                    <body>
                        <div style="display: flex; flex-wrap: wrap; flex-direction: column;">
                            <div>
                                Your ID Cards<br />
                                keep your id with you all the time.
                                keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.
                                keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.
                                keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.keep your id with you all the time.
                            </div>
                            <div style="flex: 1; align-self:center ;">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" style="width:200;height: 200;" />
                            </div>
                            <div style="display: flex;justify-content: space-around;">
                                <div style="margin: 0;">
                                    <h2>NAME : SAROJ RAJ SWAIN</h2>
                                    <h2>ADDRESS : 2521 FOREST HAVEN BLVD</h2>
                                    <h2 style="padding-left: 30%;"> EDISON, NJ - 08817</h2>
                                </div>
                                <div>
                                    <h2>POLICYNUMBER : POLDCDDG76767</h2>
                                    <h2>NAME : SAROJ RAJ SWAIN</h2>
                                    <h2>NAME : SAROJ RAJ SWAIN</h2>
                                    <h2>NAME : SAROJ RAJ SWAIN</h2>
                                </div>
                            </div>
                        </div>
                        <br />        
                    </body>
                </html>`;
    const { uri } = await Print.printToFileAsync({ html });
    //uri;
    Sharing.shareAsync(uri, { dialogTitle: "here is your pdf!" });

    // if (Platform.OS === "ios") {
    //   await Sharing.shareAsync(uri);
    // } else {
    //   const permission = await MediaLibrary.requestPermissionsAsync();

    //   if (permission.granted) {
    //     await MediaLibrary.createAssetAsync(uri);
    //   }
    // }
  }
  return { execute };
  // return (
  //   <View style={styles.container}>
  //     <Button title="Print and Share" onPress={() => execute()} />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
