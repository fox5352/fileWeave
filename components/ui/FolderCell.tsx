import { FileBlock } from "@/lib/api";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import FileCell from "./FileCell";

type FolderCell = {
  folder: string;
  fileData: {
    // @ts-ignore
    key: string;
    [key: string]: FileBlock[]; // All the values are just strings
  };

  type: "audio" | "image" | "video";
};

export default function FolderCell({ folder, fileData, type }: FolderCell) {
  const [folderName, data] = useMemo(() => {
    const split = folder.split(/[\/\\]/);

    return [split[split.length - 1], fileData[folder]];
  }, [folder, fileData]);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.title}>{folderName}</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.bottom}>
        {data.map((file, index) => (
          <FileCell key={index} {...file} type={type} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: 150,
    width: "100%",
    maxWidth: 430,
    height: 302,
    padding: 14,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
  },
  top: {
    height: "20%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginBottom: 8,
  },
  bottom: {
    height: "80%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    gap: 8,
    padding: 4,
    overflowY: "auto",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#000",
    overflow: "hidden",
  },
});
