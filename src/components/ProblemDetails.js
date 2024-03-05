import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import { colors } from "../global/styles";

export default function ProblemDetails({ route, navigation }) {
  const { problem } = route.params;

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

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {problem.images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>

      <Text style={styles.title}>{problem.title}</Text>

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{problem.description}</Text>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.location}>
          <Icon
            name="map-marker"
            type="material-community"
            color={colors.buttons}
            size={24}
          />
          <Text style={styles.address}>{problem.address}</Text>
        </View>
        <View style={styles.category}>
          <Icon
            name="shape-outline"
            type="material-community"
            color={colors.buttons}
            size={24}
          />
          <Text style={styles.categoryName}>{problem.category}</Text>
        </View>
      </View>

      <Text style={styles.user}>Prijavio: {problem.userUsername}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  image: {
    width: 375,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: colors.buttons,
  },
  descriptionContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
  },
  description: {
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    backgroundColor: "white",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    marginLeft: 8,
    fontSize: 16,
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryName: {
    marginLeft: 8,
    fontSize: 16,
  },
  user: {
    fontSize: 16,
    textAlign: "right",
    margin: 10,
    color: colors.grey2,
  },
  goBackButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    borderRadius: 50,
    backgroundColor: colors.buttons,
    padding: 5,
    marginLeft: 15,
    marginTop: 10,
  },
});
