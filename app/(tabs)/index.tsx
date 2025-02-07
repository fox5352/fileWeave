import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
        assumenda blanditiis eos dicta dolores odit, iure odio at aliquid
        obcaecati recusandae excepturi aspernatur repellat unde molestiae
        mollitia modi vero tempore?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
