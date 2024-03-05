import { Button } from "@rneui/base";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Image } from "react-native";
import { parameters } from "../global/styles";
import { firebase } from "../../firebaseConfig";
import { SignInContext } from "../contexts/authContext";

export default function MyAccountScreen() {
  const { dispatchSignedIn } = useContext(SignInContext);
  const [user, setUser] = useState("");
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("User does not exist");
          }
        });
    } else {
      // Možete dodati kod koji će se izvršiti ako korisnik nije prijavljen
      console.log("Korisnik nije prijavljen");
    }
  });

  async function signOut() {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("USER SUCCESSFULLY SIGNED OUT");
          dispatchSignedIn({
            type: "UPDATE_SIGN_IN",
            payload: { userToken: null },
          });
        });
    } catch (error) {
      Alert.alert(error.code);
    }
  }
  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userContainer}>
          <Image
            source={{ uri: user.imageUri }}
            style={styles.userImage}
          ></Image>
          <Text style={styles.username}>{user.username}</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}

      <View style={styles.cardContainer}>
        <View style={styles.cardItem}>
          <Text style={styles.cardLabel}>Ime:</Text>
          <Text style={styles.cardValue}>{user ? user.name : ""}</Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.cardLabel}>Prezime:</Text>
          <Text style={styles.cardValue}>{user ? user.lastName : ""}</Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.cardLabel}>Email:</Text>
          <Text style={[styles.cardValue, { width: 200 }]} numberOfLines={2}>
            {user ? user.email : ""}
          </Text>
        </View>
        <View style={styles.cardItem}>
          <Text style={styles.cardLabel}>Broj Telefona:</Text>
          <Text style={styles.cardValue}>{user ? user.phoneNumber : ""}</Text>
        </View>
      </View>

      <Button
        title="Odjavi se"
        buttonStyle={parameters.styledButton}
        titleStyle={parameters.buttonTitle}
        onPress={() => {
          signOut();
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  userContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  username: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
    height: "30%",
    justifyContent: "space-evenly",
  },
  cardItem: {
    flexDirection: "row",
    marginVertical: 5,
  },
  cardLabel: {
    fontWeight: "bold",
    fontSize: 18,
    width: 120,
  },
  cardValue: {
    fontSize: 18,
  },
});
