import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { TMarketplaceItem } from "@/app/(tabs)/marketplace";
import { baseUrl, baseUrls } from "@/network";

const MarketPlaceItem = ({
  item,
  onPress,
}: {
  item: TMarketplaceItem;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.upperSection}>
        <Image
          source={{
            uri: `${baseUrl}${item.photo}`,
          }}
          style={{
            width: 160,
            height: 110,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            resizeMode: "cover",
          }}
        />
      </View>
      <View style={styles.lowerSection}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price} EGP</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 220,
    backgroundColor: "#fff",
    borderRadius: 15,
    marginVertical: "2%",
    marginHorizontal: "2%",
    flexDirection: "column",
    // paddingHorizontal: 10,
  },
  upperSection: {
    width: "100%",
    height: "50%",
  },
  lowerSection: {
    width: "100%",
    height: "50%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#F2F3F5",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    // paddingHorizontal: 10,
    paddingTop: 10,
    gap: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "left",
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: "#222222",
    maxHeight: 30,
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 12,
    fontWeight: "400",
    color: "#222222",
    paddingHorizontal: 10,
  },
});

export default MarketPlaceItem;
