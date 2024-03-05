import React from "react";
import { Icon } from "@rneui/base";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { colors, parameters } from "../global/styles";

export default function HomeHeader() {
  return (
    <View style={styles.header}>
      <View
        style={[
          { alignItems: "center", justifyContent: "center" },
          { marginLeft: 20 },
        ]}
      >
        <Icon
          type="material"
          name="menu"
          color={colors.Cardbackground}
          size={32}
        ></Icon>
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
});
