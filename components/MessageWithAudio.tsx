import { Entypo, Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { FC, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MessageWithAudioProps {
  audioUri: string;
  // duration: number;
}

const MessageWithAudio: FC<MessageWithAudioProps> = ({
  audioUri,
  // duration,
}) => {
  const [playbackState, setPlaybackState] = useState<"start" | "pause" | null>(
    null
  );
  const playbackObject = useRef<Audio.Sound | null>(null);

  const handlePlayPause = async () => {
    if (!playbackObject.current && audioUri) {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      playbackObject.current = sound;
      await sound.playAsync();
      setPlaybackState("start");
    } else if (playbackState === "start" && playbackObject.current) {
      await playbackObject.current.pauseAsync();
      setPlaybackState("pause");
    } else if (playbackState === "pause" && playbackObject.current) {
      await playbackObject.current.playAsync();
      setPlaybackState("start");
    }
  };
  function formatDuration(durationInSeconds: number): string {
    if (durationInSeconds < 60) {
      return durationInSeconds < 10
        ? `0${durationInSeconds} S` // Format as `05` if less than 10 seconds
        : `${durationInSeconds} S`;
    } else if (durationInSeconds < 3600) {
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`; // Format as `MM:SS`
    } else {
      const hours = Math.floor(durationInSeconds / 3600);
      const minutes = Math.floor((durationInSeconds % 3600) / 60);
      const seconds = durationInSeconds % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`; // Format as `HH:MM:SS`
    }
  }
  return (
    <View style={styles.messageContainer}>
      <Ionicons name="musical-notes-outline" size={24} color="black" />
      <Text>Voice Record </Text>
      {/* <Text>{formatDuration(duration)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",

    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default MessageWithAudio;
