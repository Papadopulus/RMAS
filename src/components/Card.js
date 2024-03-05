import { Icon } from "@rneui/base";
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { colors, parameters } from "../global/styles";

export default function Card({
  onPressCard,
  problemName,
  category,
  address,
  numberOfReviews,
  description,
  images,
  author,
  screenWidth,
}) {
  return (
    <TouchableOpacity>
      <View style={{ ...styles.cardView, width: screenWidth }}>
        <Image
          style={{ ...styles.image, width: screenWidth }}
          source={{ uri: images }}
        ></Image>
        <View style={{ alignItems: "center" }}>
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.problemName}>{problemName}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={styles.location}>
              <Icon
                name={"place"}
                type="material"
                color={colors.grey2}
                size={18}
                iconStyle={{ marginTop: 3 }}
              ></Icon>
              <Text style={styles.address}>{address}</Text>
            </View>
            <View
              style={{ flex: 9, flexDirection: "row", alignItems: "center" }}
            >
              <Icon
                name={"visibility"}
                type="material"
                color={colors.grey2}
                size={18}
                iconStyle={{ marginTop: 3 }}
              ></Icon>
              <Text style={styles.address}>{numberOfReviews}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: 9,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.grey4,
    marginVertical: 10,
  },
  image: {
    borderRadius: 5,
    height: 200,
  },
  problemName: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.grey1,
    marginTop: 5,
    marginLeft: 10,
  },
  location: {
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    fontSize: 12,
    paddingTop: 5,
    color: colors.grey2,
    paddingHorizontal: 10,
  },
});
