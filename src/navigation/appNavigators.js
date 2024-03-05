import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import SignInWelcomeScreen from "../screens/authScreens/SignInWelcomeScreen";
import SignInScreen from "../screens/authScreens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import RootClientTabs from "./ClientTabs";
import SignUpScreen from "../screens/authScreens/SignUpScreen";
import AddProblemScreen from "../screens/AddProblemScreen";
import ProblemDetails from "../components/ProblemDetails";
const App = createStackNavigator();

export default function AppStack() {
  return (
    <App.Navigator>
      <App.Screen
        name={"RootClientTabs"}
        component={RootClientTabs}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      ></App.Screen>
      <App.Screen
        name={"AddProblemScreen"}
        component={AddProblemScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      ></App.Screen>
      <App.Screen
        name={"ProblemDetails"}
        component={ProblemDetails}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      ></App.Screen>
    </App.Navigator>
  );
}
