import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { colors } from "../global/styles";

export default function ProblemInfoModal({
  problem,
  currentPage,
  handleResolveProblem,
}) {
  const navigation = useNavigation();
  const shortDescription =
    problem.description.split(" ").length > 15
      ? `${problem.description.split(" ").slice(0, 15).join(" ")}...`
      : problem.description;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("ProblemDetails", { problem });
      }}
    >
      <Image source={{ uri: problem.images[0] }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{problem.title}</Text>
        <Text style={styles.description}>{shortDescription}</Text>
        <View style={styles.location}>
          <Icon
            name="map-marker"
            type="material-community"
            color="gray"
            size={20}
          />
          <Text style={styles.address}>{problem.address}</Text>
        </View>
        <Text style={styles.user}>Objavio: {problem.userUsername}</Text>
      </View>
      {currentPage === "MyProblems" && (
        <TouchableOpacity
          style={styles.resolveButton}
          onPress={() => handleResolveProblem(problem.id)}
        >
          <Text style={styles.resolveButtonText}>Reši</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginRight: 16,
    borderRadius: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    marginLeft: 8,
  },
  user: {
    fontSize: 14,
    color: "gray",
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  resolveButton: {
    backgroundColor: colors.buttons,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  resolveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
