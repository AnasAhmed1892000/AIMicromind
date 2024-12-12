import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps extends TextInputProps {
  placeholder?: string; // Placeholder text
  iconColor?: string; // Search icon color
  iconSize?: number; // Search icon size
  containerStyle?: ViewStyle; // Custom style for the container
  inputStyle?: TextStyle; // Custom style for the input field
}

const BaseSearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  iconColor = "#A9A9A9",
  iconSize = 20,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons
        name="search-outline"
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#A9A9A9"
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default BaseSearchBar;
