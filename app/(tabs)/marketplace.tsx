import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { MaterialIcons } from "@expo/vector-icons";
import ChatItem from "@/components/ChatItem";
import Logo from "@/assets/svgs/Chats-logo.svg";
import BaseSearchBar from "@/components/Base/BaseSearchBar";
const { width } = Dimensions.get("window");
const MarketplaceScreen = () => {
  // const cardData = [
  //   {
  //     id: "1",
  //     title: "Medical Agent",
  //     description:
  //       "This model analyzes the medical report to retrieve the diagnosis...",
  //     icon: require("./assets/medical.png"), // Replace with your icon
  //     backgroundColor: "#FFE4E1",
  //   },
  //   {
  //     id: "2",
  //     title: "Multilingual-Text-To-Speech",
  //     description:
  //       "Convert text in multiple languages, including English, German, Polish...",
  //     icon: require("./assets/multilingual.png"), // Replace with your icon
  //     backgroundColor: "#E6F1FF",
  //   },
  //   {
  //     id: "3",
  //     title: "Generate Blogpost",
  //     description:
  //       "Blog post generation using AI is a process that involves using machine learning...",
  //     icon: require("./assets/blogpost.png"), // Replace with your icon
  //     backgroundColor: "#E7F5E9",
  //   },
  //   {
  //     id: "4",
  //     title: "Zephyr-7B",
  //     description:
  //       "This model analyzes the medical report to retrieve the diagnosis...",
  //     icon: require("./assets/zephyr.png"), // Replace with your icon
  //     backgroundColor: "#F1E7FE",
  //   },
  // ];

  const handleDelete = (id: string) => {
    console.log(`Deleted chat with id: ${id}`);
    // Implement delete logic
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <Logo width={50} height={50} />
      </View>

      <View style={styles.navBar}>
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <MaterialIcons name="home" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.newChatButton}>
            <Text style={styles.newChatText}>+ New Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="person" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Search Bar */}
      <BaseSearchBar
        placeholder="Search AI Model..."
        containerStyle={styles.searchBar}
      />

      {/* Chat List */}
      {/* <FlatList
        data={cardData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={[styles.card, { backgroundColor: item.backgroundColor }]}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      /> */}

      {/* Bottom Navigation */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff", // Navbar background color
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 3 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
    elevation: 4, // Shadow elevation for Android
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
  listContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    borderRadius: 15,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: (width - 40) / 2, // Adjust for padding and margin
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#6D6D6D",
  },
});

export default MarketplaceScreen;
