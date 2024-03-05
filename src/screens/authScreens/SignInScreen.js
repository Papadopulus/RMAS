import React, { useState, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { colors, parameters, title } from "../../global/styles";
import { Icon, Button, SocialIcon } from "@rneui/base";
import Header from "../../components/Header";
import * as Animatable from "react-native-animatable";
import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../../../firebaseConfig";
import { SignInContext } from "../../contexts/authContext";

export default function SignInScreen({ navigation }) {
  const { dispatchSignedIn } = useContext(SignInContext);
  const [textInputFocused, settextInputFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const textInput1 = useRef(1);
  const textInput2 = useRef(2);

  async function signIn(data) {
    try {
      const { password, email } = data;
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (user) {
        dispatchSignedIn({
          type: "UPDATE_SIGN_IN",
          payload: { userToken: "signed-in" },
        });
      }
    } catch (error) {
      Alert.alert(error.name, error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Header title={""} type={"arrow-left"} navigation={navigation} />
      {/* <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={styles.title}>Sign In</Text>
      </View> */}
      {/* <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={styles.text1}>Please enter the email and password</Text>
        <Text style={styles.text1}>registerd with your account!</Text>
      </View> */}

      <View style={{ flex: 2, justifyContent: "center" }}>
        <View style={{ alignItems: "center", marginTop: -30 }}>
          <Text style={styles.title}>Prijavi se</Text>
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            signIn(values);
          }}
        >
          {(props) => (
            <View>
              <View style={{ marginTop: 50 }}>
                <View style={styles.textInput1}>
                  <Icon
                    name="account-circle"
                    type="material"
                    iconStyle={{ color: colors.grey1, marginRight: 8 }}
                  ></Icon>
                  <TextInput
                    placeholder="Email"
                    ref={textInput1}
                    style={{ width: "90%" }}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                  ></TextInput>
                </View>
                <View style={styles.textInput2}>
                  <Icon
                    name="lock"
                    iconStyle={{ color: colors.grey1 }}
                    type="material"
                  ></Icon>
                  <TextInput
                    placeholder="Password"
                    style={{ width: "80%" }}
                    ref={textInput2}
                    onFocus={() => {
                      settextInputFocused(false);
                    }}
                    onBlur={() => {
                      settextInputFocused(true);
                    }}
                    onChangeText={props.handleChange("password")}
                    value={props.values.password}
                    secureTextEntry={!showPassword}
                  ></TextInput>
                  <Animatable.View
                    animation={textInputFocused ? "" : "fadeInLeft"}
                    duration={400}
                  >
                    <Icon
                      name={showPassword ? "visibility" : "visibility-off"}
                      iconStyle={{ color: colors.grey1 }}
                      type="material"
                      onPress={() => setShowPassword(!showPassword)}
                    ></Icon>
                  </Animatable.View>
                </View>
              </View>
              <View style={{ marginHorizontal: 20, marginVertical: 35 }}>
                <Button
                  title={"Prijavi se"}
                  buttonStyle={parameters.styledButton}
                  titleStyle={parameters.buttonTitle}
                  onPress={props.handleSubmit}
                  color={colors.buttons}
                ></Button>
              </View>
            </View>
          )}
        </Formik>

        <View style={{ alignItems: "center", marginTop: 50, marginBottom: 10 }}>
          <Text style={{ ...styles.text1 }}>Nemate nalog?</Text>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Button
            title={"Napravi nalog"}
            buttonStyle={styles.createButton}
            titleStyle={styles.createButtonTitle}
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
  container: {
    flex: 1,
  },
  title: {
    fontSize: 60,
    color: colors.buttons,
    fontWeight: "800",
  },
  textInput1: {
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 20,
    padding: 8,
    paddingLeft: 12,
  },
  textInput2: {
    borderWidth: 1,
    borderColor: "#86939e",
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    padding: 8,
    paddingLeft: 12,
  },
  text1: {
    color: colors.grey3,
    fontSize: 16,
  },
  SocialIcon: {
    borderRadius: 12,
    height: 50,
    width: "auto",
  },
  createButton: {
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
  createButtonTitle: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
});
