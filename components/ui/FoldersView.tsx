import { FileBlock, FileData } from "@/lib/api";

import { useMemo } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { FlatList, View } from "react-native";
import FolderCell from "./FolderCell";

export default function FoldersView({
  title,
  fileData,
  type,
}: {
  title: string;
  fileData: any[];
  type: "audio" | "image" | "video";
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider} />
      <View style={styles.gridContainer}>
        {fileData &&
          fileData.map((item: FileData, index) => (
            <FolderCell
              key={index}
              folder={item.key}
              fileData={item}
              type={type}
            />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    overflowY: "auto",
  },
});
