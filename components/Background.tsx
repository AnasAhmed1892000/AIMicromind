import React, { FC } from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import images from "@/assets/images/images";
const W = Dimensions.get("screen").width;
const H = Dimensions.get("screen").height;

const Background: FC = () => {
  return (
    <View style={styles.container}>
      <Image source={images.background} resizeMode="contain" />
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
