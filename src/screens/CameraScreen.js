//   return (
//     <View style={styles.container}>
//       {/* <Camera ref={camera} style={styles.preview} /> */}
//         <TouchableOpacity
//           onPress={onRecord}
//           style={isRecording ? styles.buttonStop : styles.buttonRecord}
//         ></TouchableOpacity>
//     </View>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const camera = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onRecord = async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      console.log(data);
    }
  };

  // const onFlipCamera = () => {
  //   setType(
  //     type === Camera.Constants.Type.back
  //       ? Camera.Constants.Type.front
  //       : Camera.Constants.Type.back
  //   );
  // };

  return (
    <View style={styles.container}>
      <Camera ref={camera} style={styles.preview}>
        <TouchableOpacity
          style={isRecording ? styles.buttonStop : styles.buttonRecord}
          onPress={onRecord}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  buttonRecord: {
    height: 50,
    width: 50,
    backgroundColor: "#ff4343",
    marginVertical: 10,
    alignSelf: "center",
    borderRadius: 25,
  },
  buttonStop: {
    height: 30,
    width: 30,
    backgroundColor: "#ff4343",
    marginVertical: 20,
    alignSelf: "center",
    borderRadius: 3,
  },
  // button: {
  //   height: 30,
  //   width: 30,
  //   backgroundColor: "#ff4343",
  //   marginVertical: 20,
  //   alignSelf: "center",
  //   borderRadius: 3,
  //   marginHorizontal: 100,
  // },
});

export default CameraScreen;
