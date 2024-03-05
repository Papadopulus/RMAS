import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "./authNavigators";
import AppStack from "./appNavigators";
import { SignInContext } from "../contexts/authContext";

export default function RootNavigator() {
  const { signedIn } = useContext(SignInContext);
  return (
    <NavigationContainer>
      {signedIn.userToken !== "signed-in" ? (
        <Auth></Auth>
      ) : (
        <AppStack></AppStack>
      )}
    </NavigationContainer>
  );
}
