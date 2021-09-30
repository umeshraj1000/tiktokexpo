import React from "react";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

import {
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  View,
  Text,
} from "react-native";

import "react-native-gesture-handler";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigation />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
});

//// is it commited???
