import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import { useState, useEffect, useRef, FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Button,
} from "react-native";
import { router } from "expo-router";
import Send from "@/assets/svgs/send-icon.svg";
import Record from "@/assets/svgs/record-icon.svg";
import { Audio } from "expo-av";
interface VoiceRecorderProps {
  audioUri: string | null;
  setAudioUri: React.Dispatch<React.SetStateAction<string | null>>;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
  recordDuration: number;
  setRecordDuration: React.Dispatch<React.SetStateAction<number>>;
  handleSendMessage: (voiceUri: string) => void;
}
const VoiceRecorder: FC<VoiceRecorderProps> = ({
  audioUri,
  setAudioUri,
  isRecording,
  setIsRecording,
  recordDuration,
  setRecordDuration,
  handleSendMessage,
}) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [playbackState, setPlaybackState] = useState<"start" | "pause" | null>(
    null
  );
  const playbackObject = useRef<Audio.Sound | null>(null);

  const handleStartRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      if (!permission.granted) return;

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);

      recording.setOnRecordingStatusUpdate(({ durationMillis }) => {
        setRecordDuration(Math.floor(durationMillis / 1000));
      });
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  };

  const handleStopRecording = async () => {
    try {
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);
      setRecording(null);
      setIsRecording(false);
    } catch (error) {
      console.error("Failed to stop recording", error);
    }
  };

  const handleStartPlayback = async () => {
    if (audioUri && playbackObject.current === null) {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
      playbackObject.current = sound;
      playbackObject.current.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlaybackState(null);
          playbackObject.current = null;
        }
      });
      await sound.playAsync();
      setPlaybackState("start");
    } else if (playbackObject.current && playbackState === "pause") {
      await playbackObject.current.playAsync();
      setPlaybackState("start");
    }
  };

  const handlePausePlayback = async () => {
    if (playbackObject.current) {
      await playbackObject.current.pauseAsync();
      setPlaybackState("pause");
    }
  };

  const handleDelete = () => {
    setAudioUri(null);
    setPlaybackState(null);
    handlePausePlayback();
    setRecordDuration(0);
    playbackObject.current = null;
  };
  const SendVoice = () => {
    if (audioUri) {
      console.log("sending voice ");
      handleSendMessage(audioUri);
      handleDelete();

      // playbackObject.current = null;
    }
  };
  return (
    <View style={styles.recordContainer}>
      {audioUri ? (
        <View style={styles.playbackContainer}>
          <TouchableOpacity
            onPress={
              playbackState === "start"
                ? handlePausePlayback
                : handleStartPlayback
            }
          >
            {playbackState === "start" ? (
              <Entypo name="controller-paus" size={26} color="black" />
            ) : (
              <Entypo name="controller-play" size={28} color="black" />
            )}
          </TouchableOpacity>
          <Text>{recordDuration}s</Text>
          <TouchableOpacity onPress={handleDelete}>
            <Entypo name="trash" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => SendVoice()}>
            <Send />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? (
            <FontAwesome5 name="record-vinyl" size={24} color="#F5EB10" />
          ) : (
            <Record />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
export const styles = StyleSheet.create({
  recordContainer: { alignItems: "center", justifyContent: "center" },
  playbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    gap: 25,
  },
});
export default VoiceRecorder;
