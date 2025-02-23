import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ChatDropdown from "@/components/ChatDropDown";
import { ActivityIndicator } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import { router, useLocalSearchParams } from "expo-router";
import { TMessage } from "../chatScreen";
import GenericFileViewer from "@/components/GenericFileViewer";
import { formatTimeTo12Hour, getFileType } from "@/utils/helpers";
import AdjustableImage from "@/components/Base/BaseImage";
import MessageWithAudio from "@/components/MessageWithAudio";
import Markdown from "react-native-markdown-display";
import HoldMessageDropDown from "@/components/HoldMessageDropDown";
import * as Clipboard from "expo-clipboard";
import { API_GetChatMessages, API_GetStarredMessages } from "@/network/content";
const StarredMessagesScreen = () => {
  const [messages, setMessages] = useState<TMessage[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [isMessageOptionsOpen, setIsMessageOptionsOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const { chatId } = useLocalSearchParams();
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
  }) => {
    const handleCopy = async () => {
      console.log(item.text);
      try {
        await Clipboard.setStringAsync(item.text);
        // setIsMessageOptionsOpen(false);
        setOpenMenuId(null);
      } catch (error) {
        Alert.alert("Error", "Failed to copy message.");
      }
    };
    return (
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
        {item.type === "photo" && <AdjustableImage item={item} />}
        {item.type === "audio" && (
          <MessageWithAudio
            audioUri={item.text}
            // duration={item 0}
          />
        )}
        {item.text !== "" && item.type !== "audio" && (
          <Markdown
            style={{
              body: {
                ...styles.supportMessageText,
              },
            }}
          >
            {item.text}
          </Markdown>
        )}
        <Text style={styles.messageTime}>
          {formatTimeTo12Hour(item.createdAt)}
        </Text>
      </View>
    );
  };
  const getStarredMessages = async (chatId: string) => {
    setIsLoading(true);
    try {
      const response = await API_GetStarredMessages(chatId);
      if (response.status === 200) {
        setMessages(response.data.data.starredMessages);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error inside chat :", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getStarredMessages(chatId as string);
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Starred Messages</Text>
        </View>
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
          // onScrollEndDrag={() => setPage((prev) => prev + 1)}
          inverted
          onEndReached={() => setPage((prev) => prev + 1)}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default StarredMessagesScreen;

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
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    padding: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    flexWrap: "wrap",
    // flexDirection: "row",
    position: "relative",
    alignItems: "flex-start",
    padding: 10,
    margin: 5,
    backgroundColor: "#000", // For visibility in your case
    borderRadius: 8,
  },
  userMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#010101",
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
  typingIndicator: {
    position: "absolute",
    top: -85,
    left: "35%",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
