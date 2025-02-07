import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import { useSessionStore } from "@/store/session";
import { useRouter } from "expo-router";

export default function sync() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [qrValue, setQRValue] = useState<string | null>(null);
  const { setSession } = useSessionStore();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  });

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanning(false);

    const url = data.split("?")[0];
    const token = data.split("?")[1].split("=")[1];

    if (!url || !token) {
      Alert.alert("Invalid QR Code");
    }

    setQRValue(data);

    setSession({
      url,
      token,
    });

    router.replace("/");
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <CameraView
          facing="back"
          onBarcodeScanned={handleBarCodeScanned}
          style={styles.camera}
        >
          <View style={styles.cameraBox} />
        </CameraView>
      ) : (
        <Text style={styles.label}>Scan QR code to sync</Text>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanning(!scanning)}
      >
        <Text
          disabled={!permission || !permission.granted}
          style={styles.buttonText}
        >
          {scanning ? "Stop Scanning" : "Scan"}
        </Text>
      </TouchableOpacity>

      {qrValue && (
        <Text style={styles.resultText}>Scanned QR Value: {qrValue}</Text>
      )}
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
  camera: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 400,
  },
  cameraBox: {
    width: "60%",
    height: "60%",
    borderWidth: 4,
    borderColor: "#fff",
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
});
