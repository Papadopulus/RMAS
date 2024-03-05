import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Icon } from "@rneui/base";

import { colors, parameters } from "../global/styles";
import { filterData, listData } from "../global/Data";
import Card from "../components/Card";
import { useFocusEffect } from "@react-navigation/native";
import { firebase } from "../../firebaseConfig";
import ProblemInfoModal from "../components/ProblemInfoModal";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen() {
  const [search, updateSearch] = useState("");
  const [indexCheck, setIndexCheck] = useState("0");
  const [problems, setProblems] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
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

      fetchProblems();
    }, [])
  );
  return (
    <View style={styles.container}>
      {/* <HomeHeader></HomeHeader> */}
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesWrapper}>
            <Text style={styles.headerCategories}>Lista</Text>
          </View>
          <View style={styles.problemInfoModal}>
            <View style={styles.problemInfoModalView}>
              {problems.map((problem) => (
                <View style={{ marginVertical: 10 }} key={problem.id}>
                  <ProblemInfoModal
                    problem={problem}

                    // Dodajte propse za prikazivanje problema unutar komponente
                  />
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  SearchBar: {
    width: "80%",
    borderRadius: 12,
    marginLeft: 10,
  },
  filterIconContainer: {
    position: "absolute",
    right: 15,
    backgroundColor: colors.buttons,
    borderRadius: 50,
    padding: 7,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 5,
  },
  headerCategories: {
    color: colors.grey1,
    fontSize: 22,
    fontWeight: "bold",
  },
  categoriesWrapper: {
    backgroundColor: colors.grey5,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  smallCard: {
    borderRadius: 30,
    backgroundColor: colors.grey5,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    width: 110,
    margin: 10,
    height: 110,
  },
  smallCardSelected: {
    borderRadius: 30,
    backgroundColor: colors.buttons,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    width: 110,
    margin: 10,
    height: 110,
  },
  smallCardTextSelected: {
    fontSize: 15,
    color: colors.Cardbackground,
    fontWeight: "bold",
  },
  smallCardText: {
    fontSize: 15,
    color: colors.grey2,
    fontWeight: "bold",
  },
  problemInfoModal: {
    alignItems: "center",
  },
  problemInfoModalView: {
    width: "90%",
    height: "45%",
  },
});
