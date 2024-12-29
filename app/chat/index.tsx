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
import {
  deleteToken,
  formatTimeTo12Hour,
  getFileType,
  ReadAsAsync,
  truncateText,
} from "@/utils/helpers";
import {
  API_GetChatDetails,
  API_GetChatMessages,
  API_SendMessage,
} from "@/network/content";
import { baseUrls } from "@/network";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import GenericFileViewer from "@/components/GenericFileViewer";

export interface TMessage {
  type: string;
  _id: string;
  chat: string;
  sender: string;
  text: string;
  starred: boolean;
  file: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TFile {
  mimeType: string;
  name: string;
  size: number;
  uri: string;
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
  const [selectedFile, setSelectedFile] = useState<TFile | null>(null);
  const [selectedFileURI, setSelectedFileURI] = useState<string | null>(null);
  const [page, setPage] = useState(1);
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

      if (!result.canceled) {
        setSelectedFile(result.assets[0]);
        setSelectedFileURI(result.assets[0].uri);
      } else if (result.type === "cancel") {
        console.log("Cancelled", "File selection was cancelled.");
      }
    } catch (error) {
      console.error("Error picking file:", error);
      console.log("Error", "An error occurred while selecting the file.");
    }
  };
  const handleSendMessage = async (voiceUri?: string) => {
    const formData = new FormData();
    formData.append("chatUrl", chatURL);
    if (message) formData.append("text", message);
    if (selectedImage) {
      ReadAsAsync(selectedImage);
      formData.append("file", {
        uri: selectedImage,
        name: "photo.jpg", // Ensure the file has a name
        type: "image/jpeg", // Set MIME type
      });
    }
    if (voiceUri) {
      ReadAsAsync(voiceUri);
      // console.log(audioUri);
      // const fileUri = getAudioUri();
      const filetype = voiceUri.split(".").pop();
      const filename = voiceUri.split("/").pop();
      console.log("audio details ", filetype, filename);
      formData.append("file", {
        uri: voiceUri,
        type: `audio/${filetype}`,
        name: filename,
      });
    }
    if (selectedFile) {
      formData.append("file", {
        uri: selectedFileURI,
        name: selectedFile.name,
        type: selectedFile.mimeType,
      });
    }
    const res = await API_SendMessage(chatId as string, formData);

    if (res.status === 200) {
      console.log("respond to voice message :", res.data);
      getChatMessages(chatId as string);
      setMessage("");
      setSelectedFile(null);
      setSelectedFileURI(null);
      setSelectedImage(null);
      setAudioUri(null);
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
      file: string;
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
        {item.type === "file" && (
          <GenericFileViewer
            FileUri={item.file}
            mimeType={getFileType(item.file)}
            name={item.file.slice(0, 8) + "..."}

            // style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
        {item.type === "photo" && (
          <Image
            source={{ uri: `${baseUrls.stage}/chat-uploads/${item.file}` }}
            style={{ width: 200, height: 200, borderRadius: 10 }}
          />
        )}
        {item.type === "audio" && (
          <MessageWithAudio
            audioUri={item.text}
            // duration={item 0}
          />
        )}
        {item.text !== "" && item.type !== "audio" && (
          <Text
            style={
              item.sender === "user"
                ? styles.userMessageText
                : styles.supportMessageText
            }
          >
            {item.text}
          </Text>
        )}
        <Text style={styles.messageTime}>
          {formatTimeTo12Hour(item.createdAt)}
        </Text>
      </View>

      {/* {item.type === "file" && (
        <MaterialCommunityIcons name="file" size={24} color="#000" />
      )} */}
    </View>
  );
  const getChatMessages = async (chatId: string, page = 1) => {
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
  const LoadMoreMessages = async (chatId: string, page: number) => {
    setIsLoadingMore(true);
    try {
      const response = await API_GetChatMessages(chatId, page);
      if (response.status === 200) {
        console.log(response.data.data.messages);
        setMessages((prevMessages) => [
          ...prevMessages,
          ...response.data.data.messages,
        ]);
        setIsLoadingMore(false);
      }
    } catch (error) {
      console.log("error inside chat :", error);
      setIsLoadingMore(false);
    }
  };
  useEffect(() => {
    console.log("chat id : ", chatId);
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
  useEffect(() => {
    if (page > 1) {
      LoadMoreMessages(chatId as string, page);
    }
  }, [page]);

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
            onScrollEndDrag={() => setPage((prev) => prev + 1)}
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
            {(selectedFileURI || selectedImage) && (
              <Ionicons
                name="cloud-done"
                size={24}
                color="black"
                style={{ marginInline: 10 }}
              />
            )}
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
              onPress={() => handleSendMessage()}
              style={styles.iconButton}
            >
              <Send size={20} />
            </TouchableOpacity>
          ) : (
            <>
              {selectedFileURI || selectedImage ? (
                <TouchableOpacity
                  onPress={() => handleSendMessage()}
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
                  handleSendMessage={handleSendMessage}
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
    marginBottom: 30,
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
