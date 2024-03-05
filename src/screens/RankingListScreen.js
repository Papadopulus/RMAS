import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { firebase } from "../../firebaseConfig"; // Uvoz Firebase konfiguracije
import { useFocusEffect } from "@react-navigation/native";
import { colors } from "../global/styles";

export default function RankingListScreen() {
  const [users, setUsers] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        try {
          const usersSnapshot = await firebase
            .firestore()
            .collection("users")
            .orderBy("rank", "desc") // Poredak po polju "rank" u opadajućem redosledu
            .get();

          if (!usersSnapshot.empty) {
            const userData = [];

            usersSnapshot.forEach((userDoc) => {
              const data = userDoc.data();
              userData.push({ id: userDoc.id, ...data });
            });

            setUsers(userData);
          } else {
            console.log("Nema korisnika u kolekciji.");
          }
        } catch (error) {
          console.error("Greška pri dohvatanju korisnika:", error);
        }
      };

      fetchUsers();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoriesWrapper}>
        <Text style={styles.headerCategories}>Rang Lista</Text>
      </View>
      {users.map((user) => (
        <View key={user.id} style={styles.card}>
          <View>
            <Text style={styles.username}>{user.username}</Text>
            <Text>{`${user.name} ${user.lastName}`}</Text>
            <Text>{user.phoneNumber}</Text>
          </View>
          <Text style={styles.rank}>{user.rank}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: StatusBar.currentHeight,
  },
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "white",
    padding: 16,
    marginHorizontal: 16,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rank: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: "bold",
  },
  categoriesWrapper: {
    backgroundColor: colors.grey5,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  headerCategories: {
    color: colors.grey1,
    fontSize: 22,
    fontWeight: "bold",
  },
});
