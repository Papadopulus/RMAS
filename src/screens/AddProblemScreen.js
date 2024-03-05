import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import { Button } from "@rneui/base";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { firebase } from "../../firebaseConfig";
import { Icon, color } from "@rneui/base";
import { colors, parameters } from "../global/styles";
import {
  getStorage,
  ref as storageReference,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function AddProblemScreen({ route, navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState("");
  const { selectedCoordinate } = route.params;
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraPermission(cameraStatus.status === "granted");
      setGalleryPermission(galleryStatus.status === "granted");
    })();
    const fetchUser = async () => {
      try {
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
      } catch (error) {
        console.error("Greška pri dohvatanju korisnika:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const categoriesSnapshot = await firebase
          .firestore()
          .collection("categories")
          .get();

        if (!categoriesSnapshot.empty) {
          const categoryNames = [];

          categoriesSnapshot.forEach((categoryDoc) => {
            const data = categoryDoc.data();

            if (data && data.name) {
              categoryNames.push(data.name);
            }
          });

          setCategories(categoryNames);
        } else {
          console.log("Nema kategorija u kolekciji.");
        }
      } catch (error) {
        console.error("Greška pri dohvatanju kategorija:", error);
      }
    };

    fetchCategories();
    fetchUser();
  }, []);

  if (cameraPermission === null || galleryPermission === null) {
    return <Text>Provera dozvola...</Text>;
  }

  if (!cameraPermission || !galleryPermission) {
    return (
      <Text>
        Dozvole za kameru ili galeriju nisu omogućene. Molimo promenite ovo u
        postavkama.
      </Text>
    );
  }

  const takePicture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };
  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const increaseUserRank = async (userId) => {
    try {
      const userRef = firebase.firestore().collection("users").doc(userId);
      await userRef.update({
        // Ako koristite drugo polje za rangiranje, zamenite "rank" sa odgovarajućim imenom polja
        rank: firebase.firestore.FieldValue.increment(1),
      });
      console.log("Rang korisnika je povećan za 1.");
    } catch (error) {
      console.error("Greška pri povećanju ranga korisnika:", error);
    }
  };
  const submitProblem = async () => {
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      return;
    }
    try {
      // Kreirajte objekat sa svim podacima koji treba da budu sačuvani
      const problemData = {
        title,
        description,
        category,
        address,
        selectedCoordinate,
        userId: currentUser.uid,
        userUsername: user.username,
        images: images,
        createdAt: new Date().toISOString(),
      };

      // Sačuvajte podatke u kolekciji "problems"
      const problemRef = await firebase
        .firestore()
        .collection("problems")
        .add(problemData);

      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          reportedProblems: firebase.firestore.FieldValue.arrayUnion(
            problemRef.id
          ),
        });
      await increaseUserRank(currentUser.uid);
      // Nakon što su podaci sačuvani, možete se vratiti na ekran mape
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Greška pri čuvanju problema:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.goBackButton}>
        <Icon
          type="material-community"
          name={"arrow-left"}
          color={colors.headerText}
          size={28}
          onPress={() => {
            navigation.goBack();
          }}
        ></Icon>
      </View>
      <Text style={styles.header}>Prijavi Problem</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Naziv problema"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Opis problema"
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true} // Ovo omogućava višelinijski unos
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Picker
          style={styles.picker}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Izaberite kategoriju" value="" />
          {categories.map((categoryName, index) => (
            <Picker.Item
              key={index}
              label={categoryName}
              value={categoryName}
            />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Adresa problema"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <View style={styles.imageBtn}>
          <Button
            title="Uslikajte problem"
            onPress={takePicture}
            color={colors.buttons}
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
          />
        </View>
        <View style={styles.imageBtn}>
          <Button
            title="Odaberite sliku iz galerije"
            onPress={pickImage}
            color={colors.buttons}
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
          />
        </View>
        <FlatList
          data={images}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.imageList}
          renderItem={({ item, index }) => (
            <TouchableWithoutFeedback onPress={() => handleDeleteImage(index)}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} />
                <Icon
                  name="delete"
                  color="red"
                  size={24}
                  style={styles.deleteIcon}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
        />
        <View style={styles.imageBtn}>
          <Button
            title="Prijavi Problem"
            onPress={submitProblem}
            color={colors.buttons}
            buttonStyle={parameters.styledButton}
            titleStyle={parameters.buttonTitle}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  goBackButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: colors.buttons,
    padding: 5,
  },
  goBackText: {
    fontSize: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
    color: colors.buttons,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  picker: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginBottom: 16,
  },
  imageList: {
    flexDirection: "row", // Slike će se redati horizontalno
    // Redovi će se prelomiti kada nema dovoljno prostora
    marginTop: 20,
  },
  imageContainer: {
    marginRight: 16, // Razmak između slika
    marginBottom: 16, // Razmak ispod slika
    position: "relative", // Omogućava postavljanje ikone za brisanje
  },
  deleteIcon: {
    position: "absolute", // Postavite ikonu za brisanje preko slike
    top: 5,
    right: 5,
  },
  imageBtn: {
    marginTop: 10,
    marginBottom: 10,
    width: "84%",
    height: 50,
    alignSelf: "center",
  },
});
