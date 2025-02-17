import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import { useSessionStore } from "@/store/session";
import { useRouter } from "expo-router";

export default function sync() {
  const [formData, setFormData] = useState({
    url: "",
    token: "",
  });
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

  const handleSubmit = () => {
    if (!formData.url || !formData.token) {
      Alert.alert("Please enter a URL and token");
      return;
    }
    setQRValue(`${formData.url}?token=${formData.token}`);

    setSession({
      url: formData.url,
      token: formData.token,
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

      {/* TODO: add a form that allows the user to enter a URL and a token in inputs */}
      {scanning == false && (
        <View style={styles.form}>
          <Text>Enter URL</Text>
          <TextInput
            style={styles.input}
            placeholder="URL"
            value={formData.url}
            onChangeText={(text) => setFormData({ ...formData, url: text })}
          />
          <Text>Enter Token</Text>
          <TextInput
            style={styles.input}
            placeholder="Token"
            value={formData.token}
            onChangeText={(text) => setFormData({ ...formData, token: text })}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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

  // Form block
  form: {
    display: "flex",
    width: "80%",
    marginTop: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
