import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import Post from "../components/Post";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { API, graphqlOperation } from "aws-amplify";

import { listPosts } from "../graphql/queries";

function Home(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      // fetch all the posts
      try {
        const response = await API.graphql(graphqlOperation(listPosts));
        setPosts(response.data.listPosts.items);
      } catch (e) {
        console.error(e);
      }
    };
    fetchPost();
  }, []);

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
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
