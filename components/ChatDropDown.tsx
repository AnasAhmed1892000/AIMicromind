import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import OptionsIcon from "@/assets/images/options.svg";
import DefaultIcon from "@/assets/images/mark-default-xs.svg";
import TrashIcon from "@/assets/images/trash-dark.svg";
import StarIcon from "@/assets/images/star.svg";
import HistoryIcon from "@/assets/images/clear-history.svg";
import { router } from "expo-router";
interface ChatDropdownProps {
  onDelete: () => void;
  onSetDefault: () => void;
  onClearHistory: () => void;
  handleStaredMessages: () => void;
  chatId: string;
}
const ChatDropdown: FC<ChatDropdownProps> = ({
  onDelete,
  onSetDefault,
  handleStaredMessages,
  onClearHistory,
  chatId,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={
        <TouchableOpacity onPress={() => setVisible(true)}>
          <OptionsIcon />
        </TouchableOpacity>
      }
      style={styles.dropdown}
      contentStyle={styles.dropDownContainer}
    >
      {/* <Menu.Item
        leadingIcon={() => <DefaultIcon width={18} height={18} />}
        onPress={onSetDefault}
        title="Set Default"
        style={styles.option}
      /> */}
      <Menu.Item
        leadingIcon={() => <StarIcon width={18} height={18} />}
        title="Starred Messages"
        onPress={() =>
          router.navigate({
            pathname: "/(chat)/starredMessages",
            params: {
              chatId: chatId,
            },
          })
        }
        style={styles.option}
      />
      <Menu.Item
        leadingIcon={() => <HistoryIcon width={18} height={18} />}
        title="Clear History"
        onPress={onClearHistory}
        style={styles.option}
      />
      <Menu.Item
        leadingIcon={() => <TrashIcon width={18} height={18} />}
        onPress={onDelete}
        title="Delete Chat"
        style={styles.option}
      />
    </Menu>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  dropdown: {
    backgroundColor: "#fff",
    width: 200,
    borderRadius: 20,
    // paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 35,
  },
  option: {
    flexDirection: "row",
    // alignItems: "flex-start",
    borderRadius: 20,
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  delete: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 5,
  },
  deleteText: {
    color: "#FF3B30",
  },
});

export default ChatDropdown;
