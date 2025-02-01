import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu } from "react-native-paper";
import OptionsIcon from "@/assets/images/options.svg";
import DefaultIcon from "@/assets/images/mark-default-xs.svg";
import TrashIcon from "@/assets/images/trash-dark.svg";
import StarIcon from "@/assets/images/star.svg";
import HistoryIcon from "@/assets/images/clear-history.svg";
import CopyIcon from "@/assets/images/copy-icon.svg";
import ShareIcon from "@/assets/images/share-icon.svg";
import ForwardIcon from "@/assets/images/forward-icon.svg";
interface HoldMessageDropDownProps {
  onDelete?: () => void;
  onCopy?: () => void;
  onClearHistory?: () => void;
  handleStaredMessages?: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
const HoldMessageDropDown: FC<HoldMessageDropDownProps> = ({
  onDelete,
  onCopy,
  handleStaredMessages,
  onClearHistory,
  visible,
  setVisible,
}) => {
  const [anchorPosition, setAnchorPosition] = useState({ x: 0, y: 0 });

  const openMenu = (event: any) => {
    setAnchorPosition({
      x: event.nativeEvent.pageX, // Capture the X coordinate
      y: event.nativeEvent.pageY, // Capture the Y coordinate
    });
    setVisible(true);
  };
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={anchorPosition}
      style={styles.dropdown}
      contentStyle={[styles.dropDownContainer, { minWidth: "100%" }]}
    >
      <Menu.Item
        trailingIcon={() => <StarIcon width={18} height={18} />}
        title="Star Message"
        onPress={handleStaredMessages}
        style={styles.option}
        contentStyle={styles.optionContainer}
      />
      <Menu.Item
        trailingIcon={() => <CopyIcon width={18} height={18} />}
        onPress={onCopy}
        title="Copy"
        style={styles.option}
        contentStyle={styles.optionContainer}
      />
      {/* <Menu.Item
        title="Share"
        onPress={onClearHistory}
        style={styles.option}
        trailingIcon={() => <ShareIcon width={18} height={18} />}
        contentStyle={styles.optionContainer}
      />
      <Menu.Item
        title="Forward"
        onPress={onClearHistory}
        style={styles.option}
        trailingIcon={() => <ForwardIcon width={18} height={18} />}
        contentStyle={styles.optionContainer}
      /> */}
      <Menu.Item
        trailingIcon={() => <TrashIcon width={18} height={18} />}
        onPress={onDelete}
        title="Delete"
        style={styles.option}
        contentStyle={styles.optionContainer}
      />
    </Menu>
  );
};

const styles = StyleSheet.create({
  dropDownContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    flex: 1,
    width: "100%",
  },
  dropdown: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    // paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 35,
    position: "absolute",
    left: "5%",
    top: "70%",
  },
  option: {
    flexDirection: "row",
    borderRadius: 20,
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "#fff",
    width: "100%",
    minWidth: "100%",
    gap: "90%",
  },
  optionContainer: {
    flexDirection: "row",
    // borderRadius: 20,
    justifyContent: "space-between",
    // paddingVertical: 12,
    // backgroundColor: "white",
    width: "100%",
    minWidth: "85%",
    // gap: "90%",
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

export default HoldMessageDropDown;
