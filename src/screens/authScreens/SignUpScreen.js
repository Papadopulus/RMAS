import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { colors, parameters } from "../../global/styles";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import { Icon, Button } from "@rneui/base";
import * as Animatable from "react-native-animatable";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { FIREBASE_APP, auth, firebase } from "../../../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";

const initialValues = {
  phoneNumber: "",
  name: "",
  lastName: "",
  password: "",
  email: "",
  username: "",
  imageUri: null,
};
export default function SignUpScreen({ navigation }) {
  const [passwordFocussed, setPassordFocussed] = useState(false);
  const [passwordBlured, setPasswordBlured] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signUp(values) {
    const { email, password } = values;
    if (password.length < 6) {
      Alert.alert("Greška", "Lozinka mora sadržati najmanje 6 karaktera.");
      return;
    }

    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              phoneNumber: values.phoneNumber,
              name: values.name,
              lastName: values.lastName,
              email: values.email,
              username: values.username,
              imageUri: values.imageUri,
              rank: 0,
            });
        });
      console.log("Podaci su upisani u Firestore");
    } catch (error) {
      console.error("Greška prilikom upisa podataka u Firestore:", error);
      Alert.alert(error.code);
    }
  }

  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasGalleryPremission, setHasGalleryPremission] = useState(null);
  const [image, setImage] = useState();

  let cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasGalleryPremission(galleryStatus.status === "granted");
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }
  const takeImage = async (props) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      props.values.imageUri = ("imageUri", result.uri);
      console.log(props.values.imageUri);
    }
  };
  const pickImage = async (props) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
      props.values.imageUri = ("imageUri", result.uri);
      console.log(props.values.imageUri);
    }
  };
  if (hasGalleryPremission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title={""} type={"arrow-left"} navigation={navigation} />
      <ScrollView keyboardShouldPersistTaps="always">
        <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 20,
          }}
        >
          <Text style={styles.title}>Napravi nalog</Text>
        </View>
        <View style={styles.view2}>
          <Text style={styles.text2}>Novi ste na aplikaciji?</Text>
        </View>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            signUp(values);
          }}
        >
          {(props) => (
            <View style={styles.view2}>
              <View style={styles.wrapBtn}>
                {image && (
                  <Image source={{ uri: image }} style={styles.image}></Image>
                )}
                <Camera
                  ref={cameraRef}
                  style={{ width: "84%", marginTop: 10 }}
                ></Camera>
                <View style={styles.imageBtn}>
                  <Button
                    title={"Uslikaj se"}
                    color={colors.buttons}
                    buttonStyle={parameters.styledButton}
                    titleStyle={parameters.buttonTitle}
                    onPress={() => {
                      takeImage(props);
                    }}
                  ></Button>
                </View>
                <View style={styles.imageBtn}>
                  <Button
                    title={"Odaberite sliku iz galerije"}
                    titleStyle={parameters.buttonTitle}
                    onPress={() => {
                      pickImage(props);
                    }}
                    color={colors.buttons}
                    buttonStyle={parameters.styledButton}
                  ></Button>
                </View>
              </View>
              <View style={styles.view6}>
                <TextInput
                  placeholder="Broj Telefona"
                  style={styles.input1}
                  keyboardType="number-pad"
                  autoFocus={true}
                  onChangeText={props.handleChange("phoneNumber")}
                  value={props.values.phoneNumber}
                ></TextInput>
              </View>
              <View style={styles.view6}>
                <TextInput
                  placeholder="Korisnicko ime"
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("username")}
                  value={props.values.username}
                ></TextInput>
              </View>
              <View style={styles.view6}>
                <TextInput
                  placeholder="Ime"
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("name")}
                  value={props.values.name}
                ></TextInput>
              </View>
              <View style={styles.view6}>
                <TextInput
                  placeholder="Prezime"
                  style={styles.input1}
                  autoFocus={false}
                  onChangeText={props.handleChange("lastName")}
                  value={props.values.lastName}
                ></TextInput>
              </View>
              <View style={styles.view10}>
                <View>
                  <Icon
                    name="email"
                    style={styles.email}
                    color={colors.grey3}
                    type="material"
                  />
                </View>
                <View style={styles.view11}>
                  <TextInput
                    placeholder="Email"
                    style={styles.input4}
                    autoFocus={false}
                    onChangeText={props.handleChange("email")}
                    value={props.values.email}
                  />
                </View>
              </View>
              <View style={styles.view14}>
                <Animatable.View
                  animation={passwordFocussed ? "fadeInRight" : "fadeInLeft"}
                  duration={400}
                >
                  <Icon name="lock" color={colors.grey3} type="material" />
                </Animatable.View>
                <TextInput
                  placeholder="Password"
                  style={{ flex: 1, marginLeft: 10 }}
                  autoFocus={false}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  onFocus={() => {
                    setPassordFocussed(true);
                  }}
                  onBlur={() => {
                    setPasswordBlured(true);
                  }}
                  secureTextEntry={!showPassword}
                />
                <Animatable.View
                  animation={passwordBlured ? "fadeInLeft" : "fadeInRight"}
                  duration={400}
                >
                  <Icon
                    name={showPassword ? "visibility" : "visibility-off"}
                    color={colors.grey3}
                    type="material"
                    style={{ marginRight: 10 }}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                </Animatable.View>
              </View>

              <View style={styles.view15}>
                <Text style={styles.text3}>
                  By creating or logging into an account you are
                </Text>
                <View style={styles.view16}>
                  <Text style={styles.text3}>agreeing with our </Text>
                  <Text style={styles.text4}> Terms & Conditions</Text>
                  <Text style={styles.text3}> and </Text>
                </View>
                <Text style={styles.text4}> Privacy Statement</Text>
              </View>
              <View style={styles.view17}>
                <Button
                  title="Napravi nalog"
                  buttonStyle={styles.button1}
                  titleStyle={styles.title1}
                  onPress={props.handleSubmit}
                  color={colors.buttons}
                />
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.view18}>
          <Text style={styles.text5}>ILI</Text>
        </View>
        <View style={styles.view19}>
          <View style={styles.view20}>
            <Text style={styles.text6}>Vec imate nalog?</Text>
          </View>
          <View style={styles.view21}>
            <Button
              title="Prijavi se"
              buttonStyle={styles.button2}
              titleStyle={styles.title2}
              color={colors.buttons}
              onPress={() => {
                navigation.navigate("SignInScreen");
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 50,
    color: colors.buttons,
    fontWeight: "800",
  },
  view1: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
  },

  text1: { fontSize: 22, color: colors.buttons, fontWeight: "bold" },

  view2: {
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 15,
  },

  view3: { marginTop: 5, marginBottom: 10 },

  text2: { fontSize: 15, color: colors.grey2 },

  view4: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
  },

  view5: { marginLeft: 30, marginTop: 20 },

  input1: { fontSize: 16, width: "100%" },

  view6: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },

  view7: { marginLeft: 0, maxWidth: "65%" },

  input2: { fontSize: 16, marginLeft: 0, marginBottom: 0 },

  view8: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },

  view9: { marginLeft: 0, maxWidth: "65%" },

  input3: { fontSize: 16, marginLeft: 0, marginBottom: 0 },

  view10: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.grey4,
    borderRadius: 12,
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },

  email: {
    fontSize: 24,
    padding: 0,
    marginBottom: 0,
    marginTop: 11,
    marginLeft: 2,
  },

  view11: { marginLeft: 30, width: "85%" },

  input4: { fontSize: 16, marginLeft: -20, marginTop: 8 },

  view13: { flexDirection: "row", height: 40 },

  view14: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.grey4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 5,
    marginTop: 20,
    height: 48,
  },

  view15: { alignItems: "center", justifyContent: "center", marginTop: 10 },

  text3: { fontSize: 13 },

  view16: { flexDirection: "row" },

  text4: { textDecorationLine: "underline", color: "green", fontSize: 13 },

  button1: {
    backgroundColor: colors.buttons,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.buttons,
    height: 50,
    paddingHorizontal: 20,
    width: "100%",
  },

  title1: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },

  view17: { marginVertical: 10, marginTop: 30 },

  view18: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
  },

  text5: { fontSize: 15, fontWeight: "bold" },

  view19: { backgroundColor: "white", paddingHorizontal: 15, marginBottom: 10 },

  view20: { marginTop: 5 },

  view21: { marginTop: 5, alignItems: "flex-end" },

  button2: {
    backgroundColor: colors.background3,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.background2,
    height: 40,
    paddingHorizontal: 20,
    // width:'100%'
  },

  title2: {
    color: colors.buttons,
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -3,
  },
  wrapBtn: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 50,
  },
  imageBtn: {
    marginTop: 10,
    marginBottom: 10,
    width: "84%",
    height: 50,
  },
});
