import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { bytesToBase64 } from "byte-base64";
import { AudioMetaData, ImageMetaData } from "@/lib/api";

import {
  Modal,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

export type FileCellProps = {
  name: string;
  path: string;
  extension: string;
  type: string;
  metadata: {
    size: number;
    created: string;
    modified: string;
    type: string;
    imageMetaData?: ImageMetaData;
    audioMetaData?: AudioMetaData;
  };
};

export default function FileCell({ name, metadata, type }: FileCellProps) {
  const [image, setImage] = useState<string | null>(null);
  const [additionalData, setAdditionalData] = useState({
    duration: "",
    size: "",
  });

  const Icon = useMemo(() => {
    switch (type) {
      case "audio": {
        return () => <Feather name="music" size={30} color="black" />; //<MusicNote />;
      }
      case "image": {
        return () => <Feather name="image" size={30} color="black" />;
      }
      // TODO: add video and image
      default:
        return () => <Feather name="video" size={30} color="black" />;
    }
  }, []);

  useEffect(() => {
    if (metadata.imageMetaData?.thumbnail) {
      const base64String = bytesToBase64(metadata.imageMetaData.thumbnail.data);
      const imageUri = `data:image/${metadata.type};base64,${base64String}`;
      setImage(imageUri);
    }

    if (metadata.audioMetaData != undefined) {
      const audioMetaData = metadata.audioMetaData;

      setAdditionalData((prev) => {
        const totalSeconds = Math.round(audioMetaData.duration);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        let formattedDuration;
        if (minutes >= 60) {
          const hours = Math.floor(minutes / 60);
          const remainingMinutes = minutes % 60;
          formattedDuration = `${hours}h ${remainingMinutes}m`;
        } else if (minutes > 0) {
          formattedDuration = `${minutes}m ${seconds}s`;
        } else {
          formattedDuration = `${seconds}s`;
        }

        return {
          ...prev,
          duration: formattedDuration,
        };
      });
    }

    if (metadata.size) {
      setAdditionalData((prev) => {
        const mb = metadata.size / (1024 * 1024);

        const size =
          mb < 1024 ? `${mb.toFixed(2)} MB` : `${(mb / 1024).toFixed(2)} GB`;

        return {
          ...prev,
          size,
        };
      });
    }
  }, [metadata.imageMetaData?.thumbnail.data]);

  return (
    <TouchableOpacity style={styles.button}>
      {/* Tooltip alternative */}
      <Text numberOfLines={1} style={styles.tooltip}>
        {name.length > 13 ? name.slice(0, 13) + "..." : name}
      </Text>

      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Icon />
        </View>
        {image && <Image src={image} style={styles.image} />}

        {(type === "video" || type === "audio") && additionalData && (
          <View style={styles.infoContainer}>
            <View style={styles.infoBackground} />
            <Text style={styles.infoText}>{additionalData.duration}</Text>
            <Text style={styles.infoText}>{additionalData.size}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 100,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  tooltip: {
    height: "25%",
    marginBottom: 4,
    padding: 3,
    fontSize: 14,
    fontWeight: "bold",
  },
  iconContainer: {
    width: "100%",
    height: "75%",
    position: "relative",
  },
  iconBackground: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 30,
    height: 30,
    transform: [{ translateX: "-50%" }, { translateY: "-65%" }],
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  infoContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  infoBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 120,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.51)",
  },
  infoText: {
    fontSize: 13,
    color: "#fff",
  },
});
