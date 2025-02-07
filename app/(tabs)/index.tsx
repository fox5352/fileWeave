import { useSessionStore } from "@/store/session";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  const { session } = useSessionStore();

  return (
    <View style={styles.container}>
      {session == null ? (
        <>
          <Text>Out of sync first sync with local sever</Text>
          <Link href="/(tabs)/sync" style={styles.button}>
            <Text style={styles.buttonText}>Sync Now</Text>
          </Link>
        </>
      ) : (
        <>
          {/* TODO: file system here */}
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
            explicabo odit totam similique ad fugit unde, suscipit numquam
            maiores optio ut repellat nihil, illum eveniet molestias earum
            consequatur molestiae dolorum. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloremque explicabo odit totam
            similique ad fugit unde, suscipit numquam maiores optio ut repellat
            nihil, illum eveniet molestias earum consequatur molestiae dolorum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
            explicabo odit totam similique ad fugit unde, suscipit numquam
            maiores optio ut repellat nihil, illum eveniet molestias earum
            consequatur molestiae dolorum. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloremque explicabo odit totam
            similique ad fugit unde, suscipit numquam maiores optio ut repellat
            nihil, illum eveniet molestias earum consequatur molestiae dolorum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
            explicabo odit totam similique ad fugit unde, suscipit numquam
            maiores optio ut repellat nihil, illum eveniet molestias earum
            consequatur molestiae dolorum. Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Doloremque explicabo odit totam
            similique ad fugit unde, suscipit numquam maiores optio ut repellat
            nihil, illum eveniet molestias earum consequatur molestiae dolorum.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
            explicabo odit totam similique ad fugit unde, suscipit numquam
            maiores optio ut repellat nihil, illum eveniet molestias earum
            consequatur molestiae dolorum.
          </Text>
        </>
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
});
