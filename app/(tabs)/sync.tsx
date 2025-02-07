import { CameraView, useCameraPermissions } from "expo-camera";

import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function sync() {
  const [permission, requestPermission] = useCameraPermissions();

  const [scanning, setScanning] = useState(false);
  const [qrValue, setQRValue] = useState<string | null>(null);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  });

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanning(false);
    setQRValue(data);
    Alert.alert("QR Code Scanned", `Scanned Value: ${data}`);
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
