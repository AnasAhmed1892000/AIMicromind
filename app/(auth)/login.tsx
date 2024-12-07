import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "@/components/Background";

const login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  title: {
    color: "white",
  },
});
