import React from "react";
import { View, Text, StyleSheet, Dimensions, StatusBar } from "react-native";
import { colors, parameters } from "../global/styles";
import { Icon, color } from "@rneui/base";
export default function Header({ title, type, navigation }) {
  return (
    <View style={styles.header}>
      <View style={[{ justifyContent: "center" }, { marginLeft: 20 }]}>
        <Icon
          type="material-community"
          name={type}
          color={colors.headerText}
          size={28}
          onPress={() => {
            navigation.goBack();
          }}
        ></Icon>
      </View>
      <View style={{ justifyContent: "center" }}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: colors.buttons,
    height: parameters.headerHeight,
    marginTop: StatusBar.currentHeight,
  },
  headerText: {
    color: colors.headerText,
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 30,
  },
});
