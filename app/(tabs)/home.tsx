import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import ChatItem from "@/components/ChatItem";
import Logo from "@/assets/svgs/Chats-logo.svg";
import ChatImage from "@/assets/svgs/chat-image.svg";
import ChatIcon from "@/assets/svgs/chat-name-icon.svg";
import UrlIcon from "@/assets/svgs/url-icon.svg";
import ProfileIcon from "@/assets/svgs/person-outline.svg";
import BaseSearchBar from "@/components/Base/BaseSearchBar";
import { router, useFocusEffect } from "expo-router";
import BaseModal from "@/components/Base/Modal";
import BaseInput from "@/components/Base/BaseInput";
import BaseButton from "@/components/Base/BaseButton";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { date } from "yup";
import {
  API_CreateChat,
  API_DeleteChat,
  API_GetChats,
  API_SearchChats,
} from "@/network/content";
import { ReadAsAsync } from "@/utils/helpers";
const chatsss = [
  {
    id: "6767e936d085777df54e7efa",
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
export interface LatestMessage {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
}
export interface chat {
  _id: string;
  userId: string;
  chatUrl: string;
  chatName: string;
  chatPhoto: string;
  createdAt: string;
  latestMessage: LatestMessage;
}
const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>("");
  const [chatUrl, setChatUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);
  const [chats, setChats] = useState<chat[] | []>([]);
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
      setSelectedImage(result.assets[0]); // Update with the selected image's URI
    } else {
      Alert.alert("Cancelled", "Image selection was cancelled.");
    }
  };
  const handleDelete = (id: string) => {
    console.log(`Deleted chat with id: ${id}`);
    // Implement delete logic
  };
  const onCancel = () => {
    setModalVisible(false);
    setSelectedImage(null);
    setChatName("");
    setChatUrl("");
    setIsLoading(false);
  };
  const createChat = async () => {
    const data = new FormData();
    setIsLoading(true);
    if (chatUrl) {
      data.append("chatUrl", chatUrl);
    }
    if (chatName) {
      data.append("chatName", chatName);
    }
    if (selectedImage?.uri) {
      const photoBlob = await FileSystem.readAsStringAsync(selectedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      // console.log("photoBlob");
      // console.log("photoBlob", photoBlob);
      data.append("chatphoto", {
        uri: selectedImage.uri,
        type: selectedImage.mimeType,
        name: selectedImage.fileName,
      });
    }

    try {
      const response = await API_CreateChat(data);

      // console.log(response.data);
      onCancel();
      fetchChats();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      onCancel();
      setIsLoading(false);
    }
  };
  const fetchChats = async () => {
    try {
      const response = await API_GetChats();
      if (response.status === 200) {
        // console.log(response.data.data);
        setChats(response.data.data.chats);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteChatById = async (idToDelete: string) => {
    try {
      const response = await API_DeleteChat(idToDelete);
      if (response.status === 200) {
        // setChats((prevChats) =>
        //   prevChats.filter((chat) => chat._id !== idToDelete)
        // );
        fetchChats();
        console.log(`Deleted chat with id: ${idToDelete}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async (text: string) => {
    try {
      if (text === "") {
        fetchChats();
      } else {
        const response = await API_SearchChats(text);
        if (response.status === 200) {
          // console.log(response.data.data);
          setChats(response.data.data.chats);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchChats();
    }, []) // Dependency array ensures it's only run when focused
  );
  return (
    <View style={styles.container}>
      {/* Top Navigation */}

      <View style={styles.navBar}>
        <View style={styles.topNav}>
          <Logo width={50} height={50} />
        </View>
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.newChatButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.newChatText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Chats</Text>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/profile");
            }}
          >
            <ProfileIcon />
          </TouchableOpacity>
        </View>
      </View>

      <BaseSearchBar
        placeholder="Search Chat..."
        containerStyle={styles.searchBar}
        onTextChange={handleSearch}
      />
      {!isLoading ? (
        <FlatList
          data={chats}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChatItem item={item} onDelete={deleteChatById} />
          )}
          contentContainerStyle={styles.chatList}
        />
      ) : (
        <ActivityIndicator />
      )}

      <BaseModal
        visible={isModalVisible}
        onDismiss={() => {
          setModalVisible(false);
        }}
        style={styles.modalContainer}
      >
        <TouchableOpacity style={styles.modalImage} onPress={pickImage}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          ) : (
            <ChatImage />
          )}
        </TouchableOpacity>
        <View style={styles.modalInputsContainer}>
          <BaseInput
            value={chatUrl}
            onChangeText={(value) => setChatUrl(value)}
            // onBlur={handleBlur("name")}
            placeholder="Enter chat URL"
            icon={<UrlIcon />}
            borderColor={"#F5EB10"}
            style={styles.modalInputs}
          />
          <BaseInput
            value={chatName}
            onChangeText={(value) => setChatName(value)}
            // onBlur={handleBlur("name")}
            placeholder="Enter chat name"
            icon={<ChatIcon />}
            borderColor={"#F5EB10"}
            style={styles.modalInputs}
          />
        </View>
        <BaseButton
          onPress={() => createChat()}
          text={"Create Chat"}
          style={styles.modalBtn}
          isLoading={isLoading}
          disabled={chatName === "" || chatUrl === ""}
        />
        <BaseButton
          onPress={() => onCancel()}
          text={"Cancel"}
          textColor="#fff"
          backgroundColor="#000"
          style={[styles.modalBtn, { marginBottom: 20 }]}
        />
      </BaseModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 0 : 0,
    // paddingBottom: Platform.OS === "ios" ? 0 : 50,
  },
  navBar: {
    flexDirection: "column",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  newChatText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginRight: 20,
  },
  modalContainer: {
    marginTop: 50,
  },
  modalBtn: {
    width: "90%",
    // marginBottom: 10,
  },
  modalInputsContainer: {
    width: "90%",
    marginTop: 20,
  },
  modalInputs: {
    marginVertical: 10,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    paddingRight: 30,
  },
  modalImage: {
    width: 75,
    height: 75,
    position: "absolute",
    top: -25,
    left: "50%",
    // zIndex: 1000,
    transform: [{ translateX: -35 }, { translateY: -12 }],
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});

export default HomeScreen;
