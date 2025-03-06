import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
} from "react-native";
import React, { FC } from "react";
import images from "@/assets/images/images";
const BackgroundWrapper: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={images.background} style={styles.background}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundWrapper;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    zIndex: -1,
    // paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  background: {
    width: "100%",
    height: "100%",
  },
});
