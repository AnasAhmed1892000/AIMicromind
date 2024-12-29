import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode;
  borderColor?: string;
  isPassword?: boolean;
  disabled?: boolean;
}

const BaseInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  icon,
  isPassword = false,
  borderColor = "#ccc",
  disabled = false,
  ...props
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const togglePasswordVisibility = () => {
    setSecureTextEntry((prev) => !prev);
  };

  return (
    <View style={[styles.container, { borderColor }]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        editable={!disabled}
        placeholderTextColor="#aaa"
        {...props}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <Ionicons
            name={secureTextEntry ? "eye-off" : "eye"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f7f7f7",
    marginVertical: 8,
  },
  iconContainer: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default BaseInput;
