import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(data);

    if (!data.cancelled) {
      setImage(data.uri);
      navigation.navigate("CreatePost", { videoUri: data.uri });
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        />
      )}
    </View>
  );
}

// import React, { useState, useEffect, useRef } from "react";
// import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import { Camera } from "expo-camera";

// export default function CameraScreen() {
//   const [hasPermission, setHasPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   if (hasPermission === null) {
//     return <View />;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   // OUR CODE STARTS FROM HERE
//   // OUR CODE STARTS FROM HERE
//   // OUR CODE STARTS FROM HERE
//   // OUR CODE STARTS FROM HERE
//   // OUR CODE STARTS FROM HERE
//   // OUR CODE STARTS FROM HERE

//   const onRecord = async () => {
//     console.warn("captured");
//     if (!isRecording) {
//       cameraref.current.stopRecording();
//     } else {
//       const data = await cameraref.current.recordAsync();
//     }
//   };

//   // const [isRecording, setIsRecording] = useState(false);
//   // const handleRecord = () => {
//   //   isRecording(!isRecording);
//   // };

//   const cameraref = useRef();

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} ref={cameraref} />
//       <TouchableOpacity
//         onPress={onRecord}
//         style={
//           // isRecording ? styles.buttonStop : styles.buttonRecord
//           styles.buttonRecord
//         }
//       ></TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     backgroundColor: "black",
//     // alignItems: "center",
//   },
//   camera: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   buttonContainer: {},
//   buttonRecord: {
//     height: 50,
//     width: 50,
//     backgroundColor: "#ff4343",
//     marginVertical: 10,
//     alignSelf: "center",
//     borderRadius: 25,
//   },
//   buttonStop: {
//     height: 50,
//     width: 50,
//     backgroundColor: "#ff4343",
//     marginVertical: 10,
//     alignSelf: "center",
//     borderRadius: 25,
//   },
//   text: {},
// });
