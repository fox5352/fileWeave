import FoldersView from "@/components/ui/FoldersView";
import { fetchFiles, FileData, getFolders } from "@/lib/api";
import { useSessionStore } from "@/store/session";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  const [isAudioFilesLoading, setIsAudioFilesLoading] = useState(false);
  const [audioFilesError, setAudioFilesError] = useState<string | null>(null);
  const [audioFiles, setAudioFiles] = useState<FileData[] | null>(null);

  const [isImageFilesLoading, setIsImageFilesLoading] = useState(false);
  const [imageFilesError, setImageFilesError] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<FileData[] | null>(null);

  const [isVideoFilesLoading, setIsVideoFilesLoading] = useState(false);
  const [videoFilesError, setVideoFilesError] = useState<string | null>(null);
  const [videoFiles, setVideoFiles] = useState<FileData[] | null>(null);

  const { session } = useSessionStore();

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        setIsAudioFilesLoading(true);
        setAudioFilesError(null);

        if (!session?.url) throw new Error("no session");

        const [files, error] = await fetchFiles(session.url, "audio");

        if (!files && error) throw new Error(error);

        setAudioFiles(files);
      } catch (error) {
        //@ts-ignore
        setAudioFilesError(error.message);
      } finally {
        setIsAudioFilesLoading(false);
      }
    };

    const fetchImageFiles = async () => {
      try {
        setIsImageFilesLoading(true);
        setImageFilesError(null);

        if (!session?.url) throw new Error("no session");

        const [files, error] = await fetchFiles(session.url, "image");

        if (!files && error) throw new Error(error);

        setImageFiles(files);
      } catch (error) {
        //@ts-ignore
        setImageFilesError(error.message);
      } finally {
        setIsImageFilesLoading(false);
      }
    };

    const fetchVideoFiles = async () => {
      try {
        setIsVideoFilesLoading(true);
        setVideoFilesError(null);

        if (!session?.url) throw new Error("no session");

        const [files, error] = await fetchFiles(session.url, "video");

        if (!files && error) throw new Error(error);

        setVideoFiles(files);
      } catch (error) {
        //@ts-ignore
        setVideoFilesError(error.message);
      } finally {
        setIsVideoFilesLoading(false);
      }
    };

    fetchAudioFiles();
    fetchImageFiles();
    fetchVideoFiles();
  }, [session]);

  return (
    <ScrollView style={styles.container}>
      {session == null ? (
        <>
          <Text>Out of sync first sync with local sever</Text>
          <Link href="/(tabs)/sync" style={styles.button}>
            <Text style={styles.buttonText}>Sync Now</Text>
          </Link>
        </>
      ) : (
        <View style={styles.main}>
          {/* TODO: file system here */}
          <FoldersView
            title="Audio Files"
            fileData={audioFiles || []}
            type="audio"
          />
          {/* TODO: add a divider */}
          <FoldersView
            title="Image Files"
            fileData={imageFiles || []}
            type="image"
          />
          {/* TODO: add a divider */}
          <FoldersView
            title="Video Files"
            fileData={videoFiles || []}
            type="video"
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    // flex: 1,
    // height: 100,
    marginTop: 25,
    backgroundColor: "#fff",
    padding: 4,
    paddingBottom: 8,
  },
  main: {},
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
