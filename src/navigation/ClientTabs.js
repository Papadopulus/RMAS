import React from "react";
import { Icon } from "@rneui/base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native-animatable";
import HomeScreen from "../screens/HomeScreen";
import MyProblemsScreen from "../screens/MyProblemsScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import RankingListScreen from "../screens/RankingListScreen";
import ProblemsMapScreen from "../screens/ProblemsMapScreen";
import { colors } from "../global/styles";

const ClientTabs = createBottomTabNavigator();

export default function RootClientTabs() {
  return (
    <ClientTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: colors.buttons,
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName, iconType;

          if (route.name === "HomeScreen") {
            iconName = "home";
            iconType = "material";
          } else if (route.name === "MyProblemsScreen") {
            iconName = "warning";
            iconType = "material";
          } else if (route.name === "ProblemsMapScreen") {
            iconName = "earth";
            iconType = "material-community";
          } else if (route.name === "RankingListScreen") {
            iconName = "trophy";
            iconType = "material-community";
          } else if (route.name === "MyAccountScreen") {
            iconName = "person";
            iconType = "material";
          }

          return (
            <Icon name={iconName} type={iconType} color={color} size={size} />
          );
        },
      })}
    >
      <ClientTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: "Početna", unmountOnBlur: true }}
      />
      <ClientTabs.Screen
        name="MyProblemsScreen"
        component={MyProblemsScreen}
        options={{ tabBarLabel: "Moji Problemi" }}
      />
      <ClientTabs.Screen
        name="ProblemsMapScreen"
        component={ProblemsMapScreen}
        options={{ tabBarLabel: "Mapa", unmountOnBlur: true }}
      />
      <ClientTabs.Screen
        name="RankingListScreen"
        component={RankingListScreen}
        options={{ tabBarLabel: "Rang Lista" }}
      />
      <ClientTabs.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={{ tabBarLabel: "Nalog" }}
      />
    </ClientTabs.Navigator>
  );
}
