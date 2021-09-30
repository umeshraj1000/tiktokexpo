import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import Post from "../components/Post";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import posts from "../../data/posts";

// const post = {
//   id: "p1",
//   videoUri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
//   user: {
//     id: "u1",
//     profilePicture: "https://bit.ly/39L85Ty",
//     username: "umeshraj",
//   },
//   caption: "hahaha this is the caption",
//   songName: "Jashn E Bahara",
//   songImage: "https://bit.ly/39L85Ty",
//   likes: 500,
//   comments: 12,
//   shares: 8,
// };

function Home(props) {
  // console.log(posts);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
      {/* <Post Post={post} /> */}
      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").height - tabBarHeight}
        snapToAlignment={"start"}
        decelerationRate={"fast"}
      />
    </View>
  );
}

export default Home;
