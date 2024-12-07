import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { FC } from "react";
import images from "@/assets/images/images";
const BackgroundWrapper: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.background}>{children}</ImageBackground>
    </View>
  );
};

export default BackgroundWrapper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundImage: require("@/assets/images/splash.png"),
  },
});
