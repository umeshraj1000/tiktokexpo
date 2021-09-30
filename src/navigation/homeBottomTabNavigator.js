import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import plusIcon from "../assets/images/plus-icon.png";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

function homeBottomTabNavigator(props) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
        },
        tabBarActiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Entypo name={"home"} size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Search"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name={"search1"} size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Upload"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={plusIcon}
              style={{
                height: 40,
                resizeMode: "contain",
              }}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name={"Inbox"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={"message-minus-outline"}
              size={25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Profile"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name={"person-outline"} size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default homeBottomTabNavigator;
