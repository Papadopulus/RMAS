import React, { useState, useRef, useEffect, useContext } from "react";

import { View, Text, StyleSheet } from "react-native";
import { colors, parameters, title } from "../../global/styles";
import { Icon, Button, SocialIcon, Image } from "@rneui/base";
import { firebase } from "../../../firebaseConfig";
import { SignInContext } from "../../contexts/authContext";

export default function SignInWelcomeScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("USER SIGNED INNNNNNN");
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
      } else {
        console.log("USER NOOOOOT SIGNED INNNNNNN");
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: null },
        });
      }
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 3,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: -100,
        }}
      >
        <Image
          source={require("./WelcomeScreenImg.png")}
          style={{ width: 300, height: 200, borderRadius: 12 }}
        ></Image>
        <Text
          style={{
            fontSize: 50,
            color: colors.buttons,
            fontWeight: "bold",
          }}
        >
          SLIKAJ
        </Text>
        <Text
          style={{
            fontSize: 50,
            color: colors.buttons,
            fontWeight: "bold",
          }}
        >
          PRIJAVI
        </Text>
        <Text
          style={{
            fontSize: 50,
            color: colors.buttons,
            fontWeight: "bold",
          }}
        >
          REŠI
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 50 }}>
        <View style={{ marginHorizontal: 20 }}>
          <Button
            title={"Prijavi se"}
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
            onPress={() => {
              navigation.navigate("SignInScreen");
            }}
          ></Button>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 15,
          }}
        >
          <Button
            title={"Napravi nalog"}
            buttonStyle={styles.createButtonCreateAcc}
            titleStyle={styles.createButtonTitleCreateAcc}
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  createButton: {
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingHorizontal: 20,
    backgroundColor: "#795695",
    width: "auto",
  },
  createButtonTitle: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonTitleCreateAcc: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  createButtonCreateAcc: {
    backgroundColor: colors.background3,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.background2,
    height: 50,
    paddingHorizontal: 20,
    // width:'100%'
  },
});
