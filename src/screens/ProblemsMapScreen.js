import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Slider from "@react-native-community/slider";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { firebase } from "../../firebaseConfig";
import { SignInContext } from "../contexts/authContext";
import { colors, parameters } from "../global/styles";
import { color } from "@rneui/base";
import ProblemInfoModal from "../components/ProblemInfoModal";
import { useFocusEffect } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import geolib from "geolib";
import { getDistance } from "geolib";

export default function ProblemsMapScreen({ navigation }) {
  const [user, setUser] = useState("");
  const [location, setLocation] = useState(null);
  const [showAddProblemDialog, setShowAddProblemDialog] = useState(false);
  const [selectedCoordinate, setSelectedCoordinate] = useState(null);
  const [problems, setProblems] = useState([]);
  const [showProblemDetails, setShowProblemDetails] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [showMarker, setShowMarker] = useState(false);
  const [userNames, setUserNames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [searchRadius, setSearchRadius] = useState(10000);

  const openStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const closeStartDatePicker = () => {
    setShowStartDatePicker(false);
  };

  const openEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const closeEndDatePicker = () => {
    setShowEndDatePicker(false);
  };

  const openFilterModal = () => {
    setShowFilterModal(true);
  };

  const closeFilterModal = () => {
    setShowFilterModal(false);
  };

  const fetchProblems = async () => {
    try {
      const problemsSnapshot = await firebase
        .firestore()
        .collection("problems")
        .get();
      if (!problemsSnapshot.empty) {
        const problemsData = [];
        problemsSnapshot.forEach((problemDoc) => {
          const data = problemDoc.data();
          problemsData.push({ id: problemDoc.id, ...data });
        });
        setProblems(problemsData);
      } else {
        console.log("Nema problema u kolekciji.");
      }
    } catch (error) {
      console.error("Greška pri dohvatanju problema:", error);
    }
  };
  const fetchData = async () => {
    try {
      const userSnapshot = await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .get();

      if (userSnapshot.exists) {
        const userData = userSnapshot.data();
        setUser(userData);
      } else {
        console.log("User does not exist");
      }

      const usersSnapshot = await firebase
        .firestore()
        .collection("users")
        .get();
      if (!usersSnapshot.empty) {
        const userNamesData = [];

        usersSnapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          const userName = userData.username;
          userNamesData.push(userName);
        });

        setUserNames(userNamesData);
      } else {
        console.log("Nema korisnika u kolekciji.");
      }

      const categoriesSnapshot = await firebase
        .firestore()
        .collection("categories")
        .get();
      if (!categoriesSnapshot.empty) {
        const categoriesData = [];

        categoriesSnapshot.forEach((categoryDoc) => {
          const categoryData = categoryDoc.data();
          const categoryName = categoryData.name; // Pretpostavljamo da kategorija ima polje 'name'
          categoriesData.push(categoryName);
        });

        setCategories(categoriesData);
      } else {
        console.log("Nema kategorija u kolekciji.");
      }

      // Ostatak vašeg koda za dohvatanje lokacije i problema
    } catch (error) {
      console.error("Greška pri dohvatanju podataka:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Dozvola za pristup lokaciji nije odobrena.");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
        });
      })();
      fetchData();
      fetchProblems();
    }, [])
  );
  const handleMapPress = (e) => {
    if (showProblemDetails) {
      setShowProblemDetails(false);
    } else {
      const coordinate = e.nativeEvent.coordinate;
      setSelectedCoordinate(coordinate);
      setShowAddProblemDialog(true);
      setShowMarker(true);
    }
  };
  const applyFilters = () => {
    let filteredProblems = [...problems];

    // Primena filtera na probleme
    if (selectedUsername) {
      filteredProblems = filteredProblems.filter(
        (problem) => problem.userUsername === selectedUsername
      );
    }
    if (selectedCategory) {
      filteredProblems = filteredProblems.filter(
        (problem) => problem.category === selectedCategory
      );
    }
    if (startDate && endDate) {
      filteredProblems = filteredProblems.filter((problem) => {
        const problemDate = new Date(problem.createdAt);
        return problemDate >= startDate && problemDate <= endDate;
      });
    } else if (startDate) {
      filteredProblems = filteredProblems.filter((problem) => {
        const problemDate = new Date(problem.createdAt);
        return problemDate >= startDate;
      });
    } else if (endDate) {
      filteredProblems = filteredProblems.filter((problem) => {
        const problemDate = new Date(problem.createdAt);
        return problemDate <= endDate;
      });
    }

    // Dodajte slične provjere za ostale filtere (kategorija, datum itd.)

    setProblems(filteredProblems);
  };
  const handleSearch = async () => {
    try {
      const problemsSnapshot = await firebase
        .firestore()
        .collection("problems")
        .get();
      if (!problemsSnapshot.empty) {
        const problemsData = [];
        problemsSnapshot.forEach((problemDoc) => {
          const data = problemDoc.data();
          problemsData.push({ id: problemDoc.id, ...data });
        });
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Dozvola za pristup lokaciji nije odobrena.");
          return;
        }
        let userLocation = await Location.getCurrentPositionAsync({});
        const problemsInRadius = problemsData.filter((problem) => {
          const problemLocation = problem.selectedCoordinate;
          const distance = getDistance(
            {
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            },
            {
              latitude: problemLocation.latitude,
              longitude: problemLocation.longitude,
            }
          );

          // Definirajte radijus u metrima (npr. 10000 metara)
          const radiusInMeters = searchRadius;

          return distance <= radiusInMeters;
        });
        setProblems(problemsInRadius);
      } else {
        console.log("Nema problema u kolekciji.");
      }
    } catch (error) {
      console.error("Greška pri dohvatanju problema:", error);
    }
  };

  return (
    <View style={{ marginTop: StatusBar.currentHeight }}>
      <View style={styles.filterButton}>
        <View style={{ marginRight: 20 }}>
          <TouchableOpacity onPress={() => openFilterModal()}>
            <Icon
              type="material-community"
              name="filter"
              color={colors.buttons}
              size={28}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            width: 110,
            backgroundColor: "#bdc6cf",
            alignItems: "center",
            height: 35,
            borderRadius: 12,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              // Resetujte sve filtere ovde
              setSelectedUsername("");
              setSelectedCategory("");
              setStartDate(null);
              setEndDate(null);
              setSearchRadius(10000);
              fetchProblems();
            }}
          >
            <Text style={styles.resetFilterButtonText}>Resetuj filtere</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showFilterModal}
        onRequestClose={() => {
          closeFilterModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.filterHeader}>Filtriranje problema</Text>
            {/* Dodajte opcije za filtriranje ovde */}
            {/* Primer: Filtriranje po autoru */}
            <View style={styles.filterOption}>
              <Text style={[styles.resetFilterButtonText, { marginRight: 5 }]}>
                Autor:
              </Text>
              <Picker
                selectedValue={selectedUsername}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedUsername(itemValue)
                }
                style={{ width: 170 }}
              >
                <Picker.Item label={"Svi"} value={""} />
                {userNames.map((username, index) => (
                  <Picker.Item key={index} label={username} value={username} />
                ))}
              </Picker>
              <Text style={[styles.resetFilterButtonText, { marginRight: 5 }]}>
                Kategorija:
              </Text>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCategory(itemValue)
                }
              >
                <Picker.Item label={"Sve"} value={""} />
                {categories.map((username, index) => (
                  <Picker.Item key={index} label={username} value={username} />
                ))}
              </Picker>
            </View>

            {/* Dodajte slično za ostale opcije kao kategoriju, datum, itd. */}
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text style={[styles.resetFilterButtonText, { marginRight: 5 }]}>
                Datum od:
              </Text>
              <TouchableOpacity onPress={openStartDatePicker}>
                <Text>
                  {startDate ? startDate.toDateString() : "Izaberite datum"}
                </Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setStartDate(selectedDate);
                    }
                    closeStartDatePicker();
                  }}
                />
              )}
            </View>
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text style={[styles.resetFilterButtonText, { marginRight: 5 }]}>
                Datum do:
              </Text>
              <TouchableOpacity onPress={openEndDatePicker}>
                <Text>
                  {endDate ? endDate.toDateString() : "Izaberite datum"}
                </Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      setEndDate(selectedDate);
                    }
                    closeEndDatePicker();
                  }}
                />
              )}
            </View>
            {/* Dugme za primenu filtera */}
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.applyFilterButton}
                onPress={() => {
                  applyFilters();
                  closeFilterModal();
                }}
              >
                <Text style={styles.applyFilterButtonText}>Primeni filter</Text>
              </TouchableOpacity>

              {/* Dugme za zatvaranje moda */}
              <TouchableOpacity
                style={styles.closeFilterButton}
                onPress={() => {
                  closeFilterModal();
                }}
              >
                <Text style={styles.closeFilterButtonText}>Zatvori</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <MapView
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height * 0.654,
        }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={location}
        onPress={(e) => {
          handleMapPress(e);
        }}
      >
        {/* {location && (
          <Marker
            title={user.username}
            coordinate={location}
            onPress={(e) => {
              handleMapPress(e);
            }}
          ></Marker>
        )} */}
        {problems.map((problem) => (
          <Marker
            key={problem.id}
            coordinate={{
              latitude: problem.selectedCoordinate.latitude,
              longitude: problem.selectedCoordinate.longitude,
            }}
            onPress={() => {
              // Otvorite modal sa detaljima problema.
              setShowProblemDetails(true);
              setSelectedProblem(problem);
            }}
          />
        ))}
        {showMarker && <Marker coordinate={selectedCoordinate} />}
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddProblemDialog}
        onRequestClose={() => {
          setShowAddProblemDialog(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 17 }}>
              Da li želite da dodate problem?
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowAddProblemDialog(false);
                  navigation.navigate("AddProblemScreen", {
                    selectedCoordinate,
                  });
                }}
              >
                <Text style={styles.text}>Da</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowAddProblemDialog(false);
                  setShowMarker(false);
                }}
              >
                <Text style={styles.text}>Otkaži</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {showProblemDetails && (
        <View style={styles.problemInfoModal}>
          <View style={styles.problemInfoModalView}>
            {selectedProblem && (
              // Prikazivanje detalja o problemu koristeći ProblemInfoModal komponentu
              <ProblemInfoModal
                problem={selectedProblem}
                onClose={() => setShowProblemDetails(false)}
              />
            )}
          </View>
        </View>
      )}
      <View style={styles.sliderView}>
        <Text style={styles.distanceText}>
          Udaljenost: {Math.round(searchRadius)} metara
        </Text>
        <Slider
          style={{ width: "95%", height: 40 }}
          minimumValue={0}
          maximumValue={10000}
          value={searchRadius}
          onValueChange={(value) => setSearchRadius(value)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonSlider}
            onPress={() => handleSearch()}
          >
            <Text style={styles.textSlider}>Pretraži</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonSlider}
            onPress={() => {
              fetchProblems();
              setSearchRadius(10000);
            }}
          >
            <Text style={styles.textSlider}>Resetuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  problemInfoModal: {
    position: "absolute",
    bottom: 115, // Postavite modal na dno ekrana
    left: 0,
    right: 0,

    alignItems: "baseline",
    marginLeft: 10,
  },
  problemInfoModalView: {
    width: "75%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    elevation: 2,
    margin: 5,
    backgroundColor: colors.buttons,
    width: 100,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderwidth: 1,
    borderColor: "#FfBc52",
    height: 50,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonSlider: {
    elevation: 2,
    marginHorizontal: 5,
    backgroundColor: colors.buttons,
    width: 85,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderwidth: 1,
    borderColor: "#FfBc52",
    height: 35,
    paddingHorizontal: 20,
  },
  text: {
    color: colors.headerText,
    fontSize: 17,
  },
  textSlider: {
    color: colors.headerText,
    fontSize: 12,
  },
  distanceText: {
    color: colors.buttons,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  filterButton: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  filterHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.buttons,
  },
  filterOption: {
    marginBottom: 10,
  },
  applyFilterButton: {
    backgroundColor: colors.buttons,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginRight: 5,
  },
  applyFilterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeFilterButton: {
    backgroundColor: colors.buttons,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 5,
  },
  closeFilterButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resetFilterButtonText: {
    color: colors.buttons,
    fontSize: 14,
    fontWeight: "bold",
  },
  sliderView: {
    width: "100%",
    height: 110,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
