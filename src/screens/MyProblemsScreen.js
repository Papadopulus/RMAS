import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { firebase } from "../../firebaseConfig";
import ProblemInfoModal from "../components/ProblemInfoModal";
import { colors, parameters } from "../global/styles";

export default function MyProblemsScreen() {
  const [problems, setProblems] = useState([]);
  const currentUser = firebase.auth().currentUser;
  const handleResolveProblem = async (problemId) => {
    try {
      const userRef = firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid);

      await userRef.update({
        reportedProblems: firebase.firestore.FieldValue.arrayRemove(problemId),
      });

      await firebase.firestore().collection("problems").doc(problemId).delete();

      // Ažurirajte stanje kako biste uklonili rešeni problem iz prikaza
      setProblems((prevProblems) =>
        prevProblems.filter((problem) => problem.id !== problemId)
      );
    } catch (error) {
      console.error("Greška pri brisanju problema:", error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchProblems = async () => {
        try {
          const problemsSnapshot = await firebase
            .firestore()
            .collection("problems")
            .where("userId", "==", currentUser.uid)
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesWrapper}>
          <Text style={styles.headerCategories}>Moji Problemi</Text>
        </View>
        <View style={styles.problemInfoModal}>
          <View style={styles.problemInfoModalView}>
            {problems.map((problem) => (
              <View style={{ marginVertical: 10 }} key={problem.id}>
                <ProblemInfoModal
                  problem={problem}
                  currentPage={"MyProblems"}
                  handleResolveProblem={handleResolveProblem}
                  // Dodajte propse za prikazivanje problema unutar komponente
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  categoriesWrapper: {
    backgroundColor: colors.grey5,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  problemInfoModal: {
    alignItems: "center",
  },
  problemInfoModalView: {
    width: "90%",
    height: "45%",
  },
  headerCategories: {
    color: colors.grey1,
    fontSize: 22,
    fontWeight: "bold",
  },
});
