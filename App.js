import React, { useEffect } from "react";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import config from "./src/aws-exports";
Amplify.configure(config);

import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

import "react-native-gesture-handler";
import Navigation from "./src/navigation";

import { withAuthenticator } from "aws-amplify-react-native";

import { createUser } from "./src/graphql/mutations";
import { getUser } from "./src/graphql/queries";

const randomImages = [
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-1.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-5.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-7.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-8.jpg",
  "https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg",
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random * randomImages.length)];
};

function App() {
  useEffect(() => {
    const fetchUser = async () => {
      // get currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      if (!userInfo) {
        return;
      }

      // check if the user exist in database
      const getUserResponse = await API.graphql(
        graphqlOperation(getUser, { id: userInfo.attributes.sub })
      );

      if (getUserResponse.data.getUser) {
        console.log("user already exist in database");
        return;
      }
      // if it doesn't , it is a newly registered user
      // then, create a new user in the database
      const newUser = {
        id: userInfo.attributes.sub,
        username: userInfo.username,
        email: userInfo.attributes.email,
        imageUri: getRandomImage(),
      };
      await API.graphql(graphqlOperation(createUser, { input: newUser }));
    };

    fetchUser();
  }, []);

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

export default withAuthenticator(App);
