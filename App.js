import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/navigation/RootNavigator";
import { SignInContextProvider } from "./src/contexts/authContext";

export default function App() {
  return (
    <SignInContextProvider>
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          // backgroundColor={colors.statusBar}
        ></StatusBar>
        <RootNavigator></RootNavigator>
      </View>
    </SignInContextProvider>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
});
