import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { Video } from "expo-av";

import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";

function Post(props) {
  const tabBarHeight = useBottomTabBarHeight();
  const [post, setPost] = useState(props.post);
  const [isLiked, setIsLiked] = useState(false);

  const [paused, setPaused] = useState(false);

  const onPlayPausePress = () => {
    setPaused(!paused);
  };

  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({
      ...post,
      likes: post.likes + likesToAdd,
    });
    setIsLiked(!isLiked);
  };

  return (
    <View
      style={{
        width: "100%",
        height: Dimensions.get("window").height - tabBarHeight,
      }}
    >
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View>
          <Video
            source={{
              uri: post.videoUri,
            }}
            style={styles.video}
            resizeMode={"cover"}
            shouldPlay={paused}
            isLooping
            isMuted={false}
          />

          <View style={styles.uiContainer}>
            <View style={styles.rightContainer}>
              <Image
                style={styles.profilePicture}
                source={{
                  uri: post.user.profilePicture,
                }}
              />

              <TouchableOpacity style={styles.iconContainer}>
                <AntDesign
                  name={"heart"}
                  size={35}
                  color={isLiked ? "red" : "white"}
                  onPress={onLikePress}
                />
                <Text style={styles.statsLabel}>{post.likes}</Text>
              </TouchableOpacity>
              <View style={styles.iconContainer}>
                <FontAwesome name={"commenting"} size={35} color="white" />
                <Text style={styles.statsLabel}>{post.comments}</Text>
              </View>
              <View style={styles.iconContainer}>
                <Fontisto name={"share-a"} size={30} color="white" />
                <Text style={styles.statsLabel}>{post.shares}</Text>
              </View>
            </View>

            <View style={styles.bottomContainer}>
              <View>
                <Text style={styles.username}>@{post.user.username}</Text>
                <Text style={styles.caption}>{post.caption}</Text>

                <View style={styles.songRow}>
                  <Entypo name={"beamed-note"} size={24} color="white" />
                  <Text style={styles.songName}>{post.songName}</Text>
                </View>
              </View>
              <Image
                style={styles.songImage}
                source={{
                  uri: post.songImage,
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  videoPlayButton: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  uiContainer: {
    height: "100%",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  caption: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
    marginBottom: 10,
  },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  songName: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 5,
  },
  songImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#4c4c4c",
  },

  // Right Container Styles

  rightContainer: {
    alignSelf: "flex-end",
    height: "35%",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
  },
  statsLabel: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
  },
  iconContainer: {
    alignItems: "center",
  },
});

export default Post;
