import React, { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import {
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { baseUrls } from "@/network";
export interface Root {
  mimeType: string;
  name: string;
  FileUri: string;
}
const GenericFileViewer: FC<Root> = ({ mimeType, name, FileUri }) => {
  console.log(name);
  const downloadFile = async () => {
    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        baseUrls.stage + "/chat-uploads/" + FileUri,
        FileSystem.documentDirectory + name
      );
      const { uri } = await downloadResumable.downloadAsync();
      alert(`File downloaded to: ${uri}`);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* File Icon */}
      {mimeType === "pdf" ? (
        <FontAwesome5 name="file-pdf" size={24} color="black" />
      ) : (
        <Feather name="file" size={24} color="black" />
      )}
      {/* File Info */}
      <View style={styles.textContainer}>
        <Text style={styles.fileName}>{name}</Text>
        <Text style={styles.fileType}>{mimeType.toUpperCase()}</Text>
      </View>
      {/* Download Button */}
      <TouchableOpacity onPress={downloadFile} style={styles.downloadButton}>
        <MaterialCommunityIcons
          name="download-circle-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginVertical: 5,
    gap: 16,
    minWidth: 200,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  fileType: {
    fontSize: 14,
    color: "#555",
  },
  downloadButton: {
    padding: 5,
  },
  downloadText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default GenericFileViewer;
