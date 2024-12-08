import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode; // Optional prop for adding an icon
  borderColor?: string; // Optional border color
}

const BaseInput: React.FC<CustomInputProps> = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  icon,
  borderColor = "#ccc",
  ...props
}) => {
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
        placeholderTextColor="#aaa"
        {...props}
      />
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
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
});

export default BaseInput;
