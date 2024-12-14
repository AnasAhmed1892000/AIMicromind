import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import { useState, useEffect } from "react";
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
import images from "../../assets/images/images";
import { router } from "expo-router";
import Send from "@/assets/svgs/send-icon.svg";
import Record from "@/assets/svgs/record-icon.svg";
import Attach from "@/assets/svgs/attach-icon.svg";
import { Audio } from "expo-av";

// import {
//   useAudioRecorder,
//   RecordingOptions,
//   AudioModule,
//   RecordingPresets,
// } from "expo-audio";
const chatMessages = [
  {
    id: "1",
    sender: "user",
    text: "Hi, I'm experiencing an issue with our Oracle database. It seems to hang when running large queries. Can you help?",
    time: "2:10 PM",
  },
  {
    id: "2",
    sender: "support",
    text: "Hello! I'd be happy to assist. Could you provide more details? For example, which version of Oracle Database are you using and any error messages you’ve encountered?",
    time: "2:00 PM",
  },
  {
    id: "3",
    sender: "user",
    text: "Not yet. I'm not very familiar with SQL Tuning Advisor. Could you guide me?",
    time: "2:12 PM",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>();
  const [recordings, setRecordings] = useState([]);
  const [sound, setSound] = useState<Audio.Sound | null>();
  const [audioUri, setAudioUri] = useState<string | null | undefined>("");
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const handleAttachFile = () => {
    console.log("Attach file clicked");
  };
  const handleStartRecording = async () => {
    try {
      setIsRecording(true);
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(recording);
      }
    } catch (err) {}
  };
  const stopRecording = async () => {
    console.log("Stopping recording..");
    setIsRecording(false);
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording?.getURI();
    setAudioUri(uri);
    console.log("Recording stopped and stored at", uri);
  };
  async function playRecording() {
    try {
      console.log("Loading sound...");
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri ?? "" }, // Use the saved URI
        { shouldPlay: true }
      );
      setSound(sound);
      console.log("Playing sound...");
      await sound.playAsync(); // Play the sound
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }
  async function stopPlaying() {
    if (sound) {
      console.log("Stopping playback...");
      await sound.stopAsync();

      setSound(undefined);
    }
  }
  const handleSendMessage = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "user",
        text: message,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // Set to true for 12-hour format
        }),
      },
      ...messages,
    ]);
    setMessage(""); // Clear the input after sending
  };
  const renderMessage = ({
    item,
  }: {
    item: {
      id: string;
      sender: string;
      text: string;
      time: string;
    };
  }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.supportMessage,
      ]}
    >
      <Text
        style={
          item.sender === "user"
            ? styles.userMessageText
            : styles.supportMessageText
        }
      >
        {item.text}
      </Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust for iOS and Android
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.navigate("/(tabs)/home")}>
            <Ionicons name="chevron-back" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Oracle Support</Text>
          <Image
            source={images.chat} // Replace with your logo path
            style={styles.headerIcon}
          />
        </View>

        {/* Chat List */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatList}
          inverted
        />

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={handleAttachFile}
            style={styles.iconButton}
          >
            <Attach size={24} />
          </TouchableOpacity>
          {audioUri ? (
            <>
              <Button title="Play " onPress={playRecording} />
              {sound && <Button title="Stop " onPress={stopPlaying} />}
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor="#aaa"
            />
          )}

          {message.trim() ? (
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.iconButton}
            >
              <Send size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={isRecording ? stopRecording : handleStartRecording}
              style={styles.iconButton}
            >
              {isRecording ? (
                <MaterialCommunityIcons
                  name="record-circle-outline"
                  size={24}
                  color={"#F5EB10"}
                />
              ) : (
                <Record size={24} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    // padding: 10,
    //
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 50,
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  chatList: {
    padding: 15,
  },
  messageContainer: {
    maxWidth: "80%",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#F2F3F5",
  },
  supportMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#010101",
  },
  userMessageText: {
    fontSize: 14,
    color: "#222222",
  },
  supportMessageText: {
    fontSize: 14,
    color: "#F5EB10",
  },
  messageTime: {
    fontSize: 10,
    color: "#ccc",
    alignSelf: "flex-end",
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: "#000",
    paddingVertical: Platform.OS === "android" ? 0 : 5,
  },
  sendButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  iconButton: {
    // padding: 8,
  },
});
// export default ChatScreen;
