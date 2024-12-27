import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useState, useEffect, useRef } from "react";
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
  ActivityIndicator,
} from "react-native";
import * as FileSystem from "expo-file-system";
import images from "../../assets/images/images";
import { router, useLocalSearchParams } from "expo-router";
import Send from "@/assets/svgs/send-icon.svg";
import Record from "@/assets/svgs/record-icon.svg";
import Attach from "@/assets/svgs/attach-icon.svg";
import { Audio } from "expo-av";
import VoiceRecorder from "@/components/VoiceRecorder";
import MessageWithAudio from "@/components/MessageWithAudio";
import { deleteToken, formatTimeTo12Hour } from "@/utils/helpers";
import {
  API_GetChatDetails,
  API_GetChatMessages,
  API_SendMessage,
} from "@/network/content";
import { baseUrls } from "@/network";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
export interface TMessage {
  type: string;
  _id: string;
  chat: string;
  sender: string;
  text: string;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<TMessage[] | []>([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { chatId, chatName, imgUrl } = useLocalSearchParams();
  const [chatURL, setChatURL] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedFileURI, setSelectedFileURI] = useState<string | null>(null);
  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the gallery."
      );
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // Update with the selected image's URI
    } else {
      console.log("Cancelled", "Image selection was cancelled.");
    }
  };
  const pickFile = async () => {
    try {
      const result: any = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "success") {
        console.log("Selected file:", result);
        setSelectedFile(result);
        setSelectedFileURI(result.uri);
      } else if (result.type === "cancel") {
        console.log("Cancelled", "File selection was cancelled.");
      }
    } catch (error) {
      console.error("Error picking file:", error);
      console.log("Error", "An error occurred while selecting the file.");
    }
  };
  const formData = new FormData();
  const handleSendMessage = async () => {
    formData.append("chatUrl", chatURL);
    formData.append("text", message);

    const res = await API_SendMessage(chatId as string, formData);

    if (res.status === 200) {
      console.log("respond ti voice message :", res.data);
      getChatMessages(chatId as string);
      setMessage("");
    }
  };
  const getChatDetails = async () => {
    const res = await API_GetChatDetails(chatId as string);
    if (res.status === 200) {
      console.log(res.data.data.chat.chatUrl);
      setChatURL(res.data.data.chat.chatUrl);
    }
  };
  const handleSendVoiceMessage = () => {
    setMessage(""); // Clear the input after sending
  };
  const renderMessage = ({
    item,
  }: {
    item: {
      type: string;
      _id: string;
      chat: string;
      sender: string;
      text: string;
      starred: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  }) => (
    <View>
      <View
        style={[
          styles.messageContainer,
          item.sender === "user" ? styles.userMessage : styles.supportMessage,
        ]}
      >
        {item.type === "audio" && (
          <MessageWithAudio
            audioUri={item.text}
            // duration={item 0}
          />
        )}
        <Text
          style={
            item.sender === "user"
              ? styles.userMessageText
              : styles.supportMessageText
          }
        >
          {item.text}
        </Text>
        <Text style={styles.messageTime}>
          {formatTimeTo12Hour(item.createdAt)}
        </Text>
      </View>

      {/* {item.type === "file" && (
        <MaterialCommunityIcons name="file" size={24} color="#000" />
      )} */}
    </View>
  );
  const getChatMessages = async (chatId: string) => {
    setIsLoading(true);
    try {
      const response = await API_GetChatMessages(chatId);
      if (response.status === 200) {
        console.log(response.data.data.messages);
        setMessages(response.data.data.messages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error inside chat :", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getChatMessages(chatId as string);
    getChatDetails();
  }, []);
  const getAudioUri = async () => {
    const fileInfo = await FileSystem.getInfoAsync(audioUri as string);

    if (fileInfo?.exists) {
      console.log("File exists:", fileInfo);
      return fileInfo.uri;
    } else {
      console.log("File does not exist.");
    }
  };
  // useEffect(() => {
  //   if (audioUri) {
  //     console.log(audioUri);
  //     const fileUri = getAudioUri();
  //     const filetype = audioUri.split(".").pop();
  //     const filename = audioUri.split("/").pop();

  //     formData.append("file", {
  //       fileUri,
  //       type: `audio/${filetype}`,
  //       name: filename,
  //     } as unknown as Blob);
  //   }
  // }, [audioUri]);
  useEffect(() => {
    if (selectedImage) {
      formData.append("photo", {
        uri: selectedImage,
        name: "photo.jpg", // Ensure the file has a name
        type: "image/jpeg", // Set MIME type
      });
    }
  }, [selectedImage]);
  useEffect(() => {
    if (selectedFile) {
      formData.append("file", {
        uri: selectedFileURI,
        name: selectedFile.name,
        type: selectedFile.mimeType,
      });
    }
  }, [selectedFileURI, selectedFile]);
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
          <Text style={styles.headerTitle}>{chatName}</Text>
          <Image
            source={{ uri: `${baseUrls.stage}/img/chats/${imgUrl}` }} // Replace with your logo path
            style={styles.headerIcon}
          />
        </View>
        {isLoadingMore ? <ActivityIndicator color="#000" /> : <></>}
        {/* Chat List */}
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.chatList}
            onScrollEndDrag={() => null}
            inverted
          />
        )}

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={pickFile}
              disabled={audioUri || isRecording ? true : false}
              style={styles.iconButton}
            >
              <Attach size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImage}
              disabled={audioUri || isRecording ? true : false}
              style={styles.iconButton}
            >
              <MaterialIcons name="add-a-photo" size={28} />
            </TouchableOpacity>
          </View>
          {audioUri || isRecording ? (
            <></>
          ) : (
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor="#aaa"
            />
          )}
          {/* {audioUri ? <RecordingSection /> : null} */}
          {message.trim() ? (
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.iconButton}
            >
              <Send size={20} />
            </TouchableOpacity>
          ) : (
            <>
              {selectedImage || selectedFileURI !== null ? (
                <TouchableOpacity
                  onPress={handleSendMessage}
                  style={styles.iconButton}
                >
                  <Send size={20} />
                </TouchableOpacity>
              ) : (
                <VoiceRecorder
                  audioUri={audioUri}
                  setAudioUri={setAudioUri}
                  setIsRecording={setIsRecording}
                  isRecording={isRecording}
                  recordDuration={recordDuration}
                  setRecordDuration={setRecordDuration}
                  handleSend={handleSendMessage}
                />
              )}
            </>
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
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: Platform.OS === "ios" ? 50 : 20,
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
    justifyContent: "space-between",
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
    backgroundColor: "#F5EB10",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 5,
  },
  recordingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
  recordButton: {
    marginRight: 10,
    backgroundColor: "#fce303",
    padding: 10,
    borderRadius: 50,
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
// export default ChatScreen;
