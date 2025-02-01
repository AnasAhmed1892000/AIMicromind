import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { chat } from "@/app/(tabs)/home";
import { baseUrl, baseUrls } from "@/network";
import { formatTimeTo12Hour, truncateText } from "@/utils/helpers";
import TrashIcon from "../assets/images/trash.svg";
import MarkDefaultIcon from "../assets/images/mark-default.svg";
const ChatItem = ({
  item,
  onDelete,
}: {
  item: chat;
  onDelete: (id: string) => void;
}) => {
  console.log(item.chatPhoto);
  const renderRightActions = () => (
    <View style={styles.rightActions}>
      {/* Mark as Default Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.markDefaultButton]}
        onPress={(event) => {
          event.stopPropagation();
          console.log("Marked as default:", item._id);
          // Add logic to mark chat as default
        }}
      >
        <MarkDefaultIcon />
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteBtn]}
        onPress={(event) => {
          event.stopPropagation();
          onDelete(item._id);
        }}
      >
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={(event) => {
          event.stopPropagation();
          router.push({
            pathname: "/(chat)",
            params: {
              chatId: item._id,
              imgUrl: item.chatPhoto,
              chatName: item.chatName,
            },
          });
        }}
      >
        <View style={styles.chatItem}>
          <Image
            source={{ uri: `${baseUrl}${item.chatPhoto}` }}
            style={styles.chatImage}
          />
          <View style={styles.chatDetails}>
            <Text style={styles.chatTitle}>{item.chatName}</Text>
            {item.latestMessage && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingInlineEnd: 10,
                }}
              >
                <Text style={styles.chatSubtitle}>
                  {item.latestMessage?.text
                    ? truncateText(item.latestMessage?.text)
                    : "Hey there!"}
                </Text>

                <Text style={styles.chatTime}>
                  {new Intl.DateTimeFormat("en-US", options).format(
                    new Date(item.latestMessage.createdAt)
                  )}
                </Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
export default ChatItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: "#000",
    borderRadius: 20,
  },
  navText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#000",
  },
  activeNavText: {
    color: "#F5EB10",
  },
  searchBar: {
    height: 50,
    margin: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 25,
    fontSize: 16,
  },
  chatList: {
    paddingHorizontal: 15,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  chatImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatDetails: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatSubtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 70,

    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  newChatButton: {
    backgroundColor: "#F5EB10",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  newChatText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  chatTime: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: "100%",
    // borderRadius: 10,
  },
  markDefaultButton: {
    backgroundColor: "#F5EB10", // Green for marking default
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  deleteBtn: {
    backgroundColor: "#FF3B30", // Red for delete
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
