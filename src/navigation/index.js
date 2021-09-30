import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import homeBottomTabNavigator from "./homeBottomTabNavigator";

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={homeBottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
