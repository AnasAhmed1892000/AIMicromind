import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { MaterialIcons } from "@expo/vector-icons";
import ChatItem from "@/components/ChatItem";
import Logo from "@/assets/svgs/Chats-logo.svg";
import BaseSearchBar from "@/components/Base/BaseSearchBar";
import { router } from "expo-router";

const HomeScreen = () => {
  const chats = [
    {
      id: "1",
      title: "Oracle Support",
      subtitle: "Welcome to My Oracle Support...",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      title: "Dola AI",
      subtitle: "Dola is an AI agent calendar...",
      image: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      title: "AI Cover Letter",
      subtitle: "A simple and private way...",
      image: "https://via.placeholder.com/50",
    },
    // Add more chat data here
  ];

  const handleDelete = (id: string) => {
    console.log(`Deleted chat with id: ${id}`);
    // Implement delete logic
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}

      <View style={styles.navBar}>
        <View style={styles.topNav}>
          <Logo width={50} height={50} />
        </View>
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <MaterialIcons name="home" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newChatButton}>
            <Text style={styles.newChatText}>+ New Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/profile");
            }}
          >
            <MaterialIcons name="person" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <BaseSearchBar
        placeholder="Search Chat..."
        containerStyle={styles.searchBar}
      />
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem item={item} onDelete={() => handleDelete(item.id)} />
        )}
        contentContainerStyle={styles.chatList}
      />

      {/* Bottom Navigation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    // paddingBottom: Platform.OS === "ios" ? 0 : 50,
  },
  navBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff", // Navbar background color
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
    elevation: 4, // Keeps shadow focused on the bottom
    borderTopWidth: 0,
    borderTopColor: "white",
    gap: 15,
  },
  topNav: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#FFD700",
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
    borderRadius: 10,
    marginBottom: 10,
  },
  bottomNav: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  newChatButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  newChatText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default HomeScreen;
